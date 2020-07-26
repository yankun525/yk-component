import Vue from 'vue';

import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [{
    path: '/pages',
    name: 'pages',
    meta: {
        loggedIn: false
    },
    component: {
        render: c => c('router-view')
    },
    children: [{
        path: 'login',
        meta: {
            loggedIn: false
        },
        component: () => import('@/views/login/login.vue'),
    }, {
        path: 'main',
        component: () => import('@/views/main/main.vue'),
        children: [{
            path: 'test',
            component: () => import('@/views/main/test.vue')
        }]
    }, {
        path: 'apps',
        component: () => import('@/views/apps/apps.vue'),
        children: [{
            path: 'calendar',
            component: () => import('@/views/plugins/test-calendar.vue')
        }, {
            path: 'avatar',
            component: () => import('./views/plugins/test-avatar.vue')
        }, {
            path: 'countdown',
            component: () => import('./views/plugins/test-countdown.vue')
        }, {
            path: 'slider',
            component: () => import('./views/plugins/test-slider.vue')
        }, {
            path: 'tableconfig',
            component: () => import('@/views/expand/test-tableconfig.vue')
        }, {
            path: 'tablesettings',
            component: () => import('@/views/expand/test-tablesettings.vue')
        }, {
            path: 'watermark',
            component: () => import('@/views/expand/watermark.vue')
        }, {
            path: 'singletools',
            component: () => import('@/views/expand/singletools.vue')
        }, {
            path: 'multitools',
            component: () => import('@/views/expand/multitools.vue')
        }, {
            path: 'treetools',
            component: () => import('@/views/expand/treetools.vue')
        }, {
            path: 'select',
            component: () => import('@/views/apps/select.vue')
        }, {
            path: 'request',
            component: () => import('@/views/apps/request.vue')
        }, {
            path: 'rendertext',
            component: () => import('@/views/apps/rendertext.vue')
        }, {
            path: 'animate',
            component: () => import('@/views/apps/animate.vue')
        }, {
            path: 'regexp',
            component: () => import('@/views/apps/regexp.vue')
        }]
    }, {
        path: 'views',
        component: () => import('./views/plugins/test-views.vue'),
        children: [{
            path: 'close',
            component: () => import('@/views/plugins/test-views-close.vue')
        }, {
            path: 'next',
            component: () => import('@/views/plugins/test-views-next.vue')
        }, {
            path: 'count',
            component: () => import('@/views/plugins/test-views-count.vue')
        }]
    }]
}]

const router = new VueRouter({
    mode: 'history',
    // mode: 'hash',
    base: process.env.BASE_URL,
    routes
});

window.router = router;

export default router;