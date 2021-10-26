<template>
  <div class="overflow-hidden rounded-sm shadow-lg h-60 w-11/12">
    <img
      src="https://picsum.photos/700/400/?food"
      style="height: 150px"
      class="block w-full"
    />

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
  </div>
</template>

<script>
export default {
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
    return {};
  },
};
</script>
