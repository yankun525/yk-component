<template>
    <div class="p-t-l p-r-l p-l-l">
        <h2>
            <span>app-countdown</span>
            <a class="link m-l-xl" @click="download">
                <i class="iconfont icon-lianjie"></i>
            </a>
        </h2>
        <div>倒计时组件</div>
        <h3 v-t="'column.prop'"></h3>
        <el-table :data="params">
            <el-table-column :label="$t('column.prop')" prop="props" width="120"></el-table-column>
            <el-table-column :label="$t('column.description')" prop="dsc"></el-table-column>
            <el-table-column :label="$t('column.type')" prop="type" width="120"></el-table-column>
            <el-table-column :label="$t('column.accepted')" prop="value" width="120"></el-table-column>
            <el-table-column :label="$t('column.default')" prop="default" width="120"></el-table-column>
        </el-table>
        <h3 v-t="'column.events'"></h3>
        <el-table :data="events">
            <el-table-column :label="$t('column.events')" prop="props" width="120"></el-table-column>
            <el-table-column :label="$t('column.description')" prop="dsc"></el-table-column>
            <el-table-column :label="$t('column.prop')" prop="params"></el-table-column>
        </el-table>
        <h3 class="p-t-xl">示例</h3>
        <app-countdown
            ref="countdown"
            :date="date"
            format="hh:mm:ss"
            @start="consoleStart"
            @stop="consoleStop"
            @end="consoleEnd"
            @change="consoleChange"
        ></app-countdown>
        <div class="m-t-m">
            <el-input v-model="date" class="w-250"></el-input>
            <el-button type="primary" @click="reset" class="m-l-m">重置</el-button>
            <el-button type="primary" @click="stop">暂停</el-button>
            <el-button type="primary" @click="start">开始</el-button>
            <el-button type="primary" @click="init">重启</el-button>
        </div>
        <div class="app-highlight">
            <pre v-highlight>
                <code>{{code}}</code>
            </pre>
        </div>
        <app-countdown
            ref="countdown1"
            :date="date1"
            format="mm:ss:jj"
            @animation="consoleAnimation"
        ></app-countdown>
        <div class="m-t-m">
            <el-input v-model="date1" class="w-250"></el-input>
            <el-button type="primary" @click="reset1" class="m-l-m">重置</el-button>
            <el-button type="primary" @click="stop1">暂停</el-button>
            <el-button type="primary" @click="start1">开始</el-button>
            <el-button type="primary" @click="init1">重启</el-button>
        </div>
        <div class="app-highlight">
            <pre v-highlight>
                <code>{{code1}}</code>
            </pre>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            params: [{
                props: 'format',
                dsc: '显示格式 hh:mm:ss:jj(时:分:秒:毫秒)',
                type: 'String',
                value: '',
                default: 'mm:ss'
            }, {
                props: 'date',
                dsc: '倒计时时间 单位为毫秒',
                type: 'Number',
                value: '',
                default: '0'
            }, {
                props: 'enabled',
                dsc: '初始化时是否进入倒计时',
                type: 'Boolean',
                value: '',
                default: 'false'
            }],
            events: [{
                props: 'start',
                dsc: '倒计时开始时触发',
                params: '(countdown: 组件实例化对象)'
            }, {
                props: 'stop',
                dsc: '倒计时暂停时触发',
                params: '(countdown: 组件实例化对象)'
            }, {
                props: 'end',
                dsc: '倒计时结束时触发',
                params: '(countdown: 组件实例化对象)'
            }, {
                props: 'change',
                dsc: '每秒触发一次',
                params: '(stomp: 剩余时间)'
            }, {
                props: 'animation',
                dsc: '倒计时动画时触发',
                params: '(stomp: 剩余时间)'
            }],
            date: 120000,
            code: '<app-countdown\n\
    ref="countdown"\n\
    :date="date"\n\
    format="hh:mm:ss"\n\
    @start="consoleStart"\n\
    @stop="consoleStop"\n\
    @end="consoleEnd"\n\
    @change="consoleChange"\n\
></app-countdown>\n\
<div class="m-t-m">\n\
    <el-input v-model="date" class="w-250"></el-input>\n\
    <el-button type="primary" @click="reset" class="m-l-m">重置</el-button>\n\
    <el-button type="primary" @click="stop">暂停</el-button>\n\
    <el-button type="primary" @click="start">开始</el-button>\n\
    <el-button type="primary" @click="init">重启</el-button>\n\
</div>\n\n\
<script>\n\
export default {\n\
    data() {\n\
        return {\n\
            date: 120000\n\
        };\n\
    },\n\
    methods: {\n\
        reset() {\n\
            if (!this.$helper.isInteger(this.date)) {\n\
                return false;\n\
            }\n\
            this.$refs.countdown.reset(parseInt(this.date));\n\
        },\n\
        stop() {\n\
            this.$refs.countdown.stop();\n\
        },\n\
        start() {\n\
            this.$refs.countdown.start();\n\
        },\n\
        init() {\n\
            if (!this.$helper.isInteger(this.date)) {\n\
                return false;\n\
            }\n\
            this.$refs.countdown.reset(parseInt(this.date)).start();\n\
        },\n\
        consoleStart() {\n\
            console.log(\'event.start\');\n\
        },\n\
        consoleStop() {\n\
            console.log(\'event.stop\');\n\
        },\n\
        consoleEnd() {\n\
            console.log(\'event.end\');\n\
        },\n\
        consoleChange(stomp) {\n\
            console.log(\'change  \', stomp);\n\
        }\n\
    }\n\
};\n\
<\/script>',
            date1: 180000,
            code1: '<app-countdown\n\
    ref="countdown1"\n\
    :date="date1"\n\
    format="mm:ss:jj"\n\
    @animation="consoleAnimation"\n\
></app-countdown>\n\
<div class="m-t-m">\n\
    <el-input v-model="date1" class="w-250"></el-input>\n\
    <el-button type="primary" @click="reset1" class="m-l-m">重置</el-button>\n\
    <el-button type="primary" @click="stop1">暂停</el-button>\n\
    <el-button type="primary" @click="start1">开始</el-button>\n\
    <el-button type="primary" @click="init1">重启</el-button>\n\
</div>\n\n\
<script>\n\
export default {\n\
    data() {\n\
        return {\n\
            date1: 120000\n\
        };\n\
    },\n\
    methods: {\n\
        reset1() {\n\
            if (!this.$helper.isInteger(this.date1)) {\n\
                return false;\n\
            }\n\
            this.$refs.countdown1.reset(parseInt(this.date1));\n\
        },\n\
        stop1() {\n\
            this.$refs.countdown1.stop();\n\
        },\n\
        start1() {\n\
            this.$refs.countdown1.start();\n\
        },\n\
        init1() {\n\
            if (!this.$helper.isInteger(this.date1)) {\n\
                return false;\n\
            }\n\
            this.$refs.countdown1.reset(parseInt(this.date1)).start();\n\
        },\n\
        consoleAnimation(stomp) {\n\
            console.log(\'animation  \' + stomp);\n\
        }\n\
    }\n\
};\n\
<\/script>'
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
        reset1() {
            if (!this.$helper.isInteger(this.date1)) {
                return false;
            }
            this.$refs.countdown1.reset(parseInt(this.date1));
        },
        stop1() {
            this.$refs.countdown1.stop();
        },
        start1() {
            this.$refs.countdown1.start();
        },
        init1() {
            if (!this.$helper.isInteger(this.date1)) {
                return false;
            }
            this.$refs.countdown1.reset(parseInt(this.date1)).start();
        },
        download() {
            this.$helper.export('/plugins/countdown.vue');
        },
        consoleStart() {
            console.log('event.start');
        },
        consoleStop() {
            console.log('event.stop');
        },
        consoleEnd() {
            console.log('event.end');
        },
        consoleChange(stomp) {
            console.log('change  ', stomp);
        },
        consoleAnimation(stomp) {
            console.log('animation  ' + stomp);
        }
    }
};
</script>
