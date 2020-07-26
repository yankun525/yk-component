/**
 * @Author    hyj
 * @DateTime  2018-03-15
 * @copyright [copyright]
 * @license   [license]
 * @version   [1.0.0]
 * ==================== multiviews配置项 ====================
 * locale                  语言选择
 * maxPage                 最大打开页
 * classes                 基础样式添加
 * views                   默认打开页面
 * height                  高度设置 默认自适应
 * speed                   头部动画时间
 * icons                   设置图标样式
 *     iconLeft            左箭头图标
 *     iconRight           右箭头图标
 *     iconClosed          关闭图标
 * error                   出问题时统一的接收函数
 */
!function($){
	var DEFAULTS = {
		locale: 'zh-CN',
		maxPage: 20,
		classes: null,
		views: [],
		height: 'auto',
		speed: 200,
		menuEnabled: true,
		closeOurEnabled: true,
		closeOtherEnabled: true,
		closeAllEnabled: true,
		showTitle: false,
		icons: {
			iconLeft: 'iconfont icon-xiangzuojiantou',
			iconRight: 'iconfont icon-xiangyoujiantou',
			iconClosed: 'iconfont icon-guanbi'
		},
		error: function(type, message){
			switch (type) {
				case 'MAX_PAGE_SIZE':
					SWTOOL.layer.error('打开窗口超过限制');
					break;
				default :
					message && SWTOOL.layer.error(message);
			}
		},
		showChange: function() {
			return true;
		} 
	}

	var VIEW_DEFAULTS = {
		id: null,
		title: null,
		url: null,
		content: null,
		close: null,
		allowClosed: true,
		showTitle: null,
		success: null,
		onlyOne: true,
		refresh: false
	}

	var TEMPLATE = {
		VIEW: '<div class="multiviews-top">\
			<i class="multiviews-icon-left {iconLeft}"></i>\
			<i class="multiviews-icon-right {iconRight}"></i>\
			<div class="multiviews-title">\
				<ul></ul>\
			</div>\
		</div>\
		<div class="multiviews-body"></div>',
		FRAME: '<iframe frameborder="0" allowtransparency="true" width="100%" scrolling="auto" \
		hidefocus="true" name="{name}" style="height:{height}px;" src="{url}"></iframe>',
		CONTENT: '<div{id}>{content}</div>'
	}

	function multiViews(el, options) {
		if (!(el instanceof $)) {
			el = $(el)
		}
		if (typeof options !== 'object') {
			options = {}
		}
		if (el.length > 1) {
			var selector = [];
			el.each(function(){
				selector.push(new multiViews(this, options))
			})
			return selector;
		}
		if (el.length === 0) {
			return this;
		}
		this.classes = el.prop('class');
		this.$main = el;
		this.id = 'multiview';
		this.index = 0;
		this.initSelectEvent();
		this.initOptions(options);
		this.init();
		this.initShowIndex();
		this.initLeft();
		this.open(this.options.views);
		this.initEvent();
		this.resize();
		return this;
	}

	multiViews.prototype = {
		init: function(){
			var me = this;
			me.$main.addClass('multiviews');
			if (typeof me.options.classes === 'string') {
				me.$main.addClass(me.options.classes);
			}
			me.$main.empty().append(me.renderText(TEMPLATE.VIEW, me.options.icons));
			me.$body = me.$main.find('.multiviews-body');
			me.$title = me.$main.find('.multiviews-title>ul');
			me.$left = me.$main.find('.multiviews-icon-left');
			me.$right = me.$main.find('.multiviews-icon-right');
			return this;
		},
		initOptions: function(options){
			var me = this;
			me.views = [];
			options = $.extend({}, me.$main.data(), options);
			me.options = $.extend({}, DEFAULTS, options);
			me.options.icons = $.extend({}, DEFAULTS.icons, options.icons);
			me.locale = multiViews.LOCALES[me.options.locale];
			return this;
		},
		initShowIndex: function(){
			var me = this;
			Object.defineProperty(me, 'showIndex', {
				get: function(){
					return this._showIndex;
				},
				set: function(index){
					var view,
						rl,
						ll,
						vl,
						tl,
						tw,
						vw;
					if (this.showIndex !== index && (view = me.getView(index))) {
						me.hideView();
						view.$title.addClass('active');
						view.$main.show();
						this._showIndex = index;
						//右箭头左边距
						rl = me.$right.offset().left;
						//头部显示项左边距
						vl = view.$title.offset().left;
						//头部显示项宽度
						vw = view.$title.outerWidth();
						//左箭头左边距 + 宽度
						ll = me.$left.offset().left + me.$left.outerWidth() - 1;
						//头部容器左边距
						tl = me.$title.offset().left;
						if (rl < vl + vw) {
							me.left = rl - ll - vl + tl - vw;
						} else {
							if (ll > vl) {
								me.left = Math.min(tl - vl, -1);
							} else {
								//头部容器宽度
								tw = me.$title.outerWidth();
								if (tw + tl < rl && me.left < -1) {
									me.left = Math.min(me.left + rl - tw - tl, -1);
								}
							}
						}
						if (typeof this.options.showChange === 'function') {
							this.options.showChange.call(this, view, index);
						}
					}
				}
			})
		},
		initViewId: function(){
			return this.id + '-' + (1000 + this.index);
		},
		initLeft: function(){
			var me = this;
			me._left = -1;
			Object.defineProperty(me, 'left', {
				get: function(){
					return this._left;
				},
				set: function(left){
					if (left < 0) {
						if (me.$title.is(':animated')) {
							me.$title.stop()
						}
						me.$title.animate({
							left: left
						}, me.options.speed);
						this._left = left;
					}
				}
			})
		},
		resize: function(){
			var me = this,
				wh,
				height = me.options.height;
			if (typeof height === 'number' && height > 0) {
				me.height = height;
			}else{
				me.height = window.document.body.clientHeight;
				me.height = me.height - me.$body.offset().top;
				if(typeof height === 'function'){
					try {
						me.height = height.call(me, me.height);
					} catch(e) {
						console.error(e);
					}
				}
			};
			me.$body.height(me.height);
			$.map(me.views, function(view){
				view.$main.height(me.height);
			})
			return this;
		},
		open: function(views, refresh){
			var me = this,
				k,
				len,
				view,
				selector;
			if (!$.isArray(views)) {
				if (me.views.length >= me.options.maxPage) {
					me.options.error('MAX_PAGE_SIZE');
					return false;
				}
				selector = me.create(views, refresh);
				me.showIndex = selector;
				return selector;
			}
			k = 0;
			len = views.length;
			selector = [];
			while (k < len) {
				if (me.views.length >= me.options.maxPage) {
					me.options.error('MAX_PAGE_SIZE');
					return false;
				}
				view = views[k];
				selector.push(me.create(view, refresh));
				k ++;
			}
			me.showIndex = selector[selector.length - 1];
			return selector;
		},
		create: function(view, refresh) {
			var me = this,
				title,
				res;
			if (typeof view === 'object') {
				res = me.getView(view.id);
				if (res) return res.index;
			};
			view = $.extend({}, VIEW_DEFAULTS, view);
			if (view.url) {
				if (view.onlyOne) {
					if (res = me.getViewByUrl(view.url)) {
						if (view.data) res.data = view.data;
						if (res.refresh || refresh) {
							try {
								res.$main[0].contentWindow.location.reload(true);
							} catch (e) {
								console.error(e);
							}
						}
						return res.index;
					}
				}
				if (!view.id) {
					view.id = me.initViewId();
				};
				view.$main = $(me.renderText(TEMPLATE.FRAME, {
					url: view.url,
					height: me.height,
					name: view.id
				})).appendTo(me.$body);
				view.$main[0].contentWindow.location.href = view.url;
			} else {
				view.$main = $(me.renderText(TEMPLATE.CONTENT, {
					content: view.content,
					id: view.id ? ' id="' + view.id + '"' : ''
				})).appendTo(me.$body);
			}
			view.index = me.index++;
			if (typeof view.showTitle !== 'boolean') {
				view.showTitle = me.options.showTitle;
			};
			title = ['<li data-index="', view.index, '"><span'];
			if (view.showTitle) {
				title.push(' title="', view.title, '"');
			};
			title.push('>', view.title, '</span>');
			if (view.allowClosed) {
				title.push('<i class="multiviews-icon-close ', me.options.icons.iconClosed, '"></i>');
			};
			title.push('</div>');
			view.$title = $(title.join('')).appendTo(me.$title);
			me.views.push(view);
			if (typeof view.success === 'function') {
				view.success.call(me, view.$main, view.index, view);
			}
			return view.index;
		},
		getViewByUrl: function(url){
			var me = this,
				k = 0,
				views = me.views,
				len = views.length;
			while (k < len) {
				if (views[k].url === url) {
					return views[k];
				}
				k ++;
			}
			return null;
		},
		getView: function(param, callback){
			var me = this,
				k,
				len,
				view,
				views,
				key;
			if (key = typeof param === 'number' ? 'index' : typeof param === 'string' ? 'id' : null) {
				k = 0;
				views = me.views;
				len = views.length;
				while (k < len) {
					view = views[k];
					if (view[key] === param) {
						if (typeof callback === 'function') {
							callback.call(me, view);
						}
						return view;
					}
					k ++;
				}
			}
			return null;
		},
		close: function(id, callback){
			var me = this;
			if (typeof id === 'string') {
				me.closeView('id', id, callback);
			}
			return this;
		},
		closeViewByIndex: function(items, callback){
			var me = this,
				tw,
				tl,
				rl,
				ll,
				openIndex;
			if (!$.isArray(items)) {
				items = [items];
			}
			$.map(items, function(index) {
				var k = 0,
					view,
					views = me.views;
				index = parseInt(index);
				if (index >= 0) {
					for ( ; k < views.length ; ) {
						view = views[k];
						if (view.index === index && view.allowClosed) {
							if (view.index === me.showIndex) {
								openIndex = k > 0 ? views[k - 1].index : views[k + 1] ? views[k + 1].index : null;
							}
							view.$title.remove();
							view.$main.remove();
							if (typeof view.close === 'function') {
								try {
									view.close.call(me, view)
								} catch(e) {
									console.error(e)
								}
							}
							views.splice(k, 1);
						} else {
							k ++;
						}
					}
				}
			});
			if (!me.getView(me.showIndex) && typeof openIndex === 'number'){
				me.showIndex = openIndex;
			} else {
				rl = me.$right.offset().left;
				ll = me.$left.offset().left + me.$left.outerWidth() - 1;
				tl = me.$title.offset().left;
				tw = me.$title.outerWidth();
				if (tl + tw < rl && tl < ll) {
					me.left = Math.min(rl - tw - ll, -1);
				}
			}
			if (typeof callback === 'function') {
				try {
					callback.call(me, view)
				} catch(e) {
					console.error(e)
				}
			}
			return me;
		},
		closeView: function(type, value, callback){
			var me = this,
				k = 0,
				view,
				index,
				tw,
				tl,
				rl,
				ll,
				views = me.views;
			for ( ; k < views.length ; ) {
				view = views[k];
				if (value === view[type] && view.allowClosed) {
					if (typeof callback === 'function') {
						try {
							callback.call(me, view)
						} catch(e) {
							console.error(e)
						}
					}
					if (view.index === me.showIndex) {
						index = k > 0 ? views[k - 1].index : views[k + 1] ? views[k + 1].index : null;
					}
					view.$title.remove();
					view.$main.remove();
					if (typeof view.close === 'function') {
						try {
							view.close.call(me, view)
						} catch(e) {
							console.error(e)
						}
					}
					views.splice(k, 1);
				} else {
					k ++;
				}
			}
			if (!me.getView(me.showIndex) && typeof index === 'number'){
				me.showIndex = index;
			} else {
				rl = me.$right.offset().left;
				ll = me.$left.offset().left + me.$left.outerWidth() - 1;
				tl = me.$title.offset().left;
				tw = me.$title.outerWidth();
				if (tl + tw < rl && tl < ll) {
					me.left = Math.min(rl - tw - ll, -1);
				}
			}
			return this;
		},
		closeOurView: function(index){
			var me = this;
			me.closeViewByIndex(index);
			return me;
		},
		closeOtherView: function(index){
			var me = this,
				tw,
				tl,
				rl,
				ll,
				k,
				view,
				views = me.views,
				openIndex;
			index = parseInt(index);
			for (k = 0 ; k < views.length ; ) {
				view = views[k];
				if (view.index !== index && view.allowClosed) {
					if (view.index === me.showIndex) {
						openIndex = k > 0 ? views[k - 1].index : views[k + 1] ? views[k + 1].index : null;
					}
					view.$title.remove();
					view.$main.remove();
					if (typeof view.close === 'function') {
						try {
							view.close.call(me, view)
						} catch(e) {
							console.error(e)
						}
					}
					views.splice(k, 1);
				} else {
					k ++;
				}
			}
			if (!me.getView(me.showIndex) && typeof openIndex === 'number'){
				me.showIndex = openIndex;
			} else {
				rl = me.$right.offset().left;
				ll = me.$left.offset().left + me.$left.outerWidth() - 1;
				tl = me.$title.offset().left;
				tw = me.$title.outerWidth();
				if (tl + tw < rl && tl < ll) {
					me.left = Math.min(rl - tw - ll, -1);
				}
			}
			return me;
		},
		closeAllView: function(){
			var me = this,
				tw,
				tl,
				rl,
				ll,
				k,
				view,
				views = me.views,
				openIndex;
			for (k = 0 ; k < views.length ; ) {
				view = views[k];
				if (view.allowClosed) {
					if (view.index === me.showIndex) {
						openIndex = k > 0 ? views[k - 1].index : views[k + 1] ? views[k + 1].index : null;
					}
					view.$title.remove();
					view.$main.remove();
					if (typeof view.close === 'function') {
						try {
							view.close.call(me, view)
						} catch(e) {
							console.error(e)
						}
					}
					views.splice(k, 1);
				} else {
					k ++;
				}
			}
			if (!me.getView(me.showIndex) && typeof openIndex === 'number'){
				me.showIndex = openIndex;
			} else {
				rl = me.$right.offset().left;
				ll = me.$left.offset().left + me.$left.outerWidth() - 1;
				tl = me.$title.offset().left;
				tw = me.$title.outerWidth();
				if (tl + tw < rl && tl < ll) {
					me.left = Math.min(rl - tw - ll, -1);
				}
			}
			return me;
		},
		hideView: function(){
			var me = this,
				k = 0,
				view,
				views = me.views,
				len = views.length;
			while (k < len) {
				view = views[k];
				view.$title.removeClass('active');
				view.$main.hide();
				k ++;
			}
			return this;
		},
		initEvent: function(){
			var me = this;

			if (typeof me.options.height !== 'number') {
				$(window).on('resize', function() {
					me.resize()
				})
			}

			me.$main.off('click').on('click', '.multiviews-icon-close', function(e){
				var index = this.parentElement.getAttribute('data-index');
				e.stopPropagation();
				me.closeViewByIndex(parseInt(index));
			}).on('click', 'li', function(e){
				var index = this.getAttribute('data-index');
				me.showIndex = parseInt(index);
			})

			me.$left.off('click').on('click', function(e){
				var index = me.$title.find('.active').prev().data('index');
				if (index >= 0) {
					me.showIndex = index;
				}
			})

			me.$right.off('click').on('click', function(e){
				var index = me.$title.find('.active').next().data('index');
				if (index >= 0) {
					me.showIndex = index;
				}
			})

			if (me.options.menuEnabled) {
				me.$main.on('contextmenu', 'li', function(e){
					var html = ['<ul class="multiviews-dropdown">'],
						index = this.getAttribute('data-index');
					e.stopPropagation();
					me.closeMenu();
					if (me.options.closeOurEnabled) {
						html.push('<li type="closeOurView">', me.locale.closeOur, '</li>');
					}
					if (me.options.closeOtherEnabled) {
						html.push('<li type="closeOtherView">', me.locale.closeOther, '</li>');
					}
					if (me.options.closeAllEnabled) {
						html.push('<li type="closeAllView">', me.locale.closeAll, '</li>');
					}
					html.push('</ul>');
					$(html.join('')).appendTo(document.body).css({
						left: e.clientX,
						top: e.clientY
					}).on('click', '[type]', function(e) {
						var type = this.getAttribute('type');
						e.stopPropagation();
						me.closeMenu();
						if (typeof me[type] === 'function') {
							me[type](index);
						}
					});
					//$.closeALlMenuExt();
					//_window.showMenuExt(e);
					return false;
				});
			}

			window.dropDownManager.addDropEvent(function(){
				me.closeMenu();
			})
		},
		closeMenu: function() {
			$(document.body).children('.multiviews-dropdown').remove();
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
		initSelectEvent: function(){
			if (document.all) {
				this.addSelectEvent = function(){
					document.onselectstart = function(){
						return true
					}
				}
				if (window.getSelection){
					this.removeSelectEvent = function(){
						window.getSelection().removeAllRanges();
						document.onselectstart = function(){
							return false
						}
					}
				} else {
					this.removeSelectEvent = function(){
						document.selection.empty();
						document.onselectstart = function(){
							return false
						}
					}
				}
			} else {
				this.addSelectEvent = function(){
					document.onmousedown = function(){
						return true
					}
					document.onmouseup = function(){
						return true
					}
				}
				if (window.getSelection){
					this.removeSelectEvent = function(){
						window.getSelection().removeAllRanges();
						document.onmousedown = function(){
							return false
						}
						document.onmouseup = function(){
							return false
						}
					}
				} else {
					this.removeSelectEvent = function(){
						document.selection.empty();
						document.onmousedown = function(){
							return false
						}
						document.onmouseup = function(){
							return false
						}
					}
				}
			}
		}
	}

	multiViews.LOCALES = {};

	multiViews.LOCALES['en'] = {
		closeOur: 'Close our',
		closeOther: 'Close other',
		closeAll: 'Close all'
	}

	multiViews.LOCALES['zh-CN'] = {
		closeOur: '关闭当前窗口',
		closeOther: '关闭其他窗口',
		closeAll: '关闭所有窗口'
	}

	if (localStorage) {
		var lng = localStorage.getItem('i18nextLng');
		if ($.inArray(lng, Object.keys(multiViews.LOCALES)) !== -1) {
			DEFAULTS.locale = lng;
		}
	}

	window.multiViews = multiViews;
}($)