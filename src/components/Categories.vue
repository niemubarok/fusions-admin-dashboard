<template>
  <!-- modal delete categories -->
  <modal-box v-model="isModalActive" has-cancel has-divider>
    <feather-icon
      path="alert-triangle"
      w="50"
      h="50"
      size="50px"
      class="flex justify-center w-full text-red-400"
    />
    <div class="w-full bg-red-600 bg-opacity-20 h-20 pt-2 rounded-md">
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
    <template #bottom>
      <jb-buttons class="float-right mt-4">
        <jb-button
          @click="isModalActive = false"
          label="Cancel"
          class="bg-gray-300 text-gray-500"
        />
        <jb-button
          @click="deleteCategoryConfirmation"
          color="danger"
          label="Yes"
        />
      </jb-buttons>
    </template>
  </modal-box>

  <!-- categori delete status -->
  <!-- <modal-box v-model="categoryDeleteStatus.modal">
    <div class="flex justify-center">
      <div
        class="relative rounded-full h-20 w-20 bg-green-200 flex justify-center items-center"
      >
        <span
          class="absolute top-8 -mt-2 rounded-full h-8 w-8 animate-ping bg-green-300"
        >
        </span>
        <feather-icon
          path="check"
          size="30px"
          class="text-green-500 animate-bounce"
        >
        </feather-icon>
      </div>
    </div>
    <div
      class="flex flex-no-wrap justify-center text-center bg-green-100 text-green-600 p-3 py-5 rounded-md w-full"
    >
      <span v-if="categoryDeleteStatus.isSuccess"> Successfully deleted</span>
      <span>
        Successfully deleted

        <strong class="ml-1"> category name place holder</strong>
        <strong class="ml-1">{{ categoryNameToDelete }}</strong>
      </span>
    </div>

    <template #bottom>
      <div
        @click="categoryDeleteStatus.notification = false"
        class="float-right mt-4 cursor-pointer text-blue-400"
      >
        <span class="inline-block align-middle">
          <feather-icon path="x"> </feather-icon>
        </span>
        <small class="-ml-2"> close</small>
      </div>
    </template>
  </modal-box> -->

  <!-- category delete status notification -->

  <div
    v-if="!isSkeleton"
    class="container flex my-5 mx-auto px-2 md:px-2 relative"
  >
    <div
      v-if="categoryDeleteStatus.notification"
      class="absolute -top-10 right-4 min-w-min text-xs px-2 py-1 rounded-md"
      :class="[
        categoryDeleteStatus.isSuccess
          ? 'bg-green-100 text-green-500'
          : 'bg-red-100 text-red-500',
      ]"
    >
      <feather-icon path="bell" size="10px"></feather-icon>
      <span v-if="categoryDeleteStatus.isSuccess" class="mr-1">
        <strong>{{ categoryNameToDelete }}</strong>
        has been deleted
      </span>
      <span v-else class="mr-1 -ml-2">
        Failed to delete<strong class="ml-1">{{ categoryNameToDelete }}</strong>
      </span>
    </div>
    <div class="flex flex-wrap justify-start text-gray-700 w-full">
      <!-- empty -->

      <card-component v-if="!categories?.length" empty class="w-full" />
      <!-- Column -->
      <div
        class="my-1 px-1 w-full lg:my-2 md:px-2 md:w-4/12 flex justify-center"
        v-for="(category, index) of categories"
        :key="index"
      >
        <div
          class="overflow-hidden rounded-lg shadow-lg pb-1 w-11/12 min-h-min md:min-w-min transform transition-all duration-500"
        >
          <img
            :alt="category.category_name"
            :src="
              category.image == ''
                ? 'https://picsum.photos/700/400/?food'
                : store.state.base_url_image + category.image
            "
            style="height: 120px"
            class="block w-full"
          />

          <!-- action -->
          <div
            class="flex-col -z-20 absolute top-0 h-60 w-full text-white opacity-0 bg-gray-200 hover:opacity-100 hover:bg-opacity-20 flex items-center justify-center pb-5"
          >
            <div
              class="transform transition duration-200 hover:scale-110 cursor-pointer"
            >
              <span
                @click="
                  $router.push({
                    name: 'category',
                    params: { catId: category.id },
                  })
                "
                class="rounded-md bg-primary px-2 pb-1 mb-5 hover:bg-opacity-100"
              >
                enter
              </span>
            </div>
            <div>
              <small
                @click="
                  deleteButton(category.category_name, category.id, index)
                "
                class="absolute top-1 right-2 rounded-md bg-red-500 bg-opacity-50 hover:bg-opacity-100 cursor-pointer transform transition duration-200 hover:scale-110"
              >
                <feather-icon path="trash" size="14px" class="text-gray-200" />
              </small>
            </div>
          </div>

          <!-- end action -->
          <header
            class="flex items-center justify-between leading-tight p-2 md:p-2"
          >
            <h4 class="text-gray-700 font-bold overflow-ellipsis mr-2">
              {{ category.category_name }}
            </h4>
            <p class="text-gray-500 text-xs flex">
              <span class="mr-1"> {{ category.total_item }}</span>
              <span v-if="category.total_item > 1">items</span>
              <span v-else>item</span>
            </p>
          </header>
          <hr />
          <footer class="flex items-center p-1 pb-1">
            <p class="ml-2 text-sm text-gray-500">
              {{ category.description }}
            </p>
          </footer>
        </div>
        <!-- END Article -->
      </div>
      <!-- END Column -->
    </div>
  </div>

  <!-- skeleton -->

  <card-skeleton v-if="isSkeleton" />
