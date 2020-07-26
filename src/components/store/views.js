import helper from '@/plugins/helper';

/**
 *  @Author    hyj
 *  @DateTime  2020-03-12
 *  tab方式打开页面
 *  系统页面使用keep-alive 通过路由跳转实现页面切换
 *  外部页面通过嵌入iframe 实现 如果需要统一登录可使用helper.setTicket(url)
 */

const state = {
    /* 保存每个tab页配置项 */
    views: [],
    /* 当前打开的tab页 */
    viewActive: null,
    /* 自增生成每个tab页唯一key */
    index: 0,
    /* 当前展示tab是iframe的话，显示该tab的url，否则为null */
    origin: null,
    /* 移除keep-alive cache */
    viewCache: null,
    /* viewActive 改变的时候回调 */
    viewChange: null,
    /* 没打开页面时的url */
    defaultUrl: ''
};

const defaults = {
    /* tab的label值 */
    title: null,
    /* 页面地址, 保持唯一 */
    url: null,
    /* 关闭页面后回调 */
    onClosed: null,
    /* 默认是否允许关闭 */
    closable: true,
    /* 是否frame打开 true为同源 */
    origin: null
};

const mutations = {
    openView(state, view) {
        let page;
        if (typeof view === 'string') {
            page = mutations.getView(state, view);
        } else {
            view = helper.extend({}, defaults, view);
            if (!view.url || !view.title) {
                return false;
            }
            page = mutations.getView(state, view.url);
            if (!page) {
                view.index = state.index++;
                if (typeof view.origin !== 'boolean') {
                    view.origin = view.url.charAt(0) === '/';
                }
                state.views.push(view);
                page = view;
            }
        }
        if (!page || !page.url || page.url === state.viewActive) {
            return false;
        }
        mutations.initActive(state, page.url);
        if (page.origin) {
            helper.go(page.url);
        }
        state.origin = page.origin ? null : page.url;
    },
    closeView(state, view) {
        var index,
            closed;
        if (typeof view === 'object') {
            if (typeof view.closed === 'boolean') {
                closed = view.closed;
                view = view.view || {};
            }
            index = mutations.getViewIndex(state, view.url, 'url');
        } else if (view === undefined) {
            index = mutations.getViewIndex(state, state.viewActive, 'url');
        } else if (typeof view === 'string') {
            index = mutations.getViewIndex(state, view, 'url');
        } else if (typeof view === 'number') {
            index = view;
        }
        if (typeof index !== 'number' || index < 0 || index > state.length - 1) {
            return false;
        }
        view = state.views[index];
        if (!closed && ! view.closable) {
            return false;
        }
        mutations.removerView(state, view, index);
        if (state.views.length > 0) {
            if (mutations.getViewIndex(state, state.viewActive, 'url') === undefined) {
                index = Math.max(0, index - 1);
                index = Math.min(index, state.views.length - 1);
                index = state.views[index];
                mutations.initActive(state, index.url);
                if (index.origin) {
                    helper.go(index.url);
                }
                state.origin = index.origin ? null : index.url;
            }
        } else {
            helper.go(state.defaultUrl);
            mutations.initActive(state, null);
            state.origin = null;
        }
    },
    closeOtherView(state, url) {
        var view,
            views = state.views,
            len = views.length,
            closed;
        if (typeof url === 'object') {
            if (typeof url.closed === 'boolean') {
                closed = url.closed;
                url = url.view || {};
            }
            url = url.url;
        }
        if (!url) {
            url = state.viewActive;
        }
        while (len--) {
            view = views[len];
            if (view.url !== url && (closed || view.closable)) {
                mutations.removerView(state, view, len);
            }
        }
    },
    /* closed 是否强制关闭 true时可关闭不允许关闭的tab */
    closeAllView(state, closed) {
        var view,
            views = state.views,
            len = views.length,
            curIndex = mutations.getViewIndex(state, state.viewActive, 'url'),
            index = curIndex;
        if (closed !== true) {
            closed = false;
        }
        while (len--) {
            view = views[len];
            if (closed || view.closable) {
                mutations.removerView(state, view, len);
                if (len <= curIndex) {
                    index--;
                }
            }
        }
        if (views.length > 0) {
            index = Math.max(0, index);
            view = views[index];
            mutations.initActive(state, view.url);
            if (view.origin) {
                helper.go(view.url);
            }
            state.origin = view.origin ? null : view.url;
        } else {
            helper.go(state.defaultUrl);
            mutations.initActive(state, null);
            state.origin = null;
        }
    },
    emptyView(state) {
        helper.go(state.defaultUrl);
        state.views = [];
        mutations.initActive(state, null);
        state.origin = null;
    },
    removerView(state, view, index) {
        if (typeof state.viewCache === 'function') {
            state.viewCache(view, index);
        }
        state.views.splice(index, 1);
        if (typeof view.onClosed === 'function') {
            view.onClosed.call(state, view, index);
        }
    },
    getView(state, url) {
        var k = 0,
            view,
            len = state.views.length;
        while (k < len) {
            view = state.views[k];
            if (view.url === url) {
                return view;
            }
            k++;
        }
    },
    getViewIndex(state, value, key) {
        var k = 0,
            view,
            len = state.views.length;
        while (k < len) {
            view = state.views[k];
            if (view[key] === value) {
                return k;
            }
            k++;
        }
    },
    onViewCache(state, callback) {
        if (typeof callback === 'function') {
            state.viewCache = callback;
        }
    },
    onViewChange(state, callback) {
        if (typeof callback === 'function') {
            state.viewChange = callback;
        }
    },
    initActive(state, url) {
        state.viewActive = url;
        if (typeof state.viewChange === 'function') {
            state.viewChange(url);
        }
    },
    prevView(state) {
        var index = mutations.getViewIndex(state, state.viewActive, 'url') - 1;
        if (index >= 0 && index < state.views.length) {
            mutations.openView(state, state.views[index].url);
        }
    },
    nextView(state) {
        var index = mutations.getViewIndex(state, state.viewActive, 'url') + 1;
        if (index >= 0 && index < state.views.length) {
            mutations.openView(state, state.views[index].url);
        }
    },
    initDefaultUrl(state, url) {
        state.defaultUrl = url;
    }
};

const actions = {
    openView(context, view) {
        context.commit('openView', view);
    },
    closeView(context, view) {
        context.commit('closeView', view);
    },
    closeOtherView(context, view) {
        context.commit('closeOtherView', view);
    },
    closeAllView(context, closed) {
        context.commit('closeAllView', closed);
    },
    emptyView(context) {
        context.commit('emptyView');
    },
    onViewCache(context, callback) {
        context.commit('onViewCache', callback);
    },
    onViewChange(context, callback) {
        context.commit('onViewChange', callback);
    },
    prevView(context) {
        context.commit('prevView');
    },
    nextView(context) {
        context.commit('nextView');
    },
    initDefaultUrl(context, url) {
        context.commit('initDefaultUrl', url);
    }
};

const getters = {
    getView: store => url => {
        if (url === undefined) {
            if (router && router.options.mode === 'history') {
                url = router.history.current.path;
            } else {
                url = location.hash.substr(1, location.hash.length - 1);
            }
        }
        return mutations.getView(store, url);
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
