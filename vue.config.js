// const target = 'http://prm-test.test.geely.com/';
// const target = 'http://10.200.159.32:9077';
const target = 'http://10.190.64.87:8080';

const proxy = {};

'management-center|platform|login|tenant|auth|api|pub|oss|dc|cas|supplier|uc'.split('|').map(key => {
    key = `^/${key}`;
    proxy[key] = { target, changeOrigin: true };
});

module.exports = {
    /* 本地服务器配置 */
    devServer: {
        port: '8080',
        proxy
    },
    pages: {
        index: {
            // page 的入口
            entry: 'src/main.js',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: "YK's component"
        }
    },
    /* webpack 配置 */
    configureWebpack: {
        performance: {
            hints: 'warning',
            // 入口起点的最大体积
            maxEntrypointSize: 50000000,
            // 生成文件的最大体积
            maxAssetSize: 30000000
            // 只给出 js 文件的性能提示
            // assetFilter: function(assetFilename) {
            //     return assetFilename.endsWith('.js');
            // }
        }
    },
    pluginOptions: {
        i18n: {
            locale: 'zh-CN',
            fallbackLocale: 'zh-CN',
            localeDir: 'locales',
            enableInSFC: true
        }
    },
    chainWebpack: config => {
        // config.module.rule('eslint').use('eslint-loader');
    }
};
