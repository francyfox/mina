<script setup>
import { onMounted, ref, watch } from 'vue';
import { initMap } from '@/module/map/map.init';
import MetaModal from '@/components/MetaModal.vue';
import MapElementModal from '@/components/MapElementModal.vue';
import MapHistory from '@/components/MapHistory.vue'
import { useModalStore } from '@/store/modal.js'
import { storeToRefs } from 'pinia'

const mapRef = ref()
const modalStore = useModalStore()
const { showMetaModal, showMapElementModal } = storeToRefs(modalStore)

onMounted(() => {
  const { map, source } = initMap()
})
</script>

<template>
  <div ref="mapRef" id="map" class="map">
    <map-history :data="['test']" />

    <n-modal v-model:show="showMetaModal">
      <meta-modal code="ss" />
    </n-modal>
  </div>
</template>

<style lang="scss">
.editor {
  padding: 1em;
  background: #fbf6f2;
}

.position {
  position: relative;
  left: 200px;
  width: 300px;
  display: block;
  padding: 0.5em;
  background: rgba(19, 57, 108, 0.78);
}

.map {
  position: relative;
  width: 100%;
  height: 600px;
}

.ol-control.ol-bar:not(.ol-group) {
  display: flex !important;
  gap: 3em;
}

.bar {
  &-button {
    &.empty {
      pointer-events: none !important;
      opacity: 0;
    }

    button {
      padding: 0.2em !important;
      width: auto !important;
      height: auto !important;
      transition: background-color .1s ease-in-out;
    }

    svg {
      width: 38px;
      height: 38px;
    }
  }
}
</style>