<template>
    <el-container class="app-container" :class="{'header-show': !system}">
        <el-header class="app-header">
            <div class="title">
                <i class="iconfont icon-geelylogo2"></i>
            </div>
            <div class="nav"></div>
            <el-dropdown @command="handleCommand">
                <div class="el-dropdown-link">
                    <div class="avatar">
                        <img v-show="avatar" :src="avatar" />
                    </div>
                    <span class="app-dropdown-label">{{username}}</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="logout" v-t="'button.logout'"></el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <span class="app-header-line m-r-xs"></span>
            <i class="iconfont icon-quanping" :class="screen ? 'icon-tuiquanping' : 'icon-quanping'" @click="fullScreen"></i>
            <i class="iconfont icon-wenti-o"></i>
            <i class="iconfont icon-kefu" @click="$helper.openYsf"></i>
            <span class="app-header-line m-l-xs m-r-xs m-l-xs"></span>
            <el-dropdown class="app-dropdown-locale" @command="locale => $i18n.locale = locale">
                <div>
                    <i class="iconfont icon-diqiu"></i>
                    <span class="app-dropdown-label">{{localename}}</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item, index) in locales" :command="item.value" :key="index">{{item.text}}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-header>
        <el-container class="h-full">
            <aside class="app-aside">
                <el-scrollbar wrapClass="scrollbar-wrapper" :style="'height: ' + (ch + 32) + 'px;'">
                    <ul>
                        <li v-for="(item, index) in menu" :key="item.url" @click="openView(item)" :class="{'active': active === index}">
                            <i :class="item.icon"></i>
                            <div>{{item.title}}</div>
                        </li>
                    </ul>
                </el-scrollbar>
            </aside>
            <views v-if="viewEnabled" @viewChange="setActiveView"></views>
            <el-main class="app-main" v-else>
                <section :style="'height:' + (ch - 10) + 'px;'">
                    <keep-alive>
                        <router-view :key="$route.fullPath"></router-view>
                    </keep-alive>
                </section>
            </el-main>
        </el-container>
        <el-drawer :visible="backlog.visible" width="380px" class="app-drawer">
            <div slot="title">{{$helper.renderText($t('app.information'), { len: backlog.total })}}</div>
            <ul class="backlog-list" v-infinite-scroll="loadNextBacklog">
                <li v-for="(item, index) in backlog.items" :key="index">
                    <span>{{index}}</span>
                    <div>{{item.name}}</div>
                    <span class="text-info">{{$helper.dateFormat(item.date, 'yyyy-MM-dd')}}</span>
                </li>
            </ul>
        </el-drawer>
    </el-container>
</template>

<script>
import { mapState } from 'vuex';
import views from '@/components/views.vue';
import { permission, logout } from '@/service/mainApi';

export default {
    components: {
        views
    },
    data() {
        return {
            /* 是否开启多tab打开 */
            viewEnabled: true,
            screen: false,
            active: 0,
            menu: [{
                icon: 'iconfont icon-zhuye',
                url: '/pages/main/home',
                title: '首页'
            }, {
                icon: 'iconfont icon-tupianzhanshi',
                url: '/pages/main/center',
                title: '应用中心'
            }, {
                icon: 'iconfont icon-liebiaozhanshi',
                url: '/pages/main/news',
                title: '新闻资讯'
            }, {
                icon: 'iconfont icon-shezhi',
                url: '/pages/main/settings',
                title: '设置中心'
            }],
            backlog: {
                visible: false,
                items: [],
                total: 0,
                query: {
                    pagesize: 20,
                    pagenumber: 1
                }
            }
        };
    },
    computed: {
        ...mapState({
            ch: state => state.ch,
            username: state => state.username,
            identity: state => state.identity,
            avatar: state => state.avatar,
            system: state => state.system,
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
    },
    methods: {
        openView(view) {
            if (this.viewEnabled) {
                this.$store.dispatch('openView', view);
            } else {
                if (typeof view === 'object') {
                    view = view.url;
                }
                this.$router.push({ path: view });
            }
        },
        setActiveView(url) {
            var item,
                len = this.menu.length;
            while (len--) {
                item = this.menu[len];
                if (item.url === url) {
                    this.active = len;
                    return;
                }
            }
            this.active = '';
        },
        handleCommand(type) {
            if (type === 'logout') {
                logout().then(res => {
                    if (res.code !== 'success') {
                    this.$message.error(res.message);
                    return false;
                    }
                    this.$store.dispatch('logout', true);
                });
                return false;
            }
        },
        fullScreen() {
            this.screen = !this.screen;
            helper.fullScreen(this.screen);
        }
    },
    mounted() {
        this.openView(helper.extend({ closable: true }, this.menu[0]));
    },
    created() {

    }
};
</script>

<style lang="less">
.app-container {
    width: 100%;
    height: 100%;
}
.app-container .app-header {
    display: none;
}
.app-container .app-main {
    padding: 0;
    overflow-x: hidden;
}
.app-container.header-show .app-header {
    display: flex;
    height: 64px !important;
    background: #F2F3F5;
    padding: 0 10px 0 80px;
    border-bottom: 1px solid #E5E5E5;
}
.app-main section {
    height: 100%;
    overflow: auto;
}
.app-header .title {
    color: #fff;
    position: relative;
    left: -80px;
    width: 80px;
    height: 64px;
    line-height: 64px;
    overflow: hidden;
    font-family: "PingFangSC-Semibold";
    background: #0067B2;
    text-align: center;
}
.app-header .title .icon-geelylogo2 {
    font-size: 24px;
}
.app-header .nav {
    flex: 1;
}
.app-header .el-dropdown {
    text-align: center;
    align-self: center;
    height: 36px;
    line-height: 36px;
    .el-dropdown-selfdefine {
        height: 36px;
    }
    .el-icon--right {
        float: right;
        line-height: 36px;
        margin: 0 4px;
    }
    .icon-diqiu {
        float: left;
        padding-right: 4px;
    }
    .avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        overflow: hidden;
        float: left;
        display: flex;
        margin-right: 4px;
        img {
            width: 100%;
        }
    }
    .app-dropdown-label {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
        max-width: 60px;
        text-align: right;
    }
    .app-dropdown-locale .app-dropdown-label {
        max-width: 45px;
    }
}
.app-header > .app-header-line {
    border-left: 1px solid #CCCCCC;
    height: 14px;
    align-self: center;
}
.app-header > .iconfont {
    padding: 8px;
    align-self: center;
}
.app-aside {
    background: #0067B2;
    color: rgba(255, 255, 255, 0.90);
    overflow: hidden;
    height: 100%;
    width: 80px;
    position: relative;
    box-sizing: border-box;
    flex-shrink: 0;
}
.app-aside .el-scrollbar__wrap {
    overflow-x: hidden;
}
.app-aside ul {
    padding: 0;
    margin: 0;
}
.app-aside ul li {
    padding: 16px 0;
    text-align: center;
    cursor: pointer;
}
.app-aside ul li i {
    font-size: 24px;
    height: 24px;
    line-height: 24px;
}
.app-aside ul li div {
    height: 18px;
    line-height: 18px;
    margin-top: 8px;
    font-size: 12px;
}
.app-aside ul li.active,
.app-aside ul li:hover {
    color: #FFFFFF;
}
.backlog-list {
    padding: 0;
    margin: 0;
    li {
        display: flex;
        height: 50px;
        line-height: 50px;
        padding: 0 16px;
        box-shadow: inset 0 -1px 0 0 #E5E5E5;
        div {
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding: 0 8px;
        }
    }
}
</style>
