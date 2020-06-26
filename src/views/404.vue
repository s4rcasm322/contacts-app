<template>
  <section class="not-found">
    <div class="not-found__card">
      <h2 class="not-found__title">Данная страница не существует!</h2>
      <p class="not-found__text">
        Похоже вы пытались зайти на страницу, которой не существует! <br />
        Попробуйте вернуться на
        <a class="not-found__link" href="#" @click.prevent="$router.go(-1)"
          >предыдущую страницу</a
        >
        или перейдите
        <router-link class="not-found__link" to="/">на главную</router-link>
      </p>
    </div>
  </section>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 20px;

  &__card {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;

    max-width: 480px;
    width: 100%;
    padding: 20px;
    background-color: #fff;
    border-radius: 20px;
  }

  &__title {
    margin: 0;
    margin-bottom: 20px;
  }

  &__text {
    text-align: center;
  }

  &__link {
    font-weight: 500;
    color: #000;
  }
}
</style>
