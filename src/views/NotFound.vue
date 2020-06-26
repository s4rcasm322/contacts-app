<template>
  <section class="not-found">
    <div class="not-found__card">
      <h2 class="not-found__title">Данная страница не существует!</h2>
      <p class="not-found__text">
        Похоже вы пытались зайти на страницу, которой не существует! <br />
        Попробуйте вернуться на
        <a class="" href="#" @click.prevent="$router.go(-1)">предыдущую страницу</a> или
        перейдите <router-link class="" to="/">на главную</router-link>
      </p>
    </div>
  </section>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped></style>
