<template>
  <div>
    <h1>{{ $t('t_title') }}</h1>
    <b-form @submit.prevent="submit">
      <b-form-group id="input-group-1" :label="$t('lb_name')" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.name"
          :placeholder="$t('ph_name')"
          type="text"
          required
        />
      </b-form-group>
      <b-form-group id="input-group-1" :label="$t('lb_email')" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.email"
          :placeholder="$t('ph_email')"
          type="email"
          required
        />
      </b-form-group>
      <b-button type="submit" variant="primary">{{ $t('bt_submit') }}</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  async asyncData({ query, store }) {
    let form = {};
    const { _id } = query;
    if (_id) {
      form = await store.dispatch("contact/get", { _id });
    }
    return { form };
  },
  methods: {
    async submit() {
      if (!this.form._id) {
        await this.$store.dispatch("contact/create", this.form);
      } else {
        await this.$store.dispatch("contact/update", this.form);
      }
      this.$router.replace("/contact");
    }
  }
};
</script>

<i18n>
{
  "en": {
    "t_title": "Contact",
    "lb_email": "Email address:",
    "ph_email": "Email address",
    "lb_name": "Name:",
    "ph_name": "Name",
    "bt_submit": "Submit"
  }
}
</i18n>
