<script>
export default {
  mounted() {
    this.$store.commit("clearUser");
    this.$router.replace("/");
  }
};
</script>