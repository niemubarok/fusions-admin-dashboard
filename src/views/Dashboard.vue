<template>
  <main-section>
    <div
      v-if="store.state.searchModel.user == ''"
      class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6 mt-7"
    >
      <card-widget
        class="tile cursor-pointer hover:bg-green-100"
        :class="{ 'bg-green-100': store.state.filter == 'active' }"
        color="text-green-500"
        :icon="mdiAccountMultiple"
        :number="Number(store.state.activeUserCount)"
        label="Active Users"
        @click="setFilterActive"
      />
      <card-widget
        class="tile cursor-pointer hover:bg-red-100"
        :class="{ 'bg-red-100': store.state.filter == 'banned' }"
        color="text-red-400"
        :icon="mdiAccountMultipleRemove"
        :number="Number(store.state.bannedUserCount)"
        label="Banned Users"
        @click="setFilterBanned"
      />
      <card-widget
        class="tile"
        color="text-blue-500"
        :icon="mdiChartTimelineVariant"
        :number="256"
        suffix=" Visits"
        label="Google Analytics"
      />
    </div>

    <card-component title="List of Users" icon="list" has-table>
      <template #header>
        <div class="flex items-center justify-center">
          <feather-icon path="filter" size="13px" class="-mr-1 text-gray-500">
          </feather-icon>
          <small class="mr-3 text-gray-500">filter :</small>
          <div>
            <small
              @click="setFilterActive"
              class="cursor-pointer hover:bg-green-500 hover:text-green-50 rounded-md h-6 px-5 mr-3 bg-green-100 text-green-500"
            >
              Active
            </small>
          </div>
          <div>
            <small
              class="cursor-pointer hover:bg-red-400 hover:text-red-50 rounded-md h-6 px-5 mr-4 bg-red-100 text-red-500"
              @click="setFilterBanned"
            >
              Banned
            </small>
          </div>
        </div>
      </template>

      <clients-table />
    </card-component>
  </main-section>
</template>

<script>
import { onMounted, ref } from "vue";
import {
  mdiMonitorCellphone,
  mdiAccountMultiple,
  mdiAccountMultipleRemove,
  mdiChartTimelineVariant,
  mdiTableBorder,
  mdiTableOff
} from "@mdi/js";
import MainSection from "@/components/MainSection";
import ClientsTable from "@/components/ClientsTable";
import CardComponent from "@/components/CardComponent";
import CardWidget from "@/components/CardWidget";
import { useStore } from "vuex";
import AsideMenu from "../components/AsideMenu.vue";
import FeatherIcon from "../components/FeatherIcon.vue";

export default {
  name: "Tables",
  components: {
    MainSection,
    CardWidget,
    CardComponent,
    ClientsTable,
    FeatherIcon
  },
  setup() {
    const titleStack = ref(["Admin", "Tables"]);
    const store = useStore();

    const setStatus = status => {
      store.state.filter == status
        ? (store.state.filter = "")
        : (store.state.filter = status);
    };

    const setFilterActive = () => {
      setStatus("active");
    };

    const setFilterBanned = () => {
      setStatus("banned");
    };

    const activeUsers = () => {
      return store.state.users.filter(client => {
        return client.status.toUpperCase().includes("ACTIVE");
      });
    };

    const bannedUsers = () => {
      return store.state.users.filter(client => {
        return client.status.toUpperCase().includes("BANNED");
      });
    };

    onMounted(() => {
      store.state.filter = "";
      store.dispatch("clearSearch");
    });

    return {
      titleStack,
      mdiMonitorCellphone,
      mdiAccountMultiple,
      mdiChartTimelineVariant,
      mdiTableBorder,
      mdiAccountMultipleRemove,
      mdiTableOff,
      store,
      setFilterActive,
      setFilterBanned,
      activeUsers,
      bannedUsers
    };
  }
};
</script>
