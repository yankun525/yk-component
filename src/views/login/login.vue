<template>
    <el-container class="h-full w-full is-vertical">
        <app-header></app-header>
        <el-container class="h-full">
            <div class="app-login-bg"></div>
            <div class="app-login">
                <h3 class="title" :class="{'has-error': errormsg}" v-t="'login.title'"></h3>
                <el-alert class="m-b-m" :title="errormsg" v-show="errormsg" @close="() => errormsg = ''" type="error" show-icon></el-alert>
                <el-form :model="form" class="app-login-form">
                    <el-row :gutter="24">
                        <el-col :span="24">
                            <el-input v-model="form.suppliercode" :placeholder="$t('placeholder.suppliercode')" prefix-icon="iconfont icon-tongxunlu-1"></el-input>
                        </el-col>
                        <el-col :span="24">
                            <el-input v-model="form.mobile" :placeholder="$t('placeholder.supplierphone')" prefix-icon="iconfont icon-shouji"></el-input>
                        </el-col>
                        <el-col :span="24">
                            <el-input v-model="form.password" :placeholder="$t('placeholder.password')" prefix-icon="iconfont icon-suo" type="password"></el-input>
                        </el-col>
                    </el-row>
                </el-form>
                <div class="clearfix app-login-bot">
                    <el-checkbox v-model="remember" class="pull-left">{{$t('login.password.remember')}}</el-checkbox>
                    <a class="link pull-right" v-t="'login.password.forget'"></a>
                </div>
                <el-button type="primary" class="app-login-btn" @click="login" v-t="'button.login'"></el-button>
            </div>
            <div class="app-icplicense">
                <icplicense></icplicense>
            </div>
        </el-container>
    </el-container>
</template>

<script>
import appHeader from './header';
import icplicense from './icplicense';
import { login } from '@/service/mainApi';

export default {
    components: {
        appHeader,
        icplicense
    },
    data() {
        return {
            errormsg: '',
            remember: false,
            form: {
                suppliercode: '',
                mobile: '',
                password: ''
            }
        };
    },
    methods: {
        login() {
            var notnull = this.$t('msg.fail.notnull');
            this.errormsg = '';
            // if (!this.form.suppliercode) {
            //     this.errormsg = this.$t('login.suppliercode') + notnull;
            //     return false;
            // }
            if (!this.form.mobile) {
                this.errormsg = this.$t('login.phoneoremail') + notnull;
                return false;
            }
            if (!this.form.password) {
                this.errormsg = this.$t('common.password') + notnull;
                return false;
            }
            login(this.form).then(res => {
                if (res.code !== 'success') {
                    this.$message.error(res.message);
                    return false;
                }
                this.$store.dispatch('redirect', res.data);
            });
        }
    },
    created() {
        this.$store.dispatch('identity', 'identity');
    }
}
</script>

<style lang="less">
.app-login-bg {
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    width: 100%;
}
.app-login {
    width: 520px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    background: #FFFFFF;
    border-radius: 2px;
    padding: 64px 77px 96px 77px;
    z-index: 10;
    .brand {
        display: block;
        height: auto;
        margin-bottom: 16px;
        margin-left: auto;
        margin-right: auto;
        width: 240px;
    }
    .title {
        margin: 0 0 48px 0;
        text-align: center;
        &.has-error {
            margin-bottom: 24px;
        }
    }
    .app-login-form {
        .el-input {
            margin-bottom: 16px;
        }
        .el-input__inner {
            font-size: 14px;
            height: 40px;
            line-height: 40px;
            padding-left: 40px;
        }
        .el-input__prefix {
            left: 16px;
            line-height: 43px;
        }
    }
    .app-login-bot {
        color: #666666;
        font-size: 12px;
    }
    .app-login-btn {
        width: 100%;
        background: #0067B2;
        border: 1px solid #0067B2;
        box-shadow: 0 2px 4px 0 rgba(0,103,178,0.10);
        border-radius: 3px;
        font-size: 16px;
        margin-top: 32px;
        padding: 13px 18px;
    }
}
.app-icplicense {
    position: absolute;
    color: #B2B2B2;
    font-size: 12px;
    width: 100%;
    text-align: center;
    bottom: 24px;
}
</style>
