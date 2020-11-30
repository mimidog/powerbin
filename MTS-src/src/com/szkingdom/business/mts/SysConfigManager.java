package com.szkingdom.business.mts;

import com.szkingdom.business.common.AtomError;
import com.szkingdom.business.common.CommBiz;
import com.szkingdom.business.util.DataExchangeUtil;
import com.szkingdom.business.util.DateUtil;
import com.szkingdom.business.util.MapUtil;
import com.szkingdom.frame.business.atom.AtomResult;
import com.szkingdom.frame.business.atom.exchange.DataExchangeAssembly;
import com.szkingdom.frame.config.CustomizedPropertyPlaceholderConfigurer;
import com.szkingdom.frame.config.FrameworkConstants;
import com.szkingdom.frame.exception.AtomException;
import com.szkingdom.frame.service.model.GenericResult;
import org.apache.commons.lang3.ObjectUtils;

import java.util.HashMap;
import java.util.Map;

public class SysConfigManager {

    /**
     * @method_desc: 设置下一个交易
     * @param dataExchange
     * @return
     */
    public GenericResult setNextTrdDay(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        GenericResult rsCurTrdDay = new GenericResult();
        //错误代码：-100079，错误信息：查询系统日期失败
        CommBiz.commBexCall("QRY_SYS_CONTROL_INFO_Bex", params, commParams, rsCurTrdDay,
                AtomError.QUERY_SYSTEM_DATE_ERROR_CODE, AtomError.QUERY_SYSTEM_DATE_ERROR_MSG);


        Map nextDayParam=new HashMap();
        nextDayParam.put("PHYSICAL_DATE",rsCurTrdDay.getDataList().get(0).get("SYSTEM_DATE"));
        nextDayParam.put("TRD_DATE_FLAG","1");

        GenericResult rsNextTrdDay = new GenericResult();
        //错误代码：-100073，错误信息：查询下一个交易日失败
        CommBiz.commBexCall("QRY_NEXT_TRADING_DAY_Bex", nextDayParam, commParams, rsNextTrdDay,
                AtomError.QUERY_NEXT_TRD_DAY_ERROR_CODE, AtomError.QUERY_NEXT_TRD_DAY_ERROR_MSG);
        if(rsNextTrdDay.getDataList().size()>0){
            String nextDay=ObjectUtils.toString(rsNextTrdDay.getDataList().get(0).get("NEXT_TRD_DATE"));

            Map newParam=new HashMap();
            newParam.put("SYSTEM_DATE", nextDay);

            CommBiz.commBexCall("MOD_SYS_CONTROL_INFO_Bex", newParam, commParams, rsNextTrdDay,
                    AtomError.MOD_SYSTEM_DATE_INFO_ERROR_CODE, AtomError.MOD_SYSTEM_DATE_INFOERROR_MSG);
        }
        return new AtomResult("0", "设置下一个交易日成功信息成功！");
    }
    /**
     * @method_desc: 得到当前系统日期
     * @return
     */
    public static  String getSysDate(){
        Map commParams=new HashMap();
        Map params=new HashMap();

        GenericResult rsCurTrdDay = new GenericResult();
        //错误代码：-100079，错误信息：查询系统日期失败
        CommBiz.commBexCall("QRY_SYS_CONTROL_INFO_Bex", params, commParams, rsCurTrdDay,
                AtomError.QUERY_SYSTEM_DATE_ERROR_CODE, AtomError.QUERY_SYSTEM_DATE_ERROR_MSG);

        return ObjectUtils.toString(rsCurTrdDay.getDataList().get(0).get("SYSTEM_DATE"));
    }

    /**
     * @method_desc: 得到当前系统日期
     * @return
     */
    public static  String getLastTradeDay(){
        Map commParams=new HashMap();
        Map params=new HashMap();
        params.put("PHYSICAL_DATE",getSysDate());
        params.put("TRD_DATE_FLAG","1");
        GenericResult rsCurTrdDay = new GenericResult();
        //错误代码：-100079，错误信息：查询系统日期失败
        CommBiz.commBexCall("QRY_LAST_TRADING_DAY_Bex", params, commParams, rsCurTrdDay,
                AtomError.QUERY_SYSTEM_DATE_ERROR_CODE, AtomError.QUERY_SYSTEM_DATE_ERROR_MSG);

        return ObjectUtils.toString(rsCurTrdDay.getDataList().get(0).get("LAST_PHYSICAL_DATE"));
    }

