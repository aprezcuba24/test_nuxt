<template>
  <div>
    <div class="header">
      <h1>Test Ricardo</h1>
      <div class="logout">
        <nuxt-link to="/login/logout">{{ $t('a_logout') }}</nuxt-link>
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
    "a_logout": "Logout"
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
.logout {
  float: right;
  background-color: white;
  padding: 5px;
  border-radius: 5px;
}
</style>
