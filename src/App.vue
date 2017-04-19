<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import api from './api'
export default {
  name: 'app',
  data() {
    return {
    }
  },
  methods: {
  },
  computed: {
  },
  beforeCreate() {
  },
  created() {
  },
  mounted() {
    api.getHotColleges().then((data) => {
      console.log(data)
    })
  },
  destroyed() {
  },
  components: {
  }
}

</script>

<style>
@import "./assets/css/main.css";
@import "./assets/css/color-dark.css";     /*深色主题*/
/*@import "./assets/css/theme-green/color-green.css";   !*浅绿色主题*!*/
</style>
