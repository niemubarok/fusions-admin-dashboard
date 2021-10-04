<template>
  <component
    :is="form ? 'form' : 'div'"
    class="card bg-white border border-gray-100 rounded"
    :class="[mb, form ? 'block' : '']"
    @submit="submit"
  >
    <header v-if="title" class="flex items-stretch border-b border-gray-100 ">
      <p
        class="flex items-center py-3 flex-grow font-bold"
        :class="[icon ? 'px-4' : 'px-6']"
      >
        <feather-icon v-if="icon" :path="icon" class="mr-3"></feather-icon>
        {{ title }}
      </p>
      <a
        v-if="headerIcon"
        href="#"
        class="flex items-center py-3 px-4 justify-center"
        aria-label="more options"
        @click.prevent="headerIconClick"
      >
        <icon :path="headerIcon" />
      </a>
      <span class="flex items-center"
        >filter:
        <feather-icon v-if="icon" path="filter" class="mr-3 "></feather-icon>
      </span>
    </header>
    <div v-if="empty" class="text-center py-24 text-gray-500">
      <p>Nothing's here…</p>
    </div>
    <div v-else :class="{ 'p-6': !hasTable }">
      <slot />
    </div>
  </component>
</template>

<script>
import Icon from "@/components/Icon";
import FeatherIcon from "@/components/FeatherIcon";

export default {
  name: "CardComponent",
  components: { Icon, FeatherIcon },
  props: {
    title: String,
    icon: String,
    headerIcon: String,
    hasTable: Boolean,
    empty: Boolean,
    form: Boolean,
    mb: {
      type: String,
      default: "mb-6 last:mb-0"
    }
  },
  emits: ["header-icon-click", "submit"],
  setup(props, { emit }) {
    const headerIconClick = () => {
      emit("header-icon-click");
    };

    const submit = e => {
      emit("submit", e);
    };

    return { headerIconClick, submit };
  }
};
</script>
