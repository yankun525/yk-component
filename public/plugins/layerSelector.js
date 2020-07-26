var stree = require('swZtree');

var selector = {
    init: function(parents) {
        Object.keys(defaults).map(function(value) {
            $('[selector=' + value + ']', parents).layerSelector();
        });
    }
}

!window.layerSelectorManager && function(settings) {
    window.layerSelectorManager = settings;
}({
    index: 0,
    getId: function() {
        return 'ls_' + (1000 + this.index++);
    }
});

function getCache(name) {
    var data = main.localStorage.getItem(app.chkLogin.data.mobile),
        ret = null;
    data = $.parseJSON(data) || {};
    if (data[name] !== undefined) {
        ret = data[name];
    }
    return ret;
};

function setCache(name, value) {
    var mobile = app.chkLogin.data.mobile,
        data = main.localStorage.getItem(mobile);
    data = $.parseJSON(data) || {};
    data[name] = value;
    main.localStorage.setItem(mobile, JSON.stringify(data));
}

//回调函数后面传的值如果为true，即可以多选；如果没传或false，即单选
/*
 * format   辅助选择弹出框模板
 * url      表格路径
 * columns  表格行配置
 * data     初始化时传入的数据
 * callback 选择数据后回调
 */

var defaults = {
    /*辅助选择业务类型*/
    contrtype: {
        title: {
            'en': 'Business type selection',
            'zh-CN': '业务类型'
        },
        option: {
            async: {
                url: '/gpmc/businesstype/childtree?isenabled=1',
                autoParam: ['id=id'],
                enable: true,
                type: 'get'
            }
        },
        format: '<div class="tree-layer-scope">\
            <url id="{tree}" class="ztree check"></url>\
        </div>',
        helper: 'treeHelper'
    },
    /*辅助选择责任人单位*/
    multiinchargeunittype: {
        title: {
            'en': 'Business type selection',
            'zh-CN': '业务单位'
        },
        cache: [],
        option: {
            async: {
                url: "/auth/org/orgtree",
                autoParam: ['id=id'],
                enable: true,
                type: 'get'
            },
            data: {
                key: {
                    code: 'tenantorgid',
                    name: 'orgname'
                }
            }
        },
        format: '<div class="tree-layer-scope">\
            <url id="{tree}" class="ztree check"></url>\
        </div>',
        helper: 'treeSelectedHelper'
    },
    /*辅助选择业务单位*/
    multibusinessunittype: {
        title: {
            'en': 'Business type selection',
            'zh-CN': '业务单位'
        },
        cache: [],
        option: {
            async: {
                url: '/auth/org/orgtree',
                autoParam: ['id=id'],
                enable: true,
                type: 'get'
            },
            data: {
                key: {
                    code: 'tenantorgid',
                    name: 'orgname'
                }
            }
        },
        format: '<div class="tree-layer-scope">\
            <url id="{tree}" class="ztree check"></url>\
        </div>',
        helper: 'treeSelectedHelper'
    },
    /*辅助选择业务类型一级菜单*/
    onlyfirstcontrtype: {
        title: {
            'en': 'Business type selection',
            'zh-CN': '业务类型'
        },
        option: {
            async: {
                url: '/gpmc/businesstype/childtree?isenabled=1',
                autoParam: ['id=id'],
                enable: true,
                type: 'get',
                dataFilter: function(treeId, parentNode, res){
                    res = res.data;
                    res.map(function(item){
                        if (item.levels === 0) {
                            item.nocheck = true;
                        } else if (item.levels === 1) {
                            item.isParent = false;
                        }
                    });
                    return res;
                }
            }
        },
        format: '<div class="tree-layer-scope">\
            <url id="{tree}" class="ztree check"></url>\
        </div>',
        helper: 'treeHelper'
    },
    /*辅助选择业务类型*/
    multicontrtype: {
        title: {
            'en': 'Business type selection',
            'zh-CN': '业务类型'
        },
        cache: [],
        option: {
            async: {
                url: '/gpmc/businesstype/childtree?isenabled=1',
                autoParam: ['id=id'],
                enable: true,
                type: 'get'
            }
        },
        format: '<div class="tree-layer-scope">\
            <url id="{tree}" class="ztree check"></url>\
        </div>',
        helper: 'treeSelectedHelper'
    },
    /*辅助选择业务类型*/
    multiallcontrtype: {
        title: {
            'en': 'Business type selection',
            'zh-CN': '业务类型'
        },
        cache: [],
        option: function() {
            var that = this;
            return {
                async: {
                    url: '/gpmc/businesstype/childtree?isenabled=1',
                    autoParam: ['id=id'],
                    enable: true,
                    type: 'get',
                    dataFilter: function(treeId, parentNode, res) {
                        var cache = that.options.cache;
                        if (typeof cache === 'string') {
                            cache = $.parseJSON(cache);
                        }
                        if (!$.isArray(cache) || cache.length === 0) return res.data;
                        res.data.map(function(item) {
                            $.each(cache, function(i, v) {
                                if (item.id === v.id) {
                                    item.checked = true;
                                    return false;
                                }
                            });
                        });
                        return res.data;
                    }
                }
            }
        },
        format: '<div class="tree-layer-scope">\
            <url id="{tree}" class="ztree check"></url>\
        </div>',
        helper: 'treeSelectedHelper'
    },
    /*辅助选择业务类型*/
    singlecontrtype: {
        title: {
            'en': 'Business type selection',
            'zh-CN': '业务类型'
        },
        option: function(){
            return {
                url: "/gpmc/businesstype/childtree?isenabled=1",
                autoParam: ['id=id'],
                enable: true,
                type: 'get'
            }
        },
        format: '<div class="tree-layer-scope">\
            <url id="{tree}" class="ztree check"></url>\
        </div>',
        helper: 'singleOnlyLastSelectedTreeHelper'
    },
    /*辅助选择业务类型*/
    singlebpmcontrtype: {
        title: {
            'en': 'Business type selection',
            'zh-CN': '业务类型'
        },
        option: function(){
            return {
                url: "/gpmc/info/businesstype/childtree?isenabled=1&" + $.param(this.query),
                autoParam: ['id=id'],
                enable: true,
                type: 'get'
            }
        },
        format: '<div class="tree-layer-scope">\
            <url id="{tree}" class="ztree check"></url>\
        </div>',
        helper: 'singleOnlyLastSelectedTreeHelper'
    },
    /*辅助选择币种*/
    currency: {
        title: {
            'en': 'Currency selection',
            'zh-CN': '币种'
        },
        option: function(){
            return {
                url: '/gpmc/currency/list',
                showModel: false,
                model: [{
                    header: 'checkbox',
                    type: 'checkbox'
                }, {
                    header: i18next.t('ba.currencylist.code'),
                    field: 'code',
                    width: 250
                }, {
                    header: i18next.t('ba.currencylist.name'),
                    field: 'name',
                    width: 300
                }]
            }
        },
        format: '<form class="app-form sm ipt-sm" id="{form}">\
            <div class="form-wrap">\
                <label data-i18n="ba.currency"></label>\
                <input name="name" class="form-control" />\
                <input type="text" class="hide" />\
                <button type="button" class="btn btn-primary m-l-15" id="{submit}">\
                    <i class="ion ion-search"></i>\
                    <span data-i18n="button.search"></span>\
                </button>\
            </div>\
        </form>\
        <div id="{table}"></div>'
    },
    /*辅助选择币种*/
    singlecurrency: {
        title: {
            'en': 'Currency selection',
            'zh-CN': '币种'
        },
        option: function(){
            return {
                url: '/gpmc/currency/list',
                showModel: false,
                singleSelect: true,
                model: [{
                    type: 'checkbox'
                }, {
                    header: i18next.t('ba.currencylist.code'),
                    field: 'code',
                    width: 250
                }, {
                    header: i18next.t('ba.currencylist.name'),
                    field: 'name',
                    width: 300
                }]
            }
        },
        format: '<form class="app-form sm ipt-sm" id="{form}">\
            <div class="form-wrap">\
                <label data-i18n="ba.currency"></label>\
                <input name="name" class="form-control" />\
                <input type="text" class="hide" />\
                <button type="button" class="btn btn-primary m-l-15" id="{submit}">\
                    <i class="ion ion-search"></i>\
                    <span data-i18n="button.search"></span>\
                </button>\
            </div>\
        </form>\
        <div id="{table}"></div>'
    },
    /*辅助选择币种*/
    singlebpmcurrency: {
        title: {
            'en': 'Currency selection',
            'zh-CN': '币种'
        },
        option: function(){
            return {
                url: '/gpmc/info/currency/list',
                showModel: false,
                singleSelect: true,
                model: [{
                    type: 'checkbox'
                }, {
                    header: i18next.t('ba.currencylist.code'),
                    field: 'code',
                    width: 250
                }, {
                    header: i18next.t('ba.currencylist.name'),
                    field: 'name',
                    width: 300
                }]
            }
        },
        format: '<form class="app-form sm ipt-sm" id="{form}">\
            <div class="form-wrap">\
                <label data-i18n="ba.currency"></label>\
                <input name="name" class="form-control" />\
                <input type="text" class="hide" />\
                <button type="button" class="btn btn-primary m-l-15" id="{submit}">\
                    <i class="ion ion-search"></i>\
                    <span data-i18n="button.search"></span>\
                </button>\
            </div>\
        </form>\
        <div id="{table}"></div>'
    },
    /*辅助选择合同来源*/
    contrsource: {
        title: {
            'en': 'Contract source selection',
            'zh-CN': '合同来源'
        },
        option: function(){
            return {
                url: '/gpmc/contract/selectsource',
                showModel: false,
                model: [{
                    header: 'checkbox',
                    type: 'checkbox'
                }, {
                    header: i18next.t('contr.code'),
                    field: 'billcode',
                    width: 250
                }, {
                    header: i18next.t('contr.name'),
                    field: 'contractname',
                    width: 300
                }]
            }
        },
        format: '<form class="app-form sm ipt-sm" id="{form}">\
            <div class="form-wrap">\
                <label data-i18n="contr.name"></label>\
                <input name="contractname" class="form-control" />\
                <input type="text" class="hide" />\
                <button type="button" class="btn btn-primary m-l-15" id="{submit}">\
                    <i class="ion ion-search"></i>\
                    <span data-i18n="button.search"></span>\
                </button>\
            </div>\
        </form>\
        <div id="{table}"></div>'
    },
    /*辅助选择合同来源*/
    singlecontrsource: {
        title: {
            'en': 'Contract source selection',
            'zh-CN': '合同来源'
        },
        option: function() {
            return {
                url: '/gpmc/contract/selectsource',
                showModel: false,
                singleSelect: true,
                reload: false,
                height: 300,
                model: [{
                    type: 'checkbox'
                }, {
                    header: i18next.t('contr.code'),
                    field: 'billcode',
                    width: 250
                }, {
                    header: i18next.t('contr.name'),
                    field: 'contractname',
                    width: 300
                }]
            }
        },
        format: '<form class="app-form sm ipt-sm" id="{form}">\
            <div class="form-wrap m-b-5">\
                <label data-i18n="contr.code"></label>\
                <input name="billcode" class="form-control" />\
                <label data-i18n="contr.name"></label>\
                <input name="contractname" class="form-control" />\
                <input type="text" class="hide" />\
                <button type="button" class="btn btn-primary m-l-15" id="{submit}">\
                    <i class="ion ion-search"></i>\
                    <span data-i18n="button.search"></span>\
                </button>\
            </div>\
        </form>\
        <div class="text-danger m-b-10" data-i18n="contr.contrwarn"></div>\
        <div id="{table}"></div>'
    },
    /*辅助选择合同来源*/
    singlebpmcontrsource: {
        title: {
            'en': 'Contract source selection',
            'zh-CN': '合同来源'
        },
        option: function(){
            return {
                url: '/gpmc/info/contract/selectsource',
                showModel: false,
                singleSelect: true,
                model: [{
                    type: 'checkbox'
                }, {
                    header: i18next.t('contr.code'),
                    field: 'billcode',
                    width: 250
                }, {
                    header: i18next.t('contr.name'),
                    field: 'contractname',
                    width: 300
                }]
            }
        },
        format: '<form class="app-form sm ipt-sm" id="{form}">\
            <input type="hidden" name="appcode" value="{query.appcode}">\
            <input type="hidden" name="timestamp" value="{query.timestamp}"/>\
            <input type="hidden" name="rannum" value="{query.rannum}"/>\
            <input type="hidden" name="signature" value="{query.signature}"/>\
            <div class="form-wrap">\
                <label data-i18n="contr.name"></label>\
                <input name="contractname" class="form-control" />\
                <input type="text" class="hide" />\
                <button type="button" class="btn btn-primary m-l-15" id="{submit}">\
                    <i class="ion ion-search"></i>\
                    <span data-i18n="button.search"></span>\
                </button>\
            </div>\
        </form>\
        <div id="{table}"></div>'
    },
    /*辅助选择合同*/
    singlecontract:{
        title: {
            'en': 'Contract selection',
            'zh-CN': '合同选择'
        },
        option: function(){
            return {
                url: '/gpmc/contract/page?checkstatus=3',
                showModel: false,
                singleSelect: true,
                model: [{
                    type: 'checkbox'
                }, {
                    header: i18next.t('contr.code'),
                    field: 'billcode',
                    width: 250
                }, {
                    header: i18next.t('contr.name'),
                    field: 'contractname',
                    width: 300
                }]
            }
        },
        format: '<form class="app-form sm ipt-sm" id="{form}">\
            <div class="form-wrap">\
                <label data-i18n="contr.code"></label>\
                <input name="billcode" class="form-control" />\
                <label data-i18n="contr.name"></label>\
                <input name="contractname" class="form-control" />\
                <button type="button" class="btn btn-primary m-l-15" id="{submit}">\
                    <i class="ion ion-search"></i>\
                    <span data-i18n="button.search"></span>\
                </button>\
            </div>\
        </form>\
        <div id="{table}"></div>'
    },
    /* 辅助选择招标项目 */
    singlebidproject: {
        title: {
            'en': 'Bid Project',
            'zh-CN': '招标项目'
        },
        option: function() {
            return {
                url: '/gpmc/bid/project/list',
                showPageData: false,
                showPaginaData: false,
                showModel: false,
                singleSelect: true,
                model: [{
                    type: 'checkbox'
                }, {
                    header: i18next.t('common.projectcode'),
                    field: 'projectcode',
                    width: 90
                }, {
                    header: i18next.t('common.projectname'),
                    field: 'projectname',
                    width: 160
                }, {
                    header: i18next.t('bid.categorychild'),
                    field: 'businesstype',
                    width: 130,
                    format: '{value.businesstypename}'
                }, {
                    header: i18next.t('contr.openclose'),
                    field: 'isopen',
                    width: 70,
                    format: function(value, row, index) {
                        return select.getText('ifopen', value);
                    }
                }, {
                    header: i18next.t('bid.requireorgname'),
                    field: 'requireorgname',
                    width: 120
                }]
            }
        },
        format: '<form class="app-form ipt-sm" id="{form}">\
            <div class="form-wrap">\
                <label data-i18n="bid.code"></label>\
                <input class="form-control" name="projectcode" />\
                <label data-i18n="bid.name"></label>\
                <input class="form-control" name="projectname" />\
                <button type="button" class="btn btn-primary m-l-15" id="{submit}">\
                    <i class="ion ion-search"></i>\
                    <span data-i18n="button.search"></span>\
                </button>\
            </div>\
        </form>\
        <div id="{table}"></div>'
    },
    /*辅助选择我方公司*/
    mycompany: {
        title: {
            'en': 'My company selection',
            'zh-CN': '我方公司'
        },
        option: function(){
            return {
                url: '/gpmc/contract/selectcompany',
                showModel: false,
                model: [{
                    header: 'checkbox',
                    type: 'checkbox'
                }, {
                    header: i18next.t('ba.counterpart.compcode'),
                    field: 'companycode',
                    width: 250
                }, {
                    header: i18next.t('ba.counterpart.compname'),
                    field: 'companyname',
                    width: 300
                }]
            }
        },
        format: '<form class="app-form sm ipt-sm" id="{form}">\
            <div class="form-wrap">\
                <label data-i18n="ba.counterpart.compcode"></label>\
                <input name="companycode" class="form-control" />\
                <label data-i18n="ba.counterpart.compname"></label>\
                <input name="companyname" class="form-control" />\
                <button type="button" class="btn btn-primary m-l-15" id="{submit}">\
                    <i class="ion ion-search"></i>\
                    <span data-i18n="button.search"></span>\
                </button>\
            </div>\
        </form>\
        <div id="{table}"></div>'
    },
    /*辅助选择我方公司*/
    singlemycompany: {
        title: {
            'en': 'My company selection',
            'zh-CN': '我方公司'
        },
        option: function(){
            return {
                url: '/gpmc/contract/selectcompany',
                showModel: false,
                singleSelect: true,
                model: [{
                    type: 'checkbox'
                }, {
                    header: i18next.t('ba.counterpart.compcode'),
                    field: 'companycode',
                    width: 250
                }, {
                    header: i18next.t('ba.counterpart.compname'),
                    field: 'companyname',
                    width: 300
                }]
            }
        },
        format: '<form class="app-form sm ipt-sm" id="{form}">\
            <div class="form-wrap">\
                <label data-i18n="ba.counterpart.compcode"></label>\
                <input name="companycode" class="form-control" />\
                <label data-i18n="ba.counterpart.compname"></label>\
                <input name="companyname" class="form-control" />\
                <button type="button" class="btn btn-primary m-l-15" id="{submit}">\
                    <i class="ion ion-search"></i>\
                    <span data-i18n="button.search"></span>\
                </button>\
            </div>\
        </form>\
        <div id="{table}"></div>'
    },
    /*辅助选择我方公司*/
    multimycompany: {
        title: {
            'en': 'My company selection',
            'zh-CN': '我方公司'
        },
        filter: function(item, data){
            return item.companyid === data.companyid;
        },
        cache: [],
        option: function(){
            return {
                url: '/gpmc/contract/selectcompany',
                showModel: false,
                nocheckEnabled: true,
                model: [{
                    header: 'checkbox',
                    type: 'checkbox'
                }, {
                    header: i18next.t('ba.counterpart.compcode'),
                    field: 'companycode',
                    width: 160
                }, {
                    header: i18next.t('ba.counterpart.compname'),
                    field: 'companyname',
                    width: 210
                }]
            }
        },
        sltoption: function(){
            return {
                showModel: false,
                showPageData: false,
                showPaginaData: false,
                nocheckEnabled: true,
                model: [{
                    header: 'checkbox',
                    type: 'checkbox'
                }, {
                    header: i18next.t('ba.counterpart.compcode'),
                    field: 'companycode',
                    width: 160
                }, {
                    header: i18next.t('ba.counterpart.compname'),
                    field: 'companyname',
                    width: 210
                }]
            }
        },
        format: '<form class="app-form sm ipt-sm" id="{form}">\
            <div class="form-wrap">\
                <label data-i18n="ba.counterpart.compcode"></label>\
                <input name="companycode" class="form-control" />\
                <label data-i18n="ba.counterpart.compname"></label>\
                <input name="companyname" class="form-control" />\
                <button type="button" class="btn btn-primary m-l-15" id="{submit}">\
                    <i class="ion ion-search"></i>\
                    <span data-i18n="button.search"></span>\
                </button>\
            </div>\
        </form>\
        <div class="row">\
            <div class="col-md-6">\
                <div id="{table}"></div>\
            </div>\
            <div class="col-md-6">\
                <div id="{slttable}"></div>\
            </div>\
        </div>',
        helper: 'multiTable'
    },
    /*辅助选择我方公司*/
    singlebpmmycompany: {
        title: {
            'en': 'My company selection',
            'zh-CN': '我方公司'
        },
        option: function(){
            return {
                url: '/gpmc/info/contract/selectcompany',
                showModel: false,
                singleSelect: true,
                model: [{
                    type: 'checkbox'
                }, {
                    header: i18next.t('ba.counterpart.compcode'),
                    field: 'companycode',
                    width: 250
                }, {
                    header: i18next.t('ba.counterpart.compname'),
                    field: 'companyname',
                    width: 300
                }]
            }
        },
        format: '<form class="app-form sm ipt-sm" id="{form}">\
            <input type="hidden" name="timestamp" value="{query.timestamp}"/>\
            <input type="hidden" name="appcode" value="{query.appcode}">\
            <input type="hidden" name="rannum" value="{query.rannum}">\
            <input type="hidden" name="signature" value="{query.signature}">\
            <div class="form-wrap">\
                <label data-i18n="ba.counterpart.compcode"></label>\
                <input name="companycode" class="form-control" />\
                <label data-i18n="ba.counterpart.compname"></label>\
                <input name="companyname" class="form-control" />\
                <button type="button" class="btn btn-primary m-l-15" id="{submit}">\
                    <i class="ion ion-search"></i>\
                    <span data-i18n="button.search"></span>\
                </button>\
            </div>\
        </form>\
        <div id="{table}"></div>'
    },
    /*辅助选择我方公司*/
    multibpmmycompany: {
        title: {
            'en': 'My company selection',
            'zh-CN': '我方公司'
        },
        filter: function(item, data){
            return item.companyid === data.companyid;
        },
        cache: [],
        option: function(){
            return {
                url: '/gpmc/info/contract/selectcompany',
                showModel: false,
                nocheckEnabled: true,
                model: [{
                    header: 'checkbox',
                    type: 'checkbox'
                }, {
                    header: i18next.t('ba.counterpart.compcode'),
                    field: 'companycode',
                    width: 160
                }, {
                    header: i18next.t('ba.counterpart.compname'),
                    field: 'companyname',
                    width: 210
                }]
            }
        },
        sltoption: function(){
            return {
                showModel: false,
                showPageData: false,
                showPaginaData: false,
                nocheckEnabled: true,
                model: [{
                    header: 'checkbox',
                    type: 'checkbox'
                }, {
                    header: i18next.t('ba.counterpart.compcode'),
                    field: 'companycode',
                    width: 160
                }, {
                    header: i18next.t('ba.counterpart.compname'),
                    field: 'companyname',
                    width: 210
                }]
            }
        },
        format: '<form class="app-form sm ipt-sm" id="{form}">\
            <div class="form-wrap">\
                <label data-i18n="ba.counterpart.compcode"></label>\
                <input name="companycode" class="form-control" />\
                <label data-i18n="ba.counterpart.compname"></label>\
                <input name="companyname" class="form-control" />\
                <button type="button" class="btn btn-primary m-l-15" id="{submit}">\
                    <i class="ion ion-search"></i>\
                    <span data-i18n="button.search"></span>\
                </button>\
            </div>\
        </form>\
        <div class="row">\
            <div class="col-md-6">\
                <div id="{table}"></div>\
            </div>\
            <div class="col-md-6">\
                <div id="{slttable}"></div>\
            </div>\
        </div>',
        helper: 'multiTable'
    },
    /*辅助选择全部公司*/
    othercompany: {
        title: {
            'en': 'Other company selection',
            'zh-CN': '对方公司'
        },
        option: function() {
            return {
                url: '/gpmc/contract/selectcustomer',
                showModel: false,
                model: [{
                    header: 'checkbox',
                    type: 'checkbox'
                }, {
                    header: i18next.t('ba.counterpart.compcode'),
                    field: 'companycode',
                    width: 250
                }, {
                    header: i18next.t('ba.counterpart.compname'),
                    field: 'companyname',
                    width: 300
                }]
            }
        },
        format: '<form class="app-form sm ipt-sm" id="{form}">\
            <div class="form-wrap">\
                <label data-i18n="ba.counterpart.compcode"></label>\
                <input name="companycode" class="form-control" />\
                <label data-i18n="ba.counterpart.compname"></label>\
                <input name="companyname" class="form-control" />\
                <button type="button" class="btn btn-primary m-l-15" id="{submit}">\
                    <i class="ion ion-search"></i>\
                    <span data-i18n="button.search"></span>\
                </button>\
            </div>\
        </form>\
        <div id="{table}"></div>'
    },
    /*辅助选择全部公司*/
    multiothercompany: {
        title: {
            'en': 'Other company selection',
            'zh-CN': '对方公司'
        },
        filter: function(item, data) {
            return item.companyid === data.companyid;
        },
        cache: [],
        option: function() {
            return {
                url: '/gpmc/contract/selectcustomer',
                showModel: false,
                nocheckEnabled: true,
                model: [{
                    header: 'checkbox',
                    type: 'checkbox'
                }, {
                    header: i18next.t('ba.counterpart.compcode'),
                    field: 'companycode',
                    width: 160
                }, {
                    header: i18next.t('ba.counterpart.compname'),
                    field: 'companyname',
                    width: 210
                }]
            }
        },
        sltoption: function() {
            return {
                showModel: false,
                showPageData: false,
                showPaginaData: false,
                nocheckEnabled: true,
                model: [{
                    header: 'checkbox',
                    type: 'checkbox'
                }, {
                    header: i18next.t('ba.counterpart.compcode'),
                    field: 'companycode',
                    width: 160
                }, {
                    header: i18next.t('ba.counterpart.compname'),
                    field: 'companyname',
                    width: 210
                }]
            }
        },
        format: '<form class="app-form sm ipt-sm" id="{form}">\
            <div class="form-wrap">\
                <label data-i18n="ba.counterpart.compcode"></label>\
                <input name="companycode" class="form-control" />\
                <label data-i18n="ba.counterpart.compname"></label>\
                <input name="companyname" class="form-control" />\
                <button type="button" class="btn btn-primary m-l-15" id="{submit}">\
                    <i class="ion ion-search"></i>\
                    <span data-i18n="button.search"></span>\
                </button>\
            </div>\
        </form>\
        <div class="row">\
            <div class="col-md-6">\
                <div id="{table}"></div>\
            </div>\
            <div class="col-md-6">\
                <div id="{slttable}"></div>\
            </div>\
        </div>',
        helper: 'multiTable'
    },
    /*辅助选择全部公司*/
    otherbpmcompany: {
        title: {
            'en': 'Other company selection',
            'zh-CN': '对方公司'
        },
        option: function() {
            return {
                url: '/gpmc/info/contract/selectcustomer',
                showModel: false,
                model: [{
                    header: 'checkbox',
                    type: 'checkbox'
                }, {
                    header: i18next.t('ba.counterpart.compcode'),
                    field: 'companycode',
                    width: 250
                }, {
                    header: i18next.t('ba.counterpart.compname'),
                    field: 'companyname',
                    width: 300
                }]
            }
        },
        format: '<form class="app-form sm ipt-sm" id="{form}">\
            <div class="form-wrap">\
                <label data-i18n="ba.counterpart.compcode"></label>\
                <input name="companycode" class="form-control" />\
                <label data-i18n="ba.counterpart.compname"></label>\
                <input name="companyname" class="form-control" />\
                <button type="button" class="btn btn-primary m-l-15" id="{submit}">\
                    <i class="ion ion-search"></i>\
                    <span data-i18n="button.search"></span>\
                </button>\
            </div>\
        </form>\
        <div id="{table}"></div>'
    },
    /*辅助选择全部公司*/
    multibpmothercompany: {
        title: {
            'en': 'Other company selection',
            'zh-CN': '对方公司'
        },
        filter: function(item, data) {
            return item.companyid === data.companyid;
        },
        cache: [],
        option: function() {
            return {
                url: '/gpmc/info/contract/selectcustomer',
                showModel: false,
                nocheckEnabled: true,
                model: [{
                    header: 'checkbox',
                    type: 'checkbox'
                }, {
                    header: i18next.t('ba.counterpart.compcode'),
                    field: 'companycode',
                    width: 160
                }, {
                    header: i18next.t('ba.counterpart.compname'),
                    field: 'companyname',
                    width: 210
                }]
            }
        },
        sltoption: function() {
            return {
                showModel: false,
                showPageData: false,
                showPaginaData: false,
                nocheckEnabled: true,
                model: [{
                    header: 'checkbox',
                    type: 'checkbox'
                }, {
                    header: i18next.t('ba.counterpart.compcode'),
                    field: 'companycode',
                    width: 160
                }, {
                    header: i18next.t('ba.counterpart.compname'),
                    field: 'companyname',
                    width: 210
                }]
            }
        },
        format: '<form class="app-form sm ipt-sm" id="{form}">\
            <div class="form-wrap">\
                <label data-i18n="ba.counterpart.compcode"></label>\
                <input name="companycode" class="form-control" />\
                <label data-i18n="ba.counterpart.compname"></label>\
                <input name="companyname" class="form-control" />\
                <button type="button" class="btn btn-primary m-l-15" id="{submit}">\
                    <i class="ion ion-search"></i>\
                    <span data-i18n="button.search"></span>\
                </button>\
            </div>\
        </form>\
        <div class="row">\
            <div class="col-md-6">\
                <div id="{table}"></div>\
            </div>\
            <div class="col-md-6">\
                <div id="{slttable}"></div>\
            </div>\
        </div>',
        helper: 'multiTable'
    },
    /*辅助选择全部公司*/
    singleothercompany: {
        title: {
            'en': 'Other company selection',
            'zh-CN': '对方公司'
        },
        option: function() {
            return {
                url: '/gpmc/contract/selectcustomer',
                showModel: false,
                singleSelect: true,
                model: [{
                    type: 'checkbox'
                }, {
                    header: i18next.t('ba.counterpart.compcode'),
                    field: 'companycode',
                    width: 250
                }, {
                    header: i18next.t('ba.counterpart.compname'),
                    field: 'companyname',
                    width: 300
                }]
            }
        },
        format: '<form class="app-form sm ipt-sm" id="{form}">\
            <div class="form-wrap">\
                <label data-i18n="ba.counterpart.compcode"></label>\
                <input name="companycode" class="form-control" />\
                <label data-i18n="ba.counterpart.compname"></label>\
                <input name="companyname" class="form-control" />\
                <button type="button" class="btn btn-primary m-l-15" id="{submit}">\
                    <i class="ion ion-search"></i>\
                    <span data-i18n="button.search"></span>\
                </button>\
            </div>\
        </form>\
        <div id="{table}"></div>'
    },
    /*辅助选择全部公司*/
    singleotherbpmcompany: {
        title: {
            'en': 'Other company selection',
            'zh-CN': '对方公司'
        },
        option: function() {
            return {
                url: '/gpmc/info/contract/selectcustomer',
                showModel: false,
                model: [{
                    header: 'checkbox',
                    type: 'checkbox'
                }, {
                    header: i18next.t('ba.counterpart.compcode'),
                    field: 'companycode',
                    width: 250
                }, {
                    header: i18next.t('ba.counterpart.compname'),
                    field: 'companyname',
                    width: 300
                }]
            }
        },
        format: '<form class="app-form sm ipt-sm" id="{form}">\
            <div class="form-wrap">\
                <label data-i18n="ba.counterpart.compcode"></label>\
                <input name="companycode" class="form-control" />\
                <label data-i18n="ba.counterpart.compname"></label>\
                <input name="companyname" class="form-control" />\
                <button type="button" class="btn btn-primary m-l-15" id="{submit}">\
                    <i class="ion ion-search"></i>\
                    <span data-i18n="button.search"></span>\
                </button>\
            </div>\
        </form>\
        <div id="{table}"></div>'
    },
    /*辅助选择全部公司*/
    singleCustomer: {
        title: {
            'en': 'Other company selection',
            'zh-CN': '对方公司'
        },
        option: function() {
            return {
                url: '/gpmc/customer/list',
                showModel: false,
                single: true,
                model: [{
                    header: 'checkbox',
                    type: 'checkbox'
                }, {
                    header: i18next.t('ba.counterpart.compcode'),
                    field: 'code',
                    width: 250
                }, {
                    header: i18next.t('ba.counterpart.compname'),
                    field: 'name',
                    width: 300
                }]
            }
        },
        format: '<form class="app-form sm ipt-sm" id="{form}">\
            <div class="form-wrap">\
                <label data-i18n="ba.counterpart.compcode"></label>\
                <input name="code" class="form-control" />\
                <label data-i18n="ba.counterpart.compname"></label>\
                <input name="name" class="form-control" />\
                <button type="button" class="btn btn-primary m-l-15" id="{submit}">\
                    <i class="ion ion-search"></i>\
                    <span data-i18n="button.search"></span>\
                </button>\
            </div>\
        </form>\
        <div id="{table}"></div>'
    },
    /*辅助选择管理单位*/
    singleorg: {
        title: {
            'en': 'Organization selection',
            'zh-CN': '管理单位'
        },
        option: function() {
            return {
                url: '/auth/org/page?iscompany=1',
                showModel: false,
                singleSelect: true,
                model: [{
                    type: 'checkbox'
                }, {
                    header: i18next.t('ba.org.code'),
                    field: 'tenantorgid',
                    width: 190
                }, {
                    header: i18next.t('ba.org.name'),
                    field: 'orgname',
                    width: 360
                }]
            }
        },
        format: '<form class="app-form ipt-sm" id="{form}">\
            <div class="form-wrap">\
                <label data-i18n="ba.org.name"></label>\
                <input name="orgname" class="form-control" />\
                <input type="text" class="hide" />\
                <button type="button" class="btn btn-primary m-l-15" id="{submit}">\
                    <i class="ion ion-search"></i>\
                    <span data-i18n="button.search"></span>\
                </button>\
            </div>\
        </form>\
        <div id="{table}"></div>'
    },
    /*辅助选择管理单位*/
    singlebpmorg: {
        title: {
            'en': 'Organization selection',
            'zh-CN': '管理单位'
        },
        option: function() {
            return {
                url: '/gpmc/info/org/page?iscompany=1',
                showModel: false,
                singleSelect: true,
                model: [{
                    type: 'checkbox'
                }, {
                    header: i18next.t('ba.org.code'),
                    field: 'tenantorgid',
                    width: 190
                }, {
                    header: i18next.t('ba.org.name'),
                    field: 'orgname',
                    width: 360
                }]
            }
        },
        format: '<form class="app-form ipt-sm" id="{form}">\
            <input type="hidden" name="timestamp" value="{query.timestamp}"/>\
            <input type="hidden" name="appcode" value="{query.appcode}">\
            <input type="hidden" name="rannum" value="{query.rannum}">\
            <input type="hidden" name="signature" value="{query.signature}">\
            <div class="form-wrap">\
                <label data-i18n="ba.org.name"></label>\
                <input name="orgname" class="form-control" />\
                <input type="text" class="hide" />\
                <button type="button" class="btn btn-primary m-l-15" id="{submit}">\
                    <i class="ion ion-search"></i>\
                    <span data-i18n="button.search"></span>\
                </button>\
            </div>\
        </form>\
        <div id="{table}"></div>'
    },
    /*辅助选择管理单位*/
    multiorg: {
        title: {
            'en': 'Organization selection',
            'zh-CN': '管理单位'
        },
        filter: function(item, data) {
            return item.orgid === data.orgid;
        },
        cache: [],
        option: function() {
            return {
                url: '/auth/org/page?iscompany=1',
                showModel: false,
                nocheckEnabled: true,
                model:  [{
                    type: 'checkbox'
                }, {
                    header: i18next.t('ba.org.code'),
                    field: 'tenantorgid',
                    width: 100
                }, {
                    header: i18next.t('ba.org.name'),
                    field: 'orgname',
                    width: 250
                }]
            }
        },
        sltoption: function() {
            return {
                showModel: false,
                showPageData: false,
                showPaginaData: false,
                nocheckEnabled: true,
                model: [{
                    type: 'checkbox'
                }, {
                    header: i18next.t('ba.org.code'),
                    field: 'tenantorgid',
                    width: 100
                }, {
                    header: i18next.t('ba.org.name'),
                    field: 'orgname',
                    width: 250
                }]
            }
        },
        format: '<form class="app-form sm ipt-sm" id="{form}">\
            <div class="form-wrap">\
                <label data-i18n="ba.org.name"></label>\
                <input name="orgname" class="form-control" />\
                <input type="text" class="hide" />\
                <button type="button" class="btn btn-primary m-l-15" id="{submit}">\
                    <i class="ion ion-search"></i>\
                    <span data-i18n="button.search"></span>\
                </button>\
            </div>\
        </form>\
        <div class="row">\
            <div class="col-md-6">\
                <div id="{table}"></div>\
            </div>\
            <div class="col-md-6">\
                <div id="{slttable}"></div>\
            </div>\
        </div>',
        helper: 'multiTable'
    },
    /*辅助选择管理部门*/
    singleorgdept: {
        title: {
            'en': 'Department selection',
            'zh-CN': '管理部门辅助选择'
        },
        option: function() {
            return {
                async: {
                    url: "/auth/org/deptpage",
                    autoParam: ['id=id'],
                    enable: true,
                    type: 'get',
                    dataFilter: function(treeId, parentNode, result){
                        return result.data;
                    }
                },
                data: {
                    key: {
                        children: 'sunList',
                        name: 'orgname'
                    }
                }
            }
        },
        format: '<div class="tree-layer-scope">\
            <url id="{tree}" class="ztree check"></url>\
        </div>',
        helper: 'singleTree'
    },
    /*辅助选择管理部门*/
    singlebpmorgdept: {
        title: {
            'en': 'Department selection',
            'zh-CN': '管理部门辅助选择'
        },
        option: function() {
            return {
                async: {
                    url: '/gpmc/info/org/deptpage',
                    autoParam: ['id=id'],
                    enable: true,
                    type: 'get',
                    dataFilter: function(treeId, parentNode, res) {
                        return res.data;
                    }
                },
                data: {
                    key: {
                        children: 'sunList',
                        name: 'orgname'
                    }
                }
            }
        },
        format: '<div class="tree-layer-scope">\
            <url id="{tree}" class="ztree check"></url>\
        </div>',
        helper: 'singleTree'
    },
    /*辅助选择用户类型*/
    singleusertype: {
        title: {
            'en': 'UserType selection',
            'zh-CN': '用户类型'
        },
        option: function() {
            return {
                url: '/auth/usertype/list?isenabled=1',
                showModel: false,
                singleSelect: true,
                model: [{
                    type: 'checkbox'
                },  {
                    header:i18next.t('system.usertype.code'),
                    field: 'usertypecode',
                    width: 100,
                },{
                    header:i18next.t('system.usertype.name'),
                    field: 'usertypename',
                    width: 250,
                }]
            }
        },
        format: '<form class="app-form sm ipt-sm" id="{form}">\
            <div class="form-wrap">\
                <label data-i18n="system.usertype.code"></label>\
                <input name="usertypecode" class="form-control" />\
                <label data-i18n="system.usertype.name"></label>\
                <input name="usertypename" class="form-control" /> \
                <button type="button" class="btn btn-primary m-l-15" id="{submit}">\
                    <i class="ion ion-search"></i>\
                    <span data-i18n="button.search"></span>\
                </button>\
            </div>\
        </form>\
        <div id="{table}"></div>'
    },
    /*辅助选择用户类型*/
    multiusertype: {
        title: {
            'en': 'UserType selection',
            'zh-CN': '用户类型'
        },
        filter: function(item, data) {
            return item.usertypeid === data.usertypeid;
        },
        cache: [],
        option: function() {
            return {
                url: '/auth/usertype/list?isenabled=1',
                showModel: false,
                nocheckEnabled: true,
                model:  [{
                    type: 'checkbox'
                },  {
                    header:i18next.t('system.usertype.code'),
                    field: 'usertypecode',
                    width: 100,
                },{
                    header:i18next.t('system.usertype.name'),
                    field: 'usertypename',
                    width: 250,
                }]
            }
        },
        sltoption: function() {
            return {
                showModel: false,
                showPageData: false,
                showPaginaData: false,
                nocheckEnabled: true,
                model: [{
                    type: 'checkbox'
                },  {
                    header:i18next.t('system.usertype.code'),
                    field: 'usertypecode',
                    width: 100,
                },{
                    header:i18next.t('system.usertype.name'),
                    field: 'usertypename',
                    width: 250,
                }]
            }
        },
        format: '<form class="app-form sm ipt-sm" id="{form}">\
            <div class="form-wrap">\
                <label data-i18n="system.usertype.code"></label>\
                <input name="usertypecode" class="form-control" />\
                <label data-i18n="system.usertype.name"></label>\
                <input name="usertypename" class="form-control" />\
                <button type="button" class="btn btn-primary m-l-15" id="{submit}">\
                    <i class="ion ion-search"></i>\
                    <span data-i18n="button.search"></span>\
                </button>\
            </div>\
        </form>\
        <div class="row">\
            <div class="col-md-6">\
                <div id="{table}"></div>\
            </div>\
            <div class="col-md-6">\
                <div id="{slttable}"></div>\
            </div>\
        </div>',
        helper: 'multiTable'
    },
    /*辅助选择角色*/
    singlerole: {
        title: {
            'en': 'Role',
            'zh-CN': '角色'
        },
        option: function() {
            return {
                url: '/auth/role/list?isenabled=1',
                showModel: false,
                singleSelect: true,
                model: [{
                    type: 'checkbox'
                },  {
                    header:i18next.t('system.role.code'),
                    field: 'rolecode',
                    width: 100,
                },{
                    header:i18next.t('system.role.name'),
                    field: 'rolename',
                    width: 250,
                }]
            }
        },
        format: '<form class="app-form sm ipt-sm" id="{form}">\
            <div class="form-wrap">\
                <label data-i18n="system.role.code"></label>\
                <input name="rolecode" class="form-control" />\
                <label data-i18n="system.role.name"></label>\
                <input name="rolename" class="form-control" /> \
                <button type="button" class="btn btn-primary m-l-15" id="{submit}">\
                    <i class="ion ion-search"></i>\
                    <span data-i18n="button.search"></span>\
                </button>\
            </div>\
        </form>\
        <div id="{table}"></div>'
    },
    /*辅助选择角色*/
    multirole: {
        title: {
            'en': 'Role',
            'zh-CN': '角色'
        },
        filter: function(item, data) {
            return item.roleid === data.roleid;
        },
        cache: [],
        option: function() {
            return {
                url: '/auth/role/list?isenabled=1',
                showModel: false,
                nocheckEnabled: true,
                model:  [{
                    type: 'checkbox'
                },  {
                    header:i18next.t('system.role.code'),
                    field: 'rolecode',
                    width: 100,
                },{
                    header:i18next.t('system.role.name'),
                    field: 'rolename',
                    width: 250,
                }]
            }
        },
        sltoption: function() {
            return {
                showModel: false,
                showPageData: false,
                showPaginaData: false,
                nocheckEnabled: true,
                model:[{
                    type: 'checkbox'
                },  {
                    header:i18next.t('system.role.code'),
                    field: 'rolecode',
                    width: 100,
                },{
                    header:i18next.t('system.role.name'),
                    field: 'rolename',
                    width: 250,
                }]
            }
        },
        format: '<form class="app-form sm ipt-sm" id="{form}">\
            <div class="form-wrap">\
                <label data-i18n="system.role.code"></label>\
                <input name="rolecode" class="form-control" />\
                <label data-i18n="system.role.name"></label>\
                <input name="rolecode" class="form-control" />\
                <button type="button" class="btn btn-primary m-l-15" id="{submit}">\
                    <i class="ion ion-search"></i>\
                    <span data-i18n="button.search"></span>\
                </button>\
            </div>\
        </form>\
        <div class="row">\
            <div class="col-md-6">\
                <div id="{table}"></div>\
            </div>\
            <div class="col-md-6">\
                <div id="{slttable}"></div>\
            </div>\
        </div>',
        helper: 'multiTable'
    },
    /*辅助选择从业人员*/
    singledealer: {
        title: {
            'en': 'Employee selection',
            'zh-CN': '合同从业人员'
        },
        option: function() {
            return {
                url: '/gpmc/dealer/list?isenabled=1',
                showModel: false,
                singleSelect: true,
                model: [{
                    type: 'checkbox'
                }, {
                    header: i18next.t('ba.employee.name'),
                    field: 'name',
                    width: 120
                }, {
                    header: i18next.t('common.managementunit'),
                    field: 'unit',
                    width: 200
                }, {
                    header: i18next.t('system.member.orgname'),
                    field: 'department',
                    width: 240
                }]
            }
        },
        format: '<form class="app-form sm ipt-sm" id="{form}">\
            <div class="form-wrap">\
                <label data-i18n="ba.employee.name"></label>\
                <input name="name" class="form-control" />\
                <input type="text" class="hide" />\
                <button type="button" class="btn btn-primary m-l-15" id="{submit}">\
                    <i class="ion ion-search"></i>\
                    <span data-i18n="button.search"></span>\
                </button>\
            </div>\
        </form>\
        <div id="{table}"></div>'
    },
    /*辅助选择从业人员*/
    singlebpmdealer: {
        title: {
            'en': 'Employee selection',
            'zh-CN': '合同从业人员选择'
        },
        option: function() {
            return {
                url: '/gpmc/info/dealer/list?isenabled=1',
                showModel: false,
                singleSelect: true,
                model: [{
                    type: 'checkbox'
                }, {
                    header: i18next.t('ba.employee.name'),
                    field: 'name',
                    width: 120
                }, {
                    header: i18next.t('common.managementunit'),
                    field: 'unit',
                    width: 200
                }, {
                    header: i18next.t('system.member.orgname'),
                    field: 'department',
                    width: 240
                }]
            }
        },
        format: '<form class="app-form sm ipt-sm" id="{form}">\
            <div class="form-wrap">\
                <label data-i18n="ba.employee.name"></label>\
                <input name="name" class="form-control" />\
                <input type="text" class="hide" />\
                <button type="button" class="btn btn-primary m-l-15" id="{submit}">\
                    <i class="ion ion-search"></i>\
                    <span data-i18n="button.search"></span>\
                </button>\
            </div>\
        </form>\
        <div id="{table}"></div>'
    },
    /*辅助选择从业人员*/
    singlecopydealer: {
        title: {
            'en': 'Employee selection',
            'zh-CN': '合同从业人员'
        },
        option: function() {
            return {
                url: '/gpmc/dealer/list?isenabled=1',
                showModel: false,
                singleSelect: true,
                model: [{
                    type: 'checkbox'
                }, {
                    header: i18next.t('ba.employee.name'),
                    field: 'name',
                    width: 120
                }, {
                    header: i18next.t('common.managementunit'),
                    field: 'unit',
                    width: 200
                }, {
                    header: i18next.t('system.member.orgname'),
                    field: 'department',
                    width: 240
                }]
            }
        },
        format: '<div class="clearfix">\
            <form class="app-form m-0 pull-left" id="{form}">\
                <div class="form-wrap">\
                    <label data-i18n="ba.employee.name"></label>\
                    <input name="name" class="form-control" />\
                    <input type="text" class="hide" />\
                    <button type="button" class="btn btn-primary m-l-15" id="{submit}">\
                        <i class="ion ion-search"></i>\
                        <span data-i18n="button.search"></span>\
                    </button>\
                </div>\
            </form>\
            <div class="pull-right">\
                <div class="checkbox checkbox-info m-t-5">\
                    <input type="checkbox" name="checked" id="{checkbox}" />\
                    <label data-i18n="common.iscopy" for="{checkbox}"></label>\
                </div>\
            </div>\
        </div>\
        <div id="{table}"></div>',
        helper: 'copyTable'
    },
    /*辅助选择从业人员*/
    singlebpmcopydealer: {
        title: {
            'en': 'Employee selection',
            'zh-CN': '合同从业人员选择'
        },
        option: function() {
            return {
                url: '/gpmc/info/dealer/list?isenabled=1',
                showModel: false,
                singleSelect: true,
                model: [{
                    type: 'checkbox'
                }, {
                    header: i18next.t('ba.employee.name'),
                    field: 'name',
                    width: 120
                }, {
                    header: i18next.t('common.managementunit'),
                    field: 'unit',
                    width: 200
                }, {
                    header: i18next.t('system.member.orgname'),
                    field: 'department',
                    width: 240
                }]
            }
        },
        format: '<div class="clearfix">\
            <form class="app-form m-0 pull-left" id="{form}">\
                <div class="form-wrap">\
                    <label data-i18n="ba.employee.name"></label>\
                    <input name="name" class="form-control" />\
                    <input type="text" class="hide" />\
                    <button type="button" class="btn btn-primary m-l-15" id="{submit}">\
                        <i class="ion ion-search"></i>\
                        <span data-i18n="button.search"></span>\
                    </button>\
                </div>\
            </form>\
            <div class="pull-right">\
                <div class="checkbox checkbox-info m-t-5">\
                    <input type="checkbox" name="checked" id="{checkbox}" />\
                    <label data-i18n="common.iscopy" for="{checkbox}"></label>\
                </div>\
            </div>\
        </div>\
        <div id="{table}"></div>',
        helper: 'copyTable'
    },
    /*辅助选择所有用户*/
    singlemember: {
        title: {
            'en': 'Member selection',
            'zh-CN': '用户管理'
        },
        option: function() {
            return {
                url: '/auth/userlist',
                showModel: false,
                singleSelect: true,
                model: [{
                    type: 'checkbox'
                }, {
                    header: i18next.t('system.member.name'),
                    field: 'username',
                    width: 90
                }, {
                    header: i18next.t('common.managementunit'),
                    field: 'orgname',
                    width: 150
                }, {
                    header: i18next.t('system.member.orgname'),
                    field: 'deptname',
                    width: 160
                }, {
                    header: i18next.t('system.member.position'),
                    field: 'position',
                    width: 160
                }]
            }
        },
        format: '<form class="app-form m-0" id="{form}">\
            <div class="form-wrap">\
                <input type="text" name="keyword" data-i18n="placeholder.userinfo" class="form-control w-250" />\
                <input type="text" class="hide" />\
                <button type="button" class="btn btn-primary m-l-15" id="{submit}">\
                    <i class="ion ion-search"></i>\
                    <span data-i18n="button.search"></span>\
                </button>\
            </div>\
        </form>\
        <div id="{table}"></div>'
    },
    /*辅助选择所有用户*/
    singlebpmmember: {
        title: {
            'en': 'Member selection',
            'zh-CN': '用户管理'
        },
        option: function() {
            return {
                url: '/gpmc/info/contract/userlist',
                showModel: false,
                singleSelect: true,
                model: [{
                    type: 'checkbox'
                }, {
                    header: i18next.t('system.member.name'),
                    field: 'username',
                    width: 90
                }, {
                    header: i18next.t('common.managementunit'),
                    field: 'orgname',
                    width: 150
                }, {
                    header: i18next.t('system.member.orgname'),
                    field: 'deptname',
                    width: 160
                }, {
                    header: i18next.t('system.member.position'),
                    field: 'position',
                    width: 160
                }]
            }
        },
        format: '<form class="app-form m-0" id="{form}">\
            <div class="form-wrap">\
                <input type="text" class="form-control w-250" name="keyword" data-i18n="placeholder.userinfo" />\
                <input type="text" class="hide" />\
                <button type="button" class="btn btn-primary m-l-15" id="{submit}">\
                    <i class="ion ion-search"></i>\
                    <span data-i18n="button.search"></span>\
                </button>\
            </div>\
        </form>\
        <div id="{table}"></div>'
    },
    /*辅助选择所有用户*/
    singlecopymember: {
        title: {
            'en': 'Member selection',
            'zh-CN': '用户管理'
        },
        option: function() {
            return {
                url: '/auth/userlist',
                showModel: false,
                singleSelect: true,
                model: [{
                    type: 'checkbox'
                }, {
                    header: i18next.t('system.member.name'),
                    field: 'username',
                    width: 90
                }, {
                    header: i18next.t('common.managementunit'),
                    field: 'orgname',
                    width: 150
                }, {
                    header: i18next.t('system.member.orgname'),
                    field: 'deptname',
                    width: 160
                }, {
                    header: i18next.t('system.member.position'),
                    field: 'position',
                    width: 160
                }]
            }
        },
        format: '<div class="clearfix">\
            <form class="app-form m-0 pull-left" id="{form}">\
                <div class="form-wrap">\
                    <input type="text" name="keyword" data-i18n="placeholder.userinfo" class="form-control w-250" />\
                    <input type="text" class="hide" />\
                    <button type="button" class="btn btn-primary m-l-15" id="{submit}">\
                        <i class="ion ion-search"></i>\
                        <span data-i18n="button.search"></span>\
                    </button>\
                </div>\
            </form>\
            <div class="pull-right">\
                <div class="checkbox checkbox-info m-t-5">\
                    <input type="checkbox" name="checked" id="{checkbox}" />\
                    <label data-i18n="common.iscopy" for="{checkbox}"></label>\
                </div>\
            </div>\
        </div>\
        <div id="{table}"></div>',
        helper: 'copyTable'
    },
    /*辅助选择所有用户*/
    singlebpmcopymember: {
        title: {
            'en': 'Member selection',
            'zh-CN': '用户管理'
        },
        option: function() {
            return {
                url: '/gpmc/info/contract/userlist',
                showModel: false,
                singleSelect: true,
                model: [{
                    type: 'checkbox'
                }, {
                    header: i18next.t('system.member.name'),
                    field: 'username',
                    width: 90
                }, {
                    header: i18next.t('common.managementunit'),
                    field: 'orgname',
                    width: 150
                }, {
                    header: i18next.t('system.member.orgname'),
                    field: 'deptname',
                    width: 160
                }, {
                    header: i18next.t('system.member.position'),
                    field: 'position',
                    width: 160
                }]
            }
        },
        format: '<div class="clearfix">\
            <form class="app-form m-0 pull-left" id="{form}">\
                <div class="form-wrap">\
                    <input type="text" name="keyword" data-i18n="placeholder.userinfo" class="form-control w-250" />\
                    <input type="text" class="hide" />\
                    <button type="button" class="btn btn-primary m-l-15" id="{submit}">\
                        <i class="ion ion-search"></i>\
                        <span data-i18n="button.search"></span>\
                    </button>\
                </div>\
            </form>\
            <div class="pull-right">\
                <div class="checkbox checkbox-info m-t-5">\
                    <input type="checkbox" name="checked" id="{checkbox}" />\
                    <label data-i18n="common.iscopy" for="{checkbox}">是否拷贝</label>\
                </div>\
            </div>\
        </div>\
        <div id="{table}"></div>',
        helper: 'copyTable'
    },
    /*辅助选择所有用户*/
    multimember: {
        title: {
            'en': 'Member selection',
            'zh-CN': '选择用户'
        },
        filter: function(item, data) {
            return item.userid === data.userid;
        },
        cache: [],
        width: '1020px',
        option: function() {
            var me = this;
            return {
                url: '/auth/userlist',
                showModel: false,
                nocheckEnabled: true,
                height: 320,
                /*reload: me.options.query && me.options.query.usertypeids ? true : false,
                queryParams: function(query){
                    var data = me.formData();
                    if (!query.usertypeids && !data.keyword) {
                        main.layer.alert('请输入查询条件');
                        return false;
                    }
                    return $.extend(query, data);
                },*/
                model: [{
                    header: 'checkbox',
                    type: 'checkbox'
                }, {
                    header: i18next.t('system.member.name'),
                    field: 'username',
                    width: 80
                }, {
                    header: i18next.t('common.managementunit'),
                    field: 'orgname',
                    width: 140
                }, {
                    header: i18next.t('system.member.orgname'),
                    field: 'deptname',
                    width: 140
                }, {
                    header: i18next.t('system.member.position'),
                    field: 'position',
                    width: 140
                }]
            }
        },
        sltoption: function() {
            return {
                showModel: false,
                showPageData: false,
                showPaginaData: false,
                nocheckEnabled: true,
                height: 320,
                model: [{
                    header: 'checkbox',
                    type: 'checkbox'
                }, {
                    header: i18next.t('system.member.name'),
                    field: 'username',
                    width: 80
                }, {
                    header: i18next.t('common.managementunit'),
                    field: 'orgname',
                    width: 140
                }, {
                    header: i18next.t('system.member.orgname'),
                    field: 'deptname',
                    width: 140
                }, {
                    header: i18next.t('system.member.position'),
                    field: 'position',
                    width: 140
                }]
            }
        },
        format: '<form class="app-form m-0" id="{form}">\
            <div class="form-wrap">\
                <input type="text" name="keyword" data-i18n="placeholder.userinfo" class="form-control w-250">\
                <input type="text" class="hide" />\
                <button type="button" class="btn btn-primary m-l-15" id="{submit}">\
                    <i class="ion ion-search"></i>\
                    <span data-i18n="button.search"></span>\
                </button>\
            </div>\
        </form>\
        <div class="row">\
            <div class="col-md-6">\
                <div id="{table}"></div>\
            </div>\
            <div class="col-md-6">\
                <div id="{slttable}"></div>\
            </div>\
        </div>',
        helper: 'multiTable'
    },
    /*辅助选择所有用户*/
    multibpmmember: {
        title: {
            'en': 'Member selection',
            'zh-CN': '选择用户'
        },
        filter: function(item, data) {
            return item.userid === data.userid;
        },
        cache: [],
        width: '1020px',
        option: function() {
            var me = this;
            return {
                url: '/gpmc/info/contract/userlist',
                showModel: false,
                nocheckEnabled: true,
                height: 340,
                /*reload: me.options.query && me.options.query.usertypeids ? true : false,
                queryParams: function(query){
                    var data = me.formData();
                    if (!query.usertypeids && !data.keyword) {
                        main.layer.alert('请输入查询条件');
                        return false;
                    }
                    return $.extend(query, data);
                },*/
                model: [{
                    header: 'checkbox',
                    type: 'checkbox'
                }, {
                    header: i18next.t('system.member.name'),
                    field: 'username',
                    width: 80
                }, {
                    header: i18next.t('common.managementunit'),
                    field: 'orgname',
                    width: 140
                }/*, {
                    header: i18next.t('common.domainaccount'),
                    field: 'domainaccount',
                    width: 100
                }*/, {
                    header: i18next.t('system.member.orgname'),
                    field: 'orgname',
                    width: 140
                }/*, {
                    header: i18next.t('system.member.empno'),
                    field: 'userno',
                    width: 80
                }*/, {
                    header: i18next.t('system.member.position'),
                    field: 'position',
                    width: 140
                }]
            }
        },
        sltoption: function() {
            return {
                showModel: false,
                showPageData: false,
                showPaginaData: false,
                nocheckEnabled: true,
                height: 340,
                model: [{
                    header: 'checkbox',
                    type: 'checkbox'
                }, {
                    header: i18next.t('system.member.name'),
                    field: 'username',
                    width: 80
                }, {
                    header: i18next.t('common.managementunit'),
                    field: 'orgname',
                    width: 140
                }, {
                    header: i18next.t('system.member.orgname'),
                    field: 'deptname',
                    width: 140
                }, {
                    header: i18next.t('system.member.position'),
                    field: 'position',
                    width: 140
                }]
            }
        },
        format: '<form class="app-form m-0" id="{form}">\
            <div class="form-wrap">\
                <input type="text" name="keyword" data-i18n="placeholder.userinfo" class="form-control w-250">\
                <input type="text" class="hide" />\
                <button type="button" class="btn btn-primary m-l-15" id="{submit}">\
                    <i class="ion ion-search"></i>\
                    <span data-i18n="button.search"></span>\
                </button>\
            </div>\
        </form>\
        <div class="row">\
            <div class="col-md-6">\
                <div id="{table}"></div>\
            </div>\
            <div class="col-md-6">\
                <div id="{slttable}"></div>\
            </div>\
        </div>',
        helper: 'multiTable'
    },
    /* 辅助单选外聘律师 */
    singleexternallaw: {
        title: {
            'en': 'External law',
            'zh-CN': '外聘律师'
        },
        option: function() {
            return {
                url: '/gpmc/law/list',
                showModel: false,
                singleSelect: true,
                model: [{
                    type: 'checkbox'
                }, {
                    header: i18next.t('dispute.law.lawfirm'),
                    field: 'lawfirm',
                    width: 200
                }, {
                    header: i18next.t('dispute.law.lawyer'),
                    field: 'lawyer',
                    width: 140
                }, {
                    header: i18next.t('dispute.law.applicantorg'),
                    field: 'applicantorg',
                    width: 150
                }, {
                    header: i18next.t('common.submitdate'),
                    field: 'applydate',
                    width: 150,
                    format: function(value) {
                        return plugin.format(value, 'yyyy-MM-dd');
                    }
                }]
            }
        },
        format: '<form class="app-form m-0" id="{form}">\
            <div class="form-wrap">\
                <input type="text" name="keyword" data-i18n="placeholder.externallaw" class="form-control w-250" />\
                <input type="text" class="hide" />\
                <button type="button" class="btn btn-primary m-l-15" id="{submit}">\
                    <i class="ion ion-search"></i>\
                    <span data-i18n="button.search"></span>\
                </button>\
            </div>\
        </form>\
        <div id="{table}"></div>'
    },
    /* 辅助单选外聘律师 */
    singlebpmexternallaw: {
        title: {
            'en': 'External law',
            'zh-CN': '外聘律师'
        },
        option: function() {
            return {
                url: '/gpmc/info/law/list',
                showModel: false,
                singleSelect: true,
                model: [{
                    type: 'checkbox'
                }, {
                    header: i18next.t('dispute.law.lawfirm'),
                    field: 'lawfirm',
                    width: 200
                }, {
                    header: i18next.t('dispute.law.lawyer'),
                    field: 'lawyer',
                    width: 140
                }, {
                    header: i18next.t('dispute.law.applicantorg'),
                    field: 'applicantorg',
                    width: 150
                }, {
                    header: i18next.t('common.submitdate'),
                    field: 'applydate',
                    width: 150,
                    format: function(value) {
                        return plugin.format(value, 'yyyy-MM-dd');
                    }
                }]
            }
        },
        format: '<form class="app-form m-0" id="{form}">\
            <div class="form-wrap">\
                <input type="text" name="keyword" data-i18n="placeholder.externallaw" class="form-control w-250" />\
                <input type="text" class="hide" />\
                <button type="button" class="btn btn-primary m-l-15" id="{submit}">\
                    <i class="ion ion-search"></i>\
                    <span data-i18n="button.search"></span>\
                </button>\
            </div>\
        </form>\
        <div id="{table}"></div>'
    },
    /* 辅助单选格式文本 */
    singletext: {
        title: {
            'en': 'Frame Text',
            'zh-CN': '格式文本'
        },
        option: function() {
            return {
                url: '/pub/sys/template/list?ifformattext=1',
                showModel: false,
                singleSelect: true,
                model: [{
                    type: 'checkbox'
                }, {
                    header: i18next.t('system.template.code'),
                    field: 'templatecode',
                    width: 100
                }, {
                    header: i18next.t('system.template.name'),
                    field: 'templatename',
                    width: 160,
                    type: 'link',
                    onClick: function(row, index) {
                        app.filePreview({
                            name: row.templatename,
                            docid: row.docid,
                            rev: row.rev
                        });
                    }
                }, {
                    header: i18next.t('system.template.applicabletype'),
                    field: 'busnesstypenames',
                    width: 160
                }, {
                    header: i18next.t('common.remark'),
                    field: 'remark',
                    width: 140
                }]
            }
        },
        format: '<form class="app-form m-0 sm" id="{form}">\
            <div class="form-wrap">\
                <label data-i18n="system.template.applicabletype"></label>\
                <input type="text" class="form-control" name="busnesstypenames" />\
                <label data-i18n="system.template.name"></label>\
                <input type="text" class="form-control" name="templatename" />\
                <button type="button" class="btn btn-primary m-l-15" id="{submit}">\
                    <i class="ion ion-search"></i>\
                    <span data-i18n="button.search"></span>\
                </button>\
            </div>\
        </form>\
        <div id="{table}"></div>'
    },
     /* 辅助单选格式文本 */
     singlebpmtext: {
        title: {
            'en': 'Frame Text',
            'zh-CN': '格式文本'
        },
        option: function() {
            return {
                url: '/gpmc/info/template/list?ifformattext=1',
                showModel: false,
                singleSelect: true,
                model: [{
                    type: 'checkbox'
                }, {
                    header: i18next.t('system.template.code'),
                    field: 'templatecode',
                    width: 100
                }, {
                    header: i18next.t('system.template.name'),
                    field: 'templatename',
                    width: 160,
                    type: 'link',
                    onClick: function(row, index) {
                        app.filePreview({
                            name: row.templatename,
                            docid: row.docid,
                            rev: row.rev
                        });
                    }
                }, {
                    header: i18next.t('system.template.applicabletype'),
                    field: 'busnesstypenames',
                    width: 160
                }, {
                    header: i18next.t('common.remark'),
                    field: 'remark',
                    width: 140
                }]
            }
        },
        format: '<form class="app-form m-0 sm" id="{form}">\
            <div class="form-wrap">\
                <label data-i18n="system.template.applicabletype"></label>\
                <input type="text" class="form-control" name="busnesstypenames" />\
                <label data-i18n="system.template.name"></label>\
                <input type="text" class="form-control" name="templatename" />\
                <button type="button" class="btn btn-primary m-l-15" id="{submit}">\
                    <i class="ion ion-search"></i>\
                    <span data-i18n="button.search"></span>\
                </button>\
            </div>\
        </form>\
        <div id="{table}"></div>'
    },
    /* 辅助单选成本中心 */
    singlecostcenter: {
        title: {
            'en': 'Cost Center',
            'zh-CN': '成本中心'
        },
        option: function() {
            return {
                url: '/gpmc/costCenter/queryCostCenters',
                showModel: false,
                singleSelect: true,
                model: [{
                    type: 'checkbox'
                }, {
                    header: i18next.t('bpm.costcenter.code'),
                    field: 'centercode',
                    width: 200
                }, {
                    header: i18next.t('bpm.costcenter.name'),
                    field: 'description',
                    width: 360
                }]
            }
        },
        format: '<form class="app-form m-0 sm" id="{form}">\
            <div class="form-wrap">\
                <input type="text" name="keyword" class="form-control w-250" />\
                <input type="text" class="hide" />\
                <button type="button" class="btn btn-primary m-l-15" id="{submit}">\
                    <i class="ion ion-search"></i>\
                    <span data-i18n="button.search"></span>\
                </button>\
            </div>\
        </form>\
        <div id="{table}"></div>'
    },
     /* 辅助单选格式文本 */
     singlebpmcostcenter: {
        title: {
            'en': 'Cost Center',
            'zh-CN': '成本中心'
        },
        option: function() {
            return {
                url: '/gpmc/info/costCenter/queryCostCenters',
                showModel: false,
                singleSelect: true,
                model: [{
                    type: 'checkbox'
                }, {
                    header: i18next.t('bpm.costcenter.code'),
                    field: 'centercode',
                    width: 200
                }, {
                    header: i18next.t('bpm.costcenter.name'),
                    field: 'description',
                    width: 360
                }]
            }
        },
        format: '<form class="app-form m-0 sm" id="{form}">\
            <div class="form-wrap">\
                <input type="text" name="keyword" class="form-control w-250" />\
                <input type="text" class="hide" />\
                <button type="button" class="btn btn-primary m-l-15" id="{submit}">\
                    <i class="ion ion-search"></i>\
                    <span data-i18n="button.search"></span>\
                </button>\
            </div>\
        </form>\
        <div id="{table}"></div>'
    }
};

