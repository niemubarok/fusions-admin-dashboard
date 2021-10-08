<template>
  <div class="container flex my-5 mx-auto px-4 md:px-12 ">
    <div class="flex flex-wrap -mx-1 text-gray-700 w-3/4 ">
      <!-- Column -->
      <div
        class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 cursor-pointer "
        v-for="category of categories"
        :key="category"
      >
        <div
          class="overflow-hidden rounded-lg shadow-lg  transform transition duration-200 hover:scale-110 hover:scale-100"
        >
          <img
            :alt="category.texts.name"
            src="https://picsum.photos/600/400/?food"
            class="block h-auto w-full"
            style="min-height:50px; max-height:100px"
          />
          <div
            class="-z-20 absolute top-0 h-full w-full text-white opacity-0 bg-gray-100 hover:opacity-100 hover:bg-opacity-10 flex items-center justify-center "
          >
            <span
              class="rounded-md bg-primary bg-opacity-50 px-2 pb-1 mb-5 hover:bg-opacity-100"
            >
              enter
            </span>
          </div>

          <header
            class="flex items-center justify-between leading-tight md:p-2 "
          >
            <h1 class="text-lg text-gray-700 font-bold">
              {{ category.texts.name }}
            </h1>
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
export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const userId = route.params.id;
    const categories = computed(() => {
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
    });

    return { categories };
  }
};
</script>
