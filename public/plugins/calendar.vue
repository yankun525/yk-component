<template>
    <div class="app-calendar">
        <div class="app-calendar-header">
            <i class="iconfont icon-shuangjiantou_zuo" @click="prevYear"></i>
            <i class="iconfont icon-xiangzuo" @click="prevMonth"></i>
            <div class="app-calendar-date">{{title}}</div>
            <i class="iconfont icon-xiangyou" @click="nextMonth"></i>
            <i class="iconfont icon-shuangjiantou_you" @click="nextYear"></i>
        </div>
        <div class="app-calendar-body" ref="body" @animationend="animationEnd">
            <div class="app-calendar-table left" v-if="align === 'left'">
                <ul class="app-calendar-weeks clearfix">
                    <li
                        v-for="(week, index) in weeks"
                        :key="'left_' + index"
                        :class="{'weekend': week.weekend}"
                    >{{week.text}}</li>
                </ul>
                <ul class="app-calendar-date clearfix">
                    <li
                        v-for="item in items"
                        :class="item.type + (item.weekend ? ' weekend' : '')"
                        :key="item.date"
                    >
                        <div class="app-calendar-day">
                            <span>{{item.text}}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="app-calendar-table">
                <ul class="app-calendar-weeks clearfix">
                    <li
                        v-for="(week, index) in weeks"
                        :key="'current_' + index"
                        :class="{'weekend': week.weekend}"
                    >{{week.text}}</li>
                </ul>
                <ul class="app-calendar-date clearfix">
                    <li
                        v-for="item in days"
                        @click="clickDay(item)"
                        :class="initClass(item)"
                        :key="item.date"
                    >
                        <slot :data="item">
                            <div class="app-calendar-day">
                                <span>{{item.text}}</span>
                            </div>
                        </slot>
                    </li>
                </ul>
            </div>
            <div class="app-calendar-table right" v-if="align === 'right'">
                <ul class="app-calendar-weeks clearfix">
                    <li
                        v-for="(week, index) in weeks"
                        :key="'right_' + index"
                        :class="{'weekend': week.weekend}"
                    >{{week.text}}</li>
                </ul>
                <ul class="app-calendar-date clearfix">
                    <li
                        v-for="item in items"
                        :class="item.type + (item.weekend ? ' weekend' : '')"
                        :key="item.date"
                    >
                        <div class="app-calendar-day">
                            <span>{{item.text}}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
const LOCALES = {};
LOCALES['zh_CN'] = {
    calendar: {
        weeks: ['日', '一', '二', '三', '四', '五', '六']
    }
};
LOCALES['en'] = {
    calendar: {
        weeks: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
    }
};

