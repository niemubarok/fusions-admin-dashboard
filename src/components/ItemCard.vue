<template>
  <modal-box v-model="isModalActive" has-cancel has-divider>
    <feather-icon
      path="alert-triangle"
      w="50"
      h="50"
      size="50px"
      class="flex justify-center w-full text-red-400"
    />
    <div class="w-full bg-red-600 bg-opacity-20 min-h-min py-2 rounded-md">
      <span
        class="flex justify-center w-full text-gray-900 text-center font-lg"
      >
        You are deleting <strong class="ml-1"> {{ name }}</strong>
      </span>
    </div>
    <div class="pt-5 flex justify-center text-gray-500">
      Are you sure to continue ?
    </div>
    <template #bottom>
      <jb-buttons class="float-right">
        <jb-button
          @click="isModalActive = false"
          label="Cancel"
          class="bg-gray-300 text-gray-500"
        />
        <jb-button color="danger" label="Yes" />
      </jb-buttons>
    </template>
  </modal-box>
  <div class="relative overflow-hidden rounded-sm shadow-lg h-60 w-11/12">
    <img
      src="https://picsum.photos/700/400/?food"
      style="height: 150px"
      class="block w-full"
    />

    <div class="container flex my-5 mx-auto px-2 md:px-12">
      <div class="flex flex-wrap -mx-1 text-gray-700 w-full">
        <!-- empty -->
        <card-component v-if="!itemsPaginated?.length" empty class="w-full" />
        <div
          v-for="item in itemsPaginated"
          :key="item.id"
          class="my-1 px-1 w-full lg:my-4 lg:px-4 lg:w-1/3 flex justify-center"
        >
          <item-card
            v-if="!isSkeleton"
            :name="item.name"
            :price="item.price"
            :description="item.description"
          />
        </div>
        <card-skeleton v-if="isSkeleton" />
      </div>
    </div>

    <header class="flex items-center justify-between leading-tight p-2 md:p-2">
      <h3 class="text-gray-700 font-bold">
        {{ name }}
      </h3>
      <p class="text-gray-500 text-sm">{{ currency }}&nbsp;{{ price }}</p>
    </header>
    <hr />
    <footer class="flex items-center justify-between leading-none md:p-2">
      <p class="ml-2 text-sm text-gray-500">
        {{ description }}
      </p>
    </footer>

    <!-- action -->
    <div
      class="flex-col -z-20 absolute top-0 h-60 w-full text-white opacity-0 bg-gray-200 hover:opacity-100 hover:bg-opacity-20 flex items-center justify-center pb-5"
    >
      <div>
        <small
          class="absolute top-1 right-2 rounded-md bg-red-500 bg-opacity-50 hover:bg-opacity-100 cursor-pointer transform transition duration-200 hover:scale-110"
        >
          <feather-icon
            @click="deleteButtonAction"
            path="trash"
            size="14px"
            class="text-gray-200"
          />
        </small>
      </div>
    </div>
  </div>
</template>

<script>
import FeatherIcon from "@/components/FeatherIcon.vue";
import ModalBox from "@/components/ModalBox.vue";
import { ref } from "vue";
import JbButton from "./JbButton.vue";
import JbButtons from "./JbButtons.vue";

export default {
  components: {
    FeatherIcon,
    ModalBox,
    JbButton,
    JbButtons,
  },
  props: {
    name: {
      type: String,
      default: "item Name",
    },
    description: {
      type: String,
      default: "item Description",
    },
    price: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: "usd",
    },
  },
  setup() {
    const isModalActive = ref(true);
    const deleteButton = (name, id, index) => {
      categoryNameToDelete.value = name;
      categoryId.value = id;
      categoryIndex.value = index;
      isModalActive.value = true;
    };

    const deleteCategoryConfirmation = () => {
      // store.dispatch("deleteCategory", categoryId.value);
      categories.value?.splice(categoryIndex.value, 1);
      categoryDeleteStatus.isSuccess = true;
      categoryDeleteStatus.notification = true;
      isModalActive.value = false;

      setTimeout(() => {
        categoryDeleteStatus.isSuccess = false;
        categoryDeleteStatus.notification = false;
        categoryDeleteStatus.message = "";
      }, 4000);
    };

    return { isModalActive };
  },
};
</script>
