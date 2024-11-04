<template>
  <div
    class="flex flex-col gap-4 w-[800px] mx-auto p-4 bg-gray-100 rounded-lg shadow-md"
  >
    <div class="flex justify-around">
      <Input :typeInput="'text'" v-model="newTaskName" />
      <Input :type-input="'date'" v-model="newTaskTime" />
      <StatusSelect @updateStatus="setTaskStatus" />
    </div>
    <div class="flex gap-5 pr-9 justify-between py-5">
      <div class="flex gap-5">
        <Button :onClick="deleteSelectedTasks" :title="'Xóa'" />
        <Button :onClick="exportSelectedTasks" :title="'Xuất'" />
      </div>
      <div>
        <Button :onClick="addTask" :title="'Thêm Task'" />
      </div>
    </div>
    <TaskTable
      :tasks="tasks"
      @toggleAllChecks="toggleAllChecks"
      @toggleCheck="toggleCheck"
      :isAllChecked="isAllChecked"
    />

    <div v-if="exportedTasks.length > 0">
      <h2 class="text-lg font-semibold mb-2">Task Đã Xuất</h2>
      <table class="w-full border border-gray-300">
        <thead>
          <tr class="bg-gray-200">
            <th class="p-2 border border-gray-300">Task</th>
            <th class="p-2 border border-gray-300">Time</th>
            <th class="p-2 border border-gray-300">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="task in exportedTasks"
            :key="task.id"
            class="bg-white hover:bg-gray-100"
          >
            <td class="p-2 border border-gray-300">{{ task.name }}</td>
            <td class="p-2 border border-gray-300">{{ task.time }}</td>
            <td class="p-2 border border-gray-300">{{ task.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import Input from './children/base/Input.vue'
import StatusSelect from './children/StatusSelect.vue'
import TaskTable from './children/TaskTable.vue'
import Button from './children/base/Button.vue'

// Init
const tasks = ref([])
const newTaskName = ref()
const newTaskTime = ref()
const exportedTasks = ref([])
const taskStatus = ref('Todo')
// Kiểm tra nếu tất cả task đều được chọn
const isAllChecked = computed(() => {
  return tasks.value.length > 0 && tasks.value.every(task => task.isChecked)
})
// Button add
function addTask() {
  if (newTaskName.value && newTaskTime.value) {
    tasks.value.push({
      id: Date.now(),
      name: newTaskName.value,
      time: newTaskTime.value,
      status: taskStatus.value,
      isEditing: false,
      isChecked: false,
    })
  }
  newTaskName.value = ''
  newTaskTime.value = ''
}
// Select Status
function setTaskStatus(status) {
  taskStatus.value = status
}
// Table
// Toggle chọn tất cả
function toggleAllChecks() {
  const newCheckStatus = !isAllChecked.value
  tasks.value.forEach(task => {
    task.isChecked = newCheckStatus
  })
  console.log(newCheckStatus)
  console.log(isAllChecked.value)
  // true
}

// Toggle chọn cho từng task
function toggleCheck(task) {
  task.isChecked = !task.isChecked
}
// Xóa các task đã chọn
function deleteSelectedTasks() {
  const selectedIds = tasks.value
    .filter(task => task.isChecked)
    .map(task => task.id)
  tasks.value = tasks.value.filter(task => !task.isChecked)
  exportedTasks.value = exportedTasks.value.filter(
    task => !selectedIds.includes(task.id),
  )
}
// Xuất các task đã chọn
function exportSelectedTasks() {
  exportedTasks.value = tasks.value.filter(task => task.isChecked)
  console.log('Xuất các task:', exportedTasks)
  // Bạn có thể thêm logic để hiển thị hoặc xử lý các task đã xuất
}
</script>

<style lang="scss" scoped></style>
