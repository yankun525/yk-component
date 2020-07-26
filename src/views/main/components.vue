<template>
    <div class="p-m">
        <!-- 倒计时组件 -->
        <app-slider title="倒计时组件" class="m-b-xl">
            <div class="test-countdown p-t-l">
                <el-row>
                    <el-col :span="12">
                        <el-input v-model="date"></el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-button type="primary" @click="reset" class="m-l-l">重置</el-button>
                        <el-button type="primary" @click="stop">暂停</el-button>
                        <el-button type="primary" @click="start">开始</el-button>
                        <el-button type="primary" @click="init">重启</el-button>
                    </el-col>
                </el-row>
            </div>
            <div class="test-main m-t-l m-b-l">
                <app-countdown :date="time" :enabled="false" format="hh:mm:ss:j" ref="countdown"></app-countdown>
            </div>
        </app-slider>
        <!-- 上传组件 -->
        <app-slider title="上传组件" class="m-b-xl">
            <div class="p-l">
                <div class="m-t-m m-b-m">
                    <app-upload :form="form"></app-upload>
                </div>
                <div class="clearfix m-b-m">
                    <div class="pull-left">
                        <el-button type="primary" @click="addTable" v-t="'button.add'"></el-button>
                    </div>
                </div>
                <el-table border stripe ref="table" :data="items" :height="120">
                    <el-table-column prop="attachname" :label="$t('common.attachmentname')"></el-table-column>
                    <el-table-column prop="uploadername" :label="$t('common.uploader')"></el-table-column>
                    <el-table-column fixed="right" :label="$t('common.operate')" width="120">
                        <template slot-scope="scope">
                            <app-upload :form="scope.row" inline v-show="!scope.row.attachname">
                                <el-button type="text" size="small" v-t="'button.upload'"></el-button>
                            </app-upload>
                            <el-button type="text" size="small" v-show="scope.row.attachname" v-t="'button.preview'"></el-button>
                            <el-button type="text" size="small" v-show="scope.row.attachname" v-t="'button.download'"></el-button>
                            <el-button type="text" size="small" v-t="'button.delete'"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </app-slider>
        <!-- 单选组件 -->
        <app-slider title="单选组件" class="m-t-l">
            <div class="p-m">
                <h3 class="m-b-m">权限校验</h3>
                <el-form label-width="80px">
                    <el-row :gutter="24">
                        <el-col :span="8">
                            <el-form-item label="用户管理">
                                <app-singlemember :form="form" noField="no" prop="dept=deptname" nameField="name"></app-singlemember>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="管理单位">
                                <app-singleorg :form="form"></app-singleorg>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="管理部门">
                                <app-singledept :form="form"></app-singledept>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="我方主体">
                                <app-singlemycompany :form="form"></app-singlemycompany>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="配置页面">
                                <app-singlepage :form="form"></app-singlepage>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <h3>不用权限校验</h3>
                <el-form label-width="80px" class="m-t-m">
                    <el-row :gutter="24">
                        <el-col :span="8">
                            <el-form-item label="用户管理">
                                <app-singlemember :form="form" noField="no" prop="dept=deptname" nameField="name" norights></app-singlemember>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="管理单位">
                                <app-singleorg :form="form" norights></app-singleorg>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="管理部门">
                                <app-singledept :form="form" norights></app-singledept>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="我方主体">
                                <app-singlemycompany :form="form" norights></app-singlemycompany>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="配置页面">
                                <app-singlepage :form="form" norights></app-singlepage>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <el-row :gutter="24">
                    <el-col :span="8">
                        <p>name: {{form.name}}</p>
                        <p>no: {{form.no}}</p>
                        <p>dept: {{form.dept}}</p>
                    </el-col>
                    <el-col :span="8">
                        <p>orgcode: {{form.orgcode}}</p>
                        <p>orgname: {{form.orgname}}</p>
                    </el-col>
                    <el-col :span="8">
                        <p>deptcode: {{form.deptcode}}</p>
                        <p>deptname: {{form.deptname}}</p>
                    </el-col>
                    <el-col :span="8">
                        <p>mycompanycode: {{form.mycompanycode}}</p>
                        <p>mycompanyname: {{form.mycompanyname}}</p>
                    </el-col>
                    <el-col :span="8">
                        <p>permissionid: {{form.permissionid}}</p>
                        <p>permissionurl: {{form.permissionurl}}</p>
                    </el-col>
                </el-row>
            </div>
        </app-slider>
        <!-- 多选组件 -->
        <app-slider title="多选组件" class="m-t-l">
            <div class="p-t-m p-r-m p-l-m">
                <h3 class="m-b-m">权限校验</h3>
                <el-form label-width="100px">
                    <el-row :gutter="24">
                        <el-col :span="8">
                            <el-form-item label="用户管理">
                                <app-multimember :form="form"></app-multimember>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="管理单位">
                                <app-multiorg :form="form"></app-multiorg>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="我方主体">
                                <app-multimycompany :form="form"></app-multimycompany>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="角色管理">
                                <app-multirole :form="form"></app-multirole>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="用户类型">
                                <app-multiusertype :form="form"></app-multiusertype>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <h3>不用权限校验</h3>
                <el-form label-width="100px" class="m-t-m">
                    <el-row :gutter="24">
                        <el-col :span="8">
                            <el-form-item label="用户管理">
                                <app-multimember :form="form" norights></app-multimember>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="管理单位">
                                <app-multiorg :form="form" norights></app-multiorg>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="我方主体">
                                <app-multimycompany :form="form" norights></app-multimycompany>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <p class="m-b-m">user: {{JSON.stringify(form.user)}}</p>
                <p class="m-t-m m-b-m">bustenantorgList: {{JSON.stringify(form.bustenantorgList)}}</p>
                <p class="m-t-m m-b-m">mycompany: {{JSON.stringify(form.mycompany)}}</p>
                <p class="m-t-m m-b-m">roleList: {{JSON.stringify(form.roleList)}}</p>
                <p class="m-t-m m-b-m">usertypes: {{JSON.stringify(form.usertypes)}}</p>
            </div>
        </app-slider>
        <!-- 树选择组件 -->
        <app-slider title="树选择组件" class="m-t-l">
            <div class="p-t-m p-r-m p-l-m">
                <h3 class="m-b-m">权限校验</h3>
                <el-form label-width="100px">
                    <el-row :gutter="24">
                        <el-col :span="8">
                            <el-form-item label="采购类别">
                                <app-treecategory :form="form" single></app-treecategory>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="设置管理部门">
                                <el-input v-model="form.treeparentid"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="管理部门">
                                <app-treeorg :form="form" single noField="treedeptcode" nameField="treedeptname" :parentid="form.treeparentid"></app-treeorg>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <h3>不用权限校验</h3>
                <el-form label-width="100px" class="m-t-m">
                    <el-row :gutter="24">
                        <el-col :span="8">
                            <el-form-item label="采购类别">
                                <app-treecategory levelShow :form="form" norights></app-treecategory>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="管理部门">
                                <app-treeorg levelShow :form="form" prop="treeOrgList" :parentid="form.treeparentid" norights></app-treeorg>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <el-row :gutter="24">
                    <el-col :span="8">
                        <p>categoryid: {{form.categoryid}}</p>
                        <p>categoryname: {{form.categoryname}}</p>
                        <p>businesstypeList: {{JSON.stringify(form.businesstypeList)}}</p>
                    </el-col>
                    <el-col :span="8">
                        <p>treedeptcode: {{form.treedeptcode}}</p>
                        <p>treedeptname: {{form.treedeptname}}</p>
                    </el-col>
                    <el-col :span="8">
                        <p>treeOrgList: {{JSON.stringify(form.treeOrgList)}}</p>
                    </el-col>
                </el-row>
            </div>
        </app-slider>
    </div>
