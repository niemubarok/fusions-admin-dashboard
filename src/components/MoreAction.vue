<template>
  <!-- :has-divider="hasDivider" -->
  <nav-bar-item
    type="block"
    :active="isDropdownActive"
    dropdown
    class="dropdown"
    @click="toggle"
    ref="root"
  >
    <a class="flex items-center py-2 px-3 bg-white lg:bg-transparent">
      <slot />
    </a>
    <div
      class="shadow-lg text-sm bg-gray-100 border-b lg:border-b-0 lg:border-gray-200 lg:border-t-2 lg:bg-white lg:absolute lg:top-full lg:left-0 lg:min-w-full lg:z-20 lg:shadow-md rounded-md"
      :class="{ hidden: !isDropdownActive }"
    >
      <slot name="dropdown" />
    </div>
  </nav-bar-item>
</template>

<script>
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
// import { mdiChevronUp, mdiChevronDown } from '@mdi/js'
import NavBarItem from "@/components/NavBarItem";
import Icon from "@/components/Icon";
import FeatherIcon from "./FeatherIcon.vue";

export default {
  name: "NavBarMenu",
  components: {
    //   Icon,
    NavBarItem
    // FeatherIcon
  },
  props: {
    hasDivider: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const isDropdownActive = ref(false);

    // const toggleDropdownIcon = computed(() => isDropdownActive.value ? mdiChevronUp : mdiChevronDown)

    const toggle = () => {
      isDropdownActive.value = !isDropdownActive.value;
    };

    const root = ref(null);

    const forceClose = event => {
      if (!root.value.$el.contains(event.target)) {
        isDropdownActive.value = false;
      }
    };

    onMounted(() => {
      window.addEventListener("click", forceClose);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("click", forceClose);
    });

    return {
      isDropdownActive,
      //   toggleDropdownIcon,
      toggle,
      root
    };
  }
};
</script>
