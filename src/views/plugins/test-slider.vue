<template>
    <div class="p-t-l p-r-l p-l-l">
        <h2>
            <span>app-slider</span>
            <a class="link m-l-xl" @click="download">
                <i class="iconfont icon-lianjie"></i>
            </a>
        </h2>
        <div>显示隐藏组件</div>
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
        <app-slider title="标题">
            <div class="p-m">内容</div>
        </app-slider>
        <div class="app-highlight">
            <pre v-highlight>
                <code>{{code1}}</code>
            </pre>
        </div>
        <app-slider hide>
            <div class="font-14 m-l-m" slot="title">
                <i class="iconfont icon-yun m-r-sm font-14"></i>标题
            </div>
            <span class="m-r-s" slot="btns">
                <i class="el-icon-link font-16"></i>
                <i class="el-icon-ice-cream-round font-16"></i>
            </span>
            <div class="p-xl">
                <el-button>点击按钮</el-button>
            </div>
        </app-slider>
        <div class="app-highlight">
            <pre v-highlight>
                <code>{{code2}}</code>
            </pre>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            params: [{
                props: 'title',
                dsc: '标题，也可通过具名 slot 传入',
                type: 'String',
                value: '',
                default: ''
            }, {
                props: 'hide',
                dsc: '初始化时是否默认收起',
                type: 'Boolean',
                value: '',
                default: 'false'
            }],
            slot: [{
                props: '',
                dsc: '内容区的内容'
            }, {
                props: 'title',
                dsc: '标题区的内容'
            }, {
                props: 'btns',
                dsc: '按钮区的内容'
            }],
            code1: '<app-slider title="标题">\n\
    <div class="p-xl">内容</div>\n\
</app-slider>\n',
            code2: '<app-slider hide>\n\
    <div class="font-14 m-l-m" slot="title">\n\
        <i class="iconfont icon-yun m-r-sm font-14"></i>标题\n\
    </div>\n\
    <span class="m-r-s" slot="btns">\n\
        <i class="el-icon-link font-16"></i>\n\
        <i class="el-icon-ice-cream-round font-16"></i>\n\
    </span>\n\
    <div class="p-xl">\n\
        <el-button>点击按钮</el-button>\n\
    </div>\n\
</app-slider>'
        };
    },
    methods: {
        download() {
            this.$helper.export('/plugins/slider.vue');
        }
    }
};
</script>
