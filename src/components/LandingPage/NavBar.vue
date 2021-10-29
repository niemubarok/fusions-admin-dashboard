<template>
  <nav
    class="sticky top-0 bg-gray-50 flex items-center justify-between flex-wrap bg-teal-500 p-6"
  >
    <div class="flex items-center flex-shrink-0 text-gray-600 ml-8 mr-6">
      <logo
        hasText
        class="text-xl text-gray-700 font-bold"
        style="font-size: 29px; font-style: roboto"
      />
      <div
        class="rounded-full bg-primary mt-4 w-1.5 h-1.5 font-extrabold text-xl text-primary animate-pulse"
      ></div>
    </div>
    <div class="block lg:hidden">
      <button
        @click="humberger"
        class="flex items-center px-3 py-2 border-0 rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
      >
        <svg
          class="fill-current h-5 w-5"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </div>
    <div
      :class="[isCollapsedMenu ? 'hidden md:visible' : 'md:visible']"
      class="w-full mt-4 ml-10 block flex-grow lg:flex lg:items-center lg:w-auto"
    >
      <div
        class="lg:flex-grow h-4/5 mb-10 bg-gray-50 md:visible"
        style="
          font-size: 16px;
          font-family: Inter;
          font-style: normal;
          line-height: 24px;
          font-weight: 600;
        "
      >
        <a
          v-for="menuGroup in menu"
          :key="menuGroup"
          href="#responsive-header"
          class="block md:visible md:inline-block mt-4 md:mt-0 text-teal-200 hover:text-white md:mr-14"
        >
          {{ menuGroup.label }}
        </a>
      </div>
      <div :class="[isCollapsedmenu ? 'absolute bottom-2 md:relative' : '']">
        <lp-button isOutline label="Log in" />
        <lp-button label="Sign Up" />
      </div>
    </div>
  </nav>
</template>

<script>
import Logo from "@/components/Logo.vue";
import menu from "./menu.js";
import LpButton from "./LpButton.vue";
import { ref } from "vue";

export default {
  components: { Logo, LpButton },

  setup() {
    const isCollapsedMenu = ref(false);
    const humberger = () => {
      isCollapsedMenu.value = !isCollapsedMenu.value;
    };
    return { menu, isCollapsedMenu, humberger };
  },
};
</script>

<style>
</style>