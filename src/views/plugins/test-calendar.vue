<template>
    <div class="p-m">
        <h1>app-calendar</h1>
        <p>展示月份组件。</p>
        <h3 v-t="'column.prop'"></h3>
        <el-table :data="params">
            <el-table-column :label="$t('column.prop')" prop="props" width="120"></el-table-column>
            <el-table-column :label="$t('column.description')" prop="dsc"></el-table-column>
            <el-table-column :label="$t('column.type')" prop="type" width="120"></el-table-column>
            <el-table-column :label="$t('column.accepted')" prop="value" width="120"></el-table-column>
            <el-table-column :label="$t('column.default')" prop="default" width="120"></el-table-column>
        </el-table>
        <h3 v-t="'column.slot'"></h3>
        <el-table :data="slot">
            <el-table-column :label="$t('column.prop')" prop="props" width="120"></el-table-column>
            <el-table-column :label="$t('column.description')" prop="dsc"></el-table-column>
        </el-table>
        <h3 class="p-t-xl">示例</h3>
        <div class="clearfix">
            <app-calendar v-model="date" :week-start="0" class="app-calendar-test pull-left"></app-calendar>
            <span>{{date}}</span>
        </div>
        <div class="app-highlight">
            <pre v-highlight>
                <code>{{code}}</code>
            </pre>
        </div>
        <app-calendar class="app-calendar-test" v-model="value" @monthChange="monthChange" @change="change" v-loading="loading">
            <template slot-scope="scope">
                <el-tooltip v-if="backnum(scope.data.date)" effect="light">
                    <div class="app-backlog-tooltip" slot="content" @click="tooltipClick">
                        {{scope.data.date}}<br>
                        您有
                        <span class="text-danger">{{backnum(scope.data.date)}}</span>
                        项内容请及时处理！
                    </div>
                    <div class="app-backlog-day">
                        {{scope.data.text}}
                        <span class="app-backlog-day-total">{{backnum(scope.data.date)}}</span>
                    </div>
                </el-tooltip>
                <div class="app-backlog-day" v-else>{{scope.data.text}}</div>
            </template>
        </app-calendar>
        <div class="app-highlight">
            <pre v-highlight>
                <code>{{code1}}</code>
            </pre>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data() {
        return {
            params: [{
                props: 'weekStart',
                dsc: '日历星期开始点(0 - 6) 0 - 星期天开始 1 - 星期一开始',
                type: 'Number',
                value: '',
                default: '1'
            }, {
                props: 'value',
                dsc: '选中日期',
                type: 'Number, Date, String',
                value: '',
                default: 'new Date'
            }, {
                props: 'onPostRender',
                dsc: '渲染完成后回调，进行数据处理',
                type: 'Function',
                value: '',
                default: ''
            }],
            slot: [{
                props: '',
                dsc: '自定义当前月份展示模板'
            }],
            date: '',
            code: '<div class="clearfix">\n\
    <app-calendar v-model="date" :week-start="0" class="app-calendar-test pull-left"></app-calendar>\n\
    <span>{{date}}</span>\n\
</div>\n\
.app-calendar-test {\n\
    width: 355px;\n\
    height: 272px;\n\
    margin: 0 16px 16px 0;\n\
}',
            value: '2020-02-15',
            loading: false,
            info: {},
            code1: '<app-calendar class="app-calendar-test" v-model="value" @monthChange="monthChange" @change="change" v-loading="loading">\n\
    <template slot-scope="scope">\n\
        <el-tooltip v-if="backnum(scope.data.date)" effect="light">\n\
            <div class="app-backlog-tooltip" slot="content" @click="tooltipClick">\n\
                {{scope.data.date}}<br>\n\
                您有\n\
                <span class="text-danger">{{backnum(scope.data.date)}}</span>\n\
                项内容请及时处理！\n\
            </div>\n\
            <div class="app-backlog-day">\n\
                {{scope.data.text}}\n\
                <span class="app-backlog-day-total">{{backnum(scope.data.date)}}</span>\n\
            </div>\n\
        </el-tooltip>\n\
        <div class="app-backlog-day" v-else>{{scope.data.text}}</div>\n\
    </template>\n\
</app-calendar>\n\
computed: {\n\
    backnum() {\n\
        return date => {\n\
            return this.info[date];\n\
        };\n\
    }\n\
},\n\
methods: {\n\
    change(date) {\n\
        this.$alert(date);\n\
    },\n\
    monthChange(date) {\n\
        date = this.getDate(date);\n\
        this.loadInfo(date);\n\
    },\n\
    async loadInfo(date) {\n\
        var res = await this.getInfo();\n\
        this.initInfo(date, res);\n\
    },\n\
    getInfo() {\n\
        this.loading = true;\n\
        return new Promise((resolve, reject) => {\n\
            setTimeout(() => {\n\
                this.loading = false;\n\
                resolve();\n\
            }, 2000);\n\
        });\n\
    },\n\
    initInfo(date, res) {\n\
        var k = 1,\n\
            key,\n\
            info = new Object();\n\
        if (date.month < 10) {\n\
            date.month = \'0\' + parseInt(date.month);\n\
        }\n\
        while (k <= date.date) {\n\
            key = date.year + \'-\' + date.month + \'-\' + (k < 10 ? \'0\' + k : k);\n\
            info[key] = Math.random() < 0.3 ? parseInt(Math.random() * 50) : 0;\n\
            k++;\n\
        }\n\
        this.info = info;\n\
    },\n\
    getDate(date) {\n\
        var value = date || new Date(this.value);\n\
        value = new Date(value.getFullYear(), value.getMonth() + 1, 0);\n\
        return {\n\
            year: value.getFullYear(),\n\
            month: value.getMonth() + 1,\n\
            date: value.getDate()\n\
        }\n\
    },\n\
    tooltipClick() {\n\
        this.$message(\'tooltip.click\');\n\
    }\n\
},\n\
created() {\n\
    var date = this.getDate();\n\
    this.initInfo(date, {});\n\
    this.loadInfo(date);\n\
}'
        };
    },
    computed: {
        ...mapState({
            ch: state => state.ch
        }),
        backnum() {
            return date => {
                return this.info[date];
            };
        }
    },
    methods: {
        change(date) {
            this.$alert(date);
        },
        monthChange(date) {
            date = this.getDate(date);
            this.loadInfo(date);
        },
        async loadInfo(date) {
            var res = await this.getInfo();
            this.initInfo(date, res);
        },
        getInfo() {
            this.loading = true;
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.loading = false;
                    resolve();
                }, 2000);
            });
        },
        initInfo(date, res) {
            var k = 1,
                key,
                info = new Object();
            if (date.month < 10) {
                date.month = '0' + parseInt(date.month);
            }
            while (k <= date.date) {
                key = date.year + '-' + date.month + '-' + (k < 10 ? '0' + k : k);
                info[key] = Math.random() < 0.3 ? parseInt(Math.random() * 50) : 0;
                k++;
            }
            this.info = info;
        },
        getDate(date) {
            var value = date || new Date(this.value);
            value = new Date(value.getFullYear(), value.getMonth() + 1, 0);
            return {
                year: value.getFullYear(),
                month: value.getMonth() + 1,
                date: value.getDate()
            }
        },
        tooltipClick() {
            this.$message('tooltip.click');
        }
    },
    created() {
        var date = this.getDate();
        this.initInfo(date, {});
        this.loadInfo(date);
    }
};
</script>

<style lang="less" scoped>
.app-calendar-test {
    width: 355px;
    height: 272px;
    margin: 0 16px 16px 0;
}
.app-backlog-day {
    position: relative;
    width: 32px;
    height: 32px;
    line-height: 32px;
    cursor: pointer;
    border: 1px solid #FFFFFF;
}
.app-backlog-day:hover {
    background: #E9F1F8;
    border-color: #E9F1F8;
}
.app-calendar-table li.active .app-backlog-day {
    color: #0067B2;
    font-weight: bold;
    background: #E9F1F8;
    border: 1px solid #D0E2F0;
    border-radius: 2px;
}
.app-backlog-day-total {
    position: absolute;
    background: #E8405B;
    color: #FFFFFF;
    border-radius: 5px;
    height: auto;
    line-height: normal;
    width: 16px;
    transform: scale(0.66);
    right: -7px;
    top: 1px;
}
.app-backlog-form {
    background: #F7F8FA;
    padding: 24px 0 24px;
    .app-line {
        padding-left: 16px;
        font-size: 12px;
        margin-bottom: 12px;
        font-weight: bold;
    }
    .el-form {
        padding: 0 24px;
    }
    .el-button {
        margin-left: 110px;
    }
}
</style>
