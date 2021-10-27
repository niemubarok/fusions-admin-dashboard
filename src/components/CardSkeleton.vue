<template>
  <!-- skeleton -->
  <div class="container flex my-5 mx-auto px-2 md:px-12">
    <div class="flex flex-wrap -mx-1 text-gray-700 w-full">
      <div
        class="my-1 px-1 w-full lg:my-2 md:px-3 lg:w-2/6 flex justify-center"
        v-for="category of 3"
        :key="category"
      >
        <div
          class="bg-gray-200 animate animate-pulse overflow-hidden rounded-lg shadow-lg h-60 w-11/12 transform transition-all duration-500"
        >
          <div
            style="height: 150px"
            class="block w-full bg-gray-400 animate animate-pulse"
          ></div>

          <header
            class="flex items-center justify-between leading-tight p-2 md:p-2"
          >
            <h3
              class="bg-gray-400 animate animate-pulse text-gray-700 font-bold overflow-ellipsis w-2/4 rounded-sm"
            >
              &nbsp;
            </h3>
            <p class="bg-gray-300 animate animate-pulse w-20 rounded-sm">
              <span class="bg-gray-300 animate animate-pulse w-20">&nbsp;</span>
            </p>
          </header>
          <hr />
          <footer class="px-2 flex-wrap justify-start">
            <p
              class="mx-3 bg-gray-400 animate animate-pulse w-10/12 mt-2 rounded-sm h-2"
            >
              &nbsp;
            </p>
            <p
              class="mx-3 bg-gray-400 animate animate-pulse w-10/12 mt-2 rounded-sm h-2"
            >
              &nbsp;
            </p>
          </footer>
        </div>
        <!-- END Article -->
      </div>
      <!-- END Column -->
    </div>
  </div>
</template>
