<template>
  <main-section>
    <h3>Profile</h3>
    <card-component />
  </main-section>
</template>
<script>
import CardComponent from "../components/CardComponent.vue";
import MainSection from "../components/MainSection.vue";
export default {
  components: { MainSection, CardComponent },
  setup() {}
};
</script>
