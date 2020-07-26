<template>
    <el-dropdown class="app-table-settings" trigger="click" :hide-on-click="false" size="small">
        <span class="el-dropdown-link">
            <i class="iconfont icon-tijiao"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in data" :key="item.prop">
                <el-checkbox v-model="item.show" :disabled="item.disabled">{{item.label}}</el-checkbox>
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
export default {
    name: 'tablesettings',
    props: {
        data: {
            type: Array,
            default: function() {
                return [];
            }
        },
        name: {
            type: String
        }
    },
    data() {
        return {};
    },
    methods: {
        initColumn(vm) {
            var me = this;
            if (vm.columnRender) {
                Object.keys(vm.columnRender).map(field => {
                    var column = this.getColumn(field, vm);
                    if (column && vm.columnRender[field]) {
                        column.columnConfig.renderCell = function(h, data) {
                            return vm.columnRender[field].default(data);
                        };
                    }
                });
            }
            this.setStorage();
        },
        getColumn(prop, vm) {
            var k = 0,
                column,
                columns = vm.$refs.table.$children,
                len = columns.length;
            while (k < len) {
                column = columns[k];
                if (column.prop && column.prop === prop) {
                    return column;
                }
                k++;
            }
        },
        getStorage() {
            let data = localStorage ? localStorage.getItem(this.field) : '';
            if (!data) return false;
            data = JSON.parse(data);
            this.data.map(item => {
                if (item.prop && data.hasOwnProperty(item.prop)) {
                    item.show = data[item.prop];
                }
            });
        },
        setStorage() {
            let data = {};
            if (!localStorage) return false;
            this.data.map(item => {
                data[item.prop] = item.show;
            });
            localStorage.setItem(this.field, JSON.stringify(data));
        }
    },
    created() {
        let me = this;
        this.field = this.name.toLocaleUpperCase() + '_COLUMN';
        this.getStorage();
        this.$parent.initColumn = function() {
            me.initColumn(this);
        };
    }
};
</script>

<style lang="css">
.app-table-settings {
    display: inline-block;
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 2px;
}
</style>
