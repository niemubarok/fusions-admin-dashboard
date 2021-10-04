<template>
  <div class="flex justify-end items-end ">
    <!-- <div
      class="w-16 grid flex  py-1 px-2 bg-white rounded-full text-pink-700 bg-blue-50 border border-blue-300 border-8"
    > -->
    <!-- <span class="text-xs font-normal place-content-end ">
        Upgrade
      </span> -->

    <jb-button
      label="Upgrade"
      class="w-19 h-5 rounded-full text-xs text-blue-700 bg-blue-50  border-4 border-blue-300"
    />
    <!-- </div> -->
  </div>
  <div class="grid grid-flow-col">
    <div>
      <user-avatar class="w-8 h-8 mx-2" />
    </div>

    <div class="text-xs">
      <span>Bussiness Name</span>
      <span>Bussiness@example.com</span>
    </div>
  </div>
</template>
<script>
import UserAvatar from "@/components/UserAvatar";
import JbButton from "./JbButton.vue";
export default {
  components: {
    UserAvatar,
    JbButton
  },
  setup() {}
};
</script>
