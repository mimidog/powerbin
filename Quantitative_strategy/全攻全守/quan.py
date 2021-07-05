import sys
import os
import xlrd
import numpy as np
import pandas as pd
import configparser
import time
import datetime
from decimal import Decimal
import logging
from logging import handlers
from tqsdk import TqApi, TqAuth, TqKq
from apscheduler.schedulers.background import BackgroundScheduler

# begin 参数类------------------------
MARKET_INFO = {'SHFE': '上期所', 'DCE': '大商所', 'CZCE': '郑商所', 'CFFEX': '中金所', 'INE': '能源',\
               'KQ': '快期', 'SSE': '上交所', 'SZSE': '深交所'}
account = {}  # 账户资金
positions = {}  # 持仓信息
klines_dict = {}  # K线历史行情
quotes = {}  # 实时行情
ticks = {}  # tick行情数据
g_security = []  # 品种excel读取的合约前缀集合
un_buy_open = {}  # 未成交的多单开仓委托
un_sell_open = {}  # 未成交的空单开仓委托
un_sell_close = {}  # 未成交的多单减仓委托
un_buy_close = {}  # 未成交的空单减仓委托
ts_dict = {}  # 交易信号
SEC_LIST = []  # 品种集合
OPEN_DICT = {}
para = {}  # 配置文件信息
g_HS = {}  # 记录信号上中下轨的最近值
g_LS = {}
g_ZS = {}
# end 参数类--------------------------
pd.set_option('display.max_columns', 100)  # 显示全部列
pd.set_option('display.max_row', 500)  # 显示全部行
pd.set_option('display.width', 100)  # 设置数据的显示长度（解决自动换行）


class Logger(object):
    level_relations = {
        'debug':logging.DEBUG,
        'info':logging.INFO,
        'warning':logging.WARNING,
        'error':logging.ERROR,
        'crit':logging.CRITICAL
    }#日志级别关系映射

    def __init__(self,filename,level='info',when='D',interval=1,backCount=3,fmt='[%(asctime)s] [line:%(lineno)d] - %(levelname)s: %(message)s'):
        self.logger = logging.getLogger(filename)
        format_str = logging.Formatter(fmt)#设置日志格式
        self.logger.setLevel(self.level_relations.get(level))#设置日志级别
        sh = logging.StreamHandler()#往屏幕上输出
        sh.setFormatter(format_str) #设置屏幕上显示的格式
        th = handlers.TimedRotatingFileHandler(filename=filename,when=when,interval=interval,backupCount=backCount,encoding='utf-8')#往文件里写入#指定间隔时间自动生成文件的处理器
        #实例化TimedRotatingFileHandler
        #interval是时间间隔，backupCount是备份文件的个数，如果超过这个个数，就会自动删除，when是间隔的时间单位，单位有以下几种：
        # S 秒
        # M 分
        # H 小时、
        # D 天、
        # W 每星期（interval==0时代表星期一）
        # midnight 每天凌晨
        th.setFormatter(format_str)#设置文件里写入的格式
        self.logger.addHandler(sh) #把对象加到logger里
        self.logger.addHandler(th)
log = Logger('quan-runlog.log',level='info')

# ******读取加载配置文件**********
def loadConfig():
    cf=configparser.ConfigParser()
    cf.read("quan.ini", encoding="utf-8")

    para['io_in'] = cf.get("config","io_in")  # 'D:\\futures.xlsx' 设置读取股票池文件
    para['BAR_NUM'] = int(cf.get("config","bar_num"))  # 周期数
    para['BAR_UNIT']= int(cf.get("config","bar_unit"))  # K线数据周期, 以秒为单位。例如: 1分钟线为60,1小时线为3600
    para['MINDIFF'] = 1  # 最小价格变动单位，后续读文件内容
    para['ACCT_ID'] = cf.get("account","acct_id")
    para['ACCT_PWD'] = cf.get("account","acct_pwd")
    para['CUT_FLAG'] = int(cf.get("config", "CUT_FLAG"))
    para['CLOSE_NUM'] = int(cf.get("config", "close_num"))
    para['CLOSE_CNT'] = int(cf.get("config", "close_cnt"))
    para['OPEN_STEP'] = int(cf.get("config", "open_step"))
    para['CLOSE_STEP'] = int(cf.get("config", "close_step"))
    para['CUT_STEP'] = int(cf.get("config", "cut_step"))
    para['CANCEL_SECOND'] = int(cf.get("config","cancel_second"))
    #para['POLLING_SEC'] = int(cf.get("config", "polling_sec"))
    # para['TRADE_PARA'] = int(cf.get("config", "trade_para"))


