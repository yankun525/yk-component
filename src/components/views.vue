<template>
    <div class="app-main-view">
        <div class="app-views">
            <i class="iconfont icon-xiangzuo" @click="prevView" :title="$t('views.prev')"></i>
            <div class="app-views-tabs">
                <ul ref="viewtabs">
                    <li v-for="item in views" :key="item.url" @click="openView(item)" @contextmenu.prevent="e => menuExt(e, item)" :class="{'active': item.url === viewActive}">
                        <span>{{item.title}}</span>
                        <i class="iconfont icon-cuowu" v-show="item.closable" @click.stop="closeView(item)"></i>
                    </li>
                </ul>
            </div>
            <i class="iconfont icon-xiangyou" @click="nextView" :title="$t('views.next')"></i>
            <i class="iconfont icon-shanchu" @click="closeOtherView" :title="$t('views.closeother')"></i>
        </div>
        <section v-show="!origin" :style="'height:' + viewheight + 'px;'">
            <keep-alive>
                <router-view ref="view" :key="$route.fullPath"></router-view>
            </keep-alive>
        </section>
        <iframe v-for="item in pages" v-show="origin === item.url" :style="'height: ' + viewheight + 'px;'" :key="item.url" :src="item.url" scrolling="auto" frameborder="0" width="100%"></iframe>
    </div>
</template>

<script>
import store from './store/views';
import { mapState } from 'vuex';
const LOCALES = {};
LOCALES['zh_CN'] = {
    views: {
        prev: '上个页面',
        next: '下个页面',
        closecurrent: '关闭当前页面',
        closeother: '关闭其它页面',
        closeall: '关闭所有页面'
    }
};
LOCALES['en'] = {
    views: {
        prev: 'Prev View',
        next: 'Next View',
        closecurrent: 'Close Current View',
        closeother: 'Close Other View',
        closeall: 'Close All View'
    }
};

export default {
    props: {
        height: {
            type: [Number, String]
        },
        defaultUrl: {
            type: String
        }
    },
    data() {
        return {
        };
    },
    computed: {
        ...mapState({
            ch: state => state.ch,
            views: state => state.views.views,
            viewActive: state => state.views.viewActive,
            origin: state => state.views.origin
        }),
        pages() {
            return this.views.filter(page => !page.origin);
        },
        viewheight() {
            return parseInt(this.height) || this.ch;
        }
    },
    watch: {
        origin: val => helper[val ? 'addClass' : 'removeClass'](document.body, 'overflow')
    },
    methods: {
        openView(view) {
            this.$store.dispatch('openView', view);
        },
        closeView(view) {
            this.removeDropdown();
            this.$store.dispatch('closeView', view);
        },
        closeOtherView() {
            this.$store.dispatch('closeOtherView');
        },
        prevView() {
            this.$store.dispatch('prevView');
        },
        nextView() {
            this.$store.dispatch('nextView');
        },
        menuExt(e, view) {
            var html = [],
                dropdown = document.createElement('ul');
            this.removeDropdown();
            dropdown.className = 'app-dropdown';
            dropdown.style.left = e.pageX + 'px';
            dropdown.style.top = e.pageY + 'px';
            html.push('<li type="closeView">' + this.$t('views.closecurrent') + '</li>');
            html.push('<li type="closeOtherView">' + this.$t('views.closeother') + '</li>');
            html.push('<li type="closeAllView">' + this.$t('views.closeall') + '</li>');
            dropdown.innerHTML = html.join('');
            document.body.appendChild(dropdown);
            dropdown.onclick = (e) => {
                var li = e.target;
                if (li.nodeName !== 'LI') return;
                this.$store.dispatch(li.getAttribute('type'), view);
            };
        },
        removeDropdown() {
            var node,
                children = document.body.children,
                len = children.length;
            while (len--) {
                node = children[len];
                if (node.className === 'app-dropdown') {
                    document.body.removeChild(node);
                }
            }
        }
    },
    beforeCreate() {
        if (this.$store.state.views) {
            this.$store.unregisterModule('views');
        }
        this.$store.registerModule('views', store);
        this.$store.state.views.defaultUrl = this.$route.path;
        this.$store.dispatch('emptyView');
        this.$store.dispatch('onViewCache', view => {
            var keys,
                index,
                cache;
            if (!this.$refs || !this.$refs.view) return false;
            keys = this.$refs.view.$vnode.parent;
            if (keys) {
                if (keys.componentInstance) {
                    cache = keys.componentInstance.cache;
                    keys = keys.componentInstance.keys;
                } else {
                    return false;
                }
            } else {
                return false;
            }
            if (Array.isArray(keys)) {
                index = keys.indexOf(view.url);
                if (index !== -1) {
                    keys.splice(index, 1);
                }
            }
            if (cache[view.url]) {
                delete cache[view.url];
            }
        });
        this.$store.dispatch('onViewChange', viewActive => {
            this.$nextTick && this.$nextTick(() => {
                var scroll = 0,
                    k = 0,
                    view,
                    views = this.views,
                    len = views.length,
                    max,
                    $tab,
                    $tabs,
                    $parent = this.$refs.viewtabs,
                    width,
                    translate;
                if (!$parent) return;
                if (viewActive) {
                    max = $parent.parentNode.offsetWidth;
                    $tabs = $parent.children;
                    translate = parseInt($parent.style.transform.substring(11)) || 0;
                    while (k < len) {
                        view = views[k];
                        $tab = $tabs[k];
                        if (view.url !== viewActive) {
                            $tab && (scroll += $tab.offsetWidth);
                        } else {
                            width = $tab.offsetWidth;
                            break;
                        }
                        k++;
                    }
                    if (scroll + width + translate > max) {
                        translate = max - scroll - width;
                    } else if (scroll + translate < 0) {
                        translate = -scroll;
                    }
                }
                $parent.style.transform = 'translateX(' + translate + 'px)';
                this.$emit('viewChange', viewActive);
            });
        });
        window.addDropdownEvent(() => {
            this.removeDropdown();
        });
    },
    created() {
        if (this.defaultUrl) {
            this.$store.state.views.defaultUrl = this.defaultUrl;
        }
        if (this.$i18n) {
            Object.keys(LOCALES).map(locale => {
                this.$i18n.mergeLocaleMessage(locale, LOCALES[locale]);
            });
        } else {
            this.$t = key => this.$helper.getForJson(LOCALES['zh_CN'], key);
        }
    }
};
</script>

