<template>
    <div class="p-t-m p-r-m p-l-m">
        <h2>
            <span>el-table 参数扩展</span>
        </h2>
        <div>el-table 基础上增加了扩展参数，扩展方法。</div>
        <h3 v-t="'column.prop'"></h3>
        <el-table :data="params">
            <el-table-column :label="$t('column.prop')" prop="props" width="120"></el-table-column>
            <el-table-column :label="$t('column.description')" prop="dsc"></el-table-column>
            <el-table-column :label="$t('column.type')" prop="type" width="120"></el-table-column>
            <el-table-column :label="$t('column.accepted')" prop="value" width="120"></el-table-column>
            <el-table-column :label="$t('column.default')" prop="default" width="120"></el-table-column>
        </el-table>
        <h3 v-t="'column.methods'"></h3>
        <el-table :data="methods">
            <el-table-column :label="$t('column.methods')" prop="methods" width="120"></el-table-column>
            <el-table-column :label="$t('column.description')" prop="dsc"></el-table-column>
            <el-table-column :label="$t('column.prop')" prop="prop" width="120"></el-table-column>
        </el-table>
        <h3 class="p-t-xl">示例</h3>
        <div class="m-b-m">
            <el-button type="primary" @click="addRow" v-t="'button.new'"></el-button>
            <el-button @click="delRow" v-t="'button.delete'"></el-button>
        </div>
        <el-table :data="items" ref="table" height="360" stripe border clickToSelect>
            <el-table-column type="selection" width="45"></el-table-column>
            <el-table-column :label="$t('common.operate')" width="80">
                <template slot-scope="scope">
                    <el-button type="text" size="mini" @click.stop="modRow(scope.row, scope.$index)" v-t="'button.modify'"></el-button>
                </template>
            </el-table-column>
            <el-table-column prop="paramcode" :label="$t('sys.parameter.code')"></el-table-column>
            <el-table-column prop="paramname" :label="$t('sys.parameter.name')"></el-table-column>
            <el-table-column prop="paramtype" :label="$t('sys.parameter.level')"></el-table-column>
            <el-table-column prop="paramvalue" :label="$t('sys.parameter.value')"></el-table-column>
            <el-table-column prop="remark" :label="$t('common.remark')"></el-table-column>
        </el-table>
        <div class="app-highlight">
            <pre v-highlight>
                <code>{{code}}</code>
            </pre>
        </div>
        <el-table :data="tableData" singleSelect clickToSelect stripe class="table-single">
            <el-table-column type="selection" width="45"></el-table-column>
            <el-table-column prop="paramcode" :label="$t('sys.parameter.code')"></el-table-column>
            <el-table-column prop="paramname" :label="$t('sys.parameter.name')"></el-table-column>
            <el-table-column prop="paramtype" :label="$t('sys.parameter.level')"></el-table-column>
            <el-table-column prop="paramvalue" :label="$t('sys.parameter.value')"></el-table-column>
            <el-table-column prop="remark" :label="$t('common.remark')"></el-table-column>
        </el-table>
        <div class="app-highlight">
            <pre v-highlight>
                <code>{{code1}}</code>
            </pre>
        </div>
        <h3>源码 引入element-ui后执行</h3>
        <div class="app-highlight">
            <pre v-highlight>
                <code>{{code2}}</code>
            </pre>
        </div>
        <el-dialog :title="title" :visible.sync="visible" width="640px" append-to-body class="app-dialog">
            <el-form :model="form" label-width="90px">
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item :label="$t('sys.parameter.code')">
                            <el-input v-model="form.paramcode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('sys.parameter.level')">
                            <el-input v-model="form.paramtype"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item :label="$t('sys.parameter.name')">
                            <el-input v-model="form.paramname"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item :label="$t('sys.parameter.value')">
                            <el-input v-model="form.paramvalue"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item :label="$t('common.remark')">
                            <el-input type="textarea" rows="4" v-model="form.remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="visible=false" v-t="'button.cancel'"></el-button>
                <el-button @click="save" type="primary" v-t="'button.confirm'"></el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getParams } from '@/service/mainApi';

