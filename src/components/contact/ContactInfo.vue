<template>
  <div class="contact-info">
    <div v-show="!isEdit" class="contact-info__content">
      <h3 class="contact-info__name">
        {{ contact.name }} {{ contact.family }}
      </h3>
      <a :href="`tel:${contact.phone}`" class="contact-info__phone">{{
        contact.phone
      }}</a>
      <div class="contact-info__bio">{{ contact.bio }}</div>
    </div>
    <div v-show="isEdit" class="contact-info__content">
      <vs-input
        v-model="localContact.name"
        type="text"
        class="contact-info__input"
        block
        placeholder="Имя"
      >
        <template #icon>
          <box-icon size="20px" name="user"></box-icon>
        </template>
      </vs-input>
      <vs-input
        v-model="localContact.family"
        type="text"
        class="contact-info__input"
        block
        placeholder="Фамилия"
      >
        <template #icon>
          <box-icon size="20px" name="user-plus"></box-icon>
        </template>
      </vs-input>
      <vs-input
        v-model="localContact.phone"
        type="tel"
        class="contact-info__input"
        block
        placeholder="Телефон"
      >
        <template #icon>
          <box-icon size="20px" name="phone"></box-icon>
        </template>
        <template #message-danger>{{ errors.phone }}</template>
      </vs-input>
      <vs-input
        v-model="localContact.bio"
        type="text"
        class="contact-info__input"
        block
        placeholder="О контакте"
        @keyup.enter="saveChanges"
      >
        <template #icon>
          <box-icon size="20px" name="info-circle"></box-icon>
        </template>
      </vs-input>
    </div>

    <div v-show="!isEdit" class="contact-info__actions">
      <remove-contact class="contact-info__action"></remove-contact>
      <vs-button circle icon color="warn" @click="startEdit">
        <box-icon name="pencil" color="white"></box-icon>
      </vs-button>
    </div>
    <div v-show="isEdit" class="contact-info__actions">
      <vs-button circle icon color="danger" @click="cancelEdit">
        <box-icon name="x" color="white"></box-icon>
      </vs-button>
      <vs-button circle icon color="info" @click="saveChanges">
        <box-icon name="check" color="white"></box-icon>
      </vs-button>
    </div>
  </div>
</template>
<script>
import RemoveContact from './RemoveContact'
export default {
  name: 'ContactInfo',
  components: {
    RemoveContact
  },
  props: {
    contact: {
      type: Object
    }
  },
  data() {
    return {
      localContact: {},
      isEdit: false,
      errors: {
        phone: ''
      }
    }
  },
  methods: {
    startEdit() {
      this.localContact = Object.assign({}, this.contact)
      this.isEdit = true
    },
    cancelEdit() {
      this.localContact = {}
      this.isEdit = false
    },
    async saveChanges() {
      if (this.localContact.phone.trim() === '') {
        this.errors.phone = 'Не указан телефон!'
      } else {
        const payload = this.localContact
        const res = await this.$store.dispatch('editContact', payload)

        if (res) {
          this.$emit('on-edit-save')

          this.cancelEdit()

          this.$vs.notification({
            color: 'success',
            icon: `<box-icon size="20px" name="check" color="white"></box-icon>`,
            position: 'top-center',
            title: 'Готово!',
            text: 'Данные об аккаунте успешно изменены!',
            buttonClose: false
          })
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.contact-info {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  width: 100%;

  &__content {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    width: 100%;
    padding: 30px 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid rgba(40, 40, 40, 0.07);
  }

  &__name {
    margin: 0;

    font-weight: 600;
    font-size: 1.4rem;
  }

  &__phone {
    margin: 12px 0;

    font-weight: 400;
    font-size: 1.2rem;
    color: #000;
    text-decoration: none;
  }

  &__actions {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
  }

  &__action {
    margin-right: 8px;

    &:last-child {
      margin-right: 0;
    }
  }

  &__input {
    width: 60%;
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }

    @media screen and (max-width: 500px) {
      width: 100%;
    }
  }
}
</style>
