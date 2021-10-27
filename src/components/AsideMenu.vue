<template>
  <aside
    v-show="!isFormScreen"
    class="top-0 z-40 h-screen transition-position lg:left-0 overflow-y-scroll scrollbar-thin scrollbar-thumb-white scrollbar-track-gray-200 hover:scrollbar-thumb-blue-900 bg-white py-3 flow-root fixed"
    :class="[
      isAsideMobileExpanded ? 'left-0' : '-left-60',
      isAsideLgActive ? 'block' : 'md:flex lg:block ',
      miniMode ? 'w-16' : 'w-60'
    ]"
  >
    <div>
      <!-- logo -->
      <logo
        :has-text="!miniMode"
        class="w-full  mb-11 mt-6"
        :class="[miniMode ? 'ml-2' : 'ml-5']"
      />

      <hr class="mb-4" />
      <template v-for="(menuGroup, index) in menu">
        <p
          v-if="typeof menuGroup === 'string'"
          :key="`a-${index}`"
          class="p-3 text-xs uppercase text-gray-600"
        >
          {{ menuGroup }}
        </p>
        <aside-menu-list v-else :key="`b-${index}`" :menu="menuGroup" />
        <!-- @menu-click="menuClick" -->
      </template>
    </div>
    <div
      class="absolute bottom-5 opacity-0 md:opacity-100 "
      :class="[miniMode ? 'left-6' : 'left-52']"
    >
      <nav-bar-item type="flex" @click.prevent="toggleMiniMode">
        <icon :path="menuToggleMobileIcon" size="24" />
      </nav-bar-item>
    </div>
  </aside>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import AsideMenuList from "@/components/AsideMenuList";
import Logo from "@/components/Logo";
import { mdiForwardburger, mdiBackburger } from "@mdi/js";
import NavBarItem from "@/components/NavBarItem";

import Icon from "@/components/Icon";

export default {
  name: "AsideMenu",
  components: {
    AsideMenuList,
    NavBarItem,
    Logo,
    Icon
  },
  props: {
    menu: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    const store = useStore();

    const isFormScreen = computed(() => store.state.isFormScreen);

    const isAsideMobileExpanded = computed(
      () => store.state.isAsideMobileExpanded
    );

    const isAsideLgActive = computed(() => store.state.isAsideLgActive);

    const asideLgClose = () => {
      store.dispatch("asideLgToggle", false);
    };

    const menuToggleMobileIcon = computed(() =>
      !miniMode.value ? mdiBackburger : mdiForwardburger
    );

    // MINI MODE
    const miniMode = computed({ get: () => store.state.miniMode });
    const SIDEBAR_WIDTH = 200;
    const SIDEBAR_WIDTH_COLLAPSED = 40;
    const sidebarWidth = computed(
      () => `${miniMode.value ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH}px`
    );

    const toggleMiniMode = () => {
      !miniMode.value
        ? [
            document.getElementById("app").classList["add"]("-ml-48"),
            document.getElementById("app").classList["remove"]("ml-60")
          ]
        : [
            // document.getElementById("app").classList["add"]("ml-60"),
            document.getElementById("app").classList["remove"]("-ml-48")
          ];

      document.documentElement.classList[miniMode.value ? "add" : "remove"](
        "m-clipped"
      );
      store.state.miniMode = !store.state.miniMode;
    };

    const menuToggleMobile = () => (store.state.isAsideMobileExpanded = false);

    return {
      isFormScreen,
      isAsideMobileExpanded,
      isAsideLgActive,
      asideLgClose,
      menuToggleMobileIcon,
      menuToggleMobile,
      toggleMiniMode,
      sidebarWidth,
      miniMode
    };
  }
};
</script>
