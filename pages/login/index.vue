<template>
  <div class="container">
    <form @submit.prevent="submit" action="#">
      <strong v-show="error">{{ $t('show_error') }}</strong>
      <div class="item">
        <label for>
          {{ $t('lb_email') }}
          <input v-model="form.email" type="email" />
        </label>
      </div>
      <div class="item">
        <label for>
          {{ $t('lb_password') }}
          <input v-model="form.password" type="password" />
        </label>
      </div>
      <div class="item">
        <button>{{ $t('btn_submit') }}</button>
      </div>
    </form>
    <nuxt-link to="/login/register">{{ $t('a_register') }}</nuxt-link>
  </div>
</template>

<script>
export default {
  layout: 'login',
  data() {
    return {
      error: false,
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async submit() {
      this.error = false
      const form = JSON.parse(JSON.stringify(this.form))
      if (!form.email) {
        return
      }
      try {
        await this.$store.dispatch('login', form)
        this.$router.replace('/')
      } catch (e) {
        this.error = true
      }
    }
  }
}
</script>

<i18n>
{
  "en": {
    "lb_email": "Email",
    "lb_password": "Password",
    "btn_submit": "Submit",
    "a_register": "Register",
    "show_error": "Password or email incorrect"
  }
}
</i18n>
