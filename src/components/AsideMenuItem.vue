<template>
  <li>
    <component
      :is="componentIs"
      :to="itemTo"
      :href="itemHref"
      class="flex cursor-pointer hover:bg-blue-300 hover:text-gray-900 rounded-md  "
      :class="{
        'py-2': !isSubmenuList,
        'p-3 text-sm bg-gray-200': isSubmenuList
      }"
      exact-active-class="bg-blue-500 text-gray-50 "
      @click="menuClick"
    >
      <!-- 'bg-gray-200': item.label == 'Dashboard' -->
      <feather-icon
        v-if="item.icon"
        :path="item.icon"
        class="flex-none"
        w="w-9"
      ></feather-icon>
      <span class="flex-grow">{{ item.label }}</span>
      <icon
        v-if="hasDropdown"
        :path="dropdownIcon"
        class="flex-none"
        w="w-12"
      />
    </component>
    <aside-menu-list
      v-if="hasDropdown"
      :menu="item.menu"
      :class="{ hidden: !isDropdownActive }"
      is-submenu-list
      :color="color"
    />
  </li>
  <!-- 'block bg-gray-100': isDropdownActive -->
</template>

<script>
import { defineAsyncComponent, ref, computed } from "vue";
import { mdiMinus, mdiChevronDown } from "@mdi/js";
import Icon from "@/components/Icon";
import featherIcon from "@/components/FeatherIcon";

export default {
  name: "AsideMenuItem",
  components: {
    AsideMenuList: defineAsyncComponent(() =>
      import("@/components/AsideMenuList")
    ),
    Icon,
    featherIcon
  },
  emits: ["menu-click"],
  props: {
    item: {
      type: Object,
      default: null
    },
    isSubmenuList: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: ""
    }
  },
  setup(props, { emit }) {
    const isDropdownActive = ref(false);

    const componentIs = computed(() => (props.item.to ? "router-link" : "a"));

    const hasDropdown = computed(() => !!props.item.menu);

    const dropdownIcon = computed(() =>
      isDropdownActive.value ? mdiMinus : mdiChevronDown
    );

    const itemTo = computed(() => props.item.to || null);

    const itemHref = computed(() => props.item.href || null);

    const menuClick = event => {
      emit("menu-click", event, props.item);

      if (hasDropdown.value) {
        isDropdownActive.value = !isDropdownActive.value;
      }
    };

    // onMounted(()=>{
    //   console.log(props.item.icon);
    // })

    return {
      isDropdownActive,
      componentIs,
      hasDropdown,
      dropdownIcon,
      itemTo,
      itemHref,
      menuClick
    };
  }
};
</script>
