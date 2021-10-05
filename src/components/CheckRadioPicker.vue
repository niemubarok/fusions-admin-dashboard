<template>
  <div
    class="flex justify-start flex-wrap -mb-3 "
    :class="{ 'flex-col': column }"
  >
    <label
      v-for="(value, key) in options"
      :key="key"
      :class="type"
      class="mr-6 mb-3 last:mr-0 ring-0 checked:outline-none checked:border-yellow-600 border-gray-200"
    >
      <input
        :type="inputType"
        :name="name"
        v-model="computedValue"
        :value="key"
        class="appearance-none checked:border-transparent checked:outline-none border-gray-200"
      />
      <span class="check "></span>
      <span class="control-label">{{ value }}</span>
    </label>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  name: "CheckRadioPicker",
  props: {
    options: {
      type: Object,
      default: () => {}
    },
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: "checkbox"
    },
    column: Boolean,
    modelValue: [String, Number, Boolean, Array]
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const computedValue = computed({
      get: () => props.modelValue,
      set: value => {
        emit("update:modelValue", value);
      }
    });

    const inputType = computed(() =>
      props.type === "radio" ? "radio" : "checkbox"
    );

    return {
      computedValue,
      inputType
    };
  }
};
</script>
