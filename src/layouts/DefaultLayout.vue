<template>
  <div id="app">
    <the-header></the-header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>
<script>
import TheHeader from '@/components/TheHeader'
export default {
  name: 'DefaultLayout',
  components: {
    TheHeader
  }
}
</script>
<style lang="scss" scoped>
#app {
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
}

main {
	flex: 1;
}
</style>
