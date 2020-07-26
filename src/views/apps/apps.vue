<template>
    <el-container class="app-container" :class="{'header-show': !system, 'app-iscollapse': isCollapse}">
        <el-header class="app-header">
            <div class="title">
                <i class="iconfont icon-zhuye"></i>
                <span>YK WEB</span>
            </div>
            <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" @click="isCollapse = !isCollapse" class="app-header-fold"></i>
            <ul class="app-header-nav">
                <li v-for="item in root" :key="item.path" @click="handleSelect(item)" :class="{'active': item.path === active}">{{item.name}}</li>
            </ul>
            <el-dropdown class="app-dropdown-locale" @command="locale => $i18n.locale = locale">
                <div>
                    <i class="iconfont icon-diqiu"></i>
                    <span class="app-dropdown-label">{{localename}}</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="item in locales" :command="item.value" :key="item.value">{{item.text}}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <i class="iconfont icon-quanping" :class="screen ? 'icon-tuiquanping' : 'icon-quanping'" @click="fullScreen"></i>
            <i class="iconfont icon-kefu"></i>
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    <div class="avatar">
                        <img :src="avatar" v-if="avatar" />
                        <i class="iconfont icon-yonghu-1" v-else></i>
                    </div>
                    <span class="username">{{username}}</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="logout" v-t="'button.logout'"></el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-header>
        <el-container class="h-full">
            <el-aside class="app-aside">
                <el-scrollbar wrapClass="scrollbar-wrapper" :style="'height: ' + (ch + 32) + 'px;'">
                    <el-menu @select="openView" :default-active="asideActive" :collapse="isCollapse" :collapse-transition="false" mode="vertical" class="app-aside-menu">
                        <template v-for="item in aside">
                            <el-submenu :index="item.path" :key="item.path" v-if="item.children">
                                <template slot="title">
                                    <i :class="item.icon" v-if="item.icon"></i>
                                    <span slot="title">{{item.name}}</span>
                                </template>
                                <template v-for="data in item.children">
                                    <el-submenu :index="data.path" :key="data.path" v-if="data.children">
                                        <template slot="title">
                                            <i :class="data.icon" v-if="data.icon"></i>
                                            <span slot="title">{{data.name}}</span>
                                        </template>
                                        <template v-for="node in data.children">
                                            <el-menu-item :index="node.path" :key="node.path">
                                                <i :class="node.icon" v-if="node.icon"></i>
                                                <span slot="title">{{node.name}}</span>
                                            </el-menu-item>
                                        </template>
                                    </el-submenu>
                                    <el-menu-item :index="data.path" :key="data.path">
                                        <i :class="data.icon" v-if="data.icon"></i>
                                        <span slot="title">{{data.name}}</span>
                                    </el-menu-item>
                                </template>
                            </el-submenu>
                            <el-menu-item :index="item.path" :key="item.path" v-else>
                                <i :class="item.icon" v-if="item.icon"></i>
                                <span slot="title">{{item.name}}</span>
                            </el-menu-item>
                        </template>
                    </el-menu>
                </el-scrollbar>
            </el-aside>
            <views v-if="viewEnabled" @viewChange="setActiveView"></views>
            <el-main class="app-main" v-else>
                <section :style="'height:' + (ch - 10) + 'px;'">
                    <router-view :key="$route.fullPath"></router-view>
                </section>
            </el-main>
        </el-container>
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
            /* 是否显示头部菜单 */
            topShow: true,
            /* 设置默认左侧菜单隐藏显示 */
            isCollapse: false,
            /* 是否在点击nav打开 查询该菜单下第一个页面打开 */
            openFirstMenu: false,
            /* 是否全屏 */
            screen: false,
            /* 头部菜单打开index */
            active: '0',
            /* 左侧菜单打开index */
            asideActive: '',
            /* 是否开启多tab打开 */
            viewEnabled: true,
            nameField: 'permissionname',
            iconField: 'permissionicon',
            urlField: 'permissionurl',
            itemField: 'children',
            icons: '',
            menu: []
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
        },
        root() {
            return this.topShow ? this.menu : [];
        },
        aside() {
            var root;
            if (this.topShow) {
                root = this.menu[this.active];
                return root && root.children || [];
            } else {
                return this.menu;
            }
        }
    },
    watch: {
        topShow: 'setActiveView'
    },
    methods: {
        getFirstMenu(arr) {
            var k = 0,
                len,
                item;
                len = arr.length;
            while (k < len) {
                item = arr[k];
                if (item.url) {
                    return item;
                } else if (item.children && item.children.length > 0) {
                    item = this.getFirstMenu(item.children);
                    if (item) return item;
                }
                k++;
            }
        },
        handleSelect(root) {
            this.active = String(root.index);
            /* 打开绑定页面 */
            if (root && root.url) {
                this.openView(root);
            } else if (this.openFistMenu) {
                root = this.getFirstMenu(root.children || []);
                if (root && root.url) {
                    this.openView(root);
                }
            }
        },
        setActiveView(view) {
            if (typeof view === 'string') {
                view = this.hash[view];
            }
            if (!view) {
                view = this.hash[this.$route.path];
            }
            if (view) {
                this.active = this.topShow ? view.path.charAt(0) : '';
                this.asideActive = view.path;
            }
        },
        openView(view) {
            if (typeof view === 'string') {
                let menu = this.menu;
                view.split('-').map(key => {
                    view = menu[key] || {};
                    menu = view.children || [];
                });
            }
            if (!view) return;
            if (this.viewEnabled) {
                this.$store.dispatch('openView', {
                    title: view.name,
                    url: view.url,
                    origin: view.origin
                });
            } else {
                this.$router.push({ path: view.url });
            }
        },
        handleCommand(type) {
            switch (type) {
                case 'logout':
                    logout().then(res => {
                        if (res.code !== 'success') {
                            this.$message.error(res.message);
                            return false;
                        }
                        this.$store.dispatch('logout', true);
                    });
                    break;
                case 'root':
                    helper.go(this.rooturl);
                    break;
            }
        },
        fullScreen() {
            this.screen = !this.screen;
            helper.fullScreen(this.screen);
        },
        initMenu(data) {
            var items = { root: [] };
            this.hash = {};
            this.watchTree(data, 0, items);
            console.log(items.children)
            debugger
            this.menu = items.children;
        },
        watchTree(arr, level, items) {
            let index = 0;
            level++;
            items.children = [];
            arr.map(data => {
                let item = {},
                    children;
                item.name = data[this.nameField];
                item.level = level;
                item.index = index;
                item.icon = data[this.iconField] || this.icons;
                if (data[this.urlField]) {
                    item.url = data[this.urlField];
                    if (item.url === '/pages/views') {
                        item.origin = false;
                    }
                    if (!this.hash[item.url]) {
                        this.hash[item.url] = item;
                    }
                }
                item.root = items.root.slice();
                item.root.push(index);
                item.path = item.root.join('-');
                index++;
                items.children.push(item);
                children = data[this.itemField];
                if (Array.isArray(children) && children.length > 0) {
                    this.watchTree(children, item.level, item);
                }
            });
        }
    },
    created() {
        permission().then(res => {
            let page = this.$route.path;
            if (res.code !== 'success') {
                this.$message.error(res.message);
                return false;
            }
            this.initMenu(res.data || []);
            page = this.hash[page];
            if (!page && this.openFistMenu) {
                page = this.getFirstMenu(this.menu || []);
            }
            page && this.openView(page);
        });
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
.app-container.header-show  .app-header {
    display: flex;
    height: 60px !important;
    background: #16AAD8;
    color: #FFFFFF;
    padding: 0 10px 0 0;
}
.app-main section {
    height: 100%;
    overflow: auto;
}
.app-main.app-main-visible {
    padding-top: 40px;
    position: relative;
}
.app-header .title {
    width: 160px;
    line-height: 60px;
    font-size: 20px;
    font-weight: bold;
}
.app-header .title i {
    font-size: 24px;
    float: left;
    padding: 0 8px 0 20px;
    line-height: 62px;
}
.app-iscollapse .app-header .title {
    width: 64px !important;
}
.app-iscollapse .app-header .title span {
    display: none;
}
.app-header-fold {
    padding: 8px;
    align-self: center;
    font-size: 24px;
}
.app-header-nav {
    flex-direction: row;
    flex: 1;
    margin: 0;
    padding: 0;
}
.app-header-nav li {
    padding: 0 15px;
    float: left;
    font-size: 14px;
    line-height: 60px;
}
.app-header-nav li.active {
    background: #17B2E2;
}
.app-header-nav li:hover {
    background-color: #17B2E2;
}
.app-header .el-dropdown {
    text-align: center;
    align-self: center;
    height: 36px;
    line-height: 36px;
    color: #FFFFFF;
}
.app-header .el-dropdown .el-dropdown-selfdefine {
    height: 36px;
}
.app-header .el-dropdown .el-icon--right {
    float: right;
    line-height: 36px;
    margin: 0 4px;
}
.app-header .el-dropdown .icon-diqiu {
    float: left;
    padding-right: 4px;
}
.app-header .el-dropdown .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: hidden;
    float: left;
    display: flex;
    margin-right: 4px;
}
.app-header .el-dropdown .avatar img {
    width: 100%;
}
.app-header .el-dropdown .avatar .iconfont {
    width: 100%;
    text-align: center;
}
.app-header .el-dropdown .app-dropdown-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
    max-width: 60px;
    text-align: right;
}
.app-header .el-dropdown .app-dropdown-locale .app-dropdown-label {
    max-width: 45px;
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
    background: #FFFFFF;
    overflow: hidden !important;
    height: 100%;
    box-shadow: inset -1px 0 0 0 rgba(0, 0, 0, 0.08);
    width: 200px !important;
    position: relative;
}
.app-iscollapse .app-aside {
    width: 65px !important;
}
.app-aside > .el-scrollbar {
    width: 199px;
}
</style>