export default {
    data() {
        return {
            params: [{
                props: 'singleSelect',
                dsc: '表格单选，选中行后取消其它行的选中状态',
                type: 'Boolean',
                value: 'true',
                default: 'false'
            }, {
                props: 'clickToSelect',
                dsc: '点击行选中该行',
                type: 'Boolean',
                value: 'true',
                default: 'false'
            }],
            methods: [{
                methods: 'delSltRow',
                dsc: '删除选中行',
                prop: ''
            }],
            title: '',
            visible: false,
            items: [],
            form: {
                paramcode: '',
                paramname: '',
                paramtype: '',
                paramvalue: '',
                remark: ''
            },
            tableData: [],
            code: '<div class="m-b-m">\n\
    <el-button type="primary" @click="addRow" v-t="\'button.new\'"></el-button>\n\
    <el-button @click="delRow" v-t="\'button.delete\'"></el-button>\n\
</div>\n\
<el-table :data="items" ref="table" height="360" stripe border clickToSelect>\n\
    <el-table-column type="selection" width="45"></el-table-column>\n\
    <el-table-column :label="$t(\'common.operate\')" width="80">\n\
        <template slot-scope="scope">\n\
            <el-button type="text" size="mini" @click.stop="modRow(scope.row, scope.$index)" v-t="\'button.modify\'"></el-button>\n\
        </template>\n\
    </el-table-column>\n\
    <el-table-column prop="paramcode" :label="$t(\'sys.parameter.code\')"></el-table-column>\n\
    <el-table-column prop="paramname" :label="$t(\'sys.parameter.name\')"></el-table-column>\n\
    <el-table-column prop="paramtype" :label="$t(\'sys.parameter.level\')"></el-table-column>\n\
    <el-table-column prop="paramvalue" :label="$t(\'sys.parameter.value\')"></el-table-column>\n\
    <el-table-column prop="remark" :label="$t(\'common.remark\')"></el-table-column>\n\
</el-table>\n\
<el-dialog :title="title" :visible.sync="visible" width="640px" append-to-body class="app-dialog">\n\
    <el-form :model="form" label-width="80px">\n\
        <el-row :gutter="24">\n\
            <el-col :span="12">\n\
                <el-form-item :label="$t(\'sys.parameter.code\')">\n\
                    <el-input v-model="form.paramcode"></el-input>\n\
                </el-form-item>\n\
            </el-col>\n\
            <el-col :span="12">\n\
                <el-form-item :label="$t(\'sys.parameter.level\')">\n\
                    <el-input v-model="form.paramtype"></el-input>\n\
                </el-form-item>\n\
            </el-col>\n\
            <el-col :span="24">\n\
                <el-form-item :label="$t(\'sys.parameter.name\')">\n\
                    <el-input v-model="form.paramname"></el-input>\n\
                </el-form-item>\n\
            </el-col>\n\
            <el-col :span="24">\n\
                <el-form-item :label="$t(\'sys.parameter.value\')">\n\
                    <el-input v-model="form.paramvalue"></el-input>\n\
                </el-form-item>\n\
            </el-col>\n\
            <el-col :span="24">\n\
                <el-form-item :label="$t(\'common.remark\')">\n\
                    <el-input type="textarea" rows="4" v-model="form.remark"></el-input>\n\
                </el-form-item>\n\
            </el-col>\n\
        </el-row>\n\
    </el-form>\n\
    <div slot="footer" class="dialog-footer">\n\
        <el-button @click="visible=false" v-t="\'button.cancel\'"></el-button>\n\
        <el-button @click="save" type="primary" v-t="\'button.confirm\'"></el-button>\n\
    </div>\n\
</el-dialog>\n\
data() {\n\
    return {\n\
        title: \'\',\n\
        visible: false,\n\
        items: [],\n\
        form: {\n\
            paramcode: \'\',\n\
            paramname: \'\',\n\
            paramtype: \'\',\n\
            paramvalue: \'\',\n\
            remark: \'\'\n\
        },\n\
    }\n\
},\n\
methods: {\n\
    addRow() {\n\
        this.title = this.$t(\'sys.parameter.newtitle\');\n\
        helper.resetForm(this.form);\n\
        this.index = null;\n\
        this.visible = true;\n\
    },\n\
    modRow(row, index) {\n\
        this.title = this.$t(\'sys.parameter.modtitle\');\n\
        helper.replace(this.form, row);\n\
        this.index = index;\n\
        this.visible = true;\n\
    },\n\
    save() {\n\
        if (this.items[this.index]) {\n\
            helper.replace(this.items[this.index], this.form);\n\
        } else {\n\
            this.items.push(JSON.parse(JSON.stringify(this.form)));\n\
        }\n\
        this.visible = false;\n\
    },\n\
    delRow() {\n\
        this.$refs.table.delSltRow();\n\
    }\n\
},',
            code1: '<el-table :data="tableData" singleSelect clickToSelect stripe class="table-single">\n\
    <el-table-column type="selection" width="40"></el-table-column>\n\
    <el-table-column prop="paramcode" :label="$t(\'sys.parameter.code\')"></el-table-column>\n\
    <el-table-column prop="paramname" :label="$t(\'sys.parameter.name\')"></el-table-column>\n\
    <el-table-column prop="paramtype" :label="$t(\'sys.parameter.level\')"></el-table-column>\n\
    <el-table-column prop="paramvalue" :label="$t(\'sys.parameter.value\')"></el-table-column>\n\
    <el-table-column prop="remark" :label="$t(\'common.remark\')"></el-table-column>\n\
</el-table>',
            code2: 'import ElementUI from \'element-ui\';\n\
/* el-table 组件 */\n\
/* 新增delSltRow方法 删除选中行 */\n\
ElementUI.Table.methods.delSltRow = function() {\n\
    var k = 0,\n\
        item,\n\
        items = this.data,\n\
        len = items.length,\n\
        data = this.selection;\n\
    while (k < len) {\n\
        item = items[k];\n\
        if (data.indexOf(item) !== -1) {\n\
            items.splice(k, 1);\n\
            continue;\n\
        }\n\
        k++;\n\
    }\n\
};\n\
ElementUI.Table.props.clickToSelect = {\n\
    type: Boolean\n\
};\n\
ElementUI.Table.props.singleSelect = {\n\
    type: Boolean\n\
};\n\
ElementUI.Table.mounted = function mounted() {\n\
    var _this2 = this;\n\
    this.bindEvents();\n\
    this.store.toggleRowSelection = function(row, selected) {\n\
        var emitChange = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true,\n\
            changed,\n\
            newSelection;\n\
        if (this.table.singleSelect) {\n\
            this.states.isAllSelected = false;\n\
            if (this.states.selection.length) {\n\
                this.states.selection = [];\n\
            }\n\
            changed = toggleRowStatus(this.states.selection, row, true);\n\
        } else {\n\
            changed = toggleRowStatus(this.states.selection, row, selected);\n\
        }\n\
        if (changed) {\n\
            newSelection = (this.states.selection || []).slice();\n\
            // 调用 API 修改选中值，不触发 select 事件\n\
            if (emitChange) {\n\
                this.table.$emit(\'select\', newSelection, row);\n\
            }\n\
            this.table.$emit(\'selection-change\', newSelection);\n\
        }\n\
    };\n\
    this.store.updateColumns();\n\
    this.doLayout();\n\
    this.resizeState = {\n\
        width: this.$el.offsetWidth,\n\
        height: this.$el.offsetHeight\n\
    };\n\
    this.store.states.columns.forEach(function (column) {\n\
        if (column.filteredValue && column.filteredValue.length) {\n\
            _this2.store.commit(\'filterChange\', {\n\
                column: column,\n\
                values: column.filteredValue,\n\
                silent: true\n\
            });\n\
        }\n\
    });\n\
    this.$ready = true;\n\
};\n\
ElementUI.Table.components.TableBody.methods.handleClick = function(event, row) {\n\
    this.store.commit(\'setCurrentRow\', row);\n\
    this.handleEvent(event, row, \'click\');\n\
    if (this.$parent.clickToSelect) {\n\
        this.$parent.toggleRowSelection(row);\n\
    }\n\
};\n\
function toggleRowStatus(items, row, selected) {\n\
    var changed = false,\n\
        index = items.indexOf(row);\n\
    if (typeof selected === \'boolean\') {\n\
        if (selected && index === -1) {\n\
            items.push(row);\n\
            changed = true;\n\
        } else if (!selected && index !== -1) {\n\
            items.splice(index, 1);\n\
            changed = true;\n\
        }\n\
    } else {\n\
        if (index === -1) {\n\
            items.push(row);\n\
            changed = true;\n\
        } else {\n\
            items.splice(index, 1);\n\
            changed = true;\n\
        }\n\
    }\n\
    return changed;\n\
}'
        };
    },
    methods: {
        addRow() {
            this.title = this.$t('sys.parameter.newtitle');
            helper.resetForm(this.form);
            this.index = null;
            this.visible = true;
        },
        modRow(row, index) {
            this.title = this.$t('sys.parameter.modtitle');
            helper.replace(this.form, row);
            this.index = index;
            this.visible = true;
        },
        save() {
            if (this.items[this.index]) {
                helper.replace(this.items[this.index], this.form);
            } else {
                this.items.push(JSON.parse(JSON.stringify(this.form)));
            }
            this.visible = false;
        },
        delRow() {
            this.$refs.table.delSltRow();
        }
    },
    created() {
        getParams().then(res => {
            res = res.data.items;
            this.items = JSON.parse(JSON.stringify(res));
            this.tableData = JSON.parse(JSON.stringify(res));
        });
    }
};
</script>
