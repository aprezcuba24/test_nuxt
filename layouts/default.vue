<template>
  <div>
    <div class="header">
      <h1>Test Ricardo</h1>
      <div class="link">
        <nuxt-link to="/login/logout">{{ $t('a_logout') }}</nuxt-link>
      </div>
      <div class="link">
        <nuxt-link to="/contact">{{ $t('a_contact') }}</nuxt-link>
      </div>
    </div>
    <nuxt />
  </div>
</template>

<script>
export default {
  middleware: "authenticated"
};
</script>

<i18n>
{
  "en": {
    "a_logout": "Logout",
    "a_contact": "Contacts"
  }
}
</i18n>

<style>
.header {
  background-image: url("https://source.unsplash.com/random/1600x200");
  height: 200px;
  padding: 50px 50px 0 50px;
}
.header h1 {
  float: left;
  background-color: white;
  padding: 5px;
  border-radius: 5px;
}
.link {
  float: right;
  background-color: white;
  padding: 5px;
  border-radius: 5px;
  margin-right: 5px;
}
</style>
