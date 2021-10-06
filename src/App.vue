<template>
  <div class="h-screen">
    <nav-bar />
    <aside-menu :menu="menu" />
    <sidebar />
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
import { useStore } from "vuex";
import menu from "@/menu.js";
import NavBar from "@/components/NavBar";
import AsideMenu from "@/components/AsideMenu";

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
