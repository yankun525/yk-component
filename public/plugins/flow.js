/**
 * [flow description]
 * @type {Object}
 * 表达式
 * {[type]} 表示在matchValue 添加key值为type的属性 并监听该属性值的改变
 * {[$ input[name=type]]} 表示在matchValue 添加key值为type的属性
 * 并监听页面上input[name=type]的dom节点值的改变
 * {[$ input[name=type] | input ]} 给input[name=type]添加input事件监听 并在监听触发时
 * 实时修改对应matchValue.type值的改变
 * {[$ input[name=type] | input -- test ]} 强制修改matchValue.type为matchValue.test
 * {[$ input[name=type] | input -- test || select[name=type] | change ]}
 * 表示如果页面上找不到对应的元素input[name=type] 则执行第二个
 * {[@hide()]} 执行match上对应的方法 第一个参数为当前表达式对应节点的index
 * 第二个参数为flow实例化对象 如果需要传递其他参数 比如传递2可以设置{[@hide(2)]}
 */

!function($) {
	var flow = {
		init: function(el, options) {
			return new Flow(el, options);
		}
	}

	var rules = {};

	rules.property = /{\[[^}]+]}/g;

	rules.func = /{\[\@[^}]+]}/g;

	rules.bracket = /\(/g;

	rules.query = /{\[\$[^}]+]}/g;

	rules.elem = /\|\|/g;

	rules.on = /\|/g;

	rules.name = /\--/g;

	rules.args = /\([^}]+\)/g;

	rules.trim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

	function Flow(el, options) {
		this.$main = $(el);
		if (this.$main.length !== 1) {
			return this;
		}
		this.$main.addClass('app-flow');
		this.$main.data('flow', this);
		this.$ = this.$main[0].ownerDocument.defaultView.$ || $;
		this.init(options || {});
		this.load();
		return this;
	}

	Flow.prototype = {
		init: function(options) {
			var me = this,
				option,
				defaults = Flow.defaults;
			option = $.extend({}, defaults, options);
			option.query = $.extend({}, defaults.query, options.query);
			option.match = $.extend({}, defaults.match, options.match);
			option.token = $.extend({}, defaults.token, options.token);
			option.matchValue = $.extend({}, defaults.matchValue, options.matchValue);
			option.layerSelectorOptions = $.extend({}, defaults.layerSelectorOptions, options.layerSelectorOptions);
			me.locales = Flow.LOCALES[option.locale];
			me.options = option;
			me.initEvent();
			me.renderEvent();
			me.render();
		},
		pretreatment: function(str, index) {
			var me = this,
				len,
				jtq,
				property = [],
				match = [me.options.token.match, '.'].join(''),
				data = [me.options.token.data, '.'].join(''),
				args = [me.options.token.flow, index].join(', ');
			if (typeof str !== 'string') {
				return me;
			};
			str = str.replace(rules.query, function(value) {
				var len,
					k = 0,
					query,
					elem,
					expre,
					$elem,
					func,
					event,
					events;
				query = value.replace('{[$', '').replace(']}', '').split(rules.elem);
				len = query.length;
				while (k < len) {
					elem = query[k];
					if (elem) {
						elem = elem.split(rules.name).map(function(item) {
							return item.replace(rules.trim, '');
						});
						expre = elem[1];
						if (elem = elem[0]) {
							elem = elem.split(rules.on).map(function(item) {
								return item.replace(rules.trim, '');
							});
							$elem = me.$(elem[0]);
							if ($elem.length !== 0) {
								if (expre === undefined) {
									expre = $elem.prop('name');
								}
								if (expre) {
									property.push(expre);
									me.initListen(expre, $elem.val());
									elem = elem.slice(1);
									func = function(e) {
										me.data[expre] = this.value;
									};
									events = me.$._data($elem[0], 'events');
									if (events && (events = events[elem[0]])) {
										len = events.length - 1;
										while (len >= 0) {
											event = events[len];
											if (func.toString() === event.handler.toString()) {
												return data + expre;
											}
											len--;
										}
									};
									elem.push(func);
									$elem.on.apply($elem, elem);
								}
								return data + expre;
							}
						}
					}
					k++;
				}
			});
			str = str.replace(rules.func, function(value) {
				value = value.replace('{[@', match);
				return value.match(rules.args) ? value.replace(rules.bracket, '(' + args + ', ').replace(']}', '') : value.replace(']}', '(' + args + ')');
			});
			str = str.replace(rules.property, function(value){
				value = value.replace(']}', '');
				property.push(value.replace('{[', ''));
				return value.replace('{[', data);
			});
			len = property.length - 1;
			while (len >= 0) {
				jtq = me.initListen(property[len]);
				jtq[index] = str;
				len --;
			}
			return me;
		},
		renderText: function(TPL, datas, callback) {
			var me = this,
				data = typeof TPL === 'string' ? TPL.match(/{[^}]+}/g) : [];
			if (typeof callback !== 'function') {
				callback = function() {
					return true
				}
			}
			if (data && data.length > 0) {
				data.map(function (value) {
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
		load: function(params) {
			var me = this,
				data,
				option = me.options,
				url = option.url,
				request;
			data = $.extend({}, option.query);
			if (typeof params === 'object') {
				if (params.url) {
					url = params.url;
				}
				$.extend(data, params.query);
			}
			if(typeof option.queryParams === 'function'){
				data = option.queryParams.call(me, data);
			}
			url = me.renderText(url, data, function(value, key){
				if( key && value!== '' ){
					delete data[key];
				}
			});
			if ( !url ) return;
			request = $.extend({
				success: function (res) {
					if (typeof res === 'string') {
						res = $.parseJSON(res);
					};
					if(typeof option.dataFilter === 'function'){
						res = option.dataFilter.call(this, res);
					}
					option.data = me.getForJSON(option.dataField, res);
					me.renderEvent();
					me.render();
				}
			}, option.ajaxOptions, {
				url: url,
				type: option.method,
				data: option.contentType === 'application/json' && option.method === 'post' ? JSON.stringify(data) : data,
				cache: option.cache,
				contentType: option.contentType,
				dataType: option.dataType
			});
			if (me._xhr && me._xhr.readyState !== 4) {
				me._xhr.abort();
			}
			me._xhr = $.ajax(request);
		},
		render: function() {
			var me = this,
				k = 0,
				i,
				l,
				items,
				item,
				len,
				data,
				user,
				name,
				html = [],
				field,
				option = me.options;
			if (!$.isArray(option.data)) option.data = [];
			items = option.data;
			len = items.length;
			while (k < len) {
				item = items[k];
				html.push('<div data-index="', k, '" class="row app-flow-line');
				if (option.unplusEnabled) {
					field = item[option.unplusField];
					if (field === null || field === undefined) {
						item[option.unplusField] = option.unplus;
					}
					if (item[option.unplusField]) {
						html.push(' disabled');
					}
				}
				if (option.undeleteEnabled) {
					field = item[option.undeleteField];
					if (field === null || field === undefined) {
						item[option.undeleteField] = option.undelete;
					}
					if (item[option.undeleteField]) {
						html.push(' undelete');
					}
				}
				if (option.showEnabled) {
					field = item[option.showField];
					if (field === null || field === undefined) {
						item[option.showField] = option.show;
					}
					if (!item[option.showField]) {
						html.push(' hide');
					}
				}
				html.push('"><div class="col-md-2 app-flow-title pos-rlt" title="', item[option.remarkField], '">');
				if (option.minuserEnabled && item[option.minuserField]) {
					html.push('<span class="text-danger">*  </span>');
				}
				html.push(item[option.nameField], '</div><div class="col-md-10"><a class="btn btn-primary app-flow-plus"><i class="ion-ios-plus-outline"></i></a><ul class="app-flow-user clearfix">');
				data = item[option.childField];
				if (!$.isArray(data)) {
					data = item[option.childField] = [];
				}
				i = 0;
				l = data.length;
				while (i < l) {
					if (user = data[i]) {
						user.checked = true;
						html.push('<li');
						if (user[option.undeleteUserField]) {
							html.push(' class="undelete"');
						}
						user = typeof option.childNameFormat === 'function' ? option.childNameFormat.call(me, user[option.childNameField], user, i) : user[option.childNameField];
						html.push(
							'><a type="button" class="btn btn-default font-bold app-flow-userbtn" title="',
							user,
							'">',
							user,
							'</a><button type="button" class="btn btn-default app-flow-userdel">',
							'<i class="text-danger fa fa-trash-o"></i></button></li>'
						);
					}
					i++;
				}
				html.push('</ul></div></div>')
				k++;
			}
			me.$main.html(html.join(''));
			me.$main.find(".app-flow-title").tooltip();
			return me;
		},
		refresh: function(data) {
			var me = this;
			if ($.isArray(data)) {
				me.options.data = data;
			}
			me.renderEvent();
			me.render();
			return me;
		},
		reset: function() {
			var me = this,
				k,
				len,
				index,
				res,
				item,
				items,
				match = me.options.match,
				token = me.options.token,
				$match = token.match,
				$jtq = token.jtq,
				$flow = token.flow,
				$data = token.data,
				$item = token.item,
				$index = token.index,
				$expre = token.expre;
			for (var i in me.jtq) {
				items = me.jtq[i];
				item = Object.keys(items);
				k = 0;
				len = item.length;
				while (k < len) {
					index = item[k];
					if ($.isNumeric(index)) {
						res = new Function($match, $data, $flow, $item, $index, $expre, items[index])(match, me.data, me, me.options.data[index], index, i);
						if (typeof res === 'boolean') {
							match[res ? 'show' : 'hide'](me, index);
						}
					}
					k++;
				}
			}
		},
		initListen: function(expre, value) {
			var me = this,
				jtq = me.jtq[expre];
			if (!jtq) {
				jtq = new Object();
				if (value !== undefined) {
					jtq.value = value;
				}
				me.jtq[expre] = jtq;
				Object.defineProperty(me.data, expre, {
					get: function() {
						return jtq.value;
					},
					set: function(data) {
						var k,
							len,
							res,
							index,
							keys = Object.keys(jtq),
							match = me.options.match,
							token = me.options.token,
							$match = token.match,
							$jtq = token.jtq,
							$flow = token.flow,
							$data = token.data,
							$item = token.item,
							$index = token.index,
							$expre = token.expre;
						jtq.value = data;
						k = 0;
						len = keys.length;
						while (k < len) {
							index = keys[k];
							if ($.isNumeric(index)) {
								res = new Function($match, $data, $flow, $item, $index, $expre, jtq[index])(match, me.data, me, me.options.data[index], index, expre);
								if (typeof res === 'boolean') {
									match[res ? 'show' : 'hide'](me, index);
								}
							}
							k++;
						}
						me.render();
					}
				})
			}
			return jtq;
		},
		initEvent: function() {
			var me = this,
				layerSelectorOptions = me.options.layerSelectorOptions;

			me.$main.on('click', '.app-flow-plus', function(e) {
				var $this = $(this),
					index = $this.closest('.app-flow-line').data('index'),
					data = me.options.data[index],
					item = data[me.options.childField];
				if (me.options.unplusEnabled && data[me.options.unplusField]) {
					return false;
				}
				if (typeof me.options.plusUser === 'function') {
					if (me.options.plusUser.call(me, item, data) === false) {
						return false;
					}
				}
				if ($.isArray(item) && item.length > 0) {
					me.selector.options.cache = JSON.stringify(item);
				} else {
					me.selector.options.cache = null;
				}
				if (me.options.maxuserEnabled) {
					me.selector.options.max = data[me.options.maxuserField];
				}
				if (me.options.minuserEnabled) {
					me.selector.options.min = data[me.options.minuserField];
				}
				me.selector.options.query.usertypeids = data[me.options.usertypeField];
				me.selector.plusIndex = index;
				me.selector.show();
			})

			me.$main.on('click', '.app-flow-userdel', function(e) {
				var $this = $(this),
					index = $this.closest('li').index(),
					k = $this.closest('.app-flow-line').data('index'),
					data = me.options.data[k],
					item = data[me.options.childField];
				if (me.options.undeleteEnabled && data[me.options.undeleteField]) {
					return false;
				}
				if (me.options.undeleteUserEnabled && item[index][me.options.undeleteUserField]) {
					return false;
				}
				if (typeof me.options.deleteUser === 'function') {
					if (me.options.deleteUser.call(me, item, data) === false) {
						return false;
					}
				}
				item.splice(index, 1);
				$this.parent().remove();
			})

			layerSelectorOptions.callback = function(data) {
				var items = me.getData(this.plusIndex);
				items[me.options.childField] = data;
				me.render();
			};
			me.selector = me.$main.layerSelector(layerSelectorOptions).data('layerSelector');
		},
		renderEvent: function() {
			var me = this,
				k,
				len,
				item,
				items = me.options.data,
				field = me.options.matchField,
				value = this.options.matchValue;
			me.data = {};
			me.jtq = {};
			Object.keys(value).map(function(key) {
				me.initListen(key, value[key]);
			});
			if ($.isArray(items)) {
				k = 0;
				len = items.length
				while (k < len) {
					item = items[k];
					if (item && (item = item[field])) {
						me.pretreatment(item, k);
					}
					k++;
				}
				me.reset();
			}
		},
		getData: function(index) {
			var me = this,
				k = 0,
				item,
				options = me.options,
				data = options.data,
				len = data.length,
				min = options.minuserField,
				minuser = options.minuserEnabled,
				max = options.maxuserField,
				maxuser = options.maxuserEnabled,
				unplus = options.unplusEnabled,
				unplusField = options.unplusField,
				show = options.showEnabled,
				showField = options.showField,
				children = options.childField;
			if ($.isNumeric(index)) {
				return data[index] || {};
			}
			while (k < len) {
				item = data[k];
				if (!unplus || (unplus && !item[unplusField])) {
					if (minuser && $.isNumeric(item[min]) && item[min] > item[children].length) {
						main.layer.alert(me.renderText(me.locales.min, {
							nodename: item[options.nameField],
							min: item[min]
						}))
						return false;
					}
					if (maxuser && $.isNumeric(item[max]) && item[max] < item[children].length) {
						main.layer.alert(me.renderText(me.locales.max, {
							nodename: item[options.nameField],
							max: item[max]
						}))
						return false;
					}
				}
				k++;
			}
			return data;
		}
	}

	Flow.defaults = {
		data: null,
		dataField: 'data',
		nameField: 'nodename',
		usertypeField: 'usertype',
		remarkField: 'remark',
		childField: 'users',
		childNameField: 'username',
		childNameFormat: function(value, data, index) {
			return data.domainaccount && value + '(' +  data.domainaccount + ')'  || value;
		},
		unplus: false,
		unplusField: 'unplus',
		unplusEnabled: true,
		undelete: false,
		undeleteField: 'undelete',
		undeleteEnabled: true,
		undeleteUser: false,
		undeleteUserField: 'nocheck',
		undeleteUserEnabled: true,
		show: true,
		showField: 'show',
		showEnabled: true,
		maxuser: null,
		maxuserField: 'maxperson',
		maxuserEnabled: true,
	    minuser: null,
	    minuserField: 'minperson',
	    minuserEnabled: true,
		query: null,
		url: null,
		method: 'get',
		cache: false,
		contentType: 'application/json',
		dataType: 'json',
		ajaxOptions: {},
		queryParams: null,
		dataFilter: null,
		plusUser: null,
		deleteUser: null,
		locale: 'zh-CN',
		layerSelectorOptions: {
			type: 'multimember',
			query: {}
		},
		matchValue: null,
		matchField: 'expression',
		token: {
			match: '$match',
			jtq: '$jtq',
			flow: '$flow',
			data: '$data',
			item: '$item',
			index: 'index',
			expre: 'expre'
		},
		match: {
			enabled: function(flow, index) {
				var me = this,
					data = flow.options.data[index];
				if (!data) return me;
				data.unplus = false;
				data.undelete = false;
				return me;
			},
			disabled: function(flow, index) {
				var me = this,
					data = flow.options.data[index];
				if (!data) return me;
				data.unplus = true;
				data.undelete = true;
				return me;
			},
			enabledUser: function(flow, index, user) {
				var me = this,
					options = flow.options;
				if (typeof user === 'number') {
					user = options.data[index];
					if (user) user = user[options.childField];
				}
				if (!user) return me;
				user[options.undeleteUserField] = false;
				return me;
			},
			disabledUser: function(flow, index, user) {
				var me = this,
					options = flow.options;
				if (typeof user === 'number') {
					user = options.data[index];
					if (user) user = user[options.childField];
				}
				if (!user) return me;
				user[options.undeleteUserField] = true;
				return me;
			},
			show: function(flow, index) {
				var me = this,
					data = flow.options.data[index];
				if (!data) return me;
				data.show = true;
				data.unplus = false;
				return me;
			},
			hide: function(flow, index) {
				var me = this,
					data = flow.options.data[index];
				if (!data) return me;
				data.show = false;
				data.unplus = true;
				data[flow.options.childField] = [];
				return me;
			}
		}
	}

	Flow.LOCALES = {};

	Flow.LOCALES['en'] = {
		usertype: 'User Type: {usertype}',
		max: 'Please select max {max} rows in {nodename}',
		min: 'Please select least {min} rows in {nodename}'
	}

	Flow.LOCALES['zh-CN'] = {
		usertype: '用户类型: {usertype}',
		max: '{nodename} 最多选中{max}人',
		min: '{nodename} 至少选中{min}人'
	}

	Flow.rules = rules;

	if (localStorage) {
		var lng = localStorage.getItem('i18nextLng');
		if (typeof lng === 'string' && $.inArray(lng, Object.keys(Flow.LOCALES)) !== -1) {
			Flow.defaults.locale = lng;
		}
	}

	window.Flow = Flow;

	module.exports = flow;
}($);