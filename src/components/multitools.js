/**
 * 公共配置项
 * form            指定父组件对应表单对象     
 * prop            设置数组对象和选择器的数组对象的属性转换规则
 *                 例: 'username,org=orgname'
 *                 转换过来就是
 *                 数组对象对应字段为 username,org
 *                 选择器的数组对象对应字段为 username,orgname
 * disabled        是否不允许修改
 * clickEnabled    是否开启单击表格触发选中事件
 * dblClickEnabled 是否开启双击表格触发选中事件            
 * temp            设置选择器上显示的表达式 如'工号{userno}, 姓名{username}'
 * undeleted       row上对应字段 设置该行是否允许删除
 * copy            是否允许拷贝 开启后页面会显示是否拷贝选择框 是否选中会传回callback函数
 * copyed          开启允许拷贝后 设置默认拷贝状态
 * beforeShow      打开dialog前回调 如果返回false则取消打开dialog
 * beforeSelect    触发选中后回调 如果返回false 则不关闭弹框
 * callback        触发选中后回调 如果返回false 则不执行渲染函数
 * checkLogin      是否需要设置跳过登录校验
 * params          设置需要传递给后端参数
 * queryParams     设置传递给后端参数的回调方法
 * 
 * 私有配置项
 * field           表单对象对应的数组对象属性
 */
import helper from '@/plugins/helper';

const tools = {
    props: {
        form: {
            type: Object
        },
        prop: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        clickEnabled: {
            type: Boolean,
            default: true
        },
        dblClickEnabled: {
            type: Boolean,
            default: false
        },
        temp: {
            type: String,
            default: ''
        },
        undeleted: {
            type: String,
            default: 'selectable'
        },
        copy: {
            type: Boolean,
            default: false
        },
        copyed: {
            type: Boolean,
            default: false
        },
        beforeShow: {
            type: Function,
            default: function() {
                return true;
            }
        },
        beforeSelect: {
            type: Function,
            default: function() {
                return true;
            }
        },
        callback: {
            type: Function,
            default: function() {
                return true;
            }
        },
        checkLogin: {
            type: Boolean,
            default: false
        },
        params: {
            type: Object
        },
        queryParams: {
            type: Function,
            default: function(params) {
                return params;
            }
        }
    },
    methods: {
        changeSize(size) {
            this.query.pagesize = size;
            this.load();
        },
        changePage(page) {
            this.query.pagenumber = page;
            this.load();
        },
        selectable(row) {
            return !row[this.undeleted];
        },
        singleClick() {
            this.clickEnabled && this.show();
        },
        doubleClick() {
            this.dblClickEnabled && this.show();
        },
        clickRow(item) {
            let table = this.$refs.table;
            if (item[this.undeleted]) return false;
            table.toggleRowSelection(item);
            this.changeRow(item, table.selection.indexOf(item));
        },
        selectRow(section, item) {
            this.changeRow(item, section.indexOf(item));
        },
        changeRow(item, index) {
            let k,
                len,
                row,
                rows = this.rows;
            if (index === -1) {
                k = 0;
                len = rows.length;
                while (k < len) {
                    row = rows[k];
                    if (this.filter(item, row) === true) {
                        this.$refs.rtable.toggleRowSelection(row, false);
                        rows.splice(k, 1);
                        return false;
                    }
                    k++;
                }
            } else {
                rows.push(JSON.parse(JSON.stringify(item)));
                this.$refs.rtable.toggleRowSelection(rows[rows.length - 1], true);
            }
        },
        clickRightRow(row) {
            let k = 0,
                item,
                items = this.items,
                len = items.length;
            if (row[this.undeleted]) return false;
            this.rows.splice(this.rows.indexOf(row), 1);
            while (k < len) {
                item = items[k];
                if (this.filter(item, row) === true) {
                    this.$refs.table.toggleRowSelection(item, false);
                    return false;
                }
                k++;
            }
        },
        selectRightRow(section, row) {
            this.clickRightRow(row);
        },
        changeRightAll() {
            let i = 0,
                row,
                rows = this.rows,
                k,
                item,
                items = this.items,
                len = items.length;
            while (i < rows.length) {
                row = rows[i];
                if (!row[this.undeleted]) {
                    this.$refs.rtable.toggleRowSelection(row, false);
                    rows.splice(i, 1);
                    k = 0;
                    while (k < len) {
                        item = items[k];
                        if (this.filter(item, row)) {
                            this.$refs.table.toggleRowSelection(item, false);
                            break;
                        }
                        k++;
                    }
                    continue;
                }
                i++;
            }
        },
        resetSelect() {
            setTimeout(() => {
                this.rows.map(row => {
                    let k = 0,
                        item,
                        items = this.items,
                        len = items.length;
                    while (k < len) {
                        item = items[k];
                        if (this.filter(item, row)) {
                            item[this.undeleted] = row[this.undeleted] || 0;
                            this.$refs.table.toggleRowSelection(item, true);
                            return false;
                        }
                        k++;
                    }
                });
            });
        },
        show() {
            if (this.disabled || this.beforeShow.apply(this) === false) {
                return false;
            }
            if (this.form && Array.isArray(this.form[this.field])) {
                this.rows = this.initRows(this.form[this.field]);
                setTimeout(() => {
                    this.rows.map(item => {
                        this.$refs.rtable.toggleRowSelection(item, true);
                    });
                });
            } else {
                this.rows = [];
            }
            this.load();
            this.visible = true;
        },
        confirm() {
            this.select(this.rows);
        },
        select(data) {
            let args = [data];
            args.push(this.form[this.field]);
            this.copy && args.push(this.checked);
            if (this.beforeSelect.apply(this, args) === false) {
                return false;
            }
            this.visible = false;
            if (this.callback.apply(this, args) === false) {
                return false;
            }
            this.initData(data);
        },
        empty() {
            this.form[this.field] = [];
        },
        initData(rows) {
            let items = [];
            if (this.keys.length) {
                rows.map(row => {
                    let item = {};
                    this.keys.map(key => {
                        item[this.fields[key]] = row[key];
                    });
                    items.push(item);
                });
                this.form[this.field] = items;
            } else {
                this.form[this.field] = rows;
            }
        },
        initRows(rows) {
            let items = [];
            if (this.keys.length) {
                rows.map(row => {
                    let item = {};
                    this.keys.map(key => {
                        item[key] = row[this.fields[key]];
                    });
                    items.push(item);
                });
                return items;
            } else {
                return JSON.parse(JSON.stringify(rows));
            }
        },
        initProp() {
            this.fields = {};
            this.keys = [];
            this.prop.split(',').map(keys => {
                let key = keys.split('='),
                    name = key[1] || key[0];
                key = key[0];
                if (name) {
                    this.keys.push(name);
                    this.fields[name] = key;
                }
            });
        },
        getParams() {
            let params = helper.extend({}, this.query, this.params);
            return this.queryParams(params);
        }
    }
};

export default tools;
