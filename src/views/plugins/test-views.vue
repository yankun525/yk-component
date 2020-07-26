<template>
    <div class="p-t-l p-r-l p-l-l">
        <h2>
            <span>app-views</span>
            <a class="link m-l-xl" @click="download">
                <i class="iconfont icon-lianjie"></i>
            </a>
        </h2>
        <div>多tab打开页面组件，支持路由和iframe。</div>
        <h3 v-t="'column.prop'"></h3>
        <el-table :data="params">
            <el-table-column :label="$t('column.prop')" prop="props" width="120"></el-table-column>
            <el-table-column :label="$t('column.description')" prop="dsc"></el-table-column>
            <el-table-column :label="$t('column.type')" prop="type" width="120"></el-table-column>
            <el-table-column :label="$t('column.accepted')" prop="value" width="120"></el-table-column>
            <el-table-column :label="$t('column.default')" prop="default" width="120"></el-table-column>
        </el-table>
        <h3>View</h3>
        <el-table :data="view">
            <el-table-column :label="$t('column.prop')" prop="props" width="120"></el-table-column>
            <el-table-column :label="$t('column.description')" prop="dsc"></el-table-column>
            <el-table-column :label="$t('column.type')" prop="type" width="120"></el-table-column>
            <el-table-column :label="$t('column.accepted')" prop="value" width="120"></el-table-column>
            <el-table-column :label="$t('column.default')" prop="default" width="120"></el-table-column>
        </el-table>
        <h3 class="p-t-xl">示例</h3>
        <div class="m-b-m">
            <el-button type="primary" @click="openBaidu">百 度</el-button>
            <el-button type="primary" @click="openBack">回调测试</el-button>
            <el-button type="primary" @click="openCount">打开新页面</el-button>
        </div>
        <views class="b" height="400" default-url="/pages/views"></views>
        <div class="app-highlight">
            <pre v-highlight>
                <code>{{code}}</code>
            </pre>
        </div>
    </div>
</template>

<script>
import views from '@/components/views.vue';

export default {
    components: {
        views
    },
    data() {
        return {
            params: [{
                props: 'height',
                dsc: '设置页面高度',
                type: 'Number, String',
                value: '',
                default: ''
            }, {
                props: 'defaultUrl',
                dsc: '没打开页面时的url',
                type: 'String',
                value: '',
                default: '$route.path'
            }],
            view: [{
                props: 'title',
                dsc: 'tab的label值',
                type: 'String',
                value: '',
                default: ''
            }, {
                props: 'url',
                dsc: '页面地址, 保持唯一',
                type: 'String',
                value: '',
                default: ''
            }, {
                props: 'onClosed',
                dsc: '关闭页面后回调',
                type: 'Function',
                value: '',
                default: ''
            }, {
                props: 'closable',
                dsc: '默认是否允许关闭',
                type: 'Boolean',
                value: 'false',
                default: 'true'
            }, {
                props: 'origin',
                dsc: '是否frame打开',
                type: 'Boolean',
                value: 'true',
                default: 'false'
            }],
            code: '<views class="b" height="400"></views>\n\
openBaidu() {\n\
    this.$store.dispatch(\'openView\', {\n\
        title: \'百度\',\n\
        url: \'https://www.baidu.com/\'\n\
    });\n\
},\n\
openBack() {\n\
    this.$store.dispatch(\'openView\', {\n\
        title: \'回调测试\',\n\
        url: \'/pages/views/close\'\n\
    });\n\
},\n\
openCount() {\n\
    var index = this.index++;\n\
    this.$store.dispatch(\'openView\', {\n\
        title: \'新开\' + index,\n\
        url: \'/pages/views/count?index=\' + index\n\
    });\n\
}',
            index: 1
        };
    },
    methods: {
        download() {
            this.$helper.export('/plugins/views.vue');
        },
        openBaidu() {
            this.$store.dispatch('openView', {
                title: '百度',
                url: 'https://www.baidu.com/'
            });
        },
        openBack() {
            this.$store.dispatch('openView', {
                title: '回调测试',
                url: '/pages/views/close'
            });
        },
        openCount() {
            var index = this.index++;
            this.$store.dispatch('openView', {
                title: '新开' + index,
                url: '/pages/views/count?index=' + index
            });
        }
    }
};
</script>