def append_excel(df, content_list, excel_path):
    """
    excel文件中追加内容
    :return:
    content_list:待追加的内容列表
    """
    ds = pd.DataFrame(content_list)
    df = df.append(ds, ignore_index=True)
    df.to_excel(excel_path, index=False, header=False)


# 运行交易
def run_trade(stock):
    now = datetime.datetime.now()
    current_time = now.strftime('%H%M')
    global ts_dict
    global un_buy_open
    global un_sell_open
    global un_sell_close
    global un_buy_close
    ts_dict = {}
    ts_dict['b_open'] = ts_dict['s_open'] = ts_dict['b_close'] = ts_dict['s_close'] = 0
    position_short = 0
    position_long = 0
    last_min_data = quotes[stock]  # 最新价
    new_price = last_min_data.last_price
    price_tick = last_min_data.price_tick
    if positions.__contains__(stock):
        # 判断空单持仓
        position_short = positions[stock].pos_short
        # log.logger.info('{0} 当前空单持仓数：{1}'.format(stock, position_short))
        # 判断多单持仓
        position_long = positions[stock].pos_long
        # log.logger.info('{0} 当前多单持仓数：{1}'.format(stock, position_long))
    ts_dict = Trade_Signal(stock, para['BAR_NUM'])
    log.logger.info(
        '{0} 多单昨仓数: {1}, 今仓数: {2}'.format(stock, positions[stock].pos_long_his, positions[stock].pos_long_today))
    log.logger.info(
        '{0} 空单昨仓数: {1}, 今仓数: {2}'.format(stock, positions[stock].pos_short_his, positions[stock].pos_short_today))
    # 平多仓
    if ts_dict['s_close'] == 1:
        if position_long > 0:
            log.logger.info('{0} 已有多仓，需平多>>>>>>'.format(stock))
            # 平仓前把之前的未成交的减仓单撤掉,再进行平仓
            cancelBeforeClose(stock, un_sell_close, 'SELL', positions[stock], quotes[stock])
            api.wait_update()
        else:
            log.logger.info("{0} 无多仓，无需平多>>>>>>".format(stock))
    # 平空仓
    if ts_dict['b_close'] == 1:
        if position_short > 0:
            log.logger.info('{0} 已有空仓，需平空>>>>>>'.format(stock))
            # 平仓前把之前的未成交的减仓单撤掉,再进行平仓
            cancelBeforeClose(stock, un_buy_close, 'BUY', positions[stock], quotes[stock])
            api.wait_update()
        else:
            log.logger.info('{0} 无空仓，无需平空>>>>>>'.format(stock))
    # 开多仓
    if ts_dict['b_open'] == 1:
        if position_long > 0:
            log.logger.info('{0} 已有多仓，取消开多>>>>>>'.format(stock))
        else:
            log.logger.info('{0} 开多仓>>>>>>{1}手,委托价格：{2}'.format(stock, OPEN_DICT[stock], \
                                                                new_price + price_tick * para['OPEN_STEP']))
            doOpen(stock, un_buy_open, un_sell_close, 'BUY', now)
    # 开空仓
    if ts_dict['s_open'] == 1:
        if position_short > 0:
            log.logger.info('{0} 已有空仓，取消开空>>>>>>'.format(stock))
        else:
            log.logger.info('{0} 开空仓>>>>>>{1}手,委托价格：{2}'.format(stock, OPEN_DICT[stock], \
                                                                new_price - price_tick * para['OPEN_STEP']))
            doOpen(stock, un_sell_open, un_buy_close, 'SELL', now)