    /**
     * @method_desc: 执行mts数据库清算前的备份
     * @return
     */
    public GenericResult mtsclearBDBBackup(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        String dbNmae="mts";
        String mtsDBPath= ObjectUtils.toString(CustomizedPropertyPlaceholderConfigurer.getContextProperty("mts.clearB.DBbackcup.file.path"));
                mtsDBPath=mtsDBPath+"\\"+dbNmae+"_clearB_"+DateUtil.getNowTimeStr()+".bak";
        params.put("DB_NAME", dbNmae);
        params.put("FILE_PATH", mtsDBPath);

        GenericResult rs = new GenericResult();
        //错误代码：-100121，错误信息：数据库备份失败
        CommBiz.commBexCall("database_BACKUP_Bex", params, commParams, rs,
                AtomError.DATABASE_BACKUP_FAIL_CODE, AtomError.DATABASE_BACKUP_FAIL_MSG);

        return new AtomResult("0", "mts数据库清算前的备份成功！");
    }
    /**
     * @method_desc: 执行mts数据库日切前的备份
     * @return
     */
    public GenericResult mtsSyscutBDBBackup(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        String dbNmae="mts";
        String mtsDBPath= ObjectUtils.toString(CustomizedPropertyPlaceholderConfigurer.getContextProperty("mts.SysCutB.DBbackcup.file.path"));
        mtsDBPath=mtsDBPath+"\\"+dbNmae+"_cutB_"+DateUtil.getNowTimeStr()+".bak";
        params.put("DB_NAME", dbNmae);
        params.put("FILE_PATH", mtsDBPath);

        GenericResult rs = new GenericResult();
        //错误代码：-100121，错误信息：数据库备份失败
        CommBiz.commBexCall("database_BACKUP_Bex", params, commParams, rs,
                AtomError.DATABASE_BACKUP_FAIL_CODE, AtomError.DATABASE_BACKUP_FAIL_MSG);

        return new AtomResult("0", "mts数据库日切前的备份成功！");
    }
    /**
     * @method_desc:查询行情订阅信息
     * @param dataExchange
     * @return
     */
    public GenericResult queryMtsSubscrbieInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        GenericResult rs = new GenericResult();
        //错误代码：-100159，错误信息：查询行情订阅信息失败
        CommBiz.commBexCall("qury_T_SUBSCRBIE_Bex", params, commParams, rs,
                AtomError.QUERY_T_SUBSCRBIE_ERROR_CODE, AtomError.QUERY_T_SUBSCRBIE_ERROR_MSG);

