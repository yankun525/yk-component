/**
 * @Author    hyj
 * @DateTime  2019-01-12
 * @copyright [copyright]
 * ==================== multigrid配置项 ====================
 * reload                     实例化完成且有url的时候是否默认加载数据
 * hover                      鼠标移上去时是否显示hover样式
 * layout                     设置风格模式 default single tree
 * undefinedText              值为undefined或者null时的替换方案
 * locale                     国际化设置对应语言
 * striped                    是否开启隔行换色
 * height                     设置高度,number或者function
 * clickToSelect              单击行是否触发选中改行
 * singleSelect               设置是否单选
 * checkField                 设置默认选中的对应data的key值,如果model的checkbox含有field,以field为主
 * checked                    设置默认是否选中
 * nocheck                    设置默认每一行是否不允许选中
 * nocheckField               数据控制设置每一行是否可以选中的key值
 * nocheckEnabled             是否开启数据控制是否可以选中
 * singleDetail               是否每次只打开一个详情页
 * detail                     设置默认显示隐藏详情
 * detailEnabled              是否开启列详情
 * detailFormat               列详情渲染回调
 * detailField                通过数据开启每行是否展示详情
 * clickToDetail              设置点击行时是否修改详情展示情况
 * nodetail                   设置默认是否有详情
 * nodetailField              通过数据开启是否有详情控制
 * nodetailEnabled            设置开启是否有详情控制
 * undetail                   设置默认允许显示隐藏详情
 * undetailField              通过数据控制允许显示隐藏详情
 * undetailEnabled            设置是否开启允许显示隐藏详情
 * orderByOne                 设置是否是单行排序
 * sortOrder                  设置默认的排序方式升序还是降序
 * sortText                   设置排序参数的key和value之间的分隔符
 * sortSpace                  设置排序参数之间的分隔符
 * sortField                  传递给后台对应的key值
 * ascField                   升序对应的value值
 * descField                  降序对应的value值
 * fixedModel                 固定列对应的列属性
 * model                      普通列对应的列属性
 * fixedRow                   设置前面多少行固定，number类型
 * menuExt                    右键菜单
 *      enabled               是否开启右键菜单 配置项
 *      showPage                      是否展示分页行
 *      showTotal                     是否展示总数
 *      showPageData                  是否展示每页条数
 *      showPagina                    是否展示分页
 *      showModel                     设置是否显示表格列动态显示隐藏按钮
 *      showFixedRow                  是否展示固定行
 *      showFixedCol                  是否展示固定列
 *      showFixedRowCol               是否展示固定行列
 *      showCancelFixed               是否展示取消固定
 *                                固定行
 *                                固定列
 *                                固定行列
 *                                取消固定
 * formId                     设置表单id,加载数据时默认会取表单里的数据传递给后台
 * searchId                   设置默认的searchid
 * selectId                   设置默认查询按钮id
 * blurSearchId               设置模糊查询输入框id
 * blurSelectId               设置模糊查询按钮id
 * toggleId                   设置默认的toggleid
 * emptyId                    设置默认清空按钮id
 * data                       设置初始的行数据 Array
 * url                        ajax地址
 * method                     ajax提交方式 get post等
 * cache                      是否开启缓存 Boolean
 * contentType                ajax媒体类型
 * dataType                   传递数据类型
 * ajaxOptions                ajax配置其余项
 * showFooter                 是否展示页脚
 * footerFormat               页脚渲染回调
 * showPage                   是否显示分页行 Boolean
 * clientPages                是否启动客户端分页
 * showTotalData              是否展示总数 Boolean
 * showPageData               是否展示每页条数 以及修改每页展示多少条数据 Boolean
 * showPaginaData             是否展示分页 Boolean
 * showModel                  设置是否显示表格列动态显示隐藏按钮
 * pageData                   每页条数选择时可提供哪些选择 Array
 * pageSize                   分页大小
 * pageNumber                 跳到第几页
 * sizeField                  分页大小对应key值
 * numberField                跳到第几页对应key值
 * totalField                 后台返回的总共多少条数据对应key值
 * itemsField                 后台返回的数据对应key值
 * icons                      设置对应的字体图标
 *      paginaFirst           首页
 *      paginaPrev            上一页
 *      paginaNext            下一页
 *      paginaLast            末页
 *      sortUpDown            未排序
 *      sortUp                向上排序
 *      sortDown              向下排序
 *      modelSettings         设置显示列按钮
 *      detailPlus            详情关闭时按钮
 *      detailMinus           详情打开时按钮
 * oprate                     表格中有列数据type为oprate时调用
 *                            数据类型[{
 *                                classes: 按钮样式class
 *                                name:    按钮名称
 *                                onClick: 点击回调
 *                                show:    是否显示
 *                                deleted: 是否已被删除
 *                            }]
 * oprateFilter               过滤需要展示的oprate数据
 * query                      设置默认需要的传参
 * queryParams                提交ajax前的传参回调
 * sortParams                 设置排序参数时的回调
 * dataFilter                 后台获取的数据需要过滤时回调
 * onPostRender               表格内容审查完成后回调
 * onRowClick                 单击行回调 返回false则不执行后面的操作 如选中该行
 * onDbRowClick               双击行回调 返回false则不执行后面的操作 如选中该行
 * initRows                   渲染每一行时对每一行进行初始化配置
 *                            可设置配置{
 *                                className  设置rowClass
 *                                checked    设置是否选中
 *                                nocheck    设置是否允许修改选中状态
 *                                detail     设置是否展开行详情
 *                                nodetail   设置该行是否有详情
 *                                undetail   设置是否允许修改行详情展示还是隐藏
 *                            }
 * rowPostRender              渲染表格的时候完成时候对表格每行进行设置 传入row index
 *
 * model                      设置行数组对象 Array
 *   show                     是否显示该列
 *   header                   表头名称
 *   type                     设置组件类型checkbox, index, input, date, upload, checkbox, link, oprate等
 *   field                    设置对应数据的key值
 *   width                    设置表格宽度
 *   rowspan                  设置合并列
 *   colspan                  设置合并行
 *   minWidth                 设置最小动态修改宽度
 *   maxWidth                 设置最大动态修改宽度
 *   align                    对齐方式
 *   showTitle                设置是否显示title
 *   sortable                 是否进行排序
 *   sortProperty             排序传递的参数
 *   sortOrder                设置初始化时默认的排序方式
 *   resizable                是否可以修改表格列宽度
 *   draggable                是否可以拖拽表格列
 *   headerStyle              设置表头样式
 *   rowStyle                 设置表格样式
 *   settingsName             设置settings按钮对应的name如果没有取header值
 *   escape                   是否需要进行转码
 *   format                   设置自定义模板或者函数
 *   enabled                  是否开启组件
 *   allowHide                是否可以动态隐藏
 *   mergeCells               设置默认是否合并列
 *   create                   设置自定义组件创建函数
 *   done                     设置组件渲染成功后的回调函数
 *   option                   第三方组件的option,组件类型是select时,
 *   						  设置数组[{value:'', text:''}]text显示值,value传递的值
 *   sortNumber               前端排序时设置按number类型排序还是string类型排序 默认不设置 由组件自行判断
 *
 * ==================== multigrid函数 ====================
 *
 * resize                     重新计算表格高度
 * load                       重新加载ajax
 * append                     增加行，可传入data(增加row的data值), index(控制row加在什么位置)
 * reset                      重置所有行 传入data数组对象
 * update                     更新某一行data 更新的数据 index更新到第几行
 * resetCheckAll              重置checkAll
 * checkedAll                 全部行选中
 * uncheckedAll               全部行不选
 * inverseChecked             传入index或者array 根据index反选
 * inverseCheckedAll          全部行反选
 * checked                    传入index或者array 根据index选中
 * unchecked                  传入index或者array 根据index不选
 * toggleDetail               展示/收起详情行
 * showDetail                 展示详情行
 * hideDetail                 收起详情行
 * showDetailAll              展示所有详情行
 * hideDetailAll              收起所有详情行
 * detailResetAll             修改表头详情行样式
 * refreshDetail              刷新详情行
 * delRow                     删除行，删除对应index的行，arguments为数字或数组
 * delSltRow                  删除选中行
 * emptyRow                   删除所有行
 * getClientData              获取from表单数据
 * getData                    获取所有行数据
 * getGridData                获取所有行数据，包括表头数据
 * getModelByParam            依据Param获取表头对象(param(对应对象属性名), content(对应对象属性内容))
 * getDataByEl                根据row内元素对象获取row
 * getDataByIndex             根据row的id获取row
 * getIndexByEl               依据Param获取row对象(param(对应对象属性名), content(对应对象属性内容))
 * getSltData                 获取选中行数据
 * getUnSltData               获取未选中行数据
 * getAllModelField           获取所有列的field组成的数组 传入true则包括隐藏的列
 * getFixedModelField         获取固定列的field组成的数组 传入true则包括隐藏的列
 * getModelField              获取一般列的field组成的数组 传入true则包括隐藏的列
 * changePage                 修改每页展示的数据条数,如果不传入pageSize,找page的select
 * selectPage                 修改展示第几页,如果不传入pageNumber,找page的input
 * firstPage                  跳到首页
 * prevPage                   前跳一页
 * nextPage                   后跳一页
 * lastPage                   跳到末页
 * showLoading                显示加载
 * hideLoading                隐藏加载
 * mergeCells                 合并单元格 只进行列合并 items(需要合并的列 数字或数组 如果是数组则合并数组内的所有列)
 * freezeMergeCells           强制合并单元格
 *                                option{
 *                                    index     合并行index
 *                                    field     合并行field
 *                                    rowspan   需要合并多少行
 *                                    colspan    需要合并多少列
 *                                }
 * hasDataByKeys              根据key值判断当前行(data(对应数据), key(数据内的唯一key值名称))是否存在
 * uniqueDataBykeys           根据key值去重,将筛选后的值返回
 *
 */

