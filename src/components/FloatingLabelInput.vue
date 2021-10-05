<template>
  <div class="floating-input relative ">
    <feather-icon
      :path="icon"
      size="25px"
      class="absolute top-5 ml-2 text-gray-500 flex align-middle text-center"
    />
    <input
      :type="type"
      :id="id"
      class="border border-gray-200 focus:outline-none rounded-md focus:ring-0 focus:border-yellow-600 pb-7 focus:shadow-sm w-full pl-14  h-16"
      placeholder="name@example.com"
      autocomplete="off"
      v-model="computedValue"
    />
    <label
      :for="id"
      class="absolute top-0 text-gray-600 left-8 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out "
      >{{ label }}</label
    >
  </div>
</template>

<script>
import FeatherIcon from "@/components/FeatherIcon";
import { computed } from "vue";
export default {
  name: "input",
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
    id: {
      type: String,
      default: "id"
    },
    icon: {
      type: String,
      default: "feather"
    },
    modelValue: {
      type: [String, Number, Boolean, Array, Object],
      default: ""
    }
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const computedValue = computed({
      get: () => props.modelValue,
      set: value => {
        emit("update:modelValue", value);
      }
    });
    return {
      computedValue
    };
  }
};
</script>
