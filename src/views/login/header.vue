<template>
    <div class="app-login-header clearfix">
        <div class="app-login-header-left">
            <img class="brand">
        </div>
        <div class="nav"></div>
        <el-dropdown class="app-login-header-right" @command="locale => $i18n.locale = locale">
            <div>
                <i class="iconfont icon-diqiu"></i>
                <span>{{localename}}</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="(item, index) in locales" :command="item.value" :key="index">{{item.text}}</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data() {
        return {};
    },
    computed: {
        ...mapState({
            locales: state => state.locales
        }),
        localename() {
            var item,
                len = this.locales.length;
            while (len--) {
                item = this.locales[len];
                if (item.value === this.$i18n.locale) {
                    return item.text;
                }
            }
            return '';
        }
    }
}
</script>

<style lang="less">
.app-login-header {
    background: rgba(255,255,255,0.90);
    height: 90px;
    display: flex;
    flex-shrink: 0;
    width: 100%;
}
.app-login-header-left {
    margin-top: 15px;
    margin-left: 120px;
    float: left;
}
.app-login-header-left .brand {
    height: 60px;
}
.app-login-header .nav {
    flex: 1;
}
.app-login-header-right {
    margin-right: 180px;
    margin-top: 48px;
    height: 18px;
    .icon-diqiu {
        font-size: 12px;
        padding-right: 4px;
    }
}
</style>
