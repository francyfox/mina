<script setup>
import { onMounted, ref, watch } from 'vue';
import { initMap } from '@/module/map/map.init';
import MetaModal from '@/components/MetaModal.vue';
import MapElementModal from '@/components/MapElementModal.vue';
import MapHistory from '@/components/MapHistory.vue'
import { useModalStore } from '@/store/modal.js'
import { useStackStore } from '@/store/stack.js'
import { storeToRefs } from 'pinia'
import { GeoJSON } from 'ol/format'
import { MapStorage } from '@/module/map-storage/map-storage.js'
import { useNotification } from 'naive-ui'
import EraseLayerModal from '@/components/EraseLayerModal.vue'
import { Style, Stroke, Text, Fill } from 'ol/style'
import { mapElementStyle } from '@/module/map-element/map-element.style.js'

const modalStore = useModalStore()
const { showMetaModal, showMapElementModal, showEraseLayerModal } = storeToRefs(modalStore)

const stackStore = useStackStore();
const { historyStack, lastFeature } = storeToRefs(stackStore);

const map = ref();
const mapRef = ref();
const featuresJSON = ref('');
const currentLayer = ref('');
const mapStorage = ref();

const notification = useNotification();
window.notification = notification;

const importLayerJSON = (json) => {
  mapRef.value.innerHTML = '';
  map.value = initMap(json.features);
}

const eraseLayerData = () => {
  mapStorage.value.setStore({});
  showEraseLayerModal.value = false;
  notification.success({
    title: 'Данные удалены',
    duration: 1000
  });
}

const addMapItem = (data) => {
  const style = new Style(mapElementStyle(data))
  showMapElementModal.value  = false
  lastFeature.value[0].setProperties(data)
  lastFeature.value[0].setId(data.id)
  lastFeature.value[0].setStyle(style)

  notification.success({
    title: 'Добавлен',
    duration: 3000
  })
}

const removeMapItem = () => {
  showMapElementModal.value  = false
  notification.success({
    title: 'Успешно',
    content: 'Элемент удален',
    duration: 3000
  })
}

onMounted(() => {
  mapStorage.value = new MapStorage();
  map.value = initMap();

  map.value.source.addEventListener('addfeature', (event) => {
    historyStack.value.push(event.feature);
    showMapElementModal.value = true;
  })

  watch(showMetaModal, () => {
    featuresJSON.value = JSON.stringify(JSON.parse(new GeoJSON().writeFeatures(map.value.vector.getSource().getFeatures())), null, 2)
  })
})
</script>

<template>
  <div ref="mapRef" id="map" class="map">
    <map-history :data="['test']" />

    <n-modal v-model:show="showMetaModal">
      <meta-modal :code="featuresJSON"
                  @import="importLayerJSON"
      />
    </n-modal>

    <n-modal v-model:show="showEraseLayerModal">
      <erase-layer-modal @confirm="eraseLayerData" />
    </n-modal>

    <n-modal v-model:show="showMapElementModal">
      <map-element-modal @confirm="addMapItem"
                         @cancel="removeMapItem"
      />
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
  padding: 0.4em;
  display: flex !important;
  gap: 3em;
  background: rgba(50, 50, 50, 0.79);
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