</template>

<script>
import watermark from '@/plugins/watermark.js';

export default {
    data() {
        return {
            time: 5,
            date: '',
            items: [],
            form: {
                attachname: '',
                uploadername: '',
                name: '黄远锦',
                no: '0047746',
                dept: '',
                orgcode: '',
                orgname: '',
                deptcode: '',
                deptname: '',
                mycompanycode: '',
                mycompanyname: '',
                permissionid: '',
                permissionurl: '',
                user: [{
                    sdeptid: '15050',
                    deptname: '基础云端服务部',
                    domainaccount: 'zhengjinwei',
                    email: 'zhengjinwei@Geely.com',
                    orgid: '13808',
                    orgname: '信息工程中心',
                    phone: '13003685566',
                    position: '基础云端服务部总监',
                    userid: 10000,
                    username: '郑金伟',
                    userno: '0012892',
                    undelete: 1
                }],
                bustenantorgList: [],
                mycompany: [],
                roleList: [],
                usertypes: [],
                categoryid: '',
                categoryname: '',
                businesstypeList: [],
                treeparentid: '',
                treedeptcode: '',
                treedeptname: '',
                treeOrgList: []
            }
        };
    },
    methods: {
        reset() {
            if (!this.$helper.isInteger(this.date)) {
                return false;
            }
            this.$refs.countdown.reset(parseInt(this.date));
        },
        stop() {
            this.$refs.countdown.stop();
        },
        start() {
            this.$refs.countdown.start();
        },
        init() {
            if (!this.$helper.isInteger(this.date)) {
                return false;
            }
            this.$refs.countdown.reset(parseInt(this.date)).start();
        },
        addTable() {
            this.items.push({
                attachname: '',
                uploadername: ''
            });
        },
        closePage() {
            var view = this.$store.getters.getView();
            this.$store.dispatch('close');
            this.$nextTick(() => {
                if (view && typeof view.load === 'function') {
                    view.load();
                }
            });
        }
    },
    mounted() {
        watermark.create({
            body: document.getElementById('app'),
            message: ['测试水印', '887463'],
            width: 300,
            height: 200
        });
    },
    created() {
        window.$$test = this;
    }
};
</script>
<style lang="css" scoped>
.test-countdown {
    width: 700px;
    margin: 0 auto;
}
.test-main {
    width: 500px;
    height: 100px;
    position: relative;
    left: 50%;
    margin-left: -250px;
    color: #fff;
    background: #6c7c9d;
    border-radius: 3px;
    text-align: center;
    padding-top: 20px;
}
</style>

