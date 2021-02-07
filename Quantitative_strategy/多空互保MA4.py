import sys
import os
import numpy as np
import pandas as pd
import configparser
import time
import datetime
from decimal import Decimal
from tqsdk import TqApi, TqAuth, TqKq, tafunc

# begin 参数类------------------------
MARKET_INFO = {'SHFE': '上期所', 'DCE': '大商所', 'CZCE': '郑商所', 'CFFEX': '中金所',\
               'KQ': '快期', 'SSE': '上交所', 'SZSE': '深交所'}
account = {}  # 账户资金
positions = {}  # 持仓信息
klines_dict = {}  # K线历史行情
quotes = {}  # 实时行情
ticks = {}
g_security = []
un_sell_close = []  # 未成交的多单减仓委托
un_buy_close = []  # 未成交的空单减仓委托
#******读取配置文件**********
cf=configparser.ConfigParser()
cf.read("多空互保MA4.ini", encoding="utf-8")
io_in = cf.get("config","io_in")  # 'D:\\futures.xlsx' 设置读取股票池文件
io_out = 'D:\\write_futures.xlsx'
BAR_NUM = int(cf.get("config","bar_num"))  # 周期数
BAR_UNIT= int(cf.get("config","bar_unit"))  # K线数据周期, 以秒为单位。例如: 1分钟线为60,1小时线为3600
MINDIFF = 1  # 最小价格变动单位，后续读文件内容
COST_N = int(cf.get("config","cost_n"))
COST_M = float(cf.get("config","cost_m"))
ACCT_ID = cf.get("account","acct_id")
ACCT_PWD = cf.get("account","acct_pwd")
OPEN_NUM = int(cf.get("config","open_num"))
CLOSE_NUM = int(cf.get("config","close_num"))
CLOSE_STEP = int(cf.get("config","close_step"))
CLOSE_XRADIO = float(cf.get("config","close_xradio"))
g_ind_dict = {}
# end 参数类--------------------------
pd.set_option('display.max_columns', 100)  # 显示全部列
pd.set_option('display.max_row', 500)  # 显示全部行
pd.set_option('display.width', 100)  # 设置数据的显示长度（解决自动换行）


# class Logger(object):
#     def __init__(self, filename="Default.log"):
#         self.terminal = sys.stdout
#         self.log = open(filename, "a")
#
#     def write(self, message):
#         self.terminal.write(message)
#         self.log.write(message)
#
#     def flush(self):
#         pass
# sys.stdout = Logger('a.txt')
# for i in range(5, 10):
#     print("this is the %d times" % i)
def append_excel(df, content_list, excel_path):
    """
    excel文件中追加内容
    :return:
    content_list:待追加的内容列表
    """
    ds = pd.DataFrame(content_list)
    df = df.append(ds, ignore_index=True)
    df.to_excel(excel_path, index=False, header=False)


