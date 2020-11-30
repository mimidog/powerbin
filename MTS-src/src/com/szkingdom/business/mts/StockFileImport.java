package com.szkingdom.business.mts;

import com.szkingdom.business.common.AtomError;
import com.szkingdom.business.common.CommBiz;
import com.szkingdom.business.common.PlatSysParamManager;
import com.szkingdom.business.util.DBUtil;
import com.szkingdom.business.util.ImportTxtFile;
import com.szkingdom.frame.config.CustomizedPropertyPlaceholderConfigurer;
import com.szkingdom.frame.service.model.GenericResult;
import org.apache.commons.lang.ObjectUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class StockFileImport {
    /**
     * @method_desc: 导入股票买入信号文件
     */
    private void importTxtStockBuyBuildFile() {
        Map params = new HashMap();
        Map commParams = new HashMap();
        //要导入的字段英文名
        String strColTtile= ObjectUtils.toString(CustomizedPropertyPlaceholderConfigurer.getContextProperty("buy.bulid.file.col"));

        //得到导出文件txt导出文件的路径
        String dirPath = ObjectUtils.toString(CustomizedPropertyPlaceholderConfigurer.getContextProperty("buy.bulid.file.path"));
        //以List形式得到文件内容
        List assetList= ImportTxtFile.readTxtFileContentSeparator(dirPath, strColTtile,",",
                "\t");

        GenericResult result = new GenericResult();

        //错误信息：-100081 买入信息文件批量新增临时表失败
        //todo 分批导入数据
        int  iRetCode = DBUtil.savebyGroup(params, commParams, result, assetList,"BUY_BUILD_POS_LIST","insertBatch_T_BUY_BUILD_POS_TEMP_Bex",
                AtomError.ADD_T_BUY_BUILD_POS_TEMP_ATOM_ERROR_CODE,
                AtomError.ADD_T_BUY_BUILD_POS_TEMP_ATOM_ERROR_MSG,100);
    }
    /**
     * @method_desc:新增买入股票建仓信息（增量）
     */
    private void addBuyStockBulidPosInfo(){

         Map params = new HashMap();
         Map commParams = new HashMap();
         GenericResult result = new GenericResult();

         //错误代码：-100083，错误信息：买入股票正式建仓新增失败
         CommBiz.commBexCall("insert_T_STOK_BUILD_POS_BUY_Bex", params, commParams, result,
                 AtomError.ADD_T_STOK_BUILD_POS_BUY_ATOM_ERROR_CODE, AtomError.ADD_T_STOK_BUILD_POS_BUY_ATOM_ERROR_MSG);

         //错误代码：-100082，错误信息：清空买入信号表失败
         CommBiz.commBexCall("clear_T_BUY_BUILD_POS_TEMP_Bex", params, commParams, result,
                 AtomError.CLEAR_T_BUY_BUILD_POS_TEMP_ATOM_ERROR_CODE, AtomError.CLEAR_T_BUY_BUILD_POS_TEMP_ATOM_ERROR_MSG);

     }
    /**
     * @method_desc:根据买入建仓信息插入到订单信息
     */
    private void addOmsByBuyBuildPost(){
        Map commParams = new HashMap();
        Map params = new HashMap();

        GenericResult result = new GenericResult();


        //错误代码：-100085，错误信息：根据买入建仓信息插入到订单信息
        CommBiz.commBexCall("insert_OMS_BY_BUY_BUILD_POS_Bex", params, commParams, result,
                AtomError.ADD_OMS_BY_BUY_BUILD_POS_ATOM_ERROR_CODE, AtomError.ADD_OMS_BY_BUY_BUILD_POS_ATOM_ERROR_MSG);

        params.clear();
        //更新操作前的状态值
        params.put("BEFORE_IS_OMS", "0");
        params.put("AFTER_IS_OMS", "1");
        //股票买入方向
        params.put("TRADE_DIRECT", "1");

        params.put("UP_DATE", SysConfigManager.getSysDate());

        //错误代码：-100084，错误信息：更新买方向股票建仓信息状态
        CommBiz.commBexCall("update_T_STOK_BUILD_POS_BUY_STA_Bex", params, commParams, result,
                AtomError.MOD_T_STOK_BUILD_POS_BUY_STA_ATOM_ERROR_CODE,
                AtomError.MOD_T_STOK_BUILD_POS_BUY_STA_ATOM_ERROR_MSG);

    }


    /**
     * @method_desc: 导入股票卖出信号文件
     */
    private void importTxtStockSellBuildFile(){
        Map params = new HashMap();
        Map commParams = new HashMap();
        //要导入的字段英文名
        String strColTtile= ObjectUtils.toString(CustomizedPropertyPlaceholderConfigurer.getContextProperty("sell.bulid.file.col"));

        //得到导出文件txt导出文件的路径
        String dirPath = ObjectUtils.toString(CustomizedPropertyPlaceholderConfigurer.getContextProperty("sell.bulid.file.path"));
        //以List形式得到文件内容
        List assetList= ImportTxtFile.readTxtFileContentSeparator(dirPath, strColTtile,",",
                "\t");

        GenericResult result = new GenericResult();

        //错误信息：-100086 ,买入信息文件批量新增临时表失败
        //todo 分批导入数据
        int  iRetCode = DBUtil.savebyGroup(params, commParams, result, assetList,"SELL_BUILD_POS_LIST","insertBatch_T_SELL_BUILD_POS_TEMP_Bex",
                AtomError.ADD_T_SELL_BUILD_POS_TEMP_ATOM_ERROR_CODE,
                AtomError.ADD_T_SELL_BUILD_POS_TEMP_ATOM_ERROR_MSG,100);
    }
    /**
     * @method_desc:新增卖出股票建仓信息（增量）
     */
    private void addSellStockBulidPosInfo(){

        Map params = new HashMap();
        Map commParams = new HashMap();
        GenericResult result = new GenericResult();

        //错误代码：-100088，错误信息：卖出股票正式建仓新增失败
        CommBiz.commBexCall("insert_T_STOK_BUILD_POS_SELL_Bex", params, commParams, result,
                AtomError.ADD_T_STOK_BUILD_POS_SELL_ATOM_ERROR_CODE, AtomError.ADD_T_STOK_BUILD_POS_SELL_ATOM_ERROR_MSG);

        //错误代码：-100087，错误信息：清空卖出信号临时表失败
        CommBiz.commBexCall("clear_T_sell_BUILD_POS_TEMP_Bex", params, commParams, result,
                AtomError.CLEAR_T_SELL_BUILD_POS_TEMP_ATOM_ERROR_CODE, AtomError.CLEAR_T_SELL_BUILD_POS_TEMP_ATOM_ERROR_MSG);

    }
    /**
     * @method_desc:根据卖出建仓信息插入到订单信息
     */
    private void addOmsBySellBuildPost(){
        Map commParams = new HashMap();
        Map params = new HashMap();

        GenericResult result = new GenericResult();

        //错误代码：-100085，错误信息：根据卖出建仓信息插入到订单信息
        CommBiz.commBexCall("insert_OMS_BY_SELL_BUILD_POS_Bex", params, commParams, result,
                AtomError.ADD_OMS_BY_SELL_BUILD_POS_ATOM_ERROR_CODE, AtomError.ADD_OMS_BY_SELL_BUILD_POS_ATOM_ERROR_MSG);

        params.clear();
        //更新操作前的状态值
        params.put("BEFORE_IS_OMS", "0");
        params.put("AFTER_IS_OMS", "1");
        //股票卖出方向
        params.put("TRADE_DIRECT", "2");
        params.put("UP_DATE", SysConfigManager.getSysDate());
        //错误代码：-100155，错误信息：更新卖方向股票建仓信息状态
        CommBiz.commBexCall("update_T_STOK_BUILD_POS_SELL_STA_Bex", params, commParams, result,
                AtomError.MOD_T_STOK_BUILD_POS_SELL_STA_ATOM_ERROR_CODE,
                AtomError.MOD_T_STOK_BUILD_POS_SELL_STA_ATOM_ERROR_MSG);

    }
    /**
     * @method_desc:由股票建仓信息生成订单信息（增量）
     */
     public void createOmsByStockBuildPos(){

           //导入股票买入信号文件
          importTxtStockBuyBuildFile();
          //新增买入股票建仓信息（增量）
         addBuyStockBulidPosInfo();
         //根据买入建仓信息插入到订单信息
         addOmsByBuyBuildPost();

         //导入股票卖出信号文件
         importTxtStockSellBuildFile();
         //新增卖出股票建仓信息（增量）
         addSellStockBulidPosInfo();
         //根据卖出建仓信息插入到订单信息
         addOmsBySellBuildPost();

     }

}
