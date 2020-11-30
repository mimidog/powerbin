package com.szkingdom.business.mts;

import com.szkingdom.business.common.AtomError;
import com.szkingdom.business.common.CommBiz;
import com.szkingdom.business.common.PlatSysParamManager;
import com.szkingdom.business.util.DataExchangeUtil;
import com.szkingdom.business.util.DateUtil;
import com.szkingdom.business.util.MapUtils;
import com.szkingdom.frame.business.atom.AtomResult;
import com.szkingdom.frame.business.atom.exchange.DataExchangeAssembly;
import com.szkingdom.frame.config.FrameworkConstants;
import com.szkingdom.frame.exception.AtomException;
import com.szkingdom.frame.service.model.GenericResult;
import org.apache.commons.collections.map.HashedMap;
import org.apache.commons.lang.ObjectUtils;
import com.szkingdom.frame.business.atom.basic.AtomAbstract;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SerialGeneratorAtom extends AtomAbstract{

    /**
     * @method_desc:客户产生的序列
     * @param dataExchange
     * @return
     */
    public GenericResult createCustIdSerial(DataExchangeAssembly dataExchange) {
            Map commParams= DataExchangeUtil.getCommParams(dataExchange);
            Map params=DataExchangeUtil.getParams(dataExchange);

            HashedMap inputparams = new HashedMap();
            inputparams.put("ORG_CODE", params.get("ORG_CODE"));
            inputparams.put("SYS_TYPE", "0");
            inputparams.put("SERIAL_TYPE","S_CUSTID");
            //生成的序列号
            String createSeriaNO="";

            int loopNum=Integer.parseInt(PlatSysParamManager.getParamValByParamCode("SERIAL_LOOP_CREATE_NUM"));
            int calc=0;
            do {

                dataExchange.setBusinessData("serialParam",inputparams);
                createSeriaNO=createBusinessSerial(dataExchange);
                if(createSeriaNO.isEmpty()){
                    //错误代码：-100146，错误信息：当前机构对应的序列号配置信息不存在
                    throw new AtomException(AtomError.QUERY_T_CUSTOMER_OPEN_INFO_ERROR_CODE,
                            AtomError.CURRENT_ORG_SERIAL_NOT_EXIST_FAIL_MSG,
                            FrameworkConstants.ATOM_LVL);
                }

                GenericResult result = new GenericResult();
                Map qryMap=new HashMap();
                qryMap.put("CUST_ID", createSeriaNO);

                //错误代码：-100009，错误信息：查询客户开户信息失败
                CommBiz.commBexCall("query_T_CUSTOMER_OPEN_INFO_Bex", qryMap, commParams, result,
                        AtomError.QUERY_T_CUSTOMER_OPEN_INFO_ERROR_CODE,
                        AtomError.QUERY_T_CUSTOMER_OPEN_INFO_ERROR_MSG);

                if(result.getDataList().size()==0){
                     break;
                }
                calc++;
            }while(calc<loopNum);

            return new AtomResult("0", "客户代码生成成功！",buildIdRetData("CUST_ID",createSeriaNO));

    }
    /**
     * @method_desc:资金账号产生的序列
     * @param dataExchange
     * @return
     */
    public GenericResult createCuacctSerial(DataExchangeAssembly dataExchange) {
        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        int currency=Integer.parseInt(ObjectUtils.toString(params.get("CURRENCY")));

        HashedMap inputparams = new HashedMap();
        switch (currency){
            case 0:
                inputparams.put("SERIAL_TYPE", "S_FUNDID_RMB");
            break;
            case 1:
                inputparams.put("SERIAL_TYPE", "S_FUNDID_USB");
                break;
            case 2:
                inputparams.put("SERIAL_TYPE", "S_FUNDID_HKB");
                break;
        }

        inputparams.put("ORG_CODE", params.get("ORG_CODE"));
        inputparams.put("SYS_TYPE", "0");

        //生成的序列号
        String createSeriaNO="";

        int loopNum=Integer.parseInt(PlatSysParamManager.getParamValByParamCode("SERIAL_LOOP_CREATE_NUM"));
        int calc=0;
        do {

            dataExchange.setBusinessData("serialParam",inputparams);
            createSeriaNO=createBusinessSerial(dataExchange);
            if(createSeriaNO.isEmpty()){
                //错误代码：-100146，错误信息：当前机构对应的序列号配置信息不存在
                throw new AtomException(AtomError.QUERY_T_CUSTOMER_OPEN_INFO_ERROR_CODE,
                        AtomError.CURRENT_ORG_SERIAL_NOT_EXIST_FAIL_MSG,
                        FrameworkConstants.ATOM_LVL);
            }

            GenericResult result = new GenericResult();
            Map qryMap=new HashMap();
            qryMap.put("CUACCT_ID", createSeriaNO);

            //错误代码：-100001，错误信息：查询客户资金账号信息失败
            CommBiz.commBexCall("query_T_CUACCT_Bex", qryMap, commParams, result,
                    AtomError.QUERY_T_CUACCT_ERROR_CODE, AtomError.QUERY_T_CUACCT_ERROR_MSG);

            if(result.getDataList().size()==0){
                break;
            }
            calc++;
        }while(calc<loopNum);

        return new AtomResult("0", "资金账户生成成功！",buildIdRetData("CUACCT_ID",createSeriaNO));
    }
    /**
     * @method_desc:人员ID号产生的序列
     * @param dataExchange
     * @return
     */
    public GenericResult createEmpId(DataExchangeAssembly dataExchange){
        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        HashedMap inputparams = new HashedMap();
        inputparams.put("ORG_CODE", params.get("ORG_CODE"));
        inputparams.put("SYS_TYPE", "0");
        inputparams.put("SERIAL_TYPE","S_OPID");
        //生成的序列号
        String createSeriaNO="";

        int loopNum=Integer.parseInt(PlatSysParamManager.getParamValByParamCode("SERIAL_LOOP_CREATE_NUM"));
        int calc=0;
        do {

            dataExchange.setBusinessData("serialParam",inputparams);
            createSeriaNO=createBusinessSerial(dataExchange);
            if(createSeriaNO.isEmpty()){
                //错误代码：-100146，错误信息：当前机构对应的序列号配置信息不存在
                throw new AtomException(AtomError.QUERY_T_CUSTOMER_OPEN_INFO_ERROR_CODE,
                        AtomError.CURRENT_ORG_SERIAL_NOT_EXIST_FAIL_MSG,
                        FrameworkConstants.ATOM_LVL);
            }

            GenericResult result = new GenericResult();
            Map qryMap=new HashMap();
            qryMap.put("USER_CODE", createSeriaNO);

            //错误代码：-100147，错误信息：查询操作员人员信息失败
            CommBiz.commBexCall("queryUserByUserCode", qryMap, commParams, result,
                    AtomError.QRY_UUM_USER_FAIL_CODE,
                    AtomError.QRY_UUM_USER_FAIL_MSG);

            if(result.getDataList().size()==0){
                break;
            }
            calc++;
        }while(calc<loopNum);

        return new AtomResult("0", "人员ID生成成功！",buildIdRetData("USER_CODE",createSeriaNO));

    }

    /**
     * 功能:根据SERIAL(序列号)表的配置产生对应的序列号
     * @param dataExchange :缓冲区的serialParam里面序列的参数
     *  缓冲区中的serialParam的SERIAL_TYPE：       序列号类型(必填)
     *  缓冲区中serialParam的ORG_CODE：            机构代码类型(必填)
     *  缓冲区中serialParam的SYS_TYPE：            系统类型(必填)
     *  缓冲区中serialParam的SKIN_DIGIT_ARR：      序号产生跳过数组(非必填)，如跳过13，4
     *  缓冲区中serialParam的IS_EVERYDAY_RESET：   是否每天重置序号(非必填),0-否,1-是
     *  缓冲区中serialParam的RESET_VAL：           要重置序号的值(非必填),
     * @return
     */
    public synchronized  String  createBusinessSerial(DataExchangeAssembly dataExchange) {

        Map serialInput = (Map<String, String>) dataExchange.getBusinessData("serialParam");
        Map<String, String> commParams = (Map<String, String>) dataExchange.getBusinessData("commParams");

        MapUtils.checkParam(serialInput, "SERIAL_TYPE","序列号类型不能空!");
        MapUtils.checkParam(serialInput, "ORG_CODE","机构代码不能空!");
        MapUtils.checkParam(serialInput, "SYS_TYPE","系统类型不能空!");

        GenericResult serialResult = new AtomResult();
        //查询指定的序号记录
        CommBiz.commBexCall("QUERY_SERIAL_Bex", serialInput, commParams, serialResult,
                AtomError.QUERY_SERIAL_FAIL_CODE, AtomError.QUERY_SERIAL_FAIL_MSG);

        //存储序列号上次更新值
        long serialLastVal=0;
        //存储序列号最大值、最小值
        long serialMaxVal=0, serialMinVal=0;
        //存储序列号的长度、
        long serialLen=0;
        //存储序列的前缀标识
        String serialPrefix="";
        //当前序列值,得到更新日期
        String currSerialVal="",serialUpDate="";

        if (serialResult.getDataList() != null  && serialResult.getDataList().size() > 0
                && serialResult.getDataList().get(0) !=null && !serialResult.getDataList().get(0).isEmpty()) {

            serialLastVal= Long.parseLong(ObjectUtils.toString(serialResult.getDataList().get(0).get("LAST_VAL_INT64")));
            serialLastVal +=1;
            serialMaxVal= Long.parseLong(ObjectUtils.toString(serialResult.getDataList().get(0).get("MAX_VAL_INT64")));
            serialMinVal= Long.parseLong(ObjectUtils.toString(serialResult.getDataList().get(0).get("MIN_VAL_INT64")));
            serialLen= Long.parseLong(ObjectUtils.toString(serialResult.getDataList().get(0).get("ACCT_LEN")));
            serialPrefix= ObjectUtils.toString(serialResult.getDataList().get(0).get("PREFIX"));
            serialUpDate= ObjectUtils.toString(serialResult.getDataList().get(0).get("UP_DATE"));
        }else{
            //错误代码：-100022, 错误信息：DIA_序列号表查询无记录
            throw new AtomException(AtomError.QUERY_SERIAL_DATA_FAIL_CODE,
                    AtomError.QUERY_SERIAL_DATA_FAIL_MSG, FrameworkConstants.ATOM_LVL);
        }
        //判断是否置流水号
        if(ObjectUtils.toString(serialInput.get("IS_EVERYDAY_RESET")).equals("1")
                && !ObjectUtils.toString(serialInput.get("RESET_VAL")).equals("")
                && !DateUtil.today().equals(serialUpDate)){
            serialLastVal=Integer.parseInt(ObjectUtils.toString(serialInput.get("RESET_VAL")));
        }

        //排除掉如4与13等不吉利的数字
        if(!ObjectUtils.toString(serialInput.get("SKIN_DIGIT_ARR")).isEmpty() &&
                ((List)serialInput.get("SKIN_DIGIT_ARR")).size()>0){
            List skinDigitArr=((List)serialInput.get("SKIN_DIGIT_ARR"));
            for(int i=0;i<skinDigitArr.size();i++){
                //得到单个跳转数字位数
                int singleDigitLen = ObjectUtils.toString(skinDigitArr.get(i)).length();
                //个位数时，divider值为10，十位数是100，以此类推....
                int  divider=Integer.parseInt('1'+String.format("%0"+singleDigitLen+"d",0));
                if (serialLastVal %  divider==Integer.parseInt(ObjectUtils.toString(skinDigitArr.get(i)))){
                    serialLastVal +=1;
                }

            }
        }
        //序列号要补0
        currSerialVal=serialPrefix+String.format("%0"+(serialLen-(serialPrefix.length()))+"d", serialLastVal);


        if(Long.parseLong(currSerialVal.trim())>Long.parseLong(serialPrefix+serialMaxVal)){
            //错误代码：-100020, 错误信息：DIA_当前序列号值不能大于最大序列值
            throw new AtomException(AtomError.CHECK_CUR_SERIAL_VAL_FAIL_CODE,
                    AtomError.CHECK_CUR_SERIAL_VAL_FAIL_MSG, FrameworkConstants.ATOM_LVL);
        }
        //把当前serialLastVal+1的值更新到serial表LAST_VAL_INT64字段与时间
        serialInput.put("LAST_VAL_INT64",serialLastVal);
        serialInput.put("UP_DATE", DateUtil.today());
        GenericResult upSerial = new AtomResult();
        CommBiz.commBexCall("UPDATE_SERIAL_Bex", serialInput, commParams, serialResult,
                AtomError.UPDATE_SERIAL_FAIL_CODE, AtomError.UPDATE_SERIAL_FAIL_MSG);

        return currSerialVal;

    }

}