def run_trade(g_security):
    now = datetime.datetime.now()
    current_time = now.strftime('%H%M')
    for stock in g_security:
        position_short = 0
        position_long = 0
        total_position = 0
        last_min_data = quotes[stock]  # 最新价
        new_price = last_min_data['last_price']
        if positions.__contains__(stock):
            # 判断空单持仓
            position_short = positions[stock].pos_short_today
            print(stock, '当前空单持仓数：', position_short)
            # 判断多单持仓
            position_long = positions[stock].pos_long_today
            print(stock, '当前多单持仓数：', position_long)
        buy_signal,sell_signal = Trade_Signal(stock, BAR_NUM)
        if buy_signal == 1:
            if position_short > 0:
                print(stock, "已有空仓，需平空>>>>>>")
                for ord in un_buy_close:
                    qry_order = api.get_order(ord.order_id)
                    if qry_order.status != "FINISHED":
                        api.cancel_order(ord.order_id)
                un_buy_close = []
                order = api.insert_order(symbol=stock, direction="BUY", offset="CLOSE", volume=position_short)
                api.wait_update()
            if position_long > 0:
                print(stock, "已有多仓，取消开多>>>>>>")
            else:
                print(stock, "开多仓>>>>>>", OPEN_NUM, "手,委托价格：", new_price)
                order = api.insert_order(symbol=stock, direction="BUY", offset="OPEN", volume=OPEN_NUM, limit_price=new_price)
                while order.status != "FINISHED":
                    api.wait_update()
                close_order1 = api.insert_order(symbol=stock, direction="SELL", offset="CLOSE", volume=position_long,
                                               limit_price=new_price+CLOSE_STEP)
                close_order2 = api.insert_order(symbol=stock, direction="SELL", offset="CLOSE", volume=position_long,
                                               limit_price=new_price+CLOSE_STEP*2)
                api.wait_update()
                un_sell_close.append(close_order1.order_id)
                un_sell_close.append(close_order2.order_id)
        elif sell_signal == 1:
            if position_long > 0:
                print(stock, "已有多仓，需平多>>>>>>")
                # 平仓前把之前的未成交的减仓单撤掉
                for ord in un_sell_close:
                    qry_order = api.get_order(ord.order_id)
                    if qry_order.status != "FINISHED":
                        api.cancel_order(ord.order_id)
                un_sell_close = []
                order = api.insert_order(symbol=stock, direction="SELL", offset="CLOSE", volume=position_long)
                api.wait_update()
            if position_short > 0:
                print(stock, "已有空仓，取消开空>>>>>>")
            else:
                print(stock, "开空仓>>>>>>", OPEN_NUM, "手,委托价格：", new_price)
                order = api.insert_order(symbol=stock, direction="SELL", offset="OPEN", volume=OPEN_NUM, limit_price=new_price)
                while order.status != "FINISHED":
                    api.wait_update()
                close_order1 = api.insert_order(symbol=stock, direction="BUY", offset="CLOSE", volume=position_long,
                                                limit_price=new_price-CLOSE_STEP)
                close_order2 = api.insert_order(symbol=stock, direction="BUY", offset="CLOSE", volume=position_long,
                                                limit_price=new_price-CLOSE_STEP * 2)
                api.wait_update()
                un_buy_close.append(close_order1.order_id)
                un_buy_close.append(close_order2.order_id)
        else:
            trade_close(stock,position_short,position_long)


def trade_close(stock,position_short,position_long):
    cur_close = klines_dict[stock].iloc[-2].close
    pre_close = klines_dict[stock].iloc[-3].close
    if abs((cur_close - pre_close) / pre_close) > CLOSE_XRADIO:
        if position_short > 0:
            print("达到预设减仓比值",CLOSE_XRADIO,",空单减仓一手")
            order = api.insert_order(symbol=stock, direction="BUY", offset="CLOSE", volume=1)
        if position_long > 0:
            print("达到预设减仓比值", CLOSE_XRADIO, ",多单减仓一手")
            order = api.insert_order(symbol=stock, direction="SELL", offset="CLOSE", volume=1)
        api.wait_update()


# 买卖信号函数
def Trade_Signal(stock, bar_num):
    ts_dict = {}
    ts_dict['b_open'] = ts_dict['s_open'] = ts_dict['b_close'] = ts_dict['s_close'] = 0
    b_open = s_open = b_close = s_close = 0
    ind_dict = {}
    ind_dict_pre = {}
    ind_dict = getcost(stock, bar_num, 1)  # 最近周期
    ind_dict_pre = getcost(stock, bar_num, 0)  # 上一周期
    tC = ind_dict['C']
    tCC = ind_dict['CC']
    tJ5 = ind_dict['J5']
    tJ15 = ind_dict['J15']
    yC = ind_dict_pre['C']
    yCC = ind_dict_pre['CC']
    yJ5 = ind_dict_pre['J5']
    yJ15 = ind_dict_pre['J15']

    T_B = ((yCC < yJ5 and tCC > tJ5) or (yCC < yJ15 and tCC > tJ15)) and tCC > yCC and tC > yC
    T_S = ((yCC > yJ5 and tCC < tJ5) or (yCC > yJ15 and tCC < tJ15)) and tCC < yCC and tC < yC
    signal_b = 1 if T_B else 0
    signal_s = 1 if T_S else 0
    # print(datetime.datetime.fromtimestamp(klines_dict[stock].iloc[0].datetime / 1e9))
    # print(datetime.datetime.fromtimestamp(klines_dict[stock].iloc[-2].datetime / 1e9))
    # print(datetime.datetime.fromtimestamp(klines_dict[stock].iloc[-1].datetime / 1e9))
    # df = klines_dict[stock][-2:]
    # df['dt'] = df.apply(lambda x: datetime.datetime.fromtimestamp(x.datetime / 1e9), axis = 1)
    #print(klines_dict[stock].iloc[-1])
    print('最新价:', quotes[stock]['last_price'], quotes[stock]['datetime'])
    print('前一周期指标:',ind_dict)
    print('前二周期指标',ind_dict_pre)
    return signal_b, signal_s