var Helper = {
    tableHelper: {
        init: function() {
            var me = this,
                lng = me.options.locale;
            me.title = me.options.title[lng];
            return this;
        },
        show: function() {
            var me = this;
            me.options.form = me.id + '_form';
            me.options.table = me.id + '_table';
            me.options.submit = me.id + '_submit';
            me.index = main.layer.open({
                skin: 'layer-sw app-layer-layout layer-selector',
                type: 1,
                title: me.title,
                btn: me.locale.btn,
                area: ["650px", "500px"],
                shadeClose: false,
                closeBtn: 1,
                anim: 2,
                resize: false,
                content: app.renderText(me.options.format, me.options),
                success: function(parent) {
                    app.initI18n(parent);
                    me.$table = parent.find('#' + me.options.table);
                    me.$form = parent.find('#' + me.options.form);
                    me.$submit = parent.find('#' + me.options.submit);
                    me.createGrid();
                },
                yes: function() {
                    me.select(me.$table.multigrid('getSltData'));
                }
            });
            return this;
        },
        createGrid: function() {
            var me = this,
                option = me.options.option;
            if (typeof option === 'function') {
                option = option.call(me);
            }
            if (me.options.query) {
                option.query = $.extend({}, option.query, me.options.query);
            }
            me.$table.multigrid($.extend({
                height: 315,
                onDbRowClick: function(data) {
                    me.select([data]);
                },
                queryParams: function(data) {
                    return $.extend(data, me.formData());
                }
            }, option));

            me.$submit.unbind().click(function() {
                me.$table.multigrid('load');
            });

            me.$form.off('click').on('keypress', 'input', function(e){
                var key = e.keyCode || e.which;
                e.stopPropagation();
                if(key === 13){
                   me.$table.multigrid('load');
                }
            });
            return this;
        },
        formData: function() {
            return app.getFormData(this.$form);
        }
    },
    multiTable: {
        init: function() {
            var me = this,
                lng = me.options.locale;
            me.title = me.options.title[lng];
            if ($.isArray(me.options.cache) && me.options.cache.length > 0) {
                me.options.cache.map(function(item){
                    item.checked = true;
                });
                me.options.cache = JSON.stringify(me.options.cache);
            } else {
                me.options.cache = null;
            };
            return this;
        },
        show: function() {
            var me = this;
            me.options.form = me.id + '_form';
            me.options.table = me.id + '_table';
            me.options.slttable = me.id + '_slttable';
            me.options.submit = me.id + '_submit';
            me.index = main.layer.open({
                skin: 'layer-sw app-layer-layout layer-selector layer-multi-grid',
                type: 1,
                title: me.title,
                btn: me.locale.btn,
                area: [me.options.width || '900px', '500px'],
                shadeClose: false,
                closeBtn: 1,
                anim: 2,
                resize: false,
                content: app.renderText(me.options.format, me.options),
                success: function(parent) {
                    app.initI18n(parent);
                    me.$table = parent.find('#' + me.options.table);
                    me.$slttable = parent.find('#' + me.options.slttable);
                    me.$form = parent.find('#' + me.options.form);
                    me.$submit = parent.find('#' + me.options.submit);
                    me.createGrid();
                },
                yes: function() {
                    var cache = me.$slttable.multigrid('getSltData');
                    me.options.cache = JSON.stringify(cache);
                    me.select(cache);
                }
            });
            return this;
        },
        createGrid: function() {
            var me = this,
                filter = me.options.filter,
                option = me.options.option,
                sltoption = me.options.sltoption();
            if (typeof option === 'function') {
                option = option.call(me);
            };
            if (me.options.query) {
                option.query = $.extend({}, option.query, me.options.query);
            };
            me.grid = me.$table.multigrid($.extend({
                height: 315,
                query: me.options.query,
                onCheck: function(data) {
                    me.sltgrid.append(data);
                },
                onUncheck: function(data){
                    var items = me.sltgrid.getData();
                    $.each(items, function(index, item){
                        if (filter(item, data)) {
                            me.sltgrid.delRow(index);
                            return false;
                        }
                    })
                },
                queryParams: function(data) {
                    return $.extend(data, me.formData());
                },
                dataFilter: function(res) {
                    if (res.code === 'success') {
                        var items = res.data.items,
                            datas = me.sltgrid.getData();
                        $.each(items, function(i, item){
                            $.each(datas, function(k, data){
                                if (filter(item, data)) {
                                    item.checked = true;
                                    item.nocheck = data.nocheck;
                                    return false;
                                }
                            })
                        })
                        return res.data;
                    } else if (res.code === 'user-not-login') {
                        main.app.chkLogin.logout();
                    } else {
                        main.layer.alert(res.message);
                    }
                }
            }, option)).data('multigrid');

            me.sltgrid = me.$slttable.multigrid($.extend({
                height: 315,
                data: $.parseJSON(me.options.cache),
                onUncheck: function(data, index){
                    me.sltgrid.delRow(index);
                    var items = me.grid.getData();
                    $.each(items, function(index, item){
                        if (filter(item, data)) {
                            me.grid.rows[index].checked = false;
                            return false;
                        }
                    })
                    me.grid.resetCheckAll();
                },
                beforeUncheckAll: function(){
                    var items = me.grid.getData(),
                        datas = this.getData(),
                        arr = [];
                    $.each(datas, function(i, data){
                        if (!data.nocheck) {
                            $.each(items, function(k, item){
                                if (filter(item, data)) {
                                    item.checked = false;
                                    return false;
                                }
                            });
                        } else {
                            arr.push(data);
                        }
                    });
                    this.options.data = arr;
                    this.refresh();
                    me.grid.refresh();
                    return false;
                },
                queryParams: function(data) {
                    return $.extend(data, me.formData());
                }
            }, sltoption)).data('multigrid');

            me.$form.off('click').on('keypress', 'input', function(e){
                var key = e.keyCode || e.which;
                e.stopPropagation();
                if(key === 13){
                   me.$table.multigrid('load');
                }
            });

            me.$submit.unbind().click(function() {
                me.$table.multigrid('load');
            });
            return this;
        },
        formData: function() {
            return app.getFormData(this.$form);
        }
    },
    cacheTable: {
        init: function() {
            var me = this,
                plantId = me.options.getCache();
            me.select([{
                plantId: plantId
            }]);
            return this;
        },
        show: function() {
            var me = this;
            me.options.form = me.id + '_form';
            me.options.table = me.id + '_table';
            me.options.submit = me.id + '_submit';
            me.index = main.layer.open({
                skin: 'layer-sw app-layer-layout layer-selector',
                type: 1,
                title: me.title,
                btn: me.locale.btn,
                area: ["650px", "500px"],
                shadeClose: false,
                closeBtn: 1,
                anim: 2,
                resize: false,
                content: app.renderText(me.options.format, me.options),
                success: function(parent) {
                    app.initI18n(parent);
                    me.$table = parent.find('#' + me.options.table);
                    me.$form = parent.find('#' + me.options.form);
                    me.$submit = parent.find('#' + me.options.submit);
                    me.createGrid();
                },
                yes: function() {
                    var data = me.$table.multigrid('getSltData');
                    me.select(data);
                    me.options.setCache(data);
                }
            });
            return this;
        },
        createGrid: function() {
            var me = this,
                option = me.options.option;
            if (typeof option === 'function') {
                option = option.call(me);
            };
            if (me.options.query) {
                option.query = $.extend({}, option.query, me.options.query);
            };;
            me.$table.multigrid($.extend({
                height: 315,
                onDbRowClick: function(data) {
                    me.select([data]);
                    me.options.setCache([data]);
                },
                queryParams: function(data) {
                    return $.extend(data, me.formData());
                }
            }, option));

            me.$submit.unbind().click(function() {
                me.$table.multigrid('load');
            });
            return this;
        },
        formData: function() {
            return app.getFormData(this.$form);
        }
    },
    copyTable: {
        init: function() {
            var me = this,
                lng = me.options.locale;
            me.title = me.options.title[lng];
            return this;
        },
        show: function() {
            var me = this;
            me.options.form = me.id + '_form';
            me.options.table = me.id + '_table';
            me.options.submit = me.id + '_submit';
            me.options.checkbox = me.id + '_check';
            me.index = main.layer.open({
                skin: 'layer-sw app-layer-layout layer-selector',
                type: 1,
                title: me.title,
                btn: me.locale.btn,
                area: ["650px", "500px"],
                shadeClose: false,
                closeBtn: 1,
                anim: 2,
                resize: false,
                content: app.renderText(me.options.format, me.options),
                success: function(parent) {
                    app.initI18n(parent);
                    me.$table = parent.find('#' + me.options.table);
                    me.$form = parent.find('#' + me.options.form);
                    me.$submit = parent.find('#' + me.options.submit);
                    me.$check = parent.find('#' + me.options.checkbox);
                    me.createGrid();
                },
                yes: function() {
                    var checked = me.$check[0];
                    checked = checked ? checked.checked : false;
                    me.select(me.$table.multigrid('getSltData'), checked);
                }
            });
            return this;
        },
        createGrid: function() {
            var me = this,
                option = me.options.option;
            if (typeof option === 'function') {
                option = option.call(me);
            };
            if (me.options.query) {
                option.query = $.extend({}, option.query, me.options.query);
            };
            me.$table.multigrid($.extend({
                height: 315,
                onDbRowClick: function(data) {
                    var checked = me.$check[0];
                    checked = checked ? checked.checked : false;
                    me.select([data], checked);
                },
                queryParams: function(data) {
                    return $.extend(data, me.formData());
                }
            }, option));

            me.$form.off('click').on('keypress', 'input', function(e){
                var key = e.keyCode || e.which;
                e.stopPropagation();
                if(key === 13){
                   me.$table.multigrid('load');
                }
            });

            me.$submit.unbind().click(function() {
                me.$table.multigrid('load');
            });
            return this;
        },
        formData: function() {
            return app.getFormData(this.$form);
        }
    },
    treeHelper: {
        init: function() {
            var me = this,
                lng = me.options.locale;
            me.title = me.options.title[lng];
            return this;
        },
        show: function() {
            var me = this;
            me.options.tree = me.id + '_tree';
            me.index = main.layer.open({
                skin: 'layer-sw app-layer-layout layer-selector',
                type: 1,
                title: me.title,
                btn: me.locale.btn,
                area: ['680px', '500px'],
                shadeClose: false,
                closeBtn: 1,
                anim: 2,
                resize: false,
                content: app.renderText(me.options.format, me.options),
                success: function(parent) {
                    app.initI18n(parent);
                    me.$tree = parent.find('#' + me.options.tree);
                    me.createTree();
                },
                yes: function() {
                    var data = me.tree.getSelectedNodes();
                    if (data[0] && data[0].levels == 0) {
                        data = [];
                    };
                    me.select(data);
                }
            });
            return this;
        },
        createTree: function() {
            var me = this,
                option = me.options.option;
            if (typeof option === 'function') {
                option = option.call(me);
            };
            option = $.extend({}, option);
            option.async = $.extend({
                dataFilter: function(treeId, parentNode, res){
                    res = res.data;
                    res.map(function(item){
                        if (item.levels === 0) {
                            item.nocheck = true;
                        };
                    });
                    return res;
                }
            }, option.async);
            if (me.options.query) {
                if (option.async.url.indexOf('?') === -1) {
                    option.async.url += '?';
                };
                option.async.url += $.param(me.options.query);
            };
            option.callback = $.extend({
                onCheck: function(event, $treeId, treeNode) {
                    me.tree.checkAllNodes(false);
                    me.tree.checkNode(treeNode);
                    me.tree.selectNode(treeNode);
                },
                onClick: function(event, $treeId, treeNode) {
                    me.tree.checkAllNodes(false);
                    me.tree.checkNode(treeNode);
                },
                onDblClick: function(event, $treeId, treeNode) {
                    treeNode && treeNode.level !== 0 && me.select(me.tree.getSelectedNodes());
                },
                onNodeCreated: function($tree, treeId, node) {
                    node.level === 0 && me.tree.expandNode(node);
                }
            }, option.callback);
            option.check = $.extend({
                enable: true
            }, option.check);
            me.tree = stree.init(me.$tree, option);
        }
    },
    singleTree: {
        init: function() {
            var me = this;
            me.title = me.options.title[me.options.locale];
            return this;
        },
        show: function() {
            var me = this;
            me.options.tree = me.id + '_tree';
            me.index = main.layer.open({
                skin: 'layer-sw app-layer-layout layer-selector',
                type: 1,
                title: me.title,
                btn: me.locale.btn,
                area: ['680px', '500px'],
                shadeClose: false,
                closeBtn: 1,
                anim: 2,
                resize: false,
                content: app.renderText(me.options.format, me.options),
                success: function(parent) {
                    app.initI18n(parent);
                    me.$tree = parent.find('#' + me.options.tree);
                    me.createTree();
                },
                yes: function() {
                    var node = me.tree.getSelectedNodes();
                    if (node.length > 0) {
                        node = me.getTreeNode(node[0]);
                    };
                    me.select(node);
                }
            });
            return this;
        },
        createTree: function() {
            var me = this,
                option = me.options.option;
            if (typeof option === 'function') {
                option = option.call(me);
            };
            if (me.options.query) {
                if (option.async.url.indexOf('?') === -1) {
                    option.async.url += '?';
                };
                option.async.url += $.param(me.options.query);
            };
            option.callback = $.extend({
                onCheck: function(event, $treeId, treeNode) {
                    me.tree.checkAllNodes(false);
                    me.tree.checkNode(treeNode);
                    me.tree.selectNode(treeNode);
                },
                onClick: function(event, $treeId, treeNode) {
                    me.tree.checkAllNodes(false);
                    me.tree.checkNode(treeNode);
                },
                onDblClick: function(event, $treeId, treeNode) {
                    me.select(me.getTreeNode(treeNode));
                }
            }, option.callback);
            option.check = $.extend({
                enable: true
            }, option.check);
            me.tree = stree.init(me.$tree, option);
        },
        getTreeNode: function(node, data){
            var me = this;
            if (!data) {
                data = [node];
            };
            if (node = node.getParentNode()) {
                data.unshift(node);
                me.getTreeNode(node, data);
            };
            return data;
        }
    },
    treeSelectedHelper: {
        init: function() {
            var me = this,
                lng = me.options.locale;
            me.title = me.options.title[lng];
            if ($.isArray(me.options.cache) && me.options.cache.length > 0) {
                me.options.cache = JSON.stringify(me.options.cache);
            } else {
                me.options.cache = null;
            }
            return this;
        },
        show: function() {
            var me = this;
            me.options.tree = me.id + '_tree';
            me.options.form = me.id + '_form';
            me.options.submit = me.id + '_submit';
            me.index = main.layer.open({
                skin: 'layer-sw app-layer-layout layer-selector',
                type: 1,
                title: me.title,
                btn: me.locale.btn,
                area: ['680px', '500px'],
                shadeClose: false,
                closeBtn: 1,
                anim: 2,
                resize: false,
                content: app.renderText(me.options.format, me.options),
                success: function(parent) {
                    app.initI18n(parent);
                    me.$tree = parent.find('#' + me.options.tree);
                    me.$form = parent.find('#' + me.options.form);
                    me.$submit = parent.find('#' + me.options.submit);
                    me.createTree();
                },
                yes: function() {
                    var cache = me.tree.getCheckedNodes();
                    me.options.cache = JSON.stringify(cache);
                    me.select(cache);
                }
            });
            return this;
        },
        createTree: function() {
            var me = this,
                cache = me.options.cache,
                option = me.options.option;
            if (cache && typeof cache === 'string') cache = $.parseJSON(cache);
            if (!$.isArray(cache)) cache = [];
            if (typeof option === 'function') {
                option = option.call(me);
            }
            option = $.extend(true, {}, option);
            option.async = $.extend({
                dataFilter: function(treeId, parentNode, res) {
                    res.data.map(function(item) {
                        if (item.levels == 0) {
                            item.nocheck = true;
                        } else {
                          $.each(cache, function(i, v) {
                              if (item.id === v.id) {
                                  item.checked = true;
                                  return false;
                              };
                          });
                        }
                    });
                    return res.data;
                }
            }, option.async);
            if (me.options.query) {
                if (option.async.url.indexOf('?') === -1) {
                    option.async.url += '?';
                };
                option.async.url += $.param(me.options.query);
            };
            option.callback = $.extend({
                onClick: function() {
                    return true;
                },
                onCheck: function(event,$treeId, treeNode) {
                    var pNodes = treeNode.getPath();
                    pNodes.pop();
                    pNodes.forEach(function (value, index) {
                        if(value.checked){
                            me.tree.checkNode(value, false);
                        }
                    });
                    var childNodes = treeNode.children;
                    childNodes && childNodes.forEach(function (value, index) {
                        if(value.checked){
                            me.tree.checkNode(value, false);
                        }
                        var child = value.children;
                        child && child.forEach(function (v, i) {
                            if(v.checked){
                                me.tree.checkNode(v, false);
                            }
                        })
                    });
                    if (!treeNode.checked) {
                        me.tree.selectNode(treeNode);
                    }
                },
                onNodeCreated: function($tree, treeId, node) {
                    if (node.level === 0) {
                        me.tree.expandNode(node);
                    };
                }
            }, option.callback);
            option.check = $.extend({
                enable: true,
                chkboxType: {Y: '', N: ''}
            }, option.check);
            me.tree = stree.init(me.$tree, option);
        }
    },
    singleOnlyLastSelectedTreeHelper: {
        init: function() {
            var me = this,
                lng = me.options.locale;
            me.title = me.options.title[lng];
            return this;
        },
        show: function() {
            var me = this;
            me.options.tree = me.id + '_tree';
            me.options.form = me.id + '_form';
            me.options.submit = me.id + '_submit';
            me.index = main.layer.open({
                skin: 'layer-sw app-layer-layout layer-selector',
                type: 1,
                title: me.title,
                btn: me.locale.btn,
                area: ['680px', '500px'],
                shadeClose: false,
                closeBtn: 1,
                anim: 2,
                resize: false,
                content: app.renderText(me.options.format, me.options),
                success: function(parent) {
                    app.initI18n(parent);
                    me.$tree = parent.find('#' + me.options.tree);
                    me.$form = parent.find('#' + me.options.form);
                    me.$submit = parent.find('#' + me.options.submit);
                    me.createTree();
                },
                yes: function() {
                    me.select(me.tree.getCheckedNodes());
                }
            });
            return this;
        },
        createTree: function() {
            var me = this,
                option =  me.options.option;
            if (typeof option === 'function') {
                option = me.options.option();
            };
            option = $.extend({
                dataFilter: function(treeId, parentNode, result){
                    result = result.data;
                    if ($.isArray(result)) {
                        result.map(function(item){
                            if (item.isParent) {
                                item.nocheck = true;
                            }
                        })
                    }
                    return result;
                }
            }, option);
            me.tree = stree.init(me.$tree, {
                async: option,
                check: {
                    enable: true
                },
                callback:{
                    beforeCheck: function(event, treeNode) {
                        me.tree.checkAllNodes(false);
                        me.tree.selectNode(treeNode);
                    },
                    onClick: function(event, $treeId, treeNode) {
                        if (treeNode.isParent) {
                            me.tree.expandNode(treeNode);
                        } else {
                            me.tree.checkAllNodes(false);
                            me.tree.checkNode(treeNode);
                        }
                        return false;
                    },
                    onDblClick: function(event, $treeId, treeNode) {
                        if (!treeNode.isParent) {
                            me.select([treeNode]);
                        }
                    },
                    onNodeCreated: function($tree, treeId, node) {
                        if (node.level === 0) {
                            me.tree.expandNode(node)
                        }
                    }
                }
            });
        }
    }
};

