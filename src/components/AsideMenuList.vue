<template>
  <ul>
    <aside-menu-item
      v-for="(item, index) in menu"
      :key="index"
      :item="item"
      :is-submenu-list="isSubmenuList"
      @menu-click="menuClick"
      class="bg-white py-3 px-2 w-full"
    />
  </ul>
</template>

<script>
import AsideMenuItem from "@/components/AsideMenuItem";

export default {
  name: "AsideMenuList",
  components: {
    AsideMenuItem
  },
  emits: ["menu-click"],
  props: {
    isSubmenuList: {
      type: Boolean,
      default: false
    },
    menu: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { emit }) {
    const menuClick = (event, item) => {
      emit("menu-click", event, item);
    };

    return {
      menuClick
    };
  }
};
</script>
