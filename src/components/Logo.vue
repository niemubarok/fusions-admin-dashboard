<template>
  <div class="flex items-center">
    <img src="/assets/img/logo _cloud_menu.png" />
    <strong v-if="hasText" class="ml-2">Cloud Menu</strong>
  </div>
</template>

<script>
export default {
  name: "logo",
  props: {
    hasText: {
      type: Boolean,
      default: false
    }
  },
  setup() {}
};
</script>
