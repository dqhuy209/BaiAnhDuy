<template>
  <div>
    <TodoList />
    <!-- <Login /> -->
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import TodoList from './components/TodoList.vue'
// import Login from './components/Login.vue'
onMounted(() => {
  document.cookie = 'locale=EN'
})
</script>

<style lang="scss" scoped></style>
