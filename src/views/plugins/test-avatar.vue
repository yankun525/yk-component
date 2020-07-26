<template>
    <div class="p-t-l p-r-l p-l-l">
        <h2>
            <span>app-avatar</span>
            <a class="link m-l-xl" @click="download">
                <i class="iconfont icon-lianjie"></i>
            </a>
        </h2>
        <div>头像剪切组件</div>
        <h3 v-t="'column.prop'"></h3>
        <el-table :data="params">
            <el-table-column :label="$t('column.prop')" prop="props" width="120"></el-table-column>
            <el-table-column :label="$t('column.description')" prop="dsc"></el-table-column>
            <el-table-column :label="$t('column.type')" prop="type" width="120"></el-table-column>
            <el-table-column :label="$t('column.accepted')" prop="value" width="120"></el-table-column>
            <el-table-column :label="$t('column.default')" prop="default" width="120"></el-table-column>
        </el-table>
        <h3 class="p-t-xl">示例</h3>
        <app-avatar ref="avatar"></app-avatar>
        <div class="m-t-m">
            <el-button type="primary" @click="createImage">生成头像</el-button>
        </div>
        <div ref="image" class="m-t-m clearfix"></div>
        <div class="app-highlight">
            <pre v-highlight>
                <code>{{code}}</code>
            </pre>
        </div>
        <h3>示例</h3>
        <app-avatar ref="avatar1" :ratio="form.ratio" :width="form.width" :height="form.height" show></app-avatar>
        <el-form :model="form" label-width="80px" class="m-t-m">
            <el-row :gutter="24">
                <el-col :span="8">
                    <el-form-item label="ratio">
                        <el-input v-model="form.ratio"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="width">
                        <el-input v-model="form.width"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="height">
                        <el-input v-model="form.height"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div class="m-t-m">
            <el-button type="primary" @click="createImage1">生成头像</el-button>
        </div>
        <ul class="m-t-m clearfix">
            <li v-for="(item, index) in images" :key="index" class="">
                <img :src="item" />
            </li>
        </ul>
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
                props: 'accept',
                dsc: '允许接受的图片类型',
                type: 'String',
                value: '',
                default: 'jpg, jpeg, gif, png, bmp'
            }, {
                props: 'cut',
                dsc: '是否在加载图片后自动截取',
                type: 'Boolean',
                value: 'true',
                default: 'false'
            }, {
                props: 'ratio',
                dsc: '头像固定宽高比，不设置不固定宽高',
                type: 'Number',
                value: '',
                default: ''
            }, {
                props: 'width',
                dsc: '生成的头像宽度',
                type: 'Number',
                value: '',
                default: 100
            }, {
                props: 'height',
                dsc: '生成的头像高度',
                type: 'Number',
                value: '',
                default: 100
            }],
            code: '<app-avatar ref="avatar"></app-avatar>\n\
<div class="m-t-m">\n\
    <el-button type="primary" @click="createImage">生成头像</el-button>\n\
</div>\n\
<div ref="image" class="m-t-m clearfix"></div>\n\
createImage() {\n\
    var image,\n\
        src = this.$refs.avatar.getBase64Image();\n\
    if (!src) {\n\
        this.$message.error(\'请选择图片并且截取图片\');\n\
        return false;\n\
    }\n\
    image = new Image();\n\
    image.src = src;\n\
    image.className = \'pull-left m-r-s m-b-s\';\n\
    this.$refs.image.append(image);\n\
}',
            form: {
                ratio: 1,
                width: 100,
                height: 100
            },
            images: [],
            code1: '<app-avatar ref="avatar1" :ratio="form.ratio" :width="form.width" :height="form.height" show></app-avatar>\n\
<el-form :model="form" label-width="80px" class="m-t-m">\n\
    <el-row :gutter="24">\n\
        <el-col :span="8">\n\
            <el-form-item label="ratio">\n\
                <el-input v-model="form.ratio"></el-input>\n\
            </el-form-item>\n\
        </el-col>\n\
        <el-col :span="8">\n\
            <el-form-item label="width">\n\
                <el-input v-model="form.width"></el-input>\n\
            </el-form-item>\n\
        </el-col>\n\
        <el-col :span="8">\n\
            <el-form-item label="height">\n\
                <el-input v-model="form.height"></el-input>\n\
            </el-form-item>\n\
        </el-col>\n\
    </el-row>\n\
</el-form>\n\
<div class="m-t-m">\n\
    <el-button type="primary" @click="createImage1">生成头像</el-button>\n\
</div>\n\
<ul class="m-t-m clearfix">\n\
    <li v-for="(item, index) in images" :key="index" class="">\n\
        <img :src="item" />\n\
    </li>\n\
</ul>\n\
data() {\n\
    return {\n\
        form: {\n\
            ratio: 1,\n\
            width: 100,\n\
            height: 100\n\
        },\n\
        images: []\n\
    }\n\
},\n\
methods: {\n\
    createImage1() {\n\
        var src = this.$refs.avatar1.getBase64Image();\n\
        if (!src) {\n\
            this.$message.error(\'请选择图片并且截取图片\');\n\
            return false;\n\
        }\n\
        this.images.push(src);\n\
    }\n\
}'
        };
    },
    methods: {
        download() {
            this.$helper.export('/plugins/avatar.vue');
        },
        createImage() {
            var image,
                src = this.$refs.avatar.getBase64Image();
            if (!src) {
                this.$message.error('请选择图片并且截取图片');
                return false;
            }
            image = new Image();
            image.src = src;
            image.className = 'pull-left m-r-s m-b-s';
            this.$refs.image.append(image);
        },
        createImage1() {
            var src = this.$refs.avatar1.getBase64Image();
            if (!src) {
                this.$message.error('请选择图片并且截取图片');
                return false;
            }
            this.images.push(src);
        }
    }
};
</script>
