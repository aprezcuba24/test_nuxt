<template>
  <div class="page">
    <div class="header">
      <nuxt-link to="/">
        <h1>{{ $t('a_calendar') }}</h1>
      </nuxt-link>
      <div class="link">
        <nuxt-link to="/login/logout">
          {{ $t('a_logout') }}
        </nuxt-link>
      </div>
      <div class="link">
        <nuxt-link to="/contact">
          {{ $t('a_contact') }}
        </nuxt-link>
      </div>
    </div>
    <main class="container">
      <nuxt />
    </main>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
}
</script>

<i18n>
{
  "en": {
    "a_logout": "Logout",
    "a_contact": "Contacts",
    "a_calendar": "Calendar"
  }
}
</i18n>

<style scoped>
.container {
  background-color: white;
  padding: 50px;
  border-radius: 5px;
}
.header {
  background-size: cover;
  background-image: url("https://source.unsplash.com/random/1600x200");
  height: 200px;
  padding: 50px 50px 0 50px;
  margin-bottom: 30px;
  border-bottom: 1px solid;
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
main {
  padding-bottom: 50px;
}
</style>
