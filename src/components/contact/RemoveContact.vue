<template>
  <div>
    <vs-button circle icon color="danger" @click="activeDialog = true">
      <box-icon name="trash" color="white"></box-icon>
    </vs-button>

    <vs-dialog class="dialog" v-model="activeDialog">
      <template #header>
        <div class="dialog__header">
          <h4 class="dialog__title">Удаление контакта</h4>
        </div>
      </template>

      <div class="dialog__content">
        Вы уверены, что хотите удалить данный контакт?
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
            @click="removeContact"
            >Удалить</vs-button
          >
        </div>
      </template>
    </vs-dialog>
  </div>
</template>
<script>
export default {
  name: 'RemoveContact',
  props: {
    id: {
      type: Number
    }
  },
  data() {
    return {
      activeDialog: false
    }
  },
  methods: {
    async removeContact() {
      const res = await this.$store.dispatch(
        'removeContact',
        this.$route.params.id
      )

      if (res) {
        this.activeDialog = false
        this.$router.push('/')

        this.$vs.notification({
          color: 'success',
          icon: `<box-icon size="20px" name="check" color="white"></box-icon>`,
          position: 'top-center',
          title: 'Готово!',
          text: 'Контакт успешно удалён!',
          buttonClose: false
        })
      } else {
        this.$vs.notification({
          color: 'danger',
          icon: `<box-icon size="20px" name="check" color="white"></box-icon>`,
          position: 'top-center',
          title: 'Ошибка!',
          text: 'Упс! Контакт не был удалён!',
          buttonClose: false
        })
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
