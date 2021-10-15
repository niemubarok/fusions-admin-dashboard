<template>
  <!-- modal delete categories -->
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
        You are deleting a category and all items inside
      </span>

      <strong
        class="flex justify-center w-full text-gray-900 text-center font-lg mt-3"
      >
        {{ categoryNameToDelete }}
      </strong>
    </div>
    <div class="pt-5 flex justify-center text-gray-500">
      Are you sure to continue ?
    </div>
  </modal-box>

  <div class="container flex my-5 mx-auto px-2 md:px-12">
    <div class="flex flex-wrap -mx-1 text-gray-700 w-full ">
      <!-- empty -->

      <card-component v-if="!categories.length" empty class="w-full" />
      <!-- Column -->
      <div
        class="my-1 px-1 w-full  lg:my-2 md:px-3 lg:w-2/6 cursor-pointer flex justify-center "
        v-for="category of categories"
        :key="category"
      >
        <div
          class="overflow-hidden rounded-lg shadow-lg h-60 w-11/12 transform transition duration-200 
            "
        >
          <!-- hover:scale-105 -->
          <img
            :alt="category.texts.name"
            src="https://picsum.photos/700/400/?food"
            style="height:150px"
            class="block w-full"
          />

          <!-- action -->
          <div
            class="flex-col -z-20 absolute top-0 h-full w-full text-white opacity-0 bg-gray-200 hover:opacity-100 hover:bg-opacity-20 flex items-center justify-center pb-5 "
          >
            <div>
              <span
                @click="
                  $router.push({
                    name: 'category',
                    params: { catId: category.id }
                  })
                "
                class="rounded-md bg-primary  px-2 pb-1 mb-5 hover:bg-opacity-100"
              >
                enter
              </span>
            </div>
            <div>
              <small
                @click="deleteButton(category.texts.name)"
                class="absolute top-1 right-2 rounded-md bg-red-500 bg-opacity-50  hover:bg-opacity-100"
              >
                <feather-icon path="trash" class="text-gray-200" />
              </small>
            </div>
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
import { ref } from "vue";
import CardComponent from "./CardComponent.vue";
import FeatherIcon from "./FeatherIcon.vue";
import ModalBox from "./ModalBox.vue";
export default {
  components: {
    CardComponent,
    FeatherIcon,
    ModalBox
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const userId = route.params.id;
    const categoryNameToDelete = ref("");
    const isModalActive = ref(false);
    const categories = computed(() => {
      if (store.state.users.length) {
        let listCategories = [];

        const unfilteredCategories = store.state.users.filter(filtered => {
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

    const deleteButton = name => {
      console.log(name);
      categoryNameToDelete.value = name;
      isModalActive.value = true;
    };

    return { categories, categoryNameToDelete, isModalActive, deleteButton };
  }
};
</script>
