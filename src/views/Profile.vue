<template>
  <main-section>
    <modal-box v-model="isModalActive" has-divider>
      <feather-icon
        path="alert-triangle"
        w="50"
        h="50"
        size="50px"
        class="flex justify-center w-full text-red-400"
      />
      <div class="w-full bg-red-600 bg-opacity-20 h-20 pt-2 rounded-md">
        <span
          v-if="userStatus?.toUpperCase() == 'ACTIVE'"
          class="flex justify-center w-full text-gray-900 text-center font-lg"
        >
          You are about to &nbsp;<strong> ban </strong> &nbsp; a user with name
        </span>
        <span
          v-if="userStatus?.toUpperCase() == 'BANNED'"
          class="flex justify-center w-full text-gray-900 text-center font-lg"
        >
          You are about to &nbsp;<strong> unban </strong> &nbsp; a user with
          name
        </span>

        <strong
          class="flex justify-center w-full text-gray-900 text-center font-lg mt-3"
        >
          {{ user.user_name }}
        </strong>
      </div>
      <div class="pt-5 flex justify-center">Are you sure to continue ?</div>
      <template #bottom>
        <jb-buttons class="float-right mt-10">
          <jb-button
            @click="isModalActive = false"
            label="Cancel"
            class="bg-gray-300"
          />
          <jb-button @click="changeUserStatus" color="danger" label="Yes" />
        </jb-buttons>
      </template>
    </modal-box>
    <div class="w-full text-white bg-main-color">
      <div class="container my-5 p-5">
        <div class="md:flex no-wrap md:-mx-2">
          <!-- Left Side -->
          <div class="w-full md:w-4/12 md:mx-2 shadow-lg">
            <!-- Profile Card -->

            <div class="bg-white px-2 py-2">
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
              <div
                v-if="hasMessage"
                class="px-3 rounded-md w-full text-center my-2"
                :class="messageColor"
              >
                <small> {{ messageUserStatusChange }}</small>
              </div>
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
                          userStatus?.toUpperCase() == 'ACTIVE',
                        'bg-red-100 text-red-500 px-3':
                          userStatus?.toUpperCase() == 'BANNED',
                      }"
                      >{{ userStatus }}</span
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
                class="mb-5 mt-3 flex justify-center cursor-pointer pb-2 text-red-50 rounded-md px-3 shadow shadow-lg py-1 bg-red-400 w-2/4 float-right"
              >
                <feather-icon
                  size="15px"
                  class="rounded-md no-border cursor-pointer text-gray-50 space-x-2"
                  path="user-x"
                  small
                >
                </feather-icon>
                <small v-if="userStatus?.toUpperCase() == 'ACTIVE'">
                  <!-- class="text-red-50 rounded-md px-3 shadow shadow-lg py-1 bg-red-400" -->
                  Ban User
                </small>
                <small v-else-if="userStatus?.toUpperCase() == 'BANNED'">
                  <!-- class="text-green-50 bg-green-400 rounded-md p-2" -->
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
            <div class="bg-white px-3 pt-1 pb-3 shadow-sm rounded-sm shadow-lg">
              <div
                class="flex items-center space-x-1 font-semibold text-gray-900 leading-8 mb-2"
              >
                <span clas="text-green-500">
                  <feather-icon path="grid" />
                </span>
                <span class="tracking-wide mb-1">All Categories</span>
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
import JbButtons from "../components/JbButtons.vue";
import JbButton from "../components/JbButton.vue";

export default {
  components: {
    MainSection,
    ModalBox,
    Categories,
    Invoices,
    FeatherIcon,
    BackButton,
    JbButtons,
    JbButton,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const userId = computed({
      get: () => route.params.id,
    });
    const user = ref("");
    const userStatus = ref("");
    const isModalActive = ref(false);
    const hasMessage = ref(false);
    const messageColor = ref("");
    const messageUserStatusChange = ref("");
    const isSuccessChangeUserStatus = ref("");

    const changeUserStatus = async () => {
      await store.dispatch("changeUserStatus", userId.value);
      isSuccessChangeUserStatus.value = store.state.isSuccessChangeUserStatus;
      isModalActive.value = false;
      hasMessage.value = true;

      console.log(isSuccessChangeUserStatus.value);
      console.log(userStatus.value);
      if (isSuccessChangeUserStatus.value) {
        messageColor.value = "bg-green-100 text-green-400 ";
        messageUserStatusChange.value = "User status changed ";
        userStatus.value =
          userStatus.value?.toUpperCase() == "ACTIVE" ? "BANNED" : "ACTIVE";
        setTimeout(() => {
          hasMessage.value = false;
        }, 5000);
        store.commit("basic", {
          key: "isSuccessChangeUserStatus",
          value: false,
        });
      } else {
        // isModalActive.value = false;
        // hasMessage.value = true;
        messageColor.value = "bg-red-100 text-red-400 ";
        messageUserStatusChange.value = "Sorry there is an error";

        setTimeout(() => {
          hasMessage.value = false;
        }, 5000);
      }
    };

    onMounted(async () => {
      await store.dispatch("fetchUserById", userId.value);
      await store.dispatch("fetchCategories", userId.value);

      user.value = store.state.user;
      userStatus.value = store.state.user.status;
    });

    return {
      store,
      user,
      isModalActive,
      messageUserStatusChange,
      hasMessage,
      messageColor,
      changeUserStatus,
      userStatus,
    };
  },
};
</script>