export default {
    props: {
        /* 日历星期开始点(0 - 6) 0 - 星期天开始 1 - 星期一开始 */
        weekStart: {
            type: Number,
            default: 1
        },
        /* 选中日期 */
        value: {
            type: [Number, Date, String]
        },
        /* 生成年月数组后进行回调 */
        onPostRender: {
            type: Function,
            default: function(params) {
                return params;
            }
        }
    },
    /* 设置v-model双向绑定 */
    model: {
        prop: 'value',
        event: 'change'
    },
    data() {
        var type,
            date;
        if (this.value) {
            if (this.value instanceof Date) {
                type = 'Date';
            }
            if (typeof this.value === 'number') {
                type = 'Number';
            }
            date = type === 'Date' ? this.value : new Date(this.value);
        } else {
            type = 'String';
            date = new Date();
        }
        return {
            /* 当前日期 */
            date: date,
            days: [],
            items: [],
            align: '',
            type: type,
            locale: {}
        };
    },
    computed: {
        title() {
            return this.date.format('yyyy-MM');
        },
        initClass() {
            return item => {
                var classes = [item.type];
                if (item.weekend) {
                    classes.push('weekend');
                }
                if (item.today) {
                    classes.push('now');
                }
                if (item.active) {
                    classes.push('active');
                }
                return classes.join(' ');
            }
        },
        weeks() {
            var k = 7,
                week = this.weekStart,
                weeks = [],
                text = this.$t('calendar.weeks');
            /* 重置weeks 0 6为周末 */
            while (k--) {
                weeks.push({
                    text: text[week],
                    weekend: week === 0 || week === 6
                });
                week = (week + 1) % 7;
            }
            return weeks;
        }
    },
    watch: {
        weekStart() {
            this.animationStart();
        },
        date(val, old) {
            val = new Date(val.getFullYear(), val.getMonth()).getTime();
            old = new Date(old.getFullYear(), old.getMonth()).getTime();
            this.align = val < old ? 'left' : val > old ? 'right' : '';
            this.animationStart();
            this.align && this.$emit('monthChange', this.date);
        }
    },
    methods: {
        initDays() {
            var year = this.date.getFullYear(),
                month = this.date.getMonth(),
                date = this.date.getDate(),
                /* 今天对应日期 */
                today = new Date(),
                /* 本月1号对应星期 */
                start = new Date(year, month, 1).getDay(),
                /* 选中日期 */
                active,
                prev = new Date(year, month, 0),
                prevYear = prev.getFullYear(),
                prevMonth = prev.getMonth() + 1,
                prevDate = prev.getDate(),
                next = new Date(year, month + 2, 0),
                nextYear = next.getFullYear(),
                nextMonth = next.getMonth() + 1,
                current,
                week,
                items = [];
            /* 是否是当天 */
            today = year === today.getFullYear() && month === today.getMonth() ? today.getDate() : null;
            if (this.value) {
                active = this.getValue();
                active = year === active.getFullYear() && month === active.getMonth() ? active.getDate() : null;
            }
            if (prevMonth < 10) {
                prevMonth = '0' + prevMonth;
            }
            if (nextMonth < 10) {
                nextMonth = '0' + nextMonth;
            }
            /* 计算上月要显示的天数 本月1号对应星期-初始星期 如果超过加一星期 */
            prev = start >= this.weekStart ? start -  this.weekStart : start + 7 - this.weekStart;
            /* 计算本月天数 + 1 */
            date = new Date(year, month + 1, 0).getDate() + 1;
            /* 计算下月天数 + 1 */
            next = 44 - prev - date;
            while (prev--) {
                current = prevDate - prev;
                week = start - 1 - prev;
                week = week < 0 ? (week + 7) % 7 : week % 7;
                items.push({
                    date: prevYear + '-' + prevMonth + '-' + (current < 10 ? '0' + current : current),
                    text: current,
                    type: 'prev',
                    weekend: week === 0 || week === 6,
                    week: week
                });
            }
            /* 重置本月第一天开始 */
            current = 1;
            month = month < 9 ? '0' + (month + 1) : month + 1;
            while (current < date) {
                week = (start - 1 + current) % 7;
                items.push({
                    date: year + '-' + month + '-' + (current < 10 ? '0' + current : current),
                    text: current,
                    type: 'current',
                    active: current === active,
                    weekend: week === 0 || week === 6,
                    today: current === today,
                    week: week
                });
                current++;
            }
            /* 重置下月第一天开始 */
            current = 1;
            while (current < next) {
                week = (start + date - 1 + current) % 7;
                items.push({
                    date: nextYear + '-' + nextMonth + '-' + (current < 10 ? '0' + current : current),
                    text: current,
                    type: 'next',
                    weekend: week === 0 || week === 6,
                    week: week
                });
                current++;
            }
            return this.onPostRender(items) || items;
        },
        animationStart() {
            var items = this.initDays();
            /* 设置第一列开始 重组42的一维数组为6*7的二维数组 */
            // items = [items.splice(0, 7), items.splice(0, 7), items.splice(0, 7), items.splice(0, 7), items.splice(0, 7), items.splice(0, 7)];
            if (this.align === 'left' || this.align === 'right') {
                this.items = items;
                this.$nextTick(() => {
                    if (!this.$refs.body) return;
                    if (this.align === 'left') {
                        helper.addClass(this.$refs.body, 'animation-slide-left');
                    } else if (this.align === 'right') {
                        helper.addClass(this.$refs.body, 'animation-slide-right');
                    }
                });
            } else {
                this.days = items;
            }
        },
        animationEnd() {
            this.days = this.items;
            this.items = [];
            this.align = '';
            helper.removeClass(this.$refs.body, 'animation-slide-left animation-slide-right');
        },
        prevYear() {
            var date = this.date;
            this.date = new Date(date.getFullYear() - 1, date.getMonth());
        },
        prevMonth() {
            var date = this.date;
            this.date = new Date(date.getFullYear(), date.getMonth() - 1);
        },
        nextYear() {
            var date = this.date;
            this.date = new Date(date.getFullYear() + 1, date.getMonth());
        },
        nextMonth() {
            var date = this.date;
            this.date = new Date(date.getFullYear(), date.getMonth() + 1);
        },
        clickDay(data) {
            if (data.type === 'current') {
                this.date = new Date(data.date);
                this.setValue();
            }
        },
        setValue() {
            switch (this.type) {
                case 'Date':
                    this.$emit('change', this.date);
                    break;
                case 'Number':
                    this.$emit('change', this.date.getTime());
                    break;
                default:
                    this.$emit('change', this.date.format('yyyy-MM-dd'));
                    break;
            }
        },
        getValue() {
            return this.type === 'Date' ? this.value : new Date(this.value);
        }
    },
    created() {
        if (this.$i18n) {
            Object.keys(LOCALES).map(locale => {
                this.$i18n.mergeLocaleMessage(locale, LOCALES[locale]);
            });
        } else {
            this.$t = key => this.$helper.getForJson(LOCALES['zh_CN'], key);
        }
        this.animationStart();
    }
};
</script>

