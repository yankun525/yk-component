import axios from 'axios';
import { Loading } from 'element-ui';
import helper from './helper';

/**
 * config
 * loading  设置成false则该xhr不加载loading
 * redirect 未登录情况下是否跳转登录
 * axios.get(url, { loading: false });
 * axios.post(url, data, { loading: false });
 */

// 是否开启CSRF
axios.CSRF = false;

// 设置xhr Request Header里CSRF的key
axios.CSRF_TOKEN = 'x-csrf-token';

/**
 *  @Author    hyj
 *  @DateTime  2020-04-10
 *  mask 统一处理loading 显示时间为第一个接口开始到最后一个接口完成
 *  从第一个xhr开始计数 显示loading
 *  进来一个xhr count自增一次
 *  出去一个xhr count自减一次
 *  当count减为0时取消loading
 */
const mask = {
    count: 0,
    add(xhr) {
        if (!this.$loading) {
            this.$loading = Loading.service({
                lock: true,
                text: helper.i18n.t('common.loading'),
                background: 'rgba(0, 0, 0, 0.7)'
            });
        }
        this.count++;
        xhr.then(() => {
            this.remove();
        }).catch(() => {
            this.remove();
        });
    },
    remove() {
        this.count = this.count < 1 ? 0 : this.count - 1;
        if (this.count === 0) {
            this.$loading.close();
            this.$loading = null;
            this.promise = null;
        }
    }
};

// api的base_url
axios.defaults.baseURL = process.env.BASE_URL;

axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';

// request 接口开始前统一处理
axios.interceptors.request.use(config => {
    let method = config.method;
    // 防止csrf攻击
    if (axios.CSRF && localStorage.getItem(axios.CSRF_TOKEN)) {
        config.headers[axios.CSRF_TOKEN] = localStorage.getItem(axios.CSRF_TOKEN);
    }
    // 处理传递参数
    // 去除空参数
    // config.data = helper.objTrim(config.data);
    // 参数加入到url里
    config.url = helper.renderText(config.url, config.data, function(value, key) {
        key && delete config.data[key];
    });
    method && (method = method.toLocaleLowerCase());
    // 参数接收调整
    if (method === 'get' || method === 'delete' || method === 'patch') {
        // Query String Parameters
        // get delete 接口缓存
        config.data = helper.param(config.data);
        if (config.data) config.data += '&';
        config.data += '_=' + Date.now();
        config.url += (config.url.indexOf('?') === -1 ? '?' : '&') + config.data;
        config.data = null;
    } else {
        // Request Payload
        // application/json JSON.stringify 处理格式 {...}
        config.headers['Content-Type'] = 'application/json';
        config.data = JSON.stringify(config.data);
        // Form Data
        // application/x-www-form-urlencoded|multipart/form-data
        // 表单提交格式 ..=..&..=..
        // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        // config.data = helper.param(config.data);
    }
    return config;
}, error => {
    Promise.reject(error);
});

// respone 接口返回统一处理
axios.interceptors.response.use(response => {
    if (axios.CSRF && response && response.headers[axios.CSRF_TOKEN]) {
        localStorage.setItem(axios.CSRF_TOKEN, response.headers[axios.CSRF_TOKEN]);
    }
    if (response.data && response.data.code === 'user-not-login' && response.config.redirect !== false) {
        window.store.dispatch('logout', true);
        new Error('user-not-login');
    }
    return response.status !== 200 ? new Error(response.status) : response.data;
}, (error, response) => {
    if (!response) response = error.response;
    if (axios.CSRF && response && response.headers[axios.CSRF_TOKEN]) {
        localStorage.setItem(axios.CSRF_TOKEN, response.headers[axios.CSRF_TOKEN]);
    }
    if (error && error instanceof error.constructor && error.__CANCEL__) {
        return Promise.resolve(error);
    }
    return Promise.reject(error);
});

const adapter = axios.defaults.adapter;

axios.defaults.adapter = function(config) {
    let promise = adapter(config);
    // 是否加载loading
    if (config.loading !== false) {
        mask.add(promise);
    }
    return promise;
};

export default axios;
