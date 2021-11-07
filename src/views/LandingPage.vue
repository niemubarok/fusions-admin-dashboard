<template>
  <div>
    <nav-bar />
    <banner />
  </div>
</template>

<script>
import Banner from "../components/LandingPage/Banner.vue";
import NavBar from "../components/LandingPage/NavBar.vue";

export default {
  components: {
    NavBar,
    Banner
  },

  setup() {
    return {};
  }
};
</script>

<style></style>
