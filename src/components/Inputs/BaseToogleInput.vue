<template>
  <div class="toggle-input">
    <label class="toggle-input__switch">
      <input
        type="checkbox"
        class="toggle-input__checkbox"
        :checked="selected === 'USD'"
        @change="toggleCurrency"
      />
      <span class="toggle-input__slider"></span>
    </label>
  </div>
</template>

<script>
export default {
  name: "BaseToogleInput",
  props: {
    value: {
      type: String,
      default: "USD",
    },
  },
  data() {
    return {
      selected: this.value,
    };
  },
  methods: {
    toggleCurrency() {
      this.selected = this.selected === "USD" ? "EUR" : "USD";
      this.$emit("currency", this.selected);
    },
  },
};
</script>

<style scoped>
.toggle-input {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
}

.toggle-input__switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 25px;
}

.toggle-input__checkbox {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-input__slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 4px;
}

.toggle-input__slider:before {
  position: absolute;
  content: "";
  height: 21px;
  width: 21px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  transition: 0.4s;
  border-radius: 2px;
}

.toggle-input__checkbox:checked + .toggle-input__slider {
  background-color: var(--primary-color);
}

.toggle-input__checkbox:checked + .toggle-input__slider:before {
  transform: translateX(24px);
}
</style>
