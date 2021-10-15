<template>
  <main-section>
    <modal-box
      v-model="isModalActive"
      button-label="Yes"
      has-cancel
      has-button
      has-divider
    >
      <feather-icon
        path="alert-triangle"
        w="50"
        h="50"
        size="50px"
        class="flex justify-center w-full text-red-400"
      />
      <div class="w-full bg-red-600 bg-opacity-20 h-20 pt-2 rounded-md ">
        <span
          class="flex justify-center w-full text-gray-900 text-center font-lg"
        >
          You are deleting a user with name
        </span>

        <strong
          class="flex justify-center w-full text-gray-900 text-center font-lg mt-3"
        >
          <!-- {{ user.user }} -->
        </strong>
      </div>
      <div class="pt-5 flex justify-center">
        Are you sure to continue ?
      </div>
    </modal-box>

    <div class="w-full text-white bg-main-color">
      <div class="container my-5 p-5">
        <div class="md:flex no-wrap md:-mx-2 ">
          <div class="w-full  h-64">
            <!-- items -->
            <div class="bg-white p-1 shadow-sm rounded-sm">
              <div
                class="flex items-center space-x-1 font-semibold text-gray-900 leading-8 mb-1"
              >
                <span clas="text-green-500">
                  <feather-icon
                    @click="$router.go(-1)"
                    path="chevron-left"
                    size="25px"
                    class="cursor-pointer"
                  />
                </span>
                <span class="pb-3 tracking-wide">{{ category.name }}</span>
              </div>

              <!-- <items /> -->
              <div class="container flex my-5 mx-auto px-2 md:px-12">
                <div class="flex flex-wrap -mx-1 text-gray-700 w-full ">
                  <!-- empty -->
                  <!-- <card-component empty class="w-full" /> -->
                  <div
                    v-for="item in store.state.items"
                    :key="item.id"
                    class="my-1 px-1 w-full  lg:my-4 lg:px-4 lg:w-1/3 cursor-pointer flex justify-center "
                  >
                    <item-card :name="item.name" :price="item.prices[0]"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main-section>
</template>
<script>
import CardComponent from "../components/CardComponent.vue";
import MainSection from "../components/MainSection.vue";
// import Categories from "@/components/Categories";
// import Invoices from "../components/Invoices.vue";
import FeatherIcon from "../components/FeatherIcon.vue";
import { useStore } from "vuex";
import { onBeforeMount, onMounted, ref } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import ModalBox from "@/components/ModalBox.vue";
import ItemCard from "../components/ItemCard.vue";
export default {
  components: {
    MainSection,
    ModalBox,
    //  CardComponent
    // Categories,
    // Invoices,
    FeatherIcon,
    ItemCard
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const catId = route.params.catId;
    const category = ref("");
    const isModalActive = ref(false);

    onBeforeMount(() => {
      store.dispatch("filterCategoryById", catId);
      store.dispatch("fetchItems");
      category.value = store.state.category[0];
    });

    // onMounted(() => {
    //   console.log(store.state.categories[0]);
    // });

    return { store, category, isModalActive };
  }
};
</script>
