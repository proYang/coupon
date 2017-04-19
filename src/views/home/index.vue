<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div class="content">
      <transition name="move"
                  mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import vHead from '../../components/header.vue'
import vSidebar from '../../components/sideBar.vue'
export default {
  components: {
    vHead, vSidebar
  }
}
</script>
