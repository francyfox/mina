<script setup>
import { onMounted, ref, watch } from 'vue';
import { initMap } from '@/module/map/map.init';
import { customDraw, drawTypes } from '@/module/draw/draw';
import MetaModal from '@/components/MetaModal.vue';
import MapElementModal from '@/components/MapElementModal.vue';
import MapHistory from '@/components/MapHistory.vue'

const drawType = ref('Polygon')
const drawRef = ref()
const layer = ref()
const layersOptions = ref()

const showMetaModal = ref(false)
const showMapElementModal = ref(false)

const undo = () => {
  drawRef.value.removeLastPoint();
}

onMounted(() => {
  const { map, source } = initMap()
})
</script>

<template>
  <div id="map" class="map">
    <map-history :data="['test']" />
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