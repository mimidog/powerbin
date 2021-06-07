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
import signalA as sg

# begin 参数类------------------------
MARKET_INFO = {'SHFE': '上期所', 'DCE': '大商所', 'CZCE': '郑商所', 'CFFEX': '中金所',\
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
C0_DICT = {}  # 信号指标序列
g_CVal = {}
close_axis_dict = {}  # 平仓信号累计值
ts_dict = {}  # 交易信号
SEC_LIST = []  # 品种集合
para = {}  # 配置文件信息
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
log = Logger('ctp-runlog.log',level='info')

# ******读取加载配置文件**********
def loadConfig():
    cf=configparser.ConfigParser()
    cf.read("0301A.ini", encoding="utf-8")

    para['io_in'] = cf.get("config","io_in")  # 'D:\\futures.xlsx' 设置读取股票池文件
    para['io_out'] = cf.get("config","io_out")  # 记录C1、C2的持仓期间的最大值
    para['BAR_NUM'] = int(cf.get("config","bar_num"))  # 周期数
    para['BAR_UNIT']= int(cf.get("config","bar_unit"))  # K线数据周期, 以秒为单位。例如: 1分钟线为60,1小时线为3600
    para['MINDIFF'] = 1  # 最小价格变动单位，后续读文件内容
    para['ACCT_ID'] = cf.get("account","acct_id")
    para['ACCT_PWD'] = cf.get("account","acct_pwd")
    para['OPEN_NUM'] = int(cf.get("config","open_num"))
    para['CLOSE_NUM'] = int(cf.get("config","close_num"))
    para['CLOSE_NUM2'] = int(cf.get("config","close_num2"))
    para['CLOSE_STEP'] = int(cf.get("config","close_step"))
    para['CANCEL_SECOND'] = int(cf.get("config","cancel_second"))
    para['CLOSE_XRADIO'] = float(cf.get("config","close_xradio"))
    para['SIGNAL_ID'] = int(cf.get("config","signal_id"))
    para['OPEN_ADD'] = int(cf.get("config","open_add"))
    para['CLOSE_AXIS'] = int(cf.get("config","close_axis"))
    para['TP_RATIO1'] = float(cf.get("config","tp_ratio1"))
    para['TP_RATIO2'] = float(cf.get("config","tp_ratio2"))
    para['SP_RATIO'] = float(cf.get("config","sp_ratio"))
    para['TRADE_PARA'] = int(cf.get("config", "trade_para"))


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
    global C0_DICT
    global ts_dict
    global un_buy_open
    global un_sell_open
    global un_sell_close
    global un_buy_close
    global close_axis_dict
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
    ts_dict, C0 = sg.Trade_Signal(klines_dict[stock], para['TRADE_PARA'])
    log.logger.info('C0值：{0}'.format(C0))
    C0_DICT[stock] = C0  # 更新指标值
    if position_short > 0 and abs(min(C0[-5:])) > g_CVal[stock]['C1']:
        g_CVal[stock]['C1'] = abs(min(C0[-5:]))
    if position_long > 0 and abs(max(C0[-5:])) > g_CVal[stock]['C2']:
        g_CVal[stock]['C2'] = abs(max(C0[-5:]))

    if max(C0[-6:-1]) > 0 > max(C0[-5:]) and g_CVal[stock]['C2'] >= 10:
        ts_dict['s_close'] = 1
    if min(C0[-6:-1]) < 0 < min(C0[-5:]) and g_CVal[stock]['C1'] >= 10:
        ts_dict['b_close'] = 1
    log.logger.info("{0}信号值ts_dict['b_open']={1}, ts_dict['s_open']={2}, ts_dict['b_close']={3}, ts_dict['s_close']={4}".format(\
        stock, ts_dict['b_open'], ts_dict['s_open'], ts_dict['b_close'], ts_dict['s_close']))
    # log.logger.info("close_axis_dict:{0}".format(close_axis_dict))
    # log.logger.info(
    #     '{0} 多单昨仓数: {1}, 今仓数: {2}'.format(stock, positions[stock].pos_long_his, positions[stock].pos_long_today))
    # log.logger.info(
    #     '{0} 空单昨仓数: {1}, 今仓数: {2}'.format(stock, positions[stock].pos_short_his, positions[stock].pos_short_today))
    # 平多仓
    if ts_dict['s_close'] == 1:
        # if abs(max(C0_DICT[stock][-5:])) <= 2:
        #     close_axis_dict[stock]['s_close'] += 1
        #     if close_axis_dict[stock]['s_close'] < para['CLOSE_AXIS']:
        #         return
        # close_axis_dict[stock]['s_close'] = 0
        if position_long > 0:
            log.logger.info('{0} 已有多仓，需平多>>>>>>'.format(stock))
            # 平仓前把之前的未成交的减仓单撤掉,再进行平仓
            cancelBeforeClose(stock, un_sell_close, 'SELL', positions[stock], quotes[stock])
            api.wait_update()
        else:
            log.logger.info("{0} 无多仓，无需平多>>>>>>".format(stock))
        checkOpenAdd('s_close', stock, position_long, new_price-price_tick)
    # 平空仓
    if ts_dict['b_close'] == 1:
        # if abs(min(C0_DICT[stock][-5:])) <= 2:
        #     close_axis_dict[stock]['b_close'] += 1
        #     if close_axis_dict[stock]['b_close'] < para['CLOSE_AXIS']:
        #         return
        # close_axis_dict[stock]['b_close'] = 0
        if position_short > 0:
            log.logger.info('{0} 已有空仓，需平空>>>>>>'.format(stock))
            # 平仓前把之前的未成交的减仓单撤掉,再进行平仓
            cancelBeforeClose(stock, un_buy_close, 'BUY', positions[stock], quotes[stock])
            api.wait_update()
        else:
            log.logger.info('{0} 无空仓，无需平空>>>>>>'.format(stock))
        # 根据参数判断是否需要补反手仓
        checkOpenAdd('b_close', stock, position_long, new_price+price_tick)
    # 开多仓
    if ts_dict['b_open'] == 1:
        if position_long > 0:
            log.logger.info('{0} 已有多仓，取消开多>>>>>>'.format(stock))
        else:
            g_CVal[stock]['C2'] = abs(max(C0[-5:]))
            log.logger.info('{0} 开多仓>>>>>>{1}手,委托价格：{2}'.format(stock, para['OPEN_NUM'], new_price + price_tick))
            doOpen(stock, un_buy_open, un_sell_close, 'BUY', now)
    # 开空仓
    if ts_dict['s_open'] == 1:
        if position_short > 0:
            log.logger.info('{0} 已有空仓，取消开空>>>>>>'.format(stock))
        else:
            g_CVal[stock]['C1'] = abs(min(C0[-5:]))
            log.logger.info('{0} 开空仓>>>>>>{1}手,委托价格：{2}'.format(stock, para['OPEN_NUM'], new_price))
            doOpen(stock, un_sell_open, un_buy_close, 'SELL', now)


# 平仓前先对之前的未成交减仓（平仓）委托进行撤单
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
        close_price = (new_price + price_tick*2) if direct == "BUY" else (new_price - price_tick*2)
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

# 开仓逻辑，开仓后间隔设定时间后判断是否成交追单
def doOpen(stock, dict_un_open, dict_un_close, direct, now):
    new_price = quotes[stock].last_price
    price_tick = quotes[stock].price_tick
    order = api.insert_order(symbol=stock, direction=direct, offset="OPEN", volume=para['OPEN_NUM'],
                             limit_price=(new_price + price_tick) if direct=='BUY' else (new_price - price_tick))
    dict_un_open[stock].append(order.order_id)
    # -----设定n秒后执行检查委托状态并撤单追单---
    scheduler = BackgroundScheduler()
    scheduler.add_job(cancelJob, 'date', run_date=now + datetime.timedelta(seconds=para['CANCEL_SECOND']),
                      args=[order.order_id, stock, direct, dict_un_open, dict_un_close])
    # 一个独立的线程启动任务
    scheduler.start()
    '''
    while order.status != "FINISHED":
        api.wait_update()
    if direct == 'BUY':
        vol_common = positions[stock].pos_long
        close_direct = 'SELL'
        close_text = '多'
    elif direct == 'SELL':
        vol_common = positions[stock].pos_short
        close_direct = 'BUY'
        close_text = '空'
    if positions.__contains__(stock) and vol_common > 0:
        log.logger.info('{0} 下减{1}仓预埋单doOpen>>>>>>'.format(stock, close_text))
        offsetStr = "CLOSETODAY" if stock.find('SHFE') >= 0 or stock.find('INE') >= 0 else "CLOSE"
        close_order1 = api.insert_order(symbol=stock, direction=close_direct, offset=offsetStr, volume=para['CLOSE_NUM'],
                                        limit_price=(new_price + price_tick * 10) if direct=='BUY' else (new_price - price_tick * 10))
        close_order2 = api.insert_order(symbol=stock, direction=close_direct, offset=offsetStr, volume=para['CLOSE_NUM2'],
                                        limit_price=(new_price + price_tick * 20) if direct=='BUY' else (new_price - price_tick * 20))
        api.wait_update()
        dict_un_close[stock].append(close_order1.order_id)
        dict_un_close[stock].append(close_order2.order_id)
    '''


# 检查单方向平仓后是否加开反手仓
def checkOpenAdd(signal_type, stock, position_num, price):
    if para['OPEN_ADD'] == 0:
        return
    if position_num < para['OPEN_NUM']:
        if signal_type == 's_close':
            log.logger.info('{0} 目前空仓位{1}手,加开空仓{2}手,委托价格：{3}>>>>>>'.format(stock, position_num, \
                              para['OPEN_NUM']-position_num, price))
            order = api.insert_order(symbol=stock, direction="SELL", offset="OPEN", volume=para['OPEN_NUM']-position_num,
                                     limit_price=price)
        elif signal_type == 'b_close':
            log.logger.info('{0} 目前多仓位{1}手,加开多仓{2}手,委托价格：{3}>>>>>>'.format(stock, position_num, \
                              para['OPEN_NUM']-position_num, price))
            order = api.insert_order(symbol=stock, direction="BUY", offset="OPEN", volume=para['OPEN_NUM']-position_num,
                                     limit_price=price)


# 达到检查比例进行减仓（暂未启用）
def trade_close(stock,position_short,position_long):
    cur_close = klines_dict[stock].iloc[-2].close
    pre_close = klines_dict[stock].iloc[-3].close
    if abs((cur_close - pre_close) / pre_close) > para['CLOSE_XRADIO']:
        if position_short > 0:
            log.logger.info('达到预设空单减仓比值[{0}], 空单减仓一手'.format(para['CLOSE_XRADIO']))
            order = api.insert_order(symbol=stock, direction="BUY", offset="CLOSE", volume=1)
        if position_long > 0:
            log.logger.info('达到预设多单减仓比值[{0}], 多单减仓一手'.format(para['CLOSE_XRADIO']))
            order = api.insert_order(symbol=stock, direction="SELL", offset="CLOSE", volume=1)
        api.wait_update()


# 延时任务撤单追单
def cancelJob(order_id, stock, direct, dict_un_open, dict_un_close):
    qry_order = api.get_order(order_id)
    new_price = quotes[stock].last_price
    price_tick = quotes[stock].price_tick
    if qry_order.status != "FINISHED":
        log.logger.info('开仓委托超过{0}秒尚未成交, 发起撤单'.format(para['CANCEL_SECOND']))
        api.cancel_order(order_id)
        dict_un_open[stock] = []
        # 撤单后追单
        order_price = (new_price+price_tick) if direct == "BUY" else (new_price-price_tick)
        log.logger.info('{0} 开多仓>>>>>>{1}手,委托价格：{2}'.format(stock, para['OPEN_NUM'], order_price))
        order = api.insert_order(symbol=stock, direction=direct, offset="OPEN", volume=para['OPEN_NUM'],
                                 limit_price= order_price)
        dict_un_open[stock].append(order.order_id)
        '''
        time.sleep(2)
        if direct == 'BUY':
            vol_common = positions[stock].pos_long
            close_direct = 'SELL'
            close_text = '多'
        elif direct == 'SELL':
            vol_common = positions[stock].pos_short
            close_direct = 'BUY'
            close_text = '空'
        if positions.__contains__(stock) and vol_common > 0:
            log.logger.info('{0} 下减{1}仓预埋单cancelJob>>>>>>'.format(stock, close_text))
            offsetStr = "CLOSETODAY" if stock.find('SHFE') >= 0 or stock.find('INE') >= 0 else "CLOSE"
            close_order1 = api.insert_order(symbol=stock, direction=close_direct, offset=offsetStr,
                                            volume=para['CLOSE_NUM'],
                                            limit_price=(new_price + price_tick * 10) if direct == 'BUY' else (
                                                        new_price - price_tick * 10))
            close_order2 = api.insert_order(symbol=stock, direction=close_direct, offset=offsetStr,
                                            volume=para['CLOSE_NUM2'],
                                            limit_price=(new_price + price_tick * 20) if direct == 'BUY' else (
                                                        new_price - price_tick * 20))
            dict_un_close[stock].append(close_order1.order_id)
            dict_un_close[stock].append(close_order2.order_id)
        '''


# 定时子任务
def closeJob():
    now = datetime.datetime.now()
    curr_time = now.strftime('%H:%M:%S')
    isTrading = checkTime(curr_time)
    if not isTrading:
        return
    global C0_DICT
    global ts_dict
    global un_buy_open
    global un_sell_open
    global un_sell_close
    global un_buy_close
    global close_axis_dict
    now = datetime.datetime.now()
    for stock in SEC_LIST:
        if len(C0_DICT[stock]) == 0:
            continue
        last_min_data = quotes[stock]  # 最新价
        new_price = last_min_data.last_price
        price_tick = last_min_data.price_tick
        C1 = min(C0_DICT[stock][-5:])  # 下穿做空,上穿平仓
        C2 = max(C0_DICT[stock][-5:])  # 上穿做多,xia穿平仓
        position_long = positions[stock].pos_long
        position_short = positions[stock].pos_short
        #print(stock, ' position_long: ',position_long,', position_short: ',position_short)
        #print(un_buy_close)
        #print(un_sell_close)
        if C1 > para['TRADE_PARA'] and position_short > 0:
            log.logger.info('存在尚需平仓空单>>>>>>')
            # 平仓前把之前的未成交的减仓单撤掉
            for ord in un_buy_close[stock]:
                qry_order = api.get_order(ord)
                if qry_order.status != "FINISHED":
                    log.logger.info('{0}存在预埋平多委托，单号[{1}]，对其撤单>>>>>>'.format(stock, ord))
                    api.cancel_order(ord)
            un_buy_close[stock] = []
            if stock.find('SHFE') >= 0 or stock.find('INE') >= 0:
                if positions[stock].pos_short_his > 0:
                    log.logger.info('{0}有{1}手空头老仓，进行平空>>>>>>'.format(stock, positions[stock].pos_short_his))
                    order = api.insert_order(symbol=stock, direction="BUY", offset="CLOSE",
                                             volume=positions[stock].pos_short_his, \
                                             limit_price=new_price + price_tick * 2)
                elif positions[stock].pos_short_today > 0:
                    log.logger.info('{0}有{1}手空头今仓，进行平空>>>>>>'.format(stock, positions[stock].pos_short_today))
                    order = api.insert_order(symbol=stock, direction="BUY", offset="CLOSETODAY",
                                             volume=positions[stock].pos_short_today, \
                                             limit_price=new_price + price_tick * 2)
            else:
                log.logger.info('{0}有{1}手空仓，进行平空>>>>>>'.format(stock, position_short))
                order = api.insert_order(symbol=stock, direction="BUY", offset="CLOSE", volume=position_short)
        if C2 < -para['TRADE_PARA'] and position_long > 0:
            log.logger.info('存在尚需平仓多单>>>>>>')
            # 平仓前把之前的未成交的减仓单撤掉
            for ord in un_sell_close[stock]:
                qry_order = api.get_order(ord)
                if qry_order.status != "FINISHED":
                    log.logger.info('存在预埋平空委托，单号[{0}]，对其撤单>>>>>>'.format(ord))
                    api.cancel_order(ord)
            un_sell_close[stock] = []
            if stock.find('SHFE') >= 0 or stock.find('INE') >= 0:
                if positions[stock].pos_long_his > 0:
                    log.logger.info('{0}有{1}手多头老仓，进行平多>>>>>>'.format(stock, positions[stock].pos_long_his))
                    order = api.insert_order(symbol=stock, direction="SELL", offset="CLOSE",
                                             volume=positions[stock].pos_long_his, \
                                             limit_price=new_price - price_tick * 2)
                elif positions[stock].pos_long_today > 0:
                    log.logger.info('{0}有{1}手多头今仓，进行平多>>>>>>'.format(stock, positions[stock].pos_long_today))
                    order = api.insert_order(symbol=stock, direction="SELL", offset="CLOSETODAY",
                                             volume=positions[stock].pos_long_today, \
                                             limit_price=new_price - price_tick * 2)
            else:
                log.logger.info('{0}有{1}手多仓，进行平多>>>>>>'.format(stock, position_long))
                order = api.insert_order(symbol=stock, direction="SELL", offset="CLOSE", volume=position_long)
        if C2 > para['TRADE_PARA'] and (max(C0_DICT[stock][-6:-1]) < para['TRADE_PARA'] or max(C0_DICT[stock][-7:-2]) < para['TRADE_PARA']) and position_long == 0:
            # 补开仓前把之前的未成交的开仓单撤掉
            for ord in un_buy_open[stock]:
                qry_order = api.get_order(ord)
                if qry_order.status != "FINISHED":
                    log.logger.info('{0} 存在未成交开多委托，单号[{1}]，对其撤单>>>>>>'.format(stock, ord))
                    api.cancel_order(ord)
            un_buy_open[stock] = []
            if stock.find('SHFE') >= 0 or stock.find('INE') >= 0:
                log.logger.info('{0} 补开多仓>>>>>>{1}手,委托价格{2}'.format(stock, para['OPEN_NUM'], new_price + price_tick))
                order = api.insert_order(symbol=stock, direction="BUY", offset="OPEN", volume=para['OPEN_NUM'],
                                         limit_price=new_price+price_tick)
            else:
                log.logger.info('{0} 补开多仓>>>>>>{1}手,以市价委托'.format(stock, para['OPEN_NUM']))
                order = api.insert_order(symbol=stock, direction="BUY", offset="OPEN", volume=para['OPEN_NUM'])
            # -----设定5秒后执行检查委托状态并撤单---
            scheduler = BackgroundScheduler()
            scheduler.add_job(cancelJob, 'date', run_date=now + datetime.timedelta(seconds=para['CANCEL_SECOND']),
                              args=[order.order_id, stock, "BUY", un_buy_open, un_sell_close])
            # 一个独立的线程启动任务
            scheduler.start()
            '''
            time.sleep(2) #等待两秒看是否成交再判断持仓进行下减仓
            if positions.__contains__(stock) and positions[stock].pos_long > 0:
                log.logger.info('{0} 下减多仓预埋单closeJob>>>>>>'.format(stock))
                offsetStr = "CLOSETODAY" if stock.find('SHFE') >= 0 or stock.find('INE') >= 0 else "CLOSE"
                close_order1 = api.insert_order(symbol=stock, direction="SELL", offset=offsetStr,
                                                volume=para['CLOSE_NUM'],
                                                limit_price=new_price + price_tick*5)
                close_order2 = api.insert_order(symbol=stock, direction="SELL", offset=offsetStr,
                                                volume=para['CLOSE_NUM2'],
                                                limit_price=new_price + price_tick*10)
                un_sell_close[stock].append(close_order1.order_id)
                un_sell_close[stock].append(close_order2.order_id)
            '''
        if C1 < -para['TRADE_PARA'] and (min(C0_DICT[stock][-6:-1]) > -para['TRADE_PARA'] or min(C0_DICT[stock][-7:-2]) > -para['TRADE_PARA']) and position_short == 0:
            for ord in un_sell_open[stock]:
                qry_order = api.get_order(ord)
                if qry_order.status != "FINISHED":
                    log.logger.info('{0} 存在未成交开空委托，单号[{1}]，对其撤单>>>>>>'.format(stock, ord))
                    api.cancel_order(ord)
            un_sell_open[stock] = []
            if stock.find('SHFE') >= 0 or stock.find('INE') >= 0:
                log.logger.info('{0} 补开空仓>>>>>>{1}手,委托价格{2}'.format(stock, para['OPEN_NUM'],new_price-price_tick))
                order = api.insert_order(symbol=stock, direction="SELL", offset="OPEN", volume=para['OPEN_NUM'],
                                         limit_price=new_price-price_tick)
            else:
                log.logger.info('{0} 补开空仓>>>>>>{1}手,以市价委托'.format(stock, para['OPEN_NUM']))
                order = api.insert_order(symbol=stock, direction="SELL", offset="OPEN", volume=para['OPEN_NUM'])
            # -----设定5秒后执行检查委托状态并撤单追单---
            scheduler2 = BackgroundScheduler()
            scheduler2.add_job(cancelJob, 'date', run_date=now + datetime.timedelta(seconds=para['CANCEL_SECOND']),
                               args=[order.order_id, stock, "SELL", un_sell_open, un_buy_close])
            # 一个独立的线程启动任务
            scheduler2.start()
            '''
            time.sleep(2) #等待两秒看是否成交再判断持仓进行下减仓
            if positions.__contains__(stock) and positions[stock].pos_short > 0:
                log.logger.info('{0} 下减空仓预埋单closeJob>>>>>>'.format(stock))
                offsetStr = "CLOSETODAY" if stock.find('SHFE') >= 0 or stock.find('INE') >= 0 else "CLOSE"
                close_order1 = api.insert_order(symbol=stock, direction="BUY", offset=offsetStr,
                                                volume=para['CLOSE_NUM'],
                                                limit_price=new_price - price_tick*5)
                close_order2 = api.insert_order(symbol=stock, direction="BUY", offset=offsetStr,
                                                volume=para['CLOSE_NUM2'],
                                                limit_price=new_price - price_tick*10)
                un_buy_close[stock].append(close_order1.order_id)
                un_buy_close[stock].append(close_order2.order_id)
            '''


# 设定轮询定时任务，每分钟前10秒判断平仓信号
def setScheduler():
    sched = BackgroundScheduler()
    sched.add_job(closeJob, 'cron', minute='*', second=15)
    sched.add_job(checkTakeProfit, 'interval', seconds=25)
    sched.start()

# 检查盈亏
def checkTakeProfit():
    now = datetime.datetime.now()
    curr_time = now.strftime('%H:%M:%S')
    isTrading = checkTime(curr_time)
    if not isTrading:
        return
    global C0_DICT
    global un_sell_close
    global un_buy_close
    for stock in SEC_LIST:
        if len(C0_DICT[stock]) == 0:
            continue
        last_min_data = quotes[stock]  # 最新价
        new_price = last_min_data.last_price
        price_tick = last_min_data.price_tick
        pos_long = positions[stock].pos_long
        pos_short = positions[stock].pos_short
        # cost_long = positions[stock].position_cost_long
        # cost_short = positions[stock].position_cost_short
        # 成本调整为用持仓占用保证金
        cost_long = positions[stock].margin_long
        cost_short = positions[stock].margin_short
        profit_long = positions[stock].position_profit_long
        profit_short = positions[stock].position_profit_short

        log.logger.info('{0}多头持仓成本: {1}, 多头持仓盈亏: {2}'.format(stock, cost_long, profit_long))
        log.logger.info('{0}空头持仓成本: {1}, 空头持仓盈亏: {2}'.format(stock, cost_short, profit_short))
        offsetStr_buy, offsetStr_sell = "CLOSE", "CLOSE"
        # 隔日夜盘判断昨仓的情况
        if stock.find('SHFE') >= 0 or stock.find('INE') >= 0:
            if positions[stock].pos_long_today > 0:
                offsetStr_sell = "CLOSETODAY"  # 对应平多
            if positions[stock].pos_short_today > 0:
                offsetStr_buy = "CLOSETODAY"  # 对应平空
        if profit_long == profit_long:
            # log.logger.info('{0} 多单昨仓数: {1}, 今仓数: {2}'.format(stock, positions[stock].pos_long_his, positions[stock].pos_long_today))
            if profit_long > 0:
                if abs(profit_long) / cost_long > para['TP_RATIO1'] and pos_long == para['OPEN_NUM']:
                    log.logger.info('{0}多单达到止盈线1位置!!!止盈减仓{1}手>>>'.format(stock, para['CLOSE_NUM']))
                    close_order1 = api.insert_order(symbol=stock, direction='SELL', offset=offsetStr_sell,
                                                    volume=para['CLOSE_NUM'], limit_price=(new_price - price_tick))
                    un_sell_close[stock].append(close_order1.order_id)
                if abs(profit_long) / cost_long > para['TP_RATIO2'] and pos_long == (
                        para['OPEN_NUM'] - para['CLOSE_NUM']):
                    log.logger.info('{0}多单达到止盈线2位置!!!止盈减仓{1}手>>>'.format(stock, para['CLOSE_NUM2']))
                    close_order2 = api.insert_order(symbol=stock, direction='SELL', offset=offsetStr_sell,
                                                    volume=para['CLOSE_NUM2'], limit_price=(new_price - price_tick))
                    un_sell_close[stock].append(close_order2.order_id)
            elif profit_long < 0 and abs(profit_long) / cost_long > para['SP_RATIO']:
                log.logger.info('{0}多单达到止损线!!!进行平仓>>>'.format(stock))
                cancelBeforeClose(stock, un_sell_close, 'SELL', positions[stock], quotes[stock])
        if profit_short == profit_short:
            # log.logger.info('{0} 空单昨仓数: {1}, 今仓数: {2}'.format(stock, positions[stock].pos_short_his, positions[stock].pos_short_today))
            if profit_short > 0:
                if abs(profit_short) / cost_short > para['TP_RATIO1'] and pos_short == para['OPEN_NUM']:
                    log.logger.info('{0}空单达到止盈线1位置!!!止盈减仓{1}手>>>'.format(stock, para['CLOSE_NUM']))
                    close_order1 = api.insert_order(symbol=stock, direction='BUY', offset=offsetStr_buy, \
                                                    volume=para['CLOSE_NUM'], limit_price=(new_price + price_tick))
                    un_buy_close[stock].append(close_order1.order_id)
                if abs(profit_short) / cost_short > para['TP_RATIO2'] and pos_short == (
                        para['OPEN_NUM'] - para['CLOSE_NUM']):
                    log.logger.info('{0}空单达到止盈线2位置!!!止盈减仓{1}手>>>'.format(stock, para['CLOSE_NUM2']))
                    close_order2 = api.insert_order(symbol=stock, direction='BUY', offset=offsetStr_buy, \
                                                    volume=para['CLOSE_NUM2'], limit_price=(new_price + price_tick))
                    un_buy_close[stock].append(close_order2.order_id)
            elif profit_short < 0 and abs(profit_short) / cost_short > para['SP_RATIO']:
                log.logger.info('{0}空单达到止损线!!!进行平仓>>>'.format(stock))
                cancelBeforeClose(stock, un_buy_close, 'BUY', positions[stock], quotes[stock])


# 检查是否交易时间
def checkTime(curr_time):
    un_trade_time = [["00:00:00", "08:59:59"], ["10:15:01", "10:29:59"], ["11:30:01", "13:29:59"],
                     ["15:00:01", "20:59:59"], ["23:00:01", "23:59:59"]]
    for un_tt in un_trade_time:
        if curr_time >= un_tt[0] and curr_time <= un_tt[1]:
            return False
    return True


if __name__ == '__main__':
    loadConfig()
    data = pd.read_excel(para['io_in'], sheet_name=0, converters={'stk_code': str})  # excel读取的品种集合
    log.logger.info('品种数：{0}'.format(len(data['stk_code'])))
    g_security = data['stk_code'].tolist()  # "'a' 品种前缀 g_security
    # 初始化C1 C2极值
    wt_data = pd.DataFrame(columns=['fut_code', 'C1', 'C2'])
    wt_data.to_csv(para['io_out'], index=False)
    # wt_data = pd.DataFrame(columns=['date', 'stk_code', 'win_rate', 'short_val', 'long_val']) #输出落地的excel字段
    # wt_data.to_excel(io_out, index=False)
    # 登录连接信易快期账户
    api = TqApi(TqKq(), web_gui=True, auth=TqAuth(para['ACCT_ID'], para['ACCT_PWD']))
    #print(api._notify_watcher())
    account = api.get_account()
    log.logger.info('初始账户权益：{0}'.format(account.balance))
    log.logger.info('初始浮动盈亏：{0}'.format(account.float_profit))
    SEC_LIST = []
    for g_sec in g_security:
        ls = api.query_cont_quotes(product_id=g_sec)
        SEC_LIST.append(ls[0])
    log.logger.info('品种集合：{0}'.format(SEC_LIST))
    # 获取主力合约
    # domain = api.get_quote("KQ.m@DCE.m")
    # 获取主力合约的K线引用
    for sec in SEC_LIST:
        positions[sec] = api.get_position(sec)
        klines_dict[sec] = api.get_kline_serial(sec, para['BAR_UNIT'], para['BAR_NUM'] * 2)
        quotes[sec] = api.get_quote(sec)
        ticks[sec] = api.get_tick_serial(sec)
        un_buy_open[sec] = []
        un_sell_open[sec] = []
        un_buy_close[sec] = []
        un_sell_close[sec] = []
        C0_DICT[sec] = []
        g_CVal[sec] = {}
        g_CVal[sec]['C1'] = 0
        g_CVal[sec]['C2'] = 0
        close_axis_dict[sec] = {}
        close_axis_dict[sec] = {}
        close_axis_dict[sec]['s_close'] = 0
        close_axis_dict[sec]['b_close'] = 0
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

    if para['SIGNAL_ID'] == 0:
        print('默认线路')
    elif para['SIGNAL_ID'] == 1 or para['SIGNAL_ID'] == 2:
        print('布林线路')
    # api.wait_update()
    setScheduler()  # 执行轮询任务
    while True:
        api.wait_update()
        for sec in SEC_LIST:
            if api.is_changing(klines_dict[sec].iloc[-1], "datetime"):
                log.logger.info('------------------------------------------')
                log.logger.info('新K线时间：{0}'.format(datetime.datetime.fromtimestamp(klines_dict[sec].iloc[-1]["datetime"] / 1e9)))
                log.logger.info('账户权益：{0}'.format(account.balance))
                if para['SIGNAL_ID'] == 0:
                    run_trade(sec)

    api.close()