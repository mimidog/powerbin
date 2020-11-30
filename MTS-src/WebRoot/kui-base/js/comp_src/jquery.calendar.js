/**
 * calendar - KINGDOM-UI 
 * 
 * Copyright (c) 2009-2013 www.szkingdom.com. All rights reserved.
 * 
 * Dependencies:
 * 
 */
(function($) {

    $.fn.calendar = function(options, param) {
        if (typeof options == 'string') {
            return $.fn.calendar.methods[options](this, param);
        }

        options = options || {};
        return this.each(function() {
            var state = $.data(this, 'calendar');
            if (state) {
                $.extend(state.options, options);
            } else {
                state = $.data(this, 'calendar', {
                    options: $.extend({},
                    $.fn.calendar.defaults, $.fn.calendar.parseOptions(this), options)
                });
                init(this);
            }
            if (state.options.border == false) {
                $(this).addClass('calendar-noborder');
            }
            setSize(this);
            show(this);

            if(state.options.selectDay) {
                $(this).find('div.calendar-menu').hide();
            } else {
                $(this).find('div.calendar-menu').show();
                $(this).find(".calendar-body >table:first").hide();
            }

        });
    };

    $.fn.calendar.methods = {
        options: function(jq) {
            return $.data(jq[0], 'calendar').options;
        },
        resize: function(jq) {
            return jq.each(function() {
                setSize(this);
            });
        },
        moveTo: function(jq, date) {
            return jq.each(function() {
                $(this).calendar({
                    year: date.getFullYear(),
                    month: date.getMonth() + 1,
                    current: date
                });
            });
        },
		setMaxDate: function(jq,date) {
            return jq.each(function() {
				var t = $(this).find('div.calendar-body').find('>table');
				var opts = $.data(jq[0], 'calendar').options;
				if(date=='max')	date = 99999999;
				opts.max=date;
                setMaxDate(this,t,dateParser(date));
            });
        },
		setMinDate: function(jq,date) {
            return jq.each(function() {
				var t = $(this).find('div.calendar-body').find('>table');
				var opts = $.data(jq[0], 'calendar').options;
				if(date=='min')	date = 10000000;
				opts.min=date;
                setMinDate(this,t,dateParser(date));
            });
        }
    };

    $.fn.calendar.parseOptions = function(target) {
        var t = $(target);
        return $.extend({},
        $.parser.parseOptions(target, ['width', 'height', {
            firstDay: 'number',
            fit: 'boolean',
            border: 'boolean'
        }]));
    };

    $.fn.calendar.defaults = {
        selectDay: true,
        width: 180,
        height: 180,
        fit: false,
        border: true,
        firstDay: 0,
        weeks: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        current: new Date(),
        min: "",
        max: "",
        disableDates:[],
        onSelect: function(date) {}
    };
    function setSize(target) {
        var opts = $.data(target, 'calendar').options;
        var t = $(target);
        if (opts.fit == true) {
            var p = t.parent();
            opts.width = p.width();
            opts.height = p.height();
        }
        var header = t.find('.calendar-header');
        t._outerWidth(opts.width);
        t._outerHeight(opts.height);

        var body = $(target).find('.calendar-body');
        var sele = $(target).find('.calendar-menu');
        var seleYear = sele.find('.calendar-menu-year-inner');
        var seleMonth = sele.find('.calendar-menu-month-inner');

        body._outerHeight(t.height() - header._outerHeight());

        sele._outerWidth(body._outerWidth());
        sele._outerHeight(body._outerHeight());
        seleMonth._outerHeight(sele.height() - seleYear._outerHeight() - (opts.selectDay ? 20 : 0));
    }


    function init(target) {
        var opts = $.data(target, 'calendar').options;
        $(target).addClass('calendar').wrapInner('<div class="calendar-header">' + '<div class="calendar-prevmonth"></div>' + '<div class="calendar-nextmonth"></div>' + '<div class="calendar-prevyear"></div>' + '<div class="calendar-nextyear"></div>' + '<div class="calendar-title">' + '<span>Aprial 2010</span>' + '</div>' + '</div>' + '<div class="calendar-body">' + '<div class="calendar-menu">' + '<div class="calendar-menu-year-inner">' + '<span class="calendar-menu-prev"></span>' + '<span><input class="calendar-menu-year" type="text"/></span>' + '<span class="calendar-menu-next"></span>' + '</div>' + '<div class="calendar-menu-month-inner">' + '</div>' + '</div>' + '</div>');

        var t = $('<table></table>').appendTo($(target).find('.calendar-menu-month-inner'));
        var idx = 0;
        for (var i = 0; i < 3; i++) {
            var tr = $('<tr></tr>').appendTo(t);
            for (var j = 0; j < 4; j++) {
                $('<td class="calendar-menu-month"></td>').html(opts.months[idx++]).attr('abbr', idx).appendTo(tr);
            }
        }

        $(target).find('.calendar-menu-prev,.calendar-menu-next').hover(function() {
            $(this).addClass('calendar-menu-hover');
        }, function() {
            $(this).removeClass('calendar-menu-hover');
        });

        $(target).find('.calendar-menu-next').click(function() {
            var y = $(target).find('.calendar-menu-year');
            var v=y.val()==""?opts.year:y.val();
            if (!isNaN(v)) {
                y.val(parseInt(v) + 1);
            }
        });

        $(target).find('.calendar-menu-prev').click(function() {
            var y = $(target).find('.calendar-menu-year');
            var v=y.val()==""?opts.year:y.val();
            if (!isNaN(v)) {
                y.val(parseInt(v) - 1);
            }
        });

        $(target).find('.calendar-menu-year').textinput({
            maxLength:4
        });

        $(target).find('.calendar-menu-year').keypress(function(e) {
            if (e.keyCode == 13) {
                setDate();
            }
            var keyCode = event.keyCode;
            if ((keyCode >= 48 && keyCode <= 57)){
                event.returnValue = true;
            } else {
                event.returnValue = false;
            }
        });

        $(target).find('.calendar-menu-month').hover(function() {
            $(this).addClass('calendar-menu-hover');
        }, function() {
            $(this).removeClass('calendar-menu-hover');
        }).click(function() {
            var menu = $(target).find('.calendar-menu');
            menu.find('.calendar-selected').removeClass('calendar-selected');
            $(this).addClass('calendar-selected');
            setDate();

            if(!opts.selectDay) {
                opts.onSelect.call(target, new Date(opts.year, parseInt(opts.month) - 1));
            }

            //opts.onClick.call();

            function setDate() {
                var menu = $(target).find('.calendar-menu');
                var year = menu.find('.calendar-menu-year').val();
                year==""?year=opts.year:year;
                var month = menu.find('.calendar-selected').attr('abbr');
                if (!isNaN(year)) {
                    opts.year = parseInt(year);
                    opts.month = parseInt(month);
                    if(opts.selectDay) {
                        show(target);
                    }
                }

                if(opts.selectDay) {
                    menu.hide();
                }
            }
        });

        var sele = $(target).find('.calendar-menu');
        var seleYear = sele.find('.calendar-menu-year-inner');
        var seleMonth = sele.find('.calendar-menu-month-inner');
        seleYear.find('input').val(opts.year).focus();
        seleMonth.find('td.calendar-selected').removeClass('calendar-selected');
        seleMonth.find('td:eq(' + (opts.month - 1) + ')').addClass('calendar-selected');

        $(target).find('.calendar-title span').hover(function() {
            $(this).addClass('calendar-menu-hover');
        }, function() {
            $(this).removeClass('calendar-menu-hover');
        }).click(function() {

            if(!opts.selectDay) {
                return;
            }
            var menu = $(target).find('.calendar-menu');
            if (menu.is(':visible')) {
                menu.hide();
            } else {
                menu.show();
            }
        });

        $('.calendar-prevmonth,.calendar-nextmonth,.calendar-prevyear,.calendar-nextyear', target).hover(function() {
            $(this).addClass('calendar-nav-hover');
        },
        function() {
            $(this).removeClass('calendar-nav-hover');
        });
        $(target).find('.calendar-nextmonth').click(function() {
            showMonth(target, 1);
        });
        $(target).find('.calendar-prevmonth').click(function() {
            showMonth(target, -1);
        });
        $(target).find('.calendar-nextyear').click(function() {
            showYear(target, 1);
        });
        $(target).find('.calendar-prevyear').click(function() {
            showYear(target, -1);
        });

        $(target).bind('_resize', function() {
            if (opts.fit == true) {
                setSize(target);
            }
            return false;
        });
    }
    /**
	 * show the calendar corresponding to the current month.
	 */
    function showMonth(target, delta) {
        var opts = $.data(target, 'calendar').options;
        opts.month += delta;
        if (opts.month > 12) {
            opts.year++;
            opts.month = 1;
        } else if (opts.month < 1) {
            opts.year--;
            opts.month = 12;
        }
        show(target);
        var menu = $(target).find('.calendar-menu-month-inner');
        menu.find('td.calendar-selected').removeClass('calendar-selected');
        menu.find('td:eq(' + (opts.month - 1) + ')').addClass('calendar-selected');
        opts.onClick.call();
    }

    /**
	 * show the calendar corresponding to the current year.
	 */
    function showYear(target, delta) {
        var opts = $.data(target, 'calendar').options;
        opts.year += delta;
        show(target);

        var menu = $(target).find('.calendar-menu-year');
        menu.val(opts.year);
        opts.onClick.call();
    }

    /**
	 * get weeks data.
	 */
    function getWeeks(target, year, month) {
        var opts = $.data(target, 'calendar').options;
        var dates = [];
        var lastDay = new Date(year, month, 0).getDate();
        for (var i = 1; i <= lastDay; i++) dates.push([year, month, i]);

        // group date by week
        var weeks = [],
        week = [];
        //		var memoDay = 0;
        var memoDay = -1;
        while (dates.length > 0) {
            var date = dates.shift();
            week.push(date);
            var day = new Date(date[0], date[1] - 1, date[2]).getDay();
            if (memoDay == day) {
                day = 0;
            } else if (day == (opts.firstDay == 0 ? 7 : opts.firstDay) - 1) {
                weeks.push(week);
                week = [];
            }
            memoDay = day;
        }
        if (week.length) {
            weeks.push(week);
        }

        var firstWeek = weeks[0];
        if (firstWeek.length < 7) {
            while (firstWeek.length < 7) {
                var firstDate = firstWeek[0];
                var date = new Date(firstDate[0], firstDate[1] - 1, firstDate[2] - 1);
                firstWeek.unshift([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
            }
        } else {
            var firstDate = firstWeek[0];
            var week = [];
            for (var i = 1; i <= 7; i++) {
                var date = new Date(firstDate[0], firstDate[1] - 1, firstDate[2] - i);
                week.unshift([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
            }
            weeks.unshift(week);
        }

        var lastWeek = weeks[weeks.length - 1];
        while (lastWeek.length < 7) {
            var lastDate = lastWeek[lastWeek.length - 1];
            var date = new Date(lastDate[0], lastDate[1] - 1, lastDate[2] + 1);
            lastWeek.push([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
        }
        if (weeks.length < 6) {
            var lastDate = lastWeek[lastWeek.length - 1];
            var week = [];
            for (var i = 1; i <= 7; i++) {
                var date = new Date(lastDate[0], lastDate[1] - 1, lastDate[2] + i);
                week.push([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
            }
            weeks.push(week);
        }

        return weeks;
    }

    /**
	 * show the calendar day.
	 */
    function show(target) {
        var opts = $.data(target, 'calendar').options;
        $(target).find('.calendar-title span').html(opts.months[opts.month - 1] + ' ' + opts.year);

        var body = $(target).find('div.calendar-body');
        body.find('>table').remove();
		var tb = ['<table cellspacing="0" cellpadding="0" border="0"><thead><tr>'];
		for (var i = opts.firstDay; i < opts.weeks.length; i++) {
            tb.push('<th>' + opts.weeks[i] + '</th>');
        }
		for (var i = 0; i < opts.firstDay; i++) {
            tb.push('<th>' + opts.weeks[i] + '</th>');
        }		
		tb.push('</thead><tbody>');
		var weeks = getWeeks(target, opts.year, opts.month);
		for (var i = 0; i < weeks.length; i++) {
            var week = weeks[i];
            tb.push('<tr>');
            for (var j = 0; j < week.length; j++) {
                var day = week[j];
                if (opts.year == day[0] && opts.month == day[1]) {
					var abbr = day[0] + ',' + day[1] + ',' + day[2];
					tb.push('<td class="calendar-day" abbr="'+abbr+'">'+day[2]+'</td>');                    
                } else {
					tb.push('<td class="calendar-other-month" abbr=""></td>'); 
                }
            }
			tb.push('</tr>');
        }
		tb.push('</tbody></table>');
		var t = $(tb.join(""));
		t.prependTo(body);      
        var now = new Date();
        var today = now.getFullYear() + ',' + (now.getMonth() + 1) + ',' + now.getDate();
        t.find('td[abbr="' + today + '"]').addClass('calendar-today');

        if (opts.current) {
            t.find('.calendar-selected').removeClass('calendar-selected');
            var current = opts.current.getFullYear() + ',' + (opts.current.getMonth() + 1) + ',' + opts.current.getDate();
            t.find('td[abbr="' + current + '"]').addClass('calendar-selected');
        }

        // calulate the saturday and sunday index
        var saIndex = 6 - opts.firstDay;
        var suIndex = saIndex + 1;
        if (saIndex >= 7) saIndex -= 7;
        if (suIndex >= 7) suIndex -= 7;
        t.find('tr').find('td:eq(' + saIndex + ')').addClass('calendar-saturday');
        t.find('tr').find('td:eq(' + suIndex + ')').addClass('calendar-sunday');

        t.find("td[class*='calendar-day']").hover(function() {
            $(this).addClass('calendar-hover');
        },
        function() {
            $(this).removeClass('calendar-hover');
        }).click(function() {
            t.find('.calendar-selected').removeClass('calendar-selected');
            $(this).addClass('calendar-selected');
            var parts = $(this).attr('abbr').split(',');			
            opts.current = new Date(parts[0], parseInt(parts[1]) - 1, parts[2]);
            opts.onSelect.call(target, opts.current);
        });
        if (opts.min != "" && dateParser(opts.min) != null) {
            setMinDate(target, t, dateParser(opts.min));
        }
        if (opts.max != "" && dateParser(opts.max) != null) {
            setMaxDate(target, t, dateParser(opts.max));
        }
    }

    function dateParser(dateStr) {
        var reg = /(\d{4})\W?(\d{2})\W?(\d{2})/;
        var ss = reg.exec(dateStr);
        if (ss == null) return null;
        var y = parseInt(ss[1], 10);
        var m = parseInt(ss[2], 10);
        var d = parseInt(ss[3], 10);
        if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
            return new Date(y, m - 1, d);
        } else {
            return null;
        }
    }

    function setMinDate(target, t, minDate) {
      var minTime = minDate == null ? 0 : minDate.getTime();
      var opts = $.data(target, 'calendar').options;
      var disableTimes = [];
      for (var i = 0, len = opts.disableDates.length; i < len; i++) {
        var disDate = new Date(opts.disableDates[i].substr(0, 4), opts.disableDates[i].substr(4, 2) - 1, opts.disableDates[i].substr(6, 2));
        disableTimes.push(disDate.getTime());
      }
      t.find("td").each(function () {
        if ($(this).attr("abbr") != "") {
          var tdDate = $(this).attr("abbr").split(",");
          var curDate = new Date(tdDate[0], tdDate[1] - 1, tdDate[2]);
          if (minTime > curDate.getTime() || $.inArray(curDate.getTime(), disableTimes) != -1) {
            $(this).addClass('calendar-no-min').unbind();
          } else {
            if ($(this).hasClass('calendar-no-min')) {
              $(this).removeClass('calendar-no-min');
              $(this).hover(function () {
                $(this).addClass('calendar-hover');
              },
              function () {
                $(this).removeClass('calendar-hover');
              }).click(function () {
                t.find('.calendar-selected').removeClass('calendar-selected');
                $(this).addClass('calendar-selected');
                var parts = $(this).attr('abbr').split(',');
                opts.current = new Date(parts[0], parseInt(parts[1]) - 1, parts[2]);
                opts.onSelect.call(target, opts.current);
              });
            }
          }
        }
      })
    }

    function setMaxDate(target, t, maxDate) {
        var maxTime = maxDate == null ? 0 : maxDate.getTime();
		var opts = $.data(target, 'calendar').options;
        t.find("td").each(function() {
            if ($(this).attr("abbr") != "") {
                var tdDate = $(this).attr("abbr").split(",");
                var curDate = new Date(tdDate[0], tdDate[1] - 1, tdDate[2]);
                if (maxTime < curDate.getTime()) {
                    $(this).addClass('calendar-no-max').unbind();
                }else{
					if($(this).hasClass('calendar-no-max')){
						$(this).removeClass('calendar-no-max');
						$(this).hover(function() {
							$(this).addClass('calendar-hover');
						},
						function() {
							$(this).removeClass('calendar-hover');
						}).click(function() {
							t.find('.calendar-selected').removeClass('calendar-selected');
							$(this).addClass('calendar-selected');
							var parts = $(this).attr('abbr').split(',');			
							opts.current = new Date(parts[0], parseInt(parts[1]) - 1, parts[2]);
							opts.onSelect.call(target, opts.current);
						});
					}
				}
            }
        })
    }
})(jQuery);