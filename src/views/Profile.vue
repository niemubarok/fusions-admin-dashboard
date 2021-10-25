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
          You are about to &nbsp;<strong> ban </strong> &nbsp; a user with name
        </span>

        <strong
          class="flex justify-center w-full text-gray-900 text-center font-lg mt-3"
        >
          {{ user.user_name }}
        </strong>
      </div>
      <div class="pt-5 flex justify-center">Are you sure to continue ?</div>
    </modal-box>

    <!-- <div
      @click="$router.go(-1)"
      class="ml-5  -mb-8 pt-2 cursor-pointer text-blue-400"
    >
      <span class="inline-block align-middle">
        <feather-icon path="chevron-left" size="20px"> </feather-icon>
      </span>
      <span class="-ml-2">
        back
      </span>
    </div> -->
    <div class="w-full text-white bg-main-color">
      <div class="container my-5 p-5">
        <div class="md:flex no-wrap md:-mx-2">
          <!-- Left Side -->
          <div class="w-full md:w-4/12 md:mx-2 shadow-lg">
            <!-- Profile Card -->

            <div class="bg-white p-2">
              <back-button
                hasText
                to="dashboard"
                text="Details"
                class="text-gray-800 mb-5"
              />

              <div class="image overflow-hidden">
                <img
                  class="h-auto w-1/2 mx-auto rounded-xl"
                  src="https://placeimg.com/150/150/tech"
                  alt=""
                />
              </div>
              <h1
                class="text-gray-900 text-center font-bold text-xl leading-8 my-1"
              >
                {{ user.business_name }}
              </h1>
              <h2
                class="text-gray-600 font-lg text-center text-semibold leading-6"
              >
                {{ user.user_name }}
              </h2>
              <ul
                class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm"
              >
                <li class="flex items-center py-3">
                  <small>Status</small>
                  <span class="ml-auto"
                    ><span
                      class="py-1 px-2 rounded text-sm"
                      :class="{
                        'bg-green-100 text-green-500 px-4':
                          user.status?.toUpperCase() == 'ACTIVE',
                        'bg-red-100 text-red-500 px-3':
                          user.status?.toUpperCase() == 'BANNED',
                      }"
                      >{{ user.status }}</span
                    ></span
                  >
                </li>
                <li class="flex items-center py-3">
                  <small>Bussiness Type</small>
                  <span class="ml-auto">{{ user.business_type }}</span>
                </li>
                <li class="flex items-center py-3">
                  <small>Subscription</small>
                  <span class="ml-auto">{{ user.subscription_plan }}</span>
                </li>
                <li class="flex items-center py-3">
                  <small>Valid Until</small>
                  <span class="ml-auto">{{ user.valid_until }}</span>
                </li>
                <li class="flex items-center py-3">
                  <small>Phone</small>
                  <span class="ml-auto">{{ user.phone }}</span>
                </li>
                <li class="flex items-center py-3">
                  <small>Country</small>
                  <span class="ml-auto w-1/2 overflow-ellipsis">{{
                    user.country
                  }}</span>
                </li>
              </ul>
              <div
                @click="isModalActive = true"
                class="mt-3 flex justify-end cursor-pointer pb-2"
              >
                <!-- <feather-icon
                  size="15px"
                  class="rounded-md no-border cursor-pointer text-red-400 -mr-1 "
                  path="trash"
                  small
                >
                </feather-icon> -->
                <small
                  v-if="user.status?.toUpperCase() == 'ACTIVE'"
                  class="text-red-50 rounded-md px-2 bg-red-400"
                >
                  Ban User
                </small>
                <small
                  v-else
                  class="text-green-50 bg-green-400 rounded-md px-2"
                >
                  Unban User
                </small>
              </div>
            </div>
            <!-- End of profile card -->
            <div class="my-4"></div>
          </div>
          <!-- Right Side -->
          <div class="w-full h-64">
            <!-- Categories -->
            <div class="bg-white p-1 shadow-sm rounded-sm shadow-lg">
              <div
                class="flex items-center space-x-1 font-semibold text-gray-900 leading-8 mb-1"
              >
                <span clas="text-green-500">
                  <feather-icon path="grid" />
                </span>
                <span class="tracking-wide">All Categories</span>
              </div>

              <categories />
            </div>
            <!-- End of Categories section -->

            <div class="my-4"></div>

            <!-- Invoices -->
            <div class="bg-white p-3 shadow-sm rounded-sm">
              <div class="w-full">
                <div>
                  <div
                    class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3"
                  >
                    <span clas="text-green-500">
                      <svg
                        class="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </span>
                    <span class="tracking-wide">Invoices</span>
                  </div>
                  <div class="w-full">
                    <invoices />
                  </div>
                </div>
              </div>
              <!-- End of invoices -->
            </div>
            <!-- End of profile tab -->
          </div>
        </div>
      </div>
    </div>
  </main-section>
</template>
<script>
import MainSection from "../components/MainSection.vue";
import Categories from "@/components/Categories";
import Invoices from "../components/Invoices.vue";
import FeatherIcon from "../components/FeatherIcon.vue";
import { useStore } from "vuex";
import { onMounted, ref, computed } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import ModalBox from "@/components/ModalBox.vue";
import BackButton from "@/components/BackButton.vue";

export default {
  components: {
    MainSection,
    ModalBox,
    Categories,
    Invoices,
    FeatherIcon,
    BackButton,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const userId = computed({
      get: () => route.params.id,
    });
    const user = ref("");
    const isModalActive = ref(false);

    onMounted(async () => {
      // localStorage.removeItem("allCategories");
      // await store.dispatch("fetchDashboard");
      // await store.dispatch("filterUsersById", userId);
      // await store.dispatch("fetchUserById", userId.value);
      await store.dispatch("fetchCategories", userId.value);

      user.value = store.state.user;
    });

    return { store, user, isModalActive };
  },
};
</script>
