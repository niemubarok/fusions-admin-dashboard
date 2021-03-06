<template>
  <!-- modal delete item -->
  <modal-box v-model="isModalActive" has-cancel has-divider>
    <feather-icon
      path="alert-triangle"
      w="50"
      h="50"
      size="50px"
      class="flex justify-center w-full text-red-400"
    />
    <div class="w-full bg-red-600 bg-opacity-20 min-h-min py-2 rounded-md">
      <span
        class="flex justify-center w-full text-gray-900 text-center font-lg"
      >
        You are deleting <strong class="ml-1"> {{ itemNameToDelete }}</strong>
      </span>
    </div>
    <div class="pt-5 flex justify-center text-gray-500">
      Are you sure to continue ?
    </div>
    <template #bottom>
      <jb-buttons class="float-right">
        <jb-button
          @click="isModalActive = false"
          label="Cancel"
          class="bg-gray-300 text-gray-500"
        />
        <jb-button @click="deleteItemConfirmation" color="danger" label="Yes" />
      </jb-buttons>
    </template>
  </modal-box>

  <div
    v-if="!isSkeleton"
    class="relative container flex my-5 mx-auto px-2 md:px-2 mb-8"
  >
    <!-- notification -->
    <div
      v-if="itemDeleteStatus.notification"
      class="absolute -top-14 right-4 min-w-min text-xs px-2 rounded-md"
      :class="[
        itemDeleteStatus.isSuccess
          ? 'bg-green-100 text-green-500'
          : 'bg-red-100 text-red-500'
      ]"
    >
      <feather-icon path="bell" size="10px"></feather-icon>
      <span v-if="itemDeleteStatus.isSuccess" class="mr-1">
        <strong>{{ itemNameToDelete }}</strong>
        has been deleted
      </span>
      <span v-else class="mr-1 -ml-2">
        Failed to delete<strong class="ml-1">{{ itemNameToDelete }}</strong>
      </span>
    </div>

    <!-- end notification -->

    <div class="flex flex-wrap justify-start text-gray-700 w-full">
      <!-- empty -->

      <card-component v-if="!itemsPaginated?.length" empty class="w-full" />
      <!-- Column -->
      <div
        class="my-1 px-1 w-full lg:my-2 md:px-2 md:w-3/12 flex justify-center relative"
        v-for="(item, index) of itemsPaginated"
        :key="index"
      >
        <div
          class="overflow-hidden rounded-lg shadow-lg pb-1 w-11/12 min-h-min md:min-w-min transform transition-all duration-500"
        >
          <img
            :alt="item.name"
            :src="
              item.image == ''
                ? 'https://picsum.photos/700/400/?food'
                : store.state.base_url_image + item.image
            "
            style="height: 120px"
            class="block w-full"
          />

          <!-- action -->
          <div
            class="-z-20 absolute top-0 h-60 w-full text-white opacity-0 bg-gray-200 hover:opacity-100 hover:bg-opacity-20"
          >
            <div
              class="absolute top-0 right-0 transform transition scale-110 duration-200 hover:scale-120 cursor-pointer"
            >
              <div>
                <small
                  @click="deleteButtonAction(item.name, item.id, index)"
                  class="py-1 bg-red-500 bg-opacity-80 hover:bg-opacity-100 cursor-pointer transform transition duration-400 hover:scale-150 hover:p-2"
                  style="border-bottom-left-radius: 10px"
                >
                  <feather-icon
                    path="trash"
                    size="14px"
                    class="text-gray-200"
                  />
                </small>
              </div>
            </div>
          </div>

          <!-- end action -->
          <header
            class="flex items-center justify-between leading-tight p-2 md:p-2"
          >
            <h4 class="text-gray-700 font-bold overflow-ellipsis mr-2">
              {{ item.name }}
            </h4>
            <p class="text-gray-500 text-xs flex">
              <span class="mr-1">usd</span>
              <span> {{ item.price }}</span>
            </p>
          </header>
          <hr />
          <footer class="flex items-center p-1 pb-1">
            <p class="ml-2 text-sm text-gray-500">
              {{ item.description }}
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

  <hr />
  <div v-if="items?.length >= 1" class="flex justify-between px-4 pb-4 mt-2">
    <div class="text-left flex items-center justify-start">
      <span class="mr-2 text-gray-500">Show</span>
      <select
        v-model="perPage"
        class="border-1 rounded-md border-gray-300 text-xs h-9"
      >
        <option
          v-for="number of 10"
          :key="number"
          :value="number"
          class="text-gray-500"
        >
          {{ number }}
        </option>
      </select>
      <span class="ml-2 text-gray-500">per page</span>
    </div>
    <div>
      <pagination
        :total-pages="pagesList?.length - 1"
        :total="items?.length"
        :per-page="perPage"
        :current-page="currentPage"
        @pagechanged="showMore"
        :maxVisibleButtons="maxVisibleButton"
        :hasMorePages="false"
      >
      </pagination>
    </div>
  </div>
