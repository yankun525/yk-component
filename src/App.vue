<template>
  <div id="app">
    <el-container>
        <el-header>
            <div :class="[isCollapse ? 'coltitle' : 'title']">
                <i class="iconfont icon-langchaoyun"></i>
            </div>
            <i :class="['iconfont', isCollapse ? 'icon-zhankai' : 'icon-shouqi']" @click="changeCollapse" id="collapse"></i>
            <ul class="nav">
                <li v-for="(item,index) in menu" :key="item.id" @click="toggleSide(index)" :class="[active==item.id ? 'light' : '']">{{item.permissionname}}</li>
            </ul>
            <div class="tools full-right clearfix">
                <el-dropdown>
                    <span class="el-dropdown-link">
                        <i class="iconfont icon-yonghu1 m-r-5"></i>
                        <span>{{$t('common.user')}}</span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>{{$t('common.modify')}}</el-dropdown-item>
                        <el-dropdown-item>{{$t('common.exit')}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <i class="iconfont full-right icon-kefu"></i>
                <i class="iconfont full-right fullScreen" :class="[fullScreen ? 'icon-suoxiao' : 'icon-quanping']" @click="changeFullscreen"></i>
                <el-dropdown @command="changeLang">
                    <span class="el-dropdown-link">
                        <i class="iconfont icon-diqiu1 m-r-5"></i>
                        <span>{{$t(`common.${lang}`)}}</span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="zh">{{$t('common.zh')}}</el-dropdown-item>
                        <el-dropdown-item command="en">{{$t('common.en')}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-header>
        <el-container>
            <el-aside :width="isCollapse?'65px':'201px'">
                <el-menu :default-active="$route.path" class="el-menu-vertical-demo" :collapse="isCollapse" :collapse-transition="false" router>
                    <el-menu-item v-for="item in submenu" :key="item.index" :index="item.permissionurl">
                        <i class="iconfont" :class="item.permissionicon"></i>
                        <span slot="title">{{item.permissionname}}</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
            <el-main>
                <router-view></router-view>
            </el-main>
            <el-footer>Footer</el-footer>
            </el-container>
        </el-container>
    </el-container>
  </div>
</template>

<script>
import { menu } from './servers/indexApi'
export default {
  name: 'App',
  data () {
    return {
      lang: 'zh',
      active: '1',
      fullScreen: false,
      isCollapse: false,
      menu: [],
      submenu: []
    }
  },
  created () {
    menu().then(res => {
      if (res.data.code !== 'success') return this.$alert('加载失败')
      this.menu = res.data.data
      this.submenu = this.menu[0].children
    })
  },
  methods: {
    changeCollapse (e) {
      this.isCollapse = !this.isCollapse
    },
    toggleSide (index) {
      this.active = index + 1
      this.submenu = this.menu[index].children
    },
    changeRouter () {
      this.$router.push('/good')
    },
    changeFullscreen () {
      if (document.fullscreen || document.mozFullScreen || document.webkitIsFullScreen || document.msFullscreenElement) {
        this.fullScreen = false
        this.exitFullscreen()
      } else {
        this.fullScreen = true
        this.fullscreen()
      }
    },
    fullscreen () {
      var docElm = document.documentElement
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen()
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen()
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen()
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen()
      }
    },
    exitFullscreen () {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      }
    },
    changeLang (type) {
      localStorage.setItem('locale', type)
      this.$i18n.locale = this.lang = type
    }
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
.el-header, .el-footer {
    background-color: #65a7dd;
    color: #fff;
  }
  .el-aside {
    background-color: #87dffa;
    color: #fff;
    text-align: center;
    height: 100%;
  }
  .el-main {
    background-color: #E9EEF3;
    height: 100%;
  }
  .el-container {
    height: 100%;
  }
  .title {
      float: left;
      width: 180px;
      line-height: 52px;
  }
  .coltitle {
      float: left;
      width: 64px;
  }
  .coltitle i {
      font-size: 28px;
      line-height: 60px;
  }
  .title i {
      font-size: 38px;
      margin-left: 50px;
  }
  #collapse {
      float: left;
      font-size: 28px;
      line-height: 60px;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu-vertical-demo .iconfont {
      font-size: 18px;
      margin-right: 10px;
  }
  .el-menu-vertical-demo span {
      font-size: 14px;
  }
  .nav {
      float: left;
      height: 60px;
      /* width: 100%; */
      list-style: none;
      line-height: 60px;
      margin: 0;
      margin-left: 10px;
      padding: 0;
  }
  .nav li {
      float: left;
      width: 120px;
      cursor: pointer;
      text-align: center;
  }
  .nav li:hover {
      background-color: #fff;
      color: #000;
  }
  .light {
      background-color: #fff;
      color: #000;
  }
  .el-dropdown {
      float: right;
      margin: 20px 0;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #fff;
  }
  .tools .iconfont {
      font-size: 18px;
      cursor: pointer;
  }
  .fullScreen {
      margin: 20px 15px;
  }
  .icon-kefu {
      margin: 20px 15px 20px 0;
  }
</style>
