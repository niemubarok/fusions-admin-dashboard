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
import { useRouter, useRoute } from "vue-router";
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

    store.commit("user", {
      name: "Admin",
      email: "Admin@cloudmenu.com",
      avatar: "https://avatars.dicebear.com/v2/gridy/John-Doe.svg"
    });

    return {
      menu
    };
  }
};
</script>
