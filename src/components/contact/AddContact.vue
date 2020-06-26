<template>
  <div>
    <vs-tooltip left>
      <vs-button circle icon gradient color="info" @click="activeDialog = true">
        <box-icon name="plus" color="white"></box-icon>
      </vs-button>
      <template #tooltip>
        Добавить контакт
      </template>
    </vs-tooltip>

    <vs-dialog class="dialog" v-model="activeDialog">
      <template #header>
        <div class="dialog__header">
          <h4 class="dialog__title">Новый контакт</h4>
        </div>
      </template>

      <div class="dialog__content">
        <vs-input
          v-model="form.name"
          type="text"
          class="dialog__input"
          block
          placeholder="Имя"
        >
          <template #icon>
            <box-icon size="20px" name="user"></box-icon>
          </template>
        </vs-input>
        <vs-input
          v-model="form.family"
          type="text"
          class="dialog__input"
          block
          placeholder="Фамилия"
        >
          <template #icon>
            <box-icon size="20px" name="user-plus"></box-icon>
          </template>
        </vs-input>
        <vs-input
          v-model="form.phone"
          type="tel"
          class="dialog__input"
          block
          placeholder="Телефон"
        >
          <template #icon>
            <box-icon size="20px" name="phone"></box-icon>
          </template>
          <template #message-danger>{{ errors.phone }}</template>
        </vs-input>
        <vs-input
          v-model="form.bio"
          type="text"
          class="dialog__input"
          block
          placeholder="О контакте"
          @keyup.enter="addContact"
        >
          <template #icon>
            <box-icon size="20px" name="info-circle"></box-icon>
          </template>
        </vs-input>
      </div>

      <template #footer>
        <div class="dialog__footer">
          <vs-button
            class="dialog__btn"
            transparent
            color="#cecece"
            @click="activeDialog = false"
          >
            Отмена
          </vs-button>

          <vs-button
            gradient
            color="info"
            class="dialog__btn"
            @click="addContact"
            >Добавить</vs-button
          >
        </div>
      </template>
    </vs-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeDialog: false,
      form: {
        name: '',
        family: '',
        phone: '',
        bio: ''
      },
      errors: {
        phone: ''
      }
    }
  },
  methods: {
    async addContact() {
      if (this.form.phone.trim() === '') {
        this.errors.phone = 'Не указан телефон!'
      } else {
        const url = 'contacts'
        const payload = this.form
        const res = await this.$store.dispatch('request', {
          method: 'POST',
          url,
          payload
        })

        if (res) {
          this.$store.dispatch('getContacts')
          this.activeDialog = false

          this.$vs.notification({
            color: 'success',
            icon: `<box-icon size="20px" name="check" color="white"></box-icon>`,
            position: 'top-center',
            title: 'Готово!',
            text: 'Контакт успешно добавлен!',
            buttonClose: false
          })
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.dialog {
  &__header {
    display: flex;
    justify-content: flex-start;

    width: 100%;
    padding: 4px;
  }

  &__title {
    margin: 0;
  }

  &__content {
  }

  &__input {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    padding-top: 20px;
  }

  &__btn {
    margin: 0;
  }
}
</style>
