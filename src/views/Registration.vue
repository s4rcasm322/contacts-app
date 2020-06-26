<template>
  <section class="registration">
    <vs-button icon shadow class="link-back" @click="$router.push('/auth')">
      <box-icon name="left-arrow-alt"></box-icon>
    </vs-button>

    <div class="registration__form">
      <h2 class="registration__title">Регистрация</h2>
      <div class="registration__inputs">
        <vs-input
          v-model="form.username"
          class="registration__input"
          type="text"
          label-placeholder="Имя пользователя"
        >
          <template #icon>
            <box-icon name="user"></box-icon>
          </template>
          <template #message-danger>{{ errors.username }}</template>
        </vs-input>

        <vs-input
          v-model="form.password"
          class="registration__input"
          type="password"
          label-placeholder="Пароль"
        >
          <template #icon>
            <box-icon name="lock-open"></box-icon>
          </template>
          <template #message-danger>{{ errors.password }}</template>
        </vs-input>
        <vs-input
          v-model="form.repeatPassword"
          class="registration__input"
          type="password"
          label-placeholder="Повторите пароль"
        >
          <template #icon>
            <box-icon name="lock"></box-icon>
          </template>
          <template #message-danger>{{ errors.repeatPassword }}</template>
        </vs-input>
      </div>
      <div class="registration__buttons">
        <vs-button
          class="registration__button registration__button--link"
          transparent
          color="info"
          to="/auth"
          >Вход</vs-button
        >
        <vs-button
          class="registration__button"
          gradient
          color="info"
          @click="validateForm"
          >Зарегистрироваться</vs-button
        >
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Registration',
  data() {
    return {
      form: {
        username: '',
        password: '',
        repeatPassword: ''
      },
      errors: {
        username: '',
        password: '',
        repeatPassword: ''
      }
    }
  },
  methods: {
    async registration() {
      const { username, password } = this.form

      const payLoad = {
        username,
        password
      }
      const res = await this.$store.dispatch('registration', payLoad)

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
    },
    validateForm() {
      let errorsCount = 0

      if (this.form.username.trim() === '') {
        this.errors.username = 'Не указано имя пользователя!'
        errorsCount++
      }
      if (this.form.password.trim() === '') {
        this.errors.password = 'Не указан пароль!'
        errorsCount++
      }
      if (this.form.repeatPassword.trim() !== this.form.password.trim()) {
        this.errors.password = 'Пароли не совпадают!'
        this.errors.repeatPassword = 'Пароли не совпадают!'
        errorsCount++
      }

      if (errorsCount === 0) {
        errorsCount = 0
        this.errors = {
          username: '',
          password: '',
          repeatPassword: ''
        }

        this.registration()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.link-back {
  position: absolute;
  top: 6px;
  left: 6px;
}

.registration {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  padding: 20px;
  background-color: rgb(244, 247, 248);

  &__form {
    display: flex;
    flex-flow: column nowrap;

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
    display: block;
    margin-bottom: 20px;
  }

  &__inputs {
    display: flex;
    flex-flow: column nowrap;

    width: 100%;
    margin-bottom: 20px;
  }

  &__input {
    width: 100%;
    margin-bottom: 20px;

    ::v-deep .vs-input {
      width: 100% !important;
    }

    &:first-child {
      margin-top: 20px;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__check {
    margin-left: 5px;
  }

  &__check a {
    color: #2941ae;
  }

  &__buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
  }

  &__button {
    padding: 0 10px;
  }
}
</style>
