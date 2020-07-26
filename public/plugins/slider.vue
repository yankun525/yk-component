<template>
    <div class="app-slider b" :class="enabled ? 'app-slider-show' : ''">
        <div class="clearfix app-slider-header" :class="enabled ? 'b-b' : ''">
            <div class="pull-left app-slider-title">
                <slot name="title">
                    <span>{{title}}</span>
                </slot>
            </div>
            <div class="pull-right">
                <slot name="btns"></slot>
                <i class="iconfont app-slider-icon" @click="enabled=!enabled" :class="enabled ? 'icon-xiangshang' : 'icon-xiangxia'"></i>
            </div>
        </div>
        <el-collapse-transition>
            <div v-show="enabled" class="w-full">
                <slot></slot>
            </div>
        </el-collapse-transition>
    </div>
</template>

<script>
/**
 * title      标题，也可通过具名 slot 传入
 * hide       初始化时是否默认收起
 */

export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        hide: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            enabled: !this.hide
        };
    }
};
</script>

<style lang="less">
.app-slider {
    background: #FFFFFF;
    .app-slider-header {
        height: 50px;
        line-height: 50px;
        padding-right: 24px;
    }
    .app-slider-title span {
        padding-left: 16px;
    }
    .app-slider-icon {
        height: 24px;
        line-height: 24px;
        width: 24px;
        margin-top: 13px;
        text-align: center;
        float: right;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 2px;
    }
    .app-slider-icon {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.45);
    }
    .app-slider-slideup {
        display: none;
    }
    .app-slider-slidedown {
        display: initial;
    }
    &.app-slider-show {
        .app-slider-slideup {
            display: initial;
        }
        .app-slider-slidedown {
            display: none;
        }
    }
}
</style>
