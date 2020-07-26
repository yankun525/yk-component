<template>
    <div @dblclick="doubleClick" @click="singleClick">
        <slot>
            <el-input v-model="value" :title="value" suffix-icon="el-input__icon iconfont icon-sousuo-o" readonly :disabled="disabled"></el-input>
        </slot>
        <el-dialog :title="$t('sys.member.title')" :visible.sync="visible" width="900px" append-to-body class="app-dialog">
            <div class="clearfix">
                <el-form class="m-b-m pull-left" @submit.native.prevent>
                    <el-input v-model="query.keyword" @keyup.enter.native="initServer" class="w-250"></el-input>
                    <el-button type="primary" @click="initServer" class="m-l-xs" v-t="'button.search'"></el-button>
                </el-form>
                <div class="pull-right m-t-xs" v-if="copy">
                    <el-checkbox v-model="checked">{{$t('common.ifcopy')}}</el-checkbox>
                </div>
            </div>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-table border stripe :data="items" height="290px" ref="table" class="table-single" @row-click="clickRow" @select="selectRow">
                        <el-table-column type="selection" width="45" :selectable="selectable" align="center"></el-table-column>
                        <el-table-column prop="username" :label="$t('sys.member.name')" width="100"></el-table-column>
                        <el-table-column prop="orgname" :label="$t('sys.member.deptname')" width="100"></el-table-column>
                        <el-table-column prop="deptname" :label="$t('sys.member.orgname')" width="140"></el-table-column>
                        <el-table-column prop="position" :label="$t('sys.member.position')" width="140"></el-table-column>
                    </el-table>
                    <div class="pagination-container">
                        <el-pagination :current-page="query.pagenumber" :page-sizes="pageSizes" :page-size="query.pagesize" :total="total" background layout="total, sizes, prev, slot, next" @size-change="changeSize" @current-change="changePage">
                            <span class="text-center">{{query.pagenumber}} / {{Math.ceil(total/query.pagesize)}}</span>
                        </el-pagination>
                    </div>
                </el-col>
                <el-col :span="12">
                    <el-table border stripe :data="rows" height="290px" ref="rtable" @row-click="clickRightRow" @select="selectRightRow" @select-all="changeRightAll">
                        <el-table-column type="selection" width="45" :selectable="selectable" align="center"></el-table-column>
                        <el-table-column prop="username" :label="$t('sys.member.name')" width="100"></el-table-column>
                        <el-table-column prop="orgname" :label="$t('sys.member.deptname')" width="100"></el-table-column>
                        <el-table-column prop="deptname" :label="$t('sys.member.orgname')" width="140"></el-table-column>
                        <el-table-column prop="position" :label="$t('sys.member.position')" width="140"></el-table-column>
                    </el-table>
                    <div class="pagination-container">
                        <el-pagination :total="rows.length" background layout="total"></el-pagination>
                    </div>
                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button @click="visible=false" v-t="'button.cancel'"></el-button>
                <el-button type="primary" @click="confirm" v-t="'button.confirm'"></el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import helper from '@/plugins/helper';
import multitools from './multitools';
import { getTablePage } from '@/service/mainApi';

export default {
    name: 'multimember',
    props: helper.extend({}, multitools.props, {
        field: {
            type: String,
            default: 'user'
        }
    }),
    data() {
        return {
            items: [],
            total: 0,
            query: {
                pagesize: 20,
                pagenumber: 1,
                keyword: ''
            },
            rows: [],
            value: '',
            checked: this.copyed,
            visible: false
        };
    },
    computed: {
        ...mapState({
            pageSizes: state => state.pageSizes
        })
    },
    methods: helper.extend({}, multitools.methods, {
        async load() {
            let params = this.getParams(),
                res = this.checkLogin ? await getTablePage(params) : await getTablePage(params);
            if (res.code !== 'success') {
                this.$message.error(res.message);
                return false;
            }
            if (this.$refs.table) {
                this.$refs.table.clearSelection();
            }
            this.items = res.data.items;
            this.total = res.data.total;
            this.resetSelect();
        },
        initServer() {
            this.query.pagenumber = 1;
            this.load();
        },
        filter(row, item) {
            return row.userno === item.userno;
        },
        render(data) {
            var html = [];
            if (Array.isArray(data)) {
                if (this.temp) {
                    data.map(item => html.push(helper.renderText(this.temp, item)));
                } else {
                    data.map(item => html.push(item.username));
                }
            }
            this.value = html.join(',');
        }
    }),
    created() {
        this.initProp();
        this.$watch('form.' + this.field, () => {
            setTimeout(() => this.render(this.form[this.field]));
        });
        this.render(this.form[this.field]);
    }
};
</script>
