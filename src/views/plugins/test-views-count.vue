<template>
    <div class="p-t-l p-r-l p-l-l">
        {{index}}
    </div>
</template>

<script>
export default {
    data() {
        return {
            index: ''
        };
    },
    created() {
        this.index = this.$route.query.index;
    }
};
</script>
