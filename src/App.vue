<template>
  <router-view></router-view>
</template>
<script>
export default {
  name: 'App',
}
</script>
<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

main,
section,
#app {
  width: 100%;
  height: 100%;
  background-color: rgb(244, 247, 248);
}
</style>
