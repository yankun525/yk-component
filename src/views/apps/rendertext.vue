<template>
    <div class="p-l">
        <h2>
            <span>renderText</span>
        </h2>
        <div>简单的模板转换。 { temp | String, data | Object }</div>
        <p>temp 字符串模板</p>
        <p>data 数据</p>
        <h3 class="p-t-xl">示例</h3>
        <div>{{$helper.renderText('测试{content}转换', data)}}</div>
        <div class="app-highlight">
            <pre v-highlight>
                <code>{{code}}</code>
            </pre>
        </div>
        <h3>示例 Request</h3>
        <div class="app-highlight">
            <pre v-highlight>
                <code>{{coderequest}}</code>
            </pre>
        </div>
        <h3>示例</h3>
        <el-form :model="form">
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="模板">
                        <el-input type="textarea" rows="12" v-model="form.template"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="数据">
                        <el-input type="textarea" rows="12" v-model="form.data"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-button @click="setJson">生成</el-button>
        <div class="app-highlight" style="height: 300px;">
            <pre v-highlight>
                <code v-html="coderender"></code>
            </pre>
        </div>
        <div class="app-highlight">
            <pre v-highlight>
                <code>{{codejson}}</code>
            </pre>
        </div>
    </div>
</template>

<script>
import highlight from 'highlight.js';

export default {
    data() {
        return {
            data: {
                content: '内容'
            },
            code: '<div>{{$helper.renderText(\'测试{content}转换\', data)}}</div>\n\n\
data() {\n\
    return {\n\
        data: {\n\
            content: \'内容\'\n\
        }\n\
    }\n\
}',
            coderequest: 'axios.patch(\'/user/{id}/enabled/{enabled}\', {\n\
    id: 10,\n\
    enabled: 1\n\
});\n\n\
url: /user/10/enabled/1?_=1592374271397',
            form: {
                template: '名称: {name}\n编号: {code}\n尺寸：{props.eup}',
                data: '',
                json: {
                    name: '短袖',
                    code: 'DX03910',
                    props: {
                        size: 'XL',
                        eup: '180/108A'
                    }
                }
            },
            codejson: 'setJson() {\n\
    let data = this.form.data.replace(/\\n/g, \'\');\n\
    try {\n\
        data = data.replace(/\\{[^:]+:/g, key => {\n\
            return \'{\' + this.replace(key.slice(1, key.length -1)) + \':\';\n\
        }).replace(/,[^:]+:/g, key => {\n\
            return \',\' + this.replace(key.slice(1, key.length -1)) + \':\';\n\
        });\n\
        this.form.json = JSON.parse(data);\n\
        this.setData();\n\
    } catch(e) {\n\
        this.$message.error(\'JSON 格式不正确！\');\n\
    }\n\
},\n\
setData() {\n\
    this.form.data = JSON.stringify(this.form.json, null, 4);\n\
},\n\
replace(key) {\n\
    key = key.replace(/(^\\s*|\\s*$)/g, \'\');\n\
    if (key.charAt(0) !== \'"\') {\n\
        key = \'"\' + key;\n\
    }\n\
    if (key.charAt(key.length - 1) !== \'"\') {\n\
        key = key + \'"\';\n\
    }\n\
    return key;\n\
}'
        };
    },
    mounted() {

    },
    methods: {
        setJson() {
            let data = this.form.data.replace(/\n/g, '');
            try {
                data = data.replace(/\{[^:]+:/g, key => {
                    return '{' + this.replace(key.slice(1, key.length -1)) + ':';
                }).replace(/,[^:]+:/g, key => {
                    return ',' + this.replace(key.slice(1, key.length -1)) + ':';
                });
                this.form.json = JSON.parse(data);
                this.setData();
            } catch(e) {
                this.$message.error('JSON 格式不正确！');
            }
        },
        setData() {
            this.form.data = JSON.stringify(this.form.json, null, 4);
        },
        replace(key) {
            key = key.replace(/(^\s*|\s*$)/g, '');
            if (key.charAt(0) !== '"') {
                key = '"' + key;
            }
            if (key.charAt(key.length - 1) !== '"') {
                key = key + '"';
            }
            return key;
        }
    },
    computed: {
        coderender() {
            return this.$helper.renderText(this.form.template, this.form.json);
        }
    },
    created() {
        this.setData();
    }
};
</script>
