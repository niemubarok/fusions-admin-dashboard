<template>
  <div class="flex justify-between mt-10 h-screen">
    <!-- desktop -->
    <div class="p-10 ml-16 text-center md:text-left">
      <p
        style="font-size: 12px; font: Inter; letter: 10%; ling-height: 16px"
        class="text-blue-400 font-extrabold"
      >
        RISK-FREE 7 DAY TRIAL
      </p>
      <p
        style="
          font-size: 72px;
          font: Poppins;
          font-style: normal;
          line-height: 80px;
        "
      >
        World’s easiest contactless menu to use.
      </p>
      <p class="mt-4" style="font-size: 20px">Organize your menu in one app.</p>

      <div class="mt-4">
        <lp-button label="Try it Free" />
      </div>
    </div>
    <div class="-mt-8 hidden md:block">
      <svg-desktop />
    </div>
  </div>
</template>

<script>
import LpButton from "./LpButton.vue";
import SvgDesktop from "./SvgDesktop.vue";
export default {
  components: { SvgDesktop, LpButton },
};
</script>

<style>
</style>