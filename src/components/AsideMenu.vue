<template>
  <aside
    v-show="!isFormScreen"
    class="
      w-60
      top-0
      z-40
      h-screen
      transition-position
      lg:left-0
      overflow-y-scroll
      scrollbar-thin scrollbar-thumb-white scrollbar-track-gray-200
      hover:scrollbar-thumb-blue-900
      bg-white
      py-3
      flow-root
      flex
      fixed
    "
    :class="[
      isAsideMobileExpanded ? 'left-0' : '-left-60',
      isAsideLgActive ? 'block' : 'md:flex lg:block xl:flex'
    ]"
  >
    <div>
      <template v-for="(menuGroup, index) in menu">
        <p
          v-if="typeof menuGroup === 'string'"
          :key="`a-${index}`"
          class="p-3 text-xs uppercase text-gray-600"
        >
          {{ menuGroup }}
        </p>
        <aside-menu-list
          v-else
          :key="`b-${index}`"
          :menu="menuGroup"
          @menu-click="menuClick"
        />
        <!-- style="background-color:#F8F8F8" -->
      </template>
      <!-- <div>
        <divider />

        <bussiness-detail />
      </div> -->
    </div>
  </aside>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import AsideMenuList from "@/components/AsideMenuList";

export default {
  name: "AsideMenu",
  components: {
    AsideMenuList
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

    const menuClick = (event, item) => {
      //
    };

    return {
      isFormScreen,
      isAsideMobileExpanded,
      isAsideLgActive,
      asideLgClose,
      menuClick
    };
  }
};
</script>
