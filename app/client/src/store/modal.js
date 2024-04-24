import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useModalStore = defineStore('modal', () => {
  const showMetaModal = ref(false)
  const showMapElementModal = ref(false)
  const showEraseLayerModal = ref(false)

  return {
    showMetaModal,
    showMapElementModal,
    showEraseLayerModal
  }
})