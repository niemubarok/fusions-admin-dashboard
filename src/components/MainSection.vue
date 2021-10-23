<template>
  <section
    class="px-0 py-6 md:px-6 h-screen "
    :class="{ 'flex items-center justify-center': isFormScreen }"
  >
    <slot />
  </section>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "MainSection",
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const isFormScreen = computed(() => store.state.isFormScreen);

    onMounted(async () => {
      if (route.name !== "login" && !localStorage.getItem("token")) {
        console.log("unauthorized");
        router.push({ name: "login" });
      } else if (localStorage.getItem("token")) {
        await store.dispatch("fetchDashboard");
      }
    });

    return {
      isFormScreen
    };
  }
};
</script>
