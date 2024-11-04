<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <input :type="props.typeInput" v-model="modelInput" :class="classInput" />
  </div>
</template>

<script setup>
const modelInput = defineModel()
const props = defineProps({
  typeInput: {
    type: String,
    default: 'text',
    required: true,
  },
  classInput: {
    type: String,
    default:
      'border-2 border-gray-300 focus:border-red-500 rounded-md p-2 w-[200px] focus:ring-2 focus:ring-red-300 outline-none',
  },
})
</script>

<style scoped>
/* Nếu muốn thêm một số cải tiến về giao diện */
input {
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}
</style>
