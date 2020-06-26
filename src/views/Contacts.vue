<template>
  <section class="contacts">
    <div class="contacts__box">
      <div class="contacts__header">
        <div class="contacts__header-content">
          <h2 class="contacts__title">Мои контакты</h2>
          <div class="contacts__actions">
            <add-contact class="contacts__action"></add-contact>
          </div>
        </div>
        <vs-input
          class="contacts__search"
          type="search"
          v-model="search"
          placeholder="Поиск"
          v-debounce:300="searchContact"
        >
        </vs-input>
      </div>
      <ul ref="contacts" class="contacts__list">
        <li
          ref="contact"
          class="contacts__list-item contact"
          v-for="contact in contacts"
          :key="contact.id"
          @click="$router.push(`/contact/${contact.id}`)"
        >
          <h3 class="contact__name">{{ contact.name }} {{ contact.family }}</h3>
          <div class="contact__phone">{{ contact.phone }}</div>

          <box-icon class="contact__arrow" name="chevron-right"></box-icon>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import AddContact from '@/components/contact/AddContact.vue'
export default {
  name: 'Contacts',
  components: {
    AddContact
  },
  data() {
    return {
      selectedContact: {},
      search: ''
    }
  },
  computed: mapState({
    contacts: state => state.contacts.contacts
  }),
  methods: {
    ...mapActions(['getContacts']),
    searchContact() {
      const items = this.$refs.contact

      items.map(item => {
        if (item.textContent.toLowerCase().includes(this.search)) {
          item.style.display = 'flex'
        } else {
          item.style.display = 'none'
        }
      })
    },
  },
  created() {
    this.getContacts()
  }
}
</script>
<style lang="scss" scoped>
.contacts {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  padding: 20px;

  &__box {
    flex: 1;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    width: 100%;
    max-width: 600px;
    max-height: calc(100vh - 64px - 40px);
    background-color: #fff;
    border-radius: 20px;
    overflow: hidden;
  }

  &__header {
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;

    width: 100%;
    padding: 10px 20px;
    box-shadow: 2px 0 6px rgba(40, 40, 40, 0.27);
  }

  &__header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
  }

  &__title {
    display: block;
    margin: 0;
    margin-right: auto;
    padding: 0;

    font-size: 1.2rem;
  }

  &__actions {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__action {
    ::v-deep .vs-button {
      margin: 0;

      &__content {
        padding: 4px;
      }
    }
  }

  &__search {
    width: 100%;
    margin-top: 12px;

    ::v-deep input {
      width: 100%;
    }
  }

  &__list {
    display: flex;
    flex-flow: column nowrap;

    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    padding-top: 16px;
    list-style: none;

    overflow: hidden;
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none;
    }

    & {
      -ms-overflow-style: none;
    }
  }
}

.contact {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;

  position: relative;

  width: 100%;
  padding: 8px 20px;
  transition: 0.3s;
  border-bottom: 1px solid rgba(40, 40, 40, 0.17);
  cursor: pointer;

  &:hover {
    background-color: rgb(240, 240, 240);
  }

  &:active {
    background-color: rgba(245, 245, 245, 0.8);
  }

  &:last-child {
    border-bottom: none;
  }

  &__arrow {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
  }

  &__name {
    display: block;
    margin: 0;
    margin-bottom: 8px;

    font-weight: 500;
    font-size: 1rem;
  }

  &__phone {
    font-weight: 400;
    font-size: 1rem;
  }
}
</style>
