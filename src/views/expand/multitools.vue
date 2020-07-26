<template>
    <div class="p-l">
        <h2>
            <span>multitools</span>
        </h2>
        <div>多选辅助公用方案。</div>
        <h3 v-t="'column.prop'"></h3>
        <el-table :data="params">
            <el-table-column :label="$t('column.prop')" prop="props" width="120"></el-table-column>
            <el-table-column :label="$t('column.description')" prop="dsc"></el-table-column>
            <el-table-column :label="$t('column.type')" prop="type" width="120"></el-table-column>
            <el-table-column :label="$t('column.accepted')" prop="value" width="120"></el-table-column>
            <el-table-column :label="$t('column.default')" prop="default" width="120"></el-table-column>
        </el-table>
        <h3>回调函数</h3>
        <el-table :data="events">
            <el-table-column :label="$t('column.methods')" prop="props" width="120"></el-table-column>
            <el-table-column :label="$t('column.description')" prop="dsc"></el-table-column>
            <el-table-column :label="$t('column.prop')" prop="params"></el-table-column>
        </el-table>
        <h3 v-t="'column.slot'"></h3>
        <el-table :data="slot">
            <el-table-column :label="$t('column.prop')" prop="props" width="120"></el-table-column>
            <el-table-column :label="$t('column.description')" prop="dsc"></el-table-column>
        </el-table>
        <h3 class="p-t-xl">示例</h3>
        <el-form :model="form">
            <el-row :gutter="24">
                <el-col :span="24">
                    <el-form-item>
                        <app-multimember :form="form"></app-multimember>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item>
                        <app-multimember :form="form" disabled></app-multimember>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item>
                        <app-multimember
                            :form="form"
                            temp="姓名：{name}"
                            field="items"
                            prop="name=username,code=userno,orgname,deptname,position,undeleted"
                            undeleted="undeleted"
                            dblClickEnabled
                            :clickEnabled="false"
                        ></app-multimember>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <p>form.user: {{JSON.stringify(form.user)}}</p>
        <p>form.items: {{JSON.stringify(form.items)}}</p>
        <div class="app-highlight">
            <pre v-highlight>
                <code>{{code}}</code>
            </pre>
        </div>
        <h3>示例</h3>
        <el-form :model="secform">
            <el-row :gutter="24">
                <el-col :span="24">
                    <el-form-item>
                        <app-multimember :form="secform" :beforeShow="beforeShow"></app-multimember>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item>
                        <app-multimember :form="secform" copy :beforeSelect="beforeSelect"></app-multimember>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item>
                        <app-multimember :form="secform" copy copyed :callback="callback"></app-multimember>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <p>secform: {{JSON.stringify(secform)}}</p>
        <div class="app-highlight">
            <pre v-highlight>
                <code>{{seccode}}</code>
            </pre>
        </div>
        <h3>示例</h3>
        <div class="m-b-m">
            <el-button type="primary" @click="addRow" v-t="'button.new'"></el-button>
            <el-button @click="delRow" v-t="'button.delete'"></el-button>
        </div>
        <el-table :data="items" ref="table" height="240" stripe border clickToSelect>
            <el-table-column type="selection" width="45" align="center"></el-table-column>
            <el-table-column prop="type" label="类型">
                <template slot-scope="scope">
                    <el-input @click.stop v-model="scope.row.type"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="编号" :formatter="row => $helper.getArrayKeys(row.user, 'userno').join(',')"></el-table-column>
            <el-table-column label="名称" :formatter="row => $helper.getArrayKeys(row.user, 'username').join(',')"></el-table-column>
            <el-table-column label="邮箱" :formatter="row => $helper.getArrayKeys(row.user, 'email').join(',')"></el-table-column>
            <el-table-column :label="$t('common.operate')" width="80">
                <template slot-scope="scope">
                    <app-multimember :form="scope.row">
                        <el-button type="text" size="mini">选择</el-button>
                    </app-multimember>
                </template>
            </el-table-column>
        </el-table>
        <div class="app-highlight">
            <pre v-highlight>
                <code>{{tablecode}}</code>
            </pre>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            params: [{
                props: 'form',
                dsc: '指定父组件对应数组对象',
                type: 'Array',
                value: '',
                default: '[]'
            }, {
                props: 'field',
                dsc: '设置form表单上对应的key，按各组件对应需求添加',
                type: 'String',
                value: '',
                default: ''
            }, {
                props: 'prop',
                dsc: '设置field上没设置但是表单上需要设置的值',
                type: 'String',
                value: '',
                default: ''
            }, {
                props: 'disabled',
                dsc: '是否不允许修改',
                type: 'Boolean',
                value: 'true',
                default: 'false'
            }, {
                props: 'clickEnabled',
                dsc: '是否开启单击表格触发选中事件',
                type: 'Boolean',
                value: 'false',
                default: 'true'
            }, {
                props: 'dblClickEnabled',
                dsc: '是否开启双击表格触发选中事件',
                type: 'Boolean',
                value: 'true',
                default: 'false'
            }, {
                props: 'temp',
                dsc: '选择器上显示的表达式',
                type: 'String',
                value: '',
                default: ''
            }, {
                props: 'undeleted',
                dsc: 'row上对应的参数名，表示该行是否允许删除',
                type: 'String',
                value: '',
                default: ''
            }, {
                props: 'copy',
                dsc: '是否允许拷贝',
                type: 'Boolean',
                value: 'true',
                default: 'false'
            }, {
                props: 'copyed',
                dsc: '是否允许拷贝开启后，默认是否拷贝',
                type: 'Boolean',
                value: 'true',
                default: 'false'
            }],
            events: [{
                props: 'beforeShow',
                dsc: '打开dialog前回调 如果返回false 则取消打开dialog。',
                params: '(ref: 组件实例化对象)'
            }, {
                props: 'beforeSelect',
                dsc: '触发选中后回调 如果返回false 则不关闭弹框。',
                params: '(data: 选中的数据, checked: 是否拷贝, ref: 组件实例化对象)'
            }, {
                props: 'callback',
                dsc: '触发选中后回调 如果返回false 则不执行渲染函数。',
                params: '(data: 选中的数据, checked: 是否拷贝, ref: 组件实例化对象)'
            }],
            slot: [{
                props: '',
                dsc: '自定义内容'
            }],
            form: {
                user: [],
                items: [{
                    code: '000002',
                    name: '陈红',
                    orgname: '开发单位',
                    deptname: '开发部',
                    position: '后端开发',
                    phone: '15085967094',
                    email: 'chenhong@email.com',
                    undeleted: true
                }]
            },
            code: '<el-form :model="form">\n\
    <el-row :gutter="24">\n\
        <el-col :span="24">\n\
            <el-form-item>\n\
                <app-multimember :form="form"></app-multimember>\n\
            </el-form-item>\n\
        </el-col>\n\
        <el-col :span="24">\n\
            <el-form-item>\n\
                <app-multimember :form="form" disabled></app-multimember>\n\
            </el-form-item>\n\
        </el-col>\n\
        <el-col :span="24">\n\
            <el-form-item>\n\
                <app-multimember\n\
                    :form="form"\n\
                    temp="姓名：{name}"\n\
                    field="items"\n\
                    prop="name=username,code=userno,orgname,deptname,position,undeleted"\n\
                    undeleted="undeleted"\n\
                    dblClickEnabled\n\
                    :clickEnabled="false"\n\
                ></app-multimember>\n\
            </el-form-item>\n\
        </el-col>\n\
    </el-row>\n\
</el-form>\n\n\
data() {\n\
    return {\n\
        form: {\n\
            user: [],\n\
            items: [{\n\
                code: \'000002\',\n\
                name: \'陈红\',\n\
                orgname: \'开发单位\',\n\
                deptname: \'开发部\',\n\
                position: \'后端开发\',\n\
                phone: \'15085967094\',\n\
                email: \'chenhong@email.com\',\n\
                undeleted: true\n\
            }]\n\
        }\n\
    }\n\
}',
            secform: {
                user: []
            },
            seccode: '<el-form :model="secform">\n\
    <el-row :gutter="24">\n\
        <el-col :span="24">\n\
            <el-form-item>\n\
                <app-multimember :form="secform" :beforeShow="beforeShow"></app-multimember>\n\
            </el-form-item>\n\
        </el-col>\n\
        <el-col :span="24">\n\
            <el-form-item>\n\
                <app-multimember :form="secform" copy :beforeSelect="beforeSelect"></app-multimember>\n\
            </el-form-item>\n\
        </el-col>\n\
        <el-col :span="24">\n\
            <el-form-item>\n\
                <app-multimember :form="secform" copy copyed :callback="callback"></app-multimember>\n\
            </el-form-item>\n\
        </el-col>\n\
    </el-row>\n\
</el-form>\n\
<p>secform: {{JSON.stringify(secform)}}</p>\n\n\
data() {\n\
    return {\n\
        secform: {\n\
            user: []\n\
        }\n\
    }\n\
},\n\
methods: {\n\
    beforeShow() {\n\
        console.log(\'beforeShow \', this);\n\
        this.$message.error(\'beforeShow 返回false\');\n\
        return false;\n\
    },\n\
    beforeSelect(data, form, ifcopy) {\n\
        const h = this.$createElement;\n\
        console.log(\'beforeSelect \', this);\n\
        this.$msgbox({\n\
            title: \'beforeSelect\',\n\
            message: h(\'div\', null, [\n\
                h(\'p\', null, \'data: \' + JSON.stringify(data)),\n\
                h(\'p\', null, \'form: \' + JSON.stringify(form)),\n\
                h(\'p\', null, \'ifcopy: \' + ifcopy)\n\
            ])\n\
        });\n\
        return false;\n\
    },\n\
    callback(data, form, ifcopy) {\n\
        const h = this.$createElement;\n\
        console.log(\'callback \', this);\n\
        this.$msgbox({\n\
            title: \'callback\',\n\
            message: h(\'div\', null, [\n\
                h(\'p\', null, \'data: \' + JSON.stringify(data)),\n\
                h(\'p\', null, \'form: \' + JSON.stringify(form)),\n\
                h(\'p\', null, \'ifcopy: \' + ifcopy)\n\
            ])\n\
        });\n\
        return false;\n\
    }\n\
}',
            items: [],
            tablecode: '<div class="m-b-m">\n\
    <el-button type="primary" @click="addRow" v-t="\'button.new\'"></el-button>\n\
    <el-button @click="delRow" v-t="\'button.delete\'"></el-button>\n\
</div>\n\
<el-table :data="items" ref="table" height="240" stripe border clickToSelect>\n\
    <el-table-column type="selection" width="45" align="center"></el-table-column>\n\
    <el-table-column prop="type" label="类型">\n\
        <template slot-scope="scope">\n\
            <el-input @click.stop v-model="scope.row.type"></el-input>\n\
        </template>\n\
    </el-table-column>\n\
    <el-table-column label="编号" :formatter="row => $helper.getArrayKeys(row.user, \'userno\').join(\',\')"></el-table-column>\n\
    <el-table-column label="名称" :formatter="row => $helper.getArrayKeys(row.user, \'username\').join(\',\')"></el-table-column>\n\
    <el-table-column label="邮箱" :formatter="row => $helper.getArrayKeys(row.user, \'email\').join(\',\')"></el-table-column>\n\
    <el-table-column :label="$t(\'common.operate\')" width="80">\n\
        <template slot-scope="scope">\n\
            <app-multimember :form="scope.row">\n\
                <el-button type="text" size="mini">选择</el-button>\n\
            </app-multimember>\n\
        </template>\n\
    </el-table-column>\n\
</el-table>\n\n\
data() {\n\
    return {\n\
        items: []\n\
    }\n\
},\n\
methods: {\n\
    addRow() {\n\
        this.items.push({\n\
            type: \'\',\n\
            user: []\n\
        });\n\
    },\n\
    delRow() {\n\
        this.$refs.table.delSltRow();\n\
    }\n\
}'
        };
    },
    methods: {
        beforeShow() {
            console.log('beforeShow ', this);
            this.$message.error('beforeShow 返回false');
            return false;
        },
        beforeSelect(data, form, ifcopy) {
            const h = this.$createElement;
            console.log('beforeSelect ', this);
            this.$msgbox({
                title: 'beforeSelect',
                message: h('div', null, [
                    h('p', null, 'data: ' + JSON.stringify(data)),
                    h('p', null, 'form: ' + JSON.stringify(form)),
                    h('p', null, 'ifcopy: ' + ifcopy)
                ])
            });
            return false;
        },
        callback(data, form, ifcopy) {
            const h = this.$createElement;
            console.log('callback ', this);
            this.$msgbox({
                title: 'callback',
                message: h('div', null, [
                    h('p', null, 'data: ' + JSON.stringify(data)),
                    h('p', null, 'form: ' + JSON.stringify(form)),
                    h('p', null, 'ifcopy: ' + ifcopy)
                ])
            });
            return false;
        },
        addRow() {
            this.items.push({
                type: '',
                user: []
            });
        },
        delRow() {
            this.$refs.table.delSltRow();
        }
    }
};
</script>
