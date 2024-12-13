<template>
  <div class="base-input">
    <label v-if="label" class="base-input__label">{{ label }}</label>
    <input
      v-bind="inputAttrs"
      :type="type"
      :value="value"
      @input="$emit('input', $event.target.value)"
      class="base-input__field"
    />
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  props: ["label", "type", "value", "inputAttrs"],
};
</script>

<style scoped>
.base-input {
  display: flex;
  flex-direction: column;
}

.base-input__label {
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.base-input__field {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
