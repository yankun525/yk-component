<template>
    <div class="p-t-m p-r-m p-l-m">
        <h2>
            <span>app-tablesettings</span>
            <!-- <a class="link m-l-xl" @click="download">
                <i class="iconfont icon-lianjie"></i>
            </a> -->
        </h2>
        <div>配置表头，配置后会存储到localStorage</div>
        <h3 v-t="'column.prop'"></h3>
        <el-table :data="params">
            <el-table-column :label="$t('column.prop')" prop="props" width="120"></el-table-column>
            <el-table-column :label="$t('column.description')" prop="dsc"></el-table-column>
            <el-table-column :label="$t('column.type')" prop="type" width="120"></el-table-column>
            <el-table-column :label="$t('column.accepted')" prop="value" width="120"></el-table-column>
            <el-table-column :label="$t('column.default')" prop="default" width="120"></el-table-column>
        </el-table>
        <h3 class="p-t-xl">示例</h3>
        <div class="clearfix m-b-m">
            <app-tablesettings class="pull-right" name="user" :data="columns"></app-tablesettings>
        </div>
        <el-table stripe border :height="400" :data="items" ref="table">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column label="编号 姓名">
                <template slot-scope="scope">
                    <a class="link" @click.stop="$alert(getCodeName(scope.row))">{{getCodeName(scope.row)}}</a>
                </template>
            </el-table-column>
            <el-table-column v-for="item in column" :key="item.prop" v-bind="item"></el-table-column>
        </el-table>
        <el-pagination
            :current-page="query.pagenumber"
            :page-size="query.pagesize"
            :total="total"
            @size-change="changeSize"
            @current-change="changePage"
            small
            background
            layout="total, sizes, prev, pager, next, jumper"
            class="pagination-container"
        ></el-pagination>
        <div class="app-highlight">
            <pre v-highlight>
                <code>{{code}}</code>
            </pre>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { getTablePage } from '@/service/mainApi';