# 买卖信号函数
def Trade_Signal(stock, bar_num):
    ts_dict = {}
    ts_dict['b_open'] = ts_dict['s_open'] = ts_dict['b_close'] = ts_dict['s_close'] = 0
    ind_dict = getcost(stock)
    T2 = ind_dict['T2']
    T100 = ind_dict['T100']
    W100 = ind_dict['W100']
    LOS100 = ind_dict['LOS100']

    T_B = T2[-1] > T100[-1] and (T2[-2] < T100[-2] or T2[-3] < T100[-3])
    T_S = T100[-1] > T2[-1] and (T100[-2] < T2[-2] or T100[-3] < T2[-3])
    C_B = T2[-1] > LOS100[-1] and (T2[-2] < LOS100[-2] or T2[-3] < LOS100[-3])
    C_S = W100[-1] > T2[-1] and (W100[-2] < T2[-2] or W100[-3] < T2[-3])
    ts_dict['b_open'] = 1 if T_B else 0
    ts_dict['s_open'] = 1 if T_S else 0
    ts_dict['b_close'] = 1 if ts_dict['b_open'] == 1 else 0  # 买平仓，平空
    ts_dict['s_close'] = 1 if ts_dict['s_open'] == 1 else 0  # 卖平仓，平多
    # ts_dict['b_close'] = 1 if T_B or C_B else 0  # 买平仓，平空
    # ts_dict['s_close'] = 1 if T_S or C_S else 0  # 卖平仓，平多

    log.logger.info('最新价:{0} {1}'.format(quotes[stock]['last_price'], quotes[stock]['datetime']))
    log.logger.info('T2-{0},T100-{1}'.format(T2, T100))
    log.logger.info('开多-{0},开空-{1}'.format(ts_dict['b_open'], ts_dict['s_open']))
    return ts_dict


# 计算指标值，isCurrent是否当前周期，1为当前周期，0为上一周期
def getcost(sec):
    ind_dict = {}
    his_data = klines_dict[sec]
    if his_data.empty:
        return 0
    vol_list = np.array(his_data['volume'][:-1])
    close_list = np.array(his_data['close'][:-1])
    high_list = np.array(his_data['high'][:-1])
    open_list = np.array(his_data['open'][:-1])
    low_list = np.array(his_data['low'][:-1])
    sn1 = para['STG_NUM1']
    sn2 = para['STG_NUM2']

    HH_2 = low_list[-sn1 - 2:-2].max()
    H2_2 = low_list[-2 - 2:-2].max()
    H100_2 = low_list[-sn2 - 2:-2].max()
    LL_2 = high_list[-sn1 - 2:-2].min()
    L2_2 = high_list[-2 - 2:-2].min()
    L100_2 = high_list[-sn2 - 2:-2].min()
    W100_2 = L100_2 - LL_2
    W2_2 = L2_2 - LL_2
    LOS100_2 = H100_2 - HH_2
    LOS2_2 = H2_2 - HH_2
    T100_2 = W100_2 + LOS100_2
    T2_2 = W2_2 + LOS2_2

    HH_1 = low_list[-sn1-1:-1].max()
    H2_1 = low_list[-2-1:-1].max()
    H100_1 = low_list[-sn2-1:-1].max()
    LL_1 = high_list[-sn1-1:-1].min()
    L2_1 = high_list[-2-1:-1].min()
    L100_1 = high_list[-sn2-1:-1].min()
    W100_1 = L100_1 - LL_1
    W2_1 = L2_1 - LL_1
    LOS100_1 = H100_1 - HH_1
    LOS2_1 = H2_1 - HH_1
    T100_1 = W100_1 + LOS100_1
    T2_1 = W2_1 + LOS2_1

    HH = low_list[-sn1:].max()
    H2 = low_list[-2:].max()
    H100 = low_list[-sn2:].max()
    LL = high_list[-sn1:].min()
    L2 = high_list[-2:].min()
    L100 = high_list[-sn2:].min()
    W100 = L100 - LL
    W2 = L2 - LL
    LOS100 = H100 - HH
    LOS2 = H2 - HH
    T100 = W100 + LOS100
    T2 = W2 + LOS2

    ind_dict['T2'] = [T2_2, T2_1, T2]
    ind_dict['T100'] = [T100_2, T100_1, T100]
    ind_dict['W2'] = [W2_2, W2_1, W2]
    ind_dict['W100'] = [W100_2, W100_1, W100]
    ind_dict['LOS2'] = [LOS2_2, LOS2_1, LOS2]
    ind_dict['LOS100'] = [LOS100_2, LOS100_1, LOS100]

    return ind_dict


