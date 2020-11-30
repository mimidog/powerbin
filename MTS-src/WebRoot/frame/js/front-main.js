/**
 * 门户首页
 * @author liuqing
 */
;(function ($, window, undefined) {
    var portal,
        defaultSkin = "trans",
        portalConst = {
            sysParamObjKey: "sysParamObj",

            lockUser: "portalLockUser",
            subscribeInterval: "subscribeInterval",
            prevSelectedItem: "prevSelectedItem",

            subscribeDataKey: "subscribeData",
            todoCountKey: "todoCount",
            pressCountKey: "pressCount",
            toolboxCountDataKey: "toolboxCountData"
        },
        ui = {};

    kPortal.fn.extend({
        setSysDate: function () {
            //系统登录时,查询系统时间
            var sysControlInfo = commonRequest({
                service: 'M0001001'
            });
            var sysDate = sysControlInfo[0].SYSTEM_DATE;
            window.top.sysDate = sysDate;
            //查询日切表的时间显示在主页面
            var sysCalendar = '<a onclick="kPortal.fn.showCalender(this,' + sysDate + ')" style="color: orange;cursor: pointer">系统日期：</a>';
            //系统日期格式化
            sysDate = formatDate(sysDate);
            $('#sys_date').find('span').html(sysCalendar + sysDate);

            function formatDate(sysDate) {
                return sysDate.substr(0, 4) + "年" + sysDate.substr(4, 2) + "月" + sysDate.substr(6, 2) + "日"
            };

            setInterval(function () {
                $('#sys_time').html(kui.timeParserData(kui.getCurrTime()));
            }, 1000)

        },
        showCalender: function (target, sysDate) {
            var calenderDiv = $('#sys_calender');
            var iframWindow = calenderDiv.find('iframe')[0].contentWindow;
            var pos = $(target).position();
            //注册鼠标点击事件,当日历显示时
            var menuFrameWindow = $('.main-panel').find('iframe').map(function () {
                return this.contentWindow;
            });
            //给主window和各种子菜单iframe注册鼠标点击事件
            $($.merge([window], menuFrameWindow)).unbind('mousedown');
            iframWindow.myCalendar.tyear = parseInt(sysDate.toString().substring(0, 4));
            iframWindow.myCalendar.tmonth = parseInt(sysDate.toString().substring(4, 6));
            iframWindow.myCalendar.tday = parseInt(sysDate.toString().substring(6, 8));
            //查询日历表中最近一年所有非交易日
            window.top.newestYearHolidays = commonRequest({
                service: 'M0001000',
                TRD_DATE_FLAG: '0',
                NEWEST_YEAR_DATE_LATER: '1'  //查询最近一年日历日期信息
            });
            var newestYear = 2049;
            if (window.top.newestYearHolidays && window.top.newestYearHolidays.length > 0) {
                newestYear = window.top.newestYearHolidays[0].PHYSICAL_DATE.toString().substring(0, 4);
            }
            //设置值,后续点击日历展示的时候会显示这些值
            iframWindow.myCalendar.languageData.vocation.newest_year_data = formatHolidays(window.top.newestYearHolidays);
            iframWindow.myCalendar.timeRange = {
                startYear: parseInt('2018'),
                endYear: parseInt(newestYear)
            };
            //当系统日期年份与日历表中最近一年数据年份不一致时，重新加载当前年份假期信息
            if (iframWindow.myCalendar.tyear != newestYear) {
                var nowYearHolidays = qryYearHolidays(iframWindow.myCalendar.tyear);
                iframWindow.myCalendar.languageData.vocation.newest_year_data = formatHolidays(nowYearHolidays);
            }
            iframWindow.myCalendar.defaultYear = parseInt(iframWindow.myCalendar.tyear);

            function formatHolidays(datas) {
                var holidays = [];
                datas.forEach(function (v, i) {
                    var month = v.PHYSICAL_DATE.toString().substring(4, 6);
                    var day = v.PHYSICAL_DATE.toString().substring(6, 8);
                    holidays.push(parseInt(month) + '-' + parseInt(day));
                });
                return holidays;
            }

            iframWindow.myCalendar.update();
            //给主window和各种子菜单iframe注册鼠标点击事件
            $($.merge([window], menuFrameWindow)).bind('mousedown', function (e) {
                if (e.target != calenderDiv && !$.contains(calenderDiv, e.target)) {
                    calenderDiv.hide();
                }
            });
            calenderDiv.css({
                position: 'absolute',
                top: pos.top + 32,
                left: pos.left - 500,
                width: 1000,
                height: 520,
                zIndex: 100
            }).show();
        },
        init: function () {
            $.extend(ui, {
                topBar: $("#top_bar"),
                statusBar: $("#status_bar"),
                settingWin: $("#setting_window_div"),
                lockWin: $("#lock_window_div")
            });

            this.regPageEvents([
                {
                    selector: window, types: ["resize"], handler: function () {
                        portal.frame.resize();
                    }
                },
                {
                    selector: document, types: ["keydown"], handler: function (e) {
                        var keyCode = e.keyCode,
                            searchInput = $("#search_input"),
                            tagName = e.target.tagName.toLowerCase();
                        if (9 === keyCode && searchInput.is(":visible")) {	//tab
                            e.preventDefault();
                            return false;
                        }

                        if (searchInput.is(":visible") && "body" === tagName && !$(".window-mask:visible").length && validKeyCode(keyCode)) {
                            searchInput.focus();
                        }

                        function validKeyCode(keyCode) {
                            var num = generateArr(48, 57),	//0-9
                                alphabet = generateArr(65, 90);	//a-z

                            return -1 != $.inArray(keyCode, num.concat(alphabet));

                            function generateArr(beg, end, edges) {
                                var arr = [], min = beg, max = end;
                                while (min < max) {
                                    arr.push(++min);
                                }

                                if ("undefined" === $.type(edges) || !!edges) {
                                    arr.unshift(beg);
                                    arr.push(end);
                                }
                                return arr;
                            }
                        }
                    }
                },
                {selector: "#head_img", types: ["click"], handler: this.frame.userIconClick},
                {selector: "#login", types: ["click"], handler: this.login.loginClick},
                {selector: "#valid_img", types: ["click"], handler: this.login.validImgClick},
                {selector: "#btn_login", types: ["click"], handler: this.login.loginBtnClick},
                {selector: "#user_code,#password,#valid_code", types: ["keyup"], handler: this.login.loginKeyup},
                {selector: "#btn_unlock", types: ["click"], handler: this.login.unlockBtnClick},
                {selector: "#lock_password", types: ["keyup"], handler: this.login.unlockKeyup},
                {selector: "#icon_setting", types: ["click"], handler: this.frame.settingClick},
                {selector: "#icon_help", types: ["click"], handler: this.frame.helpClick},
                {selector: "#icon_lock", types: ["click"], handler: this.frame.lockClick}
            ]);

            this.login.getSession(function (data) {
                if (data && data['IRETCODE'] == "0") {
                    portal.login.getServerKey(function () {
                        $("#front_background_image").fadeIn(function () {
                            portal.data("loginData", {
                                USER_CODE: data["USER_CODE"],
                                TRD_PWD: data["USER_PASS"],
                                validateCode: ""
                            });
                            portal.frame.initUserPage(data);

                        });
                    });
                    kPortal.fn.setSysDate();
                } else {
                    ui.statusBar.hide();
                    $("#front_background_image").fadeIn(function () {
                        $("#login").click();
                    });
                    kuiloader.loadCss("../../frame/css/ui-front-trans.css").id = "link_trans";
                    window.doNotShowConfirmOnBeforeUnload = true;
                }


            });


            if (window.isKjdp) {
                ui.statusBar.remove();
            }

            portal.frame.resize();
        },

        requireData: function (confArr, callback, errorCallback) {
            confArr = $.isArray(confArr) ? confArr : [confArr];
            var retData = [],
                req = [];
            for (var i = 0, l = confArr.length; i < l; i++) {
                var sconf = confArr[i],
                    conf = sconf.conf;
                if (!conf) {
                    retData[i] = [];
                    continue;
                }

                if (conf.data) {
                    retData[i] = conf.data;
                } else {
                    retData[i] = "Orz";	//请求类型的参数先放一个占位符
                    req.push($.extend({service: conf.service}, conf.defaultParam, sconf.param));
                }
            }

            if (!req.length) {
                callback.call(this, retData);
                return;
            }

            portal.requestService(req, function () {
                //处理结果集，可能有多个
                for (var i = 0, l = this.length; i < l; i++) {
                    var idx = $.inArray("Orz", retData);
                    retData[idx] = (confArr[idx].conf.filter || $.noop)(this[i]) || this[i];
                }

                callback.call(this, retData);
            }, errorCallback);
        },

        frame: {},

        login: {},

        plat: {},

        taskBar: {}
    });

    $.extend(kPortal.fn.frame, {

        initUserPage: function (data) {
            ui.statusBar.show();
            $("#link_trans").remove();
            //公告
            /* $.messager.lays(300, 200);
        $.messager.show('提示消息',
            '<span style="font-size: 15px"><br>欢迎登录统一适当性系统:</span><a style="display: block" href="http://www.sse.com.cn/aboutus/mediacenter/hotandd/c/c_20170908_4387298.shtml" target="_blank">关于发布《上海证券交易所上市公司可转换公司债券发行实施细则》的通知</a><br>',
            0);*/
            var userData = window.g_user = $.extend({
                'userId': data['USER_CODE'],
                'userName': data['USER_NAME'],
                'userPass': data['USER_PASS'],
                'userRole': data['USER_ROLE'],
                'userTicket': data['USER_TICKET_INFO'],
                'userIcon': data['USER_ICON'],
                'loginIp': data['LOG_IP'],
                'orgCode': data['ORG_CODE'],
                'INT_ORG': data['ORG_CODE'],
                'loginDate': data['LOG_DATE'],
                'openDate': data['OPEN_DATE'],
                'userIcon': data['USER_ICON'],
                'offTel': data['OFF_TEL'],
                'mobile': data['MOBILE'],
                'email': data['EMAIL'],
                'asign': data['SIGNATRUE']
            }, data);

            $("#user_info_form").form();
            $.cookie("account", userData.USER_CODE);
            $("#icon_setting,#icon_help,#icon_lock").css("visibility", "visible");

            ui.lockWin.window({
                closed: true,
                width: "390",
                height: "240",
                onBeforeOpen: function () {
                    $(this).parent().addClass("login-window");
                    $("#lock_user_code").val(g_user["userId"]).attr({title: g_user["userId"], disabled: true});
                    if (!window.isKjdp) {
                        ui.lockWin.find("#login_panel").addClass("no-validcode").removeClass("no-padding-top");
                        ui.lockWin.find(".head-img-div").remove();
                    } else {
                        $("#lock_head_img").attr("src", $("#head_img").attr("src"));
                    }

                    $("#switch_user").unbind("click").click(function () {
                        $("#login").triggerHandler("click", [true]);
                    });
                }
            }).show();

            if (!window.isKjdp) {
                ui.topBar.find(".head-img-wrap").hide();
                if (!window.sysConf.showPlat) {
                    ui.topBar.find(".switch-box-wrap").css("visibility", "hidden");
                    ui.settingWin.find(".setting-wraps>.setting-wrap:first").hide();
                }
            }

            this.setUserInfo(userData);

            if (window.isKjdp) {
                var flowCfg = portal.getFlowMenuConfig();

                portal.requireData([
                    {conf: sysConf["flowCompConf"], param: {COMP_ID: flowCfg.compId.join(",")}},
                    {conf: sysConf["layoutConf"]}
                ], function (data) {
                    portal.data("flowMenuCfg", $.extend(flowCfg, {comp: data[0][0]}));
                    portal.data("layout_data", portal.formatRecord("LAYOUT_ID", "_board", data[1]));
                });
            }

            portal.requireData([
                {conf: sysConf["platConf"]},
                {conf: sysConf["userConf"], param: {USER_CODE: userData.USER_CODE}}
            ], function (data) {
                var platData,

                    defaultUserPlatConf = [],
                    defaultUserConf = {
                        defaultSkin: defaultSkin,
                        platImages: {}
                    },
                    userCfgData = data[1][0][0];

                portal.data("priPlatData", data[0][0]);
                platData = portal.formatRecord("ID", null, data[0]);
                delete platData["0"];
                portal.data("plat_data", platData);

                if (!userCfgData) {
                    userCfgData = {};
                }
                userCfgData["USER_CODE"] = userCfgData["USER_CODE"] || window.g_user.userId;
                userCfgData["CONFIGURE"] = userCfgData["CONFIGURE"] || JSON.stringify(defaultUserConf);
                userCfgData["PLAT_CONFIG"] = userCfgData["PLAT_CONFIG"] || JSON.stringify(defaultUserPlatConf);

                portal.data("commonCfgObj", window.isKjdp ?
                    JSON.parse(decodeURI(userCfgData["CONFIGURE"])) :
                    (JSON.parse(decodeURI($.cookie("commonCfgObj"))) || userCfgData["CONFIGURE"]));

                portal.data("platCfgObj", JSON.parse(decodeURI(userCfgData["PLAT_CONFIG"] || userCfgData["PLAT_CONFIG"])));

                kuiloader.loadCss("../../frame/css/ui-front-" + portal.data("commonCfgObj").defaultSkin + ".css");

                portal.requireData([
                    {conf: sysConf["menuConf"], param: {USER_CODE: userData.USER_CODE}},
                    {
                        conf: sysConf["sysParamConf"],
                        param: {PAR_CODES: "'SHORTCUT_MENUS','TODO_MENU_ID','TOOLBOX_MENU_ID','OPP_DEFAULT_MENU_ID'"}
                    }
                ], function () {
                    portal.data("priMenuData", this[0][0]);
                    var sysParamObj = {};
                    $.each(this[1] ? this[1][0] : [], function () {
                        sysParamObj[this["PAR_CODE"]] = this["PAR_VAL"];
                    });
                    portal.data(portalConst.sysParamObjKey, sysParamObj);   //缓存系统参数

                    portal.plat.createAllPlatMenu(window.isKjdp || sysConf.handleMenu ? portal.handleMenuData(this[0][0]) : {"other": {"2": {menuData: this[0][0]}}});

                    portal.frame.getSearchMenuData(this[0][0], function (data) {
                        portal.data("searchData", data);
                        portal.frame.initSearch(data);
                    });

                    if ($.cookie(portalConst.lockUser)) {
                        ui.lockWin.window("open");
                    }
                    if (window.isKjdp) {
                        portal.plat.subscribe();
                    }
                    kPortal.fn.plat.openIndexPage();
                });
            });

            if (!window.isKjdp && window.sysConf.sysInfoConf) {
                portal.refreshSysInfo();
            }
        },

        getSearchMenuData: function (menuData, success, error) {
            success = $.isFunction(success) ? success : $.noop;
            error = $.isFunction(error) ? error : $.noop;

            portal.requestService(window.isKjdp ?
                [{service: "P0000046"}] :
                "../../frame/js/menu-data.json", function (data) {
                var shortcutMenus = portal.data(portalConst.sysParamObjKey)["SHORTCUT_MENUS"],
                    searchMenuData = this[0][0],
                    retMenuData = $.grep(searchMenuData, function (sSearchMenuData) {
                        sSearchMenuData["MENU_SPELL"] = sSearchMenuData["MENU_SPELL"].toUpperCase();
                        return $.grep(menuData, function (sMenuData) {
                            if (isKjdp) {
                                return !!portal.data("plat_data")[sMenuData["MENU_PLAT"]] && sSearchMenuData["MENU_ID"] === sMenuData["MENU_ID"];
                            }
                            return sSearchMenuData["MENU_ID"] === sMenuData["MENU_ID"];
                        }).length;
                    });

                if (window.isKjdp && shortcutMenus) {
                    var menuIdArr = shortcutMenus.split(/[,，]/),
                        i = 0, l = menuIdArr.length, param = [];
                    for (; i < l; i++) {
                        if (!$.grep(portal.data("priMenuData"), function (sPriData) {
                            return sPriData["MENU_ID"] === menuIdArr[i];
                        }).length) {	//权限控制
                            continue;
                        }
                        param.push({service: "P0004024", MENU_ID: menuIdArr[i], USER_CODE: window.g_user["userId"]});
                    }

                    if (!param.length) {
                        success.call(this, retMenuData);
                        return;
                    }

                    portal.loadMenuCompCfg(param, function (data) {
                        var k = 0, len1 = this.length,
                            x = 0, len2, sData,
                            z = 0, len3, sComp;
                        for (; k < len1; k++) {	//菜单
                            len2 = this[k].length;
                            for (x = 0; x < len2; x++) {	//菜单容器
                                sData = this[k][x];
                                if (!sData || !sData._components) {
                                    continue;
                                }
                                len3 = sData._components.length;
                                for (z = 0; z < len3; z++) {	//容器组件
                                    sComp = sData._components[z];
                                    retMenuData.push({
                                        MENU_ID: sData["MENU_ID"] + sComp["MENU_CONT_COMP_ID"] + sComp["COMP_ID"],
                                        MENU_NAME: sComp["TITLE"],
                                        MENU_PLAT: sData["MENU_PLAT"],
                                        MENU_SPELL: sComp["COMP_SPELL"].toUpperCase(),
                                        comp_data: sComp
                                    });
                                }
                            }
                        }
                        success.call(this, retMenuData);
                    });
                } else {
                    success.call(this, retMenuData);
                }

            }, function () {
                error.apply(this, arguments);
            });
        },

        initSearch: function (data) {
            var KEY = {
                    UP: 38,
                    DOWN: 40,
                    ENTER: 13
                },
                animateSpeed = 200,
                rInput = /^[\u4e00-\u9fa5a-zA-Z0-9-_.]+$/,
                itemSelectedClass = "search-item-selected",
                search = $("#search_input").show(),
                panel = $("#search_items_panel"),
                pVal = search.attr("placeholder"),
                isInPanel = false;

            search.keyup(function (e) {
                var keyCode = e.keyCode,
                    val = search.val();

                switch (keyCode) {
                    case KEY.UP:
                        move(true);
                        break;
                    case KEY.DOWN:
                        move(false);
                        break;
                    case KEY.ENTER:
                        var selected = panel.find("." + itemSelectedClass);
                        if (selected.length) {
                            onSelect.call(selected, selected.attr("menu_id"), selected.attr("menu_name"), selected.attr("menu_plat"));
                        }
                        break;
                    default:
                        if (isInputValid(val)) {
                            onChange.call(this, val);
                        } else {
                            resetPanel();
                        }
                }
            }).focus(function () {
                var val = search.val();
                if (val === pVal) {
                    search.val("");
                }
                if (val && panel.text() && !panel.is(":visible")) {
                    panel.fadeIn(animateSpeed);
                }
            }).blur(function () {
                if (!isInPanel) {
                    panel.fadeOut(animateSpeed);
                } else {
                    search.focus();
                }
                if ("" === search.val()) {
                    search.val(pVal);
                }
            }).val("").blur();

            panel.hover(function () {
                isInPanel = true;
            }, function () {
                isInPanel = false;
            }).click(function (e) {
                var target = $(e.target);
                if (!target.hasClass("search-item")) {
                    target = target.parent();
                }
                onSelect.call(target, target.attr("menu_id"), target.attr("menu_name"), target.attr("menu_plat"));
            });

            function isInputValid(val) {
                return rInput.test(val);
            }

            function resetPanel() {
                panel.fadeOut(animateSpeed, function () {
                    $(this).empty();
                });
            }

            function select(target) {
                target.addClass(itemSelectedClass).siblings().removeClass(itemSelectedClass);
            }

            function move(isUp) {
                var selected = panel.find("." + itemSelectedClass),
                    move = isUp ? selected.prev() : selected.next();
                if (move.length) {
                    select(move);
                    panel.animate({scrollTop: move.prevAll().length * move.outerHeight()}, animateSpeed);
                }
            }

            function generateResult(val, searchData) {
                var i = 0, l = searchData.length, sData, searchItem, resultTxt;

                panel.empty();
                for (; i < l; i++) {
                    resultTxt = "";
                    sData = searchData[i];
                    searchItem = $("<div class='search-item'></div>").attr("menu_id", sData["MENU_ID"])
                        .attr("menu_name", sData["MENU_NAME"]).attr("menu_plat", sData["MENU_PLAT"] || "other").attr("title", sData["MENU_NAME"]);

                    if (i === 0) {
                        searchItem.addClass("search-item-selected");
                    }
                    resultTxt += handleTxt(sData["MENU_ID"], sData.idIndex) + "&nbsp;&nbsp;" + handleTxt(sData["MENU_NAME"], sData.nameIndex);
                    panel.append(searchItem.html(resultTxt));
                }

                function strong(txt) {
                    return "<strong>" + txt + "</strong>";
                }

                function handleTxt(txt, index) {
                    if (index === undefined) {
                        return txt;
                    }
                    return txt.substr(0, index) + strong(txt.substr(index, val.length)) + txt.substr(index + val.length);
                }

                return panel;
            }

            function onSelect(menuId, menuName, menuPlat) {
                var target = $(this);
                select(target);
                panel.fadeOut(animateSpeed, function () {
                    search.val("").blur();
                    val = "";
                    panel.empty();
                });

                if (portal.plat.getCurrentPlatId() === menuPlat) {
                    portal.frame.openMenu(menuId, menuPlat);
                } else {
                    $("#switch_box").find(".switch-item[plat_id='" + menuPlat + "']").trigger("click", [menuId]);
                }
            }

            function onChange(val) {
                val = val.toUpperCase();
                var idIndex, nameIndex, spellIndex,
                    searchData = $.grep(data, function (sData) {
                        idIndex = sData["MENU_ID"].indexOf(val);
                        nameIndex = sData["MENU_NAME"].indexOf(val);
                        spellIndex = sData["MENU_SPELL"].indexOf(val);

                        //删除新增到data中的属性，这样就不用每次匹配输入之前深度拷贝一份data了
                        delete sData["idIndex"];
                        delete sData["nameIndex"];
                        delete sData["spellIndex"];

                        if (-1 !== idIndex) {
                            sData["idIndex"] = idIndex;
                        }
                        if (-1 !== nameIndex) {
                            sData["nameIndex"] = nameIndex;
                            sData["spellIndex"] = nameIndex;
                        }
                        if (-1 !== spellIndex) {
                            sData["spellIndex"] = spellIndex;
                            sData["nameIndex"] = spellIndex;
                        }
                        return -1 !== idIndex || -1 !== nameIndex || -1 !== spellIndex;
                    });

                if (searchData.length) {
                    generateResult(val, searchData).fadeIn(animateSpeed).scrollTop(0);
                } else {
                    resetPanel();
                }
            };
        },

        openMenu: function (menuId, platId) {
            if (!menuId) {
                return;
            } else if (portal.taskBar.tabCache[menuId]) {
                portal.taskBar.maxTask.call(portal.taskBar.tabCache[menuId]);
                return;
            }

            var pInst = portal.plat.getPlatInstance(platId),
                isMain = !!pInst.attr("is_main"),
                leftMenuBox = $(".left-menu-box", pInst),
                tree, menu,
                searchMenuData = $.grep(portal.data("searchData"), function (sData) {
                    return !!sData.comp_data && menuId === sData["MENU_ID"];
                })[0];

            portal.taskBar.minAllTask();
            if (searchMenuData && searchMenuData.comp_data) {	//打开容器中的快捷方式
                var compData = searchMenuData.comp_data,
                    w = $(window).width(),
                    h = $(window).height(),
                    topHeight = $("#top_bar").height(),
                    leftWidth = pInst.find(".left-toolbar").outerWidth(),
                    bottomHeight = pInst.find(".bottom-bar").height();
                //搜索菜单添加转入菜单编号、平台编号的菜单
                compData._param = {F_MENU_PLAT: platId, OPP_COMP_ID: searchMenuData.comp_data.COMP_ID};
                portal.taskBar.addTaskItem.call(null, searchMenuData.MENU_NAME, {
                    url: portal.buildURL(compData.LINK_PAGE, compData._param || {}),
                    title: searchMenuData.MENU_NAME,
                    width: w - leftWidth,
                    height: h - topHeight - bottomHeight,
                    left: leftWidth,
                    top: topHeight,
                    minimizable: true,
                    menuId: menuId
                });

            } else {	//打开左侧菜单
                if (!isMain) {
                    menu = $(".menu-button[menu_id='" + menuId + "']", leftMenuBox);
                    menu.click();
                } else {
                    tree = $(".tree", leftMenuBox);
                    menu = $("div.tree-node[node-id='" + menuId + "']", tree);
                    if (menu.length) {
                        tree.tree("collapseAll");
                        tree.tree("expandTo", menu);
                    }
                    menu.click();
                }
            }
        },

        setTrdDate: function (dateTxt) {
            if (dateTxt) {
                ui.trdDate.text(dateTxt).attr("title", dateTxt);
            }
        },

        setUserInfo: function (userInfo) {
            if (userInfo && !$.isEmptyObject(userInfo)) {
                userInfo["ORG_NAME"] = userInfo["ORG_NAME"] || "未知机构";
                userInfo["USER_NAME"] = userInfo["USER_NAME"] || "未知柜员";
                $("#user_name").text(userInfo["USER_NAME"]).attr("title", userInfo["USER_NAME"]);
                $("#int_org").text(userInfo["ORG_NAME"]).attr("title", userInfo["ORG_NAME"]);
                $("#login").attr("data-islogin", true).attr("title", "退出").removeClass("icon-login").addClass("icon-logout");
                if (userInfo["USER_ICON"]) {
                    $("#head_img").attr("src", "../../upload/userIcon/" + userInfo["USER_ICON"] + "?t=" + new Date().getTime());
                }

                if (!window.isKjdp) {
                    var userDetailWrap = $("#user_detail_info"),
                        detailVal,
                        infoKey;

                    $("#user_name").hover(function () {
                        userDetailWrap.stop();
                        userDetailWrap.fadeIn(200);
                    }, function () {
                        userDetailWrap.stop();
                        userDetailWrap.fadeOut(100);
                    }).removeAttr("title");

                    userDetailWrap.find(".user-detail-item .detail-value").each(function () {
                        detailVal = $(this);
                        infoKey = detailVal.attr("id").replace("detail_", "");
                        detailVal.text(userInfo[infoKey]).attr("title", userInfo[infoKey]);
                    });
                }
            }
        },

        setPlatBackgroundImage: function (platId, commonCfgObj) {
            var pInst = portal.plat.getPlatInstance(platId),
                skin = commonCfgObj.defaultSkin,
                dftImg = $($("#content_bgimage").find(".theme-item[skin='" + skin + "']")[0]).attr("id"),
                imgId = commonCfgObj["platImages"][platId] || dftImg,
                imgEle = pInst.find("img");

            if (imgEle.attr("image_id") === imgId) {
                imgEle.show();
            } else {
                imgEle.attr("src", $("#" + imgId).attr("bgimg") + "?t=" + $.now()).attr("image_id", imgId).fadeIn();
            }
        },

        createEditMask: function (parent) {
            parent = parent || this.portal.body;
            var pw = $(parent).outerWidth(), ph = $(parent).outerHeight(),
                mask = $("<div class='edit-mask'></div>").css({width: pw, height: ph});
            mask.appendTo(parent);
            return mask;
        },

        showContextMenu: function (hooks, position) {
            this.menu({
                onClick: function (item) {
                    (hooks[item.id] || $.noop).call(this, item);
                },
                onHide: function () {
                    $(this).menu("destroy");
                }
            }).menu("show", position);
        },

        resize: function () {
            var w = $(window).width(),
                h = $(window).height() === 746 ? 706 : $(window).height(),
                sWrap = $("#switch_box_wrap"),
                platWrap = portal.plat.getAllPlatWrap(),
                topBarHeight,
                statusHeight;

            ui.topBar.css({"width": w, "left": 0, "top": 0}).show();
            ui.topBar.find("#switch_box_wrap").width(w - ui.topBar.find(">.icon-head").outerWidth(true) - 170 - ui.topBar.find(">.search-box").outerWidth(true) -
                ui.topBar.find(">.line").outerWidth(true) - ui.topBar.find(">.icon-small-div").outerWidth(true) - $('#sys_date_div').outerWidth(true) - 100);

            topBarHeight = ui.topBar.outerHeight();
            statusHeight = ui.statusBar.outerHeight();

            portal.regScrollEvent.call(sWrap.find("#switch_box"), parseInt((sWrap.width() - 27 * 2) / 100));
            platWrap.attr({"width": w, "height": h - topBarHeight - statusHeight});
            ui.statusBar.css({width: w, left: 0, top: topBarHeight + parseInt(platWrap.attr("height"))});

            portal.plat.getAllPlatInstance().each(function () {
                portal.frame.resizeSingle.call(this);
            });

            $(".window .panel-body").filter(function () {
                var taskObj = portal.taskBar.getTaskObj($(this));
                return !taskObj.item || !taskObj.item.length;
            }).each(function () {
                var win = $(this),
                    isOpen = !!win.data("window");
                if (isOpen) {
                    win.window("center");
                }
            });
        },

        resizeSingle: function () {
            var platInst = $(this),
                bottomBar = platInst.find(".bottom-bar"),
                leftToolbar = platInst.find(".left-toolbar"),

                platId = platInst.attr("plat_id"),
                vIsMain = platInst.attr("is_main"),
                isMain = vIsMain === "1",
                isSelf = platId === "-1",

                mainPanel = platInst.find(".main-panel"),
                lPars = isSelf ? mainPanel.find(">.drop-panel") : mainPanel.find(">.layout-wrap"),

                difObj = {width: mainPanel.width(), height: mainPanel.height()};

            portal.plat.resizePlat.call(platInst, isMain);

            difObj.width = mainPanel.width() - difObj.width;
            difObj.height = mainPanel.height() - difObj.height;

            portal.regScrollEvent.call(bottomBar.find(".task-bar-items"), parseInt((bottomBar.width() - 32 * 2) / 114));
            if (isMain) {
                portal.regScrollEvent.call(leftToolbar.find(".menu-box-center"), parseInt((leftToolbar.height() - 18 * 2) / 75));
            }

            lPars.each(function () {
                portal.frame.resizeWorkspace.call(this, isMain, isSelf, difObj);
            });
        },

        resizeWorkspace: function (isMain, isSelf, difObj) {
            var callee = arguments.callee,
                lPar = $(this),
                lParPar = lPar.parent(),

                cWraps = isMain ? lPar.find(".comp-wrap") : lPar.find(">.comp-wrap");
            if (!isMain && !isSelf) {
                var iframe = lPar.find(">iframe");
                iframe.attr("width", parseInt(iframe.attr("width")) + difObj.width).attr("height", parseInt(iframe.attr("height")) + difObj.height);
                return;
            }
            if (isMain) {
                lPar.width(lParPar.width()).height(lParPar.height());
                portal.resizeBoards(lPar, difObj);
            }
            cWraps.each(function () {
                var cWrap = $(this),
                    cTitle = cWrap.find(">.comp-title"),
                    sData = isSelf ? getCompDimension.call(cWrap) : cWrap.data("sData"),
                    size = portal.calSize(isSelf ? lParPar : cWrap.parent(), sData),

                    lWrap = isSelf ? cWrap.find(".layout-wrap") : $(),

                    cBody = cWrap.find(">.comp-body"),
                    iframe = cBody.find(">iframe"),
                    bHeight = size.height - (cTitle.is(":visible") ? cTitle.innerHeight() : 0),
                    dObj = {
                        width: cBody.width(),
                        height: cBody.height()
                    };
                cWrap.css(size);
                cBody.width(size.width).height(bHeight);
                iframe.attr("width", size.width).attr("height", bHeight);
                cWrap.find(".edit-mask").width(size.width).height(size.height);
                portal.resizeTab(cWrap);

                if (isSelf && lWrap.length) {
                    dObj.width = cBody.width() - dObj.width;
                    dObj.height = cBody.height() - dObj.height;
                    callee.call(lWrap, true, false, dObj);
                }
            });

            if (isSelf) {
                lPar.width(lParPar.width()).height(lParPar.height());
            }

            function getCompDimension() {
                var cWrap = this,
                    parent = cWrap.parent(),
                    pWidth = parent.width(),
                    pHeight = parent.height();

                return {
                    COMP_LEFT: parseInt(cWrap.css("left")) / pWidth,
                    COMP_TOP: parseInt(cWrap.css("top")) / pHeight,
                    COMP_WIDTH: cWrap.width() / pWidth,
                    COMP_HEIGHT: cWrap.height() / pHeight
                }
            }
        },

        onStopResize: function (e) {
            var d = e.data, t = $(d.target), p = t.parent();

            if (d.left < 0) {
                d.left = 0;
                t.css("left", 0);
            }
            if (d.top < 0) {
                d.top = 0;
                t.css("top", 0);
            }
            if (d.left + t.outerWidth() >= p.width()) {
                t.width(p.width() - d.left);
            }
            if (d.top + t.outerHeight() >= p.height()) {
                t.height(p.height() - d.top);
            }
        },

        onDrag: function (e) {
            var d = e.data, t = $(d.target), p = $(d.parent);

            if (d.left < 0) {
                d.left = 0;
                t.css("left", 0);
            }
            if (d.top < 0) {
                d.top = 0;
                t.css("top", 0);
            }
            if (d.left + t.outerWidth() > p.width()) {
                var left = p.width() - t.outerWidth();
                d.left = left;
                t.css("left", left);
            }
            if (d.top + t.outerHeight() > p.height()) {
                var top = p.height() - t.outerHeight();
                d.top = top;
                t.css("top", top);
            }
        },

        helpClick: function (e) {
            var target = $(this),
                helpWin;
            if (target.data("window")) {
                return;
            }

            helpWin = $.data(target[0], "window", portal.openWindow({
                modal: true,
                url: window.isKjdp ? "../page/front_help.html" : window.sysConf["helpUrl"],
                title: "帮助与支持",
                width: $(window).width() - 150,
                height: $(window).height() - 100,
                minimizable: false,
                onClose: function () {
                    helpWin.find("iframe").removeAttr("src").remove();
                    helpWin.window("destroy");
                    target.removeData("window");
                }
            }));
        },

        lockClick: function (e) {
            $("#lock_password").val("");
            $.cookie(portalConst.lockUser, "true");
            ui.lockWin.window("open");
        },

        settingClick: function (e) {
            var win = ui.settingWin,
                contentImage = win.find("#content_bgimage"),
                contentPlat = win.find("#content_plat").empty(),
                contentSkin = win.find("#content_skin"),

                platData = $.extend(true, {}, portal.data("plat_data")),	//deep copy
                priPlatData = portal.data("priPlatData"),
                cfgObj = $.extend(true, {}, portal.data("commonCfgObj")),	//deep copy
                currentPlatId = portal.plat.getCurrentPlatId();

            win.show().dialog({
                "width": "500",
                "height": "350",
                "buttons": [{
                    text: "保存",
                    handler: function (e, dialog) {
                        var mask,
                            selectedPlatId = contentPlat.find("input:checked").attr("plat_id"),
                            selectedSkinId = contentSkin.find("input:checked").attr("skin_id"),
                            selectedImage = contentImage.find(".theme-item-selected").attr("id"),
                            showConfirm;

                        cfgObj["defaultPlat"] = selectedPlatId;
                        cfgObj["platImages"] = cfgObj["platImages"] || {};

                        if (cfgObj["defaultSkin"] !== selectedSkinId) {
                            showConfirm = true;
                            for (var k in cfgObj["platImages"]) {
                                cfgObj["platImages"][k] = selectedImage;
                            }
                        } else {
                            cfgObj["platImages"][currentPlatId] = selectedImage;
                        }

                        cfgObj["defaultSkin"] = selectedSkinId;

                        if (showConfirm) {
                            portal.showConfirm("更换皮肤需要刷新界面，是否继续？", function () {
                                saveCfg(function () {
                                    location.reload();
                                });
                            }, function () {
                                cfgObj = $.extend(true, {}, portal.data("commonCfgObj"));	//deep copy
                            });
                            return;
                        }
                        saveCfg();

                        function saveCfg(success, error) {
                            success = $.isFunction(success) ? success : $.noop;
                            error = $.isFunction(error) ? error : $.noop;
                            mask = portal.createSyncMask("正在保存,请稍后", win.css("position", "relative"));
                            if (!window.isKjdp) {
                                $.cookie("commonCfgObj", encodeURI(JSON.stringify(cfgObj)));
                                portal.data("commonCfgObj", cfgObj);
                                portal.frame.setPlatBackgroundImage(currentPlatId, cfgObj);
                                mask.remove();
                                dialog.dialog("close");
                                success();
                                return;
                            }
                            portal.requestService({
                                service: "P0000172",
                                USER_CODE: window.g_user.USER_CODE,
                                CONFIGURE: encodeURI(JSON.stringify(cfgObj))
                            }, function () {
                                portal.data("commonCfgObj", cfgObj);
                                portal.frame.setPlatBackgroundImage(currentPlatId, cfgObj);
                                mask.remove();
                                dialog.dialog("close");
                                success();
                            }, function () {
                                error();
                                mask.remove();
                            });
                        }
                    }
                }],
                "onBeforeOpen": function (e) {
                    var k = 0, l = priPlatData.length,
                        plat, image = cfgObj["platImages"][currentPlatId];

                    contentSkin.find("input:checked").prop("checked", false);
                    contentImage.find(">div").removeClass("theme-item-selected");
                    portal.regHoverEvent.call(win.find(".theme-item"), "theme-item-selected");

                    for (; k < l; k++) {
                        if (!platData[priPlatData[k]["ID"]]) {
                            continue;
                        }

                        var wrap = $("<div class='select-item'></div>"),
                            radio = $("<input type='radio' name='plat-radio'/>").attr("plat_id", priPlatData[k]["ID"]).appendTo(wrap),
                            txt = $("<span></span>").text(priPlatData[k]["PLAT_NAME"]).appendTo(wrap);
                        contentPlat.append(wrap);
                    }

                    if (cfgObj.defaultPlat && (plat = contentPlat.find("input[plat_id='" + cfgObj.defaultPlat + "']")).length) {
                        plat.click();
                    } else {
                        contentPlat.find("input:first").click();
                    }

                    $("input", contentSkin).click(function () {
                        var target = $(this),
                            sSkin = target.attr("skin_id"),
                            skinImg = contentImage.find(".theme-item").hide().filter(function () {
                                return $(this).attr("skin") === sSkin;
                            }).show(),
                            sImg = (function () {
                                if (!image) {
                                    return $();
                                }
                                return skinImg.filter(function () {
                                    return $(this).attr("id") === image;
                                });
                            })();

                        if (sImg.length) {
                            sImg.click();
                        } else {
                            $(skinImg[0]).click();
                        }
                    });
                    contentSkin.find("input[skin_id='" + cfgObj.defaultSkin + "']").click();
                }
            });
        },

        userIconClick: function (e) {
            if (!window.isKjdp) {
                return;
            }
            var win = $("#user_info_win"),
                form = $("#user_info_form"),
                loginBtn = $("#login");

            if (!loginBtn.attr("data-islogin")) {
                loginBtn.click();
                return false;
            }

            var isFlashAvailable = $.fn.uploadify("isFlashAvailable");

            win.show().window({
                "width": "600",
                "height": "290",
                "modal": true,
                "onOpen": function () {
                    if (!isFlashAvailable) {
                        alert("flash插件未安装或版本过低，无法使用头像修改的功能。");
                        win.find("#img_file").hide();
                    }
                },
                "onBeforeOpen": function () {
                    form.form("load", window.g_user);
                    win.find("#user_head_img").attr("src", $("#head_img").attr("src")).attr("user_icon", window.g_user.USER_ICON);
                    win.find(".kui-linkbutton").unbind("click");

                    win.find("#save_user_info").click(function () {
                        if (form.form("validate")) {
                            var o = {};
                            win.find("input[class*='kui-validatebox']").each(function () {
                                var vbox = $(this), id = vbox.attr("name");
                                if (id === "USER_NAME" || id === "OPEN_DATE") {
                                    return true;
                                }
                                o[id] = vbox.val();
                            });
                            o["USER_ICON"] = win.find("#user_head_img").attr("user_icon");
                            var mask = portal.createSyncMask("正在保存,请稍后", form);
                            modifyUserInfo.call(portal, o, function () {
                                $.extend(window.g_user, o);
                                if (o["USER_ICON"]) {
                                    $("#head_img").attr("src", "../../upload/userIcon/" + o["USER_ICON"] + "?t=" + $.now());
                                }
                                win.window("close");
                                mask.remove();
                                alert("资料保存成功!");
                            }, function () {
                                alert("操作失败");
                                mask.remove();
                            });
                        }
                    });

                    win.find("#change_password").click(function () {
                        var pwdWin = $("#password_change_win").show(),
                            pwdForm = $("#password_change_form"),
                            pwdUserCode = pwdForm.find("#PWD_CHANGE_USER_CODE"),
                            oldPwd = pwdForm.find("#PWD_CHANGE_OLD"),
                            newPwd = pwdForm.find("#PWD_CHANGE_NEW");
                        pwdWin.dialog({
                            width: "240",
                            height: "210",
                            onBeforeOpen: function () {
                                pwdUserCode.textinput("setValue", window.g_user.userId);
                                oldPwd.password("clear");
                                newPwd.password("clear");
                            },
                            buttons: [{
                                text: "修改",
                                handler: function () {
                                    if (pwdForm.form("validate")) {
                                        var mdfBtn = $(this).linkbutton("disable");
                                        portal.requestService({	//用户密码认证
                                            service: "P0003001",
                                            USER_CODE: window.g_user.userId,
                                            TRD_PWD: encrypt(oldPwd.password("getValue"), window.g_user.userId)
                                        }, function (data) {
                                            if (data[0][0] && "0" === data[0][0]["IRETCODE"]) {	//认证成功
                                                portal.requestService({	//用户密码重置
                                                    service: "P0001006",
                                                    USER_CODE: window.g_user.userId,
                                                    USER_PASS: encrypt(newPwd.password("getValue"), window.g_user.userId)
                                                }, function () {
                                                    pwdWin.dialog("close");
                                                    mdfBtn.linkbutton("enable");
                                                    alert("操作成功！");
                                                }, function () {
                                                    mdfBtn.linkbutton("enable");
                                                });
                                            } else {
                                                alert("原密码不正确，请再次输入！");
                                                mdfBtn.linkbutton("enable");
                                            }
                                        });
                                    }
                                }
                            }]
                        })
                    });

                    var mask = $();
                    if (isFlashAvailable && !win.find("#img_file").data("uploadify")) {
                        win.find("#img_file").uploadify({
                            enableHtml5Upload: false,
                            showQueue: false,
                            showButton: false,
                            autoCheck: false,
                            buttonText: "",
                            movieClass: "movie-class",
                            dir: "userIcon",
                            multi: false,
                            width: 86,
                            height: 86,
                            fileTypeDesc: '请选择',
                            fileTypeExts: '*.bmp;*.jpg;*.gif;*.png',
                            fileSizeLimit: '5MB',
                            onSelect: function () {
                                mask = portal.createSyncMask("图片上传中,请稍后", form);
                            },
                            onUploadError: function () {
                                alert("头像上传失败");
                                mask.remove();
                            },
                            onUploadSuccess: function (data) {
                                win.find("#user_head_img").attr("user_icon", data.FILECON).attr("src", "../../upload/userIcon/" + data.FILECON + "?t=" + $.now());
                                mask.remove();
                            }
                        });
                    }
                },
                "onClose": function () {
                    form.form("clear");
                }
            });


            function modifyUserInfo(param, success, error) {
                error = error || $.noop;
                this.requestService($.extend({service: "P0004015"}, param),
                    function (data) {
                        $.ajax({
                            url: "../../kjdp_userInfo",
                            type: "POST",
                            data: encrypt(kui.makeXmlRequestStr([param]), portal.data("kencKey")),
                            contentType: 'text/xml; charset=utf-8',
                            dataType: 'text',
                            success: success,
                            error: error
                        });
                    }, error);
            }
        }
    });

    $.extend(kPortal.fn.login, {

        showResult: function (msg) {
            $("#tip_div").text(msg).show();
        },

        initLogin: function () {
            $("#user_code").val($.cookie("account") || "");
            $("#password").val("");
            $("#valid_code").val("");
            $("#tip_div").text("");
            $("#valid_img").attr("src", "../../kjdp_validate?k=" + Math.random());
        },

        ajax: function (param, success, error) {
            return $.ajax($.extend({}, {
                type: "post",
                dataType: "text",
                data: Math.random(),
                success: success || $.noop,
                error: error || $.noop
            }, param));
        },

        getServerKey: function (success, error) {
            success = $.isFunction(success) ? success : $.noop;
            error = $.isFunction(error) ? error : $.noop;
            portal.login.ajax({
                url: "../../kjdp_encrypkey",
                contentType: 'text/xml; charset=utf-8'
            }, function (data) {
                window.$kencKey = data;
                portal.data("kencKey", data);
                success.call(this, data);
            }, function () {
                error.apply(this, arguments);
            });
        },

        loginRequest: function (params, success, error) {
            success = $.isFunction(success) ? success : $.noop;
            error = $.isFunction(error) ? error : $.noop;
            portal.login.getServerKey(function (kencKey) {
                portal.login.ajax({
                    url: "../../kjdp_login",
                    data: encrypt(kui.makeXmlRequestStr([params]), kencKey)
                }, function (data) {
                    success.call(this, (function () {
                        try {
                            return JSON.parse(data);
                        } catch (ex) {
                        }
                        return null;
                    })());
                }, function () {
                    error.apply(this, arguments);
                });
            }, function () {
                error.apply(this, arguments);
            });
        },

        getSession: function (success, error) {
            portal.login.ajax({
                url: "../../kjdp_session"
            }, function (data) {
                if ($.isFunction(success)) {
                    success.call(this, (function () {
                        try {
                            return JSON.parse(data);
                        } catch (ex) {
                        }
                        return null;
                    })());
                }
            }, function () {
                if ($.isFunction(error)) {
                    success.call(this, arguments);
                }
            });
        },

        logout: function () {
            $.cookie(portalConst.lockUser, null);
            window.doNotShowConfirmOnBeforeUnload = true;
            location.replace("../../kjdp_logout?isPortal=true");
        },

        getLoginData: function () {
            var userCode = $("#user_code"),
                password = $("#password"),
                validCode = $("#valid_code"),
	       macaddr = $("#mac_addr");
            return {
                USER_CODE: $.trim(userCode.val()),
                TRD_PWD: password.val(),
                validateCode: $.trim(validCode.val()),
	        MAC_ADDR:$.trim(macaddr.val())
            }
        },

        valid: function (lParam) {
            if (lParam["USER_CODE"].length === 0) {
                return "帐号不能为空！";
            }
            if (lParam["TRD_PWD"].length === 0) {
                return "登录密码不能为空！";
            }
            if ($("#valid_code").is(":visible") && !(/[A-Za-z0-9]{4}$/.test(lParam.validateCode))) {
                return "验证码格式错误！";
            }
            return true;
        },

        loginClick: function (e, isTriggered) {
            if ($("#login").attr("data-islogin")) {
                confirm("退出", isTriggered ? "确定要切换用户吗？" : "确定要退出吗？", function (flag) {
                    var isAllClosed = true,
                        platData = portal.data("plat_data"),
                        platId;
                    if (flag) {
                        for (platId in platData) {
                            if (!portal.taskBar.hasTask(platId)) {
                                continue;
                            }
                            portal.plat.getPlatSwitchItem(platId).click();
                            if (!portal.taskBar.closeAllTask(platId)) {
                                isAllClosed = false;
                                break;
                            }
                        }
                        if (isAllClosed) {
                            portal.login.logout();
                        }
                    }

                });
            } else {
                $("#login_window_div").show().window({
                    width: "390",
                    height: "250",
                    onBeforeOpen: function () {
                        $(this).parent().addClass("login-window");
                        portal.login.initLogin();
                    }
                });
            }
        },

        validImgClick: function (e) {
            $("#valid_img").attr("src", "../../kjdp_validate?k=" + Math.random());
        },
        loginBtnClick: function (e) {
            var loginBtn = $(this),
                lParam = portal.login.getLoginData(),
                validResult = portal.login.valid(lParam),

                validCode = $("#valid_code");

            if ("string" == typeof validResult) {
                portal.login.showResult(validResult);
                return false;
            }
            lParam["TRD_PWD"] = encrypt(lParam["TRD_PWD"], lParam["USER_CODE"]);

            loginBtn.attr("disabled", "disabled").val("正在登录...");
            portal.login.loginRequest(lParam, function (data) {
                loginBtn.removeAttr("disabled").val("登  录");
                if (!data) {
                    portal.login.showResult("获取登录数据失败!");
                    portal.login.btnLoginStatus = true;
                    return false;
                }
                if (data['IRETCODE'] == "0") {
                    $("#login_window_div").window("close");
                    portal.data("loginData", lParam);
                    $.cookie(portalConst.lockUser, null);
                    portal.frame.initUserPage(data);
                    window.doNotShowConfirmOnBeforeUnload = false;
                    //设置登录日期
                    kPortal.fn.setSysDate();

                } else {
                    if (data['FAILCODE'] && "-99" === data['FAILCODE']) {
                        validCode.parent().show();
                        validCode.parent().parent().removeClass("no-validcode");
                    }
                    if (sysConf.loginType != 3) {
                        if (data['IRETCODE'] == "-1") {
                            portal.login.showResult("用户名或密码错误，登陆失败!");
                        } else if (data['IRETCODE'] == "-3") {
                            portal.login.showResult("验证码错误，登陆失败!");
                        } else if (data['IRETCODE'] == "-4") {
                            portal.login.showResult("用户状态不合法，登陆失败!");
                        } else if (data['IRETCODE'] == "-5") {
                            portal.login.showResult("用户可操作站点不合法，登陆失败!");
                        } else {
                            portal.login.showResult(data['IRETINFO']);
                        }
                    } else {
                        if (data['IRETCODE'] == "60000105") {
                            portal.login.showResult("用户名或密码错误，登陆失败!");
                        } else if (data['IRETCODE'] == "60000110") {
                            portal.login.showResult("用户不存在，登陆失败!");
                        } else if (data['IRETCODE'] == "60000324") {
                            portal.login.showResult("用户状态不合法，登陆失败!");
                        } else if (data['IRETCODE'] == "-1") {
                            portal.login.showResult("无法连接到统一认证，登陆失败!");
                        } else {
                            portal.login.showResult("用户认证失败!");
                        }
                    }
                    $("#valid_img").click()
                    portal.login.btnLoginStatus = true;
                }
            }, function () {
                loginBtn.removeAttr("disabled").val("登  录");
                portal.login.btnLoginStatus = true;
                portal.login.showResult("登录失败，服务器异常!");
            });
        },

        btnLoginStatus: true,

        loginKeyup: function (e) {
            var userCode = $("#user_code"),
                password = $("#password"),
                validCode = $("#valid_code"),

                btnLogin = $("#btn_login");

            if (13 == e.keyCode) {
                switch ($(this).attr("id")) {
                    case "user_code":
                        password.focus();
                        break;
                    case "password":
                        if (validCode.is(":visible")) {
                            validCode.focus();
                        } else {
                            if (portal.login.btnLoginStatus) {
                                portal.login.btnLoginStatus = false;
                                btnLogin.click();
                            }
                        }
                        break;
                    case "valid_code":
                        if (portal.login.btnLoginStatus) {
                            portal.login.btnLoginStatus = false;
                            btnLogin.click();
                        }
                        break;
                }
            }
        },

        unlockBtnClick: function (e) {
            var unlockBtn = $(this).attr("disabled", true).val("正在解锁...");

            portal.login.getServerKey(function (kencKey) {
                portal.login.ajax({
                    url: "../../kjdp_unlock",
                    data: encrypt(kui.makeXmlRequestStr([{
                        USER_CODE: window.g_user["userId"],
                        TRD_PWD: encrypt($("#lock_password").val(), window.g_user["userId"])
                    }]), kencKey)
                }, function (data) {
                    unlockBtn.removeAttr("disabled").val("解  锁");
                    data = $.parseJSON(data);
                    if ("0" === data.IRETCODE) {
                        ui.lockWin.window("close");
                        $.cookie(portalConst.lockUser, null);
                    } else {
                        if (data['IRETCODE'] == "-1") {
                            alert("用户名或密码错误，解锁失败!");
                        } else if (data['IRETCODE'] == "-3") {
                            alert("验证码错误，解锁失败!");
                        } else if (data['IRETCODE'] == "-4") {
                            alert("用户状态不合法，解锁失败!");
                        } else if (data['IRETCODE'] == "-5") {
                            alert("用户可操作站点不合法，解锁失败!");
                        } else {
                            alert("用户认证失败!");
                        }
                    }
                }, function () {
                    unlockBtn.removeAttr("disabled").val("解  锁");
                    alert("用户解锁失败！");
                });
            }, function () {
                unlockBtn.removeAttr("disabled").val("解  锁");
                alert("获取kencKey失败！");
            });
        },

        unlockKeyup: function (e) {
            if (13 == e.keyCode) {
                $("#btn_unlock").click();
            }
        }
    });

    $.extend(kPortal.fn.plat, {
        openIndexPage:function(){
            var mainPanel = portal.plat.getPlatMainPanel(),
                existWrap = mainPanel.find(".layout-wrap[menu_id='A99999']"),
                lWrap = $("<div class='layout-wrap'></div>").attr("menu_id", 'A99999');

            if (existWrap.length > 0) {
                portal.taskBar.maxTask.call(existWrap);
                return false;
            }

            lWrap.appendTo(mainPanel).show().siblings().hide();

            portal.taskBar.addTaskItem.call(lWrap, '业务首页',null,false);
            var iframeOpts = {
                src: portal.buildURL('../../business/businessMain.html', {
                    "menuId": portal.taskBar.uuid,
                    "CHK_FLAG": undefined,
                    "F_SUBSYS": undefined,
                    "F_MENU_PLAT": portal.plat.getPlatMainPanel(),
                    "_": $.now()
                }),
                width: mainPanel.width() - 25,
                height: mainPanel.height() - 20
            };

            lWrap.width(iframeOpts.width + 10).height(iframeOpts.height + 5);
            portal.createIframe(lWrap, iframeOpts);


        },
        getAllPlatWrap: function () {
            var id = "plat_instance",
                wrap = $("#" + id);
            return wrap.length ? wrap : $("<div id='" + id + "'></div>").appendTo("body");
        },

        getPlatSwitchItem: function (platId) {
            platId = platId || this.getCurrentPlatId();
            return $("#switch_box").find(".switch-item[plat_id='" + platId + "']");
        },

        getCurrentPlatId: function () {
            return $("#switch_box").find(".switch-item-selected").attr("plat_id");
        },

        getPlatInstance: function (platId) {
            platId = platId || this.getCurrentPlatId();
            return this.getAllPlatInstance().filter(function () {
                return $(this).attr("plat_id") === platId;
            });
        },

        getAllPlatInstance: function () {
            return this.getAllPlatWrap().find(">div");
        },

        getPlatMainPanel: function (platId) {
            return this.getPlatInstance(platId || this.getCurrentPlatId()).find(".main-panel");
        },

        createPlatInstance: function (isMain, isSelf) {
            var wrap = $(this),
                platInst = $("#plat_prototype").clone().show(),
                leftToolBar = $(".left-toolbar", platInst),
                mainPanel = $(".main-panel", platInst),
                leftCollapseBox = $(".left-collapse-box", platInst);

            if (isSelf) {
                leftToolBar.remove();
            }

            if (isSelf || isMain) {
                leftCollapseBox.remove();
            }

            if (!isMain && !isSelf) {
                mainPanel.addClass("main-panel-other");
                leftToolBar.addClass("left-toolbar-padding");
                $(".left-collapse-box .collpase-btn", platInst).click(function () {
                    var speed = 100,
                        target = $(this),
                        leftCollapseBox = target.parent(),
                        platInst = leftCollapseBox.parent(),
                        leftToolBar = platInst.find(".left-toolbar");

                    if (target.hasClass("expanded")) {	//折叠
                        target.data("toolbarWidth", leftToolBar.outerWidth());
                        leftToolBar.animate({width: 0}, speed, function () {
                            leftToolBar.removeClass("left-toolbar-padding");
                            leftCollapseBox.css("left", 0);
                            portal.frame.resizeSingle.call(platInst);
                            target.attr("title", "展开").removeClass("expanded").addClass("collapsed");
                            leftToolBar.hide();
                        });
                    } else {	//展开
                        leftToolBar.animate({width: target.data("toolbarWidth")}, speed, function () {
                            leftToolBar.addClass("left-toolbar-padding");
                            leftCollapseBox.css("left", leftToolBar.outerWidth());
                            portal.frame.resizeSingle.call(platInst);
                            target.attr("title", "折叠").removeClass("collapsed").addClass("expanded");
                            leftToolBar.show();
                        });
                    }
                });

                leftToolBar.resizable({
                    handles: "e",
                    onStartResize: function () {
                        leftCollapseBox.hide();
                        leftToolBar.data("mainMask", mainPanel.clone().empty().insertAfter(mainPanel));	//加上拖动遮罩到右侧iframe
                    },
                    onResize: function (e) {
                        if (e.pageX > 450) {
                            leftToolBar.width(444);
                            return false;
                        }

                        if (e.pageX < 100) {
                            leftToolBar.width(94);
                            return false;
                        }
                    },
                    onStopResize: function (e) {
                        if (e.pageX > 450) {
                            leftToolBar.width(444);
                        }

                        if (e.pageX < 100) {
                            leftToolBar.width(94);
                        }
                        portal.frame.resizeSingle.call(platInst);
                        leftCollapseBox.css("left", leftToolBar.outerWidth()).show();
                        leftToolBar.data("mainMask").remove();
                    }
                });
            }

            wrap.append(platInst);
            portal.plat.resizePlat.call(platInst, isMain);
            leftCollapseBox.css("left", leftToolBar.outerWidth());
            return platInst;
        },

        resizePlat: function (isMain) {
            var pWrap = $(this),
                leftBar = $(".left-toolbar", pWrap),
                mailPanel = $(".main-panel", pWrap),
                bottomBar = $(".bottom-bar", pWrap),

                winW = $(window).width(),
                winH = $(window).height() === 746 ? 706 : $(window).height(),

                leftPadding = (function () {
                    if (!leftBar.length) {
                        return 0;
                    }

                    return parseInt(leftBar.css("padding-left") || 0) + parseInt(leftBar.css("padding-right") || 0);
                })();
            leftWidth = (function () {
                if (!leftBar.length) {
                    return 0;
                }

                if (!leftBar.is(":visible") && leftBar.width() === 0) {
                    return isMain ? 83 : 200;
                }
                return leftBar.width();
            })();
            topHeight = ui.topBar.height(),
                bottomHeight = !bottomBar.length ? 0 : 30,
                statusHeight = ui.statusBar.outerHeight(),
                mainMarginLeft = 5,
                mainMarginTop = 3,

                leftHeight = winH - topHeight - parseInt(leftBar.css("padding-top") || 0) - statusHeight,
                mainPanelH = winH - topHeight - bottomHeight - mainMarginTop - statusHeight,
                mainPanelW = winW - leftWidth - leftPadding - mainMarginLeft,
                bottomW = winW - leftWidth - leftPadding,
                bottomT = winH - bottomHeight - statusHeight;

            leftBar.css({"height": leftHeight, "width": leftWidth, "left": 0, "top": topHeight}).show();
            mailPanel.css({
                "height": mainPanelH,
                "width": mainPanelW,
                "left": leftWidth + leftPadding,
                "top": topHeight,
                "marginTop": mainMarginTop,
                "marginLeft": mainMarginLeft
            }).show();
            bottomBar.css({
                "heigth": bottomHeight,
                "width": bottomW,
                "left": leftWidth + leftPadding,
                "top": bottomT
            }).show();

            var lWrap = mailPanel.find(">.layout-wrap"),
                lPar = lWrap.parent(),
                width = lPar.width(),
                height = lPar.height();
            lWrap.css({"width": isMain ? width : width - 20, "height": isMain ? height : height - 20});
        },

        subscribe: function (frequency) {
            if (!window.isKjdp) {
                return;
            }
            frequency = Number(frequency || 60000);
            if (isNaN(frequency) || 0 === frequency) {
                return;
            }

            window[portalConst.subscribeInterval] = setInterval(intervalCallback, frequency);
            intervalCallback();

            function intervalCallback() {
                portal.requireData([{
                    conf: sysConf.todoQueryConf //查询待办数量
                }, {
                    conf: sysConf.todoQueryConf, param: {remindState: "2"}    //查询催办数量
                }, {
                    conf: sysConf.toolboxQueryConf  //查询工具箱待办数量
                }], function (data) {
                    var todoMenuId = portal.data(portalConst.sysParamObjKey)["TODO_MENU_ID"],
                        subsData = {},
                        todoCount, pressCount, toolboxCountData;

                    if (data[0][0] && data[0][0]["BPM_DATA"] && data[0][0]["BPM_DATA"][0]) {
                        todoCount = Number(data[0][0]["BPM_DATA"][0].count);
                        subsData[portalConst.todoCountKey] = todoCount;
                    }

                    if (data[1][0] && data[1][0]["BPM_DATA"] && data[1][0]["BPM_DATA"][0]) {
                        pressCount = Number(data[1][0]["BPM_DATA"][0].count);
                        subsData[portalConst.pressCountKey] = pressCount;
                    }

                    toolboxCountData = data[2][0] || [];
                    subsData[portalConst.toolboxCountDataKey] = toolboxCountData;

                    portal.data(portalConst.subscribeDataKey, subsData);
                    if (!isNaN(todoCount) && !isNaN(pressCount)) {
                        portal.plat.setTodoPromptIcon.call($(".menu-button[menu_id='" + todoMenuId + "']"), todoCount, pressCount > 0);
                        portal.plat.setToolboxPromptIcon(toolboxCountData);
                    } else {
                        clearInterval(window[portalConst.subscribeInterval]);
                    }

                }, function () {
                    clearInterval(window[portalConst.subscribeInterval]);
                });
            }
        },

        setToolboxPromptIcon: function (toolboxCountData) {
            toolboxCountData = toolboxCountData || (portal.data(portalConst.subscribeDataKey) && portal.data(portalConst.subscribeDataKey)[portalConst.toolboxCountDataKey]);

            if (!toolboxCountData || !toolboxCountData.length) {
                return;
            }
            var toolboxMenuId = portal.data(portalConst.sysParamObjKey)["TOOLBOX_MENU_ID"],
                uasInst = portal.plat.getPlatInstance("1"),
                tooboxWrap = $(".layout-wrap[menu_id='" + toolboxMenuId + "']", uasInst),
                pIcon,
                compId, count;

            if (!tooboxWrap.length) {
                return;
            }
            $.each(toolboxCountData, function () {
                compId = this["COMP_ID"];
                count = this["COUNT"];
                pIcon = $(".drag-wrap[comp_id='" + compId + "']", tooboxWrap);
                portal.plat.setTodoPromptIcon.call(pIcon, count, false);
            });
        },

        setTodoPromptIcon: function (todoNum, animate) {
            clearInterval(window.pressTodoInterval);
            var parEle = $(this),
                promptIcon = $("<div class='prompt-icon'><div>");

            parEle.find(".prompt-icon").remove();

            if (todoNum > 0) {
                parEle.append(promptIcon.text(todoNum >= 100 ? "..." : todoNum).attr("title", "您共有" + todoNum + "条待办事项"));

                if (animate) {
                    window.pressTodoInterval = setInterval(function () {
                        promptIcon.animate({
                            opacity: 0.3
                        }, 100).animate({
                            opacity: 1
                        }, 100)
                    }, 500);
                }
            }
        },

        setEditable: function (flag) {
            var disableDnR = !flag,
                mainPanel = portal.plat.getPlatMainPanel("-1");

            mainPanel[disableDnR ? "removeClass" : "addClass"]("main-panel-border");

            mainPanel.find(".drop-panel").each(function () {
                var dropPanel = $(this);
                dropPanel.droppable({disabled: disableDnR});
                dropPanel.find(".comp-wrap").each(function () {
                    var cWrap = $(this),
                        isCont = cWrap.hasClass("comp-wrap-cont"),
                        edtMask = cWrap.find(".edit-mask");

                    edtMask[disableDnR ? "hide" : "show"]();
                    cWrap.draggable({disabled: disableDnR}).resizable({disabled: disableDnR});

                    if (isCont) {
                        cWrap.find(".cont-tab-body").droppable({disabled: disableDnR});

                        cWrap.find(".menu-button").each(function () {
                            var mBtn = $(this),
                                isDir = mBtn.hasClass("menu-button-dir");
                            if (isDir) {
                                mBtn.droppable({disabled: disableDnR});
                                return true;
                            }
                            mBtn.draggable({disabled: disableDnR}).droppable({disabled: disableDnR});
                        });
                        return true;
                    }

                    edtMask[disableDnR ? "removeClass" : "addClass"]("comp-wrap-edit");
                });
            });
        },

        isEditable: function () {
            return portal.plat.getPlatMainPanel("-1").hasClass("main-panel-border");
        },

        getUserPlatCfg: function () {
            var mainPanel = portal.plat.getPlatMainPanel("-1"),
                cfgObj = {};
            mainPanel.find(".drop-panel").each(function () {
                var dropPanel = $(this),
                    cfgArr = [];
                dropPanel.find(">.comp-wrap").each(function () {
                    var sWrap = $(this),
                        isCont = sWrap.hasClass("comp-wrap-cont"),
                        cfg = {};

                    cfg["MENU_ID"] = sWrap.attr("menu_id");
                    cfg["MENU_PLAT"] = sWrap.attr("menu_plat");
                    cfg["DISP_TITLE"] = sWrap.find(">.comp-title").is(":visible");
                    cfg["TITLE"] = sWrap.find(">.comp-title").text();
                    cfg["TOP"] = parseInt(sWrap.css("top")) / mainPanel.height();
                    cfg["LEFT"] = parseInt(sWrap.css("left")) / mainPanel.width();
                    cfg["WIDTH"] = sWrap.width() / mainPanel.width();
                    cfg["HEIGHT"] = sWrap.height() / mainPanel.height();
                    cfg["MENU_LINK"] = sWrap.find("iframe").attr("src");

                    if (isCont) {
                        cfg["showToolbox"] = sWrap.attr("showToolbox");
                        cfg["DISP_TITLE"] = true;
                        var components = [];
                        sWrap.find(".menu-button").each(function () {
                            var menuIco = $(this),
                                isDir = menuIco.hasClass("menu-button-dir"),
                                dirName = menuIco.attr("dir_name"),
                                icoCfg = {};

                            if (isDir) {
                                icoCfg["DIR_NAME"] = menuIco.find(".menu-button-bottom").text();
                            } else {
                                icoCfg["MENU_ID"] = menuIco.attr("menu_id");
                                icoCfg["MENU_PLAT"] = menuIco.attr("menu_plat");
                                icoCfg["TITLE"] = menuIco.find(".menu-button-bottom").text();
                                icoCfg["MENU_ICO"] = menuIco.attr("menu_ico");
                                icoCfg["MENU_LINK"] = menuIco.attr("menu_link");

                                if (dirName) {
                                    icoCfg["DIR_NAME"] = dirName;
                                }
                            }

                            components.push(icoCfg);
                        });
                        cfg["components"] = components;
                    }

                    cfgArr.push(cfg);
                });

                cfgObj[dropPanel.attr("data-index")] = cfgArr;
            });

            return cfgObj;
        },

        createDnR: function (dimention, sData, disabledDnR, callback) {
            var platData = portal.data("plat_data"),
                sPlatData = platData[sData["MENU_PLAT"]],
                parent = $(this),
                isCont = !!sData.components, cWrap, cBody, cTitle;

            if (!isCont && !sPlatData) {
                return;
            }
            cWrap = $("<div class='comp-wrap'></div>");
            cBody = $("<div class='comp-body'></div>").appendTo(cWrap);
            cTitle = $("<div class='comp-title' title='" + sData["TITLE"] + "'>" + sData["TITLE"] + "</div>").prependTo(cWrap);

            if (!isCont) {
                cWrap.addClass("comp-wrap-edit");
                cWrap.attr("is_main", sPlatData["IS_MAIN"]).attr("menu_plat", sData["MENU_PLAT"]).attr("menu_id", sData["MENU_ID"]);
                cBody.addClass("self-comp-body");
            }

            if (!sData["DISP_TITLE"]) {
                cWrap.addClass("comp-wrap-no-head");
                cTitle.hide();
            }

            parent.append(cWrap);

            cWrap.css({position: "absolute", left: dimention["left"], top: dimention["top"] + "px"});
            if (isCont) {
                cWrap.addClass("comp-wrap-cont");
            }
            cWrap.animate({width: dimention["width"], height: dimention["height"]}, 300, function () {
                var edtMask = portal.frame.createEditMask(cWrap);

                cWrap.draggable({
                    disabled: disabledDnR,
                    handle: ".edit-mask",
                    onDrag: function (e) {
                        portal.frame.onDrag(e);
                    }
                }).resizable({
                    disabled: disabledDnR,
                    handles: "s,e,se",
                    onStartResize: function (e) {
                        cWrap.data("difObj", {
                            width: cWrap.width(),
                            height: cWrap.height()
                        });
                    },
                    onStopResize: function (e) {
                        portal.frame.onStopResize(e);
                        resizeDnR(cWrap);
                        if (cWrap.attr("is_main") === "1") {
                            var difObj = cWrap.data("difObj");
                            difObj.width = cWrap.width() - difObj.width;
                            difObj.height = cWrap.height() - difObj.height;
                            portal.frame.resizeWorkspace.call(cWrap.find(".layout-wrap"), true, false, difObj);
                        }
                    }
                });

                edtMask.bind("contextmenu", dnrContextMenu);

                if (isCont) {
                    var contTabWrap = $("<div class='cont-tab-wrap'></div>").appendTo(cBody),
                        contTabBody = $("<div class='cont-tab-body cont-panel-wrap'></div>").appendTo(contTabWrap),
                        compCfgs = sData.components;

                    contTabBody.droppable({
                        disabled: disabledDnR,
                        accept: ".menu-panel-wrap .menu-button",
                        onDrop: function (e, source) {
                            createMenuIcon($(this), $(source).data("menuData"));
                        }
                    }).show();

                    for (var i = 0, l = compCfgs.length; i < l; i++) {
                        var compCfg = compCfgs[i];
                        if (!compCfg["MENU_ID"] && compCfg["DIR_NAME"]) {
                            createDir(contTabBody, compCfg["DIR_NAME"]);
                            continue;
                        }
                        createMenuIcon(contTabBody, compCfg);
                    }
                    contTabBody.bind("contextmenu", dirContextMenu);
                } else {
                    if (cWrap.attr("is_main") === "1") {
                        buildMenuComp(cWrap);
                    } else {
                        portal.createIframe(cBody, {
                            width: dimention["width"],
                            height: cWrap.height() - cWrap.find(".comp-title").innerHeight(),
                            src: sData["MENU_LINK"]
                        });
                    }
                }

                var e = {data: {left: dimention["left"], top: dimention["top"], parent: parent, target: cWrap}};
                portal.frame.onDrag(e);
                portal.frame.onStopResize(e);
                resizeDnR(cWrap);

                if (disabledDnR) {
                    edtMask.hide();
                }

                if ($.isFunction(callback)) {
                    callback.call(cWrap, sData, isCont);
                }
            });

            return cWrap;

            function createDir(parent, dirName) {
                var menuDir = $("<div class='menu-button menu-button-dir'></div>"),
                    menuIco = $("<div class='menu-button-icon menu-icon-dir'></div>").appendTo(menuDir),
                    menuTxt = $("<div class='menu-button-bottom'></div>").text(dirName).appendTo(menuDir);

                menuDir.droppable({
                    disabled: parent.droppable("options").disabled,
                    accept: ".cont-panel-wrap .menu-button",
                    onDragEnter: function (e, s) {
                        $(s).draggable('proxy').removeClass("proxy-alpha");
                    },
                    onDragLeave: function (e, s) {
                        $(s).draggable('proxy').addClass("proxy-alpha");
                    },
                    onDrop: function (e, s) {
                        var dir = $(this),
                            source = $(s),
                            dirName = dir.find(".menu-button-bottom").text();
                        source.attr("dir_name", dirName).hide(200);
                    }
                }).click(function () {
                    portal.taskBar.minAllTask();
                    if (menuDir.data("window")) {
                        portal.taskBar.maxTask.call(menuDir.data("window"));
                        return false;
                    }

                    portal.taskBar.addTaskItem.call(null, menuTxt.text(), {
                        refTarget: menuDir,
                        title: menuTxt.text(),
                        minimizable: parent.droppable("options").disabled,
                        modal: !parent.droppable("options").disabled,
                        onOpen: function () {
                            var pBody = $(this).addClass("cont-panel-wrap"),
                                mIcons = parent.find(".menu-button[dir_name='" + menuTxt.text() + "']");

                            pBody.parent().addClass("menu-dir-win");
                            mIcons.each(function () {
                                var icon = $(this),
                                    cloneEle = icon.clone().removeClass("droppable").addClass("menu-button-indir").show();
                                cloneEle.data("real_ele", icon).appendTo(pBody);
                                if (!icon.droppable("options").disabled) {
                                    cloneEle.bind("contextmenu", dirContextMenu);
                                } else {
                                    cloneEle.click(function (e) {
                                        menuIconClick.call(this, e);
                                    });
                                }
                            });
                        }
                    });
                });

                menuDir.bind("contextmenu", dirContextMenu);
                menuDir.hide().prependTo(parent).show(300);
                return menuDir;
            }

            function createMenuIcon(parent, sMenuData) {
                if (!platData[sMenuData["MENU_PLAT"]]) {
                    return;
                }
                var menuIcon = $("<div class='menu-button'></div>"),
                    menuIco = $("<div class='menu-button-icon'></div>").addClass(sMenuData["MENU_ICO"]).appendTo(menuIcon),
                    menuTxt = $("<div class='menu-button-bottom'></div>").attr("title", sMenuData["MENU_NAME"] || sMenuData["TITLE"]).text(sMenuData["MENU_NAME"] || sMenuData["TITLE"]).appendTo(menuIcon);

                menuIcon.attr("menu_id", sMenuData["MENU_ID"]).attr("menu_ico", sMenuData["MENU_ICO"]);
                menuIcon.attr("menu_plat", sMenuData["MENU_PLAT"]).attr("is_main", platData[sMenuData["MENU_PLAT"]]["IS_MAIN"]).attr("menu_link", sMenuData["MENU_LINK"]);

                menuIcon.draggable({
                    disabled: parent.droppable("options").disabled,
                    cursor: "pointer",
                    revert: true,
                    proxy: function (target) {
                        return $(target).clone().removeClass("droppable").addClass("proxy-alpha").appendTo(parent);
                    }
                }).droppable({
                    disabled: parent.droppable("options").disabled,
                    accept: ".cont-panel-wrap .menu-button",
                    onDrop: function (e, s) {
                        $(s).insertBefore(this);
                    }
                }).click(function (e) {
                    if (!menuIcon.draggable("options").disabled) {
                        return false;
                    }
                    menuIconClick.call(this, e);
                }).data("menuData", sMenuData);

                menuIcon.bind("contextmenu", dirContextMenu);
                menuIcon.hide().appendTo(parent);
                if (sMenuData["DIR_NAME"]) {
                    menuIcon.attr("dir_name", sMenuData["DIR_NAME"]);
                } else {
                    menuIcon.show(300)
                }
                ;
                return menuIcon;
            }

            function menuIconClick(e) {
                var target = $(this),
                    menuTitle = target.find(".menu-button-bottom").text(),
                    isMain = "1" === target.attr("is_main");

                portal.taskBar.minAllTask();

                if (target.data("window")) {
                    portal.taskBar.maxTask.call(target.data("window"));
                    return false;
                }

                var opts = {
                    title: menuTitle,
                    width: $(window).width() - 100,
                    height: $(window).height() - 100,
                    minimizable: true,
                    onOpen: function () {
                        var pBody = $(this),
                            menuId = target.attr("menu_id"),
                            lWrap = $("<div class='layout-wrap'></div>").css({
                                width: pBody.width(),
                                height: pBody.height()
                            }).attr("menu_id", menuId);

                        if (isMain) {
                            portal.loadMenuCompCfg({
                                service: "P0004024",
                                MENU_ID: menuId,
                                USER_CODE: window.g_user["USER_CODE"] || ""
                            }, function (data) {
                                if (data && data.length > 0) {
                                    portal.buildAllComp(lWrap.appendTo(pBody), data, null, null);
                                }
                            });
                        } else {
                            pBody.find("iframe").wrap(lWrap);
                        }
                    }
                };
                portal.taskBar.addTaskItem.call(null, menuTitle, $.extend({refTarget: target}, opts, isMain ? {} : {url: target.attr("menu_link")}));
            }

            function buildMenuComp(cWrap) {
                var cbody = cWrap.find(".comp-body").empty(),
                    cfgData = cWrap.data("menuCompCfg"),
                    lWrap = $("<div class='layout-wrap'></div>").appendTo(cbody);
                if (cfgData) {
                    portal.buildAllComp(lWrap, cfgData, null, null);
                    return;
                }

                portal.loadMenuCompCfg({
                        service: "P0004024",
                        MENU_ID: cWrap.attr("menu_id"),
                        USER_CODE: window.g_user["USER_CODE"] || ""
                    },
                    function (data) {
                        if (data && data.length > 0) {
                            parent.data("menuCompCfg", data);
                            portal.buildAllComp(lWrap, data, null, null);
                        }
                    }, $.noop);
            }

            function resizeDnR(cWrap) {
                var cTitle = cWrap.find(">.comp-title"),
                    hasTitle = cTitle.is(":visible"),

                    cBody = cWrap.find(".comp-body"),
                    iframe = cWrap.find("iframe"),
                    contBody = cWrap.find(".cont-tab-body"),
                    edtMask = cWrap.find(".edit-mask");

                cWrapHeight = cWrap.height(),
                    cWrapWidth = cWrap.width(),
                    cBodyHeight = cWrapHeight - (hasTitle ? cTitle.innerHeight() : 0),


                    edtMask.width(cWrapWidth).height(cWrapHeight);
                cBody.width(cWrapWidth).height(cBodyHeight);
                contBody.width(cWrapWidth).height(cBodyHeight);
                iframe.attr("width", cWrapWidth).attr("height", cBodyHeight);
            }

            function dirContextMenu(e) {
                var target = $(this),
                    iconTxt = target.find(".menu-button-bottom"),

                    isDir = target.hasClass("menu-button-dir"),
                    isIconInDir = target.hasClass("menu-button-indir"),
                    isContPanel = target.hasClass("cont-panel-wrap"),

                    menu = $("<div style='width:100px'></div>"),
                    rename = $("<div id='rename'>修改标题</div>"),
                    add = $("<div id='add'>新建文件夹</div>"),
                    removeOut = $("<div id='removeOut'>移出文件夹</div>"),
                    menuSep = $("<div class='menu-sep'></div>"),
                    remove = $("<div id='remove' iconCls='icon-remove'>移除</div>"),

                    opHooks = {
                        add: function (cPar) {
                            prompt("新建", "请输入标题名称", function (v) {
                                if (v) {
                                    createDir(target, v);
                                }
                            }, function (v) {
                                return validInput(v) && !hasDir.call(target.find(".menu-button-dir"), v);
                            });
                        },
                        remove: function () {
                            var txt = iconTxt.text(),
                                iconsInDir = target.parent().find(".menu-button[dir_name='" + txt + "']");
                            if (isDir && iconsInDir.length) {
                                confirm("提示", "移除文件夹将删除文件夹中的所有快捷方式，是否继续？", function (flag) {
                                    if (flag) {
                                        iconsInDir.remove();
                                        target.hide(300, function () {
                                            target.remove();
                                        });
                                    }
                                });
                                return false;
                            }

                            if (isIconInDir) {
                                target.data("real_ele").remove()
                            }

                            target.hide(300, function () {
                                target.remove();
                            });
                        },
                        removeOut: function () {
                            target.data("real_ele").removeAttr("dir_name").show(300);
                            target.hide(300, function () {
                                target.remove();
                            });
                        },
                        rename: function () {
                            if (!isDir) {
                                prompt("重命名", "请输入标题名称", function (v) {
                                    if (v) {
                                        if (isIconInDir) {
                                            iconTxt.text(v).attr("title", v);
                                            target.data("real_ele").find(".menu-button-bottom").text(v).attr("title", v);
                                        } else {
                                            iconTxt.text(v).attr("title", v);
                                        }
                                    }
                                }, function (v) {
                                    return validInput(v);
                                });
                                return;
                            }

                            prompt("重命名", "请输入标题名称", function (v) {
                                if (v) {
                                    var prevTxt = iconTxt.text(),
                                        iconsInDir = target.parent().find(".menu-button[dir_name='" + prevTxt + "']");

                                    iconTxt.text(v).attr("title", v);
                                    iconsInDir.each(function () {
                                        $(this).attr("dir_name", v).find(".menu-button-bottom").attr("title", v);
                                    });
                                }
                            }, function (v) {
                                return validInput(v) && !hasDir.call(target.siblings(".menu-button-dir"), v);
                            });
                        }
                    };

                if (!isIconInDir && target.droppable("options").disabled) {
                    return;
                }

                if (isContPanel) {
                    menu.append(add);
                }
                else {
                    if (isIconInDir) {
                        menu.append(removeOut);
                    }
                    menu.append(rename).append(menuSep).append(remove);
                }
                portal.frame.showContextMenu.call(menu, opHooks, {left: e.pageX, top: e.pageY});
                return false;
            }

            function dnrContextMenu(e) {
                var target = $(this),
                    cPar = target.parent(),

                    isContMask = cPar.hasClass("comp-wrap-cont"),

                    cTitle = cPar.find(">.comp-title"),
                    isTitleVisible = cTitle.is(":visible");

                if (isContMask) {
                    return;
                }

                if (cPar.draggable("options").disabled) {
                    return;
                }

                var menu = $("<div style='width:100px;'></div>"),
                    rename = $("<div id='rename'>修改标题</div>"),
                    dispTitle = $("<div id='dispTitle'></div>").text(isTitleVisible ? "禁用标题" : "启用标题"),
                    menuSep = $("<div class='menu-sep'></div>"),
                    remove = $("<div id='remove' iconCls='icon-remove'>移除</div>"),

                    opHooks = {
                        rename: function () {
                            prompt("重命名", "请输入标题名称", function (v) {
                                if (v) {
                                    cTitle.text(v).attr("title", v);
                                }
                            }, function (v) {
                                return validInput(v);
                            });
                        },
                        dispTitle: function () {
                            var difObj = {width: 0};
                            if (cTitle.is(":visible")) {
                                cPar.addClass("comp-wrap-no-head");
                                cTitle.hide();
                                difObj["height"] = cTitle.innerHeight();
                            } else {
                                cPar.removeClass("comp-wrap-no-head");
                                cTitle.show();
                                difObj["height"] = -cTitle.innerHeight();
                            }
                            resizeDnR(cPar);
                            if (cPar.attr("is_main") === "1") {
                                portal.frame.resizeWorkspace.call(cPar.find(".layout-wrap"), true, false, difObj);
                            }
                        },
                        remove: function () {
                            cPar.hide(300, function () {
                                cPar.remove();
                            });
                        }
                    };

                if (isTitleVisible) {
                    menu.append(rename);
                }
                menu.append(dispTitle);
                menu.append(menuSep).append(remove);

                portal.frame.showContextMenu.call(menu, opHooks, {left: e.pageX, top: e.pageY});
                return false;
            }

            function validInput(v) {
                if (/[^\u4e00-\u9fa5\da-zA-Z\-\_\.]+/.test(v)) {
                    alert("输入的字符包含非法字符");
                    return false;
                }
                if (v.replace(/[^\x00-\xff]/g, "**").length > 64) {
                    alert("输入的字符必须小于等于32个中文字符或64个英文字符");
                    return false;
                }
                return true;
            }

            function hasDir(name, noPrompt) {
                if (this.filter(function () {
                    return $(this).find(".menu-button-bottom").text() === name;
                }).length) {
                    if (!noPrompt) {
                        alert("已经存在同名的文件夹");
                    }
                    return true;
                }
                return false;
            }
        },

        createUserPlat: function (parent) {
            var mainPanel = parent.find(".main-panel").addClass("main-panel-no-margin"),
                switchWrap = createSwitch(function () {
                    var platCfgData = portal.data("platCfgObj") || [],
                        index = $(this).attr("data-index"),
                        dropPanel = mainPanel.find(".drop-panel[data-index='" + index + "']");

                    createAllDnR(dropPanel.empty(), platCfgData[index] || []);
                    toggleDispToolBox(index, dropPanel);
                }, function () {
                    mainPanel.find(".drop-panel").hide();

                    var platCfgData = portal.data("platCfgObj") || [],
                        index = $(this).attr("data-index"),
                        dropPanel = mainPanel.find(".drop-panel[data-index='" + index + "']");

                    if (dropPanel.length) {
                        dropPanel.fadeIn(function () {
                            toggleDispToolBox(index, dropPanel);
                        });
                        return false;
                    }
                    createAllDnR(getDropPanel().attr("data-index", index).appendTo(mainPanel).show(), platCfgData[index] || []);
                    toggleDispToolBox(index, dropPanel);
                }).prependTo(mainPanel);

            switchWrap.css("left", mainPanel.width() / 2 - switchWrap.width() / 2);
            switchWrap.find(">div:first").click();

            function toggleDispToolBox(index, dropPanel) {
                var editWindow = $("#selfdefine_plat").data("editWindow");

                if (editWindow) {
                    editWindow.find("#disp_toolbox").attr("checked", dropPanel.find(".comp-wrap-cont").is(":visible"));
                }
            }

            function createAllDnR(dropPanel, platCfgData) {
                dropPanel.droppable({
                    accept: ".menu-panel-wrap .menu-button",
                    onDrop: function (e, source) {
                        var source = $(source),
                            menuData = source.data("menuData"),
                            cfgData = {
                                MENU_ID: menuData["MENU_ID"],
                                MENU_PLAT: menuData["MENU_PLAT"],
                                DISP_TITLE: 1,
                                TITLE: menuData["MENU_NAME"],
                                MENU_LINK: menuData["MENU_LINK"]
                            },
                            poffset = $(this).offset(),
                            soffset = source.draggable('proxy').offset(),
                            dimention = {};
                        dimention["left"] = soffset["left"] - poffset["left"];
                        dimention["top"] = soffset["top"] - poffset["top"];
                        dimention["width"] = 300;
                        dimention["height"] = 200;
                        portal.plat.createDnR.call(dropPanel, dimention, cfgData, false);
                    }
                });


                if (platCfgData && platCfgData.length) {
                    var priMenuData = portal.data("priMenuData"),
                        sCfg, isCont, components, hasAuth, pHeight, pWidth, dimention;

                    for (var i = 0, l = platCfgData.length; i < l; i++) {
                        sCfg = $.extend(true, {}, platCfgData[i]);	//deep copy
                        isCont = !!sCfg.components;
                        components = [];

                        if (isCont) {
                            for (var c = 0, cl = sCfg.components.length; c < cl; c++) {
                                hasAuth = !!$.grep(priMenuData, function (sData) {
                                    return sData["MENU_ID"] === sCfg.components[c]["MENU_ID"];
                                }).length;
                                if (hasAuth) {
                                    components.push(sCfg.components[c]);
                                }
                            }
                            sCfg.components = components;
                        } else {
                            hasAuth = !!$.grep(priMenuData, function (sData) {
                                return sData["MENU_ID"] === sCfg["MENU_ID"];
                            }).length;
                            if (!hasAuth) {
                                continue;
                            }
                        }

                        pHeight = dropPanel.height();
                        pWidth = dropPanel.width();
                        dimention = {
                            left: pWidth * parseFloat(sCfg["LEFT"]),
                            top: pHeight * parseFloat(sCfg["TOP"]),
                            width: pWidth * parseFloat(sCfg["WIDTH"]),
                            height: pHeight * parseFloat(sCfg["HEIGHT"])
                        };

                        portal.plat.createDnR.call(dropPanel, dimention, sCfg, !portal.plat.isEditable(), function (sCfg, isCont) {
                            if (isCont) {
                                var cWrap = this;
                                cWrap.css("display", JSON.parse(sCfg.showToolbox) ? "block" : "none");
                                cWrap.attr("showToolbox", sCfg.showToolbox);
                            }
                        });
                    }
                }
            }

            function createSwitch(reselect, select) {
                var switchWrap = $("<div class='self-plat-switch-wrap'></div>");
                for (var i = 0; i < 5; i++) {
                    var sItem = $("<div class='self-switch-item'></div>").text(i + 1).attr("data-index", i);
                    switchWrap.append(sItem);
                }
                switchWrap.draggable({
                    cursor: "normal",
                    onDrag: function (e) {
                        portal.frame.onDrag(e);
                    }
                });
                portal.regHoverEvent.call(switchWrap.find(">div"), "self-switch-item-selected", "self-switch-item-hover", reselect, select);
                return switchWrap;
            }

            function getDropPanel() {
                return mainPanel.clone().empty().hide().attr("class", "drop-panel").css("margin-left", "").css("margin-top", "").css("top", "");
            }
        },

        createEditPanel: function (parent, platLeafMenu) {
            parent.parent().css("z-index", "1").droppable({
                accept: ".menu-button",
                onDrop: function () {
                    return false;
                }
            });
            var mainPanel = portal.plat.getPlatMainPanel("-1"),
                platData = portal.data("plat_data"),

                sBoxHtml = "<div class='switch-box-btn switch-box-btn-left' title='上一页'></div>" +
                    "<div class='switch-box'></div>" +
                    "<div class='switch-box-btn switch-box-btn-right' title='下一页'></div>",
                sBoxWrap = $("<div class='menu-switch-box switch-box-wrap'></div>").appendTo(parent).html(sBoxHtml),
                sBox = sBoxWrap.find(".switch-box"),

                menuPanelWrap = $("<div class='menu-panel-wrap' style='z-index:1'></div>").appendTo(parent),

                edtFootWrap = $("<div class='edit-foot-wrap'></div>").appendTo(parent),

                dispToolbox;

            edtFootWrap.append("<div class='edit-foot-left'><input id='disp_toolbox' type='checkbox' />显示工具箱</div>");
            edtFootWrap.append("<div class='edit-foot-right'><a id='save'>保存</a></div>");

            dispToolbox = edtFootWrap.find("#disp_toolbox");
            dispToolbox.attr("checked", mainPanel.find(".drop-panel:visible").find(".comp-wrap-cont").is(":visible"));
            dispToolbox.click(function () {
                var chkBox = $(this),
                    dropPanel = mainPanel.find(".drop-panel:visible"),
                    toolBox = dropPanel.find(".comp-wrap-cont");

                if (!toolBox.length) {
                    var cfg = {
                            DISP_TITLE: "1",
                            TITLE: "工具箱",
                            LEFT: "0.7",
                            TOP: "0.55",
                            WIDTH: '0.3',
                            HEIGHT: "0.44",
                            components: []
                        },
                        dimention = {
                            left: dropPanel.width() * cfg.LEFT,
                            top: dropPanel.height() * cfg.TOP,
                            width: dropPanel.width() * cfg.WIDTH,
                            height: dropPanel.height() * cfg.HEIGHT
                        };

                    portal.plat.createDnR.call(dropPanel, dimention, cfg, false).attr("showToolbox", true);
                }

                var isChecked = $(this).is(":checked");
                toolBox.css("display", isChecked ? "block" : "none").attr("showToolbox", isChecked);
            });

            edtFootWrap.find("#save").linkbutton().click(function () {
                parent.window("close");
            });

            for (var k in platLeafMenu) {
                var leafMenuData = platLeafMenu[k],

                    sItem = $("<div class='switch-item'></div>").attr("plat_id", k).text(platData[k]["PLAT_NAME"]),

                    menuPanel = $("<div class='menu-panel'></div>").attr("plat_id", k).appendTo(menuPanelWrap).hide();
                ;

                sBox.append(sItem);
                for (var i = 0, l = leafMenuData.length; i < l; i++) {
                    var sMenuData = leafMenuData[i],
                        mIconWrap = $("<div class='menu-button'></div>").data("menuData", sMenuData);
                    sMenuData["MENU_ICO"] = sMenuData["MENU_ICO"] || "menu-button-tools";
                    mIcon = $("<div class='menu-button-icon'></div>").addClass(sMenuData["MENU_ICO"]).appendTo(mIconWrap),
                        mTxt = $("<div class='menu-button-bottom'></div>").attr("title", sMenuData["MENU_NAME"]).text(sMenuData["MENU_NAME"]).appendTo(mIconWrap);
                    menuPanel.append(mIconWrap);
                    mIconWrap.draggable({
                        offsetParent: false,
                        revert: true,
                        proxy: function () {
                            return $("<div class='menu-panel-wrap' style='z-index:10000'></div>").append($(this).clone()).appendTo("body").hide();
                        }
                    });
                }
            }
            portal.regHoverEvent.call(sBox.find(">div"), "switch-item-selected", "switch-item-hover", null,
                function () {
                    var pId = $(this).attr("plat_id");
                    menuPanelWrap.find(".menu-panel").hide();
                    menuPanelWrap.find(".menu-panel[plat_id='" + pId + "']").show();
                });
            portal.regScrollEvent.call(sBox, 3);
            sBox.find(">div:first").click();
        },

        createEditWindow: function (menuData) {
            var editWin = $("<div title='自定义平台编辑' resizable='false' closable='true' collapsible='false' minimizable='false' maximizable='false' modal='false'>");
            return editWin.window({
                width: 500,
                height: 280,
                onBeforeOpen: function () {
                    $(this).parent().addClass("window-toolbox");
                    portal.plat.setEditable(true);
                    var platLeafMenu = {};
                    //只保留叶子节点
                    for (var k in menuData) {
                        var mData = ((menuData[k]["2"] || {})["menuData"]) || [],
                            leaf = [];
                        for (var i = 0, l = mData.length; i < l; i++) {
                            if (isLeaf(mData[i]["MENU_ID"], mData)) {
                                leaf.push(mData[i]);
                            }
                        }
                        platLeafMenu[k] = leaf;
                    }

                    portal.plat.createEditPanel($(this).empty(), platLeafMenu);

                    function isLeaf(menuId, menuData) {
                        return !$.grep(menuData, function (sData) {
                            return sData["PAR_MENU"] === menuId;
                        }).length;
                    }
                },
                onBeforeClose: function () {
                    portal.plat.setEditable(false);
                    var platCfgObj = $.extend({}, portal.data("platCfgObj"), portal.plat.getUserPlatCfg());
                    portal.requestService({
                        service: "P0000172",
                        USER_CODE: window.g_user.USER_CODE, PLAT_CONFIG: encodeURI(JSON.stringify(platCfgObj))
                    }, function () {
                        portal.data("platCfgObj", platCfgObj);
                    });
                }
            });
        },

        createAllPlatMenu: function (menuData) {
            var platData = portal.data("plat_data"),
                priPlatData = portal.data("priPlatData"),
                commonCfgObj = portal.data("commonCfgObj"),
                sysParamObj = portal.data(portalConst.sysParamObjKey),
                sBox = $("#switch_box"),
                sPlatData, key,
                i = 0, l = priPlatData.length;

            for (; i < l; i++) {
                sPlatData = priPlatData[i];
                key = sPlatData["ID"];
                if (!platData[key]) {
                    continue;
                }

                if ("-1" === key) {
                    sBox.append(createSelfPlatItem());
                    continue;
                }
                if (!menuData[key]) {
                    delete platData[key];
                    continue;
                }
                var sItem = $("<div class='switch-item'></div>").text(sPlatData.PLAT_NAME);
                sItem.attr("title", sPlatData.PLAT_NAME).attr("plat_id", sPlatData.ID);

                if (platData[key].IS_MAIN) {
                    sItem.attr("is_main", sPlatData.IS_MAIN);
                }
                sBox.append(sItem);
            }

            portal.regHoverEvent.call(sBox.find(">div"), "switch-item-selected", "switch-item-hover", null,
                function (e, menuId) {
                    var pItem = $(this),
                        platId = pItem.attr("plat_id"),
                        platData = portal.data("plat_data")[platId];

                    //平台切换的时候需要认证
                    if (platData["IS_VALIDATE"] === "1" && !pItem.attr("is-authed")) {
                        portal.requestService($.extend({service: platData["VALIDATE_CODE"]}, portal.data("loginData"), {USER_ROLE: 2}), function (data) {
                            if (data[0][0]) {
                                window.g_user["userTicket"] = data[0][0]["USER_TICKET_INFO"] || "";
                                pItem.attr("is-authed", "true");
                                switchItemClick.call(this, e);
                            } else {
                                alert(platData["PLAT_NAME"] + "平台认证失败！");
                            }
                        }, function () {
                            e.data.cancelClick();
                        });
                    } else {
                        switchItemClick.call(this, e);
                    }

                    function switchItemClick(e) {
                        var instWrap = portal.plat.getAllPlatWrap(),
                            pInst = $(),
                            taskStateObj = portal.data("taskStateObj"),
                            vIsMain = pItem.attr("is_main"),
                            bIsMain = "1" === vIsMain,
                            isSelf = "-1" === platId,
                            taskState = portal.taskBar.getTaskState(e.data.getPrevItem().attr("plat_id"));

                        //保存任务栏状态
                        if (taskState) {
                            portal.data("taskStateObj", $.extend({}, taskStateObj, taskState));
                        }
                        portal.taskBar.minAllTask(e.data.getPrevItem().attr("plat_id"));

                        instWrap.find(">div").hide();
                        pInst = portal.plat.getPlatInstance(platId);

                        var edtWin = $("#selfdefine_plat").data("editWindow") || $();
                        if ("-1" === platId) {
                            if (portal.plat.isEditable()) {
                                edtWin.window("open", true);
                            }
                        } else {
                            edtWin.window("close", true);
                        }

                        if (pInst.length) {
                            pInst.show();
                            //恢复任务栏
                            if (taskStateObj && taskStateObj[platId]) {
                                portal.taskBar.recoverTask(platId, taskStateObj[platId]);
                            }
                            portal.frame.openMenu(menuId, platId);
                            return false;
                        }

                        var newInst = portal.plat.createPlatInstance.call(instWrap, bIsMain, isSelf),
                            fMenuData = (function () {
                                try {
                                    return menuData[platId]["2"].menuData;
                                } catch (e) {
                                    return [];
                                }
                            })(),
                            mBox = newInst.find(".left-menu-box");

                        newInst.removeAttr("id").attr("plat_id", platId).attr("is_main", vIsMain).fadeIn();

                        if (isSelf) {	//自定义平台
                            portal.plat.createUserPlat(newInst);
                        } else {
                            if (bIsMain) {	//主平台加载拖拽设计的门户菜单
                                portal.createFrontMenu(fMenuData, parseInt((newInst.find(".left-toolbar").height() - 20 - 36) / 75)).appendTo(mBox);
                                portal.regHoverEvent.call(mBox.find(".menu-button"), "menu-button-selected", "menu-button-hover",
                                    function (e) {
                                        portal.plat.leftMenuClick.call(this, e, true, fMenuData);
                                    }, function (e) {
                                        portal.plat.leftMenuClick.call(this, e, true, fMenuData);
                                    });
                            } else {
                                top.window.userAuthMenu=fMenuData;
                                mBox.scrollbox({scrollSize: 9, overflow: "y"}).append($("<ul></ul>").tree($.extend({
                                    data: window.isKjdp ? $.grep(fMenuData, function (sData) {
                                        return sData.MENU_LVL.length !== 4;
                                    }) : fMenuData,
                                    onClick: function (node) {
                                        if (!node) {
                                            return false;
                                        }
                                        var target = $(node.target),
                                            ulTree = $(this);
                                        if (node.children && node.children.length) {
                                            //by hurf 20160707 点击一个一级菜单，关闭其他一级菜单
                                            target.parent().siblings().each(function () {
                                                ulTree.tree("collapse", $(this).find(">.tree-node"));
                                            });
                                            ulTree.tree('toggle', target);
                                            return false;
                                        }
                                        portal.plat.leftMenuClick.call(target, node, false, fMenuData);
                                    }
                                }, window.sysConf["treeConf"])));
                            }
                            portal.frame.openMenu(menuId, platId);
                        }

                        portal.frame.setPlatBackgroundImage(platId, commonCfgObj);
                    }
                });
            portal.regScrollEvent.call(sBox, parseInt((sBox.parent().width() - 27 * 2) / 100));
            var defaultPlat;
            if (commonCfgObj.defaultPlat && (defaultPlat = sBox.find(">div[plat_id='" + commonCfgObj.defaultPlat + "']")).length) {
                defaultPlat.click();
            } else {
                sBox.find(">div:first").click();
            }

            if (isKjdp && 1 === sBox.find(".switch-item").length &&
                sysParamObj["OPP_DEFAULT_MENU_ID"] && "-1" !== sysParamObj["OPP_DEFAULT_MENU_ID"]) {
                this.getPlatInstance().find(".menu-button[menu_id='" + sysParamObj["OPP_DEFAULT_MENU_ID"] + "']").click();
            }

            $("#front_background_image").fadeOut();
            $k.config.theme = commonCfgObj.defaultSkin;

            if (!isKjdp && sysConf.welcome && $.isFunction(sysConf.welcome)) {
                var welInfo = sysConf.welcome();
                if (welInfo) {
                    portal.addTab(welInfo.title, welInfo.url, false);
                }
            }

            function createSelfPlatItem() {
                var selfDefItem = $("<div class='switch-item' title='自定义平台' plat_id='-1'><span class='self-plat-text'>自定义平台</span></div>"),
                    selfDefBtn = $("<span id='selfdefine_plat' class='switch-btn icon-front-edit' title='编辑'></span>").appendTo(selfDefItem);
                selfDefBtn.click(function () {
                    var btn = $(this),
                        parent = btn.parent();
                    if (!parent.hasClass("switch-item-selected")) {
                        parent.click();
                    } else {
                        function openEditWindow() {
                            if (!selfDefBtn.data("editWindow")) {
                                selfDefBtn.data("editWindow", portal.plat.createEditWindow(menuData));
                            } else {
                                selfDefBtn.data("editWindow").dialog("open");
                            }
                        }

                        if (portal.taskBar.hasTask()) {
                            confirm("提示", "编辑自定义桌面将关闭所有您正在处理的任务，是否继续？", function (flag) {
                                if (flag) {
                                    if (portal.taskBar.closeAllTask()) {
                                        openEditWindow();
                                    }
                                }
                            });
                        } else {
                            openEditWindow();
                        }
                    }
                    return false;
                });

                return selfDefItem;
            }
        },

        leftMenuClick: function (arg, isMain, menuData) {
            var target = $(this),
                menuId = isMain ? target.attr("menu_id") : arg.id;
            sMenuData = $.grep(menuData, function (sData, i) {
                return sData.MENU_ID === menuId;
            })[0];

            if (!sMenuData) {
                alert("获取菜单数据失败");
                return false;
            }
            buildMainPanel(isMain, sMenuData);

            function buildMainPanel(isMain, sMenuData) {
                var mainPanel = portal.plat.getPlatMainPanel(),
                    existWrap = mainPanel.find(".layout-wrap[menu_id='" + sMenuData.MENU_ID + "']"),
                    lWrap = $("<div class='layout-wrap'></div>").attr("menu_id", sMenuData.MENU_ID);

                portal.taskBar.minAllTask();

                if (existWrap.length > 0) {
                    portal.taskBar.maxTask.call(existWrap);
                    return false;
                }

                lWrap.appendTo(mainPanel).show().siblings().hide();

                if (isMain) {
                    lWrap.addClass("panel-loading");
                    portal.loadMenuCompCfg({
                        service: "P0004024",
                        MENU_ID: sMenuData.MENU_ID,
                        USER_CODE: g_user["USER_CODE"]
                    }, function (data) {
                        lWrap.removeClass("panel-loading");
                        if (data && data.length > 0) {
                            portal.taskBar.addTaskItem.call(lWrap, sMenuData.MENU_NAME);
                            portal.buildAllComp(lWrap.empty(), data, null, {F_MENU_PLAT: portal.plat.getCurrentPlatId()});
                            setTimeout(function () {
                                portal.plat.setToolboxPromptIcon();
                            }, 500);

                        } else {
                            alert("未能获取到菜单组件配置");
                            lWrap.remove();
                        }
                    }, function () {
                        lWrap.removeClass("panel-loading");
                        alert("未能获取到菜单组件配置");
                    });
                } else {
                    if (sMenuData.MENU_LINK) {
                        portal.taskBar.addTaskItem.call(lWrap, sMenuData.MENU_NAME);

                        var iframeOpts = {
                            src: portal.buildURL(sMenuData.MENU_LINK, {
                                "menuId": sMenuData.MENU_ID,
                                "CHK_FLAG": sMenuData.CHK_FLAG,
                                "F_SUBSYS": sMenuData.SUBSYS,
                                "F_MENU_PLAT": sMenuData.MENU_PLAT,
                                "_": $.now()
                            }),
                            width: mainPanel.width() - 25,
                            height: mainPanel.height() - 20
                        };

                        lWrap.width(iframeOpts.width + 10).height(iframeOpts.height + 5);
                        portal.createIframe(lWrap, iframeOpts);
                    } else {
                        alert("此功能尚未实现！");
                        lWrap.remove();
                    }
                }
            }
        }
    });

    $.extend(kPortal.fn.taskBar, {

        uuid: 0,

        isTaskSelected: function (menuId) {
            var wrap = portal.plat.getAllPlatWrap().find(".layout-wrap").filter(function () {
                return $(this).attr("menu_id") === menuId;
            });

            if (!wrap.length) {
                return false;
            }
            return wrap.data("item").hasClass("task-bar-item-selected");
        },

        getTaskItem: function (uuid) {
            return portal.plat.getPlatInstance().find(".task-bar-items>div[uuid='" + uuid + "']");
        },

        closeAllTask: function (platId) {
            var flag = true,
                taskItems = portal.plat.getPlatInstance(platId).find(".bottom-bar").find(".task-bar-item");

            taskItems.each(function () {
                return flag = portal.taskBar.closeTask.call($(this),true);
            });
            if (flag) {
                this.repaintTaskBar();
            }
            return flag;
        },

        hasTask: function (platId) {
            return !!portal.plat.getPlatInstance(platId).find(".task-bar-items>div").length;
        },

        addTaskItem: function (title, winOpts, closable, uuid) {
            var relatedEle = $(this),
                pInst = portal.plat.getPlatInstance(),
                taskItemWrap = $(".task-bar-items", pInst),
                item = $("<div class='task-bar-item'></div>"),
                taskMenu = $("#task_menu"),

                closable = "undefined" === $.type(closable) ? true : !!closable,
                menu = taskMenu.length ? taskMenu :
                    $("<div id='task_menu'>" +
                        "<div id='max'>最大化</div>" +
                        "<div id='min'>最小化</div>" +
                        "<div class='menu-sep'></div>" +
                        "<div id='close_right'>关闭右侧</div>" +
                        "<div id='close_left'>关闭左侧</div>" +
                        "<div class='menu-sep'></div>" +
                        "<div id='close_other'>关闭其他</div>" +
                        "<div id='close_all'>关闭全部</div>" +
                        "<div id='close'>关闭</div>" +
                        "<div class='menu-sep'></div>" +
                        //"<div id='refresh'>刷新</div>" +
                        "</div>"),

                opHooks = {
                    max: function (item, cPar) {
                        cPar.click();
                    },
                    min: function (item, cPar) {
                        portal.taskBar.minTask.call(cPar);
                    },
                    close_right: function (item, cPar) {
                        cPar.nextAll().each(function () {
                            return portal.taskBar.closeTask.call($(this));
                        });
                    },
                    close_left: function (item, cPar) {
                        cPar.prevAll().each(function () {
                            return portal.taskBar.closeTask.call($(this));
                        });
                    },
                    close_other: function (item, cPar) {
                        cPar.siblings().each(function () {
                            return portal.taskBar.closeTask.call($(this));
                        });
                    },
                    close_all: function (item, cPar) {
                        portal.taskBar.closeAllTask();
                    },
                    close: function (item, cPar) {
                        portal.taskBar.closeTask.call(cPar);
                    },
                    refresh: function (item, cPar) {
                        portal.taskBar.maxTask.call(cPar);
                        portal.taskBar.refreshTask.call(cPar);
                    }
                };

            if (winOpts) {
                var refTarget = winOpts.refTarget ? $(winOpts.refTarget) : null,
                    w = $(window).width(),
                    h = $(window).height();

                relatedEle = portal.openWindow($.extend({}, {
                    width: w < 600 ? w - 50 : 600,
                    height: h < 400 ? h - 50 : 400,
                    onMinimize: function () {
                        portal.taskBar.minTask.call(this);
                    },
                    onBeforeDestroy: function () {
                        if (winOpts.menuId) {
                            delete portal.taskBar.tabCache[winOpts.menuId];
                        } else if (refTarget) {
                            refTarget.removeData("window");
                        }
                    },
                    onBeforeClose: function () {
                        if (winOpts.menuId) {
                            delete portal.taskBar.tabCache[winOpts.menuId];
                        } else if (refTarget) {
                            refTarget.removeData("window");
                        }
                        return portal.taskBar.closeTask.call(this);
                    },
                    onStartDrag: function () {
                        portal.taskBar.maxTask.call(this);
                    }
                }, winOpts, {
                    onOpen: function () {
                        if (!$(this).data("item")) {
                            (winOpts.onOpen || $.noop).apply(this, arguments);
                        }
                    }
                }));
                if (!winOpts.menuId && refTarget) {
                    refTarget.data("window", relatedEle);
                } else {
                    portal.taskBar.tabCache[winOpts.menuId] = relatedEle;
                }


            }

            item.append("<span class='task-title'>" + title + "</span>").attr("title", title).attr("ori_title", title).data("related", relatedEle).appendTo(taskItemWrap);

            relatedEle.data("item", item);

            if (closable) {
                $("<span class='task-close' title='关闭'></span>").prependTo(item).click(function () {
                    portal.taskBar.closeTask.call($(this).parent());
                    return false;
                });
            } else {
                item.attr("cantClose", "1");
            }

            portal.regHoverEvent.call(taskItemWrap.find(">div").removeClass("task-bar-item-selected"),
                "task-bar-item-selected", "task-bar-item-hover",
                function (e) {
                    portal.taskBar.minTask.call(this);
                    return true;
                }, function (e) {
                    e.data.cancelClick();
                    portal.taskBar.maxTask.call(this);
                }, menu.menu({
                    onShow: function (item) {
                        var menu = $(this),
                            cPar = menu.data("menu").contextParent,
                            related = cPar.data("related");

                        minItem = menu.find("#min");
                        maxItem = menu.find("#max");
                        refreshItem = menu.find("#refresh");

                        menu.menu("enableItem", refreshItem);
                        if (related.find("iframe").length !== 1) {
                            menu.menu("disableItem", refreshItem);
                        }
                        menu.menu("disableItem", minItem);
                        menu.menu("disableItem", maxItem);
                        menu.menu("enableItem", related.is(":visible") ? minItem : maxItem);
                    },
                    onClick: function (item) {
                        (opHooks[item.id] || $.noop).apply($(this), [item, $(this).data("menu").contextParent]);
                    }
                }), function () {
                    if ($(this).attr("cantClose")) {
                        return false;
                    }
                });

            item.addClass("task-bar-item-selected").attr("uuid", uuid || ++portal.taskBar.uuid);
            portal.taskBar.repaintTaskBar();
            return portal.taskBar.uuid;
        },

        getTaskObjByWindow: function (framewindow) {
            var frameEle = $(framewindow.frameElement),
                isWindowTab = !frameEle.closest(".layout-wrap").length;
            return portal.taskBar.getTaskObj(isWindowTab ? frameEle.parent() : frameEle.closest(".layout-wrap"));
        },

        getTaskObj: function (taskDom) {
            var isTaskItem = !!taskDom.data("related"),
                related = isTaskItem ? taskDom.data("related") : taskDom,
                item = isTaskItem ? taskDom : related.data("item");

            return {
                related: related,
                item: item
            };
        },

        setTaskUUID: function (uuid) {
            portal.taskBar.getTaskObj($(this)).item.attr("uuid", uuid || ++portal.taskBar.uuid);
        },

        renameTask: function (title) {
            var taskObj = portal.taskBar.getTaskObj($(this)),
                item = taskObj.item,
                title = title || item.attr("ori_title");
            item.attr("title", title).find(".task-title").text(title);
        },

        repaintTaskBar: function () {
            var pInst = portal.plat.getPlatInstance(),
                bottomBar = $(".bottom-bar", pInst),
                taskItemWrap = $(".task-bar-items", pInst);
            portal.regScrollEvent.call(taskItemWrap, parseInt((bottomBar.width() - 2 * 32) / 114));
        },

        minTask: function () {
            var taskObj = portal.taskBar.getTaskObj($(this)),
                item = taskObj.item,
                related = taskObj.related;

            if (related.hasClass("layout-wrap")) {
                related.hide();
            } else {
                related.window("close", true);
            }
            item.removeClass("task-bar-item-selected");
        },

        maxTask: function () {
            var taskObj = portal.taskBar.getTaskObj($(this)),
                item = taskObj.item,
                related = taskObj.related;

            if (!item.hasClass("task-bar-item-selected")) {
                portal.taskBar.minAllTask();
                if (related.hasClass("layout-wrap")) {
                    related.show();
                } else {
                    related.window("open");
                }
                item.addClass("task-bar-item-selected");
                if (!item.is(":visible")) {
                    portal.taskBar.repaintTaskBar();
                }
            }
        },

        refreshTask: function () {
            var taskObj = portal.taskBar.getTaskObj($(this)),
                related = taskObj.related;

            related.find("iframe").each(function () {
                this.contentWindow.location.reload();
            });
        },

        closeTask: function (isCloseAll) {
            var taskObj = portal.taskBar.getTaskObj($(this)),
                item = taskObj.item,
                related = taskObj.related,
                taskItemWrap = item.parent(),
                prevSelectedItem = taskItemWrap.data(portalConst.prevSelectedItem),

                iframe = related.find("iframe"),
                i = 0,
                l = iframe.length,
                unloadResult,
                hasCancle = false;

            if (item.attr("cantClose") && isCloseAll !=true) {
                return;
            }
            for (; i < l; i++) {
                if (!(function (frame) {
                    try {
                        var onbeforeunload = frame.contentWindow.onbeforeunload,
                            onunload = frame.contentWindow.onunload;
                        if ($.isFunction(onbeforeunload)) {
                            unloadResult = onbeforeunload();
                            if (unloadResult) {
                                portal.taskBar.maxTask.call(item);
                                if (!$confirm(unloadResult + "\n\n确定要离开此页吗？")) {
                                    return false;
                                }
                            }
                        }

                        if ($.isFunction(onunload)) {
                            onunload();
                        }
                    } catch (e) {
                    }

                    return true;
                })(iframe[i])) {
                    hasCancle = true;
                    break;
                }
            }

            if (hasCancle) {	//点了取消按钮，不关闭任务栏
                return false;
            } else {
                for (i = 0; i < l; i++) {
                    try {
                        iframe[i].contentWindow.onbeforeunload = null;
                        iframe[i].contentWindow.onunload = null;
                        portal.removeIframe(iframe[i]);
                    } catch (e) {
                    }
                }
            }

            if (related.hasClass("layout-wrap")) {
                related.remove();
            } else {
                related.window("destroy");
            }
            item.remove();
            portal.taskBar.repaintTaskBar();

            if (item.hasClass("task-bar-item-selected") &&
                prevSelectedItem && prevSelectedItem.length && !prevSelectedItem.hasClass("task-bar-item-selected")) {
                prevSelectedItem.click();
            }
            return true;
        },

        minAllTask: function (platId) {
            var taskItemWrap = portal.plat.getPlatInstance(platId).find(".task-bar>div.task-bar-items");
            taskItemWrap.data(portalConst.prevSelectedItem, taskItemWrap.find(">div.task-bar-item-selected"));
            taskItemWrap.find(">div.task-bar-item").each(function () {
                var related = $(this).removeClass("task-bar-item-selected").data("related");
                if (related && !related.hasClass("layout-wrap")) {
                    related.window("close", true);
                } else {
                    related.hide();
                }
            });
        },

        getSelectedTask: function () {
            var sTask = $();
            portal.plat.getPlatInstance().find(".bottom-bar").find(".task-bar-item").each(function () {
                var taskItem = $(this);
                if (taskItem.hasClass("task-bar-item-selected")) {
                    sTask = taskItem;
                    return false;
                }
            });
            return sTask;
        },

        getTaskState: function (platId) {
            if (!platId) {
                return null;
            }

            var pInst = portal.plat.getPlatInstance(platId),
                platId = pInst.attr("plat_id"),
                stateObj = {},
                stateArr = [];

            if (!pInst.length) {
                return null;
            }

            stateObj[platId] = stateArr;
            pInst.find(".bottom-bar").find(".task-bar-item").each(function () {
                var target = $(this),
                    related = target.data("related");
                stateArr.push({
                    isWindow: !related.hasClass("layout-wrap"),
                    isVisible: related.is(":visible"),
                    isSelected: target.hasClass("task-bar-item-selected")
                });
            });
            return stateArr.length ? stateObj : null;
        },

        recoverTask: function (platId, stateArray) {
            var pInst = portal.plat.getPlatInstance(platId);
            pInst.find(".bottom-bar").find(".task-bar-item").each(function (i) {
                var target = $(this),
                    related = target.data("related"),
                    stateObj = stateArray[i];

                if (!stateObj.isVisible) {
                    return true;
                }

                if (stateObj.isSelected) {
                    target.addClass("task-bar-item-selected");
                }

                if (stateObj.isWindow) {
                    related.window("open", true);
                } else {
                    related.show();
                }
            });
        },

        replaceTaskURL: function (taskItem, url) {
            taskItem.data("related").find("iframe").attr("src", url);
        },

        tabCache: {}
    });

    portal = window.mainFrame = kPortal();
})(jQuery, window);

/*
 *
 功能：查询选择年份节假日信息
 */
function qryYearHolidays(year) {
    //查询当前选择年份中的节假日信息
    var selectYearHolidays = commonRequest({
        service: 'M0001000',
        TRD_DATE_FLAG: '0',
        YEAR_LIKE: year
    });
    return selectYearHolidays
}