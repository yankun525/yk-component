import avatar from './avatar.vue';
import calendar from './calendar.vue';
import countdown from './countdown.vue';
import appUpload from './upload.vue';
import slider from './slider.vue';
import tablesettings from './tablesettings.vue';
import singlemember from './singlemember.vue';
import multimember from './multimember.vue';
import treeorg from './treeorg.vue';

const plugins = {
    install(Vue) {
        /* 上传头像组件 */
        Vue.component('app-avatar', avatar);
        /* 倒计时组件 */
        Vue.component('app-countdown', countdown);
        /* 上传组件 */
        Vue.component('app-upload', appUpload);
        /* 显示隐藏组件 */
        Vue.component('app-slider', slider);
        /* 用户选择 单选 */
        Vue.component('app-singlemember', singlemember);
        /* 用户选择 多选 */
        Vue.component('app-multimember', multimember);
        /* 组织结构树 */
        Vue.component('app-treeorg', treeorg);
        /* 表格配置 */
        Vue.component('app-tablesettings', tablesettings);
        /* 日历组件 */
        Vue.component('app-calendar', calendar);
    }
};

export default plugins;
