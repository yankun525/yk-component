<template>
    <div class="p-l">
        <h2>
            <span>animate</span>
        </h2>
        <div>元素动画方法。helper.animate 开始进行动画, helper.stop 停止动画</div>
        <p>helper.animate {elem | dom节点或数组节点, prop | {right: 100}, speed | 动画花费时间, easing | 动画过度效果, callback | 动画完成回调}</p>
        <p>helper.stop {elem | dom节点或数组节点}</p>
        <h3 class="p-t-xl">示例</h3>
        <div class="app-anim-box">
            <div class="app-anim-left">
                <el-form :model="form" label-width="80px">
                    <el-row :gutter="24">
                        <el-col :span="24">
                            <el-form-item label="prop">
                                <el-input type="textarea" rows="8" v-model="form.prop"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="speed">
                                <el-input v-model="form.speed"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="easing">
                                <el-select v-model="form.easing">
                                    <el-option
                                        v-for="item in ease"
                                        :key="item"
                                        :value="item"
                                        :label="item"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <el-button type="primary" @click="start">开始</el-button>
                <el-button @click="stop">暂停</el-button>
                <el-button @click="reset">重置</el-button>
            </div>
            <div class="app-anim-right">
                <div ref="bar" class="app-anim-bar"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ease: ['swing', 'linear'],
            form: {
                prop: '',
                speed: 3000,
                easing: 'swing'
            }
        };
    },
    methods: {
        start() {
            let data = this.form.prop.replace(/\n/g, '');
            this.stop();
            try {
                data = data.replace(/\{[^:]+:/g, key => {
                    return '{' + this.replace(key.slice(1, key.length -1)) + ':';
                }).replace(/,[^:]+:/g, key => {
                    return ',' + this.replace(key.slice(1, key.length -1)) + ':';
                });
                this.prop = JSON.parse(data);
                this.setData();
                if (this.$refs.bar) {
                    this.$helper.animate(this.$refs.bar, this.prop, parseInt(this.form.speed), this.form.easing);
                }
            } catch(e) {
                this.$message.error('JSON 格式不正确！');
            }
        },
        stop() {
            if (this.$refs.bar) {
                this.$helper.stop(this.$refs.bar);
            }
        },
        reset() {
            this.prop = {
                width: 8,
                height: 8,
                left: 16,
                top: 16
            };
            this.setData();
            this.form.speed = 3000;
            this.form.easing = 'swing';
        },
        setData() {
            this.form.prop = JSON.stringify(this.prop, null, 4);
        },
        replace(key) {
            key = key.replace(/(^\s*|\s*$)/g, '');
            if (key.charAt(0) !== '"') {
                key = '"' + key;
            }
            if (key.charAt(key.length - 1) !== '"') {
                key = key + '"';
            }
            return key;
        }
    },
    created() {
        this.reset();
    }
};
</script>

<style lang="less">
.app-anim-box {
    display: flex;
}
.app-anim-left {
    width: 300px;
    padding-right: 16px;
}
.app-anim-right {
    position: relative;
    height: 560px;
    flex: 1;
    border: 1px solid #E5E5E5;
    overflow: hidden;
}
.app-anim-bar {
    position: absolute;
    width: 8px;
    height: 8px;
    left: 16px;
    top: 16px;
    background: red;
}
</style>
