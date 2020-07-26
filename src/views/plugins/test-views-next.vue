<template>
    <div class="p-t-l p-r-l p-l-l">
        <el-button @click="closePage">关闭页面</el-button>
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
            code: 'var view = this.$store.getters.getView();\n\
this.$store.dispatch(\'closeView\');\n\
this.$nextTick(() => {\n\
    if (view && typeof view.callback === \'function\') {\n\
        view.callback(\'关闭当前页\');\n\
    }\n\
});'
        };
    },
    methods: {
        closePage() {
            var view = this.$store.getters.getView();
            this.$store.dispatch('closeView');
            this.$nextTick(() => {
                if (view && typeof view.callback === 'function') {
                    view.callback('关闭当前页');
                }
            });
        }
    }
};
</script>
