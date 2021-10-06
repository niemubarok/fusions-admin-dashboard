<template>
  <div class="flex justify-end">
    <ul class="pagination bg-white p-2 shadow-sm rounded">
      <li class="pagination-item">
        <button
          type="button"
          @click="onClickPreviousPage"
          :disabled="isInFirstPage"
          aria-label="Go to previous page"
          class="rounded-sm border border-gray-100 px-3 py-2 hover:bg-gray-100 text-gray-600 no-underline mx-2 text-sm"
          :class="{ 'cursor-not-allowed': isInFirstPage }"
        >
          <feather-icon
            path="chevron-left"
            :class="{ 'text-gray-200': isInFirstPage }"
          />
        </button>
      </li>
      <li v-for="page in pages" class="pagination-item" :key="page.name">
        <span
          class="rounded-sm border border-blue-100 px-3 py-2 bg-blue-100 no-underline text-blue-500 cursor-not-allowed mx-2"
          v-if="isPageActive(page.name)"
          >{{ page.name + 1 }}</span
        >
        <a
          class="rounded-sm border border-gray-100 px-3 py-2 hover:bg-gray-100 text-gray-600 no-underline mx-2"
          href="#"
          v-else
          @click.prevent="onClickPage(page.name)"
          role="button"
          >{{ page.name + 1 }}</a
        >
      </li>

      <li class="pagination-item">
        <button
          type="button"
          @click="onClickNextPage"
          :disabled="isInLastPage"
          aria-label="Go to next page"
          class="rounded-sm border border-gray-100 px-3 py-2 hover:bg-gray-100 text-gray-600 no-underline mx-2 text-sm"
          :class="{ 'cursor-not-allowed text-gray-200': isInLastPage }"
        >
          <feather-icon
            path="chevron-right"
            :class="{ 'text-gray-200': isInLastPage }"
          />
        </button>
      </li>

      <!-- <li class="pagination-item"> -->
      <!-- <button
					type="button"
					@click="onClickLastPage"
					:disabled="isInLastPage"
					aria-label="Go to last page"
				>Last</button> -->
      <!-- <a
          class="rounded-r rounded-sm border border-gray-100 px-3 py-2 hover:bg-gray-100 text-gray-600 no-underline"
          href="#"
          @click.prevent="onClickLastPage"
          rel="next"
          role="button"
          v-if="hasMorePages"
          >&raquo;</a
        >
        <span
          class="rounded-r rounded-sm border border-gray-100 px-3 py-2 hover:bg-gray-100 text-gray-600 no-underline cursor-not-allowed"
          v-else
          >&raquo;</span
        >
      </li> -->
    </ul>
  </div>
</template>
<script>
import { computed } from "vue";
import FeatherIcon from "./FeatherIcon.vue";
export default {
  components: {
    FeatherIcon
  },
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 2
    },

    totalPages: {
      type: Number,
      required: true
    },

    total: {
      type: Number,
      required: true
    },

    perPage: {
      type: Number,
      required: true
    },

    currentPage: {
      type: Number,
      required: true
    },

    hasMorePages: {
      type: Boolean,
      required: true
    }

  },

  computed: {},

  setup(props, { emit }) {
    const startPage = computed(() => {
      if (props.currentPage === 0) {
        return 0;
      }

      if (props.currentPage === props.totalPages) {
        return props.totalPages - props.maxVisibleButtons + 1;
      }

      return props.currentPage;
    });

    const endPage = computed(() => {
      return Math.min(
        startPage.value + props.maxVisibleButtons - 1,
        props.totalPages
      );
    });
    const pages = computed(() => {
      const range = [];

      for (let i = startPage.value; i <= endPage.value; i += 1) {
        range.push({
          name: i,
          isDisabled: i === props.currentPage
        });
      }

      return range;
    });
    const isInFirstPage = computed(() => {
      return props.currentPage === 0;
    });
    const isInLastPage = computed(() => {
      return props.currentPage === props.totalPages;
    });

    const onClickFirstPage = () => {
      emit("pagechanged", 0);
    };
    const onClickPreviousPage = () => {
      emit("pagechanged", props.currentPage - 1);
    };
    const onClickPage = page => {
      emit("pagechanged", page);
    };
    const onClickNextPage = () => {
      emit("pagechanged", props.currentPage + 1);
    };
    const onClickLastPage = () => {
      emit("pagechanged", props.totalPages);
    };
    const isPageActive = page => {
      return props.currentPage === page;
    };
    return {
      onClickFirstPage,
      onClickPreviousPage,
      onClickPage,
      onClickNextPage,
      onClickLastPage,
      isPageActive,
      startPage,
      pages,
      isInFirstPage,
      isInLastPage
    };
  }
};
</script>

<style scoped>
.pagination {
  list-style-type: none;
}

.pagination-item {
  display: inline-block;
}

/* .active {
  @apply .border-t .border-b .border-l .border-blue-100 .px-3 .py-2 .bg-blue-100 .no-underline .text-blue-500 .text-sm;
} */
</style>
