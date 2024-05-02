<script setup>
import { onMounted, ref, watch } from 'vue';
import { initMap } from '@/module/map/map.init';
import MetaModal from '@/components/MetaModal.vue';
import MapElementModal from '@/components/MapElementModal.vue';
import MapHistory from '@/components/MapHistory.vue'
import { useModalStore } from '@/store/modal'
import { useStackStore } from '@/store/stack'
import { storeToRefs } from 'pinia'
import { GeoJSON } from 'ol/format'
import { MapStorage } from '@/module/map-storage/map-storage'
import { useNotification } from 'naive-ui'
import EraseLayerModal from '@/components/EraseLayerModal.vue'
import { Style } from 'ol/style'
import { mapElementStyle } from '@/module/map-element/map-element.style'
import MarkerModal from '@/components/MarkerModal.vue'
import { pointStyle } from '@/module/point/point.style'
import { createDoors } from '@/module/tent/tent.service'
import { GeometryCollection } from 'ol/geom'
import { pointIconStyle } from '@/module/area/area.style'
import { createIconGeometry } from '@/module/area/area.service.js'
import { pointDoorStyle } from '@/module/tent/tent.style.js'
import { LayerModel } from '@/module/layer/layer.model.js'
import { MapElementModel } from '@/module/map-element/map-element.model.js'
import { MapModel } from '@/module/map/map.model.js'
import { styleGeometry } from '@/utils/utils.js'

const modalStore = useModalStore()
const { showMetaModal, showMapElementModal, showEraseLayerModal, showMarkerModal } = storeToRefs(modalStore)

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
  mapRef.value.innerHTML = '';
  loadMap();
  showEraseLayerModal.value = false;

  notification.success({
    title: 'Данные удалены',
    duration: 1000
  });
}

const addMapItem = (data) => {
  map.value.modify.dispatchEvent('change')

  showMapElementModal.value = false

  lastFeature.value[0].setProperties(data)
  lastFeature.value[0].setId(data.id)

  // TODO: пока так. Мы теряем методы после сериализации
  const mapStore = mapStorage.value.getStore();
  const mapElement = new MapElementModel({
    layerId: mapStore.currentLayer,
    featureJson: JSON.stringify(JSON.parse(new GeoJSON().writeFeature(lastFeature.value[0]))),
    ...data
  });

  const layer = mapStore.layers[0];
  layer.mapElementCollection.push(mapElement);
  const mapModel = new MapModel(layer.id, [ layer ]);
  mapStorage.value.setStore(mapModel);

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

const markerIcon = (data) => {
  const style = new Style(pointStyle(data));
  lastFeature.value[0].setStyle(style)

  showMarkerModal.value = false;
  notification.success({
    title: 'Добавлен',
    duration: 3000
  })
}

const loadMap = () => {
  mapStorage.value = new MapStorage();
  map.value = initMap();

  map.value.source.addEventListener('addfeature', (event) => {
    const geometry = event.feature.geometryChangeKey_.target.constructor.name
    historyStack.value.push(event.feature);

    if (geometry !== '_Point') {
      showMapElementModal.value = true;
    } else {
      showMarkerModal.value = true;
    }
  })

  watch(showMetaModal, () => {
    featuresJSON.value = JSON.stringify(JSON.parse(new GeoJSON().writeFeatures(map.value.vector.getSource().getFeatures())), null, 2)
  })
}

onMounted(() => {
  loadMap();
})
</script>

<template>
  <div ref="mapRef" id="map" class="map">
<!--    <map-history />-->

<!--    <n-modal v-model:show="showMetaModal">-->
<!--      <meta-modal :code="featuresJSON"-->
<!--                  @import="importLayerJSON"-->
<!--      />-->
<!--    </n-modal>-->

<!--    <n-modal v-model:show="showEraseLayerModal">-->
<!--      <erase-layer-modal @confirm="eraseLayerData" />-->
<!--    </n-modal>-->

<!--    <n-modal v-model:show="showMapElementModal">-->
<!--      <map-element-modal @confirm="addMapItem"-->
<!--                         @cancel="removeMapItem"-->
<!--      />-->
<!--    </n-modal>-->

<!--    <n-modal v-model:show="showMarkerModal">-->
<!--      <marker-modal @confirm="markerIcon" />-->
<!--    </n-modal>-->
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