</template>

<script>
import { computed, reactive } from "@vue/reactivity";
import { useStore } from "vuex";
import { onMounted, ref } from "vue";
import CardComponent from "./CardComponent.vue";
import CardSkeleton from "./CardSkeleton.vue";
import FeatherIcon from "./FeatherIcon.vue";
import ModalBox from "./ModalBox.vue";
import { useRoute } from "vue-router";
import JbButtons from "./JbButtons.vue";
import JbButton from "./JbButton.vue";
export default {
  components: {
    CardComponent,
    FeatherIcon,
    ModalBox,
    CardSkeleton,
    JbButtons,
    JbButton,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const userId = computed(() => {
      return route.params.id;
    });
    const categoryNameToDelete = ref("");
    const categoryId = ref("");
    const categoryIndex = ref("");
    const isModalActive = ref(false);
    const isSkeleton = computed({
      get: () => store.state.isSkeleton.category,
    });
    const categories = computed(() => {
      let listCategories = [];

      const filtered = store.state.allCategories.filter((element) => {
        return element.category_name
          .toUpperCase()
          .includes(store.state.searchModel.categories.toUpperCase());
      });

      listCategories.push(filtered);
      return listCategories[0];
    });
    const categoryDeleteStatus = reactive({
      notification: false,
      isSuccess: false,
      message: "",
    });

    const deleteButton = (name, id, index) => {
      categoryNameToDelete.value = name;
      categoryId.value = id;
      categoryIndex.value = index;
      isModalActive.value = true;
    };

    const deleteCategoryConfirmation = () => {
      // store.dispatch("deleteCategory", categoryId.value);
      categories.value?.splice(categoryIndex.value, 1);
      categoryDeleteStatus.isSuccess = true;
      categoryDeleteStatus.notification = true;
      isModalActive.value = false;

      setTimeout(() => {
        categoryDeleteStatus.isSuccess = false;
        categoryDeleteStatus.notification = false;
        categoryDeleteStatus.message = "";
      }, 4000);
    };

    onMounted(async () => {
      // await store.dispatch("fetchUserById", userId.value);
      await store.dispatch("fetchCategories", userId.value);
    });

    return {
      categories,
      categoryNameToDelete,
      deleteCategoryConfirmation,
      isModalActive,
      deleteButton,
      store,
      isSkeleton,
      categoryDeleteStatus,
    };
  },
};
</script>
