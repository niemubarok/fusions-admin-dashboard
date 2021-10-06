<template>
  <div class="floating-input relative ">
    <feather-icon
      :path="icon"
      size="25px"
      class="absolute top-5 ml-2 text-gray-500 flex align-middle text-center"
    />
    <input
      :type="changeType"
      class="border border-gray-200 focus:outline-none rounded-md focus:ring-0 focus:border-primary pb-7 focus:shadow-sm w-full pl-14  h-16"
      placeholder="name@example.com"
      autocomplete="off"
      v-model="computedValue"
    />
    <!-- :for="inputId" -->
    <label
      class="absolute top-0 text-gray-600 left-8 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out "
      >{{ label }}</label
    >
    <div
      v-if="isPassword"
      class="absolute top-0 text-gray-600 right-3 z-50 cursor-pointer px-3 py-5 h-full transform origin-left transition-all duration-100 ease-in-out "
    >
      <!-- <feather-icon
        v-if="repeatPassType !== 'password'"
        path="eye"
        @click="toggleShowPassword"
      />
      <feather-icon
        v-if="repeatPassType == 'password'"
        path="eye-off"
        @click="toggleShowPassword"
      /> -->
      <slot name="append" />
    </div>
  </div>
</template>

<script>
import FeatherIcon from "@/components/FeatherIcon";
import { computed } from "vue";
export default {
  components: {
    FeatherIcon
  },
  props: {
    label: {
      type: String,
      default: "place holder"
    },
    type: {
      type: String,
      default: "email"
    },
    icon: {
      type: String,
      default: "feather"
    },
    modelValue: {
      type: [String, Number, Boolean, Array, Object],
      default: ""
    },
    isPassword: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue", "update:changeType"],
  setup(props, { emit }) {
    const computedValue = computed({
      get: () => props.modelValue,
      set: value => {
        emit("update:modelValue", value);
      }
    });

    const changeType = computed({
      get: () => props.type,
      set: value => {
        emit("update:changeType", value);
      }
    });

    // const changeType = () => {
    //   emit("update:changeType", "text");
    //   // props.type = type;
    // };
    return {
      computedValue,
      changeType
    };
  }
};
</script>