# 平仓前先对之前的预埋单减仓（平仓）委托进行撤单
def cancelBeforeClose(stock, dict_un_close, direct, position, quote):
    # sell_close--平多，buy_close--平空
    if direct == 'SELL':
        un_close_text = '多'
        vol_his = position.pos_long_his
        vol_today = position.pos_long_today
        vol_common = position.pos_long
    elif direct == 'BUY':
        un_close_text = '空'
        vol_his = position.pos_short_his
        vol_today = position.pos_short_today
        vol_common = position.pos_short
    new_price = quote.last_price
    price_tick = quote.price_tick
    for ord in dict_un_close[stock]:
        qry_order = api.get_order(ord)
        if qry_order.status != "FINISHED":
            log.logger.info('{0} 存在预埋平{1}委托，单号[{2}]，对其撤单>>>>>>'.format(stock, un_close_text, ord))
            api.cancel_order(ord)
    dict_un_close[stock] = []
    if stock.find('SHFE') >= 0 or stock.find('INE') >= 0:
        close_price = (new_price + price_tick*para['CLOSE_STEP']) if direct == "BUY" else (new_price - price_tick*para['CLOSE_STEP'])
        if vol_his > 0:
            log.logger.info('{0}有{1}手{2}头老仓，进行平{3}>>>>>>'.format(stock, vol_his, un_close_text, un_close_text))
            order = api.insert_order(symbol=stock, direction=direct, offset="CLOSE",
                                     volume=vol_his, limit_price=close_price)
        elif vol_today > 0:
            log.logger.info('{0}有{1}手{2}头今仓，进行平{3}>>>>>>'.format(stock, vol_today, un_close_text, un_close_text))
            order = api.insert_order(symbol=stock, direction=direct, offset="CLOSETODAY",
                                     volume=vol_today, limit_price=close_price)
    else:
        log.logger.info('{0}有{1}手{2}仓，进行平{3}>>>>>>'.format(stock, vol_common, un_close_text, un_close_text))
        order = api.insert_order(symbol=stock, direction=direct, offset="CLOSE", volume=vol_common)

# 开仓逻辑，开仓后下预埋单根据配置减仓
def doOpen(stock, dict_un_open, dict_un_close, direct, now):
    new_price = quotes[stock].last_price
    price_tick = quotes[stock].price_tick
    open_price = (new_price + price_tick*para['OPEN_STEP']) if direct == 'BUY' else (new_price - price_tick*para['OPEN_STEP'])
    order = api.insert_order(symbol=stock, direction=direct, offset="OPEN", volume=OPEN_DICT[stock], limit_price=open_price)
    dict_un_open[stock].append(order.order_id)
    # -----设定n秒后执行检查委托状态并撤单追单---
    scheduler = BackgroundScheduler()
    scheduler.add_job(cancelJob, 'date', run_date=now + datetime.timedelta(seconds=para['CANCEL_SECOND']),
                      args=[order.order_id, stock, direct, dict_un_open, dict_un_close])
    # 一个独立的线程启动任务
    scheduler.start()


# 延时任务撤单追单
def cancelJob(order_id, stock, direct, dict_un_open, dict_un_close):
    qry_order = api.get_order(order_id)
    new_price = quotes[stock].last_price
    price_tick = quotes[stock].price_tick
    if qry_order.status != "FINISHED":
        log.logger.info('{0}开仓委托超过{1}秒尚未成交, 发起撤单'.format(stock, para['CANCEL_SECOND']))
        api.cancel_order(order_id)
        dict_un_open[stock] = []
        # 撤单后追单
        order_price = (new_price+price_tick*para['OPEN_STEP']) if direct == "BUY" else (new_price-price_tick*para['OPEN_STEP'])
        log.logger.info('{0} 开多仓>>>>>>{1}手,委托价格：{2}'.format(stock, OPEN_DICT[stock], order_price))
        order = api.insert_order(symbol=stock, direction=direct, offset="OPEN", volume=OPEN_DICT[stock],
                                 limit_price=order_price)
        dict_un_open[stock].append(order.order_id)

