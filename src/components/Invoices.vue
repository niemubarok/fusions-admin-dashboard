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

  <div>
    <card-component empty />
  </div>

  <!-- <table v-if="invoices().length" class="md:pa-md text-gray-700 w-full">
    <thead>
      <tr>
        <th class="text-center">No.</th>
        <th class="text-center">Due Date</th>
        <th class="text-center">Plan</th>
        <th class="text-center">Price</th>
        <th class="text-center">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(invoice, index) in itemsPaginated"
        :key="invoice.id"
        class="text-center"
      >
        <td class="text-center">
          {{ lineNumber(index) }}
        </td>
        <td class="text-center" data-label="Date">{{ invoice.date_end }}</td>
        <td class="text-center" data-label="Plan">
          Pro Plan
        </td>
        <td class="text-center" data-label="Price">${{ invoice.price }}</td>
        <td class="text-center" data-label="Status">
          <small class="bg-green-100 text-green-500 px-4 rounded-md"
            >Paid</small
          >
        </td>
      </tr>
    </tbody>
  </table>
  <div class="table-pagination align-middle">
    <pagination
      :total-pages="pagesList.length - 1"
      :total="invoices().length"
      :per-page="perPage"
      :current-page="currentPage"
      @pagechanged="showMore"
      :maxVisibleButtons="maxVisibleButton"
      :hasMorePages="false"
    >
    </pagination>
  </div> -->
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import ModalBox from "@/components/ModalBox";
import CardComponent from "./CardComponent";
import Pagination from "./Pagination.vue";

export default {
  name: "UsersTable",
  components: {
    ModalBox,
    CardComponent,
    ModalBox
    // Pagination
  },
  props: {
    checkable: Boolean
  },
  setup() {
    const store = useStore();

    const isModalActive = ref(false);
    const invoiceModal = ref(false);

    const perPage = ref(5);

    const lineNumber = index => {
      for (let i = 0; i <= currentPage.value; i++) {
        if (currentPage.value == 0) return index + 1;
        else if (currentPage.value == i) return index + i * 5;
      }
    };

    const currentPage = ref(0);

    const maxVisibleButton = ref(2);

    const itemsPaginated = computed(() => {
      if (invoices().length <= perPage.value) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        maxVisibleButton.value = 1;
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        currentPage.value = 0;
        return invoices();
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      maxVisibleButton.value = 2;

      return invoices().slice(
        perPage.value * currentPage.value,
        perPage.value * (currentPage.value + 1)
      );
    });
    const numPages = computed(() =>
      Math.ceil(invoices().length / perPage.value)
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

    const removeClient = () => {
      remove();
    };

    const invoices = () => {
      if (store.state.filteredUser.length) {
        return store.state.filteredUser[0].invoices;
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
      invoices,
      invoiceModal,
      perPage,
      remove,
      showMore,
      maxVisibleButton,
      lineNumber
    };
  }
};
</script>
