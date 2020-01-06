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
  </div>
</template>

<script>
export default {
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
      const form = JSON.parse(JSON.stringify(this.form));
      if (!form.email) {
        return;
      }
      const data = await this.$store.dispatch("register", form);
    }
  }
};
</script>

<i18n>
{
  "en": {
    "lb_email": "Email",
    "lb_password": "Password",
    "lb_password_repeat": "Password Repeat",
    "btn_submit": "Submit"
  }
}
</i18n>
