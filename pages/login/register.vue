<template>
  <div class="container">
    <form action="#" @submit.prevent="submit">
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
        <label for>
          {{ $t('lb_password_repeat') }}
          <input v-model="form.password_repeat" type="password" />
        </label>
      </div>
      <div class="item">
        <button>{{ $t('btn_submit') }}</button>
      </div>
    </form>
    <nuxt-link to="/login/">{{ $t('a_login') }}</nuxt-link>
  </div>
</template>

<script>
export default {
  layout: "login",
  data() {
    return {
      form: {
        email: "",
        password: "",
        password_repeat: ""
      }
    };
  },
  methods: {
    async submit() {
      // TODO: I need to validate the two passwords.
      const form = JSON.parse(JSON.stringify(this.form));
      if (!form.email) {
        return;
      }
      const data = await this.$store.dispatch("register", form);
      this.$router.replace("/");
    }
  }
};
</script>

<i18n>
{
  "en": {
    "lb_email": "Email",
    "lb_password": "Password",
    "a_login": "Login",
    "lb_password_repeat": "Password Repeat",
    "btn_submit": "Submit"
  }
}
</i18n>
