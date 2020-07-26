/**
 *
 */

!(function($){
	/*'use strict';*/

	var property = /{[^}]+}/g;

	var DEFAULTS = {
		//设置语言
		locale: 'zh-CN',
		//设置开始时间是周几
		weekStart: 0,
		// 配置当前时间
		date: null,
		// 设置时间格式
		format: 'yyyy-MM-dd',
		icons: {
			left: 'fa fa-angle-left',
			right: 'fa fa-angle-right'
		},
		// 设置日期点击事件
		onClick: null,
		//ajax前参数过滤回调函数 返回的parmas为传递给后台的参数
		queryParmas: function(parmas){
			return parmas;
		},
		dataFilter: function(result){
			return typeof result === 'object' && result.data ? result.data : result;
		},
		url: null,
		ajaxOption: null
	}

	var multiCalendarHeader = '<div class="multicalendar-th{classes}">{week}</div>';

	function MultiCalendar(el, options){
		this.$main = el;
		this.options = options;
		this.locale = LOCALES[this.options.locale];
		this.initServer();
		this.initDate();
		this.init();
		this.initEvent();
		return this;
	};

	MultiCalendar.prototype = {
		init: function(){
			var me = this,
				k = 7,
				week = me.options.weekStart,
				html = ['<div class="multicalendar-picker"><div class="multicalendar-header">'];
			me.$main.addClass('multicalendar');
			html.push('<div class="multicalendar-info"></div><ul class="multicalendar-week">');
			while (k > 0) {
				html.push('<li', week === 0 || week === 6 ? ' class="weekend">' : '>', me.locale.week[week], '</li>');
				week = (week + 1) % 7;
				k --;
			}
			html.push('</ul></div><ul class="multicalendar-body"></ul></div>');
			me.$main.html(html.join(''));
			me.$title = me.$main.find('.multicalendar-info');
			me.$body = me.$main.find('.multicalendar-body');
			if (typeof me.options.date !== 'string') {
				me.date = new Date();
				me.options.date = me.format(me.date);
			} else {
				me.date = new Date(me.options.date);
			}
		},
		initServer: function(){
			var me = this,
					settings = me.options,
					parmas = me.parmas;
			if(typeof settings.url === 'string'){
				if(typeof settings.queryParmas === 'function'){
					parmas = settings.queryParmas.call(me, parmas);
				}
				var request = $.extend({
					url: settings.url,
					type: 'get',
					success: function(result){
						var dataFilter = me.options.dataFilter;
						if(typeof dataFilter === 'function'){
							result = dataFilter.call(me, result);
						}
						!$.isArray(result)&&( result = []);
						me.options.data = result;
						me.render();
						me.initremind();
						this;
					},
					error: function() {

					}
				}, settings.ajaxOption);
				request.data = parmas;
				if(me._xhr && me._xhr.readyState !== 4){
					me._xhr.abort();
				}
				me._xhr = $.ajax(request);
			}
		},
		initDate: function(){
			var me = this;
			Object.defineProperty(me, 'date', {
				get: function(){
					return this._date;
				},
				set: function(value){
					if (value instanceof Date && this._date !== value) {
						this._date = value;
						this.render();
					}
				}
			})
		},
		isToday: function(){
			var me = this;
		},
		render: function() {
			var me = this,
				year = me.date.getFullYear(),
				month = me.date.getMonth(),
				day = me.date.getDate(),
				today = new Date(),
				start = new Date(year, month, 1).getDay(),
				title = [],
				html = [],
				last,
				lastYear,
				lastMonth,
				lastDay,
				last,
				next,
				nextYear,
				nextMonth,
				now,
				k = 1,
				index,
				info,
				weekStart = me.options.weekStart;
			title.push(me.renderText('<i class="multicalendar-icon-left {left}"></i>', me.options.icons));
			title.push('<div class="multicalendar-title">', year, me.locale.year, ' ', me.locale.months[month]);
			title.push('<span class="multicalendar-return">', me.locale.returnToday, '</span></div>');
			title.push(me.renderText('<i class="multicalendar-icon-right {right}"></i>', me.options.icons));
			me.$title.html(title.join(''));
			day = year === today.getFullYear() && month === today.getMonth() && day === today.getDate() ? day : null;
			last = new Date(year, month, 0);
			lastYear = last.getFullYear();
			lastMonth = last.getMonth() + 1;
			if (lastMonth < 10) {
				lastMonth = '0' + lastMonth;
			}
			last = last.getDate();
			next = new Date(year, month + 2, 0);
			nextYear = next.getFullYear();
			nextMonth = next.getMonth() + 1;
			if (nextMonth < 10) {
				nextMonth = '0' + nextMonth;
			}
			now = new Date(year, month + 1, 0).getDate() + 1;
			lastDay = start > weekStart ? start -  weekStart : start + 7 - weekStart;
			month = month + 1;
			if (month < 10) {
				month = '0' + month;
			}
			next = 44 - now - lastDay;
			lastDay = lastDay - 1;
			start = start - 1;
			while (lastDay > -1) {
				html.push('<li class="multicalendar-last-month');
				index = start > lastDay ? start - lastDay : start + 7 - lastDay;
				index = index % 7;
				if (index === 6 || index === 0) {
					html.push(' weekend');
				}
				info = last - lastDay;
				html.push('" data-day="', [lastYear, lastMonth, info < 10 ? '0' + info : info].join('-'), '">', info, '</li>');
				lastDay --;
			}
			while (k < now) {
				html.push('<li class="multicalendar-now-month');
				index = (start + k) % 7;
				if (index === 6 || index === 0) {
					html.push(' weekend');
				}
				if (k === day) {
					html.push(' active');
				}
				info = k < 10 ? '0' + k : k;
				html.push('" data-day="', [year, month, info].join('-'), '">', k, '</li>');
				k ++;
			}
			k = 1;
			start = (start + now - 1) % 7;
			while (k < next) {
				html.push('<li class="multicalendar-next-month');
				index = (start + k) % 7;
				if (index === 6 || index === 0) {
					html.push(' weekend');
				}
				info = k < 10 ? '0' + k : k;
				html.push('" data-day="', [nextYear, nextMonth, info].join('-'), '">', k, '</li>');
				k ++;
			}
			me.$body.html(html.join(''));
		},
		renderText: function(TPL, datas, callback) {
			var me = this,
				data = typeof TPL === 'string' ? TPL.match(property) : [];
			if (typeof callback !== 'function') {
				callback = function() {
					return true
				}
			}
			if (data && data.length > 0) {
				data.map( function (value) {
					var expre = value.replace('{', '').replace('}', ''),
						field = me.getForJSON(expre, datas);
					if (callback.call(datas, field, expre) !== false) {
						TPL = TPL.replace(new RegExp(value), field)
					}
				})
			}
			return TPL;
		},
		getForJSON: function(expre, data) {
			var len,
				i = 0;
			expre = expre.split(/\./);
			len = expre.length;
			while (i < len) {
				data = data[expre[i]];
				if (data === null || data === undefined) return '';
				i++;
			}
			return data;
		},
		format: function(date) {
			var me = this,
				format = me.options.format,
				times = {};
			times['M+'] = date.getMonth() + 1;
			times['d+'] = date.getDate();
			times['h+'] = date.getHours();
			times['m+'] = date.getMinutes();
			times['s+'] = date.getSeconds();
			times['q+'] = Math.floor((date.getMonth() + 3) / 3);
			times['S+'] = date.getMilliseconds();
		    if (/(y+)/.test(format)) {
				format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
			}
		    for (var k in times) {
				if (new RegExp("(" + k + ")").test(format)) {
					format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (times[k]) : (("00" + times[k]).substr(("" + times[k]).length)));
				}
			}
		    return format;
		},
		initremind: function(){
			var me = this;
			var list = $(me.$main.find('.multicalendar-body li')),
				listlen = list.length;
			if(me.options.data){
				var data = me.options.data,
				len = me.options.data.length;
				for(var i = 0; i <listlen; i ++){
					for(var j = len - 1; j >= 0 ; j --){
						if($(list[i]).attr('data-day') == data[j].daytime && data[j].counts !== 0){
							$(list[i]).addClass('remind');
						}
					}
				}
			}
		},
		//返回今日 上下月份点击
		initEvent: function(){
			var me = this;

			me.$main.on('click', '.multicalendar-return', function(e){
				me.date = new Date();
				me.initremind();
				var day = me.date.format('yyyy-MM-dd');
				if (typeof me.options.onClick === 'function') {
					me.options.onClick.call(me, day);
				}
			})

			me.$main.on('click', '.multicalendar-icon-right', function(e){
				var month = me.date.getMonth();
				me.date = new Date(me.date.setMonth(month + 1));
				me.initremind();
			})

			me.$main.on('click', '.multicalendar-icon-left', function(e){
				var month = me.date.getMonth();
				me.date = new Date(me.date.setMonth(month - 1));
				me.initremind();
			});

			me.$main.on('click', '.multicalendar-body li', function(e){
				var $this = $(this),
					day = $this.data('day');
				$this.addClass('active').siblings().removeClass('active');
				if (typeof me.options.onClick === 'function') {
					me.options.onClick.call(me, day);
				}
			})
		}

	}

	MultiCalendar.defaults = $.extend({}, DEFAULTS);

	//国际化
	var LOCALES = {};

	LOCALES['zh-CN'] = {
		months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
		week: ['日', '一', '二', '三', '四', '五', '六'],
		returnToday: '返回今日',
		day: '日',
		month: '月',
		year: '年',
		more: '更多'
	};

	LOCALES['en'] = {
		months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
		week: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
		returnToday: 'Today',
		day: 'day',
		month: 'month',
		year: 'year',
		more: 'more'
	};

	if (localStorage) {
		var lng = localStorage.getItem('i18nextLng');
		if ($.inArray(lng, Object.keys(LOCALES)) !== -1) {
			MultiCalendar.defaults.locale = lng;
		}
	}

	$.fn.multicalendar = function(settings) {
		var result,
			args = Array.prototype.slice.call(arguments, 1);
		this.each(function() {
			var $this = $(this),
				options,
				multicalendar = $this.data('multicalendar');
			if (typeof settings === 'string') {
				if (!multicalendar) return;
				if (typeof multicalendar[settings] === 'function') {
					result = multicalendar[settings].apply(multicalendar, args)
				}
				if (settings === 'destroy') {
					$this.removeData('multicalendar')
				}
			}
			if (!multicalendar) {
				options = $.extend({}, MultiCalendar.defaults, settings);
				multicalendar = new MultiCalendar($this, options);
				$this.data('multicalendar', multicalendar);
			}
		});
		return typeof result === 'undefined' ? this : result;
	};

	$.fn.multicalendar.locales = LOCALES;

	$.fn.multicalendar.defaults = MultiCalendar.defaults;

	//重置初始化参数
	$.fn.multicalendar.resetOptions = function() {
		MultiCalendar.defaults = $.extend({}, DEFAULTS);
	}

	//设置初始化的参数
	$.fn.multicalendar.setOptions = function(options) {
		$.extend(MultiCalendar.defaults, options);
	}
})($)
