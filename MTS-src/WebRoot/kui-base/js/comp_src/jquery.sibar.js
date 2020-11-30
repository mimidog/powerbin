/**
 * sibar - KINGDOM-UI
 * 
 * Copyright (c) 2009-2013 www.szkingdom.com. All rights reserved.
 * 
 * Dependencies:
 * 
 */

(function($) {
	$.fn.sibar = function(options, param) {
		if (typeof options == 'string') {
			return $.fn.sibar.methods[options](this, param);
		}
		options = options || {};
		return this.each(function() {
			if (!$.data(this, 'sibar')) {
				$.data(this, 'sibar', {
					options : $.extend({}, $.extend({}, $.fn.sibar.defaults), $.fn.sibar.parseOptions(this), options)
				});
			}
			init(this);
		});
	};

	$.fn.sibar.parseOptions = function(target) {
		return $.extend({}, $.parser.parseOptions(target));
	};

	$.fn.sibar.methods = {
		options : function(jq, options) {
			return $.data(jq[0], 'sibar').options;
		},
		sideClick : function(jq, options) {
			return jq.each(function() {
				sideClick(this, options);
			});
		},
        sideHide:function(jq){
            return jq.each(function() {
                hideSideNav(this);
            });
        },
        sideShow:function(jq){
            return jq.each(function() {
                showSideNav(this);
            });
        },
		resize : function(jq) {
			return jq.each(function() {
				resize(this);
			});
		},
		addNode : function(jq, param) {
			return addNode(jq[0], param);
		},
		delNode : function(jq, param) {
			return delNode(jq[0], param);
		},
		validate : function(jq, param) {
			return validate(jq[0], param);
		}
	};

	$.fn.sibar.defaults = {
		sideAlign : 'right',
		sideTop : 0,
		sideLeft : 0,
		sideWidth : 180,
		sideInterval : 10,
		rightInterval : 10,
		scrollSpeed : 360,
		slideSpeed : 180,
		title : '信息填写导航',
		fit : true,

		tabs : [],

		width : 0,
		height : 0,
		baseTop : 0,
		baseLeft : 0,
		sideHideWidth : 50,
		onSideHide : function() {
		},
		onSideShow : function() {
		},
		onResize : function() {
		}
	};

	var idPrefix = 'sibar-content-';
	var tabParams = [ 'title', {
		child : 'boolean',
		collapse : 'boolean'
	} ];

	var editor = {
		// 增加一级结点
		level1 : function(d, param) {

		},
		// 增加二级结点
		level2 : function(opts, param) {
			param.id = idPrefix + (opts.index++);
			var $parLi = getSideLi(opts.$side, param.parTitle, param.parNode);
			editor.addNavigation($parLi, opts, param.level, param.id, param.title);
			var parId = $parLi.attr('href'); // 找到一级菜单指向的id
			var $tip = $('<div class="detail-tip"><span class="detail-shrink"></span><span class="detail-icon">&nbsp;&nbsp;</span><span>' + param.title + '</span></div>').appendTo($(parId)).click(function() {
				$(this).next().toggle(opts.slideSpeed).end().find('span:first').toggleClass('detail-shrinked');
			}).after($('<div id="' + param.id + '"></div>').append(param.content));
			if (!param.collapse) {
				$tip.click();
			}
			$.parser.director($tip.next().on('click.sibar,focus.sibar', opts.divEvent));
			opts.tabs[opts.index - 1] = param;
			return $tip.next();
		},
		// 增加导航
		// d : {level:1,index:1,title:'title'}
		addNavigation : function($li, opts, level, id, title) {
			var $nextLi = $li.nextUntil('li.sibar-side-level1');
			if ($nextLi.length > 0) {
				$nextLi = $nextLi.last();
			} else {
				$nextLi = $li;
			}
			return $('<li class="sibar-side-level' + level + '" href="#' + id + '"><span class="sibar-side-left"></span><div class="sibar-side-content"><span class="sibar-side-right"></span>' + title + '</div></li>').insertAfter($nextLi).on('click.sibar', opts.liEvent);
		}
	};

	function addNode(target, param) {
		var state = $.data(target, 'sibar');
		if (state && state.options) {
			var p = $.extend({
				level : 1,
				title : '',
				parNode : 0,
				parTitle : undefined,
				index : 0,
				content : '',
				collapse : true
			}, param);
			if (editor['level' + p.level]) {
				return editor['level' + p.level](state.options, p);
			}
		}
	}

	function getSideLi($side, title, index) {
		return title ? $side.find('li.sibar-side-level1:contains(' + title + ')') : $side.find('li.sibar-side-level1:eq(' + index + ')');
	}

	function delNode(target, param) {
		var state = $.data(target, 'sibar');
		if (state && state.options) {
			var p = $.extend({
				level : 1,
				index : 0,
				parTitle : undefined, // 父结点的title，如果传了此值，则会按照这个title去寻找li标签，否则按照parNode去寻找li标签
				parNode : 0,
				title : undefined
			}, param);
			var opts = state.options;
			if (p.level == 1) {
				var $li = getSideLi(opts.$side, param.title, param.index);
				if ($li.length == 1) {
					var href = $li.remove().attr('href');
					var $href = $(href).closest('div.panel');
					$href = $href.length > 0 ? $href : $(href);
					$href.remove();
				}
			} else if (p.level == 2) {
				var $parLi = getSideLi(opts.$side, param.parTitle, param.parNode);
				if ($parLi.length == 1) {
					var href = $parLi.nextAll('li.sibar-side-level2:eq(' + param.index + ')').remove().attr('href');
					var $href = $(href);
					var $prev = $href.prev();
					$href.remove();
					if ($prev.is('div.detail-tip')) {
						$prev.remove();
					}
				}
			}
		}
	}

	function init(target) {
		var opts = $.data(target, 'sibar').options;
		var $this = $(target);

		opts.sideWidthBack = opts.sideWidth;

		var tabs = opts.tabs;
		var index = 0;
		var d;
		$this.find('>div[title]').each(function(k) {
			d = $.parser.parseOptions(this, tabParams);
			d.id = idPrefix + (index++);
			d.level = 1;
			this.id = d.id;
			tabs.push(d);
			if (d.minHeight) {
				var cloneD = d;
				var $this = $(this).css({
					position : 'relative',
					overflow : 'hidden',
					height : cloneD.minHeight + 'px'
				});
				$('<div class="sibar-toggle"><span class="detail-icon"></span>展开</div>').prependTo($this).click(function() {
					var hasClass = $(this).hasClass('hover');
					var height = hasClass ? (cloneD.minHeight - 32) : (cloneD.maxHeight || 'auto');
					var text = hasClass ? '展开' : '收起';
					var callBack = hasClass ? cloneD.onShrink : cloneD.onExpansion;
					$(this).toggleClass('hover').html('<span class="detail-icon"></span>' + text).closest('div.panel-body').height(height);
					if (callBack && $.isFunction(callBack)) {
						callBack($('#' + cloneD.id), cloneD);
					}
				});
			}
			if (d.child) {
				$(this).find('>*[title]').each(function(i) {
					d = $.parser.parseOptions(this, tabParams);
					d.id = idPrefix + (index++);
					d.level = 2;
					this.id = d.id;
					tabs.push(d);
					var $div = $('<div class="detail-tip"><span class="detail-shrink"></span><span class="detail-icon">&nbsp;&nbsp;</span><span>' + d.title + '</span></div>').prependTo(this).click(function() {
						$(this).next().toggle(opts.slideSpeed).end().find('span:first').toggleClass('detail-shrinked');
					});
					if (d.collapse) {
						$div.click();
					}
				});
			}
		});
		opts.index = index;

		// -----------------生成$side---------------------------------------------
		var str = [ '<div class="sibar-side-title">' + opts.title + '</div><div class="sibar-side-hide"></div><ul><li class="sibar-side-start"><span class="sibar-side-left"></span></li>' ];
		for ( var i = 0, len = tabs.length; i < len; i++) {
			str.push('<li class="sibar-side-level' + tabs[i].level + '" href=#' + (idPrefix + i) + '><span class="sibar-side-left"></span><div class="sibar-side-content"><span class="sibar-side-right"></span>' + tabs[i].title + '</div></li>');
		}
		str.push('<li class="sibar-side-end"><span class="sibar-side-left"></span></li></ul>');
		opts.$side = $('<div class="sibar-side" style="position:fixed;"></div>').appendTo('body').html(str.join(''));
		// -----------------------------------------------------------------------
		bindEvent(target);
		resize(target, true);
	}

	function resize(target, init) {
		var $this = $(target);
		var opts = $.data(target, 'sibar').options;
		var position = $this.position();
		opts.baseTop = position.top;
		opts.baseLeft = position.left;
		var $parent = $(target).parent();
		if (init) {
			opts.width = $parent.width();
			opts.height = $parent.height();
		} else {
			opts.width = $parent.width() + 18;
			opts.height = $parent.height();
		}
		var contentWidth;
		if (opts.sideAlign == 'left') {
			opts.$side.css({
				top : opts.baseTop + opts.sideTop,
				width : opts.sideWidth,
				left : opts.baseLeft + opts.sideLeft
			});
			var paddingLeft = opts.sideLeft + opts.sideWidth + opts.sideInterval;
			contentWidh = opts.width - paddingLeft - opts.rightInterval;
			$this.css('padding-left', paddingLeft).width(opts.width - paddingLeft);
		} else if (opts.sideAlign == 'right') {
			var sideTotal = opts.sideLeft + opts.sideWidth + opts.sideInterval;
			contentWidth = opts.width - sideTotal - opts.rightInterval;
			$this.css('padding-left', opts.rightInterval).width(opts.width - opts.rightInterval);
			opts.$side.css({
				top : opts.baseTop + opts.sideTop,
				width : opts.sideWidth,
				left : opts.baseLeft + opts.width - sideTotal + opts.sideInterval
			});
		}
		$this.width(contentWidth + opts.sideInterval + opts.rightInterval - 10).find('>*').width(contentWidth).find('>div.panel-header').width(contentWidth - 10).next().width(contentWidth - 8);

		opts.onResize.call(target);
	}

	function validate(target) {
		var opts = $.data(target, 'sibar').options;
		var $side = opts.$side;
		var href;
		var right = true;
		$side.find('li[href]').each(function() {
			right = _validateForm($($(this).attr('href')), $(this)) && right;
		});
		if (!right) {
			$side.find('li.wrong:first').trigger('click.sibar');
		}
		return right;
	}

	/**
	 * 私有函数，对$div中的可见的form进行验证，并增加$li的样式
	 */
	function _validateForm($div, $li) {
		var right = true;
		if ($div.find('form:visible').each(function() { // 对于可见的form才进行验证，不可见的form不需要验证。
			return right = $.data(this, 'form') && $(this).form('validate');
		}).length > 0) {
			if (right) {
				$li.removeClass('wrong').addClass('right');
			} else {
				$li.removeClass('right').addClass('wrong');
			}
		} else {
			$li.removeClass('right').removeClass('wrong');
		}
		return right;
	}

	function bindEvent(target) {
		var opts = $.data(target, 'sibar').options;
		var tabs = opts.tabs;
		var $href;
		var top;
		var $body = $('html,body');
		var $li = opts.$side.find('li[href]').off('click.sibar').on('click.sibar', liEvent);
		setTimeout(function() {
			$li.filter(':first').trigger('click.sibar');
		}, 0);

		$(target).on('click.sibar', '*[id^=' + idPrefix + ']', divEvent);

		$('input.validatebox-text').live('focus.sibar', function() {
			var id = $(this).closest('*[id^=' + idPrefix + ']').attr('id');
			liTrigger(id, true);
		});
		// 判断窗口宽度，默认隐藏导航栏--zhangc
//		if (getWinWidth() <= 800) {
//            $(this).toggleClass('side-hide');
//			opts.sideWidth = opts.sideHideWidth;
//			resize(target);
//			opts.onSideHide.call(target);
//		}
		opts.$side.find('>div.sibar-side-hide').click(function() {
			$(this).toggleClass('side-hide');
			if ($(this).hasClass('side-hide')) {
				hideSideNav(target);
			} else {
				showSideNav(target);
			}
		});

		function liEvent(e, noScroll) {

			var oldTab = getTab($li.removeClass('hover'));
			var newTab = getTab($(this));
			var href = $(this).attr('href');
			if ($href && $href.removeClass('sibar-content-hover').length == 1) {
				sibarCallBack(oldTab, 'onBlur', newTab); // sibarBlur回调
				if ($li[0] != this) {
					_validateForm($href, $li); // 对form进行验证
				}
			}
			$li = $(this).addClass('hover');
			$href = $(href).closest('div.panel').addClass('sibar-content-hover');
			if ($href.length < 1) {
				$href = $(href);
			}
			if (!noScroll) {
				top = $href.position().top;
				$body.stop().animate({
					scrollTop : top
				}, opts.scrollSpeed);
			}
			sibarCallBack(newTab, 'onFocus', oldTab); // sibarFocus回调
            if (getWinWidth() <= 1024) {
                $(".sibar-side-hide").addClass('side-hide');
                opts.sideWidth = opts.sideHideWidth;
                resize(target);
                opts.onSideHide.call(target);
            }
		}

		function getTab($li) {
			return tabs[$li.attr('href').match(/\d*$/)[0]];
		}

		function sibarCallBack(tab, funcName, param1, param2) {
			if ($.isFunction(tab[funcName])) {
				tab[funcName].call(target, tab, param1, param2);
			}
		}

		function divEvent(e) {
			liTrigger($(this).attr('id'), true);
			e.stopPropagation();
		}

		function liTrigger(id, noScroll) {
			opts.$side.find('li[href=#' + id + ']').trigger('click.sibar', noScroll);
		}

		opts.liEvent = liEvent;
		opts.divEvent = divEvent;

		if (opts.fit) {
			$(window).bind('resize.sibar', function() {
				resize(target);
			});
		}

	}

	function hideSideNav(target) {
		var opts = $.data(target, 'sibar').options;
		opts.sideWidth = opts.sideHideWidth;
		resize(target);
		opts.onSideHide.call(target);
	}

	function showSideNav(target) {
		var opts = $.data(target, 'sibar').options;
		opts.sideWidth = opts.sideWidthBack;
		resize(target);
		opts.onSideShow.call(target);
	}

	function sideClick(target, index, noScroll) {
		var opts = $.data(target, 'sibar').options;
		var type = typeof index;
		if (type == 'number') {
			getSideLi(opts.$side, undefined, index).trigger('click.sibar', noScroll);
		} else if (type == 'string') {
			getSideLi(opts.$side, index).trigger('click.sibar', noScroll);
		}
	}
	function getWinWidth() {
		var winWidth = 0;
		if (window.innerWidth)
			winWidth = window.innerWidth;
		else if ((document.body) && (document.body.clientWidth))
			winWidth = document.body.clientWidth;
		return winWidth;
	}
})(jQuery);