# 延时任务撤减仓单
def cancelCutJob(order_id, stock):
    qry_order = api.get_order(order_id)
    if qry_order.status != "FINISHED":
        log.logger.info('{0}减仓委托超过{1}秒尚未成交, 发起撤单'.format(stock, para['CANCEL_SECOND']))
        api.cancel_order(order_id)

# 设定轮询定时任务，每分钟前10秒判断平仓信号
def setScheduler():
    sched = BackgroundScheduler()
    sched.add_job(checkNeedClose, 'cron', minute='*', second=12)
    sched.add_job(checkContract, 'cron', day='*', hour=20, minute=57, second=2)
    # sched.add_job(checkContract, 'interval', seconds=10)
    sched.start()

# 检查是否需要平仓
def checkNeedClose():
    now = datetime.datetime.now()
    curr_time = now.strftime('%H:%M:%S')
    isTrading = checkTime(curr_time)
    if not isTrading:
        return
    global un_sell_close
    global un_buy_close
    for stock in SEC_LIST:
        last_min_data = quotes[stock]  # 最新价
        new_price = last_min_data.last_price
        price_tick = last_min_data.price_tick
        ind_dict = getcost(stock)
        T2 = ind_dict['T2']
        T100 = ind_dict['T100']
        W2 = ind_dict['W2']
        W100 = ind_dict['W100']
        LOS2 = ind_dict['LOS2']
        LOS100 = ind_dict['LOS100']
        pos_long = positions[stock].pos_long
        pos_short = positions[stock].pos_short
        pos_long_ava = pos_long - positions[stock].volume_long_frozen
        pos_short_ava = pos_short - positions[stock].volume_short_frozen
        profit_long = positions[stock].position_profit_long
        profit_short = positions[stock].position_profit_short
        offsetStr_buy, offsetStr_sell = "CLOSE", "CLOSE"
        if pos_short_ava > 0 and T2[-1] > T100[-1]:
            log.logger.info('{0} 做多信号已触发，需进行平空>>>>>>'.format(stock))
            cancelBeforeClose(stock, un_buy_close, 'BUY', positions[stock], quotes[stock])
        if pos_long_ava > 0 and T100[-1] > T2[-1]:
            log.logger.info('{0} 做空信号已触发，需进行平多>>>>>>'.format(stock))
            cancelBeforeClose(stock, un_sell_close, 'SELL', positions[stock], quotes[stock])
        if para['CUT_FLAG'] != 1:
            continue
        # 隔日夜盘判断昨仓的情况
        if stock.find('SHFE') >= 0 or stock.find('INE') >= 0:
            if positions[stock].pos_long_today > 0:
                offsetStr_sell = "CLOSETODAY"  # 对应平多
            if positions[stock].pos_short_today > 0:
                offsetStr_buy = "CLOSETODAY"  # 对应平空
        if profit_long == profit_long:
            # log.logger.info('{0} 多单昨仓数: {1}, 今仓数: {2}'.format(stock, positions[stock].pos_long_his, positions[stock].pos_long_today))
            if profit_long > 0 and OPEN_DICT[stock] - pos_long_ava < para['CLOSE_NUM'] * para['CLOSE_CNT']:
                LOS100_LOS2 = (LOS100[-1] > LOS2[-1] and LOS100[-2] < LOS2[-2])
                LOS100_LOS2_1 = (LOS100[-2] > LOS2[-2] and LOS100[-3] < LOS2[-3])
                W100_T2 = (W100[-1] > T2[-1] and W100[-2] < T2[-2])
                if (T2[-1] > W100[-1] and T100[-1] > LOS100[-1] and (LOS100_LOS2 or LOS100_LOS2_1)) or W100_T2:
                    log.logger.info('{0}多单达到止盈减仓位置!!!止盈减仓{1}手>>>'.format(stock, para['CLOSE_NUM']))
                    close_order1 = api.insert_order(symbol=stock, direction='SELL', offset=offsetStr_sell,
                                                    volume=para['CLOSE_NUM'], limit_price=(new_price - price_tick*para['CUT_STEP']))
                    un_sell_close[stock].append(close_order1.order_id)
                    #延时检查减仓
                    scheduler = BackgroundScheduler()
                    scheduler.add_job(cancelCutJob, 'date',
                                      run_date=now + datetime.timedelta(seconds=para['CANCEL_SECOND']),
                                      args=[close_order1.order_id, stock])
                    scheduler.start()
        if profit_short == profit_short:
            # log.logger.info('{0} 空单昨仓数: {1}, 今仓数: {2}'.format(stock, positions[stock].pos_short_his, positions[stock].pos_short_today))
            if profit_short > 0 and OPEN_DICT[stock] - pos_short_ava < para['CLOSE_NUM'] * para['CLOSE_CNT']:
                W2_W100 = (W2[-1] > W100[-1] and W2[-2] < W100[-2])
                W2_W100_1 = (W2[-2] > W100[-2] and W2[-3] < W100[-3])
                T2_LOS100 = (T2[-1] > LOS100[-1] and T2[-2] < LOS100[-2])
                if (T2[-1] < LOS100[-1] and T100[-1] < W100[-1] and (W2_W100 or W2_W100_1)) or T2_LOS100:
                    log.logger.info('{0}空单达到止盈减仓位置!!!止盈减仓{1}手>>>'.format(stock, para['CLOSE_NUM']))
                    close_order1 = api.insert_order(symbol=stock, direction='BUY', offset=offsetStr_buy, \
                                                    volume=para['CLOSE_NUM'], limit_price=(new_price + price_tick*para['CUT_STEP']))
                    un_buy_close[stock].append(close_order1.order_id)
                    scheduler = BackgroundScheduler()
                    scheduler.add_job(cancelCutJob, 'date',
                                      run_date=now + datetime.timedelta(seconds=para['CANCEL_SECOND']),
                                      args=[close_order1.order_id, stock])
                    scheduler.start()


