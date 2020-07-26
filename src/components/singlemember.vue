<template>
    <div @dblclick.stop="doubleClick" @click.stop="singleClick">
        <slot>
            <el-input v-model="value" :disabled="disabled" suffix-icon="el-input__icon iconfont icon-sousuo-o" readonly></el-input>
        </slot>
        <el-dialog :title="$t('sys.member.title')" :visible.sync="visible" width="648px" append-to-body class="app-dialog" @close="cancel">
            <div @click.stop>
                <div class="clearfix">
                    <el-form class="m-b-m pull-left" @submit.native.prevent>
                        <el-input v-model="query.keyword" @keyup.enter.native="initServer" class="w-250"></el-input>
                        <el-button type="primary" @click="initServer" class="m-l-xs" v-t="'button.search'"></el-button>
                    </el-form>
                    <div class="pull-right m-t-xs" v-if="copy">
                        <el-checkbox v-model="checked">{{$t('common.ifcopy')}}</el-checkbox>
                    </div>
                </div>
                <el-table border stripe style="width: 100%;" :data="items" height="290px" ref="table" class="table-single" clickToSelect singleSelect @row-dblclick="dblclickRow">
                <!-- <el-table border stripe style="width: 100%;" :data="items" height="290px" ref="table" class="table-single" @select="selectRow" @row-click="clickRow" @row-dblclick="dblclickRow"> -->
                    <el-table-column type="selection" width="45" align="center"></el-table-column>
                    <el-table-column prop="username" :label="$t('sys.member.name')" width="120"></el-table-column>
                    <el-table-column prop="orgname" :label="$t('sys.member.deptname')" width="140"></el-table-column>
                    <el-table-column prop="deptname" :label="$t('sys.member.orgname')"></el-table-column>
                    <el-table-column prop="position" :label="$t('sys.member.position')"></el-table-column>
                </el-table>
                <el-pagination
                    :current-page="query.pagenumber"
                    :page-sizes="pageSizes"
                    :page-size="query.pagesize"
                    :total="total"
                    background
                    layout="total, sizes, prev, slot, next"
                    @size-change="changeSize"
                    @current-change="changePage"
                    class="pagination-container p-l-0 p-r-0"
                >
                    <span class="text-center">{{query.pagenumber}} / {{Math.ceil(total/query.pagesize)}}</span>
                </el-pagination>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click.stop="cancel" v-t="'button.cancel'"></el-button>
                <el-button type="primary" @click.stop="confirm" v-t="'button.confirm'"></el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import helper from '@/plugins/helper';
import singletools from './singletools';
import { getTablePage } from '@/service/mainApi';

export default {
    name: 'singlemember',
    props: helper.extend({}, singletools.props, {
        noField: {
            type: String,
            default: 'userno'
        },
        nameField: {
            type: String,
            default: 'username'
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
    methods: helper.extend({}, singletools.methods, {
        async load() {
            let params = this.getParams(),
                res = this.checkLogin ? await getTablePage(params) : await getTablePage(params);
            if (res.code !== 'success') {
                this.$message.error(res.message);
                return false;
            }
            this.items = res.data.items;
            this.total = res.data.total;
        },
        initServer() {
            this.query.pagenumber = 1;
            this.load();
        },
        render(data) {
            this.form[this.noField] = data.userno;
            this.form[this.nameField] = data.username;
            this.keys.map(key => {
                this.form[this.fields[key]] = data[key];
            });
        }
    }),
    created() {
        this.initProp();
        this.setItem();
        this.$watch('form.' + this.nameField, () => {
            setTimeout(() => this.setItem());
        });
    }
};
</script>
