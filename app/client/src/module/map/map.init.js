import { View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import {
  defaults as defaultInteractions, DragRotateAndZoom
} from 'ol/interaction';
import Map from 'ol/Map';
import { olMapData } from '@/module/map/map.data';
import { controlBar } from '@/module/control-bar/control-bar.js'
import CopyPaste from 'ol-ext/interaction/CopyPaste';


export const initMap = () => {
  const raster = new TileLayer({
    source: new OSM(),
  });

  const source = new VectorSource({wrapX: false});
  const vector = new VectorLayer({
    source: source,
  });


  // const select = new Select();

  // const translate = new Translate({
  //   features: select.getFeatures(),
  // });

  // TODO: copyPaste not working
  const copyPaste = new CopyPaste()
  const dragRotateZoom =  new DragRotateAndZoom()
  const bar = controlBar(vector)

  const map = new Map({
    interactions: defaultInteractions().extend([copyPaste, dragRotateZoom]),
    layers: [raster, vector],
    target: 'map',
    view: new View(olMapData),
    controls: [ bar ]
  });

  return {
    map,
    source,
    vector,
  }
}