# 检查主力合约是否切换
def checkContract():
    # 待平仓的老合约
    delete_secs = []
    # 现有持仓中的合约列表
    pos_keys = positions.keys()
    # 读取excel中的品种
    data = pd.read_excel(para['io_in'], sheet_name=0, converters={'stk_code': str})
    g_security = data['stk_code'].tolist()
    SEC_LIST = []
    for g_sec in g_security:
        cont_code = 'KQ.m@%s' % g_sec
        ls = api.get_quote(cont_code)
        SEC_LIST.append(ls.underlying_symbol)
    for sec in SEC_LIST:
        if sec not in pos_keys:
            positions[sec] = api.get_position(sec)
            klines_dict[sec] = api.get_kline_serial(sec, para['BAR_UNIT'], para['BAR_NUM'] * 1.2)
            quotes[sec] = api.get_quote(sec)
            ticks[sec] = api.get_tick_serial(sec)
            un_buy_open[sec] = []
            un_sell_open[sec] = []
            un_buy_close[sec] = []
            un_sell_close[sec] = []
    for key in pos_keys:
        if key not in SEC_LIST:
            delete_secs.append(key)
    print("需要平仓的旧合约列表：", len(delete_secs))
    for stock in delete_secs:
        if positions[stock].pos_short > 0:
            log.logger.info('{0} 非当前主力合约，进行平空>>>>>>'.format(stock))
            cancelBeforeClose(stock, un_buy_close, 'BUY', positions[stock], quotes[stock])
        if positions[stock].pos_long > 0:
            log.logger.info('{0} 非当前主力合约，进行平多>>>>>>'.format(stock))
            cancelBeforeClose(stock, un_sell_close, 'SELL', positions[stock], quotes[stock])

