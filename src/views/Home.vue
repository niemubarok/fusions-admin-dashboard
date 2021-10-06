<template>
  <main-section>
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6 mt-7">
      <card-widget
        class="tile cursor-pointer hover:bg-green-100"
        :class="{ 'bg-green-100': store.state.filter == 'active' }"
        color="text-green-500"
        :icon="mdiAccountMultiple"
        :number="activeClients().length"
        label="Active Users"
        @click="setFilterActive"
      />
      <card-widget
        class="tile cursor-pointer hover:bg-red-100"
        :class="{ 'bg-red-100': store.state.filter == 'banned' }"
        color="text-red-400"
        :icon="mdiAccountMultipleRemove"
        :number="bannedClients().length"
        label="Banned Users"
        @click="setFilterBanned"
      />
      <card-widget
        class="tile cursor-pointer hover:bg-gray-200"
        color="text-blue-500"
        :icon="mdiChartTimelineVariant"
        :number="256"
        suffix=" Visits"
        label="Google Analytics"
      />
    </div>

    <card-component title="List of Users" icon="list" has-table>
      <template #header>
        <small class="mr-3">Filter :</small>
        <div
          class="cursor-pointer hover:bg-green-500 hover:text-green-50 rounded-lg h-6 px-5 mr-3 bg-green-100 text-green-500"
        >
          <small @click="setFilterActive">
            Active
          </small>
        </div>
        <div
          class="cursor-pointer hover:bg-red-500 hover:text-red-50 rounded-lg h-6 px-5 mr-4 bg-red-100 text-red-500"
        >
          <small @click="setFilterBanned">
            Banned
          </small>
        </div>
      </template>

      <clients-table />
    </card-component>
  </main-section>
</template>

<script>
import { ref } from "vue";
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

export default {
  name: "Tables",
  components: {
    MainSection,
    CardWidget,
    CardComponent,
    ClientsTable
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

    const activeClients = () => {
      return store.state.clients.filter(client => {
        return client.status.toUpperCase().includes("ACTIVE");
      });
    };

    const bannedClients = () => {
      return store.state.clients.filter(client => {
        return client.status.toUpperCase().includes("BANNED");
      });
    };

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
      activeClients,
      bannedClients
    };
  }
};
</script>
