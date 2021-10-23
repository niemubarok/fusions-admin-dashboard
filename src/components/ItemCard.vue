<template>
  <div
    class="overflow-hidden rounded-sm shadow-lg h-60 transform transition duration-200 hover:z-20 hover:scale-110 w-11/12 "
  >
    <img
      src="https://picsum.photos/700/400/?food"
      style="height:150px"
      class="block w-full"
    />

    <!-- action -->
    <!-- <div
            @click="
              $router.push({ name: 'item', params: { itemId: itemId } })
            "
            class="-z-20 absolute top-0 h-full w-full text-white opacity-0 bg-gray-100 hover:opacity-100 hover:bg-opacity-10 flex items-center justify-center pb-5 "
          >
            <span
              class="rounded-md bg-primary bg-opacity-50 px-2 pb-1 mb-5 hover:bg-opacity-100"
            >
              enter
            </span>
          </div> -->

    <!-- end action -->
    <header class="flex items-center justify-between leading-tight p-2 md:p-2 ">
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
      default: "item Name"
    },
    description: {
      type: String,
      default: "item Description"
    },
    price: {
      type: Number,
      default: 0
    },
    currency: {
      type: String,
      default: "usd"
    }
  },
  setup() {
    return {};
  }
};
</script>
