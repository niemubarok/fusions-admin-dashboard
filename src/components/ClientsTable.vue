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

  <div v-if="filterClients().length == 0">
    <card-component empty />
  </div>

  <table v-if="filterClients().length !== 0" class="md:pa-md">
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
        <th>User</th>
        <th>Restaurant</th>
        <th>Phone</th>
        <th>Country</th>
        <th>Subscription</th>
        <th>status</th>
        <th class="text-center">Invoices</th>
        <th class="text-center">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="client in itemsPaginated" :key="client.id" class="text-center">
        <!-- <td class="text-center">
          <input
            type="checkbox"
            v-model="checkedRows"
            :value="client"
            class="rounded"
          />
        </td> -->
        <td>
          <div class="flex justify-center">
            <img :src="client.logo" class="w-14 rounded-full " />
          </div>
        </td>
        <td data-label="User">{{ client.user }}</td>
        <td data-label="Restaurant">{{ client.restaurant }}</td>
        <td data-label="Phone">{{ client.phone }}</td>
        <td data-label="Country">
          {{ client.country }}
        </td>
        <td data-label="Subscription">
          <span class="text-gray-500" :title="client.subscription">{{
            client.subscription
          }}</span>
        </td>
        <td data-label="Status">
          <small
            class="rounded-md py-1"
            :class="{
              'bg-green-100 text-green-500 px-4': client.status == 'active',
              'bg-red-100 text-red-500 px-3': client.status == 'Banned'
            }"
            :title="client.status"
            >{{ client.status }}</small
          >
        </td>
        <td data-label="Invoices">
          <jb-buttons type="justify-start lg:justify-center" no-wrap>
            <span title="click to see invoice's detail">
              <feather-icon
                size="15px"
                class="rounded-md no-border cursor-pointer text-green-500"
                path="paperclip"
                small
                @click="invoiceModal = true"
              >
              </feather-icon>
            </span>
          </jb-buttons>
        </td>
        <td>
          <jb-buttons type="justify-start lg:justify-center" no-wrap>
            <span title="User detail">
              <feather-icon
                size="15px"
                class="rounded-md no-border cursor-pointer text-green-500"
                path="eye"
                small
                @click="invoiceModal = true"
              >
              </feather-icon>
            </span>
            <span title="Ban User">
              <feather-icon
                size="15px"
                class="rounded-md no-border cursor-pointer text-red-600"
                path="user-x"
                small
                @click="invoiceModal = true"
              >
              </feather-icon>
            </span>
            <span title="Delete User">
              <feather-icon
                size="15px"
                class="rounded-md no-border cursor-pointer text-red-300 ml-1"
                path="trash"
                small
                @click="invoiceModal = true"
              >
              </feather-icon>
            </span>
          </jb-buttons>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="table-pagination align-middle">
    <pagination
      :total-pages="pagesList.length"
      :total="filterClients().length"
      :per-page="perPage"
      :current-page="currentPage"
      @pagechanged="showMore"
      :maxVisibleButtons="maxVisibleButton"
    >
    </pagination>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import {
  mdiEye,
  mdiDotsVerticalCircle,
  mdiAccountDetails,
  mdiTrashCan,
  mdiAccountConvert
} from "@mdi/js";
import ModalBox from "@/components/ModalBox";
import JbButtons from "@/components/JbButtons";
import JbButton from "@/components/JbButton";
import FeatherIcon from "./FeatherIcon.vue";
import CardComponent from "./CardComponent";
import VueTailwindPagination from "@ocrv/vue-tailwind-pagination";
import Pagination from "./Pagination.vue";

export default {
  name: "ClientsTable",
  components: {
    ModalBox,
    JbButtons,
    // JbButton,
    CardComponent,
    // VueTailwindPagination,
    FeatherIcon,
    ModalBox,
    Pagination
  },
  props: {
    checkable: Boolean
  },
  setup() {
    const store = useStore();

    const items = computed(() => store.state.clients);

    const isModalActive = ref(false);
    const invoiceModal = ref(false);

    const perPage = ref(3);
    const page = ref(1);

    const currentPage = ref(0);

    const checkedRows = ref([]);
    const allSelected = ref(false);
    const maxVisibleButton = ref(2);

    const itemsPaginated = computed(() => {
      if (filterClients().length <= perPage.value) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        maxVisibleButton.value = 1;
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        currentPage.value = 0;
        return filterClients();
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      maxVisibleButton.value = 2;

      return filterClients().slice(
        perPage.value * currentPage.value,
        perPage.value * (currentPage.value + 1)
      );
    });

    const numPages = computed(() =>
      Math.ceil(itemsPaginated.value.length / perPage.value)
    );

    const currentPageHuman = computed(() => currentPage.value + 1);

    const pagesList = computed(() => {
      const pagesList = [];

      for (let i = 0; i < numPages.value; i++) {
        pagesList.push(i);
      }

      return pagesList;
    });

    const remove = (arr, cb) => {
      const newArr = [];

      arr.forEach(item => {
        if (!cb(item)) {
          newArr.push(item);
        }
      });

      return newArr;
    };

    const checked = (isChecked, client) => {
      if (isChecked) {
        if (allSelected.value) {
          checkedRows.value.push(client);
        }
        checkedRows.value.push(client);
      } else {
        checkedRows.value = remove(
          checkedRows.value,
          row => row.id === client.id
        );
      }
    };

    const selectAll = () => {
      if (!allSelected.value) {
        filterClients().forEach(each => {
          checkedRows.value.push(each);
        });
      } else {
        checkedRows.value = [];
      }
    };

    const filterClients = () => {
      if (store.state.clients.length) {
        const filterBySearch = store.state.clients.filter(filtered => {
          return (
            filtered.user
              .toUpperCase()
              .includes(store.state.search.toUpperCase()) ||
            filtered.restaurant
              .toUpperCase()
              .includes(store.state.search.toUpperCase()) ||
            filtered.country
              .toUpperCase()
              .includes(store.state.search.toUpperCase())
          );
        });

        const filter = filterBySearch.filter(filtered => {
          return filtered.status
            .toUpperCase()
            .includes(store.state.filter.toUpperCase());
        });
        return filter;
      } else {
        console.log("no data");
      }
    };

    const showMore = p => {
      // page.value = p;
      currentPage.value = p;
    };

    return {
      isModalActive,
      currentPage,
      currentPageHuman,
      numPages,
      checkedRows,
      itemsPaginated,
      pagesList,
      checked,
      mdiEye,
      mdiTrashCan,
      mdiDotsVerticalCircle,
      mdiAccountDetails,
      mdiAccountConvert,
      selectAll,
      allSelected,
      filterClients,
      invoiceModal,
      perPage,
      showMore,
      maxVisibleButton
    };
  }
};
</script>
