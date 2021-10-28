<template>
  <li>
    <component
      :is="componentIs"
      :to="itemTo"
      :href="itemHref"
      class="cursor-pointer hover:bg-primary hover:text-gray-100 rounded-md"
      :class="{
        'py-2': !isSubmenuList,
        'p-3 text-sm bg-gray-200': isSubmenuList,
        'w-10 justify-center': miniMode,
        'w-56 flex ': !miniMode,
      }"
      exact-active-class="bg-primary text-gray-50 "
      @click="menuClick"
      @mouseenter="toggleTooltip()"
      @mouseleave="toggleTooltip()"
    >
      <feather-icon v-if="item.icon" :path="item.icon" w="w-9"></feather-icon>
      <span v-if="!miniMode" class="flex-grow">{{ item.label }}</span>
      <div
        v-show="miniMode"
        :class="{ hidden: !tooltipShow, absolute: tooltipShow }"
        ref="tooltipRef"
        class="pl-2 bg-primary flex items-center -ml-2 shadow-lg rounded-md left-16 w-36 z-50"
        style="margin-top: -31px; height: 38px"
      >
        {{ item.label }}
      </div>
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
import { useStore } from "vuex";
import { createPopper } from "@popperjs/core";

export default {
  name: "AsideMenuItem",
  components: {
    AsideMenuList: defineAsyncComponent(() =>
      import("@/components/AsideMenuList")
    ),
    Icon,
    featherIcon,
  },
  emits: ["menu-click"],
  props: {
    item: {
      type: Object,
      default: null,
    },
    isSubmenuList: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const isDropdownActive = ref(false);
    const tooltipShow = ref(false);
    const btnRef = ref();
    const tooltipRef = ref();
    const componentIs = computed(() => (props.item.to ? "router-link" : "a"));

    const hasDropdown = computed(() => !!props.item.menu);

    const dropdownIcon = computed(() =>
      isDropdownActive.value ? mdiMinus : mdiChevronDown
    );

    const itemTo = computed(() => props.item.to || null);

    const itemHref = computed(() => props.item.href || null);

    const menuClick = (event) => {
      if (props.item.action()) {
        emit("menu-click", event, props.item.action());
      }
      // console.log(props.item.action());
      emit("menu-click", event, props.item);

      if (hasDropdown.value) {
        isDropdownActive.value = !isDropdownActive.value;
      }
    };

    const miniMode = computed({ get: () => store.state.miniMode });

    // tooltip
    const toggleTooltip = () => {
      if (tooltipShow.value) {
        tooltipShow.value = false;
      } else {
        tooltipShow.value = true;
        createPopper(btnRef.value, tooltipRef.value, {
          placement: "left",
        });
      }
    };

    return {
      isDropdownActive,
      componentIs,
      hasDropdown,
      dropdownIcon,
      itemTo,
      itemHref,
      menuClick,
      miniMode,
      tooltipShow,
      btnRef,
      toggleTooltip,
    };
  },
};
</script>
