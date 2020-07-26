<template>
    <div class="app-countdown" :id="id" ref="countdown"></div>
</template>

<script>
/**
 * format     显示格式 hh:mm:ss(时分秒) mm:ss(分秒) ss(秒)
 * enabled    默认是否开始就进入倒计时
 * date       初始进入倒计时的时间 单位为毫秒
 * value      倒计时结束时间点
 * stamp      倒计时时间戳
 *
 * event
 * start      倒计时开始时回调
 * stop       倒计时暂停时回调
 * change     每次倒计时回调 传参 当前剩余时间 stamp(秒) 实例对象 countdown
 * end        倒计时完成后的回调 传参 实例对象 countdown
 */
var NUMBER = ['&#xe632;', '&#xe62f;', '&#xe628;', '&#xe62d;', '&#xe630;', '&#xe631;', '&#xe62a;', '&#xe62b;', '&#xe62e;', '&#xe626;'];

var SPACE = '&#xe62c;';

var count = 0;

// var NUMBER = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// var SPACE = ':';

export default {
    name: 'countdown',
    props: {
        format: {
            type: String,
            default: 'mm:ss'
        },
        enabled: {
            type: Boolean,
            default: false
        },
        date: {
            type: [Number, String],
            default: 0
        }
    },
    data() {
        return {
            id: 'app-countdown__' + count++
        };
    },
    methods: {
        init() {
            this.readyState = 0;
            this.second = this.minute = this.hour = '';
            this.template = this.format.replace(/h*(h)/g, str => {
                if (!this.hour) this.hour = str;
                return '{' + this.hour + '}';
            }).replace(/mm/g, str => {
                this.minute = str;
                return '{' + str + '}';
            }).replace(/ss/g, str => {
                this.second = str;
                return '{' + str + '}';
            }).replace(/j*(j)/g, str => {
                this.jiffy = str;
                return '{' + str + '}';
            }).replace(/:/g, '<i class="iconfont">' + SPACE + '</i>');
            return this;
        },
        reset(time) {
            this.stamp = Math.max(parseInt(time), 0);
            this.render(this.stamp);
            if (this.readyState === 1) {
                this.value = this.stamp + new Date().getTime();
            }
            return this;
        },
        start() {
            if (this.readyState !== 1) {
                if (this.timer) {
                    cancelAnimationFrame(this.timer);
                    this.timer = null;
                }
                this.readyState = 1;
                this.value = this.stamp + new Date().getTime();
                this.$emit('start', this);
                this.run();
            }
            return this;
        },
        run() {
            // if (!document.getElementById(this.id)) {
            //     return false;
            // }
            if (this.timer) {
                cancelAnimationFrame(this.timer);
                this.timer = null;
            }
            this.timer = requestAnimationFrame(() => {
                var stamp,
                    now = new Date().getTime();
                if (now < this.value) {
                    stamp = this.value - now;
                    this.render(stamp);
                    this.$emit('animation', stamp, this);
                    stamp = Math.ceil(stamp / 1000);
                    if (this._stamp !== stamp) {
                        this._stamp = stamp;
                        this.$emit('change', stamp, this);
                    }
                    this.run();
                } else {
                    this.stop().render(0);
                    this.$emit('end', this);
                }
            });
            return this;
        },
        stop() {
            if (this.timer) {
                cancelAnimationFrame(this.timer);
                this.timer = null;
            }
            if (this.readyState !== 0) {
                this.readyState = 0;
                if (this.value) {
                    this.stamp = this.value - new Date().getTime();
                    if (this.stamp < 0 || isNaN(this.stamp)) {
                        this.stamp = 0;
                    }
                }
                this.$emit('stop', this);
            }
            return this;
        },
        render(stamp) {
            var len,
                value,
                html = {};
            if (!this.$refs.countdown) {
                cancelAnimationFrame(this.timer);
                this.timer = null;
                return this;
            }
            value = stamp % 1000;
            stamp = parseInt(stamp / 1000);
            if (this.jiffy) {
                len = this.jiffy.length;
                html[this.jiffy] = '';
                while (len > 0) {
                    html[this.jiffy] += '<i class="iconfont">' + NUMBER[value.toString().charAt(0)] + '</i>';
                    value = value % 10;
                    len--;
                }
            }
            value = stamp % 60;
            stamp = parseInt(stamp / 60);
            if (this.second) {
                html[this.second] = '<i class="iconfont">' + NUMBER[parseInt(value / 10)] + '</i><i class="iconfont">' + NUMBER[value % 10] + '</i>';
            }
            value = stamp % 60;
            stamp = parseInt(stamp / 60);
            if (this.minute) {
                html[this.minute] = '<i class="iconfont">' + NUMBER[parseInt(value / 10)] + '</i><i class="iconfont">' + NUMBER[value % 10] + '</i>';
            }
            if (this.hour) {
                len = this.hour.length;
                html[this.hour] = '';
                while (len > 0) {
                    value = stamp % 10;
                    stamp = parseInt(stamp / 10);
                    html[this.hour] = '<i class="iconfont">' + NUMBER[value] + '</i>' + html[this.hour];
                    len--;
                }
            }
            this.$refs.countdown.innerHTML = this.$helper.renderText(this.template, html);
            return this;
        }
    },
    created() {
        this.init();
        setTimeout(() => {
            this.reset(this.date);
            this.enabled && this.start();
        });
    }
};
</script>

<style lang="less">
.app-countdown {
    display: inline-block;
    overflow: hidden;
    height: 100%;
    i {
        float: left;
        font-size: 48px;
        width: 48px;
        position: relative;
        margin-left: -5px;
        margin-right: -5px;
        text-align: center;
        font-style: normal;
    }
}
</style>
