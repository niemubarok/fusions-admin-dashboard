<template>
  <div class="h-screen">
    <nav-bar />
    <aside-menu :menu="menu" />
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
import { useStore } from "vuex";
import { defineAsyncComponent, onMounted } from "vue";
import menu from "@/menu.js";
const NavBar = defineAsyncComponent(() => import("@/components/NavBar"));
const AsideMenu = defineAsyncComponent(() => import("@/components/AsideMenu"));

export default {
  name: "Home",
  components: {
    AsideMenu,
    NavBar,
  },
  setup() {
    const store = useStore();

    return {
      menu,
    };
  },
};
</script>
