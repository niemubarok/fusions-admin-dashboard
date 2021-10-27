<template>
  <div class="h-screen" :class="[miniMode ? '-ml-44' : '']">
    <nav-bar />
    <aside-menu :menu="menu" />
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
import { useStore } from "vuex";
import { computed, defineAsyncComponent, onMounted } from "vue";
import menu from "@/menu.js";
const NavBar = defineAsyncComponent(() => import("@/components/NavBar"));
const AsideMenu = defineAsyncComponent(() => import("@/components/AsideMenu"));

export default {
  name: "Home",
  components: {
    AsideMenu,
    NavBar
  },
  setup() {
    const store = useStore();
    const miniMode = computed({ get: () => store.state.miniMode });

    return {
      miniMode,
      menu
    };
  }
};
</script>
