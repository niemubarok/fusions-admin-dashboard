<template>
  <div class="floating-input relative ">
    <feather-icon
      :path="icon"
      size="25px"
      class="absolute top-5 ml-2 text-gray-500 flex align-middle text-center"
    />
    <input
      :type="[isVisible ? 'text' : changeType]"
      class="border border-gray-200 shadow shadow-inner  focus:outline-none rounded-md focus:ring-0 focus:border-primary pb-7 focus:shadow-sm w-full pl-14  h-16"
      autocomplete="off"
      v-model="computedValue"
    />
    <label
      class="absolute top-0 text-gray-600 left-8 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out "
      >{{ label }}</label
    >
    <div
      v-if="isPassword"
      class="absolute top-0 text-gray-600 right-3 z-20 cursor-pointer px-3 py-5 h-full transform origin-left transition-all duration-100 ease-in-out "
    >
      <vue-feather
        v-if="modelValue"
        :type="isVisible ? 'eye' : 'eye-off'"
        size="15px"
        @click="toggleVisibility"
      ></vue-feather>
    </div>
  </div>
</template>

<script>
import FeatherIcon from "@/components/FeatherIcon";
import { computed, ref } from "vue";
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

    const isVisible = ref(false);

    const toggleVisibility = () => {
      isVisible.value = !isVisible.value;
    };

    return {
      computedValue,
      changeType,
      toggleVisibility,
      isVisible
    };
  }
};
</script>
