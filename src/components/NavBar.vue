<template>
  <nav
    id="navbar"
    v-show="isNavBarVisible"
    class=" flex bg-white rounded-lg mx-2 h-14 -mt-7 mb-5 pr-10 shadow-lg z-30 w-full transition-all  "
    :class="{ 'ml-60': isAsideMobileExpanded }"
  >
    <!-- <div class="flex h-14"> -->
    <!-- toggle icon -->
    <nav-bar-item type="flex lg:hidden" @click.prevent="menuToggleMobile">
      <icon :path="menuToggleMobileIcon" size="24" />
    </nav-bar-item>
    <nav-bar-item type="hidden lg:flex xl:hidden" @click.prevent="menuOpenLg">
      <icon :path="mdiMenu" size="24" />
    </nav-bar-item>
    <!-- <nav-bar-item class="w-full"> -->
    <!-- logo -->
    <logo has-text class="w-full ml-3" />
    <!-- search  -->
    <!-- <div class="border-none flex justify-center w-full"> -->
    <div class="flex w-4/5 border-none py-2 mr-5">
      <span
        class="z-10 absolute border-0 h-10 font-normal text-center text-gray-400 bg-transparent rounded text-base items-center justify-center pl-2 pt-2 "
      >
        <featherIcon path="search" />
      </span>
      <input
        type="text"
        placeholder="Search User / Restaurant...
              "
        v-model="store.state.search"
        class="px-2 py-1 w-full border-1 border-gray-300 text-gray-600 relative bg-white bg-white rounded text-sm focus:ring-gray-300 focus:ring-1  pl-10"
      />
    </div>
    <!-- </div> -->
    <!-- </nav-bar-item> -->
    <!-- </div> -->
    <!-- <div class="flex-none items-stretch flex h-14 lg:hidden">
      <nav-bar-item class="items-center flex" @click.prevent="menuNavBarToggle">
        <icon :path="menuNavBarToggleIcon" size="24" />
      </nav-bar-item>
    </div>
    <div
      class="absolute w-screen top-14 left-0 bg-white border-b border-gray-100 shadow
        lg:w-auto lg:items-stretch lg:flex lg:flex-grow lg:static lg:border-b-0 lg:overflow-visible lg:shadow-none"
      :class="{ hidden: !isMenuNavBarActive, block: isMenuNavBarActive }"
    > -->
    <!-- <div
        class="max-h-screen-menu overflow-y-auto lg:overflow-visible lg:flex lg:items-stretch lg:justify-end lg:ml-auto"
      > -->
    <!-- <nav-bar-menu has-divider>
          <nav-bar-item-label :icon="mdiMenu" label="Sample menu"/>

          <template #dropdown>
            <nav-bar-item>
              <nav-bar-item-label :icon="mdiClockOutline" label="Item One"/>
            </nav-bar-item>
            <nav-bar-item>
              <nav-bar-item-label :icon="mdiCloud" label="Item Two"/>
            </nav-bar-item>
            <nav-bar-menu-divider/>
            <nav-bar-item>
              <nav-bar-item-label :icon="mdiCrop" label="Item Last"/>
            </nav-bar-item>
          </template>
        </nav-bar-menu> -->
    <!-- <nav-bar-menu has-divider> -->
    <!-- <user-avatar class="w-6 h-6 mr-3 inline-flex" /> -->
    <!-- <div>
            <span>{{ userName }}</span>
          </div> -->

    <!-- <template #dropdown> -->
    <!-- <nav-bar-item to="/profile">
              <nav-bar-item-label :icon="mdiAccount" label="My Profile" />
            </nav-bar-item> -->
    <!-- <nav-bar-item>
              <nav-bar-item-label :icon="mdiCogOutline" label="Settings" />
            </nav-bar-item> -->
    <!-- <nav-bar-item>
              <nav-bar-item-label :icon="mdiEmail" label="Messages" />
            </nav-bar-item> -->
    <!-- <nav-bar-item>
              <nav-bar-item-label :icon="mdiLogout" label="Log Out" />
            </nav-bar-item> -->
    <!-- <nav-bar-menu-divider /> -->
    <!-- </template> -->
    <!-- </nav-bar-menu> -->
    <!-- <nav-bar-item is-desktop-icon-only>
          <router-link to="/">
            <nav-bar-item-label
              :icon="mdiLogout"
              label="Log out"
              is-desktop-icon-only
            />
          </router-link>
        </nav-bar-item> -->
    <!-- </div> -->
    <!-- </div> -->
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
