<template>
  <div class="flex">
    <feather-icon
      @click="atClick"
      path="chevron-left"
      size="25px"
      class="cursor-pointer"
    ></feather-icon>
    <div v-if="hasText" class="space-x-1">
      {{ text }}
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import FeatherIcon from "./FeatherIcon.vue";
export default {
  components: {
    FeatherIcon,
  },
  props: {
    hasText: Boolean,
    text: {
      type: String,
      default: "back",
    },
    to: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const router = useRouter();
    const atClick = () => {
      if (props.to) {
        router.push({ name: props.to });
      } else {
        router.go(-1);
      }
    };
    return { atClick };
  },
};
</script>