function LayerSelector(el, options) {
    this.$main = el;
    this.id = layerSelectorManager.getId();
    this.options = options;
    $.extend(this, Helper[options.helper] || Helper.tableHelper);
    this.locale = LayerSelector.LOCALES[this.options.locale];
    this.init();
    this.bind();
    if (typeof this.options.finished === 'function') {
        this.options.finished.call(this);
    }
}

LayerSelector.prototype = {
    init: function() {
        return this;
    },
    bind: function() {
        var me = this;
        me.$main.find('.form-control')[me.options.enabled ? 'addClass' : 'removeClass']('enabled');
        if (typeof me.options.searchId === 'string') {
            me.$main.on('click', me.options.searchId, function() {
                if (me.options.enabled) {
                    if (typeof me.options.beforeShow === 'function') {
                        if (me.options.beforeShow.call(me) === false) {
                            return false;
                        }
                    }
                    me.show(me);
                }
            });
        }

        me.$main.find('input[type=text]').off('dblclick').on('dblclick', function() {
            if (me.options.enabled) {
                if (typeof me.options.beforeShow === 'function') {
                    if (me.options.beforeShow.call(me) === false) {
                        return false;
                    }
                }
                me.show(me);
                return false;
            }
        });
    },
    select: function(data) {
        var me = this;
        if (typeof me.options.beforeSelect === 'function') {
            if (me.options.beforeSelect.apply(this, arguments) === false) {
                return false;
            }
        }
        if (typeof me.options.min === 'number' && data.length < me.options.min) {
            main.layer.alert(app.renderText(me.locale.min, {
                min: me.options.min
            }))
            return false;
        }
        if (typeof me.options.max === 'number' && data.length > me.options.max) {
            main.layer.alert(app.renderText(me.locale.max, {
                max: me.options.max
            }))
            return false;
        }
        main.layer.close(me.index);
        if (typeof me.options.callback === 'function') {
            if (me.options.callback.apply(this, arguments) === false) {
                return false
            }
        }
        me.render(me.$main, data);
        if (me.options.related) {
            var $related = $(me.options.related);
            $related.length > 0 && me.render($related, data);
        }
    },
    render: function($el, data) {
        var me = this,
            prop,
            value;
        $el.each(function() {
            var $this = $(this);
            if (this.nodeName === 'INPUT') {
                var name = $this.attr('name');
                if (name) {
                    value = app.getArrayKeys(data, name);
                    $this.val(value.join(',')).trigger('input');
                }
                return true;
            }
            $this.find('input:not([data-temp])').each(function() {
                var $ipt = $(this),
                    name = $ipt.attr('name');
                if (name) {
                    value = app.getArrayKeys(data, name);
                    $ipt.val(value.join(',')).trigger('input');
                }
            });
            $this.find('[data-temp]').each(function() {
                var $elem = $(this),
                    content = [],
                    name = $elem.data('temp');
                if ($.isArray(data)) {
                    $.map(data, function(item){
                        content.push(app.renderText(name, item));
                    })
                    content = content.join(',');
                } else {
                    content = app.renderText(name, item);
                }
                $elem[this.nodeName === 'INPUT' ? 'val' : 'html'](content).trigger('input');
            });
        });
    },
    destroy: function() {
        if (this.index) {
            main.layer.close(this.index);
        }
    },
    enabled: function(enabled) {
        var me = this;
        if (typeof enabled === 'boolean' && enabled !== me.options.enabled) {
            me.options.enabled = enabled;
            me.$main.find('.form-control')[enabled ? 'addClass' : 'removeClass']('enabled');
        }
    },
    isEnabled: function() {
        return this.options.enabled;
    },
    empty: function() {
        var me = this,
            $related,
            data = [];
        if (me.options.cache) {
            me.options.cache = null;
        }
        if (typeof me.options.callback === 'function') {
            if (me.options.callback.call(this, data) === false) {
                return false
            }
        }
        me.render(me.$main, data);
        if (me.options.related) {
            $related = $(me.options.related);
            $related.length > 0 && me.render($related, data);
        }
    }
}

