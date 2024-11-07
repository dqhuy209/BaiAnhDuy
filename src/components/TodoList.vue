<template>
  <div
    class="flex flex-col gap-6 w-[800px] mx-auto p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg"
  >
    <div
      class="flex justify-between items-center gap-4 bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-lg shadow"
    >
      <Input
        :typeInput="'text'"
        v-model="newTaskName"
        placeholder="Nhập task mới"
      />
      <Input
        :type-input="'date'"
        v-model="newTaskTime"
        placeholder="Chọn ngày"
      />
      <StatusSelect @updateStatus="setTaskStatus" />
    </div>

    <div
      class="flex justify-between items-center bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-lg shadow"
    >
      <div class="flex gap-4">
        <Button
          :onClick="deleteSelectedTasks"
          :title="'Xóa'"
          classButton="bg-red-500 text-white px-4 py-2 rounded-lg shadow"
        />
        <Button
          :onClick="exportSelectedTasks"
          :title="'Xuất'"
          classButton="bg-blue-500 text-white px-4 py-2 rounded-lg shadow"
        />
      </div>
      <div class="">
        <Button
          :onClick="addTask"
          :title="'Thêm Task'"
          classButton="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-lg shadow"
        />
      </div>
    </div>

    <TaskTable
      :tasks="tasks"
      @toggleAllChecks="toggleAllChecks"
      @toggleCheck="toggleCheck"
      :isAllChecked="isAllChecked"
      class="bg-white rounded-lg shadow"
      :taskStatus="taskStatus"
      @eUpdate="setTaskStatus"
      @saveMe="handleEditTask"
    />

    <div
      v-if="exportedTasks.length > 0"
      class="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-lg"
    >
      <h2 class="text-lg font-semibold mb-4 text-gray-700">Task Đã Xuất</h2>
      <table class="w-full border border-gray-300 text-left">
        <thead>
          <tr class="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
            <th class="p-3 border">Task</th>
            <th class="p-3 border">Time</th>
            <th class="p-3 border">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="task in exportedTasks"
            :key="task.id"
            class="bg-white hover:bg-gray-50"
          >
            <td class="p-3 border">{{ task.name }}</td>
            <td class="p-3 border">{{ task.time }}</td>
            <td class="p-3 border">{{ task.status }}</td>
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

const tasks = ref([])
const newTaskName = ref('')
const newTaskTime = ref('')
const exportedTasks = ref([])
const taskStatus = ref('Todo')
console.log(taskStatus)
const isAllChecked = computed(() => {
  return tasks.value.length > 0 && tasks.value.every(task => task.isChecked)
})

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

function setTaskStatus(status) {
  console.log(status)
  taskStatus.value = status
}

function toggleAllChecks() {
  const newCheckStatus = !isAllChecked.value
  tasks.value.forEach(task => {
    task.isChecked = newCheckStatus
  })
}

function toggleCheck(task) {
  task.isChecked = !task.isChecked
}

function deleteSelectedTasks() {
  tasks.value = tasks.value.filter(task => !task.isChecked)
  exportedTasks.value = exportedTasks.value.filter(task => !task.isChecked)
}

function handleEditTask(id) {
  console.log(id.id)
  tasks.value.find(task => task.id === id.id).status = taskStatus.value
}

function exportSelectedTasks() {
  exportedTasks.value = tasks.value.filter(task => task.isChecked)
}
</script>

<style scoped></style>
