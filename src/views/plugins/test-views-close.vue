<template>
    <div class="p-t-l p-r-l p-l-l">
        <el-button type="primary" @click="openPage">打开页面</el-button>
        <div class="app-highlight">
            <pre v-highlight>
                <code>{{code}}</code>
            </pre>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            code: 'this.$store.dispatch(\'openView\', {\n\
    title: \'下个页面\',\n\
    url: \'/pages/views/next\',\n\
    onClosed: view => {\n\
        this.$message(\'已关闭 /pages/views/next\');\n\
    },\n\
    callback: data => {\n\
        this.$alert(data);\n\
    }\n\
});'
        };
    },
    methods: {
        openPage() {
            var url = this.$route.path;
            this.$store.dispatch('openView', {
                title: '下个页面',
                url: '/pages/views/next',
                onClosed: view => {
                    this.$message('已关闭 /pages/views/next');
                },
                callback: data => {
                    this.$alert(data);
                    this.$store.dispatch('openView', url);
                }
            });
        }
    }
};
</script>