LayerSelector.defaults = {
    type: null,
    related: null,
    helper: null,
    callback: null,
    beforeSelect: null,
    locale: 'zh-CN',
    enabled: true,
    searchId: '.search-icon',
    cache: null,
    finished: null,
    beforeShow: null,
    min: null,
    max: null,
    error: null
}

LayerSelector.LOCALES = {};

LayerSelector.LOCALES['en'] = {
    btn: ['confirm', 'cancel'],
    max: 'Please select at most {max} rows',
    min: 'Please select at least {min} rows',
    QUERY_EMPTY: 'Please enter the query conditions'
}

LayerSelector.LOCALES['zh-CN'] = {
    btn: ['确定', '取消'],
    max: '请最多选中{max}条数据',
    min: '请至少选中{min}条数据',
    QUERY_EMPTY: '请输入查询条件'
}

if (localStorage) {
    var lng = localStorage.getItem('i18nextLng');
    if (typeof lng === 'string' && $.inArray(lng, Object.keys(LayerSelector.LOCALES)) !== -1) {
        LayerSelector.defaults.locale = lng;
    }
}

$.fn.layerSelector = function(settings) {
    var result,
        args = Array.prototype.slice.call(arguments, 1);
    this.each(function() {
        var $this = $(this),
            options,
            layerSelector = $this.data('layerSelector');
        if (typeof settings === 'string') {
            if (!layerSelector) return;
            if (typeof layerSelector[settings] === 'function') {
                result = layerSelector[settings].apply(layerSelector, args);
            }
            if (settings === 'destroy') {
                $this.removeData('layerSelector');
            }
        }
        if (!layerSelector) {
            options = $this.data();
            if (typeof options.query === 'string') options.query = new Function('return ' + options.query)();
            options = $.extend(true, {}, options, settings);
            if (!options.type) options.type = $this.attr('selector');
            options = $.extend(true, {}, LayerSelector.defaults, defaults[options.type], options);
            layerSelector = new LayerSelector($this, options);
            $this.data('layerSelector', layerSelector);
        }
    });
    return typeof result === 'undefined' ? this : result;
};

module.exports = selector;
