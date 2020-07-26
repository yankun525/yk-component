<template>
    <div class="p-m">
        <h2>
            <span>Request</span>
        </h2>
        <div class="app-highlight">
            <pre v-highlight>
                <code>{{code}}</code>
            </pre>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            code: 'import axios from \'axios\';\n\
import { Loading } from \'element-ui\';\n\
import helper from \'./helper\';\n\n\
/**\n\
 * config\n\
 * loading  设置成false则该xhr不加载loading\n\
 * redirect 未登录情况下是否跳转登录\n\
 * axios.get(url, { loading: false });\n\
 * axios.post(url, data, { loading: false });\n\
 */\n\n\
// 是否开启CSRF\n\
axios.CSRF = false;\n\n\
// 设置xhr Request Header里CSRF的key\n\
axios.CSRF_TOKEN = \'x-csrf-token\';\n\n\
/**\n\
 *  @Author    hyj\n\
 *  @DateTime  2020-04-10\n\
 *  mask 统一处理loading 显示时间为第一个接口开始到最后一个接口完成\n\
 *  从第一个xhr开始计数 显示loading\n\
 *  进来一个xhr count自增一次\n\
 *  出去一个xhr count自减一次\n\
 *  当count减为0时取消loading\n\
 */\n\
const mask = {\n\
    count: 0,\n\
    add(xhr) {\n\
        if (!this.$loading) {\n\
            this.$loading = Loading.service({\n\
                lock: true,\n\
                text: helper.i18n.t(\'common.loading\'),\n\
                background: \'rgba(0, 0, 0, 0.7)\'\n\
            });\n\
        }\n\
        this.count++;\n\
        xhr.then(() => {\n\
            this.remove();\n\
        }).catch(() => {\n\
            this.remove();\n\
        });\n\
    },\n\
    remove() {\n\
        this.count = this.count < 1 ? 0 : this.count - 1;\n\
        if (this.count === 0) {\n\
            this.$loading.close();\n\
            this.$loading = null;\n\
            this.promise = null;\n\
        }\n\
    }\n\
};\n\n\
// api的base_url\n\
axios.defaults.baseURL = process.env.BASE_URL;\n\n\
axios.defaults.headers[\'X-Requested-With\'] = \'XMLHttpRequest\';\n\n\
// request 接口开始前统一处理\n\
axios.interceptors.request.use(config => {\n\
    let method = config.method;\n\
    // 防止csrf攻击\n\
    if (axios.CSRF && localStorage.getItem(axios.CSRF_TOKEN)) {\n\
        config.headers[axios.CSRF_TOKEN] = localStorage.getItem(axios.CSRF_TOKEN);\n\
    }\n\
    // 处理传递参数\n\
    // 去除空参数\n\
    // config.data = helper.objTrim(config.data);\n\
    // 参数加入到url里\n\
    config.url = helper.renderText(config.url, config.data, function(value, key) {\n\
        key && delete config.data[key];\n\
    });\n\
    method && (method = method.toLocaleLowerCase());\n\
    // 参数接收调整\n\
    if (method === \'get\' || method === \'delete\' || method === \'patch\') {\n\
        // Query String Parameters\n\
        // get delete 接口缓存\n\
        config.data = helper.param(config.data);\n\
        if (config.data) config.data += \'&\';\n\
        config.data += \'_=\' + Date.now();\n\
        config.url += (config.url.indexOf(\'?\') === -1 ? \'?\' : \'&\') + config.data;\n\
        config.data = null;\n\
    } else {\n\
        // Request Payload\n\
        // application/json JSON.stringify 处理格式 {...}\n\
        config.headers[\'Content-Type\'] = \'application/json\';\n\
        config.data = JSON.stringify(config.data);\n\
        // Form Data\n\
        // application/x-www-form-urlencoded|multipart/form-data\n\
        // 表单提交格式 ..=..&..=..\n\
        // config.headers[\'Content-Type\'] = \'application/x-www-form-urlencoded\';\n\
        // config.data = helper.param(config.data);\n\
    }\n\
    return config;\n\
}, error => {\n\
    Promise.reject(error);\n\
});\n\n\
// respone 接口返回统一处理\n\
axios.interceptors.response.use(response => {\n\
    if (axios.CSRF && response && response.headers[axios.CSRF_TOKEN]) {\n\
        localStorage.setItem(axios.CSRF_TOKEN, response.headers[axios.CSRF_TOKEN]);\n\
    }\n\
    if (response.data && response.data.code === \'user-not-login\' && response.config.redirect !== false) {\n\
        window.store.dispatch(\'logout\', true);\n\
        new Error(\'user-not-login\');\n\
    }\n\
    return response.status !== 200 ? new Error(response.status) : response.data;\n\
}, (error, response) => {\n\
    if (!response) response = error.response;\n\
    if (axios.CSRF && response && response.headers[axios.CSRF_TOKEN]) {\n\
        localStorage.setItem(axios.CSRF_TOKEN, response.headers[axios.CSRF_TOKEN]);\n\
    }\n\
    if (error && error instanceof error.constructor && error.__CANCEL__) {\n\
        return Promise.resolve(error);\n\
    }\n\
    return Promise.reject(error);\n\
});\n\n\
const adapter = axios.defaults.adapter;\n\n\
axios.defaults.adapter = function(config) {\n\
    let promise = adapter(config);\n\
    // 是否加载loading\n\
    if (config.loading !== false) {\n\
        mask.add(promise);\n\
    }\n\
    return promise;\n\
};\n\n\
export default axios;'
        };
    }
};
</script>
