import { View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import {
  Select,
  Translate,
  defaults as defaultInteractions, DragRotateAndZoom
} from 'ol/interaction';
import Map from 'ol/Map';
import { olMapData } from '@/module/map/map.data';
import CopyPaste from 'ol-ext/interaction/CopyPaste';
import Tranform from 'ol-ext/interaction/Transform'


export const initMap = () => {
  const raster = new TileLayer({
    source: new OSM(),
  });

  const source = new VectorSource({wrapX: false});
  const vector = new VectorLayer({
    source: source,
  });

  const transform = new Tranform()



  const copyPaste = new CopyPaste({
    destination: vector.getSource(),
    features: transform.getFeatures()
  });

  const select = new Select();

  const translate = new Translate({
    features: select.getFeatures(),
  });

  const dragRotateZoom =  new DragRotateAndZoom()

  const map = new Map({
    interactions: defaultInteractions().extend([transform, copyPaste, dragRotateZoom, copyPaste]),
    layers: [raster, vector],
    target: 'map',
    view: new View(olMapData),
  });

  return {
    map,
    source,
    vector,
  }
}
