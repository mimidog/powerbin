/**
 * Frame data cache - kui base js library For caching big data which is used in
 * page.
 */
;
(function($, window) {

	var viewCache = {
	};

	var load = {
        INT_ORG:'{req:{bex_codes:"orgMenuQuery",ORG_STA:"1"},valueField:"{ORG_CODE}",textField:"{ORG_CODE}-{ORG_NAME}"}',
        UAS_EXT_ORG:'{req:{service:"U0320180"},valueField:"{EXT_ORG}",textField:"{EXT_ORG}-{ORG_NAME}"}'
    };

	function loadData(key) {
		var result = cache(key);
		if (result && result.length > 0) {
			return result;
		}
		var opts = load[key];
		if (!opts) {
			consoleError('DataCache没有对' + key + '的配置项。');
			return [];
		}
		opts = eval('(' + opts + ')');
		if (!opts.ref && !opts.req) {
			consoleError('DataCache中' + key + '的配置项中必须有ref或者req中的一项。');
			return [];
		}
		result = [];
		if (opts.ref) {
			$.extend(true, result, loadData(opts.ref));
			setData(result, opts.valueField, opts.textField);
			cache(key, result);
			return result;
		} else if (opts.req) {
			ajaxRequest({
				async : false,
				req : [opts.req],
				noProcess : true,
				func : function(data) {
					if (data) {
						result = data.ANSWERS[0].ANS_COMM_DATA[0];
						setData(result, opts.valueField, opts.textField);
						cache(key, result);
					}
				}
			});
		}
		return result;
	}

	function setData(data, valueField, textField) {
		var reg = /{(\w*)}/g;
		if (valueField) {
			for ( var i = 0, len = data.length; i < len; i++) {
				data[i]['dict_val'] = valueField.replace(reg, function(d) {
					return data[i][d.substring(1, d.length - 1)];
				});
			}
		}
		if (textField) {
			for ( var i = 0, len = data.length; i < len; i++) {
				data[i]['dict_des'] = textField.replace(reg, function(d) {
					return data[i][d.substring(1, d.length - 1)];
				});
			}
		}
	}

	function cache(key, data) {
		if (top && top.window) {
			if (!top.window._kuicache)
				top.window._kuicache = {};
			if (!data) { // 如果没有传data
				return top.window._kuicache[key];
			}
			top.window._kuicache[key] = data;
		} else {
			if (!window._kuicache)
				window._kuicache = {};
			if (!data) { // 如果没有传data
				return window._kuicache[key];
			}
			window._kuicache[key] = data;
		}
	}

	function clear(key) {
		if (top && top.window) {
			if (!top.window._kuicache || !key) {
				top.window._kuicache = {};
			} else {
				top.window._kuicache[key] = undefined;
			}
		} else {
			if (!window._kuicache || !key) {
				window._kuicache = {};
			} else {
				window._kuicache[key] = undefined;
			}
		}
	}

	function consoleError(msg) {
		if (typeof console != 'undefined' && console.error) {
			console.error(msg);
		}
	}

	window.DataCache = {
		getData : loadData,
		clear : clear,
		viewCache : function(key) {
			return eval('(' + viewCache[key] + ')');
		}
	};

})(jQuery, window);