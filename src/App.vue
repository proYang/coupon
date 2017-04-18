<template>
  <div id="app">
    <img src="./assets/logo.png">
    <Hello></Hello>
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
