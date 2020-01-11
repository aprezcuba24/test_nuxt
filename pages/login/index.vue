<template>
  <div class="page">
    <div class="container">
      <form @submit.prevent="submit" action="#">
        <strong v-show="error">{{ $t('show_error') }}</strong>
        <b-form-group id="input-group-1" :label="$t('lb_email')" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.email"
            :placeholder="$t('ph_email')"
            type="email"
            required
          />
        </b-form-group>
        <b-form-group id="input-group-1" :label="$t('lb_password')" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.password"
            :placeholder="$t('ph_password')"
            type="password"
            required
          />
        </b-form-group>
        <b-button type="submit" variant="primary">
          {{ $t('btn_submit') }}
        </b-button>
        <nuxt-link to="/login/register">
          {{ $t('a_register') }}
        </nuxt-link>
      </form>
    </div>
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
    "ph_email": "Enter the e-mail",
    "lb_password": "Password",
    "ph_password": "Enter the password",
    "btn_submit": "Submit",
    "a_register": "Register",
    "show_error": "Password or email incorrect"
  }
}
</i18n>

<style scoped>
.page {
  background-color: #10910e;
}
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
form {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}
</style>
