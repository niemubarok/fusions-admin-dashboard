<template>
  <div class="flex">
    <feather-icon
      @click="$router.go(-1)"
      path="chevron-left"
      size="25px"
      class="cursor-pointer"
    ></feather-icon>
    <div v-if="hasText" class="ml-1">
      {{ text }}
    </div>
  </div>
</template>

<script>
import FeatherIcon from "./FeatherIcon.vue";
export default {
  components: {
    FeatherIcon
  },
  props: {
    hasText: Boolean,
    text: {
      type: String,
      default: "back"
    }
  },
  setup() {}
};
</script>
