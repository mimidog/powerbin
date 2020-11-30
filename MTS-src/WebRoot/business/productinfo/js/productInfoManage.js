//产品信息维护行单击事件
function stcInfoClickRow(rowIndex, rowData) {
    if(rowData['STK_ISIN']==1){
        $('#joinPool').find('.l-btn-text').html('<span class="ui-tool-icons icon-execute"></span>退出股票池');
    }else{
        $('#joinPool').find('.l-btn-text').html('<span class="ui-tool-icons icon-execute"></span>加入股票池');
    }
    if(rowData['STK_UNDL_CODE']==1){
        $('#joinBlackList').find('.l-btn-text').html('<span class="ui-tool-icons icon-tip"></span>退出黑名单');
    }else{
        $('#joinBlackList').find('.l-btn-text').html('<span class="ui-tool-icons icon-tip"></span>加入黑名单');
    }
}
//产品加入或退出股票池操作
function stockProductSet(event) {
    var selRow = $("#mts_stcInfo_table").datagrid("getSelected");
    if (selRow == null) {
        alert("请选中一条记录！");
        return;
    }
    if(selRow.STK_UNDL_CODE=='1' && selRow.STK_ISIN =='0'){
        alert('黑名单的产品不加入股票池！');
        return;
    }

    var msg='加入股票池';
    if(selRow.STK_ISIN =='1'){
        msg='退出股票池';
    }
    ajaxRequest({
        req:[{
            service:'M0000111',
            STK_ISIN:selRow.STK_ISIN,
            SS_TYPE:selRow.STKBD,
            SS_MARKET:selRow.MARKET_ID,
            STK_CODE:selRow.STK_ID,
            STK_NAME:selRow.STK_NAME,
            SS_CODE:'',
            REMARK:'',
            TIP_MSG:msg
        }],
        func:function(data){
            alert(msg+'成功！');
            $('#mts_stcInfo_table').datagrid('reload');

        }
    });
}
//产品加入或退出黑名单操作
function blackListSet() {
    var selRow = $("#mts_stcInfo_table").datagrid("getSelected");
    if (selRow == null) {
        alert("请选中一条记录！");
        return;
    }
    if(selRow.STK_ISIN=='1' && selRow.STK_UNDL_CODE =='0'){
        alert('把该产品退出股票池再加入到黑名单！');
        return;
    }

    var msg='加入黑名单';
    if(selRow.STK_UNDL_CODE =='1'){
        msg='退出黑名单';
    }
    confirm('提示','你确定要'+msg+'?',function(flag){
        if(flag) {
            ajaxRequest({
                req:[{
                    service:'M0000112',
                    STK_UNDL_CODE:selRow.STK_UNDL_CODE,
                    STK_ID:selRow.STK_ID,
                    TIP_MSG:msg
                }],
                func:function(data){
                    alert(msg+'成功！');
                    $('#mts_stcInfo_table').datagrid('reload');

                }
            });
        }
    });
}