<style lang="css">
.app-calendar {
	width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border: 1px solid #E5E5E5;
    overflow: hidden;
}
.app-calendar-header {
    display: flex;
    height: 32px;
    line-height: 32px;
    padding: 0 16px;
    border-bottom: 1px solid #E5E5E5;
}
.app-calendar-header i {
    font-size: 12px;
    width: 16px;
    text-align: center;
    cursor: pointer;
}
.app-calendar-date {
    flex: 1;
    text-align: center;
}
.app-calendar-body {
    position: relative;
    height: 100%;
    width: 100%;
    animation-duration: 0.5s;
}
.app-calendar-table {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 40px 12px 8px;
}
.app-calendar-table.left {
    position: absolute;
    top: 0;
    transform: translateX(-100%);
}
.app-calendar-table.right {
    position: absolute;
    top: 0;
    transform: translateX(100%);
}
.animation-slide-left {
    animation-name: animation-slide-left;
}
.animation-slide-right {
    animation-name: animation-slide-right;
}
@keyframes animation-slide-left {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(100%);
    }
}
@keyframes animation-slide-right {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-100%);
    }
}
.app-calendar-weeks,
.app-calendar-date {
    margin: 0;
    padding: 0;
}
.app-calendar-weeks li,
.app-calendar-date li {
    padding: 0 8px;
    text-align: center;
    width: 14.2857143%;
    float: left;
}
.app-calendar-weeks {
    position: absolute;
    top: 8px;
    left: 12px;
    right: 12px;
}
.app-calendar-weeks li {
    height: 32px;
    line-height: 32px;
}
.app-calendar-date {
    height: 100%;
}
.app-calendar-date li {
    height: 16.6666667%;
    justify-content: center;
    display: flex;
    align-items: center;
}
.app-calendar-table .now {
    color: #0067B2;
    font-weight: bold;
}
.app-calendar-table .prev,
.app-calendar-table .next {
    color: #B2B2B2;
}
.app-calendar-day {
    width: 32px;
    height: 32px;
    line-height: 32px;
    cursor: pointer;
    border: 1px solid #FFFFFF;
}
.app-calendar-day:hover {
    background: #E9F1F8;
    border-color: #E9F1F8;
}
.app-calendar-table .active .app-calendar-day {
    color: #0067B2;
    font-weight: bold;
    background: #E9F1F8;
    border: 1px solid #D0E2F0;
    border-radius: 2px;
}
</style>
