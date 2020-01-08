<template>
  <div>
    <b-button to="/contact/form" class="b_create">{{ $t('b_create') }}</b-button>
    <h1>{{ $t('t_title') }}</h1>
    <b-table striped hover :items="items" :fields="fields">
      <template v-slot:cell(actions)="data">
        <b-button :to="`/contact/form?_id=${data.item._id}`">{{ $t('b_edit') }}</b-button>
        <b-button @click="remove(data.item._id)" variant="danger">{{ $t('b_remove') }}</b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  async asyncData({ store }) {
    const items = await store.dispatch("contact/list");
    return {
      items,
      fields: ["name", "email", "actions"]
    };
  },
  methods: {
    async remove(_id) {
      await this.$store.dispatch("contact/remove", { _id });
      this.items = await this.$store.dispatch("contact/list");
    }
  }
};
</script>

<i18n>
{
  "en": {
    "b_remove": "Remove",
    "b_edit": "Edit",
    "b_create": "Create",
    "t_title": "Contacts"
  }
}
</i18n>

<style scoped>
.b_create {
  float: right;
}
</style>