# 检查是否交易时间
def checkTime(curr_time):
    # un_trade_time = [["00:00:00", "08:59:59"], ["10:15:01", "10:29:59"], ["11:30:01", "13:29:59"],
    #                  ["15:00:01", "20:59:59"], ["23:00:01", "23:59:59"]]
    un_trade_time = [["02:30:01", "08:59:59"], ["10:15:01", "10:29:59"], ["11:30:01", "13:29:59"],
                     ["15:00:01", "20:59:59"]]
    for un_tt in un_trade_time:
        if un_tt[1] >= curr_time >= un_tt[0]:
            return False
    return True


if __name__ == '__main__':
    loadConfig()
    data = pd.read_excel(para['io_in'], sheet_name=0, converters={'stk_code': str})  # excel读取的品种集合
    log.logger.info('品种数：{0}'.format(len(data['stk_code'])))
    g_security = data['stk_code'].tolist()  # "'a' 品种前缀 g_security
    open_num_list = data['open_num'].tolist()

    stg = pd.read_excel('stg_cfg.xlsx', sheet_name=0)  # excel读stg对应关系
    para['STG_NUM1'] = stg['k'+str(para['BAR_UNIT'])].iloc[0]
    para['STG_NUM2'] = stg['k' + str(para['BAR_UNIT'])].iloc[1]
    # wt_data = pd.DataFrame(columns=['date', 'stk_code', 'win_rate', 'short_val', 'long_val']) #输出落地的excel字段
    # wt_data.to_excel(io_out, index=False)
    # 登录连接信易快期账户
    api = TqApi(TqKq(), web_gui=True, auth=TqAuth(para['ACCT_ID'], para['ACCT_PWD']))
    account = api.get_account()
    log.logger.info('初始账户权益：{0}'.format(account.balance))
    log.logger.info('初始浮动盈亏：{0}'.format(account.float_profit))
    SEC_LIST = []
    for g_sec in g_security:
        ls = api.get_quote('KQ.m@%s' % g_sec)
        SEC_LIST.append(ls.underlying_symbol)
    log.logger.info('品种集合：{0}'.format(SEC_LIST))
    # 获取主力合约
    # domain = api.get_quote("KQ.m@DCE.m")
    # 获取主力合约的K线引用
    for sec in SEC_LIST:
        positions[sec] = api.get_position(sec)
        klines_dict[sec] = api.get_kline_serial(sec, para['BAR_UNIT'], para['BAR_NUM'])
        quotes[sec] = api.get_quote(sec)
        ticks[sec] = api.get_tick_serial(sec)
        un_buy_open[sec] = []
        un_sell_open[sec] = []
        un_buy_close[sec] = []
        un_sell_close[sec] = []
        g_HS[sec] = []
        g_LS[sec] = []
        g_ZS[sec] = []
        OPEN_DICT[sec] = open_num_list[SEC_LIST.index(sec)]
    orders = api.get_order()
    for order_id, val in orders.items():
        secid = val['exchange_id']+'.'+val['instrument_id']
        if val['direction'] == 'BUY' and (val['offset'] == 'OPEN') and val['status'] != 'FINISHED':
            un_buy_open[secid].append(order_id)
        elif val['direction'] == 'SELL' and (val['offset'] == 'OPEN') and val['status'] != 'FINISHED':
            un_sell_open[secid].append(order_id)
        elif val['direction'] == 'BUY' and (val['offset'] == 'CLOSE' or val['offset'] == 'CLOSETODAY') and val['status'] != 'FINISHED':
            un_buy_close[secid].append(order_id)
        elif val['direction'] == 'SELL' and (val['offset'] == 'CLOSE' or val['offset'] == 'CLOSETODAY') and val['status'] != 'FINISHED':
            un_sell_close[secid].append(order_id)

    #api.wait_update()
    setScheduler()  # 执行轮询任务
    while True:
        api.wait_update()
        for sec in SEC_LIST:
            if api.is_changing(klines_dict[sec].iloc[-1], "datetime"):
                log.logger.info('------------------------------------------')
                log.logger.info('{0}新K线时间：{1}'.format(sec, datetime.datetime.fromtimestamp(klines_dict[sec].iloc[-1]["datetime"] / 1e9)))
                log.logger.info('账户权益：{0}'.format(account.balance))
                run_trade(sec)

    api.close()

