import numpy as np

# 买卖信号函数
def Trade_Signal(df_base, bar_num):
    ts_dict = {}
    ts_dict['b_open'], ts_dict['s_open'], ts_dict['b_close'], ts_dict['s_close'] = 0, 0, 0, 0
    df = df_base.copy()
    df.drop(index=[len(df)-1], inplace=True)
    MA5 = np.array(df['close'].rolling(5).mean())
    MA10 = np.array(df['close'].rolling(10).mean())
    MA20 = np.array(df['close'].rolling(20).mean())
    MA30 = np.array(df['close'].rolling(30).mean())
    MA40 = np.array(df['close'].rolling(40).mean())
    MA50 = np.array(df['close'].rolling(50).mean())
    MA60 = np.array(df['close'].rolling(60).mean())
    MA120 = np.array(df['close'].rolling(120).mean())
    HH = np.array(df['high'].rolling(5).max())
    LL = np.array(df['low'].rolling(5).min())

    R5 = MA5[:-1]
    R10 = MA10[:-1]
    R20 = MA20[:-1]
    R30 = MA30[:-1]
    R40 = MA40[:-1]
    R50 = MA50[:-1]
    R60 = MA60[:-1]
    R120 = MA120[:-1]

    C5 = MA5[1:] - R5
    C10 = MA10[1:] - R10
    C20 = MA20[1:] - R20
    C30 = MA30[1:] - R30
    C40 = MA40[1:] - R40
    C50 = MA50[1:] - R50
    C60 = MA60[1:] - R60
    C120 = MA120[1:] - R120
    BX1 = np.array(df['close'][1:]) > MA60[1:]
    BX2 = np.array(df['close'][1:]) < MA60[1:]
    BX3 = np.array(df['close'][1:]) > MA20[1:]
    BX4 = np.array(df['close'][1:]) < MA20[1:]
    BX5 = np.array(df['close'][1:]) > MA30[1:]
    BX6 = np.array(df['close'][1:]) < MA30[1:]
    X1 = np.array([1 if x else 0 for x in BX1])
    X2 = np.array([1 if x else 0 for x in BX2])
    X3 = np.array([1 if x else 0 for x in BX3])
    X4 = np.array([1 if x else 0 for x in BX4])
    X5 = np.array([1 if x else 0 for x in BX5])
    X6 = np.array([1 if x else 0 for x in BX6])
    C0 = C5*0.5+C10*1.5+C20*2+C30*3+C40*4+C50*5+C60*6+C120*10
    C0 = C0 + (X1-X2)*0.6+(X5-X6)*0.3+(X3-X4)*0.2
    C1 = min(C0[-5:])  # 下穿做空,上穿平仓
    C2 = max(C0[-5:])  # 上穿做多,xia穿平仓
    D1 = HH[-6]
    D2 = LL[-6]
    BU = df['close'].iloc[-1] > D1
    SU = df['close'].iloc[-1] < D2
    ts_dict['D1'] = D1
    ts_dict['D2'] = D2
    ts_dict['b_open'] = 1 if max(C0[-6:-1]) < 0 and C2 > 0 else 0
    ts_dict['s_close'] = 1 if max(C0[-6:-1]) > 0 and C2 < 0 else 0
    ts_dict['s_open'] = 1 if min(C0[-6:-1]) > 0 and C1 < 0 else 0
    ts_dict['b_close'] = 1 if min(C0[-6:-1]) < 0 and C1 > 0 else 0
    return ts_dict, C0[-8:]

def getMaVal(data_list,n):
    ma_list = [np.mean(data_list[-n:])]
    for i in range(1, len(data_list)-n+1):
        ma = np.mean(data_list[-n-i:-i])
        ma_list.append(ma)
    return np.array(ma_list)