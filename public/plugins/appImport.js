/**
 * @Author    hyj
 * @DateTime  2018-06-08
 * @copyright [copyright]
 * @version   [1.0.0]
 */
var form = require('jquery.form');

//var xlsx = require('xlsx');

!function($){
	/*'use strict';*/

	var DEFAULTS = {
		title: null,
		locale: 'zh-CN',
		name: 'file',
		synchro: false,
		url: null,
		type: 'POST',
		dataType: 'json',
		data: null,
		query: null,
		templateUrl: null,
		native: false,
		model: null,
		content: null,
		extensions: 'xls,xlsx',
		finished: null,
		dataFilter: null,
		beforeImport: null,
		callback: null,
		error: null
	}

	var ext = /\.([^.]+)$/;

	function AppImport(main, options) {
		this.$main = main instanceof $ ? main : $(main);
		this.options = $.extend({}, AppImport.defaults, options);
		this.initOptions();
		this.createServer();
		this.initEvent();
	}
	
	AppImport.prototype = {
		initOptions: function(){
			var me = this,
				option = me.options;
			if ($.isArray(option.extensions)) {
				option.extensions = option.extensions.join(',');
			}
			option.extensions = option.extensions.toLowerCase();
			me.extensions = option.extensions.split(',');
			if ($.inArray(option.locale, Object.keys(AppImport.LOCALES)) === -1) {
				option.locale = AppImport.defaults.locale;
			}
			me.locale = AppImport.LOCALES[option.locale];
			if (typeof option.title !== 'string') {
				option.title = me.locale.title;
			}
			if (!option.content) {
				option.content = ['<div class="app-import"><form class="app-import-content clearfix"><label>{name}</label><input type="file" name="'];
				option.content.push(option.name, '" /></form>');
				//option.content.push('" accept="', me.extensions.join('/'));
				if (option.templateUrl) {
					option.content.push('<div class="app-import-download"><span>{info}</span><a>{download}</a></div>')
				}
				option.content.push('</div>');
				option.content = option.content.join('');
				option.content = app.renderText(option.content, me.locale);
			}
			if (typeof option.error !== 'function') {
				option.error = new Function();
			}
		},
		fileFormat: function() {
			var me = this,
				file = me.$file.val(),
				type;
			if (!file || file === '') {
				return me.locale.EMPTY;
			}
			type = ext.exec(file) ? RegExp.$1.toLowerCase() : '';
			if ($.inArray(type, me.extensions) === -1) {
				return app.renderText(me.locale.TYPEDENIED, {
					type: me.options.extensions
				})
			}
		},
		submit: function(){
			var me = this,
				reader;
			me.loading();
			try {
				reader = new FileReader();
				reader.onload = function(){
					var item = xlsx.read(this.result, {
						type: 'binary'
					});
					item = xlsx.utils.sheet_to_json(item.Sheets[item.SheetNames[0]]);
					if ($.isArray(item)) {
						me.options.data = item;
						me.progress = 0;
						me.initProgress();
						setTimeout(function(){
							me.initServer(0);
						})
					}
					this;
				}
				reader.readAsBinaryString(me.$file[0].files[0]);
			} catch(e) {
				me.options.error.call(me, 'IMPORT_NATIVE');
			}
		},
		getItem: function(index){
			var me = this,
				k,
				len,
				model,
				value,
				res = {},
				data = me.options.data[index];
			if (data) {
				k = 0;
				model = me.options.model;
				len = model.length;
				while (k < len) {
					item = model[k];
					value = data[item.header];
					if (value !== undefined) {
						res[item.field] = value;
					}
					k ++;
				}
			}
			return res;
		},
		createServer: function(){
			if (this.options.synchro) {
				this.initServer = function(){
					var me = this,
						item,
						k = 0,
						len = me.options.data.length;
					while (k < len) {
						item = me.getItem(k);
						$.ajax({
							url: me.options.url,
							type: me.options.type,
							data: item,
							beforeSend: function(){

							},
							success: function(res){
								if (res.code === 'success') {
									me.appendSuccess(item);
								} else {
									me.appendError(item, res.message);
								}
							},
							error: function(res){
								me.appendError(item, res.responseJSON && res.responseJSON.message || '');
							}
						})
						k ++;
					}
				}
			} else {
				this.initServer = function(index){
					var me = this,
						item;
					if (index < me.options.data.length) {
						item = me.getItem(index);
						$.ajax({
							url: me.options.url,
							type: me.options.type,
							data: item,
							beforeSend: function(){

							},
							success: function(res){
								if (res.code === 'success') {
									me.appendSuccess(item);
								} else {
									me.appendError(item, res.message);
								}
							},
							error: function(res){
								me.appendError(item, res.responseJSON && res.responseJSON.message || '');
							}
						}).always(function(){
							setTimeout(function(){
								me.initServer(index + 1);
							})
						})
					}
				}
			}
		},
		loading: function(){
			var me = this,
				html = [];
			if (me.$load) {
				me.$load.remove();
				me.$load = null;
			}
			html.push('<div style="background:rgba(0, 0, 0, 0.85);color:rgb(232, 232, 232);white-space:pre;font-family:Menlo, Consolas, monospace;font-size:13px;position:fixed;z-index:');
			html.push(me.zIndex);
			html.push(';padding:20px;line-height:24px;left:0px;right:0px;top:0px;bottom:0px;overflow:auto;text-align:left;">');
			html.push('<div style="position:relative;overflow:hidden;height:100%;"></div></div>');
			me.$load = $(html.join('')).appendTo(main.document.body).children('div');
		},
		initProgress: function(){
			var me = this,
				html = [],
				k = 0,
				item,
				model = me.options.model,
				len = model.length;
			html.push('<div>正在导入中...<span style="padding-left:20px;"></span>/<span>', me.options.data.length, '</span></div><ul style="padding-right:10px;overflow:hidden;"></li>');
			while (k < len) {
				item = model[k];
				model.width = 100 / len;
				html.push('<div style="float:left;height:24px;overflow:hidden;width:', model.width, '%;">', item.header, '</div>');
				k ++;
			}
			html.push('</li></ul><ul style="overflow-y:scroll;overflow-x:hidden;width:100%;height:100%;"></ul>');
			me.$view = $(html.join('')).appendTo(me.$load);
			me.$text = me.$view.find('span:first');
			me.$table = me.$view.filter(':last');
		},
		appendSuccess: function(data){
			var me = this,
				html = [],
				k = 0,
				item,
				model = me.options.model,
				len = model.length;
			html.push('<li>');
			while (k < len) {
				item = model[k];
				html.push('<div style="float:left;height:24px;overflow:hidden;width:', model.width, '%;">', data[item.field], '</div>');
				k ++;
			}
			html.push('</li>');
			me.progress += 1;
			me.$text.html(me.progress);
			me.$table.prepend(html.join(''));
		},
		appendError: function(data, msg){
			var me = this,
				html = [],
				k = 0,
				item,
				model = me.options.model,
				len = model.length;
			html.push('<li style="color:#E36049;">');
			while (k < len) {
				item = model[k];
				html.push('<div style="float:left;height:24px;overflow:hidden;width:', model.width, '%;">', data[item.field], '</div>');
				k ++;
			}
			html.push('<div style="width:100%;float:left;"><span style="background-color:#E36049;color:#fff;padding:2px 4px;border-radius:2px;">ERROR: ', msg, '</span></div>');
			html.push('</li>');
			me.progress += 1;
			me.$text.html(me.progress);
			me.$table.prepend(html.join(''));
		},
		initEvent: function(){
			var me = this;
			if (me.options.native) {
				setTimeout(function(){
					if (me.$file) {
						me.$file.on('change', function(){

						})
					}
				})
			}

			me.$main.on('click', function(){
				main.layer.open({
					type: 1,
					title: me.options.title,
					skin: 'layer-sw app-layer-layout',
					area: ['400px', '240px'],
					btn: [i18next.t('button.import'), i18next.t('button.back')],
					content: me.options.content,
					success: function($parent, index) {
						me.zIndex = this.zIndex + 1;
						me.$file = $('input[type=file]', $parent);
						me.$form = $('form', $parent);
						if (me.options.templateUrl) {
							$parent.on('click', '.app-import-download a', function(){
								app.export(me.options.templateUrl, true)
							})
						}
						if (typeof me.options.finished === 'function') {
							me.options.finished.call(me, parent);
						}
					},
					yes: function(index) {
						var msg;
						if (msg = me.fileFormat()) {
							main.layer.alert(msg);
							return false;
						}
						if (typeof me.options.beforeImport === 'function') {
							if (me.options.beforeImport.call(me) === false) {
								return false
							}
						}
						if (me.options.native) {
							me.submit();
							return true;
						}
						me.$form.ajaxSubmit({
							url: me.options.url,
							type: me.options.type,
							dataType: me.options.dataType,
							success: function(res) {
								var html = [];
								if (res.code == 'success') {
									if (res.data.failnum) {
										res.data.failreasons.map(function(item){
											html.push('<p>第' + item.rownumber + '行，' + item.reason)
										})
										main.layer.alert(html.join(''));
									} else {
										main.layer.close(index);
										if (typeof me.options.callback === 'function') {
											me.options.callback.call(me);
										}
									}
								} else {
									main.layer.alert(res.message);
								}
							}
						})
                    }
                })
            })
		}
	};

	AppImport.defaults = $.extend({}, DEFAULTS);

	AppImport.resetOption = function(){
		AppImport.defaults = $.extend({}, DEFAULTS);
		return this;
	}

	var LOCALES = {};

	LOCALES['en'] = {
		title: 'Import file',
		name: 'file',
		select: 'select file',
		download: 'download the template',
		info: 'If you need',
		EMPTY: 'Please select the file!',
		TYPEDENIED: 'Please upload the {type} format file for import'
	}

	LOCALES['zh-CN'] = {
		title: '导入页面',
		name: '文件',
		select: '选择文件',
		download: '下载模板',
		info: '如有需要',
		EMPTY: '请选择文件！',
		TYPEDENIED: '请上传 {type} 格式文件进行导入'
	}

	AppImport.LOCALES = LOCALES;

	if (localStorage) {
		var lng = localStorage.getItem('i18nextLng');
		if ($.inArray(lng, Object.keys(AppImport.LOCALES)) !== -1) {
			AppImport.defaults.locale = lng;
		}
	}

	window.appImport = AppImport;
}($)