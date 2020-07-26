/**
 * 公共配置项
 * form            指定父组件对应表单对象
 * disabled        是否不允许修改
 * clickEnabled    是否开启单击表格触发选中事件
 * dblClickEnabled 是否开启双击表格触发选中事件
 * copy            是否允许拷贝 开启后页面会显示是否拷贝选择框 是否选中会传回callback函数
 * copyed          开启允许拷贝后 设置默认拷贝状态
 * beforeShow      打开dialog前回调 如果返回false则取消打开dialog
 * beforeSelect    触发选中后回调 如果返回false 则不关闭弹框
 * callback        触发选中后回调 如果返回false 则不执行渲染函数
 * firstOnly       只选择树第一层节点
 * leafOnly        只选择树最后一层节点
 * single          节点是否单选
 * parentNameShow  是否按组织结构将父节点都显示出来
 * levelShow       是否展示全部层级
 * checkLogin      是否需要设置跳过登录校验
 * params          设置需要传递给后端参数
 * queryParams     设置传递给后端参数的回调方法
 * 
 * 私有配置项
 * temp            设置选择器上显示的表达式 如'工号{userno}, 姓名{username}'
 * prop            指定form表单里数组对象存放的key值 如果单选则配置除配置项参数以外的数据如code(form的key)=orgcode(内部的key)
 */
import helper from '@/plugins/helper';

const tools = {
    props: {
        form: {
            type: Object
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
        firstOnly: {
            type: Boolean,
            default: false
        },
        leafOnly: {
            type: Boolean,
            default: false
        },
        single: {
            type: Boolean,
            default: false
        },
        levelShow: {
            type: Boolean,
            default: false
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
        checkChange(data) {
            var tree = this.$refs.tree,
                node = tree.getNode(data);
            if (this.single) {
                if (node.checked) {
                    tree.setCheckedKeys([data[this.nodeKey]]);
                }
            } else {
                if (node.checked) {
                    this.checkoutChildren(node.childNodes, tree);
                    this.checkoutParent(node.parent, tree);
                }
            }
        },
        checkoutParent(node, tree) {
            if (node) {
                tree.setChecked(node.data, false);
                this.checkoutParent(node.parent, tree);
            }
        },
        checkoutChildren(node, tree) {
            if (Array.isArray(node)) {
                node.map(item => {
                    tree.setChecked(item.data, false);
                    this.checkoutChildren(item.childNodes, tree);
                });
            }
        },
        show() {
            var node;
            if (this.disabled || this.beforeShow.apply(this) === false) {
                return false;
            }
            if (this.single) {
                node = this.form[this.noField];
                node = node ? [node] : [];
            } else {
                node = this.form[this.prop];
                node = Array.isArray(node) ? helper.getArrayKeys(node, this.nodeKey) : [];
            }
            if (this.$refs.tree) {
                this.$refs.tree.setCheckedKeys(node);
            } else {
                this.checked = node;
            }
            this.visible = true;
        },
        confirm() {
            this.select(this.$refs.tree.getCheckedNodes());
        },
        select(data) {
            var args = [data];
            args.push(this.form);
            if (this.copy) args.push(this.copyed);
            if (this.beforeSelect.apply(this, args) === false) return false;
            this.visible = false;
            if (this.callback.apply(this, args) === false) return false;
            this.render(this.single ? data.length ? data[0] : {} : data);
        },
        initProp() {
            this.field = {};
            this.keys = [];
            this.prop.split(',').map(keys => {
                var key = keys.split('='),
                    name = key[1] || key[0];
                key = key[0];
                if (name) {
                    this.keys.push(name);
                    this.field[name] = key;
                }
            });
        },
        render(data) {
            if (this.single) {
                if (typeof data !== 'object') data = {};
                this.form[this.noField] = this.getCode(data);
                if (this.levelShow) {
                    this.form[this.nameField] = this.setFatherName(data);
                } else {
                    this.form[this.nameField] = this.getName(data);
                }
                this.keys.map(key => {
                    this.form[this.field[key]] = data[key];
                });
            } else {
                this.form[this.prop] = Array.isArray(data) ? data : [];
            }
        },
        setItem() {
            var html = [];
            if (this.single) {
                if (this.temp) {
                    this.value = helper.renderText(this.temp, this.form);
                } else {
                    this.value = this.form[this.nameField] || '';
                }
            } else {
                if (Array.isArray(this.form[this.prop])) {
                    if (this.temp) {
                        this.form[this.prop].map(item => html.push(helper.renderText(this.temp, item)));
                    } else {
                        this.form[this.prop].map(item => {
                            html.push(this.levelShow ? this.setFatherName(item) : this.getName(item));
                        });
                    }
                }        
                this.value = html.join(',');
            }
        },
        empty() {
            this.render(this.single ? {} : []);
        },
        getParams() {
            var params = helper.extend({}, this.query, this.params);
            return this.queryParams(params);
        },
        setFatherName(data) {
            var node = this.$refs.tree.getNode(data),
                name = [];
            if (!node) return '';
            this.getFatherName(name, node);
            return name.join('/');
        },
        getFatherName(name, node) {
            if (!node || !node.level) return false;
            name.unshift(this.getName(node.data));
            this.getFatherName(name, node.parent);
        }
    }
};

export default tools;
