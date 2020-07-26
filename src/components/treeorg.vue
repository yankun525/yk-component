<template>
    <div @dblclick="show" @click="show">
        <slot>
            <el-input v-model="value" :title="value" suffix-icon="el-input__icon iconfont icon-sousuo-o" :disabled="disabled" readonly></el-input>
        </slot>
        <el-dialog :title="$t('common.managementdept')" v-if="resetTree" :visible.sync="visible" width="648px" append-to-body class="app-dialog">
            <div class="app-dialog-tree">
                <el-tree ref="tree" :props="treeProp" :load="load" lazy :node-key="nodeKey" show-checkbox :class="{'leaf-only': leafOnly}" :default-checked-keys="checked" check-strictly @check="checkChange">
                    <span class="custom-tree-node" slot-scope="{node}">
                        <span>{{node.label}}</span>
                    </span>
                </el-tree>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="visible=false" v-t="'button.cancel'"></el-button>
                <el-button type="primary" @click="confirm" v-t="'button.confirm'"></el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import helper from '@/plugins/helper';
import treetools from './treetools';
import { getTree } from '@/service/mainApi';

export default {
    props: helper.extend({}, treetools.props, {
        temp: {
            type: String,
            default: ''
        },
        parentid: {
            type: String,
            default: ''
        },
        noField: {
            type: String,
            default: 'deptcode'
        },
        nameField: {
            type: String,
            default: 'deptname'
        },
        prop: {
            type: String,
            default: 'orgList'
        },
        nodeKey: {
            type: String,
            default: 'orgcode'
        }
    }),
    data() {
        var me = this;
        return {
            items: [],
            checked: [],
            value: '',
            visible: false,
            resetTree: true,
            treeProp: {
                label: 'orgname',
                children: 'sunList',
                isLeaf(data) {
                    return me.firstOnly ? true : data.isleaf === 1;
                }
            }
        };
    },
    methods: helper.extend({}, treetools.methods, {
        async load(node, resolve) {
            var res,
                params = this.getParams();
            if (this.abort) this.abort();
            params.id = !node.level ? this.parentid : node.data.id;
            res = this.checkLogin ? await getTree(params, abort => {
                this.abort = abort;
            }) : await getTree(params, abort => {
                this.abort = abort;
            });
            if (res.code !== 'success') {
                this.$message.error(res.message);
                return false;
            }
            typeof resolve === 'function' && resolve(res.data);
        },
        getCode(item) {
            return item.orgcode;
        },
        getName(item) {
            return item.orgname;
        }
    }),
    created() {
        if (this.single) {
            this.initProp();
            this.$watch('form.' + this.nameField, () => {
                setTimeout(() => this.setItem());
            });
        } else {
            this.$watch('form.' + this.prop, () => {
                setTimeout(() => this.setItem());
            });
        }
        this.$watch('parentid', () => {
            // var tree = this.$refs.tree;
            // if (!tree) return;
            // tree.root.childNodes.map(node => {
            //     tree.root.removeChild(node);
            // });
            // this.load(tree.root, data => {{
            //     tree.root.doCreateChildren(data);
            //     tree.store._initDefaultCheckedNodes();
            // });
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            this.timer = setTimeout(() => {
                this.resetTree = false;
                this.$nextTick(() => {
                    this.resetTree = true;
                });
                this.render();
            }, 100);
        });
        this.setItem();
    }
};
</script>
