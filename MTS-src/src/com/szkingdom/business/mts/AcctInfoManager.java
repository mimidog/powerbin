package com.szkingdom.business.mts;

import com.szkingdom.business.common.AtomError;
import com.szkingdom.business.common.CommBiz;
import com.szkingdom.business.util.DataExchangeUtil;
import com.szkingdom.business.util.DateUtil;
import com.szkingdom.business.util.MapUtil;
import com.szkingdom.frame.business.atom.AtomResult;
import com.szkingdom.frame.business.atom.exchange.DataExchangeAssembly;
import com.szkingdom.frame.config.FrameworkConstants;
import com.szkingdom.frame.exception.AtomException;
import com.szkingdom.frame.service.model.GenericResult;
import org.apache.commons.lang3.ObjectUtils;

import java.util.HashMap;
import java.util.Map;

/**
 * @file_desc: 账户信息管理
 *
 */
public class AcctInfoManager {

    private OperationLog opLog = new OperationLog();
    /**
     * @method_desc: 查询客户资金账号信息
     * @param dataExchange
     * @return
     */
    public GenericResult queryCustCuacctInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        //调用数据权限
        GenericResult permission = new GenericResult();
        Map map = new HashMap();
        map.put("OP_CODE", commParams.get("OP_CODE"));
        map.put("T_CODE_ID", "K.CUST_ID");
        CommBiz.commBexCall("CALL_FUN_GET_DATA_PERMISSION_Bex", map, commParams, permission,
                AtomError.CALL_FUN_GET_DATA_PERMISSION_FAIL_CODE, AtomError.CALL_FUN_GET_DATA_PERMISSION_FAIL_MSG);
        params.put("PERMISSION_SQL", permission.getDataList().get(0).get("PERMISSION_SQL"));

        GenericResult result = new GenericResult();
        //错误代码：-100001，错误信息：查询客户资金账号信息失败
        CommBiz.commBexCall("query_T_CUACCT_Bex", params, commParams, result,
                AtomError.QUERY_T_CUACCT_ERROR_CODE, AtomError.QUERY_T_CUACCT_ERROR_MSG);

