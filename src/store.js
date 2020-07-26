import helper from '@/plugins/helper';

const identity = ['identity'];

let _identity = localStorage.getItem('identity');

if (identity.indexOf(_identity) === -1) _identity = identity[0];

const state = {
    /* 父级嵌入系统 无则无嵌入 */
    system: window.app_system || '',
    /* 是否登录 */
    loggedIn: localStorage.getItem('logged-in') === 'true',
    /* 用户身份 */
    identity: _identity,
    phone: localStorage.getItem('phone') || '',
    cookieOut: false,
    cookieOutTimer: 60000,
    /* 不同用户身份的登录首页 */
    mainUrl: {
        identity: '/pages/apps'
    },
    /* 不同用户身份的登录页 */
    loginUrl: {
        identity: '/pages/internallogin'
    },
    /* 页面高度 自动计算 根据system进行调整 */
    ch: 0,
    /* 页面高度 自动计算 */
    CH: 0,
    /* 表格pageSizes */
    pageSizes: [10, 20, 30, 50, 100, 200],
    /* 有按钮权限时可进行配置 调用getter btns 获取当前路由下按钮权限 */
    buttons: {},
    locales: [{
        value: 'zh_CN',
        text: '中文'
    }, {
        value: 'en',
        text: 'English'
    }]
};

const keys = [
    'ticket',
    'username',
    'userno',
    'userphone',
    'avatar'
];

keys.map(key => {
    state[key] = '';
});

const mutations = {
    login(state, option) {
        var data = option.data;
        if (state.cookieOut === true && mutations.checkCookie(state)) {
            mutations.logout(state);
            return false;
        }
        keys.map(key => {
            state[key] = data[key];
        });
        if (state.loggedIn !== true) {
            state.loggedIn = true;
            localStorage.setItem('logged-in', true);
            localStorage.setItem('logged-time', new Date().getTime());
        }
        if (mutations.filterHash() || option.redirect) {
            mutations.go(state.mainUrl[state.identity]);
        }
    },
    logout(state, redirect) {
        state.phone = '';
        localStorage.setItem('phone', state.phone);
        keys.map(key => {
            state[key] = '';
        });
        if (state.loggedIn !== false) {
            state.loggedIn = false;
            localStorage.setItem('logged-in', false);
            localStorage.setItem('logged-time', '');
        }
        if (mutations.filterHash() || redirect) {
            if (state.system === 'gpm') {
                window.sendGpmMessage({ event: 'logout' });
            } else {
                mutations.go(state.loginUrl[state.identity]);
            }
        }
    },
    filterHash(url) {
        var router = window.router;
        if (router && router.options && router.options.mode === 'history') {
            if (!url) url = location.pathname;
            return url === '' || url === '/';
        } else {
            if (!url) url = location.hash;
            return url === '' || url === '#/';
        }
    },
    checkCookie(state) {
        var loggedTime = parseInt(localStorage.getItem('logged-time'));
        return state.loggedIn === true && loggedTime && (loggedTime + state.cookieOutTimer) < new Date().getTime();
    },
    go(state, url) {
        if (typeof state === 'string') {
            url = state;
        } else if (typeof state === 'function') {
            url = state();
        }
        if (typeof url === 'function') {
            url = url();
        }
        helper.go(url);
    },
    identity(state, identity) {
        if (identity !== state.identity) {
            state.identity = identity;
            localStorage.setItem('identity', identity);
        }
    },
    height(state, height) {
        state.CH = height;
        state.ch = state.system ? height - 32 : height - 96;
    },
    actions(state, action) {
        var items,
            btns = {};
        if (action) {
            for (var i in action) {
                items = action[i];
                btns[i] = {};
                if (Array.isArray(items)) {
                    items.map(item => {
                        btns[i][item.code] = true;
                    });
                }
            }
            state.buttons = btns;
        }
    },
    initButton(state, type) {
        if (type === undefined) {
            type = location.hash.substr(1, location.hash.length - 1);
        } else if (type && type.$route) {
            type = type.$route.path;
        }
        return state.btns[type] || {};
    },
    system(state, type) {
        state.system = type;
        state.ch = state.system ? state.CH - 30 : state.CH - 90;
    }
};

const actions = {
    login(context, data) {
        context.commit('login', {
            data: data
        });
    },
    redirect(context, data) {
        context.commit('login', {
            data: data,
            redirect: true
        });
    },
    logout(context) {
        var args = Array.prototype.slice.call(arguments, 1);
        args.unshift('logout');
        context.commit.apply(context, args);
    },
    go(context, url) {
        context.commit('go', url);
    },
    identity(context, identity) {
        context.commit('identity', identity);
    },
    height(context, height) {
        context.commit('height', height);
    },
    actions(context, data) {
        context.commit('actions', data);
    },
    initButton(context, type) {
        context.commit('initButton', type);
    },
    system(context, type) {
        context.commit('system', type);
    }
};

const getters = {
    btns: () => type => {
        var index;
        if (type === undefined) {
            type = location.hash.substr(1, location.hash.length - 1);
            index = type.indexOf('?');
            if (index !== -1) type = type.substr(0, index);
        } else if (type && type.$route) {
            type = type.$route.path;
        }
        return state.buttons[type] || {};
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