# 计算指标值，isCurrent是否当前周期，1为当前周期，0为上一周期
def getcost(sec, n, isCurrent):
    ind_dict = {}
    his_data = klines_dict[sec]
    if his_data.empty:
        return 0
    if isCurrent:
        vol_list = np.array(his_data['volume'][-n:-1])
        close_list = np.array(his_data['close'][-n:-1])
        high_list = np.array(his_data['high'][-n:-1])
        open_list = np.array(his_data['open'][-n:-1])
        low_list = np.array(his_data['low'][-n:-1])
    else:
        vol_list = np.array(his_data['volume'][-n - 1:-2])
        close_list = np.array(his_data['close'][-n - 1:-2])
        high_list = np.array(his_data['high'][-n - 1:-2])
        open_list = np.array(his_data['open'][-n - 1:-2])
        low_list = np.array(his_data['low'][-n - 1:-2])
    H5_list = getMaVal(high_list, 5)
    L5_list = getMaVal(low_list, 5)
    ind_dict['J5'] = min(L5_list[-121:-1]+COST_N)
    ind_dict['J15'] = max(H5_list[-121:-1]-COST_M)
    ind_dict['CC'] = np.mean(close_list[-4:])
    ind_dict['C'] = close_list[-1:]
    return ind_dict


def getMaVal(data_list,n):
    ma_list = [np.mean(data_list[-n:])]
    for i in range(1, len(data_list)-n+1):
        ma = np.mean(data_list[-n-i:-i])
        ma_list.append(ma)
    return np.array(ma_list)


if __name__ == '__main__':
    data = pd.read_excel(io_in, sheet_name=0, converters={'stk_code': str})  # excel读取的品种集合
    print('品种数：', len(data['stk_code']))
    g_security = data['stk_code'].tolist()  # "'a' 品种前缀 g_security
    # wt_data = pd.DataFrame(columns=['date', 'stk_code', 'win_rate', 'short_val', 'long_val']) #输出落地的excel字段
    # wt_data.to_excel(io_out, index=False)
    # 登录连接信易快期账户
    api = TqApi(TqKq(), web_gui=True, auth=TqAuth(ACCT_ID, ACCT_PWD))
    account = api.get_account()
    print('初始账户权益：', account.balance)
    print('初始浮动盈亏：', account.float_profit)
    SEC_LIST = []
    for g_sec in g_security:
        ls = api.query_cont_quotes(product_id=g_sec)
        SEC_LIST.append(ls[0])
    print('品种集合：', SEC_LIST)
    # 获取主力合约
    # domain = api.get_quote("KQ.m@DCE.m")
    # 获取主力合约的K线引用
    for sec in SEC_LIST:
        positions[sec] = api.get_position(sec)
        klines_dict[sec] = api.get_kline_serial(sec, BAR_UNIT, BAR_NUM + 1)
        quotes[sec] = api.get_quote(sec)
        ticks[sec] = api.get_tick_serial(sec)
    while True:
        api.wait_update()
        for sec in SEC_LIST:
            if api.is_changing(klines_dict[sec].iloc[-1], "datetime"):
                print("新K线时间", datetime.datetime.fromtimestamp(ticks[sec].iloc[-1]["datetime"] / 1e9))
                print('账户权益：',account.balance)
                print('浮动盈亏：',account.float_profit)
                run_trade([sec])

    api.close()