        return new AtomResult("0", "查询行情订阅信息失败成功！",rs.getDataList());
    }
    /**
     * @method_desc:新增行情订阅信息
     * @param dataExchange
     * @return
     */
    public GenericResult addMtsSubscrbieInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        GenericResult qryRs = new GenericResult();

        Map qryMap= MapUtil.getNewHashMapByKeys(params,"SS_MARKET","STK_CODE");
        //错误代码：-100159，错误信息：查询行情订阅信息失败
        CommBiz.commBexCall("qury_T_SUBSCRBIE_Bex", qryMap, commParams, qryRs,
                AtomError.QUERY_T_SUBSCRBIE_ERROR_CODE, AtomError.QUERY_T_SUBSCRBIE_ERROR_MSG);
        if(qryRs.getDataList().size()>0){

            //错误代码：-100164，错误信息：行情订阅信息已存在失败
            throw new AtomException(AtomError.T_SUBSCRBIE_AlREADY_EXIST_ERROR_CODE,
                    AtomError.T_SUBSCRBIE_AlREADY_EXIST_0ERROR_MSG, FrameworkConstants.ATOM_LVL);
        }

        GenericResult rs = new GenericResult();
        //错误代码：-100160，错误信息：新增行情订阅信息失败
        CommBiz.commBexCall("insert_T_SUBSCRBIE_Bex", params, commParams, rs,
                AtomError.ADD_T_SUBSCRBIE_ERROR_CODE, AtomError.ADD_T_SUBSCRBIE_ERROR_MSG);

        return new AtomResult("0", "新增行情订阅信息成功！");
    }
    /**
     * @method_desc:修改行情订阅信息
     * @param dataExchange
     * @return
     */
    public GenericResult modMtsSubscrbieInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        GenericResult qryRs = new GenericResult();

        Map qryMap= MapUtil.getNewHashMapByKeys(params,"SS_MARKET","STK_CODE");
        //错误代码：-100159，错误信息：查询行情订阅信息失败
        CommBiz.commBexCall("qury_T_SUBSCRBIE_Bex", qryMap, commParams, qryRs,
                AtomError.QUERY_T_SUBSCRBIE_ERROR_CODE, AtomError.QUERY_T_SUBSCRBIE_ERROR_MSG);
        if(qryRs.getDataList().size()>0){

            //错误代码：-100164，错误信息：行情订阅信息已存在失败
            throw new AtomException(AtomError.T_SUBSCRBIE_AlREADY_EXIST_ERROR_CODE,
                    AtomError.T_SUBSCRBIE_AlREADY_EXIST_0ERROR_MSG, FrameworkConstants.ATOM_LVL);
        }

        GenericResult rs = new GenericResult();
        //错误代码：-100161，错误信息：修改行情订阅信息失败
        CommBiz.commBexCall("update_T_SUBSCRBIE_Bex", params, commParams, rs,
                AtomError.MOD_T_SUBSCRBIE_ERROR_CODE, AtomError.MOD_T_SUBSCRBIE_ERROR_MSG);

        return new AtomResult("0", "修改行情订阅信息成功！");
    }
    /**
     * @method_desc:删除行情订阅信息
     * @param dataExchange
     * @return
     */
    public GenericResult delMtsSubscrbieInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        GenericResult rs = new GenericResult();
        //错误代码：-100163，错误信息：删除行情订阅信息失败
        CommBiz.commBexCall("delete_T_SUBSCRBIE_Bex", params, commParams, rs,
                AtomError.DEL_T_SUBSCRBIE_ERROR_CODE, AtomError.DEL_T_SUBSCRBIE_ERROR_MSG);

        return new AtomResult("0", "删除行情订阅信息成功！");
    }
    /**
     * @method_desc:查询序列号配置信息
     * @param dataExchange
     * @return
     */
    public GenericResult queryMtsSerial(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        GenericResult rs = new GenericResult();
        //错误代码：-100118，错误信息：序列号表记录查询失败
        //查询指定的序号记录
        CommBiz.commBexCall("QUERY_SERIAL_Bex", params, commParams, rs,
                AtomError.QUERY_SERIAL_FAIL_CODE, AtomError.QUERY_SERIAL_FAIL_MSG);

        return new AtomResult("0", "序列号表记录查询成功！",rs.getDataList());
    }

    /**
     * @method_desc:新增序列号配置信息
     * @param dataExchange
     * @return
     */
    public GenericResult addMtsSerial(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);


        GenericResult qryRs = new GenericResult();
        Map qryMap= MapUtil.getNewHashMapByKeys(params,"SERIAL_TYPE","ORG_CODE","DELETE_SERIAL_Bex");
        //错误代码：-100118，错误信息：序列号表记录查询失败
        CommBiz.commBexCall("QUERY_SERIAL_Bex", qryMap, commParams, qryRs,
                AtomError.QUERY_SERIAL_FAIL_CODE, AtomError.QUERY_SERIAL_FAIL_MSG);
        if(qryRs.getDataList().size()>0){

            //错误代码：-100167，错误信息：新增序列号配置信息已存在
            throw new AtomException(AtomError.T_SERIAL_AlREADY_EXIST_ERROR_CODE,
                    AtomError.T_SERIAL_AlREADY_EXIST_ERROR_MSG, FrameworkConstants.ATOM_LVL);
        }

        params.put("UP_DATE", DateUtil.today());
        params.put("SYS_TYPE","0");
        GenericResult rs = new GenericResult();
        //错误代码：-100165，错误信息：ADD_T_SERIAL_ERROR_CODE
        CommBiz.commBexCall("INSERT_SERIAL_Bex", params, commParams, rs,
                AtomError.ADD_T_SERIAL_ERROR_CODE, AtomError.ADD_T_SERIAL_ERROR_MSG);

        return new AtomResult("0", "新增序列号配置信息成功！");
    }

    /**
     * @method_desc:修改序列号配置信息
     * @param dataExchange
     * @return
     */
    public GenericResult modMtsSerial(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        params.put("UP_DATE", DateUtil.today());
        GenericResult rs = new GenericResult();
        //错误代码：-100117，错误信息：修改序列号配置信息失败
        CommBiz.commBexCall("UPDATE_SERIAL_Bex", params, commParams, rs,
                AtomError.UPDATE_SERIAL_FAIL_CODE, AtomError.UPDATE_SERIAL_FAIL_MSG);

        return new AtomResult("0", "修改序列号配置信息成功！");
    }

    /**
     * @method_desc:删除序列号配置信息
     * @param dataExchange
     * @return
     */
    public GenericResult delMtsSerial(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        GenericResult rs = new GenericResult();
        //错误代码：-100117，错误信息：修改序列号配置信息失败
        CommBiz.commBexCall("DELETE_SERIAL_Bex", params, commParams, rs,
                AtomError.DEL_T_SERIAL_ERROR_CODE, AtomError.DEL_T_SERIAL_ERROR_MSG);

        return new AtomResult("0", "删除序列号配置信息成功！");
    }
}
