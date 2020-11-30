(function (window, $) {
    var flowlite = {
        init:function($flowlite, flowData, $btnPrev, $btnNext) {
            this.$flowlite = $flowlite;
            $flowlite.flowlite({
                data:flowData,
                onDoneNodeClick:function(e, nodeData){
                    flowlite.$flowlite.flowlite("go2Node", this);
                },
                onIngNodeClick:function(e, nodeData){
                    flowlite.$flowlite.flowlite("go2Node", this);
                },
                onTodoNodeClick:function(e, nodeData){
                    flowlite.$flowlite.flowlite("go2Node", this);
                },
                onBeforeNodeJump:function(nodeData){
                    var jumpFlag = true;
                    var $flowlite = flowlite.$flowlite;
                    var selNode = $flowlite.flowlite("getSelectedNode");
                    var selNodeData = $flowlite.flowlite("getNodeData", selNode);
                    if(nodeData.index - selNodeData.index < 0 && $.isFunction(selNodeData.checkForPrev)) {
                        jumpFlag = selNodeData.checkForPrev.call(selNode, selNodeData);
                    } else if(nodeData.index - selNodeData.index > 0 && $.isFunction(selNodeData.checkForNext)) {
                        jumpFlag = selNodeData.checkForNext.call(selNode, selNodeData);
                    }
                    return jumpFlag;
                },
                onNodeJumpSuccess:function(nodeData) {
                    var nodeDataArr = flowlite.$flowlite.data("flowlite").options.data;
                    for(var i = 0, len = nodeDataArr.length; i < len; i++) {
                        nodeDataArr[i].relateNode.hide();
                    }
                    if(nodeData.index === 0) {
                        setVisible.call($btnPrev, false);
                        $btnNext.find("span.l-btn-text").text("下一步");
                        setVisible.call($btnNext, true);
                    } else if(nodeData.isEnd == true) {
                        $btnNext.find("span.l-btn-text").text("提交");
                    } else {
                        $btnNext.find("span.l-btn-text").text("下一步");
                        setVisible.call($btnPrev, true);
                    }
                    if($.isFunction(nodeData.init)) {
                        nodeData.init(nodeData);
                    }
                    nodeData.relateNode.show();
                    nodeData.relateNode.find("table[datagrid='datagrid']").each(function(){
                        if(!!$(this).data("datagrid")) {
                            $(this).datagrid("resize");
                        }
                    });
                }
            });

            this.ui = {
                btnPrev: $btnPrev.linkbutton(),
                btnNext: $btnNext.linkbutton()
            }
            setVisible.call(this.ui.btnPrev, false);
            setVisible.call(this.ui.btnNext, true);
            this.regEvents();
        },
        restart:function(restartIndex){
            var resIndex = !!restartIndex || restartIndex == 0 ? restartIndex : 0,
                flowOpts = this.$flowlite.flowlite("options");
            var restartNode = flowOpts.ui.flowNodes.children().eq(resIndex);
            this.$flowlite.flowlite("go2Node", restartNode, true);
            setVisible.call(this.ui.btnPrev, false);
            setVisible.call(this.ui.btnNext, true);
            this.ui.btnNext.find("span.l-btn-text").text("下一步");
        },
        clear:function(){
            var flowOpts = this.$flowlite.flowlite("options");
            var nodeDataArr = flowOpts.data;
            var nodeArr = flowOpts.ui.flowNodes.children();
            for(var i = 0, len = nodeDataArr.length; i < len; i++) {
                if($.isFunction(nodeDataArr[i].clear)) {
                    nodeDataArr[i].clear.call(nodeArr.eq(i), nodeDataArr[i]);
                }
            }
        },
        loadData:function(data){
            var flowOpts = this.$flowlite.flowlite("options");
            var nodeDataArr = flowOpts.data;
            var nodeArr = flowOpts.ui.flowNodes.children();
            for(var i = 0, len = nodeDataArr.length; i < len; i++) {
                if($.isFunction(nodeDataArr[i].loadData)) {
                    nodeDataArr[i].loadData.call(nodeArr.eq(i), nodeDataArr[i], data);
                }
            }
        },
        submitData:function() {
            var submitData = {},
                $flowlite = flowlite.$flowlite,
                nodeDataArr = $flowlite.flowlite("options").data;
            for(var i = 0, len = nodeDataArr.length; i < len; i++) {
                if($.isFunction(nodeDataArr[i].submitData)) {
                    $.extend(true, submitData, nodeDataArr[i].submitData(nodeDataArr[i]));
                }
            }
            submitData.service = $flowlite.data("service");
            return submitData;
        },
        regEvents: function () {
            var context = this,
                ui = context.ui,
                $flowlite = context.$flowlite;
            ui.btnPrev.click(function() {
                var selectNode = $flowlite.flowlite("getSelectedNode"),
                    selNodeData = $flowlite.flowlite("getNodeData", selectNode),
                    preNode = $flowlite.flowlite("getPrevNode", selectNode);
                if($.isFunction(selNodeData.checkForPrev)
                    && true != selNodeData.checkForPrev.call(selectNode, selNodeData)) {
                    return;
                }
                setVisible.call(selNodeData.relateNode, false);
                var $relatePrevNode = $flowlite.flowlite("getNodeData", preNode).relateNode;
                setVisible.call($relatePrevNode, true);
                if(!$flowlite.flowlite("getPrevNode", preNode).length) {
                    setVisible.call(ui.btnPrev, false);
                }
                if(selNodeData.isEnd) {
                    ui.btnNext.find("span.l-btn-text").text("下一步");
                }
                $flowlite.flowlite("go2Node", preNode);
            });
            ui.btnNext.click(function() {
                var selectNode = $flowlite.flowlite("getSelectedNode"),
                    selNodeData = $flowlite.flowlite("getNodeData", selectNode);
                if($.isFunction(selNodeData.checkForNext)
                    && true != selNodeData.checkForNext.call(selectNode, selNodeData)) {
                    return;
                }
                if(!$flowlite.flowlite("getPrevNode", selectNode).length) {
                    setVisible.call(ui.btnPrev, true);
                }
                if(!selNodeData.isEnd) {
                    var nextNode = $flowlite.flowlite("getNextNode", selectNode);
                    if($flowlite.flowlite("getNodeData", nextNode).isEnd) {
                        ui.btnNext.find("span.l-btn-text").text("提交");
                    }
                    $flowlite.flowlite("go2Node", nextNode);
                } else {
                    selNodeData.flowliteSubmit.call($flowlite);
                }
            })
        }
    }

    function setVisible(flag) {
        $(this).css("display", flag ? "" : "none"); // 使用display：none不占用位置
    }

    window.flowlite = flowlite;
})(window, jQuery);