<style lang="css">
.app-main-view {
    padding: 32px 0 0 0;
    position: relative;
    overflow: hidden;
    flex: 1;
}
.app-main-view section {
    overflow: auto;
}
.app-views {
    position: absolute;
    height: 32px;
    width: 100%;
    top: 0;
    left: 0;
    font-size: 12px;
    user-select: none;
    padding: 0 48px 0 24px;
}
.app-views .icon-xiangzuo,
.app-views .icon-xiangyou,
.app-views .icon-shanchu {
    position: absolute;
    top: 0;
    width: 24px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border-bottom: 1px solid #E5E5E5;
    cursor: pointer;
    font-size: 12px;
}
.app-views .icon-xiangzuo {
    border-right: 1px solid #E5E5E5;
    left: 0;
}
.app-views .icon-xiangyou {
    border-left: 1px solid #E5E5E5;
    right: 24px;
}
.app-views .icon-shanchu {
    border-left: 1px solid #E5E5E5;
    right: 0;
}
.app-views-tabs {
    width: 100%;
    position: relative;
    height: 32px;
    overflow: hidden;
}
.app-views-tabs ul {
    position: relative;
    margin: 0;
    padding: 0;
    height: 32px;
    margin-right: -1px;
    white-space: nowrap;
    border-bottom: 1px solid #E5E5E5;
    transition: all 0.1s ease-in 0.1s;
}
.app-views-tabs ul li {
    display: inline-block;
    height: 32px;
    line-height: 32px;
    padding: 0 16px;
    border-right: 1px solid #E5E5E5;
    border-bottom: 1px solid #E5E5E5;
}
.app-views-tabs ul li.active {
    border-bottom: 1px solid #FFFFFF;
    color: #0067B2;
    font-weight: bold;
}
.app-views-tabs ul li .icon-cuowu {
    font-size: 12px;
    margin-left: 4px;
    cursor: pointer;
}
</style>