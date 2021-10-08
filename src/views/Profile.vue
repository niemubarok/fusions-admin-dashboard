<template>
  <main-section>
    <div @click="$router.go(-1)" class="ml-5  -mb-8 pt-2 cursor-pointer text-blue-400">
      <span class="inline-block align-middle">
        <feather-icon path="chevron-left" size="20px"> </feather-icon>
      </span>
      <span class="-ml-2">
        back
      </span>
    </div>
    <div class="w-full text-white bg-main-color">
      <div class="container my-5 p-5">
        <div class="md:flex no-wrap md:-mx-2 ">
          <!-- Left Side -->
          <div class="w-full md:w-4/12 md:mx-2">
            <!-- Profile Card -->
            <div class="bg-white p-3 border-t-4 border-primary">
              <div class="image overflow-hidden">
                <img
                  class="h-auto w-200 mx-auto rounded-full"
                  src="https://placeimg.com/150/150/tech"
                  alt=""
                />
              </div>
              <h1
                class="text-gray-900 text-center font-bold text-xl leading-8 my-1"
              >
                Geprek Bensu
              </h1>
              <h2
                class="text-gray-600 font-lg text-center text-semibold leading-6"
              >
                Ruben Onsu
              </h2>
              <ul
                class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm"
              >
                <li class="flex items-center py-3">
                  <span>Status</span>
                  <span class="ml-auto"
                    ><span
                      class="bg-green-100 py-1 px-2 rounded text-green-500 text-sm"
                      >Active</span
                    ></span
                  >
                </li>
                <li class="flex items-center py-3">
                  <span>Subscription</span>
                  <span class="ml-auto">Pro Plan</span>
                </li>
                <li class="flex items-center py-3">
                  <span>Subscription Price</span>
                  <span class="ml-auto">$580</span>
                </li>
                <li class="flex items-center py-3">
                  <span>Valid Until</span>
                  <span class="ml-auto">May 2022</span>
                </li>
                <li class="flex items-center py-3">
                  <span>Phone</span>
                  <span class="ml-auto">085451616464</span>
                </li>
                <li class="flex items-center py-3">
                  <span>Country</span>
                  <span class="ml-auto">Indonesia</span>
                </li>
              </ul>
            </div>
            <!-- End of profile card -->
            <div class="my-4"></div>
          </div>
          <!-- Right Side -->
          <div class="w-full  h-64">
            <!-- Categories -->
            <div class="bg-white p-1 shadow-sm rounded-sm">
              <div
                class="flex items-center space-x-1 font-semibold text-gray-900 leading-8 mb-1"
              >
                <span clas="text-green-500">
                  <feather-icon path="grid" />
                </span>
                <span class="tracking-wide">All Categories</span>
              </div>

              <categories />
            </div>
            <!-- End of Categories section -->

            <div class="my-4"></div>

            <!-- Invoices -->
            <div class="bg-white p-3 shadow-sm rounded-sm">
              <div class="w-full">
                <div>
                  <div
                    class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3"
                  >
                    <span clas="text-green-500">
                      <svg
                        class="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </span>
                    <span class="tracking-wide">Invoices</span>
                  </div>
                  <div class="w-full">
                    <invoices />
                  </div>
                </div>
              </div>
              <!-- End of Experience and education grid -->
            </div>
            <!-- End of profile tab -->
          </div>
        </div>
      </div>
    </div>
  </main-section>
</template>
<script>
import CardComponent from "../components/CardComponent.vue";
import MainSection from "../components/MainSection.vue";
import Categories from "@/components/Categories";
import Invoices from "../components/Invoices.vue";
import FeatherIcon from "../components/FeatherIcon.vue";
export default {
  components: {
    MainSection,
    //  CardComponent
    Categories,
    Invoices,
    FeatherIcon
  },
  setup() {}
};
</script>
