<template>
  <modal-box v-model="isModalActive" title="Please confirm action" has-cancel>
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </modal-box>

  <div v-if="checkedRows.length" class="bg-gray-50 p-3">
    <span
      v-for="checkedRow in checkedRows"
      :key="checkedRow.id"
      class="inline-block bg-gray-100 px-2 py-1 rounded-sm mr-2 text-sm"
      >{{ checkedRow.name }}</span
    >
  </div>

  <div v-if="itemsPaginated.length == 0">
    <card-component empty />
  </div>

  <table v-if="itemsPaginated.length !== 0" class="md:pa-md">
    <thead>
      <tr>
        <th v-if="checkable" class="text-center checkbox-cell">
          <input type="checkbox" @click="selectAll()" v-model="allSelected" />
        </th>
        <th>Logo</th>
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
      <tr
        v-for="client in itemsPaginated"
        :key="client.id"
        class="text-center checkbox-cell"
      >
        <td>
          <input type="checkbox" v-model="checkedRows" :value="client" />
        </td>
        <td class="flex justify-center">
          <!-- <div> -->
          <img
            :src="client.logo"
            class="rounded-full w-10 h-10 md:w-50 md:h-50"
          />
          <!-- </div> -->
        </td>
        <td data-label="User">{{ client.user }}</td>
        <td data-label="Restaurant">{{ client.name }}</td>
        <td data-label="Phone">{{ client.phone }}</td>
        <td data-label="Country">
          <!-- <progress max="100" :value="client.progress">{{
            client.progress -->
          <!-- }}</progress> -->
          {{ client.country }}
        </td>
        <td data-label="Subscription">
          <span class="text-gray-500" :title="client.subscription">{{
            client.subscription
          }}</span>
        </td>
        <td data-label="Status">
          <!-- style="width:500px;" -->
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
            <feather-icon
              size="20px"
              class="rounded-md no-border cursor-pointer text-green-500"
              path="eye"
              small
              @click="isModalActive = true"
            >
            </feather-icon>
          </jb-buttons>
        </td>
        <td class="flex justify-start lg:justify-center">
          <more-action class="sm:hidden  md:hidden ">
            <feather-icon size="20px" path="more-vertical"></feather-icon>
            <!-- class="hidden lg:inline-flex" -->
            <template #dropdown>
              <nav-bar-item to="/profile">
                <nav-bar-item-label :icon="mdiAccountDetails" label="Detail" />
              </nav-bar-item>
              <nav-bar-item>
                <nav-bar-item-label
                  :icon="mdiAccountConvert"
                  label="Change Status"
                />
              </nav-bar-item>
              <nav-bar-item class="text-red-500">
                <nav-bar-item-label :icon="mdiTrashCan" label="Remove" />
              </nav-bar-item>
              <!-- <nav-bar-menu-divider />
              <nav-bar-item>
                <nav-bar-item-label :icon="mdiLogout" label="Log Out" />
              </nav-bar-item> -->
            </template>
          </more-action>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="table-pagination align-middle">
    <div class="row flex justify-center">
      <jb-button
        v-for="page in pagesList"
        @click="currentPage = page"
        :active="page === currentPage"
        :label="page + 1"
        :key="page"
        small
      />
    </div>
    <small class="float-right -mt-7"
      >Page {{ currentPageHuman }} of {{ numPages }}</small
    >
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
import CheckboxCell from "@/components/CheckboxCell";
import Level from "@/components/Level";
import JbButtons from "@/components/JbButtons";
import JbButton from "@/components/JbButton";
import CardComponent from "@/components/CardComponent";
import NavBarItem from "@/components/NavBarItem";
import NavBarItemLabel from "@/components/NavBarItemLabel";
import MoreAction from "@/components/MoreAction";
import FeatherIcon from "./FeatherIcon.vue";

export default {
  name: "ClientsTable",
  components: {
    ModalBox,
    // CheckboxCell,
    // Level,
    JbButtons,
    JbButton,
    CardComponent,
    NavBarItem,
    NavBarItemLabel,
    // NavBarMenu,
    MoreAction,
    FeatherIcon
  },
  props: {
    checkable: Boolean
  },
  setup() {
    const store = useStore();

    const items = computed(() => store.state.clients);

    const isModalActive = ref(false);

    const perPage = ref(10);

    const currentPage = ref(0);

    const checkedRows = ref([]);
    const allSelected = ref(false);

    const itemsPaginated = computed(() =>
      items.value.slice(
        perPage.value * currentPage.value,
        perPage.value * (currentPage.value + 1)
      )
    );

    const numPages = computed(() =>
      Math.ceil(items.value.length / perPage.value)
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
        // console.log(checkedRows.value);
      } else {
        checkedRows.value = remove(
          checkedRows.value,
          row => row.id === client.id
        );
      }
    };

    const selectAll = () => {
      if (!allSelected.value) {
        itemsPaginated.value.forEach(each => {
          checkedRows.value.push(each);
        });
      } else {
        checkedRows.value = [];
      }
      // for (item in itemsPaginated.value) {
      // }
    };

    const checkAll = isChecked => {
      // console.log(isChecked);
      if (isChecked) {
        checked(isChecked, itemsPaginated.value);
        // checkedRows.value.push(items.value);
        console.log(itemsPaginated.value);
      }
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
      checkAll,
      mdiEye,
      mdiTrashCan,
      mdiDotsVerticalCircle,
      mdiAccountDetails,
      mdiAccountConvert,
      selectAll,
      allSelected
    };
  }
};
</script>
