<template>
  <a
    href="#"
    class="inline-block px-6 py-4 leading-none rounded-2xl hover:border-transparent mt-4 lg:mt-0 mr-8"
    :class="[
      isOutline
        ? 'border border-gray-600 text-gray-600 border-white hover:bg-gray-400 hover:text-gray-50'
        : 'bg-primary rounded-2xl text-gray-50 border-white hover:border-transparent hover:text-teal-500 hover:bg-blue-500 hover:text-gray-50 ',
    ]"
    style="font-size: 16px"
  >
    <span class="flex justify-start items-center">
      <feather-icon v-if="isIcon" :path="icon" class="-ml-2" />
      {{ label }}
    </span>
  </a>
  <!-- <a
    v-else
    href="#"
    class="inline-block px-6 py-4 leading-none border bg-primary rounded-2xl text-gray-50 border-white hover:border-transparent hover:text-teal-500 hover:bg-gray-400 hover:text-gray-50 mt-4 lg:mt-0 mr-12"
    style="font-size: 16px"
    >{{ label }}</a
  > -->
</template>

<script>
import FeatherIcon from "../FeatherIcon.vue";
export default {
  components: { FeatherIcon },
  props: {
    label: {
      type: String,
      default: "Button Label",
    },
    icon: {
      type: String,
    },

    isOutline: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
</style>