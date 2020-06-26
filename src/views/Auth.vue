<template>
  <section class="auth">
    <div class="auth__form">
      <h2 class="auth__title">Авторизация</h2>
      <vs-input
        v-model="username"
        type="text"
        class="auth__input"
        block
        placeholder="Имя пользвателя"
      >
        <template #icon>
          <box-icon size="20px" name="user"></box-icon>
        </template>
        <template #message-danger>{{ errors.username }}</template>
      </vs-input>

      <vs-input
        v-model="password"
        class="auth__input"
        block
        placeholder="Пароль"
        type="password"
        @keyup.enter="validateForm"
      >
        <template #icon>
          <box-icon size="20px" name="lock"></box-icon>
        </template>
        <template #message-danger>{{ errors.password }}</template>
      </vs-input>

      <div class="auth__buttons">
        <vs-button
          transparent
          color="info"
          class="auth__button auth__button--link"
          to="/registration"
          >Регистрация</vs-button
        >
        <vs-button
          gradient
          color="info"
          class="auth__button"
          @click="validateForm"
          >Войти</vs-button
        >
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Auth',
  data() {
    return {
      username: '',
      password: '',
      errors: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    validateForm() {
      let errorsCount = 0

      if (this.username.trim() === '') {
        this.errors.username = 'Не указано имя пользователя!'
        errorsCount++
      }

      if (this.password.trim() === '') {
        this.errors.password = 'Не указан пароль!'
        errorsCount++
      }

      if (errorsCount === 0) {
        errorsCount = 0
        this.errors = {
          username: '',
          password: ''
        }

        this.signIn()
      }
    },
    async signIn() {
      const { username, password } = this

      const payload = {
        username,
        password
      }
      const res = await this.$store.dispatch('login', payload)

      if (res.hash) {
        this.$router.push('/')
      } else {
        this.$vs.notification({
          color: 'danger',
          icon: `<box-icon size="20px" name="info-circle" color="white"></box-icon>`,
          position: 'top-center',
          title: 'Ошибка',
          text: res.message,
          buttonClose: false
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.auth {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  padding: 16px;
  background-color: rgb(244, 247, 248);
  overflow: hidden;

  &__form {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;

    max-width: 480px;
    width: 100%;
    padding: 20px;
    background-color: #fff;
    border-radius: 20px;
    overflow: hidden;

    @media screen and (max-width: 500px) {
      padding: 16px;
    }
  }

  &__title {
    margin: 0;
    margin-bottom: 30px;
  }

  &__input {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0 !important;
    }
  }

  &__buttons {
    display: flex;
    justify-content: space-between;

    width: 100%;
  }

  &__button {
    width: auto;
    min-width: 160px;

    &--link {
      min-width: 0;
    }
  }
}
</style>
