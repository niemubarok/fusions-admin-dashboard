<template>
  <nav
    v-show="isNavBarVisible"
    id="navbar"
    class=" flex flex-nowrap fixed bg-white rounded-lg mx-2 h-14 ml-5 -mt-10 mb-10 pr-10 shadow-lg z-30 w-4/5 transition-all  "
  >
    <!-- :class="{ 'ml-60': isAsideMobileExpanded }" -->
    <!-- toggle icon -->
    <nav-bar-item type="flex lg:hidden" @click.prevent="menuToggleMobile">
      <icon :path="menuToggleMobileIcon" size="24" />
    </nav-bar-item>
    <nav-bar-item type="hidden lg:flex xl:hidden" @click.prevent="menuOpenLg">
      <icon :path="mdiMenu" size="24" />
    </nav-bar-item>

    <!-- logo -->
    <logo has-text class="w-full ml-3" />

    <!-- search  -->
    <div class="flex w-full border-none py-1 ">
      <span
        class="z-10 absolute border-0 h-10 font-normal text-center text-gray-400 bg-transparent rounded text-base items-center justify-center pl-2 pt-3  "
      >
        <featherIcon path="search" />
      </span>
      <input
        type="text"
        placeholder="Search User / Restaurant...
              "
        v-model="store.state.search"
        class="px-2 py-2 w-full border-1 border-gray-300 text-gray-600 relative bg-white bg-white rounded text-sm focus:ring-gray-300 focus:ring-1  pl-10"
      />
    </div>
  </nav>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import {
  mdiForwardburger,
  mdiBackburger,
  mdiClose,
  mdiDotsVertical,
  mdiMenu,
  mdiClockOutline,
  mdiCloud,
  mdiCrop,
  mdiAccount,
  mdiCogOutline,
  mdiEmail,
  mdiLogout,
  mdiGithub
} from "@mdi/js";
import NavBarItem from "@/components/NavBarItem";
import NavBarItemLabel from "@/components/NavBarItemLabel";
import NavBarMenu from "@/components/NavBarMenu";
import NavBarMenuDivider from "@/components/NavBarMenuDivider";
import UserAvatar from "@/components/UserAvatar";
import Icon from "@/components/Icon";
import FeatherIcon from "@/components/FeatherIcon";
import Logo from "@/components/Logo";

export default {
  name: "NavBar",
  components: {
    // UserAvatar,
    // NavBarMenu,
    NavBarItem,
    // NavBarItemLabel,
    // NavBarMenuDivider,
    Icon,
    FeatherIcon,
    Logo
  },
  setup() {
    const store = useStore();

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
      mdiClockOutline,
      mdiCloud,
      mdiCrop,
      mdiAccount,
      mdiCogOutline,
      mdiEmail,
      mdiLogout,
      mdiGithub
    };
  }
};
</script>
