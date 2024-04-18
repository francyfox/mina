<template>
  <form>
    <fieldset>
      <label for="checkbox">Draw Mode Enabled</label>
      <input type="checkbox" id="checkbox" v-model="drawEnable" />
    </fieldset>
    <fieldset>
      <label for="type">Geometry Type</label>
      <select id="type" class="select-default" v-model="drawType">
        <option value="Point">Point</option>
        <option value="LineString">LineString</option>
        <option value="Polygon">Polygon</option>
        <option value="Circle">Circle</option>
      </select>
    </fieldset>
  </form>

  <ol-map
      :loadTilesWhileAnimating="true"
      :loadTilesWhileInteracting="true"
      :controls="[]"
      style="height: 700px"
  >
    <ol-view
        ref="view"
        :center="center"
        :zoom="zoom"
        :projection="projection"
    />

    <ol-tile-layer ref="jawgLayer" title="JAWG">
      <ol-source-xyz
          crossOrigin="anonymous"
          url="https://c.tile.jawg.io/jawg-dark/{z}/{x}/{y}.png?access-token=87PWIbRaZAGNmYDjlYsLkeTVJpQeCfl2Y61mcHopxXqSdxXExoTLEv7dwqBwSWuJ"
      />
    </ol-tile-layer>

    <ol-tile-layer>
      <ol-source-tile-arcgis-rest
          ref="arcgisLayer"
          :url="arcgisUrl"
          :tileSize="[1024, 1024]"
          :params="requestParams"
      />
    </ol-tile-layer>

    <ol-tile-layer ref="osmLayer" title="OSM">
      <ol-source-osm />
    </ol-tile-layer>

    <ol-vector-layer>
      <ol-source-vector :projection="projection">
        <ol-interaction-draw
            v-if="drawEnable"
            :type="drawType"
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
        <ol-style-fill color="rgba(255,255,255,0.1)"></ol-style-fill>
        <ol-style-circle :radius="7">
          <ol-style-fill color="red"></ol-style-fill>
        </ol-style-circle>
      </ol-style>
    </ol-vector-layer>

    <ol-layerswitcherimage-control v-if="layerList.length > 0" />
    <ol-mouseposition-control />
    <ol-fullscreen-control />
  </ol-map>
</template>

<script setup>
import { ref } from 'vue';
import { olMapData } from '@/module/map/map.data'

const center = ref(olMapData.center);
const projection = ref(olMapData.projection);
const zoom = ref(olMapData.zoom);

const drawEnable = ref(true);
const drawType = ref('Polygon');

const layerList = ref([]);
const jawgLayer = ref(null);
const osmLayer = ref(null);
const arcgisLayer = ref(null);

const arcgisUrl =
    "https://services.wvgis.wvu.edu/arcgis/rest/services/Imagery_BaseMaps_EarthCover/wv_imagery_WVGISTC_leaf_off_mosaic/MapServer";
const requestParams = {
  layers: "show:30,27,24,23,22",
  format: "PNG32",
  f: "image",
  dpi: 96,
  transparent: true,
  bboxSR: 102100,
  imageSR: 102100,
  size: "1024,1024",
  _ts: false,
};

const drawstart = (event) => {
  console.log(event);
};

const drawend = (event) => {
  console.log(event);
};

// onMounted(() => {
//   layerList.value.push(jawgLayer.value.tileLayer);
//   layerList.value.push(bingLayer.value.tileLayer);
//   layerList.value.push(osmLayer.value.tileLayer);
// });
</script>