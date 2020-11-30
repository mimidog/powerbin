(function($) {
	$.fn.flows = function(options, param) {
		var opt = $.extend($.fn.defaults, options);
		
		return this.each(function() {
			var target = $(this);
			init(target,opt);
		});
	};
	
	$.fn.defaults = {
			width:'auto',
			height:'auto',
			stepNum:0,
			curStep:1,
			flowUrl:[],
			imgPath:'',
			loadType:'iframe',
			currStepFun:function(options){}
		};
	
	
	function init(target,opt){
		target.css("width",opt.width+"px");
		createFlows(target,opt);
		content(target,opt);
		stepTo(target,opt);
		bindEvents(target,opt);
	}
	
	function bindEvents(target,opt){
		
		$("#flow-prev").live("click",function(){
			opt.currStepFun(opt);
			var currstep = opt.curStep ;
			var curr = currstep-1 ;
			if(curr > 0){
				$("#s"+curr).removeClass("flow-runing-text").removeClass("flow-finished-text").addClass("flow-prepera-text");
				$("#flows_2_"+curr).removeClass("flow-runing-bgImg").removeClass("flow-finished-bgImg").addClass("flow-prepera-bgImg");
				$("#flows_4_"+(curr-1)).removeClass("flow-runing-icon-1").addClass("flow-prepera-icon-1");
				$("#b_1_"+curr).removeClass("flow-runing-icon").removeClass("flow-finished-icon").addClass("flow-prepera-icon");
				opt.curStep -= 1;
				curr -=1;
				$("#s"+curr).removeClass("flow-prepera-text").removeClass("flow-finished-text").addClass("flow-runing-text");
				$("#flows_2_"+curr).removeClass("flow-prepera-bgImg").removeClass("flow-finished-bgImg").addClass("flow-runing-bgImg");
				$("#b_1_"+curr).removeClass("flow-prepera-icon").removeClass("flow-finished-icon").addClass("flow-runing-icon");
				$("#myframe").attr("src",opt.flowUrl[curr].url);
				$("#flow-next").html("下一步");
			}
		});
		
		
		$("#flow-next").live("click",function(){
			opt.currStepFun(opt);
			var currstep = opt.curStep ;
			var curr = currstep-1 ;
			if(curr < opt.stepNum){
				$("#s"+curr).removeClass("flow-prepera-text").removeClass("flow-runing-text").addClass("flow-finished-text");
				$("#flows_2_"+curr).removeClass("flow-prepera-bgImg").removeClass("flow-runing-bgImg").addClass("flow-finished-bgImg");
				$("#b_1_"+curr).removeClass("flow-prepera-icon").removeClass("flow-runing-icon").addClass("flow-finished-icon");
				$("#flows_4_"+curr).removeClass("flow-prepera-icon-1").addClass("flow-runing-icon-1");
				opt.curStep += 1;
				curr +=1;
				$("#s"+curr).removeClass("flow-prepera-text").removeClass("flow-finished-text").addClass("flow-runing-text");
				$("#flows_2_"+curr).removeClass("flow-prepera-bgImg").removeClass("flow-finished-bgImg").addClass("flow-runing-bgImg");
				$("#b_1_"+curr).removeClass("flow-prepera-icon").removeClass("flow-finished-icon").addClass("flow-runing-icon");
				var temStep = Number(currstep)+Number(1);
				if(Number(temStep) <= Number(opt.stepNum)){
					$("#myframe").attr("src",opt.flowUrl[curr].url);
				}
				
				if( temStep== opt.stepNum){
					$("#flow-next").html("完成");
				}
				
			}
		});
		var $obj = $(target).find(".flow_2,.flow_5");
		$obj.live("click",function(){
			var id = $(this).attr('id');
			var temp = id.split("_");
			var num = temp[temp.length-1];
			var curr = opt.curStep;
			$("#s"+num).removeClass("flow-prepera-text").removeClass("flow-finished-text").addClass("flow-runing-text");
			$("#flows_2_"+num).removeClass("flow-prepera-bgImg").removeClass("flow-finished-bgImg").addClass("flow-runing-bgImg");
			$("#b_1_"+num).removeClass("flow-finished-icon").removeClass("flow-prepera-icon").addClass("flow-runing-icon");
			$("#flows_4_"+num).removeClass("flow-runing-icon-1").addClass("flow-prepera-icon-1");
			$("#myframe").attr("src",opt.flowUrl[num].url);
			var temStep = Number(num)+Number(1);
			if( temStep== opt.stepNum){
				$("#flow-next").html("完成");
			}
			if(num>=curr){
				for(var i=0 ;i<num;i++){
					$("#s"+i).removeClass("flow-prepera-text").removeClass("flow-runing-text").addClass("flow-finished-text");
					$("#flows_2_"+i).removeClass("flow-prepera-bgImg").removeClass("flow-runing-bgImg").addClass("flow-finished-bgImg");
					$("#b_1_"+i).removeClass("flow-runing-icon").removeClass("flow-prepera-icon").addClass("flow-finished-icon");
					$("#flows_4_"+i).removeClass("flow-prepera-icon-1").addClass("flow-runing-icon-1");
				}
				opt.curStep = Number(num)+Number(1) ;
			}else{
				$("#flow-next").html("下一步");
				for(var i=curr ;i>num;i--){
					$("#s"+i).removeClass("flow-finished-text").removeClass("flow-runing-text").addClass("flow-prepera-text");
					$("#flows_2_"+i).removeClass("flow-finished-bgImg").removeClass("flow-runing-bgImg").addClass("flow-prepera-bgImg");
					$("#b_1_"+i).removeClass("flow-runing-icon").removeClass("flow-finished-icon").addClass("flow-prepera-icon");
					$("#flows_4_"+i).removeClass("flow-runing-icon-1").addClass("flow-prepera-icon-1");
				}
				opt.curStep = Number(num)+Number(1) ;
			}
			opt.currStepFun(opt);
		});
		
    }
	function stepTo(target,opt){
		var $tools = $("<div ><a href='#' id='flow-next' class='flow-step'>下一步</a><a href='#' id='flow-prev' class='flow-step'>上一步</a></div>");
    	$(target).append($tools);
	}
	
	function content(target,opt){
		var render = opt.loadType;
		if(render == "iframe"){
			var $page = $("<div id=\"flow_page_1\"></div>").appendTo(target);
			var $iframe = $("<iframe id='myframe' scrolling=\"auto\" frameborder=\"0\" allowtransparency=\"true\" style=\"width:100%;height:"+opt.height+"px"+";overflow:auto;margin-top:5px;\"></iframe>");
			$iframe.appendTo($page);
			$iframe.attr("src",opt.flowUrl[0].url);
		}
	}
	
	
	
	function createFlows(target,opt){
		var $flows_1 = $("<div class='flow_1'></div>");
		$(target).append($flows_1);
		
		var num = opt.stepNum;
		var data = opt.flowUrl; 
		var left = 6 ;
		var marleft = 5 ;
		if(num > data.length){
			num = data.length ;
		}
		$.each(data,function(i,s){
			var node_1 = "$flows_2_" + i ;
			var node_2 = "$flows_3_" + i ;
			var node_3 = "$flows_4_" + i ;
			var node_4 = "$flows_5_" + i ;
			node_1 = $("<div id='flows_2_"+i+"' class='flow_2'></div>");
			node_2 = $("<div id='flows_3_"+i+"' class='flow_3'></div>");
			node_3 = $("<div id='flows_4_"+i+"' class='flow_4'></div>");
			node_4 = $("<div id='flows_5_"+i+"' class='flow_5'><span id='b_1_"+i+"' class='flow_6'></span><span id='s"+i+"'>"+s.title+"</span></div>");
			$flows_1.append(node_1);
			node_1.append(node_2);
			$flows_1.after(node_4);
			
			if(i == 0){
				$("#s"+i).addClass("flow-runing-text");
				node_1.addClass("flow-runing-bgImg");
				$(".flow_6").addClass("flow-runing-icon");
			}else{
				$("#s"+i).addClass("flow-prepera-text");
				node_1.addClass("flow-prepera-bgImg");
			}
			node_2.css({"background":"url("+opt.imgPath+opt.flowUrl[i].img+")","margin-left":left+"px"});
			if(i != num-1){
				$flows_1.append(node_3);
				node_3.addClass("flow-prepera-icon-1");
			}
			node_4.css({"margin-left": marleft+"px"});
			
			//left += 0;
			marleft += 136 ;
		});
	}
	
})(jQuery);