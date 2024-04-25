import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
export const useStackStore = defineStore('stack', () => {
  const historyStack = ref([])
  const lastFeature = computed(() => historyStack.value.slice(-1))

  return {
    lastFeature,
    historyStack
  }
})