</template>

<script>
import CardComponent from "../components/CardComponent.vue";
import MainSection from "../components/MainSection.vue";
import FeatherIcon from "../components/FeatherIcon.vue";
import { useStore } from "vuex";
import {
  onBeforeMount,
  ref,
  computed,
  onUpdated,
  onMounted,
  reactive
} from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import ModalBox from "@/components/ModalBox.vue";
import ItemCard from "../components/ItemCard.vue";
import Pagination from "@/components/Pagination.vue";
import CardSkeleton from "@/components/CardSkeleton.vue";
import JbButtons from "./JbButtons.vue";
import JbButton from "./JbButton.vue";
export default {
  components: {
    ModalBox,
    CardComponent,
    Pagination,
    FeatherIcon,
    CardSkeleton,
    JbButton,
    JbButtons
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const catId = computed({
      get: () => route.params.catId
    });
    const isSkeleton = computed({
      get: () => store.state.isSkeleton.items
    });
    const category = computed(() => store.state.category[0]);
    const isModalActive = ref(false);

    // items
    const itemId = ref("");
    const itemIndex = ref("");

    const items = computed(() => category.value?.items);
    const itemNameToDelete = ref("");
    const itemDeleteStatus = reactive({
      notification: false,
      isSuccess: false,
      message: ""
    });

    const deleteButtonAction = (name, id, index) => {
      itemNameToDelete.value = name;
      itemId.value = id;
      itemIndex.value = index;
      isModalActive.value = true;
    };

    const deleteItemConfirmation = async () => {
      await store.dispatch("deleteItem", itemId.value);

      if (store.state.isDeleted.item) {
        items.value?.splice(itemIndex.value, 1);
        itemDeleteStatus.isSuccess = true;
        itemDeleteStatus.notification = true;
        isModalActive.value = false;
      } else {
        itemDeleteStatus.isSuccess = false;
        itemDeleteStatus.notification = true;
        isModalActive.value = false;
      }

      setTimeout(() => {
        itemDeleteStatus.isSuccess = false;
        itemDeleteStatus.notification = false;
        itemDeleteStatus.message = "";
      }, 4000);
    };

    const selectedUserId = sessionStorage.getItem("selectedUserId");
    const backButtonAction = () => {
      if (selectedUserId) {
        router.push({
          name: "profile",
          params: { id: selectedUserId }
        });
      } else {
        router.go(-1);
      }
    };
    // const anotherCategories = computed(() => {
    //   return store.state.categories.filter((category) => {
    //     return category.id !== catId.value;
    //   });
    // });

    //pagination
    const perPage = ref(6);
    const currentPage = ref(0);
    const maxVisibleButton = ref(2);
    const itemsPaginated = computed(() => {
      if (items.value?.length <= perPage.value) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        maxVisibleButton.value = 1;
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        currentPage.value = 0;
        return items.value;
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      maxVisibleButton.value = 2;

      return items.value?.slice(
        perPage.value * currentPage.value,
        perPage.value * (currentPage.value + 1)
      );
    });
    const numPages = computed(() =>
      Math.ceil(items.value?.length / perPage.value)
    );

    const pagesList = computed(() => {
      const pagesList = [];

      for (let i = 0; i < numPages.value; i++) {
        pagesList.push(i);
      }

      return pagesList;
    });

    const showMore = p => {
      // page.value = p;
      currentPage.value = p;
    };

    onMounted(async () => {
      await store.dispatch(
        "fetchCategories",
        sessionStorage.getItem("selectedUserId")
      );
      await store.dispatch("filterCategoryById", catId.value);
    });

    return {
      store,
      category,
      isModalActive,
      //   anotherCategories,
      backButtonAction,
      currentPage,
      numPages,
      itemsPaginated,
      pagesList,
      items,
      perPage,
      showMore,
      maxVisibleButton,
      isSkeleton,
      itemDeleteStatus,
      deleteItemConfirmation,
      deleteButtonAction,
      itemNameToDelete
    };
  }
};
</script>
