<template>
  <div class="base-input-range">
    <label v-if="label"
      >{{ label }} <span>{{ internalValue }}</span>
      <span>{{ contentLabel }}</span></label
    >
    <input
      type="range"
      id="rangeId"
      :min="min"
      :max="max"
      :step="step"
      :value="internalValue"
      @input="updateValue"
      v-bind="inputAttrs"
    />
  </div>
</template>

<script>
export default {
  name: "BaseInputRange",
  props: {
    label: {
      type: String,
      default: "",
    },
    value: {
      type: [Number, String],
      default: 0,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    step: {
      type: Number,
      default: 1,
    },
    inputAttrs: {
      type: Object,
      default: () => ({}),
    },
    contentLabel: {
      type: String,
    },
  },
  data() {
    return {
      internalValue: this.value,
    };
  },
  watch: {
    value(newValue) {
      this.internalValue = newValue;
    },
  },
  methods: {
    updateValue(event) {
      this.internalValue = event.target.value;
      this.$emit("input", this.internalValue);
    },
  },
};
</script>

<style scoped>
.base-input-range {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}
label {
  margin-bottom: 0.5rem;
  font-weight: bold;
}
input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
  height: 3px;
  background: var(--secondary-color);
  outline: none;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 100%;
  background: var(--primary-color);
  cursor: pointer;
}
.range-value {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #555;
}
</style>
