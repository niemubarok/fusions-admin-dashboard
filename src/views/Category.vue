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
      <div class="w-full bg-red-600 bg-opacity-20 h-20 pt-2 rounded-md">
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
      <div class="pt-5 flex justify-center">Are you sure to continue ?</div>
    </modal-box>

    <div class="w-full text-white bg-main-color">
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

              <!-- items -->
              <div class="container flex my-5 mx-auto px-2 md:px-12">
                <div class="flex flex-wrap -mx-1 text-gray-700 w-full">
                  <!-- empty -->
                  <card-component
                    v-if="!itemsPaginated?.length"
                    empty
                    class="w-full"
                  />
                  <div
                    v-for="item in itemsPaginated"
                    :key="item.id"
                    class="my-1 px-1 w-full lg:my-4 lg:px-4 lg:w-1/3 flex justify-center"
                  >
                    <item-card
                      v-if="!isSkeleton"
                      :name="item.name"
                      :price="item.price"
                      :description="item.description"
                    />
                  </div>
                  <card-skeleton v-if="isSkeleton" />
                </div>
              </div>

              <!-- end items  -->
              <!-- <hr />
              <div class="h-15"> -->
              <pagination
                v-if="items?.length >= 1"
                :total-pages="pagesList?.length - 1"
                :total="items?.length"
                :per-page="perPage"
                :current-page="currentPage"
                @pagechanged="showMore"
                :maxVisibleButtons="maxVisibleButton"
                :hasMorePages="false"
              >
              </pagination>
              <div>
                <input type="select" />
              </div>
              <!-- </div> -->
              <!-- another categories -->
              <!-- <div class="container p-5">
                <div class="md:flex no-wrap md:-mx-2 -mt-10">
                  <div class="w-full">
                    <div class="p-1 shadow-sm rounded-sm">
                      <div
                        class="flex items-center space-x-\1 font-semibold text-gray-900 leading-8 mt-1"
                      >
                        <small
                          v-if="anotherCategories?.length"
                          class="tracking-wide mt-2"
                          >Another Categories</small
                        >
                      </div>
                      <div class="container flex">
                        <div class="flex -mx-1 text-gray-700 w-full">
                          <card-component
                            v-if="category === ''"
                            empty
                            class="w-full"
                          />
                          <div
                            v-for="category in anotherCategories"
                            :key="category.id"
                            class="px-1 cursor-pointer flex justify-start"
                          >
                            <a
                              @click="
                                [
                                  $router.push({
                                    name: 'category',
                                    params: { catId: category.id },
                                  }),
                                  store.dispatch(
                                    'filterCategoryById',
                                    category.id
                                  ),
                                ]
                              "
                            >
                              <div
                                class="flex-row rounded-md px-2 bg-gray-500 text-gray-100"
                              >
                                {{ category.name }}
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div> -->
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
import FeatherIcon from "../components/FeatherIcon.vue";
import { useStore } from "vuex";
import {
  onBeforeMount,
  ref,
  computed,
  onUpdated,
  onMounted
} from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import ModalBox from "@/components/ModalBox.vue";
import ItemCard from "../components/ItemCard.vue";
import Pagination from "@/components/Pagination.vue";
import CardSkeleton from "@/components/CardSkeleton.vue";
export default {
  components: {
    MainSection,
    ModalBox,
    CardComponent,
    Pagination,
    // Categories,
    // Invoices,
    FeatherIcon,
    ItemCard,
    CardSkeleton
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
    const anotherCategories = computed(() => {
      return store.state.categories.filter(category => {
        return category.id !== catId.value;
      });
    });

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

    const items = computed(() => category.value?.items);

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
      anotherCategories,
      backButtonAction,
      currentPage,
      numPages,
      itemsPaginated,
      pagesList,
      items,
      perPage,
      showMore,
      maxVisibleButton,
      isSkeleton
    };
  }
};
</script>