        return new AtomResult("0", "查询客户资金账号信息成功！", result.getDataList());
    }
    /**
     * @method_desc: 新增客户资金账号信息
     * @param dataExchange
     * @return
     */
    public GenericResult addCustCuacctInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        MapUtil.chkNoNull(params, "CUST_ID", "CUACCT_ID","CUACCT_LVL","CUACCT_STATUS");
        //添加更新日期
        params.put("UP_DATE", DateUtil.today());

        GenericResult result = new GenericResult();
        //错误代码：-100002，错误信息：新增客户资金账号信息失败
        CommBiz.commBexCall("insert_T_CUACCT_Bex", params, commParams, result,
                AtomError.ADD_T_CUACCT_ERROR_CODE, AtomError.ADD_T_CUACCT_ERROR_MSG);

        return new AtomResult("0", "新增客户资金账号信息成功！");
    }
    /**
     * @method_desc: 修改客户资金账号信息
     * @param dataExchange
     * @return
     */
    public GenericResult modCustCuacctInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        MapUtil.chkNoNull(params, "CUST_ID", "CUACCT_ID");

        //添加更新日期
        params.put("UP_DATE", DateUtil.today());

        GenericResult result = new GenericResult();
        //错误代码：-100003，错误信息：修改客户资金账号信息失败
        CommBiz.commBexCall("update_T_CUACCT_Bex", params, commParams, result,
                AtomError.MOD_T_CUACCT_ERROR_CODE, AtomError.MOD_T_CUACCT_ERROR_MSG);

        return new AtomResult("0", "修改客户资金账号信息成功！");
    }

    /**
     * @method_desc: 删除客户资金账号信息
     * @param dataExchange
     * @return
     */
    public GenericResult delCustCuacctInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        MapUtil.chkNoNull(params, "CUST_ID", "CUACCT_ID");

        GenericResult result = new GenericResult();
        //错误代码：-100004，错误信息：删除客户资金账号信息失败
        CommBiz.commBexCall("delete_T_CUACCT_Bex", params, commParams, result,
                AtomError.DEL_T_CUACCT_ERROR_CODE, AtomError.DEL_T_CUACCT_ERROR_MSG);

        return new AtomResult("0", "删除客户资金账号信息成功！");
    }

    /**
     * @method_desc: 查询客户交易账号信息
     * @param dataExchange
     * @return
     */
    public GenericResult queryCustTrdacctInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        //调用数据权限
        GenericResult permission = new GenericResult();
        Map map = new HashMap();
        map.put("OP_CODE", commParams.get("OP_CODE"));
        map.put("T_CODE_ID", "K.CUST_ID");
        CommBiz.commBexCall("CALL_FUN_GET_DATA_PERMISSION_Bex", map, commParams, permission,
                AtomError.CALL_FUN_GET_DATA_PERMISSION_FAIL_CODE, AtomError.CALL_FUN_GET_DATA_PERMISSION_FAIL_MSG);
        params.put("PERMISSION_SQL", permission.getDataList().get(0).get("PERMISSION_SQL"));

        GenericResult result = new GenericResult();
        //错误代码：-100005，错误信息：查询客户交易账号信息失败
        CommBiz.commBexCall("query_T_TRDACCT_Bex", params, commParams, result,
                AtomError.QUERY_T_TRDACCT_ERROR_CODE, AtomError.QUERY_T_TRDACCT_ERROR_MSG);

        return new AtomResult("0", "查询客户交易账号信息成功！", result.getDataList());
    }

    /**
     * @method_desc: 新增客户交易账号信息
     * @param dataExchange
     * @return
     */
    public GenericResult addCustTrdacctInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        MapUtil.chkNoNull(params, "CUST_ID", "CUACCT_ID","STKBD","TRDACCT","STK_STATUS");

        //添加更新日期
        params.put("UP_DATE", DateUtil.today());


        GenericResult result = new GenericResult();
        //错误代码：-100006，错误信息：新增客户交易账号信息失败
        CommBiz.commBexCall("insert_T_TRDACCT_Bex", params, commParams, result,
                AtomError.ADD_T_TRDACCT_ERROR_CODE, AtomError.ADD_T_TRDACCT_ERROR_MSG);

        return new AtomResult("0", "新增客户交易账号信息成功！");
    }

    /**
     * @method_desc: 修改客户交易账号信息
     * @param dataExchange
     * @return
     */
    public GenericResult modCustTrdacctInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        MapUtil.chkNoNull(params, "CUST_ID", "CUACCT_ID","STKBD","TRDACCT");

        //添加更新日期
        params.put("UP_DATE", DateUtil.today());


        GenericResult result = new GenericResult();
        //错误代码：-100007，错误信息：修改客户交易账号信息失败
        CommBiz.commBexCall("update_T_TRDACCT_Bex", params, commParams, result,
                AtomError.MOD_T_TRDACCT_ERROR_CODE, AtomError.MOD_T_TRDACCT_ERROR_MSG);

        return new AtomResult("0", "修改客户交易账号信息成功！");
    }

    /**
     * @method_desc: 删除客户交易账号信息
     * @param dataExchange
     * @return
     */
    public GenericResult delCustTrdacctInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        MapUtil.chkNoNull(params, "CUST_ID", "CUACCT_ID","STKBD","TRDACCT");

        GenericResult result = new GenericResult();
        //错误代码：-100007，错误信息：修改客户交易账号信息失败
        CommBiz.commBexCall("delete_T_TRDACCT_Bex", params, commParams, result,
                AtomError.DEL_T_TRDACCT_ERROR_CODE, AtomError.DEL_T_TRDACCT_ERROR_MSG);

        return new AtomResult("0", "删除客户交易账号信息成功！");
    }

    /**
     * @method_desc: 查询个人客户开户信息
     * @param dataExchange
     * @return
     */
    public GenericResult queryPerCustOpenAcctInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        //调用数据权限
        GenericResult permission = new GenericResult();
        Map map = new HashMap();
        map.put("OP_CODE", commParams.get("OP_CODE"));
        map.put("T_CODE_ID", "T2.CUST_ID");
        CommBiz.commBexCall("CALL_FUN_GET_DATA_PERMISSION_Bex", map, commParams, permission,
                AtomError.CALL_FUN_GET_DATA_PERMISSION_FAIL_CODE, AtomError.CALL_FUN_GET_DATA_PERMISSION_FAIL_MSG);
        params.put("PERMISSION_SQL", permission.getDataList().get(0).get("PERMISSION_SQL"));

        GenericResult result = new GenericResult();
        //错误代码：-100009，错误信息：查询客户开户信息失败
        CommBiz.commBexCall("query_T_CUSTOMER_OPEN_INFO_Bex", params, commParams, result,
                AtomError.QUERY_T_CUSTOMER_OPEN_INFO_ERROR_CODE,
                AtomError.QUERY_T_CUSTOMER_OPEN_INFO_ERROR_MSG);

        return new AtomResult("0", "查询客户开户信息失败！", result.getDataList());
    }
    /**
     * @method_desc: 新增个人客户开户信息
     * @param dataExchange
     * @return
     */
    public GenericResult addPerCustOpenAcctInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        MapUtil.chkNoNull(params, "CUST_ID");

        //添加更新日期
        params.put("UP_DATE", DateUtil.today());

        GenericResult result = new GenericResult();

        //错误代码：-100010，错误信息：删除个人客户基本信息失败
        CommBiz.commBexCall("insert_T_CUST_BASE_INFO_Bex", params, commParams, result,
                AtomError.ADD_T_CUST_BASE_INFO_ERROR_CODE,
                AtomError.ADD_T_CUST_BASE_INFO_ERROR_MSG);

        //错误代码：-100011，错误信息：删除客户开户信息失败
        CommBiz.commBexCall("insert_T_CUSTOMER_Bex", params, commParams, result,
                AtomError.ADD_T_CUSTOMER_ERROR_CODE,
                AtomError.ADD_T_CUSTOMER_INFO_ERROR_MSG);


        return new AtomResult("0", "新增客户开户信息成功！");
    }
    /**
     * @method_desc: 修改个人客户开户信息
     * @param dataExchange
     * @return
     */
    public GenericResult modPerCustOpenAcctInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        MapUtil.chkNoNull(params, "CUST_ID");

        //添加更新日期
        params.put("UP_DATE", DateUtil.today());

        GenericResult result = new GenericResult();

        //错误代码：-100010，错误信息：修改个人客户基本信息失败
        CommBiz.commBexCall("update_T_CUST_BASE_INFO_Bex", params, commParams, result,
                AtomError.MOD_T_CUST_BASE_INFO_ERROR_CODE,
                AtomError.MOD_T_CUST_BASE_INFO_ERROR_MSG);

        //错误代码：-100011，错误信息：修改客户开户信息失败
        CommBiz.commBexCall("update_T_CUSTOMER_Bex", params, commParams, result,
                AtomError.MOD_T_CUSTOMER_ERROR_CODE,
                AtomError.MOD_T_CUSTOMER_INFO_ERROR_MSG);
        return new AtomResult("0", "修改客户开户信息成功！");
    }
    /**
     * @method_desc: 删除个人客户开户信息
     * @param dataExchange
     * @return
     */
    public GenericResult delPerCustOpenAcctInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        MapUtil.chkNoNull(params, "CUST_ID");

        Map delParam=new HashMap();
        delParam.put("CUST_ID", ObjectUtils.toString(params.get("CUST_ID")));

        GenericResult result = new GenericResult();
        //错误代码：-100014，错误信息：删除客户开户信息失败
        CommBiz.commBexCall("delete_T_CUSTOMER_Bex", delParam, commParams, result,
                AtomError.DEL_T_CUSTOMER_ERROR_CODE,
                AtomError.DEL_T_CUSTOMER_INFO_ERROR_MSG);

            //错误代码：-100015，错误信息：删除个人客户基本信息失败
        CommBiz.commBexCall("delete_T_CUST_BASE_INFO_Bex", delParam, commParams, result,
                AtomError.DEL_T_CUST_BASE_INFO_ERROR_CODE,
                AtomError.DEL_T_CUST_BASE_INFO_ERROR_MSG);

        return new AtomResult("0", "删除客户开户信息成功！");
    }
    /**
     * @method_desc: 查询资金子账户设置信息
     * @param dataExchange
     * @return
     */
    public GenericResult queryCustCuacctSubInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        //调用数据权限
        GenericResult permission = new GenericResult();
        Map map = new HashMap();
        map.put("OP_CODE", commParams.get("OP_CODE"));
        map.put("T_CODE_ID", "K.CUST_ID");
        CommBiz.commBexCall("CALL_FUN_GET_DATA_PERMISSION_Bex", map, commParams, permission,
                AtomError.CALL_FUN_GET_DATA_PERMISSION_FAIL_CODE, AtomError.CALL_FUN_GET_DATA_PERMISSION_FAIL_MSG);
        params.put("PERMISSION_SQL", permission.getDataList().get(0).get("PERMISSION_SQL"));

        GenericResult result = new GenericResult();
        //错误代码：-100016，错误信息：查询资金子账户设置信息失败
        CommBiz.commBexCall("query_T_CUACCT_SUB_Bex", params, commParams, result,
                AtomError.QUERY_T_CUACCT_SUB_ERROR_CODE,
                AtomError.QUERY_T_CUACCT_SUB_ERROR_MSG);

        return new AtomResult("0", "查询资金子账户设置信息！",result.getDataList());
    }
    /**
     * @method_desc: 新增资金子账户设置信息
     * @param dataExchange
     * @return
     */
    public GenericResult addCustCuacctSubInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        MapUtil.chkNoNull(params, "CUST_ID","CUACCT_ID","OP_ID");

        GenericResult result = new GenericResult();

        //添加更新日期
        params.put("UP_DATE", DateUtil.today());
        //错误代码：-100017，错误信息：新增资金子账户设置信息失败
        CommBiz.commBexCall("insert_T_CUACCT_SUB_Bex", params, commParams, result,
                AtomError.ADD_T_CUACCT_SUB_ERROR_CODE,
                AtomError.ADD_T_CUACCT_SUB_ERROR_MSG);

        return new AtomResult("0", "新增资金子账户设置信息成功！");
    }
    /**
     * @method_desc: 修改资金子账户设置信息
     * @param dataExchange
     * @return
     */
    public GenericResult modCustCuacctSubInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        MapUtil.chkNoNull(params, "CUST_ID","CUACCT_ID","OP_ID");

        //添加更新日期
        params.put("UP_DATE", DateUtil.today());

        GenericResult result = new GenericResult();

        //错误代码：-100018，错误信息：修改资金子账户设置信息失败
        CommBiz.commBexCall("update_T_CUACCT_SUB_Bex", params, commParams, result,
                AtomError.MOD_T_CUACCT_SUB_ERROR_CODE,
                AtomError.MOD_T_CUACCT_SUB_ERROR_MSG);

        //修改资金子账户设置日志
        opLog.insertOpLog("3", "2", commParams);

        return new AtomResult("0", "修改资金子账户设置信息成功！");
    }
    /**
     * @method_desc: 删除资金子账户设置信息
     * @param dataExchange
     * @return
     */
    public GenericResult delCustCuacctSubInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        MapUtil.chkNoNull(params, "CUST_ID","CUACCT_ID","OP_ID");

        GenericResult result = new GenericResult();

        //错误代码：-100018，错误信息：删除资金子账户设置信息失败
        CommBiz.commBexCall("delete_T_CUACCT_SUB_Bex", params, commParams, result,
                AtomError.DEL_T_CUACCT_SUB_ERROR_CODE,
                AtomError.DEL_T_CUACCT_SUB_ERROR_MSG);

        //删除资金子账户设置日志
        opLog.insertOpLog("3", "3", commParams);

        return new AtomResult("0", "删除资金子账户设置信息成功！");
    }

}
