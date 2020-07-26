import Vue from 'vue';
import highlight from 'highlight.js';
import 'highlight.js/styles/tomorrow-night.css';

Vue.use({
    install(Vue) {
        // 自定义指令 v-highlight
        Vue.directive('highlight', {
            // 被绑定元素插入父节点时调用
            inserted(el) {
                let blocks = el.querySelectorAll('pre code');
                for (let i = 0; i < blocks.length; i++) {
                    highlight.highlightBlock(blocks[i]);
                }
            },
            // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
            componentUpdated(el) {
                let blocks = el.querySelectorAll('pre code');
                for (let i = 0; i < blocks.length; i++) {
                    highlight.highlightBlock(blocks[i]);
                }
            }
        });
    }
});

export default highlight;