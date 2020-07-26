<template>
    <div class="p-l">
        <h2>
            <span>正则表达式模板</span>
        </h2>
        <p>/h*(h)/g</p>
        <p>匹配字符串里1~n个h连起来的字符串</p>
        <p>比如 'hhhh:mm:ss'.match(/h*(h)/g) => 'hhhh'</p>
        <div class="m-b-xl"></div>
        <p>/^-?[1-9]\d*$/g ------ /^[1-9]\d*$/g</p>
        <p>前面匹配整数 后面匹配正整数</p>
        <div class="m-b-xl"></div>
        <p>new RegExp('(^%s[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^%s[0-9]\.[0-9]([0-9])?$)'.replace(/%s/g, minus ? '-?' : ''), 'g')</p>
        <p>匹配金额 minus表示是否可以为负数</p>
        <div class="m-b-xl"></div>
        <p>/{\[[^}]+]}/g</p>
        <p>匹配 {[property]} 类型的字符串</p>
        <p>'加法：{[a]} + {[b]} = {[c]}'.match(/{\[[^}]+]}/g) => ["{[a]}", "{[b]}", "{[c]}"]</p>
        <div class="m-b-xl"></div>
        <p>/{\[\@[^}]+]}/g</p>
        <p>匹配 {[@property]} 类型的字符串</p>
        <p>'事件：{[@change]}'.match(/{\[\@[^}]+]}/g) => ["{[@change]}"]</p>
        <div class="m-b-xl"></div>
        <p>/\([^)]+\)/g</p>
        <p>以(开始，中间不包含)，以)结束</p>
        <p>'asda(xcv)yjty(@z)'.match(/\([^)]+\)/g)</p>
        <div class="m-b-xl"></div>
        <p>/\.([^.]+)$/</p>
        <p>匹配字符串最后一个 .</p>
        <p>'lpoovowsd.jpg'.match(/\.([^.]+)$/) => [".jpg", "jpg", index: 9, input: "lpoovowsd.jpg"]</p>
        <div class="m-b-xl"></div>
        <p>匹配域名或者IP</p>
        <p>/^(http:\/\/|https:\/\/)?[^/\+]+\//g</p>
        <p>不带/或?</p>
        <p>/^(http:\/\/|https:\/\/)[^(\?|\/)]+/g</p>
        <p>带/或?</p>
        <p>/^(http:\/\/|https:\/\/)[^(\?|\/)]+(\?|\/)/g</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            code: {

            }
        };
    }
};
</script>
