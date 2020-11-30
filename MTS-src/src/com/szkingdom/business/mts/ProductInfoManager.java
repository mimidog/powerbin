package com.szkingdom.business.mts;

import com.szkingdom.business.common.AtomError;
import com.szkingdom.business.common.CommBiz;
import com.szkingdom.business.common.SEQGenerator;
import com.szkingdom.business.util.*;
import com.szkingdom.frame.business.atom.AtomResult;
import com.szkingdom.frame.business.atom.exchange.DataExchangeAssembly;
import com.szkingdom.frame.config.CustomizedPropertyPlaceholderConfigurer;
import com.szkingdom.frame.config.FrameworkConstants;
import com.szkingdom.frame.exception.AtomException;
import com.szkingdom.frame.service.model.GenericResult;
import org.apache.commons.lang3.ObjectUtils;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @file_desc: 产品信息管理
 *
 */
public class ProductInfoManager {
    /**
     * @method_desc: 查询维度设置信息
     * @param dataExchange
     * @return
     */
    public GenericResult queryTradeDimensionCfgInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        GenericResult result = new GenericResult();
        //错误代码：-100020，错误信息：查询维度设置信息失败
        CommBiz.commBexCall("query_T_TRADE_CFG_Bex", params, commParams, result,
                AtomError.QUERY_T_TRADE_CFG_ERROR_CODE, AtomError.QUERY_T_TRADE_CFG_ERROR_MSG);

