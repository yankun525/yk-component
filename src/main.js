import Vue from 'vue';

import App from './App.vue';

import 'normalize.css';

import './plugins/element';

import './less/app.less';

import './less/iconfont/iconfont.css';

import i18n from './i18n';

import Vuex from 'vuex';

import appstore from './store';

import router from './router';

import helper from '@/plugins/helper';

import axios from './plugins/request';

import plugins from '@/components';

import './plugins/highlight';

import {
    sessionInfo,
    ssologin,
    logout,
    getParams,
    getSelect
} from '@/service/mainApi';

Vue.config.productionTip = false;

const request = [];

Vue.use(Vuex);

Vue.use(plugins);

window.Vue = Vue;

const store = window.store = new Vuex.Store(appstore);

helper.i18n = i18n;

helper.init();

window.helper = helper;

Vue.prototype.$select = helper.select;

Vue.prototype.$helper = helper;

router.beforeEach((to, from, next) => {
    /* 如果有跳转的路径且有meta且已经登录 */
    if (to && to.meta && to.meta.loggedIn !== false) {
        if (!store.state.loggedIn && to.path !== store.state.loginUrl[store.state.identity]) {
            store.dispatch('logout', true);
            return false;
        }
    }
    next();
});

function resize() {
    store.dispatch('height', document.documentElement.clientHeight);
}
window.onresize = () => resize();
resize();

if (!window.dropdownManager) {
    window.dropdownManager = {
        guid: 0,
        events: []
    };
    window.addDropdownEvent = function(handle) {
        var events;
        if (typeof handle === 'function') {
            events = {
                guid: window.dropdownManager.guid++,
                handle: handle
            };
            window.dropdownManager.events.push(events);
            return events.guid;
        }
        return null;
    };
    window.removeDropdownEvent = function(guid) {
        var k = 0,
            events = window.dropdownManager.events,
            len = events.length;
        while (k < len) {
            if (events[k].guid === guid) {
                events.splice(k, 1);
                return;
            }
            k++;
        }
    };
    window.dropdownEvent = function() {
        var k = 0,
            events = window.dropdownManager.events,
            len = events.length;
        while (k < len) {
            try {
                events[k].handle.apply(this, arguments);
            } catch (e) {
                window.console.error(e.stack);
            }
            k++;
        }
    };
    document.body.addEventListener('click', function() {
        window.dropdownEvent.apply(this, arguments);
    });
}

/* ie router bug修复 */
const IE11RouterFix = {
    methods: {
        hashChangeHandler: function() {
            this.$router.push(window.location.hash.substring(1, window.location.hash.length));
        },
        isIE11: function() {
            return !!window.MSInputMethodContext && !!document.documentMode;
        }
    },
    mounted: function() {
        if (this.isIE11()) {
            window.addEventListener('hashchange', this.hashChangeHandler);
        }
    },
    destroyed: function() {
        if (this.isIE11()) {
            window.removeEventListener('hashchange', this.hashChangeHandler);
        }
    }
};

let param = helper.getRequestParam(),
    ticket = param ? param.ticket || param.token : null;
if (ticket) {
    request.push(ssologin({ ticket: ticket }).then(res => {
        if (res.code === 'success') {
            if (param.redirectUrl) {
                store.dispatch('go', store.state.mainUrl[store.state.identity]);
            } else {
                param = location.href.replace(new RegExp('\\??ticket=' + ticket + '+&?'), '');
                if (param !== location.origin) {
                    location.href = param;
                } else {
                    store.dispatch('go', location.hash);
                }
            }
            store.dispatch('login', res.data);
        } else {
            logout();
            store.dispatch('logout', true);
        }
    }));
} else {
    request.push(sessionInfo().then(res => {
        if (res.code === 'success') {
            store.dispatch('login', res.data);
        } else {
            store.dispatch('logout');
        }
    }));
}

request.push(getSelect().then(res => {
    if (res.code !== 'success') {
        return false;
    }
    helper.select.initOptions({
        data: res.data.items,
        keys: {
            single: 'single',
            enabled: 'enabled',
            sex: 'sex',
            checkstatus: 'checkstatus'
        }
    });
    res.data.items.map(item => {
        helper.SYS_PARAM[item.paramcode] = item.paramvalue;
    });
}));

request.push(getParams().then(res => {
    if (res.code !== 'success') {
        return false;
    }
    res.data.items.map(item => {
        helper.SYS_PARAM[item.paramcode] = item.paramvalue;
    });
}));

axios.all(request).then(() => {
    window.$$app = new Vue({
        store,
        router,
        i18n,
        render: h => h(App),
        mixins: [IE11RouterFix]
    }).$mount('#app');
});

