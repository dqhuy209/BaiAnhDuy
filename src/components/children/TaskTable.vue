<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Task</th>
        <th>Status</th>
        <th>Date</th>
        <th>Action</th>
        <th>
          <CheckBox @toggle="toggleAllChecks" :isChecked="props.isAllChecked" />
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(task, index) in props.tasks" :key="task.id">
        <td>{{ index + 1 }}</td>
        <!-- <td>{{ task.name }}</td>
        <td>{{ task.status }}</td>
        <td>{{ task.time }}</td> -->
        <td>
          <div v-if="task.isEditing">
            <Input
              :typeInput="'text'"
              v-model="task.name"
              :classInput="' border-2 border-solid border-red-500'"
            />
          </div>
          <div v-else>
            {{ task.name }}
          </div>
        </td>
        <td>
          {{ task.status }}
        </td>
        <td>
          <div v-if="task.isEditing">
            <Input
              :typeInput="'text'"
              v-model="task.time"
              :classInput="' border-2 border-solid border-red-500'"
            />
          </div>
          <div v-else>
            {{ task.time }}
          </div>
        </td>
        <!-- <td><Button :title="'Sửa'" /></td> -->
        <td>
          <Button
            :title="task.isEditing ? 'Lưu' : 'Sửa'"
            @click="task.isEditing ? saveTask(task) : editTask(task)"
          />
        </td>
        <td>
          <CheckBox
            :isChecked="task.isChecked"
            @toggle="() => toggleCheck(task)"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import CheckBox from './CheckBox.vue'
import Button from './base/Button.vue'
import Input from './base/Input.vue'

const props = defineProps({
  tasks: {
    type: Array,
    required: true,
  },
  isAllChecked: {
    type: Boolean,
    required: true,
  },
})
const emit = defineEmits(['toggleAllChecks', 'toggleCheck'])

function toggleAllChecks() {
  emit('toggleAllChecks')
  console.log('Table', props.isAllChecked)
}

function toggleCheck(task) {
  emit('toggleCheck', task)
}
function editTask(task) {
  task.isEditing = true
}

function saveTask(task) {
  task.isEditing = false
}
</script>
<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  text-align: left;
  border: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
}
</style>
