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
        <button>{{ $t('submit') }}</button>
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
        password: ""
      }
    };
  },
  methods: {
    async submit() {
      const form = JSON.parse(JSON.stringify(this.form));
      if (!form.email) {
        return;
      }
      const data = await this.$store.dispatch("login", form);

      // console.log(JSON.parse(JSON.stringify(this.form)));
      // console.log("aqui");
    }
  }
};
</script>

<i18n>
{
  "en": {
    "lb_email": "Email",
    "lb_password": "Password",
    "btn_submit": "Submit"
  }
}
</i18n>
