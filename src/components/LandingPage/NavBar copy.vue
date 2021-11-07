<template>
  <nav
    class="container sticky top-0 bg-gray-50 flex items-center justify-between flex-wrap  px-6"
  >
    <!-- logo -->
    <div class="flex items-center text-gray-600 md:ml-8 mr-6 -mt-4">
      <logo
        hasText
        class="text-xl text-gray-700 font-bold"
        style="font-size: 29px; font-style: roboto"
      />
      <div
        class="rounded-full bg-primary mt-4 w-1.5 h-1.5 font-extrabold text-xl text-primary animate-pulse"
      ></div>
    </div>

    <!-- btn menu on mobile -->
    <div class="block sm:hidden">
      <button
        @click="humberger"
        class="flex items-center px-3 py-2 border-0 rounded text-teal-200 border-teal-400 hover:text-gray-600 hover:border-gray-500"
      >
        <svg
          class="fill-current h-5 w-5"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path
            v-show="isCollapsedMenu"
            d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
          />

          <line
            v-show="!isCollapsedMenu"
            x1="1"
            y1="20"
            x2="20"
            y2="1"
            stroke="black"
            stroke-width="2"
          />
          <line
            v-show="!isCollapsedMenu"
            x1="1"
            y1="1"
            x2="20"
            y2="20"
            stroke="black"
            stroke-width="2"
          />
        </svg>
      </button>
    </div>

    <!-- navigation -->
    <div
      :class="[isCollapsedMenu ? 'hidden md:visible' : 'md:visible']"
      class="ml-10 md:pt-8 md:flex md:items-center "
    >
      <div
        class="md:flex-grow mb-10  bg-gray-50 md:visible"
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
          class="block md:visible md:inline-block mt-4 md:mt-0 hover:text-primary md:mr-14"
        >
          {{ menuGroup.label }}
        </a>
      </div>
    </div>

    <!-- button -->
    <div class="-mt-4">
      <lp-button isOutline label="Log in" />
      <lp-button label="Sign Up" />
      <!-- </div> -->
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
  }
};
</script>

<style></style>