        return new AtomResult("0", "查询维度设置信息成功！", result.getDataList());
    }
    /**
     * @method_desc: 新增维度设置信息
     * @param dataExchange
     * @return
     */
    public GenericResult addTradeDimensionCfgInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);
        List<String> attrList=DataExchangeUtil.getAttrList(dataExchange);
        String[] lvl = new String[1];

        int iRetCode = DimensionBiz.getDimenssionLvl((String)params.get("PAR_SUP_ID"), lvl);

        if (iRetCode != 0) {
            throw new AtomException(AtomError.GET_T_TRADE_CFG_LVL_ERROR_CODE,
                    AtomError.GET_T_TRADE_CFG_LVL_ERROR_MSG,
                    FrameworkConstants.ATOM_LVL);
        }

        if (lvl[0].length() > 64) {
            throw new AtomException(AtomError.T_TRADE_CFG_LVL_TO_BIG_ERROR_CODE,
                            AtomError.T_TRADE_CFG_LVL_TO_BIG_ERROR_MSG,
                             FrameworkConstants.ATOM_LVL);
        }

        params.put("TRADE_LVL", lvl[0]);

        String tradeId = SEQGenerator.getDimensionId();

        params.put("TRADE_ID", tradeId);

        params.put("UP_DATE", DateUtil.today());

        GenericResult result = new GenericResult();
        //错误代码：-100021，错误信息：新增维度设置信息失败
        CommBiz.commBexCall("insert_T_TRADE_CFG_Bex", params, commParams, result,
                AtomError.ADD_T_TRADE_CFG_ERROR_CODE, AtomError.ADD_T_TRADE_CFG_ERROR_MSG);

        return new AtomResult("0", "新增维度设置信息成功！");
    }

    /**
     * @method_desc: 修改维度设置信息
     * @param dataExchange
     * @return
     */
    public GenericResult modTradeDimensionCfgInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        params.put("UP_DATE", DateUtil.today());

        GenericResult result = new GenericResult();
        //错误代码：-100022，错误信息：修改维度设置信息失败
        CommBiz.commBexCall("update_T_TRADE_CFG_Bex", params, commParams, result,
                AtomError.MOD_T_TRADE_CFG_ERROR_CODE, AtomError.MOD_T_TRADE_CFG_ERROR_MSG);

        return new AtomResult("0", "修改维度设置信息成功！");
    }

    /**
     * @method_desc: 修改维度状态信息
     * @param dataExchange
     * @return
     */
    public GenericResult modTradeDimensionCfgStaInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);


        GenericResult result = new GenericResult();
        //错误代码：-100026，错误信息：修改维度状态信息失败
        CommBiz.commBexCall("update_T_TRADE_CFG_STA_Bex", params, commParams, result,
                AtomError.MOD_T_TRADE_CFG_STA_ERROR_CODE, AtomError.MOD_T_TRADE_CFG_STA_ERROR_MSG);

        return new AtomResult("0", "修改维度状态信息成功！");
    }
    /**
     * @method_desc: 删除维度设置信息
     * @param dataExchange
     * @return
     */
    public GenericResult delTradeDimensionCfgInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        MapUtil.chkNoNull(params, "TRADE_ID");

        GenericResult result = new GenericResult();
        //错误代码：-100022，错误信息：删除维度设置信息失败
        CommBiz.commBexCall("delete_T_TRADE_CFG_Bex", params, commParams, result,
                AtomError.DEL_T_TRADE_CFG_ERROR_CODE, AtomError.DEL_T_TRADE_CFG_ERROR_MSG);

        return new AtomResult("0", "删除维度设置信息成功！");
    }

    /**
     * @method_desc: 查询维度证券信息
     * @param dataExchange
     * @return
     */
    public GenericResult queryDimensionStockInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        GenericResult result = new GenericResult();
        //错误代码：-100026，错误信息：查询维度证券信失败
        CommBiz.commBexCall("query_T_TRADE_STOCK_Bex", params, commParams, result,
                AtomError.QUERY_T_TRADE_STOCK_ERROR_CODE, AtomError.QUERY_T_TRADE_STOCK_ERROR_MSG);

        return new AtomResult("0", "查询维度设置信息成功！", result.getDataList());
    }
    /**
     * @method_desc: 新增维度证券信息
     * @param dataExchange
     * @return
     */
    public GenericResult addDimensionStockInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        params.put("OP_ID", ObjectUtils.toString(commParams.get("OP_CODE")));
        params.put("UP_DATE", DateUtil.today());

        GenericResult result = new GenericResult();

        //错误代码：-100027，错误信息：新增维度证券信息失败
        CommBiz.commBexCall("insert_T_TRADE_STOCK_Bex", params, commParams, result,
                AtomError.ADD_T_TRADE_STOCK_ERROR_CODE, AtomError.ADD_T_TRADE_STOCK_ERROR_MSG);

        return new AtomResult("0", "新增维度设置信息成功！");
    }
    /**
     * @method_desc: 修改维度证券信息
     * @param dataExchange
     * @return
     */
    public GenericResult modDimensionStockInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        params.put("UP_DATE", DateUtil.today());

        GenericResult result = new GenericResult();
        //错误代码：-100028，错误信息：修改维度设置信息失败
        CommBiz.commBexCall("update_T_TRADE_STOCK_Bex", params, commParams, result,
                AtomError.MOD_T_TRADE_STOCK_ERROR_CODE, AtomError.MOD_T_TRADE_STOCK_ERROR_MSG);

        return new AtomResult("0", "修改维度设置信息成功！");
    }
    /**
     * @method_desc: 删除维度证券信息
     * @param dataExchange
     * @return
     */
    public GenericResult delDimensionStockInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        GenericResult result = new GenericResult();
        //错误代码：-100029，错误信息：删除维度证券信息失败
        CommBiz.commBexCall("delete_T_TRADE_STOCK_Bex", params, commParams, result,
                AtomError.DEL_T_TRADE_STOCK_ERROR_CODE, AtomError.DEL_T_TRADE_STOCK_ERROR_MSG);

        return new AtomResult("0", "删除维度设置信息成功！");
    }
    /**
     * @method_desc: 查询股票产品信息
     * @param dataExchange
     * @return
     */
    public GenericResult queryStockInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        GenericResult result = new GenericResult();
        //错误代码：-100030，错误信息：查询证券产品信息失败
        CommBiz.commBexCall("query_T_STK_INFO_Bex", params, commParams, result,
                AtomError.QUERY_T_STK_INFO_ERROR_CODE, AtomError.QUERY_T_STK_INFO_ERROR_MSG);

        return new AtomResult("0", "查询维度设置信息成功！", result.getDataList());
    }


    /**
     * @method_desc: 查询交易员分配股票池信息
     * @param dataExchange
     * @return
     */
    public GenericResult queryStockPoolAllotInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        GenericResult result = new GenericResult();
        //错误代码：-100031，错误信息：查询交易员分配股票池信息
        CommBiz.commBexCall("query_T_STK_POOL_REL_OP_Bex", params, commParams, result,
                AtomError.QUERY_T_STK_POOL_REL_OP_ERROR_CODE, AtomError.QUERY_T_STK_POOL_REL_OP_ERROR_MSG);

        return new AtomResult("0", "查询交易员分配股票池信息成功！", result.getDataList());
    }
    /**
     * @method_desc: 新增交易员分配股票池信息
     * @param dataExchange
     * @return
     */
    public GenericResult addStockPoolAllotInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        MapUtil.chkNoNull(params, "OP_ID", "POOL_IDS");


        GenericResult addResult = new GenericResult();
        params.put("POOL_LIST",ObjectUtils.toString(params.get("POOL_IDS")).split(","));

        params.put("UP_DATE",DateUtil.today());
        //错误代码：-100032，错误信息：新增交易员分配股票池信息失败
        CommBiz.commBexCall("insert_T_STK_POOL_REL_OP_Bex", params, commParams, addResult,
                AtomError.ADD_T_STK_POOL_REL_OP_ERROR_CODE, AtomError.ADD_T_STK_POOL_REL_OP_ERROR_MSG);

        return new AtomResult("0", "新增交易员分配股票池信息成功！");
    }
    /**
     * @method_desc: 修改交易员分配股票池信息
     * @param dataExchange
     * @return
     */
    public GenericResult modStockPoolAllotInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        GenericResult result = new GenericResult();
        //错误代码：-100033，错误信息：修改交易员分配股票池信息失败
        CommBiz.commBexCall("update_T_STK_POOL_REL_OP_Bex", params, commParams, result,
                AtomError.MOD_T_STK_POOL_REL_OP_ERROR_CODE, AtomError.MOD_T_STK_POOL_REL_OP_ERROR_MSG);

        return new AtomResult("0", "修改交易员分配股票池信息成功！");
    }
    /**
     * @method_desc: 删除交易员分配股票池信息
     * @param dataExchange
     * @return
     */
    public GenericResult delStockPoolAllotInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        GenericResult result = new GenericResult();
        //错误代码：-100034，错误信息：删除交易员分配股票池信息失败
        CommBiz.commBexCall("delete_T_STK_POOL_REL_OP_Bex", params, commParams, result,
                AtomError.DEL_T_STK_POOL_REL_OP_ERROR_CODE, AtomError.DEL_T_STK_POOL_REL_OP_ERROR_MSG);

        return new AtomResult("0", "删除交易员分配股票池信息失败！");
    }
    /**
     * @method_desc: 查询股票池配置信息
     * @param dataExchange
     * @return
     */
    public GenericResult queryStockPoolCfgInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        GenericResult result = new GenericResult();
        //错误代码：-100037，错误信息：查询股票池配置信息失败
        CommBiz.commBexCall("query_T_STK_POOL_CFG_Bex", params, commParams, result,
                AtomError.QUERY_T_STK_POOL_CFG_ERROR_CODE, AtomError.QUERY_T_STK_POOL_CFG_ERROR_MSG);

        return new AtomResult("0", "查询股票池配置信息成功！", result.getDataList());
    }
    /**
     * @method_desc: 新增股票池配置信息
     * @param dataExchange
     * @return
     */
    public GenericResult addStockPoolCfgInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        MapUtil.chkNoNull(params, "POOL_NAME", "POOL_TYPE","POOL_SCOPE","TRADE_ID");
        GenericResult addResult = new GenericResult();

        params.put("POOL_ID",SEQGenerator.getStockPoolCfgId());
        params.put("UP_DATE", DateUtil.today());

        //错误代码：-100038，错误信息：新增股票池配置信息失败
        CommBiz.commBexCall("insert_T_STK_POOL_CFG_Bex", params, commParams, addResult,
                AtomError.ADD_T_STK_POOL_CFG_ERROR_CODE, AtomError.ADD_T_STK_POOL_CFG_ERROR_MSG);

        return new AtomResult("0", "新增股票池配置信息成功！");
    }
    /**
     * @method_desc: 修改股票池配置信息
     * @param dataExchange
     * @return
     */
    public GenericResult modStockPoolCfgInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        params.put("UP_DATE", DateUtil.today());

        GenericResult result = new GenericResult();
        //错误代码：-100039，错误信息：修改股票池配置信息失败
        CommBiz.commBexCall("update_T_STK_POOL_CFG_Bex", params, commParams, result,
                AtomError.MOD_T_STK_POOL_CFG_ERROR_CODE, AtomError.MOD_T_STK_POOL_CFG_ERROR_MSG);

        return new AtomResult("0", "修改股票池配置信息成功！");
    }
    /**
     * @method_desc: 删除股票池配置信息
     * @param dataExchange
     * @return
     */
    public GenericResult delStockPoolCfgInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        GenericResult result = new GenericResult();

        //错误代码：-100034，错误信息：删除股票池产品信息失败
        CommBiz.commBexCall("delete_T_STK_POOL_REL_OP_Bex", params, commParams, result,
                AtomError.DEL_T_STK_POOL_REL_OP_ERROR_CODE, AtomError.DEL_T_STK_POOL_REL_OP_ERROR_MSG);


        //错误代码：-100040，错误信息：删除股票池配置信息失败
        CommBiz.commBexCall("delete_T_STK_POOL_CFG_Bex", params, commParams, result,
                AtomError.DEL_T_STK_POOL_CFG_ERROR_CODE, AtomError.DEL_T_STK_POOL_CFG_ERROR_MSG);

        return new AtomResult("0", "删除股票池配置信息成功！");
    }
    /**
     * @method_desc: 查询股票池行情信息
     * @param dataExchange
     * @return
     */
    public GenericResult queryStockTrendInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        String dbIP= ObjectUtils.toString(CustomizedPropertyPlaceholderConfigurer.getContextProperty("stock.trend.ip"));
        String dbPort= ObjectUtils.toString(CustomizedPropertyPlaceholderConfigurer.getContextProperty("stock.trend.port"));
        String dbName= ObjectUtils.toString(CustomizedPropertyPlaceholderConfigurer.getContextProperty("stock.trend.db.name"));
        String userId= ObjectUtils.toString(CustomizedPropertyPlaceholderConfigurer.getContextProperty("stock.trend.db.uid"));
        String userPwd= ObjectUtils.toString(CustomizedPropertyPlaceholderConfigurer.getContextProperty("stock.trend.db.pwd"));

        params.put("DB_IP",dbIP);
        params.put("DB_PORT",dbPort);
        params.put("DB_NAME",dbName);
        params.put("USER_ID",userId);
        params.put("USER_PWD",userPwd);

        GenericResult result = new GenericResult();
        //错误代码：-100062，错误信息：查询客户股票行情信息失败
        CommBiz.commBexCall("query_T_STOCK_HQ_Bex", params, commParams, result,
                AtomError.QUERY_T_STOCK_HQ_ERROR_CODE, AtomError.QUERY_T_STOCK_HQ_ERROR_MSG);

        List rsNewlist=new ArrayList();

        if(result.getDataList().size()>0){
            rsNewlist.add(result.getDataList().get(0));
        }

        return new AtomResult("0", "查询客户股票行情信息成功！",rsNewlist);
    }

    /**
     * @method_desc: 维度产品批量导入
     * @param dataExchange
     * @return
     */
    public GenericResult DemensionProductImport(DataExchangeAssembly dataExchange) {
        Map params = (Map) dataExchange.getBusinessData("params");
        Map commParams = (Map) dataExchange.getBusinessData("commParams");
        GenericResult result = new GenericResult();
        if (!MapUtil.isNoNull(params, "OP_ID")) {
            params.put("OP_ID",ObjectUtils.toString(commParams.get("OP_CODE")));
        }
        //校验必要入参
        MapUtil.chkNoNull(params, "FILE_DIR", "FILE_NAME");
        //获取文件夹位置,文件夹名与文件名
        String fileDir = (String) params.get("FILE_DIR");
        String fileName = (String) params.get("FILE_NAME");
        String opCode = (String) params.get("OP_CODE");
        String isImage = (String) params.get("IS_IMAGE_RESOURCE");
        String isLocal = (String) params.get("LOCAL_RESOURCE");

        //获取文件路径
        String filePath = FileUtil.getFileUploadBasePath(isLocal, isImage) + fileDir + File.separator + fileName;

        //最终要插入的list
        List lastList=new ArrayList();

        List<Map> xlsxInfoList = XlsxUtil.readXlsx(filePath);
        if (xlsxInfoList != null && xlsxInfoList.size() > 2) {
            xlsxInfoList.remove(0);
            xlsxInfoList.remove(0);
            Map errorMap = new HashMap();
            //数据正确性校验及处理
            for (int j = 0; j < xlsxInfoList.size(); j++) {
                Map lineParam = xlsxInfoList.get(j);
                //校验必输项
                MapUtil.chkIRowNoNull(lineParam, j + 3, "TRADE_ID", "STK_ID", "STK_POWER", "NEAR_AMT");
                //授权类型拆分
                String addFlag = ObjectUtils.toString(lineParam.get("ADD_FLAG"));
                if (addFlag.indexOf("-") != -1) {
                    lineParam.put("ADD_FLAG", addFlag.split("-")[0]);
                }

                lineParam.put("UP_DATE",DateUtil.today());

                Map qryMap = new HashMap();
                qryMap.put("TRADE_ID", lineParam.get("TRADE_ID"));
                CommBiz.commBexCall("delete_T_TRADE_STOCK_Bex", qryMap, commParams, result,
                        AtomError.DEL_T_TRADE_STOCK_ERROR_CODE, AtomError.DEL_T_TRADE_STOCK_ERROR_MSG);

                lineParam.put("OP_ID",params.get("OP_ID"));

                lineParam.put("CHECK_ID", "");
                lineParam.put("CHECK_DATE", "");
                lastList.add(lineParam);

            }

            //todo 分批导入数据
            int  iRetCode = DBUtil.savebyGroup(new HashMap(), commParams, result, lastList,
                    "TRADE_STOCK_BATCH_LIST","batch_insert_T_TRADE_STOCK_Bex",
                    AtomError.ADD_T_TRADE_STOCK_ERROR_CODE, AtomError.ADD_T_TRADE_STOCK_ERROR_MSG,
                    100);
        }

        return new AtomResult("0", "维度证券批量导入成功", result.getDataList());
    }

    /**
     * @method_desc: 产品股票池设置
     * @param dataExchange
     * @return
     */
    public GenericResult stockSubscriptionSet(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        String ssMarket=ObjectUtils.toString(params.get("SS_MARKET"));
        //上海市场
        if(ssMarket.equals("1")){
            params.put("SS_MARKET","sh");
            params.put("SS_CODE","sh"+params.get("STK_CODE"));

         //深圳市场
        }else if(ssMarket.equals("0")){
            params.put("SS_MARKET","sz");
            params.put("SS_CODE","sz"+params.get("STK_CODE"));
        }

        GenericResult result = new GenericResult();

        if (ObjectUtils.toString(params.get("STK_ISIN")).equals("0")){

            //错误代码：-100163，错误信息：删除行情订阅信息失败
            CommBiz.commBexCall("delete_T_SUBSCRBIE_Bex", params, commParams, result,
                    AtomError.DEL_T_SUBSCRBIE_ERROR_CODE, AtomError.DEL_T_SUBSCRBIE_ERROR_MSG);

            //错误代码：-100160，错误信息：新增行情订阅信息失败
            CommBiz.commBexCall("insert_T_SUBSCRBIE_Bex", params, commParams, result,
                    AtomError.ADD_T_SUBSCRBIE_ERROR_CODE, AtomError.ADD_T_SUBSCRBIE_ERROR_MSG);
        }else  {
            //错误代码：-100163，错误信息：删除行情订阅信息失败
            CommBiz.commBexCall("delete_T_SUBSCRBIE_Bex", params, commParams, result,
                    AtomError.DEL_T_SUBSCRBIE_ERROR_CODE, AtomError.DEL_T_SUBSCRBIE_ERROR_MSG);
        }

        Map tmpMap=new HashMap();
        tmpMap.put("STK_ISIN",ObjectUtils.toString(params.get("STK_ISIN")).equals("0")?
                    "1":"0");
        tmpMap.put("STK_ID",ObjectUtils.toString(params.get("STK_CODE")));
        //错误代码：-100170，错误信息：更新证券产品信息失败
        CommBiz.commBexCall("UPDATE_T_STK_INFO_ISIN_Bex", tmpMap, commParams, result,
                AtomError.MOD_T_STK_INFO_ERROR_CODE, AtomError.MOD_T_STK_INFO_ERROR_MSG);


        return new AtomResult("0", params.get("TIP_MSG")+"成功！");
    }

    /**
     * @method_desc: 产品黑名单设置
     * @param dataExchange
     * @return
     */
    public GenericResult stockBlackListSet(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        //1-加入黑名单，2-退出黑名单
        params.put("STK_UNDL_CODE",ObjectUtils.toString(params.get("STK_UNDL_CODE")).equals("0")?
                "1":"0");
        GenericResult result = new GenericResult();

        CommBiz.commBexCall("UPDATE_T_STK_INFO_UNDL_CODE_Bex", params, commParams, result,
                AtomError.MOD_T_STK_INFO_UNDL_CODE_ERROR_CODE, AtomError.MOD_T_STK_INFO_UNDL_CODE_ERROR_MSG);


        return new AtomResult("0", params.get("TIP_MSG")+"成功！");
    }

}
