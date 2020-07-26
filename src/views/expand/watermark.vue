<template>
    <div class="p-m">
        <h2>
            <span>watermark</span>
            <!-- <a class="link m-l-xl" @click="download">
                <i class="iconfont icon-lianjie"></i>
            </a> -->
        </h2>
        <h3 v-t="'column.prop'"></h3>
        <el-table :data="params">
            <el-table-column :label="$t('column.prop')" prop="props" width="120"></el-table-column>
            <el-table-column :label="$t('column.description')" prop="dsc"></el-table-column>
            <el-table-column :label="$t('column.type')" prop="type" width="120"></el-table-column>
            <el-table-column :label="$t('column.accepted')" prop="value" width="120"></el-table-column>
            <el-table-column :label="$t('column.default')" prop="default" width="120"></el-table-column>
        </el-table>
        <h3 class="p-t-xl">示例</h3>
        <div ref="body" class="pos-rlt b p-m">
            <h2>表格</h2>
            <el-table :data="items" stripe>
                <el-table-column type="selection" width="45"></el-table-column>
                <el-table-column prop="paramcode" :label="$t('sys.parameter.code')"></el-table-column>
                <el-table-column prop="paramname" :label="$t('sys.parameter.name')"></el-table-column>
                <el-table-column prop="paramtype" :label="$t('sys.parameter.level')"></el-table-column>
                <el-table-column prop="paramvalue" :label="$t('sys.parameter.value')"></el-table-column>
                <el-table-column prop="remark" :label="$t('common.remark')"></el-table-column>
            </el-table>
        </div>
        <div class="app-highlight">
            <pre v-highlight>
                <code>{{code}}</code>
            </pre>
        </div>
    </div>
</template>

<script>
import watermark from '@/plugins/watermark';
import { getParams } from '@/service/mainApi';

export default {
    data() {
        return {
            params: [{
                props: 'body',
                dsc: '元素，或选择器',
                type: 'String, elem',
                value: '',
                default: ''
            }, {
                props: 'message',
                dsc: '水印内容',
                type: 'Array',
                value: '',
                default: '[]'
            }, {
                props: 'zIndex',
                dsc: '水印的元素zIndex',
                type: 'Number',
                value: '',
                default: '9999'
            }, {
                props: 'width',
                dsc: '水印内容的宽度',
                type: 'Number',
                value: '',
                default: '200'
            }, {
                props: 'height',
                dsc: '水印内容的高度',
                type: 'Number',
                value: '',
                default: '120'
            }],
            items: [],
            code: '<div ref="body" class="pos-rlt b p-m">\n\
    <h2>表格</h2>\n\
    <el-table :data="items" stripe>\n\
        <el-table-column type="selection" width="45"></el-table-column>\n\
        <el-table-column prop="paramcode" :label="$t(\'sys.parameter.code\')"></el-table-column>\n\
        <el-table-column prop="paramname" :label="$t(\'sys.parameter.name\')"></el-table-column>\n\
        <el-table-column prop="paramtype" :label="$t(\'sys.parameter.level\')"></el-table-column>\n\
        <el-table-column prop="paramvalue" :label="$t(\'sys.parameter.value\')"></el-table-column>\n\
        <el-table-column prop="remark" :label="$t(\'common.remark\')"></el-table-column>\n\
    </el-table>\n\
</div>\n\n\
mounted() {\n\
    var time = new Date().format(\'yyyy-MM-dd hh:mm\');\n\
    watermark.create({\n\
        body: this.$refs.body,\n\
        message: [\'测试水印\', time]\n\
    });\n\
}'
        };
    },
    methods: {
        // download() {
        //     this.$helper.export('/plugins/watermark.js');
        // }
    },
    mounted() {
        var time = new Date().format('yyyy-MM-dd hh:mm');
        watermark.create({
            body: this.$refs.body,
            message: ['测试水印', time]
        });
    },
    created() {
        getParams().then(res => {
            res = res.data.items;
            res = res.concat(JSON.parse(JSON.stringify(res)));
            res = res.concat(JSON.parse(JSON.stringify(res)));
            res = res.concat(JSON.parse(JSON.stringify(res)));
            this.items = res;
        });
    }
};
</script>
