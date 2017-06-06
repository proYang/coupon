<template>
  <div class="wrapper">
    <div id="J_pjax-loader-bar" class="pjax-loader-bar is-loading">
      <div class="progress"></div>
    </div>
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div class="content">
      <transition>
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import vHead from '../../components/header'
import vSidebar from '../../components/sideBar'
export default {
  components: {
    vHead, vSidebar
  }
}
</script>

<style scoped>
.pjax-loader-bar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 40;
  opacity: 0;
  -webkit-transition: opacity 0.4s linear 0.4s;
  transition: opacity 0.4s linear 0.4s
}

.pjax-loader-bar .progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 0%;
  height: 2px;
  background: #77b6ff;
  box-shadow: 0 0 10px rgba(119, 182, 255, 0.7);
  -webkit-transition: width 0.4s ease 0s;
  transition: width 0.4s ease 0s
}

.pjax-loader-bar.is-loading {
  opacity: 1;
  -webkit-transition: none;
  transition: none
}
</style>

