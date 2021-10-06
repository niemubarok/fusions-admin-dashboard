<template>
  <div
    class="bg-white float-left fixed top-0 left-0 bottom-0 p-2 z-20 flex flex-col transition duration-150"
    :style="{ width: sidebarWidth }"
  >
    <span class="collapse-icon" @click="toggleCollapsed">
      <feather-icon path="align-justify"></feather-icon>
      collapse
      {{ sidebarWidth }}
    </span>
  </div>
</template>

<script>
import FeatherIcon from "../FeatherIcon.vue";
import { collapsed, toggleCollapsed, sidebarWidth } from "./state";

export default {
  components: { FeatherIcon },
  setup() {
    return {
      sidebarWidth,
      collapsed,
      toggleCollapsed
    };
  }
};
</script>

<style>
:root {
  --sidebar-bg-color: #ffffff;
  --sidebar-item-hover: #007acc;
  --sidebar-item-active: #24acf2;
}
</style>

<style scoped>
.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);
}
</style>
