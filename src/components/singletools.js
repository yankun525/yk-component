/**
 * 公共配置项
 * form            指定父组件对应表单对象
 * prop            设置field上没设置但是表单上需要设置的值
 *                 例: 'username,org=orgname'
 *                 转换过来就是
 *                 form表单对应字段为 username,org
 *                 选择器对应字段为 username,orgname
 * disabled        是否不允许修改
 * clickEnabled    是否开启单击表格触发选中事件
 * dblClickEnabled 是否开启双击表格触发选中事件
 * temp            设置选择器上显示的表达式 如'工号{userno}, 姓名{username}'
 * copy            是否允许拷贝 开启后页面会显示是否拷贝选择框 是否选中会传回callback函数
 * copyed          开启允许拷贝后 设置默认拷贝状态
 * beforeShow      打开dialog前回调 如果返回false 则取消打开dialog
 * beforeSelect    触发选中后回调 如果返回false 则不关闭弹框
 * callback        触发选中后回调 如果返回false 则不执行渲染函数
 * checkLogin      是否需要设置跳过登录校验
 * params          设置需要传递给后端参数
 * queryParams     设置传递给后端参数的回调方法
 * 
 * 私有配置项
 * field           设置form表单上对应的key，按各组件对应需求添加
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
        clickRow(row) {
            this.$refs.table.clearSelection();
            this.$refs.table.toggleRowSelection(row, true);
        },
        selectRow(selection, row) {
            let k = 0,
                len = selection.length,
                item;
            while (k < len) {
                item = selection[k];
                if (item !== row) {
                    this.$refs.table.toggleRowSelection(item, false);
                }
                k++;
            }
        },
        dblclickRow(row) {
            this.select([row]);
        },
        singleClick() {
            this.clickEnabled && this.show();
        },
        doubleClick() {
            this.dblClickEnabled && this.show();
        },
        empty() {
            this.render([]);
        },
        show() {
            if (this.disabled || this.beforeShow.apply(this) === false) {
                return false;
            }
            this.load();
            this.visible = true;
        },
        confirm() {
            this.select(this.$refs.table.selection);
        },
        cancel() {
            this.$refs.table && this.$refs.table.clearSelection();
            this.visible = false;
        },
        select(data) {
            let args = [data];
            args.push(this.form);
            this.copy && args.push(this.checked);
            if (this.beforeSelect.apply(this, args) === false) {
                return false;
            }
            this.$refs.table && this.$refs.table.clearSelection();
            this.visible = false;
            if (this.callback.apply(this, args) === false) {
                return false;
            }
            this.render(data.length ? data[0] : {});
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
        setItem() {
            if (this.temp) {
                this.value = helper.renderText(this.temp, this.form);
            } else {
                this.value = this.form[this.nameField] || '';
            }
        },
        getParams() {
            let params = helper.extend({}, this.query, this.params);
            return this.queryParams(params);
        }
    }
};

export default tools;
