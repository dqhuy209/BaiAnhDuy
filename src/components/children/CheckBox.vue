<template>
  <label class="my-checkbox">
    <span></span>
    <input
      type="checkbox"
      :checked="props.isChecked"
      @change="toggleCheck"
      class="hidden-checkbox"
    />
    <span class="checkbox-display">
      <span class="dot"></span>
    </span>
  </label>
</template>

<script setup>
const props = defineProps({
  isChecked: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['toggle'])

function toggleCheck(event) {
  emit('toggle', event.target.checked)
}
</script>

<style scoped>
.my-checkbox {
  display: inline-flex;
  align-items: center;
  font-family: Arial, sans-serif;
  font-size: 14px;
  color: #333;
  cursor: pointer;
}

.my-checkbox span:first-of-type {
  margin-right: 8px;
}

.hidden-checkbox {
  display: none;
}

.checkbox-display {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 18px;
  border: 2px solid #4caf50;
  border-radius: 4px;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
  cursor: pointer;
  position: relative;
}

.checkbox-display:hover {
  border-color: #388e3c;
}

.dot {
  width: 10px;
  height: 10px;
  background-color: #4caf50;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.hidden-checkbox:checked + .checkbox-display {
  background-color: #4caf50;
  border-color: #4caf50;
}

.hidden-checkbox:checked + .checkbox-display .dot {
  opacity: 1;
}
</style>
