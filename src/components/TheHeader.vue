<template>
  <header class="header">
    <h1 class="header__title">Contacts App</h1>
    <vs-button class="header__exit" gradient color="#cecece" @click="logout"
      >Выход</vs-button
    >
  </header>
</template>
<script>
export default {
  name: 'TheHeader',
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/auth')
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;

  width: 100%;
  min-height: 64px;
  padding: 12px;
  background-color: #fff;
  box-shadow: 2px 0 6px rgba(40, 40, 40, 0.27);

  &__title {
    margin: 0;
  }

  &__exit {
    width: 100px;
    color: #000;
  }
}
</style>
