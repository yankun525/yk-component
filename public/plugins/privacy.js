(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(['privacy'], function(privacy) {
			return factory(privacy);
		});
	} else if (typeof module === 'object' && module.exports) {
		module.exports = factory(require('privacy'));
	} else {
		return factory();
	};
}(function(privacy) {
	/*'use strict';*/
	var DEFAULTS = {
		/* 设置语言类型 */
		locale: 'zh-CN',
		/* 隐私条款获取 */
		url: '',
		/* ajax数据过滤 */
		dataFilter: null,
		/* 隐私条款详情 */
		content: null,
		/* 隐私条款版本号 */
		version: null,
		/* 设置cookie里存储的接收字段名称 */
		acceptField: 'accept',
		/* 设置cookie里存储的版本字段名称 */
		versionField: 'version',
		/* 关闭隐私条款弹框回调 */
		onClose: null,
		/* 关闭隐私条款弹框之前回调 */
		beforeClose: null,
		/* 选择同意回调 */
		onAccept: null,
		/* 选择同意之前回调 */
		beforeAccept: null,
		/* 选择不同意回调 */
		onOppose: null,
		/* 选择不同意之前回调 */
		beforeOppose: null
	};

	var STYLE = [
		'.privacy-card{position:fixed;_position:absolute;z-index:9000;right:0;bottom:16px;width:672px;max-width:100%;padding:0 16px;font-size:12px;color:#000000bf;letter-spacing:0;line-height:18px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;}',
		'.privacy-card > div{position:relative;opacity:0.95;background:#FFFFFF;box-shadow:0 2px 8px 0 rgba(0,0,0,0.25);padding:10px 50px 10px 16px;}',
		'.privacy-card-btn{padding:2px 6px;border-radius:3px;margin:0 3px;background:#d7eaff;color:#2288ee;cursor:pointer;border:1px solid #2288ee;}',
		'.privacy-card-link{color:#151515;font-weight:bold;text-decoration:underline;cursor:pointer;}',
		'.privacy-card-close{position:absolute;right:16px;top:16px;width:13px;height:13px;cursor:pointer;}',
		'.privacy-icon-close{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAApUlEQVQoU4WSQQ6CMBBF5w9ncY26FYNHgXAtE+Us1WXlAp6FMSW00naArpr0v3bmTXE+Xhsw1fZjWtpZPgu3YaaHED23wJAT6uEu3wOXgB1MM0FbYAq4bIA0UAMyKAJHeYFRiVDvSlo6il7yB6eyuhcFOhH62sEcUqkZFEoa5Q3GRbOq9zSXtGY1t5f0oIHxnJSmNav/H7ECaHOcIIBuqVbtG/rsD54diRIXOxJmAAAAAElFTkSuQmCC)}',
		'.privacy-dialog{position:fixed;_position:absolute;z-index:9999;left:10%;top:10%;width:80%;height:80%;background:#fff;padding:50px 0 68px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;}',
		'.privacy-dialog-shade{position:fixed;_position:absolute;z-index:9998;top:0;left:0;width:100%;height:100%;background-color:#000;opacity:0.3;filter:alpha(opacity=30);}',
		'.privacy-dialog-title{position:absolute;height:50px;line-height:50px;top:0;left:0;right:0;font-size:14px;color:#333333;background:#F7F7F7;padding:0 24px;}',
		'.privacy-dialog-close{position:absolute;right:24px;top:14px;width:13px;height:13px;cursor:pointer;}',
		'.privacy-dialog-content{height:100%;overflow:auto;padding:0 24px;}',
		'.privacy-dialog-bot{position:absolute;bottom:0;left:0;right:0;margin:0 24px;padding:16px 0;border-top:1px solid #00000026;text-align:center;}',
		'.privacy-dialog-btn{display:inline-block;background:#2288EE;border-radius:2px;color:#fff;font-size:14px;padding:7px 26px;}',
		'.privacy-tooltip{position:absolute;width:100%;font-size:12px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;}',
		'.privacy-tooltip > div{position:relative;background:#ffffff;box-shadow:0 2px 4px 0 rgba(0,0,0,0.25);border-radius:3px;padding:16px 16px 54px 16px;}',
		'.privacy-tooltip-accept{position:absolute;right:78px;bottom:14px;color:#fff;line-height:14px;padding:4px 8px;border:1px solid #2288EE;border-radius:3px;background:#2288EE;cursor:pointer;}',
		'.privacy-tooltip-oppose{position:absolute;right:16px;bottom:14px;color:#333333;line-height:14px;padding:4px 8px;border:1px solid #DEDEDE;border-radius:3px;cursor:pointer;}',
		'.privacy-arrow{position:absolute;font-weight:400;line-height:1.42857143;text-align:left;white-space:normal;width:0;height:0;border-width:11px;border-style:solid;display:block;border-color:transparent;-webkit-transition:border-color ease-in-out .15s;-o-transition:border-color ease-in-out .15s;transition:border-color ease-in-out .15s;}',
		'.privacy-arrow:after{content:" ";border-width:10px;position:absolute;width:0;border-style:solid;height:0;display:block;border-color:transparent;}',
		'.privacy-arrow.sm{border-width:6px;}',
		'.privacy-arrow.sm:after{border-width:5px;}',
		'.privacy-arrow.left,.app-arrow.right{top:50%;margin-top:-11px;}',
		'.privacy-arrow.top,.app-arrow.bottom{left:50%;margin-left:-11px;}',
		'.privacy-arrow.left.sm,.app-arrow.right.sm{margin-top:-6px;}',
		'.privacy-arrow.top.sm,.app-arrow.bottom.sm{margin-left:-6px;}',
		'.privacy-arrow.top{top:-11px;border-top-width:0;border-bottom-color:#999;border-bottom-color:rgba(0, 0, 0, 0.25);}',
		'.privacy-arrow.top:after{right:-10px;top:1px;border-top-width:0;border-bottom-color:#fff;}',
		'.privacy-arrow.top.sm{top:-6px;}',
		'.privacy-arrow.top.sm:after{right:-5px;}',
		'.privacy-arrow.right{right:-11px;border-right-width:0;border-left-color:#999;border-left-color:rgba(0,0,0,.25);}',
		'.privacy-arrow.right:after{bottom:-10px;right:1px;border-right-width:0;border-left-color:#fff;}',
		'.privacy-arrow.right.sm{right:-6px;}',
		'.privacy-arrow.right.sm:after{bottom:-5px;}',
		'.privacy-arrow.bottom{bottom:-11px;border-bottom-width:0;border-top-color:#999;border-top-color:rgba(0, 0, 0, 0.25);}',
		'.privacy-arrow.bottom:after{right:-10px;bottom:1px;border-bottom-width:0;border-top-color:#fff;}',
		'.privacy-arrow.bottom.sm{bottom:-6px;}',
		'.privacy-arrow.bottom.sm:after{right:-5px;}',
		'.privacy-arrow.left{left:-11px;border-left-width:0;border-right-color:#999;border-right-color:rgba(0,0,0,.25);}',
		'.privacy-arrow.left:after{bottom:-10px;left:1px;border-left-width:0;border-right-color:#fff;}',
		'.privacy-arrow.left.sm{left:-6px;}',
		'.privacy-arrow.left.sm:after{bottom:-5px;}'
	].join('');

	var extend = function() {
		var src,
			copyIsArray,
			copy,
			name,
			options,
			clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;
		if (typeof target === 'boolean') {
			deep = target;
			target = arguments[i] || {};
			i++;
		};
		if (typeof target !== 'object' && typeof target !== 'function') {
			target = {};
		};
		if (i === length) {
			return target;
		};
		for (; i < length; i++) {
			if ((options = arguments[i]) != null) {
				for (name in options) {
					src = target[name];
					copy = options[name];
					if (target === copy) {
						continue;
					};
					if (deep && copy && (copyIsArray = Array.isArray(copy))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && Array.isArray(src) ? src : [];
						} else {
							clone = src || {};
						};
						target[name] = extend(deep, clone, copy);
					} else if (copy !== undefined) {
						target[name] = copy;
					};
				};
			};
		};
		return target;
	};

	var ajax = function(options) {
		var xhr;
		options = extend(true, {
			type: 'GET',
			cache: false,
			async: true,
			data: {}
		}, options);
		if (!options.cache) {
			options.data['_'] = new Date().getTime();
		};
		options.type = options.type.toUpperCase();
		try {
			if (XMLHttpRequest) {
				xhr = new XMLHttpRequest();
			} else {
				xhr = new ActiveXObject('MSXML2.XMLHTTP.3.0');
			};
			if (options.type === 'GET') {
				options.data = param(options.data);
				if (options.data && options.url.indexOf('?') === -1) {
					options.data = '?' + options.data;
				};
				options.url += options.data;
				delete options.data;
			} else {
				xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			};
			xhr.open(options.type, options.url, options.async);
			xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			xhr.onreadystatechange = function () {
				if (xhr.readyState > 3 && typeof options.callback === 'function') {
					options.callback(parseJSON(xhr.responseText), xhr);
				};
			};
			xhr.send(options.data);
		} catch (e) {
			if (console) {
				console.error(e);
				console.log('浏览器不支持ajax');
			};
		};
	};

	var param = function(data) {
		var k,
			item = [],
			add = function(key, value) {
				if (typeof value === 'function') value = value();
				if (value === null || value === undefined || typeof value === 'number' && isNaN(value)) value = '';
				item[item.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
			};
		if (Array.isArray(data)) {
			data.map(function(item) {
				add(item.name, item.value)
			});
		} else {
			for (k in data) {
				add(k, data[k]);
			};
		};
		return item.join('&').replace(/%20/g, '+');
	};

	var parseJSON = function(data) {
		if (window.JSON && window.JSON.parse) {
			return window.JSON.parse(data + '');
		} else {
			return new Function('return ' + data)();
		};
	};

	var remove = function(el) {
		if (el.parentNode) {
			el.parentNode.removeChild(el);
		} else if (el.remove) {
			el.remove();
		} else if (el.removeNode) {
			el.removeNode();
		};		
	};

	function Privacy(options) {
		this.init(options);
		this.initServer();
	};

	Privacy.prototype = {
		renderText: function(TPL, datas, callback) {
			var me = this,
				data = typeof TPL === 'string' ? TPL.match(/{[^}]+}/g) : [];
			if (typeof callback !== 'function') callback = new Function();
			if (data && data.length > 0) {
				data.map(function(value) {
					var expre = value.replace('{', '').replace('}', ''),
						field = me.getForJSON(expre, datas);
					if (callback.call(datas, field, expre) !== false) {
						TPL = TPL.replace(new RegExp(value), field)
					};
				});
			};
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
			};
			return data;
		},
		addEvent: function(el, event, callback) {
			if (el.addEventListener) {
				el.addEventListener(event, callback, false);
			} else if (el.attachEvent) {
				el.attachEvent('on' + event, callback);
			};
		},
		setCookie: function(key, value, time) {
			var expires = '';
			if (time) {
				time = time * 1000 * 60 * 60 * 24;
				expires = new Date(new Date().getTime() + time);
				expires = 'expires=' + expires.toGMTString();
			};
			document.cookie = key + '=' + escape(value) + ';' + expires;
		},
		getCookie: function(name) {
			var value = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
			return value ? unescape(value[2]) : value;
		},
		init: function(options) {
			var me = this,
				defaults = Privacy.DEFAULTS;
			options = extend({}, defaults, options);
			if (Object.keys(Privacy.LOCALES).indexOf(options.locale) === -1) {
				options.locale = defaults.locale;
			};
			me.options = options;
			me.locales = Privacy.LOCALES[options.locale];
		},
		initServer: function() {
			var me = this;
			ajax({
				url: '/platform/session-info',
				callback: function(res) {
					if (typeof me.options.dataFilter === 'function') {
						res = me.options.dataFilter.call(me, res);
					};
					me.options.content = res.content;
					me.options.version = res.version;
					if (!me.isAccept()) me.showCard();
				}
			});
			return me;
		},
		showCard: function() {
			var me = this,
				elem = document.createElement('div'),
				html = ['<div><span>'];
			me.hideCard();
			html.push(me.renderText(me.locales.card, {
				accept: '<span class="privacy-card-btn">' + me.locales.accept + '</span>',
				privacy: '<span class="privacy-card-link">' + me.locales.privacy + '</span>'
			}));
			html.push('</span><i class="privacy-card-close privacy-icon-close"></i></div>');
			elem.className = 'privacy-card';
			elem.innerHTML = html.join('');
			me.cardElem = elem;
			document.body.appendChild(elem);
			me.addEvent(elem, 'click', function(e) {
				var type = e.target.className;
				if (type.indexOf('privacy-card-btn') !== -1) {
					me.hideCard();
					me.accept();
					return true;
				};
				if (type.indexOf('privacy-card-link') !== -1) {
					me.showDialog();
					return true;
				};
				if (type.indexOf('privacy-card-close') !== -1) {
					me.hideCard();
					return true;
				};
			});
			return me;
		},
		hideCard: function() {
			var me = this;
			if (me.cardElem) {
				remove(me.cardElem);
				me.cardElem = null;
			};
			return me;
		},
		getCardText: function(type) {
			var me = this;
			return type ? me.renderText(me.locales.card, me.locales) : me.locales.card.split(/{accept}|{privacy}/);
		},
		showDialog: function() {
			var me = this,
				elem = document.createElement('div'),
				shade = document.createElement('div'),
				html = ['<div class="privacy-dialog-title"><span>'];
			me.hideDialog();
			html.push(me.locales.privacy, '</span><i class="privacy-dialog-close privacy-icon-close"></i></div>');
			html.push('<div class="privacy-dialog-content">', me.options.content, '</div>');
			html.push('<div class="privacy-dialog-bot"><span class="privacy-dialog-btn">', me.locales.closed, '</span></div>');
			elem.className = 'privacy-dialog';
			elem.innerHTML = html.join('');
			shade.className = 'privacy-dialog-shade';
			me.shade = shade;
			document.body.appendChild(shade);
			me.dialog = elem;
			document.body.appendChild(elem);
			me.addEvent(elem, 'click', function(e) {
				var type = e.target.className;
				if (type.indexOf('privacy-dialog-btn') !== -1) {
					if (typeof me.options.beforeClose === 'function') {
						if (me.options.beforeClose.call(me) === false) {
							return false;
						};
					};
					me.hideDialog();
					if (typeof me.options.onClose === 'function') {
						me.options.onClose.call(me);
					};
					return true;
				};
				if (type.indexOf('privacy-dialog-close') !== -1) {
					if (typeof me.options.beforeClose === 'function') {
						if (me.options.beforeClose.call(me) === false) {
							return false;
						};
					};
					me.hideDialog();
					if (typeof me.options.onClose === 'function') {
						me.options.onClose.call(me);
					};
					return true;
				};
			});
			return me;
		},
		hideDialog: function() {
			var me = this;
			if (me.dialog) {
				remove(me.dialog);
				me.dialog = null;
			};
			if (me.shade) {
				remove(me.shade);
				me.shade = null;
			};
			return me;
		},
		showTooltip: function(options) {
			var me = this,
				elem = document.createElement('div'),
				html = [];
			if (me.tooltip) return me;
			options = extend({}, options);
			if (!options.el) return false;
			html.push('<div><span>');
			html.push(me.renderText(me.locales.tooltip, {
				privacy: '<span class="privacy-card-link">' + me.locales.privacy + '</span>'
			}), '</span>');
			html.push('<span class="privacy-tooltip-accept">', me.locales.accept, '</span>');
			html.push('<span class="privacy-tooltip-oppose">', me.locales.oppose, '</span>');
			html.push('</div>');
			elem.className = 'privacy-tooltip';
			elem.innerHTML = html.join('');
			if (options.style) {
				elem.setAttribute('style', options.style);
			};
			me.tooltip = elem;
			options.el.appendChild(elem);
			me.addEvent(elem, 'click', function(e) {
				var type = e.target.className;
				if (type.indexOf('privacy-card-link') !== -1) {
					me.showDialog();
					return true;
				};
				if (type.indexOf('privacy-tooltip-accept') !== -1) {
					me.hideTooltip();
					me.accept(options.accept);
					return true;
				};
				if (type.indexOf('privacy-tooltip-oppose') !== -1) {
					me.hideTooltip();
					me.oppose(options.oppose);
					return true;
				};
			});
			return me;
		},
		hideTooltip: function() {
			var me = this;
			if (me.tooltip) {
				remove(me.tooltip);
				me.tooltip = null;
			};
			return me;
		},
		getTooltipText: function(type) {
			var me = this;
			return type ? me.renderText(me.locales.tooltip, me.locales) : me.locales.tooltip.split(/{accept}|{privacy}/);
		},
		isAccept: function() {
			var me = this,
				accept = me.getCookie(me.options.acceptField),
				version = me.getCookie(me.options.versionField);
			return accept === '1' && version === me.options.version;
		},
		accept: function(callback) {
			var me = this;
			if (typeof me.options.beforeAccept === 'function') {
				if (me.options.beforeAccept.call(me) === false) {
					return false;
				};
			};
			me.setCookie(me.options.acceptField, 1);
			me.setCookie(me.options.versionField, me.options.version);
			if (typeof callback === 'function') {
				callback();
			};
			if (typeof me.options.onAccept === 'function') {
				me.options.onAccept.call(me);
			};
		},
		oppose: function(callback) {
			var me = this;
			if (typeof me.options.beforeOppose === 'function') {
				if (me.options.beforeOppose.call(me) === false) {
					return false;
				};
			};
			me.setCookie(me.options.acceptField, 0);
			if (typeof callback === 'function') {
				callback();
			};
			if (typeof me.options.onOppose === 'function') {
				me.options.onOppose.call(me);
			};
		}
	};

	Privacy.LOCALES = {};

	Privacy.LOCALES['en'] = {
		card: '本网站使用Cookie或类似其他技术。我们将使用Cookie等技术为您提供个性化的内容和广告并持续优化本网站。在为您提供优质的汽车产品和服务的同时，我们将根据不时更新的本政策收集、使用、共享、存储和保护您的个人数据。如果您点击{accept}则表明您接受了我们使用这些技术，并请阅读我们的{privacy}以获取更多信息',
		tooltip: '我们非常重视保护您的隐私，并了解其对您的重要性。为此，我们更新了隐私政策请在您向我们提供个人数据之前完整阅读了解本{privacy}',
		accept: 'Accept',
		oppose: 'Oppose',
		privacy: 'Privacy Policy',
		closed: 'Closed'
	};

	Privacy.LOCALES['zh-CN'] = {
		card: '本网站使用Cookie或类似其他技术。我们将使用Cookie等技术为您提供个性化的内容和广告并持续优化本网站。在为您提供优质的汽车产品和服务的同时，我们将根据不时更新的本政策收集、使用、共享、存储和保护您的个人数据。如果您点击{accept}则表明您接受了我们使用这些技术，并请阅读我们的{privacy}以获取更多信息',
		tooltip: '我们非常重视保护您的隐私，并了解其对您的重要性。为此，我们更新了隐私政策请在您向我们提供个人数据之前完整阅读了解本{privacy}',
		accept: '同意',
		oppose: '不同意',
		privacy: '隐私政策',
		closed: '关闭'
	};

	Privacy.resetOptions = function() {
		Privacy.DEFAULTS = extend({}, DEFAULTS);
	};

	Privacy.setOptions = function(option) {
		Privacy.DEFAULTS = extend({}, DEFAULTS, option);
	};

	Privacy.style = function() {
		var id = 'privacy-css',
			head = document.getElementsByTagName('head')[0] || document.body,
			style = document.createElement('style'),
			_style = document.getElementById(id);
		if (_style) remove(_style);
		style.type = 'text/css';
		style.id = id;
		head.appendChild(style);
		if ('textContent' in style) {
			style.textContent = STYLE;
		} else if (style.styleSheet) {
			style.styleSheet.cssText = STYLE;
		};
	};

	Privacy.resetOptions();
	Privacy.style();

	window.Privacy = Privacy;

	return Privacy;
}));