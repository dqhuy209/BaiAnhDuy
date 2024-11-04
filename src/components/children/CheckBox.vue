<template>
  <div
    class="checkbox"
    @click="toggleCheck"
    :class="{ checked: props.isChecked }"
  >
    <div class="checkbox-inner" v-if="props.isChecked"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  isChecked: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['toggle'])
function toggleCheck() {
  emit('toggle')
  console.log('checkbox', props.isChecked)
}
</script>

<style scoped>
.checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid #007bff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.checkbox.checked {
  background-color: #007bff;
}

.checkbox-inner {
  width: 12px;
  height: 12px;
  background-color: #007bff;
  border-radius: 2px;
}
</style>
