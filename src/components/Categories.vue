<template>
  <div class="container flex my-5 mx-auto px-2 md:px-12">
    <div class="flex flex-wrap -mx-1 text-gray-700 w-full ">
      <!-- empty -->

      <card-component v-if="!categories.length" empty class="w-full" />
      <!-- Column -->
      <div
        class="my-1 px-1 w-full  lg:my-4 lg:px-4 lg:w-1/3 cursor-pointer flex justify-center "
        v-for="category of categories"
        :key="category"
      >
        <div
          class="overflow-hidden rounded-lg shadow-lg h-60 transform transition duration-200 hover:z-20 hover:scale-110 w-11/12 "
        >
          <img
            :alt="category.texts.name"
            src="https://picsum.photos/700/400/?food"
            style="min-height:60px; max-height:100px"
            class="block w-full"
          />

          <!-- action -->
          <div
            class="-z-20 absolute top-0 h-full w-full text-white opacity-0 bg-gray-100 hover:opacity-100 hover:bg-opacity-10 flex items-center justify-center pb-5 "
          >
            <span
              class="rounded-md bg-primary bg-opacity-50 px-2 pb-1 mb-5 hover:bg-opacity-100"
            >
              enter
            </span>
          </div>

          <!-- end action -->
          <header
            class="flex items-center justify-between leading-tight p-2 md:p-2 "
          >
            <h3 class="text-gray-700 font-bold">
              {{ category.texts.name }}
            </h3>
            <p class="text-gray-500 text-sm">
              10 items
            </p>
          </header>
          <hr />
          <footer class="flex items-center justify-between leading-none md:p-2">
            <p class="ml-2 text-sm text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </p>
          </footer>
        </div>
        <!-- END Article -->
      </div>
      <!-- END Column -->
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import CardComponent from "./CardComponent.vue";
export default {
  components: {
    CardComponent
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const userId = route.params.id;
    const categories = computed(() => {
      if (store.state.clients.length) {
        let listCategories = [];

        const unfilteredCategories = store.state.clients.filter(filtered => {
          return filtered.id == userId;
        })[0].categories;

        const filtered = unfilteredCategories.filter(element => {
          return element.texts.name
            .toUpperCase()
            .includes(store.state.searchModel.categories.toUpperCase());
        });

        listCategories.push(filtered);
        return listCategories[0];
      }
    });

    return { categories };
  }
};
</script>
