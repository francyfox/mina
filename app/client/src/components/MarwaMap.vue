<script setup lang="ts">
import { h, onMounted, ref } from 'vue';
import { arcgisRequestParams, arcgisUrl, contextMenu, olMapData } from '@/module/map/map.data'
import { NForm, NFormItem, NButton, NCheckbox, NIcon, NFlex, NSelect, useModal } from 'naive-ui'
import type { Feature } from 'ol';
import type { Geometry } from 'ol/geom';
import { GeoJSON } from 'ol/format';
import { exportMetaFeaturesJSON, featureCollection, featuresStyles } from '@/module/feature/feature.collection';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

const modal = useModal()

const view = ref(null);
const contextMenuItems = contextMenu(view)
const center = ref(olMapData.center);
const projection = ref(olMapData.projection);
const zoom = ref(15);

const currentCenter = ref(center.value);
const currentZoom = ref(zoom.value);
const currentResolution = ref(0);

const zones = ref<Feature<Geometry>[]>([]);
const features = ref([])

const geo = new GeoJSON()
zones.value = geo.readFeatures(featureCollection(features.value));

const styleFunction = (feature) => {
  return featuresStyles[feature.getGeometry().getType()];
};

const vectorSource = new VectorSource({
  features: new GeoJSON().readFeatures(featureCollection(features.value)),
});

const vectorLayer = new VectorLayer({
  source: vectorSource,
  style: styleFunction,
})

const editorPanel = ref({
  enabled: true,
  drawType: 'Point'
})

const layers = ref(null)
const layersOptions = []

const jawgLayer = ref(null);
const arcgisLayer = ref(null);
const layerList = ref([]);

function centerChanged(event) {
  currentCenter.value = event.target.getCenter();
}

function resolutionChanged(event) {
  currentResolution.value = event.target.getResolution();
  currentZoom.value = event.target.getZoom();
}
const drawstart = (event) => {
  console.log(event);
};

const drawend = (event) => {
  console.log(event);
};

const log = (eventType: string, event: unknown) => {
  console.log(eventType, event);
};



const showMetaModal = () => {
  const json = exportMetaFeaturesJSON(vectorLayer)
  console.log(zones.value);
  // modal.create({
  //   title: 'Карта сайта',
  //   content: () => h('pre', { class: 'col' }, JSON.stringify(zones.value, null, 2)),
  //   preset: 'dialog',
  //   class: 'insane-modal',
  // })
}

onMounted(() => {
  layerList.value.push(jawgLayer.value.tileLayer);
  layerList.value.push(arcgisLayer.value.tileLayer);
});
</script>

<template>
  <n-form size="large" class="editor">
    <n-flex>
      <n-flex vertical>
        <n-flex>
          <n-checkbox v-model:checked="editorPanel.enabled">Режим редактирования: </n-checkbox>
        </n-flex>

        <n-flex>
          <n-button :type="editorPanel.drawType === 'Point' ? 'success' : 'default'"
                    @click="editorPanel.drawType = 'Point'"
          >
            Маркер
          </n-button>

          <n-button :type="editorPanel.drawType === 'Polygon' ? 'success' : 'default'"
                    @click="editorPanel.drawType = 'Polygon'">
            Область
          </n-button>

          <n-button :type="editorPanel.drawType === 'Polygon' ? 'success' : 'default'"
                    @click="editorPanel.drawType = 'Polygon'">
            Палатка
          </n-button>

          <n-button>
            Измеритель
          </n-button>

          <n-button @click="showMetaModal">
            Мета данные
          </n-button>
        </n-flex>
      </n-flex>
      <n-select v-model:value="layers" :options="layersOptions" size="large" placeholder="Выберите слой" />
    </n-flex>
  </n-form>

  <ol-map
      :loadTilesWhileAnimating="true"
      :loadTilesWhileInteracting="true"
      style="height: 700px"
      :controls="[]"
  >
    <ol-view
        ref="view"
        :center="center"
        :zoom="zoom"
        :projection="projection"
        @change:center="centerChanged"
        @change:resolution="resolutionChanged"
    />

    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>

    <ol-tile-layer>
      <ol-source-tile-arcgis-rest
          ref="arcgisLayer"
          title="arcgis"
          :url="arcgisUrl"
          :tileSize="[1024, 1024]"
          :params="arcgisRequestParams"
      />
    </ol-tile-layer>

    <ol-tile-layer ref="jawgLayer" title="JAWG">
      <ol-source-xyz
          crossOrigin="anonymous"
          url="https://c.tile.jawg.io/jawg-dark/{z}/{x}/{y}.png?access-token=87PWIbRaZAGNmYDjlYsLkeTVJpQeCfl2Y61mcHopxXqSdxXExoTLEv7dwqBwSWuJ"
      />
    </ol-tile-layer>

    <ol-mouseposition-control className="position" />
    <ol-fullscreen-control />
    <ol-layerswitcherimage-control />
    <ol-context-menu-control :items="contextMenuItems" />
    <ol-printdialog-control />
    <ol-zoom-control zoomInLabel="+" zoomOutLabel="-" />
    <ol-interaction-transform
        @select="log('select', $event)"
        @rotatestart="log('rotatestart', $event)"
        @rotating="log('rotate', $event)"
        @rotateend="log('rotateend', $event)"
        @translatestart="log('translatestart', $event)"
        @translate="log('translate', $event)"
        @translateend="log('translateend', $event)"
        @scalestart="log('scalestart', $event)"
        @scaling="log('scaling', $event)"
        @scaleend="log('scaleend', $event)"
    />

    <ol-vector-layer>
      <ol-source-vector :projection="projection">
        <ol-interaction-draw
            v-if="editorPanel.enabled"
            :type="editorPanel.drawType"
            @drawend="drawend"
            @drawstart="drawstart"
        >
          <ol-style>
            <ol-style-stroke color="blue" :width="2"></ol-style-stroke>
            <ol-style-fill color="rgba(255, 255, 0, 0.4)"></ol-style-fill>
          </ol-style>
        </ol-interaction-draw>
      </ol-source-vector>

      <ol-style>
        <ol-style-stroke color="red" :width="2"></ol-style-stroke>
        <ol-style-fill color="rgba(255,255,255,0.5)"></ol-style-fill>
        <ol-style-circle :radius="7">
          <ol-style-fill color="red"></ol-style-fill>
        </ol-style-circle>
      </ol-style>
    </ol-vector-layer>
  </ol-map>
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
</style>