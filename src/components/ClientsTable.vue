<template>
  <modal-box v-model="isModalActive" title="Please confirm action" has-cancel>
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </modal-box>

  <!-- invoices modal -->
  <modal-box
    v-model="invoiceModal"
    title="Invoice Details"
    has-cancel
  ></modal-box>

  <!-- <div v-if="checkedRows.length" class="bg-gray-50 p-3">
    <span
      v-for="checkedRow in checkedRows"
      :key="checkedRow.id"
      class="inline-block bg-gray-100 px-2 py-1 rounded-sm mr-2 text-sm"
      >{{ checkedRow.name }}</span
    >
  </div> -->

  <div v-if="filterUsers().length == 0">
    <card-component empty />
  </div>

  <table v-if="filterUsers().length !== 0" class="md:pa-md text-gray-700">
    <thead>
      <tr>
        <!-- <th v-if="checkable" class="text-center">
          <input
            type="checkbox"
            @click="selectAll()"
            v-model="allSelected"
            class="rounded"
          />
        </th> -->
        <th class="text-center">Logo</th>
        <th class="text-center">User</th>
        <th class="text-center">Restaurant</th>
        <th class="text-center">Bussiness Type</th>
        <th class="text-center">Country</th>
        <th class="text-center">Subscription</th>
        <th class="text-center">status</th>
        <!-- <th class="text-center">Invoices</th> -->
        <th class="text-center">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in itemsPaginated" :key="user.id" class="text-center">
        <td>
          <div class="flex justify-center">
            <img :src="user.logo" class="w-14 rounded-full " />
          </div>
        </td>
        <td class="text-center" data-label="User">{{ user.user }}</td>
        <td class="text-center" data-label="Restaurant">
          {{ user.restaurant }}
        </td>
        <td class="text-center" data-label="Phone">
          {{ user.bussiness_type }}
        </td>
        <td class="text-center" data-label="Country">
          {{ user.country }}
        </td>
        <td class="text-center" data-label="Subscription">
          <span class="text-gray-500" :title="user.subscription">{{
            user.subscription
          }}</span>
        </td>
        <td class="text-center" data-label="Status">
          <small
            class="rounded-md py-1"
            :class="{
              'bg-green-100 text-green-500 px-4':
                user.status.toUpperCase() == 'ACTIVE',
              'bg-red-100 text-red-500 px-3':
                user.status.toUpperCase() == 'BANNED'
            }"
            :title="user.status"
            >{{ user.status }}</small
          >
        </td>
        <!-- <td class="text-center" data-label="Invoices">
          <jb-buttons type="justify-start lg:justify-center" no-wrap>
            <span title="click to see invoice's detail">
              <feather-icon
                size="15px"
                class="rounded-md no-border cursor-pointer text-gray-500"
                path="paperclip"
                small
                @click="invoiceModal = true"
              >
              </feather-icon>
            </span>
          </jb-buttons>
        </td> -->
        <td class="text-center">
          <jb-buttons type="justify-start lg:justify-center" no-wrap>
            <span title="User detail">
              <feather-icon
                size="15px"
                class="rounded-md no-border cursor-pointer text-green-500"
                path="eye"
                small
                @click="actionHandler(user.id)"
              >
              </feather-icon>
            </span>
            <!-- <span title="Ban User">
              <feather-icon
                size="15px"
                class="rounded-md no-border cursor-pointer ml-2 text-red-600"
                path="user-x"
                small
                @click="invoiceModal = true"
              >
              </feather-icon>
            </span> -->
            <!-- <span title="Delete User">
              <feather-icon
                size="15px"
                class="rounded-md no-border cursor-pointer text-red-600 ml-1"
                path="trash"
                small
                @click="invoiceModal = true"
              >
              </feather-icon>
            </span> -->
          </jb-buttons>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="table-pagination align-middle">
    <pagination
      :total-pages="pagesList.length - 1"
      :total="filterUsers().length"
      :per-page="perPage"
      :current-page="currentPage"
      @pagechanged="showMore"
      :maxVisibleButtons="maxVisibleButton"
      :hasMorePages="false"
    >
    </pagination>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import ModalBox from "@/components/ModalBox";
import JbButtons from "@/components/JbButtons";
import FeatherIcon from "./FeatherIcon.vue";
import CardComponent from "./CardComponent";
import Pagination from "./Pagination.vue";
import { useRouter } from "vue-router";

export default {
  name: "UsersTable",
  components: {
    ModalBox,
    JbButtons,
    CardComponent,
    FeatherIcon,
    ModalBox,
    Pagination
  },
  props: {
    checkable: Boolean
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const isModalActive = ref(false);
    const invoiceModal = ref(false);

    const perPage = ref(5);

    const currentPage = ref(0);

    const maxVisibleButton = ref(2);
    const actionHandler = userId => {
      router.push({ name: "profile", params: { id: userId } });
      // store.commit("basic", {
      //   key: "selectedUserId",
      //   value: userId
      // });

      localStorage.setItem("selectedUserId", userId);
    };

    const itemsPaginated = computed(() => {
      if (filterUsers().length) {
        if (filterUsers().length <= perPage.value) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          maxVisibleButton.value = 1;
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          currentPage.value = 0;
          return filterUsers();
        }
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        maxVisibleButton.value = 2;

        return filterUsers().slice(
          perPage.value * currentPage.value,
          perPage.value * (currentPage.value + 1)
        );
      } else {
        return null;
      }
    });
    const numPages = computed(() =>
      Math.ceil(filterUsers().length / perPage.value)
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

    const remove = (arr, cb) => {
      const newArr = [];

      arr.forEach(item => {
        if (!cb(item)) {
          newArr.push(item);
        }
      });

      return newArr;
    };

    const removeUsers = () => {
      remove();
    };

    const filterUsers = () => {
      if (store.state.users.length) {
        const filterBySearch = store.state.users.filter(filtered => {
          return (
            filtered.user
              .toUpperCase()
              .includes(store.state.searchModel.user.toUpperCase()) ||
            filtered.restaurant
              .toUpperCase()
              .includes(store.state.searchModel.user.toUpperCase()) ||
            filtered.bussiness_type
              .toUpperCase()
              .includes(store.state.searchModel.user.toUpperCase()) ||
            filtered.country
              .toUpperCase()
              .includes(store.state.searchModel.user.toUpperCase())
          );
        });

        const filter = filterBySearch.filter(filtered => {
          return filtered.status
            .toUpperCase()
            .includes(store.state.filter.toUpperCase());
        });
        return filter;
      } else {
        return [];
      }
    };

    return {
      isModalActive,
      currentPage,
      numPages,
      itemsPaginated,
      pagesList,
      filterUsers,
      actionHandler,
      invoiceModal,
      perPage,
      remove,
      showMore,
      maxVisibleButton,
      store
    };
  }
};
</script>