!function($) {
	/*'use strict';*/
	var PLUGINS = {
		input: {
			enabled: true,
			create: function(data, grid){
				var that = this,
					html = ['<input type="text" class="form-control"'];
				if (that.maxlength) {
					html.push(' maxlength="', that.maxlength, '"');
				};
				if (that.placeHolder) {
					html.push(' placeholder="', that.placeHolder, '"');
				};
				html.push(' value="', that.value, '" />');
				return html.join('');
			},
			done: function(grid){
				var me = this;
				me.$el.children('input').on('blur', function(e){
					var data = grid.getDataByIndex(me.index);
					data[me.field] = this.value;
				});
				me.$el.on('click', function(e){
					e.stopPropagation();
				});
			}
		},
		select: {
			enabled: true,
			create: function(data, grid){
				var html = [],
					selected = false,
					me = this;
				html.push('<select class="form-control" name="', me.field, '">');
				$.map(me.option, function(item){
					html.push('<option value="', item.value, '"')
					if (item.value === me.value) {
						html.push(' selected="selected"');
						selected = true;
					}
					html.push('>', item.text, '</option>')
				});
				if (!selected && me.option.length !== 0) {
					data[me.field] = me.value = me.option[0].value;
				}
				html.push('</select>');
				return html.join('');
			},
			done: function(grid){
				var me = this;
				me.$el.children('select').off('change').on('change', function(e){
					var data = grid.getDataByEl(this);
					data[this.name] = this.value;
				}).select2({
					minimumResultsForSearch: -1,
					width: parseInt(me.width) - 10,
				})
				me.$el.off('click').on('click', function(e){
					e.stopPropagation();
				});
			}
		},
		date: {
			enabled: true,
			init: function() {
				if (typeof this.option === 'object') {
					this.option = $.extend({}, this.option);
				}
			},
			create: function(data, grid){
				if (typeof this.value === 'number') {
					this.value = moment(this.value).format(this.option.format);
				}
				this.option.locale = grid.options.locale;
				if(this.placeHolder){
					return '<input type="text" class="form-control" value="' +
					this.value + '" name="' + this.field + '" placeholder = "'+this.placeHolder+'" />';
				}else{
					return '<input type="text" class="form-control" value="' +
					this.value + '" name="' + this.field + '" />';
				}

			},
			done: function(grid){
				var me = this;
				me.$date = me.$el.find('input');
				me.$el.off('click').on('click', function(e){
					e.stopPropagation();
				});
				me.$date.datetimepicker(this.option).on('dp.change', function(e) {
					var index = me.id.split('_'),
						data,
						value = this.value;
					index = index[index.length - 2];
					data = grid.getDataByIndex(index);
					data[me.field] = value;
					if (me.maxDate) {
						var row = grid.getRowByIndex(index);
						$.each(row.plugin, function(item){
							if (this.field == me.maxDate && this.type === 'date') {
								this.$date.datetimepicker('minDate', value)
								return false;
							}
						})
					}
					if (me.minDate) {
						var row = grid.getRowByIndex(index);
						$.each(row.plugin, function(index){
							if (this.field == me.minDate && this.type === 'date') {
								this.$date.datetimepicker('maxDate', value)
								return false;
							}
						})
					}
				});
				if (me.maxDate && me.value) {
					var row = grid.getRowByIndex(me.index);
					$.each(row.plugin, function(item){
						if (this.field == me.maxDate && this.$date && this.type === 'date') {
							this.$date.datetimepicker('minDate', me.value)
							return false;
						}
					})
				}
				if (me.minDate && me.value) {
					var row = grid.getRowByIndex(me.index);
					$.each(row.plugin, function(index){
						if (this.field == me.minDate && this.$date && this.type === 'date') {
							this.$date.datetimepicker('maxDate', me.value)
							return false;
						}
					})
				}
			},
			//如果需要设置同行另一个组件的开始时间 将field设置进来
			minDate: null,
			//如果需要设置同行另一个组件的结束时间 将field设置进来
			maxDate: null,
			placeHolder: null,
			option: {
				format: 'YYYY-MM-DD',
				widgetParent: $('body')
			}
		},
		upload: {
			enabled: true,
			create: function(data, grid){
				var me = this;
				me.uploadId = me.id + '_upload';
				return '<div id="' + me.uploadId + '"></div>';
			},
			done: function(grid){
				var me = this,
					data = grid.getDataByIndex(me.index),
					item = {};
				item[me.nameField] = data[me.nameField];
				item[me.docidField] = data[me.docidField];
				item[me.revField] = data[me.revField];
				$.appUpload.upload('#' + me.uploadId, {
					nameField: me.nameField,
					docidField: me.docidField,
					revField: me.revField,
					data: item,
					download: me.download,
					preview: me.preview,
					sso: me.sso,
					uploadSuccess: function(file){
						data[me.nameField] = file.name;
						data[me.docidField] = file.docid;
						data[me.revField] = file.rev;
					},
					delete: $.extend({
						onClick: function(){
							data[me.nameField] = null;
							data[me.docidField] = null;
							data[me.revField] = null;
						}
					}, me.delete)
				}, me.option);
				me.$el.off('click').on('click', function(e){
					e.stopPropagation();
				})
			},
			//uploadHelper配置项
			nameField: 'attachname',
			docidField: 'docid',
			revField: 'rev',
			download: {
				show: true
			},
			//webuploader配置项
			option: {}
		},
		switchery: {
			enabled: true,
			create: function(data, grid) {
				var me = this;
				if (me.value === me.check) {
					me.checked = true;
				} else if (me.value === me.uncheck) {
					me.checked = false;
				}
				data[me.field] = me.checked ? me.check : me.uncheck;
				return '<input type="checkbox" name="' + me.field + '"' + (me.checked ? ' checked': '') + '>';
			},
			done: function(grid){
				var me = this,
					$el = me.$el.children('input[type=checkbox]');
				me.switchery = new Switchery($el[0], me.option);
				$el.on('change', function(){
					var data = grid.getDataByEl(this);
					me.checked = this.checked;
					data[this.name] = me.checked ? me.check : me.uncheck;
				})
				me.$el.on('click', function(e){
					e.stopPropagation();
				});
			},
			checked: true,
			check: 1,
			uncheck: 0,
			width: 60,
			option: {
				size: 'small'
			}
		},
		singledealer: {
			enabled: true,
			create: function(row, grid){
				var that = this;
				return '<div class="pos-rlt" selector="singledealer">\
					<input type="text" value="' + that.value + '" data-temp="{name}" class="form-control" readonly />\
					<i class="ion-ios-search-strong search-icon"></i>\
				</div>'
			},
			done: function(grid){
				var that = this;
				that.$el.off('click').on('click', function(e){
					e.stopPropagation();
				})
				that.$el.children('div').layerSelector({
					callback: function(item){
						var data = grid.getDataByIndex(that.index);
						item = item[0];
						data[that.field] = item.name;
						data[that.idField] = item.userno;
					}
				})
			}
		}
	}

	var LAYOUT = ['default', 'single', 'tree'];

	var property = /{[^}]+}/g;

	var DEFAULTS = {
		reload: true,
		hover: true,
		layout: 'default',
		undefinedText: '',
		locale: 'zh-CN',
		striped: true,
		height: null,
		exportName: null,
		exportType: null,
		clickToSelect: true,
		singleSelect: false,
		checked: false,
		checkField: 'checked',
		nocheck: false,
		nocheckField: 'nocheck',
		nocheckEnabled: false,
		singleDetail: false,
		clickToDetail: false,
		detail: false,
		detailEnabled: false,
		detailFormat: null,
		detailField: 'detailed',
		nodetail: false,
		nodetailField: 'nodetailed',
		nodetailEnabled: false,
		undetail: false,
		undetailField: 'undetailed',
		undetailEnabled: false,
		treeField: null,
		treeDiff: 12,
		isParent: 'isparent',
		childrenField: 'children',
		open: false,
		openField: 'open',
		clickToOpen: false,
		orderByOne: true,
		sortOrder: 'desc',
		sortText: ',',
		sortSpace: ' ',
		sortField: 'orderrule',
		ascField: 'asc',
		descField: 'desc',
		fixedModel: null,
		model: null,
		fixedRow: 0,
		menuExt: {
			enabled: false,
			showPage: true,
			showTotal: true,
			showPageData: true,
			showPagina: true,
			showModel: true,
			showFixedRow: true,
			showFixedCol: true,
			showFixedRowCol: true,
			showCancelFixed: true
		},
		formId: null,
		searchId: null,
		selectId: null,
		blurSearchId: null,
		blurSelectId: null,
		toggleId: null,
		emptyId: null,
		data: null,
		url: null,
		method: 'get',
		cache: false,
		contentType: 'application/json',
		dataType: 'json',
		ajaxOptions: {},
		showNoMatches: true,
		showFooter: false,
		footerFormat: null,
		clientPages: false,
		showPage: true,
		showTotalData: true,
		showPageData: true,
		showPaginaData: true,
		showModel: true,
		pageData : [10, 20, 30, 50, 100, 200],
		pageSize: 20,
		pageNumber: 1,
		sizeField: 'pagesize',
		numberField: 'pagenumber',
		totalField: 'total',
		itemsField: 'items',
		icons: {
			paginaFirst: 'multigrid-icon-first',
			paginaPrev: 'multigrid-icon-prev',
			paginaNext: 'multigrid-icon-next',
			paginaLast: 'multigrid-icon-last',
			sortUpDown: 'multigrid-icon-downup',
			sortUp: 'multigrid-icon-up',
			sortDown: 'multigrid-icon-down',
			modelSettings: 'multigrid-icon-settings',
			detailPlus: 'multigrid-icon-plus',
			detailMinus: 'multigrid-icon-minus',
			treeOpen: 'multigrid-icon-open',
			treeClose: 'multigrid-icon-close'
		},
		oprate: null,
		oprateFilter: function(){
			return this
		},
		query: null,
		queryParams: null,
		sortParams: null,
		dataFilter: function(result){
			switch (result.code) {
				case 'success':
					return result.data;
				case 'user-not-login':
					app.chkLogin.options.logout();
					break;
				default :
					main.layer.alert(result.message);
					break;
			}
		},
		onPostRender: function(){
			return true;
		},
		onRowClick: function(){
			return true;
		},
		onDbRowClick: function(){
			return true;
		},
		initRows: function(){
			return this;
		},
		rowPostRender: function(){
			return this;
		},
		onCheck: function(){
			return true;
		},
		onUncheck: function(){
			return true;
		},
		onCheckAll: function(){
			return true;
		},
		onUncheckAll: function(){
			return true;
		},
		beforeCheckAll: function(){
			return true;
		},
		beforeUncheckAll: function(){
			return true;
		},
		onHide: function(){
			return true;
		}
	}

	var MODEL_DEFAULTS = {
		show: true,
		header: '',
		type: null,
		field: null,
		width: 60,
		rowspan: null,
		colspan: null,
		minWidth: 40,
		maxWidth: null,
		align: 'left',
		showTitle: true,
		sortable: false,
		sortProperty: null,
		sortOrder: null,
		resizable: true,
		draggable: false,
		headerStyle: '',
		rowStyle: '',
		settingsName: '',
		format: null,
		escape: false,
		enabled: false,
		allowHide: true,
		mergeCells: false,
		sortNumber: null
	}

	var TEMPLATE = {
		view: '<div class="multigrid-view1">'+
			'<div class="multigrid-head">'+
				'<div class="multigrid-head-box">'+
					'<table></table>'+
				'</div>'+
			'</div>'+
			'<div class="multigrid-body">'+
				'<div class="multigrid-body-inner"></div>'+
			'</div>'+
		'</div>'+
		'<div class="multigrid-view2">'+
			'<div class="multigrid-head">'+
				'<div class="multigrid-head-box">'+
					'<table></table>'+
				'</div>'+
			'</div>'+
			'<div class="multigrid-body"></div>'+
		'</div>',
		singleView: '<table></table>',
		loading: '<div class="multigrid-loading">'+
			'<span>{loading}</span>'+
		'</div>',
		page: '<div class="multigrid-page">'+
			'<div class="multigrid-page-info"></div>'+
		'</div>',
		checkbox: '<div class="multigrid-check">'+
			'<div class="checkbox checkbox-info">'+
				'<input type="checkbox" name="{name}"{id}{checked}{disabled} />'+
				'<label></label>'+
			'</div>'+
		'</div>',
		line: '<span class="multigrid-line" style="height:{height}px;left:{left}px;"></span>',
		noMatches: '<div class="multigrid-nomatches">{noMatches}</div>',
		footer: '<div class="multigrid-footer">{footer}</div>',
		detailIcon: '<i class="{icon}"></i>',
		table: '<table><tr><td><div></div></td></tr></table>',
		treeOpen: '<i class="multigrid-tree-icon {treeOpen}"></i>',
		treeClose: '<i class="multigrid-tree-icon {treeClose}"></i>'
	}

	function multiGrid(el, options) {
		this.$main = el;
		this.id = el[0].id;
		if (!this.id) {
			this.id = multiGridManager.getId();
			el[0].id = this.id;
		};
		this.className = this.$main.prop('class');
		this.width = el.hideCompute('width');
		this.scrollTop = 0;
		this.scrollLeft = 0;
		this.hasChecked = false;
		this.options = options;
		this.initSelectEvent();
		this.initLayout();
		this.init();
		this.options.reload && this.load();
	}

	multiGrid.prototype = {
		escapeHTML: function(text) {
			var match = {
				'\\': '&#92;',
				'&': '&amp;',
				'<': '&lt;',
				'>': '&gt;',
				'"': '&quot;',
				'\'': '&#39;',
				'/': '&#47;'
			};
			return typeof text === 'string' ? text.replace(/[&<>"'\/\\]/g, function(key) {
				return match[key]
			}) : text;
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
		each: function(data, callback) {
			var k = 0,
				key,
				keys,
				len;
			if (typeof data === 'object') {
				keys = Object.keys(data);
				len = keys.length;
				if (typeof callback !== 'function') {
					callback = $.noop;
				}
				while ( k < len ) {
					key = keys[k];
					if (callback.call(data, data[key], key, k) === false) {
						return this;
					}
					k ++;
				}
			}
			return this;
		},
		init: function() {
			this.initOptions();
			this.initMain();
			this.initEvent();
			this.initNoMatches();
			this.initHeader();
			this.bindHeader();
			this.initBody();
			this.initFooter();
			this.bindBody();
			this.initPagebar();
			this.initPage();
			this.initSetting();
			this.resize();
			this.resetCheckAll();
			this.detailResetAll();
			this.initMenuExt();
		},
		initLayout: function() {
			Object.defineProperty(this, 'layout', {
				get: function() {
					return this.options.layout;
				},
				set: function(layout) {
					var me = this;
					if ($.inArray(layout, multiGrid.layout) !== -1 && layout !== me.options.layout) {
						me.options.layout = layout;
						me.$main.css('height', '');
						me.initMain();
						me.initNoMatches();
						me.initHeader();
						me.bindHeader();
						me.initBody();
						me.initFooter();
						me.bindBody();
						me.initPagebar();
						me.initPage();
						me.initSetting();
						me.resize();
						me.resetCheckAll();
						me.detailResetAll();
						me.initMenuExt();
					}
				}
			})
		},
		initOptions: function() {
			var me = this,
				options = me.options,
				defaults = multiGrid.defaults;
			if (typeof options.formId !== 'string') {
				options.formId = '#' + me.id + '_form';
			};
			if (typeof options.searchId !== 'string') {
				options.searchId = '#' + me.id + '_search';
			};
			if (typeof options.toggleId !== 'string') {
				options.toggleId = '#' + me.id + '_toggle';
			};
			if (typeof options.selectId !== 'string') {
				options.selectId = '#' + me.id + '_select';
			};
			if (typeof options.blurSearchId !== 'string') {
				options.blurSearchId = '#' + me.id + '_blursearch';
			};
			if (typeof options.blurSelectId !== 'string') {
				options.blurSelectId = '#' + me.id + '_blurselect';
			};
			if (typeof options.emptyId !== 'string') {
				options.emptyId = '#' + me.id + '_empty';
			};
			if ($.inArray(options.locale, Object.keys(multiGrid.LOCALES)) === -1) {
				options.locale = defaults.locale;
			};
			if ($.inArray(options.layout, multiGrid.layout) === -1) {
				options.layout = defaults.layout;
			};
			me.$form = $(options.formId);
			me.$blurSearch = $(options.blurSearchId);
			options.menuExt = $.extend({}, defaults.menuExt, options.menuExt);
			options.icons = $.extend({}, defaults.icons, options.icons);
			options.ajaxOptions = $.extend({}, defaults.ajaxOptions, options.ajaxOptions);
			options.fixedRow = parseInt(options.fixedRow);
			if (!options.fixedRow || options.fixedRow < 0) {
				options.fixedRow = defaults.fixedRow
			};
			if (options.fixedRow > 0) {
				options.detailEnabled = false;
			};
			if (typeof options.rowClass !== 'function') {
				options.rowClass = defaults.rowClass
			}
			if (typeof options.initRows !== 'function') {
				options.initRows = defaults.initRows
			}
			if (typeof options.rowPostRender !== 'function') {
				options.rowPostRender = defaults.rowPostRender
			}
			options.query = $.extend({}, defaults.query, options.query);
			me.orderItems = {};
			if (options.ajaxOptions && options.ajaxOptions.data) {
				$.extend(options.query, options.ajaxOptions.data);
				console.warn('multigrid upgrade:', ' ajaxOptions.data', ' >>>', ' query', '\n', '默认传参配置项更新修改,弃用 ajaxOptions.data');
			}
			if (!$.isArray(options.model)) {
				options.model = []
			}
			if (!$.isArray(options.model[0])) {
				options.model = [options.model]
			}
			if (!$.isArray(options.fixedModel)) {
				options.fixedModel = []
			}
			if (!$.isArray(options.fixedModel[0])) {
				options.fixedModel = [options.fixedModel]
			};
			if (options.fixedModel[0].length > 0 && options.detailEnabled) {
				options.detailEnabled = false;
			};
			if (options.layout === 'tree') {
				me.tree = {};
				me.tree.open = me.renderText(TEMPLATE.treeOpen, options.icons);
				me.tree.close = me.renderText(TEMPLATE.treeClose, options.icons);
			};
			if (options.clientPages) {
				options._data = $.isArray(options.data) ? options.data : [];
				me.total = options._data.length;
				options.data = me.getClientPagesData();
			};
		},
		initModel: function(model) {
			var _model = multiGrid.model_defaults;
			model = $.extend({}, model);
			if (typeof model.show !== 'boolean') {
				model.show = _model.show;
			}
			if (typeof model.headerStyle !== 'string') {
				model.headerStyle = _model.headerStyle;
			}
			if (typeof model.rowStyle !== 'string') {
				model.rowStyle = _model.rowStyle;
			}
			if (typeof model.align === 'string') {
				if (!model.headerStyle.match(/text-align/g)) {
					model.headerStyle += 'text-align:' + model.align + ';';
				}
				if (!model.rowStyle.match(/text-align/g)) {
					model.rowStyle += 'text-align:' + model.align + ';';
				}
			}
			if (model.type === 'checkbox' && !this.hasChecked) {
				model.resizable = false;
				model.width = 30;
				model._width = 'width:' + model.width + 'px;';
				if (typeof model.allowHide !== 'boolean') {
					model.allowHide = false;
				}
				if (typeof model.field === 'string') {
					this.options.checkField = model.field
				} else {
					model.field = this.options.checkField
				}
				if (!model.settingsName) {
					model.settingsName = 'checkbox';
				}
				this.hasChecked = true;
				return model;
			}
			if (model.field) {
				if (PLUGINS[model.type]) {
					model = $.extend({}, PLUGINS[model.type], model);
				};
				model = $.extend({}, _model, model);
				if (model.sortable && typeof model.sortProperty !== 'string') {
					model.sortProperty = model.field;
				};
			};
			if (!model.settingsName) {
				model.settingsName = model.header;
			};
			if (typeof model.width === 'number') {
				model._width = model.width + 'px';
			} else {
				model._width = model.width;
			};
			model._width = 'width:' + model._width + ';';
			return model;
		},
		initMain: function() {
			var me = this,
				$test;
			me.classes = 'multigrid';
			me.options.hover && (me.classes += ' multigrid-hover');
			me.options.striped && (me.classes += ' multigrid-striped');
			me.$main.removeClass().addClass(me.className).addClass(me.classes);
			if (me.layout === 'single') {
				me.$main.addClass('multigrid-single');
				me.$main.empty().append(TEMPLATE.singleView);
				me.$view = me.$main.find('table');
				return me;
			};
			me.$main.empty().append(TEMPLATE.view);
			me.$view1 = me.$main.children('.multigrid-view1');
			me.$view2 = me.$main.children('.multigrid-view2');
			me.$body1 = me.$view1.children('.multigrid-body');
			me.$body2 = me.$view2.children('.multigrid-body');
			me.$inner = me.$body1.children('.multigrid-body-inner');
			me.$head = me.$view2.children('.multigrid-head');
			me.$header1 = me.$view1.find('table');
			me.$header2 = me.$view2.find('table');
			$test = $(TEMPLATE.table).appendTo(me.$body2);
			me.rowHeight = $test.hideCompute('outerHeight')||0;
			$test.remove();
			me.$loading = $(me.renderText(TEMPLATE.loading, multiGrid.LOCALES[me.options.locale])).appendTo(me.$main);
		},
		initHeader: function() {
			var me = this,
				header;
			if (me.layout === 'single') {
				header = me.initSingleTitle();
				header = header + '<tbody></tbody>';
				me.$view.empty().append(header);
				me.$body = me.$view.children('tbody');
				return me;
			};
			me.fixedModel = [];
			header = me.initTitle(me.options.fixedModel, me.fixedModel);
			me.$header1.empty().append(header);
			me.model = [];
			header = me.initTitle(me.options.model, me.model, true);
			me.$header2.empty().append(header);
			me.headHeight = me.$head.hideCompute('outerHeight')||0;
			if (me.checkAll) {
				me.$checkAll = $('#' + me.checkAll)
			};
			if (me.options.detailEnabled && !me.options.singleDetail) {
				me.$detailAll = me.$main.find('.multigrid-head .multigrid-detail-icon i');
			};
			me.$view1.css({left: 0});
			if ($('body').is(':hidden')) {
				me.fixedModelWidth = 0;
				me.fixedModel.map(function(model) {
					me.fixedModelWidth += model.width;
				});
			} else {
				me.fixedModelWidth = me.$header1.hideCompute('outerWidth');
			};
			me.$view2.css({marginLeft: me.fixedModelWidth});
			me.$head.scrollLeft(0);
			me.$body2.scrollLeft(0);
			me.$sortItems = me.$main.find('.multigrid-head th[data-field]').has('i');
		},
		initTitle: function(items, model, isModel) {
			var me = this,
				l,
				k,
				i = 0,
				item,
				data,
				header = [],
				columns = [],
				index,
				width = 0,
				classes,
				len = items.length - 1;
			while (i < len) {
				item = items[i];
				l = item.length;
				header.push('<tr>');
				index = 0;
				k = 0;
				while (k < l) {
					item[k] = me.initModel(item[k]);
					data = item[k];
					if (data.show) {
						header.push('<th');
						if (data.headerStyle) {
							header.push(' style="' + data.headerStyle + '"');
						};
						if (data.rowspan) {
							header.push(' rowspan=' + data.rowspan);
						};
						if (data.colspan) {
							header.push(' colspan=' + data.colspan);
						};
						if (data.type === 'checkbox') {
							columns.push({model: data, index: index});
						};
						if (data.header === 'checkbox') {
							me.checkAll = me.id + '_checkall';
							header.push(
								'>',
								me.renderText(TEMPLATE.checkbox, {
									id: 'id="' + me.checkAll + '"'
								}),
								'</th>'
							);
						} else {
							if (data.field) {
								header.push(' data-field="', data.field, '"><div style="', data._width, '"><span>', data.header, '</span>')
								columns.push({model: data, index: index});
								if (data.sortable) {
									classes = me.options.icons.sortUpDown;
									if (data.sortOrder === 'desc') {
										classes = me.options.icons.sortDown;
										me.orderItems[data.sortProperty] = me.options.descField;
									} else if (data.sortOrder === 'asc') {
										classes = me.options.icons.sortUp;
										me.orderItems[data.sortProperty] = me.options.ascField;
									}
									header.push('<i class="' + classes + '"></i>');
								}
								header.push('</div></th>')
							} else {
								header.push('><div>', data.header, '</div></th>')
							}
						}
						index += data.colspan||1;
					}
					k ++;
				}
				header.push('</tr>');
				i ++;
			}
			item = items[len];
			len = item.length;
			k = 0;
			header.push('<tr>');
			while (k < len) {
				data = me.initModel(item[k]);
				item[k] = data;
				model.push(data);
				if (data.show) {
					width += data.width;
					header.push('<th');
					if (data.headerStyle) {
						header.push(' style="' + data.headerStyle + '"');
					}
					if (data.header === 'checkbox') {
						me.checkAll = me.id + '_checkall';
						header.push('>' + me.renderText(TEMPLATE.checkbox, {
							id: 'id="' + me.checkAll + '"'
						}) + '</th>');
					} else {
						if (data.field) {
							header.push(' data-field="', data.field, '"><div style="', data._width, '"><span>', data.header, '</span>')
							if (data.sortable) {
								classes = me.options.icons.sortUpDown;
								if (data.sortOrder === 'desc') {
									classes = me.options.icons.sortDown;
									me.orderItems[data.sortProperty] = me.options.descField;
								} else if (data.sortOrder === 'asc') {
									classes = me.options.icons.sortUp;
									me.orderItems[data.sortProperty] = me.options.ascField;
								}
								header.push('<i class="' + classes + '"></i>');
							}
							header.push('</div></th>')
						} else {
							header.push('><div style="', data._width, '">', data.header, '</div></th>')
						}
					}
				}
				k ++;
			}
			header.push('</tr>');
			if (isModel) {
				if (me.options.detailEnabled) {
					header.splice(1, 0, [
						'<th rowspan="',
						items.length,
						'"><div class="multigrid-detail-icon">',
						me.options.singleDetail ? '' : me.renderText(TEMPLATE.detailIcon, {
							icon: me.options.icons.detailPlus
						}),
						'</div></th>'
						].join('')
					)
				}
				me.modelWidth = width + 30;
			} else {
				me.fixedModelWidth = width;
			}
			len = columns.length;
			i = 0;
			while ( i < len ){
				data = columns[i];
				model.splice(data.index, 0, data.model);
				i ++;
			}
			return header.join('');
		},
		initSingleTitle: function() {
			var me = this,
				i,
				l,
				k = 0,
				item,
				data,
				classes,
				index,
				columns = [],
				header = [],
				items = me.getAllModel(),
				len = items.length - 1;
			me.model = [];
			header.push('<thead>');
			while (k < len) {
				item = items[k];
				l = item.length;
				header.push('<tr>');
				i = 0;
				index = 0;
				while (i < l) {
					item[i] = me.initModel(item[i]);
					data = item[i];
					if (data.show) {
						header.push('<th style="' + data.headerStyle + data._width + '"');
						if (data.rowspan) {
							header.push(' rowspan=' + data.rowspan);
						};
						if (data.colspan) {
							header.push(' colspan=' + data.colspan);
						};
						if (data.type === 'checkbox') {
							columns.push({model: data, index: index});
						};
						if (data.header === 'checkbox') {
							me.checkAll = me.id + '_checkall';
							header.push('>', me.renderText(TEMPLATE.checkbox, {
								id: 'id="' + me.checkAll + '"'
							}), '</th>');
						} else {
							if (data.field) {
								columns.push({model: data, index: index});
								header.push(' data-field="', data.field, '">', data.header);
								if (data.sortable) {
									classes = me.options.icons.sortUpDown;
									if (data.sortOrder === 'desc') {
										classes = me.options.icons.sortDown;
										me.orderItems[data.sortProperty] = me.options.descField;
									} else if (data.sortOrder === 'asc') {
										classes = me.options.icons.sortUp;
										me.orderItems[data.sortProperty] = me.options.ascField;
									}
									header.push('<i class="' + classes + '"></i>');
								}
							} else {
								header.push(' >' + data.header);
							}
							header.push('</th>');
						}
						index += data.colspan||1;
					}
					i ++;
				}
				header.push('</tr>');
				k ++;
			}
			item = items[len];
			len = item.length;
			k = 0;
			header.push('<tr>');
			while (k < len) {
				data = me.initModel(item[k]);
				item[k] = data;
				me.model.push(data);
				if (data.show) {
					header.push('<th style="' + data.headerStyle + data._width + '"');
					if (data.rowspan) {
						header.push(' rowspan=' + data.rowspan)
					}
					if (data.colspan) {
						header.push(' colspan=' + data.colspan)
					}
					if (data.header === 'checkbox') {
						me.checkAll = me.id + '_checkall';
						header.push(
							'>',
							me.renderText(TEMPLATE.checkbox, {
								id: 'id="' + me.checkAll + '"'
							}),
							'</th>'
						)
					} else {
						if (data.field) {
							header.push(' data-field="', data.field, '">', data.header);
							if (data.sortable) {
								classes = me.options.icons.sortUpDown;
								if (data.sortOrder === 'desc') {
									classes = me.options.icons.sortDown;
									me.orderItems[data.sortProperty] = me.options.descField;
								} else if (data.sortOrder === 'asc') {
									classes = me.options.icons.sortUp;
									me.orderItems[data.sortProperty] = me.options.ascField;
								}
								header.push('<i class="' + classes + '"></i>');
							}
						} else {
							header.push(' >' + data.header);
						}
					}
					header.push('</th>');
				}
				k ++;
			}
			len = columns.length;
			k = 0;
			while (k < len) {
				data = columns[k];
				me.model.splice(data.index, 0, data.model);
				k ++;
			}
			header.push('</thead>');
			return header.join('');
		},
		initBody: function() {
			var me = this,
				len,
				item,
				row,
				i = 0,
				view1 = '',
				view2 = '',
				fixedModel,
				fixedRow,
				renderRow,
				model = me.getShowModel(),
				options = me.options,
				data = options.data;
			if (!$.isArray(data)) {
				data = options.data = []
			}
			len = data.length;
			if (!me.total) {
				me.total = len
			}
			me.rows = [];
			if (me.layout === 'single') {
				while (i < len) {
					item = data[i];
					row = me.createRow(item, i);
					me.rows.push(row);
					view2 += me.initSingleRow(model, item, i, row);
					i ++;
				}
				me.$body.empty().append(view2);
				return me;
			}
			fixedModel = me.getShowFixedModel();
			fixedRow = Math.min(options.fixedRow, len);
			if (options.showNoMatches) {
				me.$noMatches[len === 0 ? 'show' : 'hide']()
			}
			if (me.layout === 'tree') {
				if (fixedModel.length > 0) {
					renderRow = function(item, index) {
						var row = me.createRow(item, index);
						row.level = 1;
						row.treeIndex = row.index;
						me.rows.push(row);
						if (item[options.isParent] === null || item[options.isParent] === undefined) {
							item[options.isParent] = data[options.childrenField] && data[options.childrenField].length > 0;
						};
						view1 += me.initRow(fixedModel, item, index, row);
						view2 += me.initRow(model, item, index, row);
						if (item[options.isParent]) {
							item = item[options.childrenField];
							row.treeIndex = row.index;
							view1 += me.initTreeRow(fixedModel, item, row);
							view2 += me.initTreeRow(model, item, row);
						};
					};
				} else {
					renderRow = function(item, index) {
						var row = me.createRow(item, index);
						row.level = 1;
						row.treeIndex = row.index;
						me.rows.push(row);
						if (item[options.isParent] === null || item[options.isParent] === undefined) {
							item[options.isParent] = data[options.childrenField] && data[options.childrenField].length > 0;
						};
						view2 += me.initRow(model, item, index, row);
						if (item[options.isParent]) {
							item = item[options.childrenField];
							row.treeIndex = row.index;
							view2 += me.initTreeRow(model, item, row);
						}
					}
				}
			} else {
				if (fixedModel.length > 0) {
					renderRow = function(item, index) {
						var row = me.createRow(item, index);
						me.rows.push(row);
						view1 += me.initRow(fixedModel, item, index, row);
						view2 += me.initRow(model, item, index, row);
					}
				} else {
					renderRow = function(item, index) {
						var row = me.createRow(item, index);
						me.rows.push(row);
						view2 += me.initRow(model, item, index, row);
					}
				}
			}
			if (fixedRow !== 0) {
				view1 += '<table class="multigrid-fixed">';
				view2 += '<table class="multigrid-fixed">';
				for ( ; i < fixedRow ; i++ ) {
					renderRow(data[i], i);
				}
				view1 += '</table>';
				view2 += '</table>';
			}
			view1 += '<table>';
			view2 += '<table>';
			for ( ; i < len ; i ++ ) {
				renderRow(data[i], i);
			}
			view1 += '</table>';
			view2 += '</table>';
			me.$inner.html(view1);
			me.$body2.html(view2);
			return me;
		},
		createRow: function(item, index) {
			var me = this,
				row = {},
				detailEnabled = me.options.detailEnabled,
				detailField = me.options.detailField;
			row.index = index;
			row.data = item;
			row.className = index % 2 ? 'even' : 'odd';
			//设置内部组件
			row.plugin = [];
			//设置有没有行详情,以及默认是否显示
			if (me.options.detailEnabled) {
				me.initRowDetail(row);
				if (typeof row.detail !== 'boolean') {
					item[me.options.detailField] = me.options.detail;
				}
				//设置是否有详情
				if (me.options.nodetailEnabled) {
					me.initRowNodetail(row);
					if (typeof row.nodetail !== 'boolean') {
						item[me.options.nodetailField] = me.options.nodetail;
					}
				}
				//设置是否允许显示隐藏详情
				if (me.options.undetailEnabled) {
					me.initRowUndetail(row);
					if (typeof row.undetail !== 'boolean') {
						item[me.options.undetailField] = me.options.undetail;
					}
				}
			}
			//设置checkbox
			if (me.hasChecked) {
				me.initRowCheck(row);
				if (typeof row.checked !== 'boolean') {
					item[me.options.checkField] = me.options.checked;
				}
				row.className += row.checked ? ' selected' : '';
				//处理默认是否允许修改选中状态
				if (me.options.nocheckEnabled) {
					me.initRowNocheck(row);
					if (typeof row.nocheck !== 'boolean') {
						item[me.options.nocheckField] = me.options.nocheck;
					}
				}
			}
			//设置tree
			if (me.layout === 'tree') {
				me.initRowOpen(row);
				if (typeof row.open !== 'boolean') {
					item[me.options.openField] = me.options.open;
				}
			}
			me.options.initRows.call(me, row, item, index);
			return row;
		},
		initRowCheck: function(row) {
			var me = this,
				field = me.options.checkField;
			Object.defineProperty(row, 'checked', {
				get: function(){
					return this.data[field];
				},
				set: function(checked){
					var item = this.data;
					if (typeof checked === 'boolean' && !this.nocheck && checked !== item[field]) {
						item[field] = checked;
						if (this.$select && this.$row) {
							this.$select.prop('checked', checked);
							if (checked) {
								this.$row.addClass('selected');
								me.options.onCheck.call(me, item, this.index, row);
								me.$main.trigger($.Event('check.multigrid'), item);
							} else {
								this.$row.removeClass('selected');
								me.options.onUncheck.call(me, item, this.index, row);
								me.$main.trigger($.Event('uncheck.multigrid'), item);
							}
						}
					}
				}
			})
		},
		initRowNocheck: function(row) {
			var me = this,
				field = me.options.nocheckField;
			Object.defineProperty(row, 'nocheck', {
				get: function(){
					return this.data[field];
				},
				set: function(nocheck){
					var item = this.data;
					if (typeof nocheck === 'boolean' && item[field] !== nocheck) {
						item[field] = nocheck;
					}
				}
			})
		},
		initRowDetail: function(row) {
			var me = this,
				field = me.options.detailField,
				plus = me.options.icons.detailPlus,
				minus = me.options.icons.detailMinus;
			Object.defineProperty(row, 'detail', {
				get: function(){
					return this.data[field];
				},
				set: function(detail){
					var item = this.data;
					if (typeof detail === 'boolean' && !this.undetail && !this.nodetail && detail !== item[field]) {
						item[field] = detail;
						if (row.$detailIcon && row.$detail) {
							if (detail) {
								row.$detailIcon.removeClass(plus).addClass(minus);
								row.$detail.css('display', '')
							} else {
								row.$detailIcon.addClass(plus).removeClass(minus);
								row.$detail.css('display', 'none');
							}
						}
					}
				}
			})
		},
		initRowNodetail: function(row) {
			var me = this,
				field = me.options.nodetailField;
			Object.defineProperty(row, 'nodetail', {
				get: function(){
					return this.data[field];
				},
				set: function(nodetail){
					var item = this.data;
					if (typeof nodetail === 'boolean' && nodetail !== item[field]) {
						item[field] = nodetail;
						me.refresh();
					}
				}
			})
		},
		initRowUndetail: function(row) {
			var me = this,
				field = me.options.undetailField;
			Object.defineProperty(row, 'undetail', {
				get: function(){
					return this.data[field];
				},
				set: function(undetail){
					var item = this.data;
					if (typeof undetail === 'boolean' && undetail !== item[field]) {
						item[field] = undetail;
						me.refresh();
					}
				}
			})
		},
		initRowOpen: function(row) {
			var me = this,
				field = me.options.openField,
				treeOpen = me.options.icons.treeOpen,
				treeClose = me.options.icons.treeClose;
			Object.defineProperty(row, 'open', {
				get: function(){
					return this.data[field];
				},
				set: function(open){
					var item = this.data;
					if (typeof open === 'boolean' && open !== item[field]) {
						item[field] = open;
						if (open) {
							this.$row.find('.multigrid-tree-icon:eq(0)').removeClass(treeClose).addClass(treeOpen);
							this.$row.next('.multigrid-children').removeClass('multigrid-close').addClass('multigrid-open');
						} else {
							this.$row.find('.multigrid-tree-icon:eq(0)').removeClass(treeOpen).addClass(treeClose);
							this.$row.next('.multigrid-children').removeClass('multigrid-open').addClass('multigrid-close');
						}
					}
				}
			})
		},
		initRow: function(items, data, index, row) {
			var me = this,
				html = [],
				k = 0,
				model,
				value,
				len = items.length;
			html.push('<tr data-index="', index, '" class="', row.className, '">');
			if (me.options.detailEnabled) {
				html.push('<td><div class="multigrid-detail-icon');
				if (me.options.undetailEnabled && row.undetail) {
					html.push(' disabled')
				}
				html.push('">');
				if (!row.nodetail) {
					html.push(me.renderText(TEMPLATE.detailIcon, {
						icon: row.detail ? me.options.icons.detailMinus : me.options.icons.detailPlus
					}))
				}
				html.push('</div></td>');
			}
			for ( ; k < len ; k ++ ) {
				model =  items[k];
				value = data[model.field];
				html.push('<td');
				if (model.rowStyle) {
					html.push(' style="' + model.rowStyle + '"')
				};
				html.push('>');
				if (model.type === 'checkbox') {
					html.push(
						me.renderText(TEMPLATE.checkbox, {
							checked: value ? ' checked' : '',
							name: me.options.checkField,
							disabled: row.nocheck ? ' disabled' : ' '
						}),
						'</td>'
					);
					continue;
				};
				if (model.enabled) {
					var id = me.id + '_plugin_' + index + '_' + row.plugin.length,
						plugin = new Plugins(id, value, model, index, data);
					row.plugin.push(plugin);
					html.push('<div style="', model._width, '" id="' + id + '">', plugin.enabled ? plugin.create(data, me) : plugin.value, '</div></td>');
					continue;
				};
				if (typeof model.format === 'function') {
					value = model.format(value, data, index, me);
				} else if (typeof model.format === 'string') {
					value = me.renderText(model.format, {
						value: value,
						index: index,
						model: model,
						row: data
					});
				} else {
					if (value === null || value === undefined || (typeof value === 'number' && isNaN(value))) {
						value = me.options.undefinedText;
					};
				};
				if (model.escape) {
					value = me.escapeHTML(value);
				};
				html.push('<div style="', model._width, '"', model.showTitle ? ' title="' + value + '"' : '');
				if (model.type === 'link') {
					html.push('><a class="multigrid-link" data-field="', model.field, '">', value, '</a></div></td>');
				} else if (me.layout === 'tree' && me.options.treeField === model.field) {
					html.push('><div class="multigrid-tree" style="padding-left:', me.options.treeDiff, 'px;">');
					if (data[me.options.isParent]) {
						html.push(row.open ? me.tree.open : me.tree.close)
					}
					html.push(value, '</div></div></td>');
				} else {
					html.push('>', value, '</div></td>');
				}
			}
			html.push('</tr>');
			if (me.options.detailEnabled && !row.nodetail) {
				var detailFormat = me.options.detailFormat;
				html.push('<tr class="multigrid-detail');
				if (!row.detail) {
					html.push('" style="display:none;')
				}
				html.push(
					'"><td colspan="',
					len + 1,
					'" style="display:table-cell;">',
					typeof detailFormat === 'function' ?
					detailFormat.call(me, data, index, items) :
					typeof detailFormat === 'string' ?
					me.renderText(detailFormat, {
						row: data,
						index: index
					}) : '',
					'</td></tr>'
				)
			}
			return html.join('');
		},
		initSingleRow: function(items, data, index, row) {
			var me = this,
				k = 0,
				model,
				value,
				html = [],
				len = items.length;
			html.push('<tr data-index="' + index +'">');
			while (k < len) {
				model = items[k];
				value = data[model.field];
				html.push('<td style="' + model.rowStyle + model._width + '">');
				if (model.type === 'checkbox') {
					html.push(
						me.renderText(TEMPLATE.checkbox, {
							checked: value ? ' checked' : '',
							name: me.options.checkField,
							disabled: row.nocheck ? ' disabled' : ' '
						}),
						'</td>'
					)
				} else if (model.enabled) {
					var id = me.id + '_plugin_' + index + '_' + me.rows[index].plugin.length,
						plugin = new Plugins(id, value, model, index, data);
					me.rows[index].plugin.push(plugin);
					html.push('<div style="',
						model._width,
						'" id="' + id + '">',
						plugin.enabled ? plugin.create(data, me) : plugin.value,
						'</div></td>'
					);
				} else {
					if (typeof model.format === 'function') {
						value = model.format(value, data, index, me)
					} else if (typeof model.format === 'string') {
						value = me.renderText(model.format, {
							value: value,
							index: index,
							model: model,
							row: data
						})
					} else {
						if (value === null || value === undefined || (typeof value === 'number' && isNaN(value))) {
							value = me.options.undefinedText;
						}
					};
					if (model.escape) {
						value = me.escapeHTML(value)
					};
					html.push(model.type === 'link' ? '<a class="multigrid-link" data-field="' + model.field + '">' + value + '</a>' : value, '</td>');
				}
				k ++;
			}
			html.push('</tr>');
			return html.join('');
		},
		initTreeRow: function(models, data, row) {
			var me = this,
				html = [],
				k,
				i,
				model,
				item,
				value,
				len,
				children,
				diff,
				level,
				m = models.length;
			level = row.level + 1;
			diff = level * me.options.treeDiff;
			if (!$.isArray(row.children)) {
				row.children = [];
			}
			if ($.isArray(data) && data.length > 0) {
				html.push('<tr class="multigrid-children ', row.open ? 'multigrid-open' : 'multigrid-close', '"><td colspan=', m, '><table>');
				k = 0;
				len = data.length;
				while (k < len) {
					i = 0;
					item = data[k];
					children = me.createRow(item, k);
					children.level = level;
					children.treeIndex = row.treeIndex + '-' + k;
					if (item[me.options.isParent] === null || item[me.options.isParent] === undefined) {
						item[me.options.isParent] = data[me.options.childrenField] && data[me.options.childrenField].length > 0;
					};
					row.children.push(children);
					html.push('<tr data-index="', children.treeIndex, '" class="', children.className, '">');
					while (i < m) {
						model = models[i];
						value = item[model.field];
						html.push('<td');
						if (model.rowStyle) {
							html.push(' style="' + model.rowStyle + '"')
						}
						html.push('>');
						if (model.type === 'checkbox') {
							html.push(
								me.renderText(TEMPLATE.checkbox, {
									checked: value ? ' checked' : '',
									name: me.options.checkField,
									disabled: row.nocheck ? ' disabled' : ' '
								}),
								'</td>'
							);
							continue;
						};
						if (model.enabled) {
							var id = me.id + '_plugin_tree_' + children.treeIndex + '_' + children.plugin.length,
								plugin = new Plugins(id, value, model, k, item);
							children.plugin.push(plugin);
							html.push('<div style="', model._width, '" id="' + id + '">', plugin.enabled ? plugin.create(item, me) : plugin.value, '</div></td>');
							continue;
						};
						if (typeof model.format === 'function') {
							value = model.format(value, item, k, me);
						} else if (typeof model.format === 'string') {
							value = me.renderText(model.format, {
								value: value,
								index: k,
								model: model,
								row: item
							})
						} else {
							if (value === null || value === undefined || (typeof value === 'number' && isNaN(value))) {
								value = me.options.undefinedText;
							}
						};
						if (model.escape) {
							value = me.escapeHTML(value);
						};
						html.push('<div style="', model._width, '"', model.showTitle ? ' title="' + value + '"' : '');
						if (model.type === 'link') {
							html.push('><a class="multigrid-link" data-field="', model.field, '">', value, '</a></div></td>')
						} else if (me.layout === 'tree' && me.options.treeField === model.field) {
							html.push('><div class="multigrid-tree" style="padding-left:', diff, 'px;">');
							if (item[me.options.isParent]) {
								html.push(row.open ? me.tree.open : me.tree.close)
							}
							html.push(value, '</div></div></td>');
						} else {
							html.push('>', value, '</div></td>');
						}
						i++;
					}
					html.push('</tr>');
					if (item[me.options.isParent]) {
						html.push(me.initTreeRow(models, item[me.options.childrenField], children));
					}
					k++;
				}
				html.push('</table></td></tr>');
			}
			return html.join('');
		},
		initFooter: function() {
			var me = this;
			if (me.options.showFooter) {
				if (me.fixedModel.length > 0) {
					html = '';
					if (typeof me.options.footerFormat === 'function') {
						html = me.options.footerFormat.call(me, me.fixedModel, me.options.data);
					} else if (typeof me.options.footerFormat === 'string') {
						html = me.renderText(me.options.footerFormat);
					}
					if (me.$footer1) {
						me.$footer1.remove();
						me.$footer1 = null;
					}
					me.$footer1 = $(me.renderText(TEMPLATE.footer, {
						footer: html
					})).appendTo(me.$view1);
				}
				if (me.model.length > 0) {
					html = '';
					if (typeof me.options.footerFormat === 'function') {
						html = me.options.footerFormat.call(me, me.model, me.options.data);
					} else if (typeof me.options.footerFormat === 'string') {
						html = me.renderText(me.options.footerFormat);
					}
					if (me.$footer2) {
						me.$footer2.remove();
						me.$footer2 = null;
					}
					me.$footer2 = $(me.renderText(TEMPLATE.footer, {
						footer: html
					})).appendTo(me.$view2);
				}
			}
		},
		initPagebar: function() {
			var me = this;
			if (me.$page) {
				me.$page.remove();
			}
			if (me.options.showPage) {
				me.$page = $(TEMPLATE.page).appendTo(me.$main);
				me.$pageInfo = me.$page.children('.multigrid-page-info');
				me.pageHeight = me.$page.hideCompute('outerHeight')||0;
				me.$page.off('change').on('change', 'select', function() {
					me.changePage()
				})
				me.$page.off('keypress').on('keypress', 'input', function(e) {
					if (e.keyCode === 13) {
						me.selectPage()
					}
				})
				me.$page.off('click').on('click', '.pagina-first', function(e) {
					me.firstPage()
				}).on('click', '.pagina-prev', function(e) {
					me.prevPage()
				}).on('click', '.pagina-next', function(e) {
					me.nextPage()
				}).on('click', '.pagina-last', function(e) {
					me.lastPage()
				}).on('click', '.multigrid-model-settings>i', function(e) {
					var $that = $(this).next(),
						show = $that.is(':visible');
					e.stopPropagation();
					me.$main.trigger('hide.multigrid');
					$that[show ? 'hide' : 'show']();
				}).on('click', '.multigrid-model-settings li', function(e) {
					var $this = $(this),
						check,
						model,
						allHide = true;
					e.stopPropagation();
					if (!$this.hasClass('disabled')) {
						check = $this.find('input[type=checkbox]')[0];
						model = me.getModelByParam('field', check.name);
						if (model.show) {
							model.show = false;
							$.map(me.model, function(item) {
								if (item.show) {
									allHide = false;
									return false;
								}
							})
							if (allHide) {
								model.show = true;
								check.checked = true;
								return false;
							} else {
								check.checked = false;
							}
						} else {
							model.show = true;
							check.checked = true;
						}
						me.initHeader();
						me.bindHeader();
						me.initBody();
						me.initFooter();
						me.bindBody();
						me.resize();
						me.resetCheckAll();
						me.detailResetAll();
					}
				})
			} else {
				me.pageHeight = 0;
			}
		},
		initPage: function() {
			var me = this,
				html = [],
				prev,
				next,
				locales,
				select,
				option = me.options;
			if (option.showPage) {
				locales = multiGrid.LOCALES[me.options.locale];
				if (option.showTotalData) {
					html.push(
						'<span class="total">',
						me.renderText(locales.pageTotal, {
							total: '<em>' + me.total + '</em>'
						}),
						'</span>'
					);
				};
				next = Math.ceil(me.total / option.pageSize);
				if (option.showPageData) {
					select = [];
					select.push('<select>');
					option.pageData.map( function(value) {
						select.push('<option' + (option.pageSize === value ? ' selected="selected"' : '') + '>' + value + '</option>');
					});
					select.push('</select>');
					html.push(
						'<span class="page">',
						me.renderText(locales.pageData, {
							select: select.join(''),
							totalPage: '<em>' + next + '</em>'
						}),
						'</span>'
					);
				};
				if (option.showPaginaData) {
					prev = option.pageNumber === 1 ? 'disabled ' : '';
					next = next === 0 || option.pageNumber === next ? 'disabled ' : '';
					html.push(
						'<span class="multigrid-pagina"><i class="pagina-first ',
						prev + option.icons.paginaFirst,
						'"></i><i class="pagina-prev ',
						prev + option.icons.paginaPrev,
						'"></i><input type="text" class="pagina-number" value="'+
						option.pageNumber,
						'"/><i class="pagina-next ',
						next + option.icons.paginaNext,
						'"></i><i class="pagina-last ',
						next + option.icons.paginaLast,
						'"></i></span>'
					);
				};
				me.$pageInfo.empty().append(html.join(''));
			};
		},
		initSetting: function() {
			var me = this,
				html = [],
				option = me.options;
			if (option.showPage) {
				if (option.showModel) {
					html.push('<div class="multigrid-model-settings"><i class="',
						option.icons.modelSettings,
						'"></i><ul class="multigrid-dropdown">'
					);
					$.map(me.fixedModel, function(item){
						html.push('<li',
							item.allowHide ? '>' +
							me.renderText(TEMPLATE.checkbox, {
								name: item.field,
								checked: item.show ? ' checked' : ''
							}) :
							' class="disabled">' +
							me.renderText(TEMPLATE.checkbox, {
								disabled: ' disabled',
								name: item.field,
								checked: item.show ? ' checked' : ''
							}),
							item.settingsName,
							'</li>'
						)
					});
					$.map(me.model, function(item){
						html.push('<li',
							item.allowHide ? '>' +
							me.renderText(TEMPLATE.checkbox, {
								name: item.field,
								checked: item.show ? ' checked' : ''
							}) :
							' class="disabled">' +
							me.renderText(TEMPLATE.checkbox, {
								disabled: ' disabled',
								name: item.field,
								checked: item.show ? ' checked' : ''
							}),
							item.settingsName,
							'</li>'
						)
					});
					html.push('</ul></div>')
				}
				me.$page.append(html.join(''));
			}
		},
		initNoMatches: function() {
			var me = this;
			if (me.options.showNoMatches) {
				me.$noMatches = $(me.renderText(TEMPLATE.noMatches, multiGrid.LOCALES[me.options.locale])).appendTo(me.$main);
			}
		},
		initMenuExt: function() {
			var me = this,
				options = me.options,
				menuExt = options.menuExt,
				colspan,
				rowspan;
			if (menuExt.enabled) {
				me.$menu = $('<div class="multigrid-menu"></div>').appendTo('body');
				me.$main.off('contextmenu').on('contextmenu', '.multigrid-body', function(e) {
					var $menu,
						h,
						w,
						ch = document.body.clientHeight,
						cw = document.body.clientWidth;
					me.$main.trigger('hide.multigrid');
					$menu = $(me.renderText(me.createMenuExt(), {
						left: e.pageX,
						top: e.pageY
					})).appendTo(me.$menu);
					h = $menu.outerHeight();
					w = $menu.outerWidth();
					if (ch < h + e.pageY) {
						$menu.css({top: '', maxHeight: e.pageY - 10, bottom: ch - e.pageY});
					}
					if (cw < w + e.pageX) {
						$menu.css({left: '', maxWidth: e.pageX - 10, right: cw - e.pageX});
					}
					return false;
				}).on('contextmenu', '.multigrid-body td', function(e) {
					var $this = $(this),
						index = $this.index(),
						className = $this.parents('.multigrid-body:eq(0)').parent().prop('className');
					rowspan = parseInt($this.parent().data('index')) + 1;
					if (className.indexOf('multigrid-view1') !== -1) {
						colspan = 0;
						while (index) {
							if (me.fixedModel[colspan].show) {
								index--;
							}
							colspan++;
						}
						if (!me.fixedModel[colspan].show) colspan++;
						colspan++;
					}
					if (className.indexOf('multigrid-view2') !== -1) {
						colspan = 0;
						while (index) {
							if (me.model[colspan].show) {
								index--;
							}
							colspan++;
						}
						if (!me.model[colspan].show) colspan++;
						colspan = colspan + me.fixedModel.length + 1;
					}
				});

				me.$menu.on('click', 'li', function(e) {
					var $this = $(this),
						fixed,
						model,
						data = $this.data(),
						check = $this.find('input[type=checkbox]')[0];
					e.stopPropagation();
					if (!data.page) return false;
					if (check) {
						check.checked = !check.checked;
						me.options[data.page] = check.checked;
						me.initPagebar();
						me.initPage();
						me.initSetting();
						me.resize();
						return true;
					}
					if (rowspan === null || rowspan === undefined) {
						return false;
					}
					if (data.page === 'fixedRow' && typeof rowspan === 'number') {
						me.options.fixedRow = rowspan;
					}
					fixed = me.options.fixedModel[me.options.fixedModel.length - 1];
					model = me.options.model[me.options.model.length - 1];
					if (data.page === 'fixedCol' && typeof colspan === 'number') {
						if (fixed.length >= colspan) {
							model.unshift.apply(model, fixed.splice(colspan, fixed.length));
						} else {
							colspan = colspan - fixed.length;
							fixed.push.apply(fixed, model.splice(0, colspan));
						}
					}
					if (data.page === 'fixedRowCol' && typeof colspan === 'number' && typeof rowspan === 'number') {
						me.options.fixedRow = rowspan;
						if (fixed.length >= colspan) {
							model.unshift.apply(model, fixed.splice(colspan, fixed.length));
						} else {
							colspan = colspan - fixed.length;
							fixed.push.apply(fixed, model.splice(0, colspan));
						}
					}
					if (data.page === 'cancelFixed') {
						me.options.fixedRow = 0;
						me.options.model.map(function(model, index) {
							model.unshift.apply(model, me.options.fixedModel[index] || []);
						});
						me.options.fixedModel = [[]];
					}
					rowspan = null;
					colspan = null;
					me.initHeader();
					me.bindHeader();
					me.initBody();
					me.initFooter();
					me.bindBody();
					me.resize();
					me.resetCheckAll();
					me.detailResetAll();
					me.$main.trigger('hide.multigrid');
				});

				$('body').on('contextmenu', function(){
					me.$main.trigger('hide.multigrid');
				});
			}
		},
		createMenuExt: function() {
			var me = this,
				html = [],
				options = me.options,
				locale = multiGrid.LOCALES[me.options.locale],
				menuExt = options.menuExt;
			html.push(
				'<ul class="multigrid-dropdown" style="',
				'left:{left}px;top:{top}px;">'
			);
			if (menuExt.showPage) {
				html.push(
					'<li data-page="showPage">',
					me.renderText(TEMPLATE.checkbox, {
						checked: options.showPage ? ' checked' : ''
					}),
					locale.menuPage,
					'</li>'
				)
			}
			if (menuExt.showTotal) {
				html.push(
					'<li data-page="showTotalData">',
					me.renderText(TEMPLATE.checkbox, {
						checked: options.showTotalData ? ' checked' : ''
					}),
					locale.menuTotal,
					'</li>'
				)
			}
			if (menuExt.showPageData) {
				html.push(
					'<li data-page="showPageData">',
					me.renderText(TEMPLATE.checkbox, {
						checked: options.showPageData ? ' checked' : ''
					}),
					locale.menuPageData,
					'</li>'
				)
			}
			if (menuExt.showPagina) {
				html.push(
					'<li data-page="showPaginaData">',
					me.renderText(TEMPLATE.checkbox, {
						checked: options.showPaginaData ? ' checked' : ''
					}),
					locale.menuPagina,
					'</li>'
				)
			}
			if (menuExt.showModel) {
				html.push(
					'<li data-page="showModel">',
					me.renderText(TEMPLATE.checkbox, {
						checked: options.showModel ? ' checked' : ''
					}),
					locale.menuModel,
					'</li>'
				)
			}
			if (menuExt.showFixedRow) {
				html.push('<li data-page="fixedRow">', locale.fixedRow, '</li>');
			}
			if (menuExt.showFixedCol) {
				html.push('<li data-page="fixedCol">', locale.fixedCol, '</li>');
			}
			if (menuExt.showFixedRowCol) {
				html.push('<li data-page="fixedRowCol">', locale.fixedRowCol, '</li>');
			}
			if (menuExt.showCancelFixed) {
				html.push('<li data-page="cancelFixed">', locale.cancelFixed, '</li>');
			}
			html.push('</ul>');
			return html.join('');
		},
		refreshOptions: function(option) {
			var me = this;
			$.extend(me.options, option);
			me.init();
		},
		destroy: function() {
			var me = this;
			$.event.remove(me.$main);
			$.removeData(me.$main);
			me.$main.empty();
			me.$main.removeClass(me.classes);
		},
		load: function(params) {
			var me = this,
				data = me.getClientData(),
				option = me.options,
				url = option.url,
				request;
			$.extend(data, option.query);
			data[option.sortField] = me.querySort();
			data[option.sizeField] = option.pageSize;
			data[option.numberField] = option.pageNumber;
			if (typeof params === 'object') {
				if (params.url) {
					url = params.url;
				}
				$.extend(data, params.data);
			}
			if (typeof option.queryParams === 'function') {
				data = option.queryParams.call(me, data);
				if (data === false) {
					return false;
				};
			};
			url = me.renderText(url, data, function(value, key){
				if ( key && value!== '' ) {
					delete data[key];
				};
			});
			if ( !url ) return;
			request = $.extend({
				beforeSend: function() {
					me.$inner.empty();
					me.$body2.empty();
					if (me.options.showNoMatches) {
						me.$noMatches.hide();
					}
					me.showLoading();
				},
				success: function(result) {
					me.hideLoading();
					if ( typeof result === "string" ) {
						result = $.parseJSON(result);
					}
					if(typeof option.dataFilter === 'function'){
						result = option.dataFilter.call(this, result) || {};
					}
					if (option.clientPages) {
						option._data = me.getForJSON(option.itemsField, result);
						me.total = option._data.length;
						option.data = me.getClientPagesData();
					} else {
						me.total = me.getForJSON(option.totalField, result);
						option.data = me.getForJSON(option.itemsField, result);
						option.pageNumber = Math.min(option.pageNumber, Math.ceil(me.total / option.pageSize));
						if (option.pageNumber < 1) option.pageNumber = 1;
					}
					me.initBody();
					me.initFooter();
					me.bindBody();
					me.initPage();
					me.resizeBody();
					me.resetCheckAll();
					me.detailResetAll();
				},
				error: function (result) {
					me.hideLoading();
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
		append: function(data, index) {
			var me = this,
				items,
				len;
			if (me.options.clientPages) {
				items = me.options._data;
				len = items.length;
			} else {
				items = me.options.data,
				len = items.length;
			};
			if (typeof index !== 'number' || index > len || index < 0) {
				index = len;
			};
			if (!$.isArray(data)) data = [data || {}];
			len = data.length;
			while (len--) {
				items.splice(index, 0, $.extend(true, {}, data[len]));
			};
			if (me.options.clientPages) {
				me.options.data = me.getClientPagesData();
			};
			me.total = items.length;
			me.initBody();
			me.initFooter();
			me.bindBody();
			me.initPage();
			me.resizeBody();
			me.resetCheckAll();
			me.detailResetAll();
		},
		update: function(data, index) {
			var me = this,
				item = me.options.clientPages ? me.options._data[index] : me.options.data[index];
			if (item) $.extend(item, data);
			me.initBody();
			me.initFooter();
			me.bindBody();
			me.initPage();
			me.resizeBody();
			me.resetCheckAll();
			me.detailResetAll();
		},
		reset: function(items) {
			var me = this;
			if ($.isArray(items)) {
				if (me.options.clientPages) {
					me.options._data = items;
				} else {
					me.options.data = items;
				};
				me.total = items.length;
			};
			me.initBody();
			me.initFooter();
			me.bindBody();
			me.initPage();
			me.resizeBody();
			me.resetCheckAll();
			me.detailResetAll();
		},
		refresh: function(total) {
			var me = this;
			if (me.options.clientPages) {
				me.options.data = me.getClientPagesData();
				me.total = typeof total === 'number' ? total : me.options._data.length;
			} else {
				if (typeof total === 'number') {
					me.total = total;
				} else if (!me._xhr) {
					me.total = me.options.data.length;
				};
			};
			me.initBody();
			me.initFooter();
			me.bindBody();
			me.initPage();
			me.resizeBody();
			me.resetCheckAll();
			me.detailResetAll();
		},
		delRow: function(item) {
			var me = this,
				len = me.options.data.length - 1;
			if (!$.isArray(item)) item = [item];
			while ( len >= 0 ) {
				if ($.inArray(len, item) !== -1) {
					me.options.data.splice(len, 1);
				}
				len --;
			}
			me.total = me.options.data.length;
			me.initBody();
			me.initFooter();
			me.bindBody();
			me.initPage();
			me.resizeBody();
			me.resetCheckAll();
			me.detailResetAll();
		},
		delSltRow: function() {
			var me = this,
				items = me.options.data,
				k = items.length - 1;
			while ( k >= 0 ) {
				if (items[k][me.options.checkField]) {
					items.splice(k, 1);
				};
				k--;
			};
			me.total = items.length;
			me.initBody();
			me.initFooter();
			me.bindBody();
			me.initPage();
			me.resizeBody();
			me.resetCheckAll();
			me.detailResetAll();
		},
		emptyRow: function() {
			var me = this;
			if (me.options.clientPages) {
				me.options._data = [];
			};
			me.options.data = [];
			me.total = 0;
			me.initBody();
			me.initFooter();
			me.bindBody();
			me.initPage();
			me.resizeBody();
			me.resetCheckAll();
			me.detailResetAll();
		},
		resetCheckAll: function() {
			var me = this,
				k,
				row,
				len;
			if (!me.$checkAll) {
				return me;
			}
			if (me.options.data.length === 0) {
				me.$checkAll.prop('checked', false);
				return me;
			}
			k = 0;
			row = me.rows;
			len = row.length;
			while (k < len) {
				if (!row[k].checked) {
					me.$checkAll.prop('checked', false);
					me.options.onUncheckAll.call(me);
					return me;
				}
				k ++;
			}
			me.$checkAll.prop('checked', true);
			me.options.onCheckAll.call(me);
		},
		checkedAll: function() {
			var me = this,
				k = 0;
			if (!me.hasChecked) {
				return me;
			}
			while ( k < me.rows.length ) {
				me.rows[k].checked = true;
				k ++;
			}
			me.resetCheckAll();
		},
		uncheckedAll: function() {
			var me = this,
				k = 0;
			if (!me.hasChecked) {
				return me;
			}
			while ( k < me.rows.length ) {
				me.rows[k].checked = false;
				k ++;
			}
			me.resetCheckAll();
		},
		inverseChecked: function(items) {
			var me = this;
			if (!me.hasChecked) {
				return me;
			}
			if (!$.isArray(items)) items = [items];
			$.map(items, function(index){
				var row = me.rows[index];
				if (row) {
					row.checked = !row.checked;
				}
			})
			me.resetCheckAll();
		},
		inverseCheckedAll: function() {
			var me = this,
				k = 0;
			if (!me.hasChecked) {
				return me;
			}
			while ( k < me.rows.length ) {
				me.rows[k].checked = false;
				k ++;
			}
			me.resetCheckAll();
		},
		checked: function(items) {
			var me = this;
			if (me.hasChecked) {
				if (!$.isArray(items)) {
					items = [items]
				}
				$.map(items, function(index){
					var row = me.rows[index];
					if (row) {
						row.checked = true;
					}
				})
				me.resetCheckAll();
			}
		},
		unchecked: function(items) {
			var me = this;
			if (me.hasChecked) {
				if (!$.isArray(items)) {
					items = [items]
				}
				$.map(items, function(index){
					var row = me.rows[index];
					if (row) {
						row.checked = false;
					}
				})
				me.resetCheckAll();
			}
		},
		detailToggle: function(items) {
			var me = this;
			if (me.options.detailEnabled) {
				if (!$.isArray(items)) items = [items];
				$.map(items, function(index){
					var row = me.rows[index];
					if (row) {
						row.detail = !row.detail;
					}
				});
				me.detailResetAll();
			}
		},
		detailShow: function(items) {
			var me = this;
			if (me.options.detailEnabled) {
				if (!$.isArray(items)) items = [items];
				$.map(items, function(index){
					var row = me.rows[index];
					if (row) {
						row.detail = true;
					}
				});
				me.detailResetAll();
			}
		},
		detailHide: function(items) {
			var me = this;
			if (me.options.detailEnabled) {
				if (!$.isArray(items)) items = [items];
				$.map(items, function(index){
					var row = me.rows[index];
					if (row) {
						row.detail = false;
					}
				});
				me.detailResetAll();
			}
		},
		detailShowAll: function() {
			var me = this;
			if (me.options.detailEnabled) {
				$.map(me.rows, function(row){
					row.detail = true;
				});
				me.detailResetAll();
			}
		},
		detailHideAll: function() {
			var me = this;
			if (me.options.detailEnabled) {
				$.map(me.rows, function(row){
					row.detail = false;
				});
				me.detailResetAll();
			}
		},
		detailResetAll: function() {
			var me = this,
				len,
				k,
				rows,
				row;
			if (me.options.detailEnabled && !me.options.singleDetail) {
				k = 0;
				rows = me.rows
				len = rows.length;
				while (k < len) {
					row = rows[k];
					if (!row.detail && !row.nodetail) {
						me.$detailAll.removeClass(me.options.icons.detailMinus).addClass(me.options.icons.detailPlus);
						return me;
					}
					k ++;
				}
				me.$detailAll.removeClass(me.options.icons.detailPlus).addClass(me.options.icons.detailMinus);
			}
		},
		detailRefresh: function(items) {
			var me = this,
				detailFormat = me.options.detailFormat;
			if (!$.isArray(items)) items = [items];
			$.map(items, function(index){
				var row = me.rows[index],
					data = me.options.data[index];
				if (row && row.detailEnabled) {
					row.$detail.children('td').empty().append(
						typeof detailFormat === 'function' ?
						detailFormat.call(me, data, index, me.model) :
						typeof detailFormat === 'string' ?
						me.renderText(detailFormat, {
							row: data,
							index: index
						}) : ''
					)
				}
			});
		},
		treeShow: function(index) {
			var me = this,
				row = me.getRowByIndex(index);
			row.open = true;
		},
		treeHide: function(index) {
			var me = this,
				row = me.getRowByIndex(index);
			row.open = false;
		},
		treeToggle: function(index) {
			var me = this,
				row = me.getRowByIndex(index);
			row.open = !row.open;
		},
		resize: function() {
			var me = this,
				wh,
				bh,
				height = me.options.height;
			if (me.layout === 'single' || height === 'auto') {
				return me;
			};
			if (typeof height === 'number' && height > 0) {
				wh = height;
			} else {
				bh = window.document.body.clientHeight;
				wh = bh - me.$main.offset().top - 1;
				if (typeof height === 'function') {
					wh = height.call(me, wh, bh);
				}
			};
			me.$main.css({height: wh});
			me.height = wh - me.headHeight - me.pageHeight;
			me.resizeBody();
		},
		resizeBody: function() {
			var me = this,
				fh = 0,
				st = me.scrollTop,
				height = me.height,
				$fixed1 = me.$inner.children('.multigrid-fixed'),
				$fixed2 = me.$body2.children('.multigrid-fixed');
			if (me.options.height === 'auto') {
				return me;
			}
			if (me.options.showFooter) {
				height = height - me.$footer2.hideCompute('outerHeight') || 0;
			}
			fh = $fixed1.hideCompute('outerHeight') || 0;
			if ( fh > st) fh = fh - st;
			$fixed1.css({top: me.headHeight - st});
			me.$body1.css({height: height - fh, marginTop: fh});
			fh = $fixed2.hideCompute('outerHeight') || 0;
			if ( fh > st) fh = fh - st;
			$fixed2.css({top: me.headHeight - st});
			me.$body2.css({height: height - fh, marginTop: fh});
		},
		resizeStart: function(left, pageX, header) {
			var me = this,
				line = {},
				height;
			me.$main.children('.multigrid-line').remove();
			me.resized = true;
			left = left - me.$main.offset().left;
			line.left = left + header.width;
			height = me.height ? me.height + me.headHeight : me.$view2.hideCompute('outerHeight');
			line.lLine = $(me.renderText(TEMPLATE.line, {
				height: height,
				left: left
			})).appendTo(me.$main);
			line.rLine = $(me.renderText(TEMPLATE.line, {
				height: height,
				left: line.left
			})).appendTo(me.$main);
			line.pageX = pageX;
			line.header = header;
			me.resizable = line;
			$('body').css("cursor",'e-resize');
			me.removeSelectEvent();
		},
		resizeEnd: function() {
			var me = this,
				header = me.resizable.header,
				diff = me.resizable.diff;
			me.resized = false;
			$('body').css("cursor",'');
			me.addSelectEvent();
			me.$main.children('.multigrid-line').remove();
			me.resizable = null;
			if( typeof diff === 'number' && diff !== 0 ){
				header.width += diff;
				me.initHeader();
				me.bindHeader();
				me.initBody();
				me.initFooter();
				me.bindBody();
				me.resize();
				me.resetCheckAll();
			}
		},
		dragStart: function() {
		},
		dragEnd: function() {
		},
		initSelectEvent: function() {
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
		},
		sortNumber: function(items, field) {
			var k = 0,
				item,
				len = items.length;
			while (k < len) {
				item = items[k];
				if (!$.isNumeric(item[field])) {
					return false;
				}
				k++;
			}
			return true;
		},
		sort: function(header) {
			var me = this,
				option = me.options;
			header.sortOrder = header.sortOrder ? header.sortOrder === 'desc' ? 'asc' : 'desc' : option.sortOrder;
			if (option.clientPages) {
				if (option.orderByOne) {
					me.$sortItems.not('[data-field=' + header.field + ']').find('i').prop('class', option.icons.sortUpDown);
				}
				if (typeof header.sortNumber !== 'boolean') {
					header.sortNumber = me.sortNumber(option._data, header.field);
				}
				if (header.sortOrder === 'desc') {
					me.$sortItems.filter('[data-field=' + header.field + ']').find('i').prop('class', option.icons.sortDown);
					option._data = me.initSort(option._data, header.field, false, header.sortNumber);
				} else {
					me.$sortItems.filter('[data-field=' + header.field + ']').find('i').prop('class', option.icons.sortUp);
					option._data = me.initSort(option._data, header.field, true, header.sortNumber);
				}
				option.data = me.getClientPagesData();
				me.initBody();
				me.initFooter();
				me.bindBody();
				me.initPage();
				me.resizeBody();
				me.resetCheckAll();
				me.detailResetAll();
			} else {
				if (option.orderByOne) {
					me.orderItems = {};
					me.$sortItems.not('[data-field='+header.field+']').find('i').prop('class', option.icons.sortUpDown);
				};
				if (header.sortOrder === 'desc') {
					me.$sortItems.filter('[data-field='+header.field+']').find('i').prop('class', option.icons.sortDown);
					me.orderItems[header.sortProperty] = option.descField;
				} else {
					me.$sortItems.filter('[data-field='+header.field+']').find('i').prop('class', option.icons.sortUp);
					me.orderItems[header.sortProperty] = option.ascField;
				};
				me.load();
			}
		},
		initSort: function(arr, field, asc, number) {
			var me = this,
				len = arr.length;
			return me.quickSort(arr, field, asc, 0, len - 1);
		},
		quickSort: function(arr, field, asc, i, k) {
			var me = this,
				len = arr.length,
				index;
			if (i < k) {
				index = me.partition(arr, field, asc, i, k);
				me.quickSort(arr, field, asc, i, index - 1);
				me.quickSort(arr, field, asc, index + 1, k);
			}
			return arr;
		},
		partition: function(arr, field, asc, i, k) {
			var first = i,
				index = first + 1,
				cache;
			i = index;
			while (i <= k) {
				if (asc) {
					/* 重小到大排序 */
					if (arr[i][field] <= arr[first][field]) {
						cache = arr[i];
						arr[i] = arr[index];
						arr[index] = cache;
						index++;
					}
				} else {
					/* 重大到小排序 */
					if (arr[i][field] >= arr[first][field]) {
						cache = arr[i];
						arr[i] = arr[index];
						arr[index] = cache;
						index++;
						console.log(arr[i], arr[index]);
					}
				}
				i++;
			}
			cache = arr[first];
			arr[first] = arr[index - 1];
			arr[index - 1] = cache;
			return index - 1;
		},
		showLoading: function() {
			this.$loading.show();
		},
		hideLoading: function() {
			this.$loading.hide();
		},
		emptySelector: function() {
			var me = this;
			me.$form.find('.form-wrap input:not(.disabled)').each(function(){
				var $this = $(this);
				this.value = '';
				//修复DateTimePicker清空后最大最小输入日期不修改bug
				if ($this.data('DateTimePicker')) {
					$this.trigger('dp.change');
				};
			});
			me.$form.find('.form-wrap select:not(.disabled)').each(function(){
				this.options[0].selected = true;
				$(this).trigger('change');
			});
			me.$blurSearch.each(function(){
				this.value = '';
			});
			return me;
		},
		mergeCells: function(items) {
			var me = this,
				$td,
				$div,
				_$td,
				_$div,
				rowspan,
				maxHeight,
				style = {
					height: 'auto',
					lineHeight: '14px',
					whiteSpace: 'normal'
				};
			if (typeof items === 'number') items = [items];
			$.map(items, function(item) {
				_$td = null;
				_$div = null;
				$.map(me.rows, function(row, index) {
					if (index === me.options.fixedRow) _$td = null;
					$td = row.$row.children('td').eq(item);
					$div = $td.children('div');
					if (_$td !== null && $div.html() == _$div.html()) {
						rowspan = rowspan + 1;
						_$td.attr("rowSpan", rowspan);
						_$div.css('maxHeight', rowspan * me.rowHeight - 5);
						$td.hide();
					} else {
						rowspan = 1;
						_$td = $td;
						_$div = $div.css(style);
					}
				});
			});
			return this;
		},
		freezeMergeCells: function(option) {
			var me = this,
				row = option.index,
				field = option.field,
				rowspan = option.rowspan,
				colspan = option.colspan,
				_rowspan,
				_colspan,
				model,
				width,
				i,
				k,
				col,
				$td;
			if (!(rowspan > 0) || !(colspan > 0) || !(row >= 0) || !field){
				return this;
			}
			rowspan = row < me.options.fixedRow ? Math.min(row + rowspan, me.options.fixedRow) : Math.min(row + rowspan, me.options.data.length);
			width = 0;
			model = me.getFixedModelField();
			col = $.inArray(field, model);
			if (col === -1) {
				k = model.length;
				model = me.getModelField();
				col = $.inArray(field, model);
				if (col < 0) return this;
				colspan = Math.min(colspan + col, model.length);
				model = me.getShowModel();
				for (i = col ; i < colspan ; i++) {
					width += model[i].width;
				}
				col = col + k;
				colspan = colspan + k;
			} else {
				colspan = Math.min(colspan + col, model.length);
				model = me.getShowFixedModel();
				for (i = col ; i < colspan ; i++) {
					width += model[i].width;
				}
			}
			_rowspan = rowspan - row;
			_colspan = colspan - col;
			$td = me.rows[row].$row.find('>td').eq(col).attr('colspan', _colspan).attr('rowspan', _rowspan);
			$td.children('div').css({
				height: 'auto',
				lineHeight: '14px',
				whiteSpace: 'normal',
				maxHeight: _rowspan * me.rowHeight - 5,
				width: width
			});
			for (row ; row < rowspan ; row++) {
				for (k = col ; k < colspan; k++) {
					me.rows[row].$row.find('>td').eq(k).hide();
				}
			}
			$td.show();
			return this;
		},
		changePage: function(pageSize) {
			var me = this,
				$select;
			if (!pageSize){
				$select = me.$page.find('.multigrid-page-info select');
				if ($select.length === 1) {
					pageSize = parseInt($select.val())
				}
			}
			if ($.inArray(pageSize, me.options.pageData) !== -1 && me.options.pageSize !== pageSize) {
				me.options.pageNumber = 1;
				me.options.pageSize = pageSize;
				if (me.options.clientPages) {
					me.options.data = me.getClientPagesData();
					me.initBody();
					me.initFooter();
					me.bindBody();
					me.initPage();
					me.resizeBody();
					me.resetCheckAll();
					me.detailResetAll();
				} else {
					me.load()
				}
			}
			return this;
		},
		selectPage: function(pageNumber) {
			var me = this,
				$input;
			if (me.total) {
				if (!pageNumber) {
					$input = me.$page.find('.multigrid-pagina input');
					if ($input.length === 1) {
						pageNumber = parseInt($input.val()) || me.options.pageNumber;
					}
				}
				me.options.pageNumber = Math.min(pageNumber, Math.ceil(me.total / me.options.pageSize));
				if (me.options.pageNumber < 1) me.options.pageNumber = 1;
				if (me.options.clientPages) {
					me.options.data = me.getClientPagesData();
					me.initBody();
					me.initFooter();
					me.bindBody();
					me.initPage();
					me.resizeBody();
					me.resetCheckAll();
					me.detailResetAll();
				} else {
					me.load()
				}
			}
			return this;
		},
		firstPage: function() {
			var me = this;
			if (me.options.pageNumber !== 1) {
				me.options.pageNumber = 1;
				if (me.options.clientPages) {
					me.options.data = me.getClientPagesData();
					me.initBody();
					me.initFooter();
					me.bindBody();
					me.initPage();
					me.resizeBody();
					me.resetCheckAll();
					me.detailResetAll();
				} else {
					me.load()
				}
			}
			return this;
		},
		prevPage: function() {
			var me = this;
			if (me.options.pageNumber > 1) {
				me.options.pageNumber -= 1;
				if (me.options.clientPages) {
					me.options.data = me.getClientPagesData();
					me.initBody();
					me.initFooter();
					me.bindBody();
					me.initPage();
					me.resizeBody();
					me.resetCheckAll();
					me.detailResetAll();
				} else {
					me.load()
				}
			}
			return this;
		},
		nextPage: function() {
			var me = this,
				max = Math.ceil(me.total / me.options.pageSize);
			if (me.options.pageNumber < max) {
				me.options.pageNumber += 1;
				if (me.options.clientPages) {
					me.options.data = me.getClientPagesData();
					me.initBody();
					me.initFooter();
					me.bindBody();
					me.initPage();
					me.resizeBody();
					me.resetCheckAll();
					me.detailResetAll();
				} else {
					me.load()
				}
			}
			return this;
		},
		lastPage: function() {
			var me = this,
				max = Math.ceil(me.total / me.options.pageSize);
			if (me.options.pageNumber !== max) {
				me.options.pageNumber = max;
				if (me.options.clientPages) {
					me.options.data = me.getClientPagesData();
					me.initBody();
					me.initFooter();
					me.bindBody();
					me.initPage();
					me.resizeBody();
					me.resetCheckAll();
					me.detailResetAll();
				} else {
					me.load()
				}
			}
			return this;
		},
		finishTreeRows: function(rows) {
			var me = this;
			$.map(rows, function(row, index) {
				var k = 0,
					plugin,
					len = row.plugin.length;
				row.$row = me.$main.find('tr[data-index=' + row.treeIndex + ']');
				row.$select = row.$row.find('input[name=' + me.options.checkField + ']');
				if (me.options.detailEnabled && !row.nodetail) {
					row.$detailIcon = row.$row.find('.multigrid-detail-icon>i');
					row.$detail = row.$row.next('.multigrid-detail');
				}
				me.options.rowPostRender.call(me, row, index);
				while (k < len) {
					plugin = row.plugin[k];
					plugin.$el = $('#' + plugin.id);
					plugin.enabled && plugin.done(me);
					k ++;
				}
				if (row.children && row.children.length > 0) {
					me.finishTreeRows(row.children);
				}
			})
		},
		initEvent: function() {
			var me = this,
				$select = $(me.options.selectId),
				$toggle = $(me.options.toggleId),
				$search = $(me.options.searchId),
				$empty = $(me.options.emptyId),
				$blurSelect = $(me.options.blurSelectId);

			if ($select.length === 1) {
				$select.off('click').on('click', function(e) {
					e.stopPropagation();
                    $search.fadeOut();
					me.load();
				});
			};
			
			if ($toggle.length === 1 && $search.length === 1) {
				$toggle.off('click').on('click', function(e) {
					e.stopPropagation();
					$search.fadeToggle();
				});
			};

			if ($empty.length === 1) {
				$empty.off('click').on('click', function(e) {
					e.stopPropagation();
					me.emptySelector();
				});
			}

			if (me.$form.length) {
				me.$form.off('click').on('keypress', 'input', function(e){
					var key = e.keyCode || e.which;
					e.stopPropagation();
					if (key === 13) {
						$search.fadeOut();
						me.load();
					}
				});
			}

			me.$blurSearch.each(function() {
				$(this).off('keypress').on('keypress', function(e){
					var key = e.keyCode || e.which;
					e.stopPropagation();
					if (key === 13) {
						me.load();
					}
				});
			});

			if ($blurSelect.length === 1) {
				$blurSelect.off('click').on('click', function(e) {
					e.stopPropagation();
					me.load();
				});
			}

			me.$main.on('hide.multigrid', function(){
				if (me.options.showPage) {
					me.$page.find('.multigrid-dropdown').hide();
				}
				if (me.options.menuExt.enabled) {
					me.$menu.empty();
				}
			});

			if (me.$body2) {
				me.$body2.off('scroll').on('scroll', function(e) {
					var $this = $(this),
						sl = $this.scrollLeft(),
						st = $this.scrollTop();
					if (sl !== me.scrollLeft) {
						me.$head.scrollLeft(sl);
						me.$body2.children('.multigrid-fixed').css({
							left: -sl
						});
					}
					if (st !== me.scrollTop) {
						me.$body1.scrollTop(st);
					}
					me.scrollLeft = sl;
					me.scrollTop = st;
				});
			};

			if (typeof me.options.height !== 'number') {
				$(window).on('resize', function() {
					me.resize();
				});
			};

			$(document).mousemove(function(e) {
				if (me.resized) {
					var line = me.resizable,
						diff = e.pageX - line.pageX,
						cur = line.header.width + diff,
						min = line.header.minWidth,
						max = line.header.maxWidth;
					if ((!min || cur >= min) && (!max || cur <= max)) {
						line.diff = diff;
						line.rLine.css('left', line.left + diff + 'px');
					};
				};
			}).mouseup(function() {
				me.resized && me.resizeEnd();
				me.dragged && me.dragEnd();
			}).on('mousewheel', function(){
				//鼠标滚动触发hide事件
				//me.$main.trigger('hide.multigrid');
			});

			if (window.dropDownManager) {
				window.dropDownManager.addDropEvent(function(){
					me.$main.trigger('hide.multigrid');
				});
			} else {
				$(document).on('click', function() {
					//鼠标点击触发hide事件
					me.$main.trigger('hide.multigrid');
				});
			};

			me.$main.off('click').on('click', '.multigrid-link', function(e) {
				e.stopPropagation();
				var field = this.getAttribute('data-field'),
					index = me.getIndexByEl(this),
					data = me.getDataByIndex(index),
					model = me.getModelByParam('field', field);
				if (typeof model.onClick === 'function') {
					model.onClick.call(this, data, index, model, me);
				};
			}).on('click', 'tr[data-index]', function() {
				var k,
					len,
					index = parseInt(this.getAttribute('data-index')),
					data = me.getDataByIndex(index),
					row = me.getRowByIndex(index);
				if (typeof me.options.onRowClick === 'function') {
					if (me.options.onRowClick.call(this, data, index, me) === false) {
						return false;
					};
				};
				if (me.layout === 'tree' && me.options.clickToOpen) {
					me.treeToggle(index);
				};
				if (me.options.clickToDetail) {
					if (me.options.singleDetail) {
						k = 0;
						len = me.rows.length;
						while (k < len) {
							if (k !== index) {
								me.rows[k].detail = false;
							};
							k ++;
						};
						row.detail = !row.detail;
					} else {
						me.detailToggle(index);
					};
				};
				if (me.hasChecked && me.options.clickToSelect) {
					if (me.options.singleSelect) {
						k = 0;
						len = me.rows.length;
						while (k < len) {
							if (k !== index) {
								me.rows[k].checked = false;
							} else {
								me.rows[k].checked = true;
							};
							k ++;
						};
					} else {
						row.checked = !row.checked;
						me.resetCheckAll();
					};
				};
			}).on('click', 'input[type=checkbox][name=' + me.options.checkField + ']', function(e){
				var k,
					len,
					index = me.getIndexByEl(this),
					data = me.getDataByIndex(index),
					row = me.getRowByIndex(index);
				e.stopPropagation();
				if (me.options.singleSelect) {
					k = 0;
					len = me.rows.length;
					while (k < len) {
						if (k !== index) {
							me.rows[k].checked = false;
						} else {
							me.rows[k].checked = true;
							this.checked = true;
						};
						k ++;
					};
				} else {
					row.checked = !row.checked;
					me.resetCheckAll();
				};
			}).on('click', '.multigrid-tree-icon', function(e){
				var index = $(this).closest('tr').data('index');
				e.stopPropagation();
				me.treeToggle(index);
			}).on('click', '.multigrid-body .multigrid-detail-icon', function(e){
				var index = $(this).closest('tr').data('index'),
					row = me.getRowByIndex(index);
				e.stopPropagation();
				if (me.options.singleDetail) {
					k = 0;
					len = me.rows.length;
					while (k < len) {
						if (k !== index) {
							me.rows[k].detail = false;
						};
						k ++;
					};
					row.detail = !row.detail;
				} else {
					me.detailToggle(index)
				};
			}).off('dblclick').on('dblclick', 'tr[data-index]', function() {
				var index = this.getAttribute('data-index'),
					data = me.getDataByIndex(index);
				if (typeof me.options.onDbRowClick === 'function') {
					if (me.options.onDbRowClick.call(this, data, index, me) === false) {
						return false;
					};
				};
			}).on('click', '.multigrid-head tr th', function(e){
				var $this = $(this),
					field = $this.data('field'),
					header = me.getModelByParam('field', field);
				header.sortable && me.sort(header);
			});

			return this;
		},
		bindHeader: function() {
			var me = this;

			if (me.$checkAll && !me.options.singleSelect) {
				me.$checkAll.off('click').on('click', function() {
					if (this.checked) {
						if (typeof me.options.beforeCheckAll === 'function') {
							if (me.options.beforeCheckAll.call(me, this.checked) === false) {
								return ;
							}
						}
						me.checkedAll();
					} else {
						if (typeof me.options.beforeUncheckAll === 'function') {
							if (me.options.beforeUncheckAll.call(me, this.checked) === false) {
								return ;
							}
						}
						me.uncheckedAll();
					}
				})
			};

			if (me.options.detailEnabled && !me.options.singleDetail) {
				me.$detailAll.off('click').on('click', function() {
					me[$(this).hasClass(me.options.icons.detailPlus) ? 'detailShowAll' : 'detailHideAll']();
				})
			};

			me.$main.find('.multigrid-head tr th').off('mousemove').on('mousemove', function(e) {
				var left,
					cursor,
					$this = $(this),
					field = $this.data('field'),
					header = me.getModelByParam('field', field);
				if (header.resizable) {
					left = $this.offset().left + $this.outerWidth();
					cursor = e.pageX > (left - 5) && e.pageX < left ? 'e-resize' : '';
					$this.css('cursor', cursor);
				}
			}).off('mousedown').on('mousedown', function(e) {
				var $this = $(this),
					field = $this.data('field'),
					left,
					header = me.getModelByParam('field', field);
				if ($this.css('cursor') === "e-resize") {
					left = $this.offset().left;
					me.resizeStart(left, e.pageX, header);
				} else if (header.draggable) {
					me.dragStart();
				}
			});
		},
		bindBody: function(index) {
			var me = this,
				merge = [],
				fixed = 0;

			me.$main.find('tr[data-index]').off('mouseenter').on('mouseenter', function() {
				var row = me.rows[this.getAttribute('data-index')];
				if (row && row.$row) {
					row.$row.addClass('hover')
				}
			}).off('mouseout').on('mouseout', function() {
				var row = me.rows[this.getAttribute('data-index')];
				if (row && row.$row) {
					row.$row.removeClass('hover')
				}
			})

			$.map(me.rows, function(row, index) {
				var k = 0,
					plugin,
					len = row.plugin.length;
				row.$row = me.$main.find('tr[data-index=' + row.index + ']');
				row.$select = row.$row.find('input[name=' + me.options.checkField + ']');
				if (me.options.detailEnabled && !row.nodetail) {
					row.$detailIcon = row.$row.find('.multigrid-detail-icon>i');
					row.$detail = row.$row.next('.multigrid-detail');
				}
				me.options.rowPostRender.call(me, row, index);
				while (k < len) {
					plugin = row.plugin[k];
					plugin.$el = $('#' + plugin.id);
					plugin.enabled && plugin.done(me);
					k ++;
				}
				if (row.children && row.children.length > 0) {
					me.finishTreeRows(row.children);
				}
			})

			$.map(me.fixedModel, function(model){
				if (model.show) {
					if (model.mergeCells) {
						merge.push(fixed);
					}
					fixed ++;
				}
			})
			$.map(me.model, function(model){
				if (model.show) {
					if (model.mergeCells) {
						merge.push(fixed);
					}
					fixed ++;
				}
			})
			me.mergeCells(merge);

			if (typeof me.options.onPostRender === 'function') {
				me.options.onPostRender.call(me, me.options.data)
			}

			return this;
		},
		getClientData: function() {
			var data = {};
			this.$form.serializeArray().map(function(item){
				if(item.value !== '') {
					data[item.name] = item.value;
				};
			});
			this.$blurSearch.each(function(){
				if (this.value !== '') {
					data[this.name] = this.value;
				};
			});
			return data;
		},
		getClientPagesData: function(){
			var me = this,
				option = me.options;
			return option._data.slice((option.pageNumber - 1) * option.pageSize, option.pageNumber * option.pageSize);
		},
		querySort: function(){
			var me = this,
				data;
			if (typeof me.options.sortParams === 'function') {
				data = me.options.sortParams.call(me, me.orderItems);
			} else {
				data = [];
				me.each(me.orderItems, function(value, key){
					data.push(key + me.options.sortSpace + value);
				});
				data = data.join(me.options.sortText);
			}
			return data;
		},
		getShowFixedModel: function() {
			var me = this,
				model = [];
			$.map(me.fixedModel, function(item) {
				if (item.show) model.push(item);
			});
			return model;
		},
		getShowModel: function() {
			var me = this,
				model = [];
			$.map(me.model, function(item) {
				if (item.show) model.push(item);
			});
			return model;
		},
		getFixedModelField: function(show) {
			var me = this,
				field = [];
			$.map(me.fixedModel, function(item) {
				if (show || item.show) field.push(item.field);
			});
			return field;
		},
		getModelField: function(show) {
			var me = this,
				field = [];
			$.map(me.model, function(item) {
				if (show || item.show) field.push(item.field);
			});
			return field;
		},
		getAllModelField: function(show) {
			var me = this,
				field;
			field = me.getFixedModelField(show);
			field.push.apply(field, me.getModelField(show));
			return field;
		},
		getModelByParam: function(param, value) {
			var k = 0,
				model = this.fixedModel,
				len = model.length;
			while ( k < len ) {
				if(model[k][param] == value) {
					return model[k];
				}
				k++;
			}
			k = 0;
			model = this.model;
			len = model.length;
			while ( k < len ) {
				if (model[k][param] == value) {
					return model[k];
				}
				k++;
			}
			return {};
		},
		getAllModel: function() {
			var me = this,
				k = 0,
				item,
				data,
				header = [],
				model = me.options.model,
				fixedModel = me.options.fixedModel,
				len = Math.max(fixedModel.length, model.length);
			while (k < len) {
				data = [];
				item = fixedModel[k];
				if (item && item.length > 0) {
					data.push.apply(data, item);
				}
				item = model[k];
				if (item && item.length > 0) {
					data.push.apply(data, item);
				}
				header.push(data);
				k++;
			}
			return header;
		},
		getRowByIndex: function(index){
			var me = this,
				len,
				k = 0,
				row;
			if ($.isNumeric(index)) {
				return me.rows[index] || {};
			}
			if (typeof index === 'string') {
				row = me.rows;
				index = index.split('-');
				len = index.length - 1;
				while (k < len) {
					if (row = row[index[k]]) {
						if (!(row = row.children)) {
							return {};
						}
					} else {
						return {};
					}
					k ++;
				}
				return row[index[len]] || {}
			} else {
				return {}
			}
		},
		getDataByIndex: function(index) {
			var me = this,
				len,
				k = 0,
				data,
				field = me.options.childrenField;
			if ($.isNumeric(index)) {
				return me.options.data[index] || {};
			}
			if (typeof index === 'string') {
				data = me.options.data;
				index = index.split('-');
				len = index.length - 1;
				while (k < len) {
					if (data = data[index[k]]) {
						if (!(data = data[field])) {
							return {};
						}
					} else {
						return {};
					}
					k ++;
				}
				return data[index[len]] || {};
			} else {
				return {}
			}
		},
		getDataByEl: function(el) {
			var index = this.getIndexByEl(el);
			return this.getDataByIndex(index);
		},
		getIndexByEl: function(el) {
			!(el instanceof $) && (el = $(el));
			if (el.get(0).tagName !== 'TR') {
				el = el.parents('tr:eq(0)')
			}
			return el.data('index');
		},
		getSltData: function() {
			var items = [],
				item,
				data = this.options.data,
				len = data.length,
				field = this.options.checkField,
				k = 0;
			while (k < len) {
				item = data[k];
				item[field] && items.push(item);
				k++;
			}
			return items;
		},
		getUnSltData: function() {
			var items = [],
				item,
				data = this.options.data,
				len = data.length,
				field = this.options.checkField,
				k = 0;
			while (k < len) {
				item = data[k];
				!item[field] && items.push(item);
				k++;
			}
			return items;
		},
		getData: function() {
			return this.options.data;
		},
		getGridData: function() {
			var me = this,
				header = [];
			$.map(me.fixedRow, function(items){
				if (items.field) {
					header.push(items.field);
				}
			})
		},
		hasDataByKeys: function(data, param) {
			var me = this,
				items,
				item,
				len,
				k = 0;
			if (param && typeof(param) === "string") {
				items = me.getData();
				len = items.length;
				param = param.split(',');
				if (param.length === 1) {
					param = param[0];
					while (k < len) {
						item = items[k];
						if (item[param] == data[param]) {
							return true;
						}
						k ++;
					}
				} else if (param.length > 1) {
					while (k < len) {
						item = items[k];
						var flag = true;
						$.map(param, function(_param) {
							if (item[_param] != data[_param]) {
								flag = false;
								return false;
							}
						})
						if (flag) return true;
						k ++;
					}
				}
			}
			return false;
		},
		uniqueDataBykeys: function(data, keys) {
			var me = this,
				row = [];
			if (!$.isArray(data)) data = [data];
			$.map(data, function(item){
				if (!me.hasDataByKeys(item, keys)) {
					row.push(item);
				}
			})
			return row;
		},
		export: function(type, name) {
			var me = this,
				options,
				link;
			if (typeof type === 'string') {
				options = type.toLowerCase();
				if (typeof me[options] === 'function') {
					type = options;
					if (typeof name !== 'string') {
						name = me.options.exportName;
					}
				} else {
					name = type;
					type = me.options.exportType;
				}
			} else {
				type = me.options.exportType;
				name = me.options.exportName;
			}
			if (typeof me[type] !== 'function' || typeof name !== 'string') {
				return ;
			}
			link = document.createElement('a');
			//设置下载url
			link.href = me[type]();
			link.download = [name, type].join('.');
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		},
		csv: function() {
			var me = this,
				str = "",
				field = [];
			me.fixedModel.map(function(item){
				if (item.show && item.field && item.header && item.type !== 'checkbox') {
					field.push(item);
					str += '"' + item.header + '",';
				}
			});
			me.model.map(function(item){
				if (item.show && item.field && item.header && item.type !== 'checkbox') {
					field.push(item);
					str += '"' + item.header + '",';
				}
			});
			str += '\n';
			me.options.data.map(function(item, index){
				field.map(function(model){
					var param;
					if (typeof model.exportFormat === 'function') {
						param = model.exportFormat(item[model.field], item, index, me);
					} else if (typeof model.format === 'function') {
						param = model.format(item[model.field], item, index, me);
					} else if (typeof model.format === 'string') {
						param = me.renderText(model.format, {
							value: item[model.field],
							index: index,
							model: model,
							row: item
						});
					} else {
						param = item[model.field];
					}
					str += param === null || param === undefined ? '"",' : '"' + param + '\t",';
				});
				str += '\n';
			})
			return 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
		},
		xls: function() {
			var me = this,
				blob,
				l,
				k = 0,
				items = me.getAllModel(),
				len = items.length,
				item,
				model,
				html = ['<html><head><meta charset="utf-8" /></head><body><table>'];
			while (k < len) {
				item = items[k];
				l = item.length;
				html.push('<tr>');
				i = 0;
				while (i < l) {
					model = item[i];
					if (model.show && model.type !== 'checkbox') {
						html.push('<th');
						model.rowspan && html.push(' rowspan=' + model.rowspan);
						model.colspan && html.push(' colspan=' + model.colspan);
						html.push('>', model.header, '</th>');
					};
					i ++;
				};
				html.push('</tr>');
				k ++;
			};
			html.push('</table></body></html>');
			blob = new Blob([html.join('')], {type: 'application/vnd.ms-excel'});
			return URL.createObjectURL(blob);
		}
	};

	function Plugins(id, value, model, index, data) {
		this.id = id;
		this.value = value === null || value === undefined ? '' : value;
		this.index = index;
		$.extend(this, model);
		this.init(data);
	};

	Plugins.prototype = {
		init: function() {
			return this;
		},
		create: function() {
			return '';
		},
		done: function() {
			return this;
		}
	}

	!window.multiGridManager && function(settings) {
		window.multiGridManager = settings;
	}({
		index: 0,
		getId: function() {
			return "multigrid_" + (1000 + this.index++);
		}
	});

	multiGrid.resetOptions = function() {
		multiGrid.defaults = $.extend({}, DEFAULTS);
	};

	multiGrid.setOptions = function(option) {
		multiGrid.defaults = $.extend({}, DEFAULTS, option);
	};

	multiGrid.resetModel = function() {
		multiGrid.model_defaults = $.extend({}, MODEL_DEFAULTS);
	};

	multiGrid.setModel = function(option) {
		multiGrid.model_defaults = $.extend({}, MODEL_DEFAULTS, option);
	};

	multiGrid.defaults = $.extend({}, DEFAULTS);

	multiGrid.model_defaults = $.extend({}, MODEL_DEFAULTS);

	multiGrid.LOCALES = {};

	multiGrid.LOCALES['en'] = {
		pageTotal: 'has {total} row',
		pageData: 'has {totalPage} page, each page display {select} row',
		loading: 'loading......',
		noMatches: 'No matching records found',
		menuPage: 'Show page bar',
		menuTotal: 'Show page total',
		menuPageData: 'Show page data',
		menuPagina: 'Show pagination',
		menuModel: 'Show model setting',
		fixedRow: 'Fixed rowspan',
		fixedCol: 'Fixed colspan',
		fixedRowCol: 'Fixed rowspan colspan',
		cancelFixed: 'Cancel fixed'
	}

	multiGrid.LOCALES['zh-CN'] = {
		pageTotal: '共 {total} 条数据',
		pageData: '共 {totalPage} 页, 每页展示 {select} 条',
		loading: '加载中......',
		noMatches: '没有找到匹配的记录',
		menuPage: '显示分页栏',
		menuTotal: '显示总数',
		menuPageData: '显示每页条数',
		menuPagina: '显示分页',
		menuModel: '显示设置列',
		fixedRow: '固定行',
		fixedCol: '固定列',
		fixedRowCol: '固定行列',
		cancelFixed: '取消固定'
	}

	multiGrid.plugins = PLUGINS;

	multiGrid.layout = LAYOUT;

	if (localStorage) {
		var lng = localStorage.getItem('i18nextLng');
		if ($.inArray(lng, Object.keys(multiGrid.LOCALES)) !== -1) {
			multiGrid.defaults.locale = lng;
		}
	}

	$.fn.multigrid = function(settings) {
		var result,
			args = Array.prototype.slice.call(arguments, 1);
		this.each(function() {
			var $this = $(this),
				options,
				multigrid = $this.data('multigrid');
			if (typeof settings === 'string') {
				if (!multigrid) return;
				if (typeof multigrid[settings] === 'function') {
					result = multigrid[settings].apply(multigrid, args)
				}
				if (settings === 'destroy') {
					$this.removeData('multigrid')
				}
			}
			if (!multigrid) {
				options = $.extend({}, multiGrid.defaults, settings);
				multigrid = new multiGrid($this, options);
				$this.data('multigrid', multigrid);
			}
		});
		return typeof result === 'undefined' ? this : result;
	};

	$.fn.multigrid.Constructor = multiGrid;

	$.fn.multigrid.defaults = multiGrid.defaults;

	$.fn.multigrid.model_defaults = multiGrid.model_defaults;

	$.fn.multigrid.locales = multiGrid.LOCALES;

	$.fn.multigrid.plugins = multiGrid.plugins;

	$.fn.multigrid.layout = multiGrid.layout;

	var draw = {
		shade: '<div style="position:absolute;left:0;right:0;top:0;' +
			'bottom:0;background:rgba(0,0,0,0.35);z-index:10000;"></div>',
		text: '<div style="position:absolute;width:300px;height:200' +
			'px;top:50%;margin-top:-150px;left:50%;margin-left:-100px;b' +
			'ackground:#fff;z-index:10001;padding:20px;"></div>',
		style: 'margin-right:20px;margin-bottom:20px;',
		init: function() {
			var me = this,
				$body = $('body');
				$body.append(me.shade);
			me.$dialog = $(me.text).appendTo($body);
			me.drawDownUp();
			me.drawDown();
			me.drawUp();
			me.drawFirst();
			me.drawPrev();
			me.drawNext();
			me.drawLast();
			me.drawSettings();
			me.drawPlus();
			me.drawMinus();
			me.drawOpen();
			me.drawClose();
		},
		drawDownUp: function() {
			var canvas = document.createElement('canvas'),
				ctx = canvas.getContext('2d'),
				image,
				images = new Image();
			ctx.beginPath();
			ctx.moveTo(4, 0);
			ctx.lineTo(1, 4);
			ctx.quadraticCurveTo(0, 5, 1, 6);
			ctx.lineTo(7, 6);
			ctx.quadraticCurveTo(8, 5, 7, 4);
			ctx.fillStyle = "#9b9b9b";
			ctx.closePath();
			ctx.fill();
			ctx.beginPath();
			ctx.moveTo(4, 14);
			ctx.lineTo(1, 10);
			ctx.quadraticCurveTo(0, 9, 1, 8);
			ctx.lineTo(7, 8);
			ctx.quadraticCurveTo(8, 9, 7, 10);
			ctx.fillStyle = "#9b9b9b";
			ctx.closePath();
			ctx.fill();
			image = ctx.getImageData(0, 0, 10, 16);
			canvas.width = 8;
			canvas.height = 14;
			ctx.putImageData(image, 0, 0);
			images.src = canvas.toDataURL("image/png");
			images.style = this.style;
			this.$dialog.append(images);
		},
		drawDown: function() {
			var canvas = document.createElement('canvas'),
				ctx = canvas.getContext('2d'),
				image,
				images = new Image();
			ctx.beginPath();
			ctx.moveTo(4, 14);
			ctx.lineTo(1, 10);
			ctx.quadraticCurveTo(0, 9, 1, 8);
			ctx.lineTo(7, 8);
			ctx.quadraticCurveTo(8, 9, 7, 10);
			ctx.fillStyle = "#9b9b9b";
			ctx.closePath();
			ctx.fill();
			image = ctx.getImageData(0, 0, 10, 16);
			canvas.width = 8;
			canvas.height = 14;
			ctx.putImageData(image, 0, 0);
			images.src = canvas.toDataURL("image/png");
			images.style = this.style;
			this.$dialog.append(images);
		},
		drawUp: function() {
			var canvas = document.createElement('canvas'),
				ctx = canvas.getContext('2d'),
				image,
				images = new Image();
			ctx.beginPath();
			ctx.moveTo(4, 0);
			ctx.lineTo(1, 4);
			ctx.quadraticCurveTo(0, 5, 1, 6);
			ctx.lineTo(7, 6);
			ctx.quadraticCurveTo(8, 5, 7, 4);
			ctx.fillStyle = "#9b9b9b";
			ctx.closePath();
			ctx.fill();
			image = ctx.getImageData(0, 0, 10, 16);
			canvas.width = 8;
			canvas.height = 14;
			ctx.putImageData(image, 0, 0);
			images.src = canvas.toDataURL("image/png");
			images.style = this.style;
			this.$dialog.append(images);
		},
		drawFirst: function() {
			var canvas = document.createElement('canvas'),
			ctx = canvas.getContext('2d'),
			image,
			images = new Image();
			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.lineTo(2, 0);
			ctx.lineTo(2, 6);
			ctx.lineTo(9, 0);
			ctx.lineTo(9, 14);
			ctx.lineTo(2, 8);
			ctx.lineTo(2, 14);
			ctx.lineTo(0, 14);
			ctx.fillStyle = "#9b9b9b";
			ctx.closePath();
			ctx.fill();
			image = ctx.getImageData(0, 0, 9, 14);
			canvas.width = 9;
			canvas.height = 14;
			ctx.putImageData(image, 0, 0);
			images.src = canvas.toDataURL("image/png");
			images.style = this.style;
			this.$dialog.append(images);
		},
		drawPrev: function() {
			var canvas = document.createElement('canvas'),
				ctx = canvas.getContext('2d'),
				image,
				images = new Image();
			ctx.beginPath();
			ctx.moveTo(0, 7);
			ctx.lineTo(6, 1);
			ctx.quadraticCurveTo(7, 0, 8, 1);
			ctx.lineTo(8, 13);
			ctx.quadraticCurveTo(7, 14, 6, 13);
			ctx.fillStyle = "#9b9b9b";
			ctx.closePath();
			ctx.fill();
			image = ctx.getImageData(0, 0, 8, 14);
			canvas.width = 8;
			canvas.height = 14;
			ctx.putImageData(image, 0, 0);
			images.src = canvas.toDataURL("image/png");
			images.style = this.style;
			this.$dialog.append(images);
		},
		drawNext: function() {
			var canvas = document.createElement('canvas'),
				ctx = canvas.getContext('2d'),
				image,
				images = new Image();
			ctx.beginPath();
			ctx.moveTo(8, 7);
			ctx.lineTo(2, 1);
			ctx.quadraticCurveTo(1, 0, 0, 1);
			ctx.lineTo(0, 13);
			ctx.quadraticCurveTo(1, 14, 2, 13);
			ctx.fillStyle = "#9b9b9b";
			ctx.closePath();
			ctx.fill();
			image = ctx.getImageData(0, 0, 8, 14);
			canvas.width = 8;
			canvas.height = 14;
			ctx.putImageData(image, 0, 0);
			images.src = canvas.toDataURL("image/png");
			images.style = this.style;
			this.$dialog.append(images);
		},
		drawLast: function() {
			var canvas = document.createElement('canvas'),
				ctx = canvas.getContext('2d'),
				image,
				images = new Image();
			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.lineTo(7, 6);
			ctx.lineTo(7, 0);
			ctx.lineTo(9, 0);
			ctx.lineTo(9, 14);
			ctx.lineTo(7, 14);
			ctx.lineTo(7, 8);
			ctx.lineTo(0, 14);
			ctx.fillStyle = "#9b9b9b";
			ctx.closePath();
			ctx.fill();
			image = ctx.getImageData(0, 0, 9, 14);
			canvas.width = 9;
			canvas.height = 14;
			ctx.putImageData(image, 0, 0);
			images.src = canvas.toDataURL("image/png");
			images.style = this.style;
			this.$dialog.append(images);
		},
		drawSettings: function() {
			var canvas = document.createElement('canvas'),
				ctx = canvas.getContext('2d'),
				image,
				images = new Image();
			ctx.beginPath();
			ctx.moveTo(1, 3);
			ctx.quadraticCurveTo(1, 2, 2, 2);
			ctx.lineTo(13, 2);
			ctx.quadraticCurveTo(14, 2, 14, 3);
			ctx.lineTo(14, 4);
			ctx.quadraticCurveTo(14, 5, 13, 5);
			ctx.lineTo(2, 5);
			ctx.quadraticCurveTo(1, 5, 1, 4);
			ctx.fillStyle = "#9b9b9b";
			ctx.closePath();
			ctx.fill();
			ctx.beginPath();
			ctx.moveTo(1, 8);
			ctx.quadraticCurveTo(1, 7, 2, 7);
			ctx.lineTo(13, 7);
			ctx.quadraticCurveTo(14, 7, 14, 8);
			ctx.lineTo(14, 9);
			ctx.quadraticCurveTo(14, 10, 13, 10);
			ctx.lineTo(2, 10);
			ctx.quadraticCurveTo(1, 10, 1, 9);
			ctx.fillStyle = "#9b9b9b";
			ctx.closePath();
			ctx.fill();
			ctx.beginPath();
			ctx.moveTo(1, 13);
			ctx.quadraticCurveTo(1, 12, 2, 12);
			ctx.lineTo(13, 12);
			ctx.quadraticCurveTo(14, 12, 14, 13);
			ctx.lineTo(14, 14);
			ctx.quadraticCurveTo(14, 15, 13, 15);
			ctx.lineTo(2, 15);
			ctx.quadraticCurveTo(1, 15, 1, 14);
			ctx.fillStyle = "#9b9b9b";
			ctx.closePath();
			ctx.fill();
			image = ctx.getImageData(0, 0, 15, 17);
			canvas.width = 15;
			canvas.height = 17;
			ctx.putImageData(image, 0, 0);
			images.src = canvas.toDataURL("image/png");
			images.style = this.style;
			this.$dialog.append(images);
		},
		drawPlus: function(){
			var canvas = document.createElement('canvas'),
				ctx = canvas.getContext('2d'),
				image,
				images = new Image();
			ctx.beginPath();
			ctx.moveTo(0, 6);
			ctx.quadraticCurveTo(0, 5, 1, 5);
			ctx.lineTo(4, 5);
			ctx.quadraticCurveTo(5, 5, 5, 4);
			ctx.lineTo(5, 1);
			ctx.quadraticCurveTo(5, 0, 6, 0);
			ctx.lineTo(7, 0);
			ctx.quadraticCurveTo(8, 0, 8, 1);
			ctx.lineTo(8, 4);
			ctx.quadraticCurveTo(8, 5, 9, 5);
			ctx.lineTo(12, 5);
			ctx.quadraticCurveTo(13, 5, 13, 6);
			ctx.lineTo(13, 7);
			ctx.quadraticCurveTo(13, 8, 12, 8);
			ctx.lineTo(9, 8);
			ctx.quadraticCurveTo(8, 8, 8, 9);
			ctx.lineTo(8, 12);
			ctx.quadraticCurveTo(8, 13, 7, 13);
			ctx.lineTo(6, 13);
			ctx.quadraticCurveTo(5, 13, 5, 12);
			ctx.lineTo(5, 9);
			ctx.quadraticCurveTo(5, 8, 4, 8);
			ctx.lineTo(1, 8);
			ctx.quadraticCurveTo(0, 8, 0, 7);
			ctx.fillStyle = "#9b9b9b";
			ctx.closePath();
			ctx.fill();
			image = ctx.getImageData(0, 0, 14, 14);
			canvas.width = 14;
			canvas.height = 14;
			ctx.putImageData(image, 0, 0);
			images.src = canvas.toDataURL("image/png");
			images.style = this.style;
			this.$dialog.append(images);
		},
		drawMinus: function(){
			var canvas = document.createElement('canvas'),
				ctx = canvas.getContext('2d'),
				image,
				images = new Image();
			ctx.beginPath();
			ctx.moveTo(0, 5);
			ctx.quadraticCurveTo(0, 4, 1, 4);
			ctx.lineTo(13, 4);
			ctx.quadraticCurveTo(14, 4, 14, 5);
			ctx.lineTo(14, 7);
			ctx.quadraticCurveTo(14, 8, 13, 8);
			ctx.lineTo(1, 8);
			ctx.quadraticCurveTo(0, 8, 0, 7);
			ctx.fillStyle = "#9b9b9b";
			ctx.closePath();
			ctx.fill();
			image = ctx.getImageData(0, 0, 14, 14);
			canvas.width = 14;
			canvas.height = 14;
			ctx.putImageData(image, 0, 0);
			images.src = canvas.toDataURL("image/png");
			images.style = this.style;
			this.$dialog.append(images);
		},
		drawOpen: function(){
			var canvas = document.createElement('canvas'),
				ctx = canvas.getContext('2d'),
				image,
				images = new Image();
			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.lineTo(6, 4);
			ctx.lineTo(0, 8);
			ctx.fillStyle = "#9b9b9b";
			ctx.closePath();
			ctx.fill();
			image = ctx.getImageData(0, 0, 8, 8);
			canvas.width = 8;
			canvas.height = 8;
			ctx.putImageData(image, 0, 0);
			images.src = canvas.toDataURL("image/png");
			images.style = this.style;
			this.$dialog.append(images);
		},
		drawClose: function(){
			var canvas = document.createElement('canvas'),
				ctx = canvas.getContext('2d'),
				image,
				images = new Image();
			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.lineTo(4, 6);
			ctx.lineTo(8, 0);
			ctx.fillStyle = "#9b9b9b";
			ctx.closePath();
			ctx.fill();
			image = ctx.getImageData(0, 0, 8, 8);
			canvas.width = 8;
			canvas.height = 8;
			ctx.putImageData(image, 0, 0);
			images.src = canvas.toDataURL("image/png");
			images.style = this.style;
			this.$dialog.append(images);
		}
	}
	//draw.init();

	if (!$.fn.hideCompute) {
		var show = 'display:block!important;',
			visib = {
				visibility: "hidden",
				position: "absolute",
				top: -9999
			};
		$.fn.hideCompute = function(type) {
			var result,
				arg = Array.prototype.slice.call(arguments, 1);
			this.each(function(i, n) {
				var el = $(this),
					elems,
					styles,
					elem,
					cloneEl;
				if (el.is(':hidden') && !$('body').is(':hidden')) {
					elems = el.parents(':hidden');
					if (elems.length > 0) {
						var id = this.id;
						this.id = 'hide_Compute_19910501';
						elem = elems.last();
						cloneEl = elem.clone();
						el = cloneEl.find('#' + this.id);
						id === '' ? this.removeAttribute('id') : this.setAttribute('id', id);
						el.parents(':hidden').each(function() {
							var styles = this.getAttribute('style') || '';
							this.setAttribute('style', styles + show);
						}).last().css(visib);
						elem.after(cloneEl);
					} else {
						cloneEl = el.clone();
						styles = cloneEl.attr('style') || '';
						cloneEl.attr('style', styles + show).css(visib);
						el.after(cloneEl);
						el = cloneEl;
					};
				};
				if (typeof el[type] === 'function') {
					result = el[type].apply(el, arg);
				} else {
					result = {
						width: el.width.apply(el, arg),
						height: el.height.apply(el, arg),
						outerWidth: el.outerWidth.apply(el, arg),
						outerHeight: el.outerHeight.apply(el, arg)
					}
				}
				if (cloneEl) cloneEl.remove();
				return false;
			});
			return result;
		};
	}
}($);