export default {
    data() {
        return {
            params: [{
                props: 'name',
                dsc: '表格名称，必填，保持唯一',
                type: 'String',
                value: '',
                default: ''
            }, {
                props: 'data',
                dsc: '表格列配置项',
                type: 'Array',
                value: '',
                default: '[]'
            }],
            columns: [{
                label: this.$t('sys.member.name'),
                prop: 'username',
                show: true,
                disabled: true
            }, {
                label: this.$t('sys.member.code'),
                prop: 'userno',
                show: true,
                disabled: false
            }, {
                label: this.$t('sys.member.phone'),
                prop: 'phone',
                show: true,
                disabled: false
            }, {
                label: this.$t('common.status'),
                prop: 'checkstatus',
                show: true,
                disabled: false,
                width: 90,
                align: 'center'
            }, {
                label: this.$t('sys.member.orgname'),
                prop: 'orgname',
                show: true,
                disabled: false
            }, {
                label: this.$t('sys.member.deptname'),
                prop: 'deptname',
                show: true,
                disabled: false
            }, {
                label: this.$t('sys.member.position'),
                prop: 'position',
                show: true,
                disabled: false
            }, {
                label: this.$t('sys.member.email'),
                prop: 'email',
                show: true,
                disabled: false
            }, {
                label: this.$t('common.remark'),
                prop: 'remark',
                show: false,
                disabled: false
            }, {
                label: '创建日期',
                prop: 'createdtime',
                show: true,
                disabled: false,
                width: 120,
                sortable: true,
                formatter: (row, model, value) => this.$helper.dateFormat(value, 'yyyy-MM-dd')
            }, {
                label: '修改日期',
                prop: 'modifytime',
                show: true,
                disabled: false,
                width: 120,
                sortable: true,
                formatter: (row, model, value) => this.$helper.dateFormat(value, 'yyyy-MM-dd')
            }],
            items: [],
            total: 0,
            query: {
                pagenumber: 1,
                pagesize: 20
            },
            code: '<div class="clearfix m-b-m">\n\
    <app-tablesettings class="pull-right" name="user" :data="columns"></app-tablesettings>\n\
</div>\n\
<el-table stripe border :height="400" :data="items" ref="table">\n\
    <el-table-column type="selection" width="40"></el-table-column>\n\
    <el-table-column label="编号 名称">\n\
        <template slot-scope="scope">\n\
            <a class="link" @click.stop="$alert(getCodeName(scope.row))">{{getCodeName(scope.row)}}</a>\n\
        </template>\n\
    </el-table-column>\n\
    <el-table-column v-for="item in column" :key="item.prop" v-bind="item"></el-table-column>\n\
</el-table>\n\
<el-pagination\n\
    :current-page="query.pagenumber"\n\
    :page-size="query.pagesize"\n\
    :total="total"\n\
    @size-change="changeSize"\n\
    @current-change="changePage"\n\
    small\n\
    background\n\
    layout="total, sizes, prev, pager, next, jumper"\n\
    class="pagination-container"\n\
></el-pagination>\n\n\
data() {\n\
    return {\n\
        columns: [{\n\
            label: this.$t(\'sys.member.name\'),\n\
            prop: \'username\',\n\
            show: true,\n\
            disabled: true\n\
        }, {\n\
            label: this.$t(\'sys.member.name\'),\n\
            prop: \'userno\',\n\
            show: true\n\
            disabled: false\n\
        }, {\n\
            label: this.$t(\'sys.member.phone\'),\n\
            prop: \'phone\',\n\
            show: true,\n\
            disabled: false\n\
        }, {\n\
            label: this.$t(\'common.status\'),\n\
            prop: \'checkstatus\',\n\
            show: true,\n\
            disabled: false,\n\
            width: 90,\n\
            align: \'center\'\n\
        }, {\n\
            label: this.$t(\'sys.member.orgname\'),\n\
            prop: \'orgname\',\n\
            show: true,\n\
            disabled: false\n\
        }, {\n\
            label: this.$t(\'sys.member.deptname\'),\n\
            prop: \'deptname\',\n\
            show: true,\n\
            disabled: false\n\
        }, {\n\
            label: this.$t(\'sys.member.position\'),\n\
            prop: \'position\',\n\
            show: true,\n\
            disabled: false\n\
        }, {\n\
            label: this.$t(\'sys.member.email\'),\n\
            prop: \'email\',\n\
            show: true,\n\
            disabled: false\n\
        }, {\n\
            label: this.$t(\'common.remark\'),\n\
            prop: \'remark\',\n\
            show: false,\n\
            disabled: false\n\
        }, {\n\
            label: \'创建日期\',\n\
            prop: \'createdtime\',\n\
            show: true,\n\
            disabled: false,\n\
            width: 120,\n\
            sortable: true,\n\
            formatter: (row, model, value) => this.$helper.dateFormat(value, \'yyyy-MM-dd\')\n\
        }, {\n\
            label: \'修改日期\',\n\
            prop: \'modifytime\',\n\
            show: true,\n\
            disabled: false,\n\
            width: 120,\n\
            sortable: true,\n\
            formatter: (row, model, value) => this.$helper.dateFormat(value, \'yyyy-MM-dd\')\n\
        }],\n\
        items: [],\n\
        total: 0,\n\
        query: {\n\
            pagenumber: 1,\n\
            pagesize: 20,\n\
        }\n\
    }\n\
},\n\
computed: {\n\
    column() {\n\
        var column = [];\n\
        this.columns.map(item => {\n\
            item.show && column.push(item);\n\
        });\n\
        setTimeout(() => this.initColumn());\n\
        return column;\n\
    },\n\
    getCodeName() {\n\
        return row => [row.userno, row.username].join(\' \');\n\
    }\n\
},\n\
methods: {\n\
    changeSize(size) {\n\
        this.query.pagesize = size;\n\
        this.load();\n\
    },\n\
    changePage(page) {\n\
        this.query.pagenumber = page;\n\
        this.load();\n\
    },\n\
    async load() {\n\
        var res = await getTablePage(this.query);\n\
        if (res.code !== \'success\') {\n\
            this.$message.error(res.message);\n\
            return false;\n\
        }\n\
        this.items = res.data.items;\n\
        this.total = res.data.total;\n\
    }\n\
},\n\
created() {\n\
    var me = this;\n\
    this.load();\n\
    this.columnRender = {\n\
        userno: this._u([{\n\
            key: \'default\',\n\
            fn: function (scope) {\n\
                return [me._c(\'div\', {\n\
                    class: \'cell\'\n\
                }, [me._c(\'a\', {\n\
                    staticClass: \'link\',\n\
                    on: {\n\
                        click: function ($event) {\n\
                            $event.stopPropagation();\n\
                            me.$alert(scope.row.userno);\n\
                        }\n\
                    }\n\
                }, [me._v(me._s(scope.row.userno))])])];\n\
            }\n\
        }]),\n\
        checkstatus: this._u([{\n\
            key: \'default\',\n\
            fn: function (scope) {\n\
                var status = scope.row.checkstatus,\n\
                    classes = \'\';\n\
                if (status === \'10\') {\n\
                    classes = \'text-info\';\n\
                } else if (status === \'20\') {\n\
                    classes = \'text-blue\';\n\
                } else if (status === \'30\') {\n\
                    classes = \'text-success\';\n\
                } else if (status === \'40\') {\n\
                    classes = \'text-danger\';\n\
                } else if (status === \'50\') {\n\
                    classes = \'text-error\';\n\
                }\n\
                return [me._c(\'div\', {\n\
                    class: classes\n\
                }, [me._v(me._s(me.$select.text(\'checkstatus\', scope.row.checkstatus)))])];\n\
            }\n\
        }])\n\
    };\n\
}'
    };
},
    computed: {
        ...mapState({
            ch: state => state.ch
        }),
        column() {
            var column = [];
            this.columns.map(item => {
                item.show && column.push(item);
            });
            setTimeout(() => this.initColumn());
            return column;
        },
        getCodeName() {
            return row => [row.userno, row.username].join(' ');
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
        async load() {
            var res = await getTablePage(this.query);
            if (res.code !== 'success') {
                this.$message.error(res.message);
                return false;
            }
            this.items = res.data.items;
            this.total = res.data.total;
        }
        // download() {
        //     this.$helper.export('/plugins/tablesettings.vue');
        // }
    },
    created() {
        var me = this;
        this.load();
        this.columnRender = {
            userno: this._u([{
                key: 'default',
                fn: function (scope) {
                    return [me._c('div', {
                        class: 'cell'
                    }, [me._c('a', {
                        staticClass: 'link',
                        on: {
                            click: function ($event) {
                                $event.stopPropagation();
                                me.$alert(scope.row.userno);
                            }
                        }
                    }, [me._v(me._s(scope.row.userno))])])];
                }
            }]),
            checkstatus: this._u([{
                key: 'default',
                fn: function (scope) {
                    var status = scope.row.checkstatus,
                        classes = '';
                    if (status === '10') {
                        classes = 'text-info';
                    } else if (status === '20') {
                        classes = 'text-blue';
                    } else if (status === '30') {
                        classes = 'text-success';
                    } else if (status === '40') {
                        classes = 'text-danger';
                    } else if (status === '50') {
                        classes = 'text-error';
                    }
                    return [me._c('div', {
                        class: classes
                    }, [me._v(me._s(me.$select.text('checkstatus', scope.row.checkstatus)))])];
                }
            }])
        };
    }
};
</script>

<style lang="less">
.app-center-main {
    padding-right: 44px;
}
.app-center-search {
    position: absolute;
    right: 44px;
    top: 10px;
    width: 160px;
    &.el-input--small .el-input__inner {
        border-radius: 16px;
        height: 28px;
        line-height: 28px;
        padding-left: 16px;
    }
    .el-input__suffix {
        right: 10px;
        .icon-sousuo {
            font-size: 12px;
            line-height: 28px;
        }
    }
}
.app-center-target {
    position: absolute;
    right: 16px;
    top: 82px;
    bottom: 0;
    overflow: hidden;
    width: 12px;
    text-align: center;
    a {
        display: block;
        color: #666666;
        height: 16px;
        cursor: pointer;
    }
}
.app-center-main-target {
    height: 22px;
    line-height: 18px;
    color: #000000;
    font-weight: bold;
    padding-bottom: 4px;
    border-bottom: 1px dashed #E5E5E5;
}
.app-center-apps {
    margin: 0 -16px 0 0;
    padding: 32px 0 16px;
    li {
        position: relative;
        float: left;
        width: 122px;
        border: 1px solid #E5E5E5;
        border-radius: 8px;
        margin-right: 16px;
        margin-bottom: 16px;
        padding: 16px 8px;
        text-align: center;
        img {
            height: 56px;
            margin-left: 24px;
            float: left;
        }
        > div {
            height: 18px;
            margin-top: 16px;
            width: 100%;
            float: left;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .icon-biaoshi-s {
            position: absolute;
            right: 10px;
            top: -1px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            color: #FD9234;
        }
    }
}
.dialog-app-left {
    width: 500px;
    float: left;
}
.dialog-app-title {
    padding-bottom: 23px;
    border-bottom: 1px dashed #E5E5E5;
    img {
        height: 66px;
        float: left;
    }
    p {
        margin-left: 86px;
        height: 24px;
        line-height: 24px;
        margin-top: 7px;
        margin-bottom: 0;
        font-size: 14px;
        font-weight: bold;
        &:last-child {
            color: #666666;
            height: 18px;
            line-height: 18px;
            font-size: 12px;
            font-weight: normal;
            margin-top: 2px;
        }
    }
    .icon-biaoshi-s {
        float: right;
        font-size: 20px;
        cursor: pointer;
        color: #FD9234;
    }
    .icon-biaoshi {
        float: right;
        font-size: 20px;
        cursor: pointer;
        color: #666666;
    }
}
.dialog-app-content {
    margin: 24px 0 0;
    padding: 0;
    li {
        margin-bottom: 16px;
        &:last-child {
            margin-bottom: 0;
        }
        label {
            width: 48px;
            text-align: right;
            float: left;
            font-weight: bold;
        }
        div {
            width: 436px;
            float: right;
        }
    }
}
.dialog-app-right {
    width: 288px;
    float: right;
    padding-left: 24px;
    p {
        height: 18px;
        line-height: 18px;
        margin: 8px 0;
    }
    div {
        height: 288px;
        overflow-y: auto;
    }
}
.dialog-app-tag {
    line-height: 30px;
}
</style>