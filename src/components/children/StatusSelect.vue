<template>
  <div class="dropdown" @click="toggleDropdown">
    <div class="selected-status">{{ selectedLabel }}</div>
    <div v-if="isOpen" class="dropdown-menu">
      <div
        v-for="status in statuses"
        :key="status.value"
        :class="['dropdown-item', { active: status.value === selectedStatus }]"
        @click.stop="selectStatus(status.value)"
      >
        {{ status.label }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedStatus = ref('todo')
const isOpen = ref(false)

const statuses = [
  { value: 'todo', label: 'Todo' },
  { value: 'done', label: 'Done' },
  { value: 'reject', label: 'Reject' },
]

const emit = defineEmits(['updateStatus'])
function toggleDropdown() {
  isOpen.value = !isOpen.value
}
const selectedLabel = computed(() => {
  return (
    statuses.find(status => status.value === selectedStatus.value)?.label || ''
  )
})

function selectStatus(status) {
  selectedStatus.value = status
  emit('updateStatus', status)
  isOpen.value = false
}
</script>

<style scoped>
.dropdown {
  position: relative;
  width: 160px;
  padding: 12px;
  border-radius: 8px;
  background: linear-gradient(90deg, #4a90e2, #7b61ff);
  color: white;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transition: background 0.3s ease;
}

.dropdown:hover {
  background: linear-gradient(90deg, #7b61ff, #4a90e2);
}

.selected-status {
  font-size: 1rem;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin-top: 8px;
  border-radius: 8px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  overflow: hidden;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-item {
  padding: 12px;
  font-size: 0.9rem;
  color: #333;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.dropdown-item:hover {
  background-color: #4a90e2;
  color: white;
}

.dropdown-item.active {
  background-color: #7b61ff;
  color: white;
}
</style>
