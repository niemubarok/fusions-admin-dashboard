<template>
  <main-section>
    <div class="w-full bg-main-color mb-14">
      <div class="container my-5 p-5">
        <div class="md:flex no-wrap md:-mx-2">
          <div class="w-full h-64">
            <div class="bg-white p-1 shadow-lg rounded-md">
              <div
                class="flex items-center space-x-1 font-semibold text-gray-900 leading-8 mt-2"
              >
                <span clas="text-green-500">
                  <feather-icon
                    @click="backButtonAction"
                    path="chevron-left"
                    size="25px"
                    class="cursor-pointer"
                  />
                </span>
                <span class="pb-3 tracking-wide">{{ category?.name }}</span>
              </div>
              <hr />
              <items />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main-section>
</template>

<script>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import FeatherIcon from "../components/FeatherIcon.vue";
import Items from "../components/Items.vue";
import MainSection from "../components/MainSection.vue";
export default {
  components: { Items, MainSection, FeatherIcon },
  setup() {
    const router = useRouter();
    const store = useStore();
    const category = computed(() => store.state.category[0]);
    const selectedUserId = sessionStorage.getItem("selectedUserId");
    const backButtonAction = () => {
      if (selectedUserId) {
        router.push({
          name: "profile",
          params: { id: selectedUserId },
        });
      } else {
        router.go(-1);
      }
    };

    return {
      category,
      backButtonAction,
    };
  },
};
</script>
    