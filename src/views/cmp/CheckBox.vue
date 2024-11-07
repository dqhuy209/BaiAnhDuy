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
}
</script>

<style scoped>
.checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid #38bd91;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.checkbox.checked {
  background-color: #38bd91;
}

.checkbox-inner {
  width: 12px;
  height: 12px;
  background-color: #38bd91;
  border-radius: 2px;
}
</style>
