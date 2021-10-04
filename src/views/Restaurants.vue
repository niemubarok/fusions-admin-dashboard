<template>
  <!-- <title-bar :title-stack="titleStack" />
  <hero-bar>List Restaurant</hero-bar> -->
  <main-section>
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
      <card-widget
        class="tile"
        color="text-green-500"
        :icon="mdiAccountMultiple"
        :number="512"
        label="Active Users"
      />
      <card-widget
        class="tile"
        color="text-red-400"
        :icon="mdiAccountMultipleRemove"
        :number="7"
        label="Banned Users"
      />
      <!-- prefix="$" -->
      <card-widget
        class="tile"
        color="text-blue-500"
        :icon="mdiChartTimelineVariant"
        :number="256"
        suffix=" Clicks"
        label="Google Analytics"
      />
    </div>

    <!-- <notification color="info" :icon="mdiMonitorCellphone">
      <b>Responsive table.</b> Collapses on mobile
    </notification> -->

    <card-component title="List of Users" icon="list" has-table>
      <clients-table checkable />
    </card-component>
    <!-- 
    <notification color="success" :icon="mdiTableBorder">
      <b>Tightly wrapped</b> &mdash; table header becomes card header
    </notification>

    <card-component has-table>
      <clients-table checkable />
    </card-component> -->

    <!-- <notification color="danger" :icon="mdiTableOff">
      <b>Empty table.</b> When there's nothing to show
    </notification> -->

    <!-- <card-component empty /> -->
  </main-section>

  <!-- <bottom-other-pages-section /> -->
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
import Notification from "@/components/Notification";
import ClientsTable from "@/components/ClientsTable";
import CardComponent from "@/components/CardComponent";
import CardWidget from "@/components/CardWidget";
import TitleBar from "@/components/TitleBar";
import HeroBar from "@/components/HeroBar";
import BottomOtherPagesSection from "@/components/BottomOtherPagesSection";

export default {
  name: "Tables",
  components: {
    MainSection,
    // HeroBar,
    // TitleBar,
    CardWidget,
    CardComponent,
    ClientsTable
    // Notification
    // BottomOtherPagesSection
  },
  setup() {
    const titleStack = ref(["Admin", "Tables"]);

    return {
      titleStack,
      mdiMonitorCellphone,
      mdiAccountMultiple,
      mdiChartTimelineVariant,
      mdiTableBorder,
      mdiAccountMultipleRemove,
      mdiTableOff
    };
  }
};
</script>
