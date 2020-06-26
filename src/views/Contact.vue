<template>
  <section class="contact">
    <div class="contact__box">
      <div class="contact__header">
        <div class="contact__header-content">
          <vs-button class="contact__back-btn" icon shadow to="/">
            <box-icon size="20px" name="chevron-left"></box-icon>
          </vs-button>
          <h2 class="contact__title">Мои контакты</h2>
        </div>
      </div>
      <contact-info
        :contact="contact"
        @on-edit-save="getContact"
      ></contact-info>
    </div>
  </section>
</template>

<script>
import ContactInfo from '@/components/contact/ContactInfo.vue'
export default {
  name: 'Contact',
  components: {
    ContactInfo
  },
  data() {
    return {
      contact: {}
    }
  },
  methods: {
    async getContact() {
      const res = await this.$store.dispatch(
        'getContact',
        this.$route.params.id
      )

      if (res) {
        this.contact = res.data
      }
    }
  },
  created() {
    this.getContact()
  }
}
</script>
<style lang="scss" scoped>
.contact {
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

  &__back-btn {
    margin: 0;
    margin-right: 12px;
  }

  &__title {
    display: block;
    margin: 0;
    margin-right: auto;
    padding: 0;

    font-size: 1.2rem;
  }
}
</style>
