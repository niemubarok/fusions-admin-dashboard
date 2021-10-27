<template>
  <nav
    v-show="isNavBarVisible"
    id="navbar"
    class="flex flex-nowrap justify-center fixed bg-gray-100 rounded-lg h-14 ml-5 -mt-10 mb-10 shadow-lg z-30 w-full transition-all"
  >
    <!-- :class="{ 'ml-60': isAsideMobileExpanded }" -->
    <!-- toggle icon -->
    <nav-bar-item type="flex lg:hidden" @click.prevent="menuToggleMobile">
      <icon :path="menuToggleMobileIcon" size="24" />
    </nav-bar-item>

    <!-- logo -->
    <logo v-if="!store.state.isAsideMobileExpanded" class="mr-4 md:hidden" />
    <!-- search  -->
    <div class="flex w-full border-primary bg-white rounded-xl">
      <span
        class="z-10 absolute border-0 h-10 text-primary font-normal text-center  rounded text-base items-center justify-center pt-4 ml-2"
      >
        <featherIcon path="search" size="25px" />
      </span>
      <!-- search user -->
      <input
        v-if="searchIf.user"
        type="text"
        :placeholder="searchPlaceHolder()"
        v-model="store.state.searchModel.user"
        class="px-2 font-lg w-full border-0 text-gray-600 relative rounded-xl text-sm focus:ring-primary focus:ring-1 pl-10"
      />

      <!-- search categories -->
      <input
        v-if="searchIf.categories"
        type="text"
        :placeholder="searchPlaceHolder()"
        v-model="store.state.searchModel.categories"
        class="px-2 py-2 w-full border-0 bg-white text-gray-600 relative rounded-xl text-sm focus:ring-primary focus:ring-1 pl-10"
      />

      <!-- search items -->
      <input
        v-if="searchIf.items"
        type="text"
        :placeholder="searchPlaceHolder()"
        v-model="store.state.searchModel.items"
        class="px-2 py-2 w-full border-0 bg-white text-gray-600 relative rounded-xl text-sm focus:ring-primary focus:ring-1 pl-10"
      />
    </div>
    <!-- end search -->
  </nav>
</template>

<script>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import {
  mdiForwardburger,
  mdiBackburger,
  mdiClose,
  mdiDotsVertical,
  mdiMenu,
  mdiCogOutline
} from "@mdi/js";
import NavBarItem from "@/components/NavBarItem";
import Icon from "@/components/Icon";
import FeatherIcon from "@/components/FeatherIcon";
import Logo from "@/components/Logo";
import { useRoute } from "vue-router";

export default {
  name: "NavBar",
  components: {
    NavBarItem,
    Icon,
    FeatherIcon,
    Logo
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const isNavBarVisible = computed(() => !store.state.isFormScreen);

    const isAsideMobileExpanded = computed(
      () => store.state.isAsideMobileExpanded
    );

    const userName = computed(() => store.state.userName);

    const menuToggleMobileIcon = computed(() =>
      isAsideMobileExpanded.value ? mdiBackburger : mdiForwardburger
    );

    const menuToggleMobile = () => store.dispatch("asideMobileToggle");

    const isMenuNavBarActive = ref(false);

    const menuNavBarToggleIcon = computed(() =>
      isMenuNavBarActive.value ? mdiClose : mdiDotsVertical
    );

    const menuNavBarToggle = () => {
      isMenuNavBarActive.value = !isMenuNavBarActive.value;
    };

    const menuOpenLg = () => {
      store.dispatch("asideLgToggle", true);
    };

    const searchIf = computed(() => {
      return {
        user: route.path.includes("dashboard"),
        categories: route.path.includes("/profile"),
        items: route.path.includes("/category")
      };
    });

    const searchPlaceHolder = () => {
      if (route.path.includes("dashboard")) {
        return "Search User / Restaurant";
      } else if (route.path.includes("/profile")) {
        return "Search Categories";
      } else if (route.path.includes("/category")) {
        return "Search Items";
      }
    };
    return {
      store,
      isNavBarVisible,
      isAsideMobileExpanded,
      userName,
      menuToggleMobileIcon,
      menuToggleMobile,
      isMenuNavBarActive,
      menuNavBarToggleIcon,
      menuNavBarToggle,
      menuOpenLg,
      mdiMenu,
      mdiCogOutline,
      searchPlaceHolder,
      searchIf
    };
  }
};
</script>
