<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { initMap } from '@/module/map/map.init';
import { customDraw } from '@/module/draw/draw';


const drawType = ref('Polygon')

onMounted(() => {
  const { map, vector, source } = initMap()
  map.addInteraction(customDraw(drawType.value))
})
</script>

<template>
  <div class="editor">

  </div>
  <div id="map" class="map"></div>
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
  width: 100%;
  height: 600px
}
</style>