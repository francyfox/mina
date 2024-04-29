import { View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import {
  defaults as defaultInteractions, DragRotateAndZoom, Modify, Translate
} from 'ol/interaction'
import Map from 'ol/Map';
import { olMapData } from '@/module/map/map.data';
import { controlBar } from '@/module/control-bar/control-bar.js'
import CopyPaste from 'ol-ext/interaction/CopyPaste';
import { GeoJSON } from 'ol/format'
import { featureCollection } from '@/module/feature/feature.collection.js'
import { Fill, Stroke, Style } from 'ol/style'
import CircleStyle from 'ol/style/Circle'
import { calculateCenter } from '@/utils/utils'
import { MultiPoint, Point } from 'ol/geom'
import { featureModifyStyle, onModifyEnd, onModifyStart } from '@/module/feature/feature.modify-style.js'
import { never, platformModifierKeyOnly, primaryAction } from 'ol/events/condition'


export const initMap = (features = []) => {
  const raster = new TileLayer({
    source: new OSM(),
  });

  const source = new VectorSource({
    wrapX: false,
    features: new GeoJSON().readFeatures(featureCollection(features))
  });

  const style = new Style({
    geometry: function (feature) {
      const modifyGeometry = feature.get('modifyGeometry');
      return modifyGeometry ? modifyGeometry.geometry : feature.getGeometry();
    },
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0.2)',
    }),
    stroke: new Stroke({
      color: '#ffcc33',
      width: 2,
    }),
    image: new CircleStyle({
      radius: 7,
      fill: new Fill({
        color: '#ffcc33',
      }),
    }),
  });

  const vector = new VectorLayer({
    source: source,
    style: function (feature) {
      const styles = [style];
      const modifyGeometry = feature.get('modifyGeometry');
      const geometry = modifyGeometry
        ? modifyGeometry.geometry
        : feature.getGeometry();
      const result = calculateCenter(geometry);
      const center = result.center;
      if (center) {
        styles.push(
          new Style({
            geometry: new Point(center),
            image: new CircleStyle({
              radius: 4,
              fill: new Fill({
                color: '#ff3333',
              }),
            }),
          }),
        );
        const coordinates = result.coordinates;
        if (coordinates) {
          const minRadius = result.minRadius;
          const sqDistances = result.sqDistances;
          const rsq = minRadius * minRadius;
          const points = coordinates.filter(function (coordinate, index) {
            return sqDistances[index] > rsq;
          });
          styles.push(
            new Style({
              geometry: new MultiPoint(points),
              image: new CircleStyle({
                radius: 4,
                fill: new Fill({
                  color: '#33cc33',
                }),
              }),
            }),
          );
        }
      }
      return styles;
    },
  });


  // const select = new Select();

  const translate = new Translate({
    condition: function (event) {
      return primaryAction(event) && platformModifierKeyOnly(event);
    },
    layers: [vector],
  });

  // TODO: copyPaste not working
  const copyPaste = new CopyPaste()
  const dragRotateZoom =  new DragRotateAndZoom()
  const bar = controlBar(vector)

  const defaultStyle = new Modify({source: source})
    .getOverlay()
    .getStyleFunction();

  const modify = new Modify({
    source: source,
    condition: function (event) {
      return primaryAction(event) && !platformModifierKeyOnly(event);
    },
    deleteCondition: never,
    insertVertexCondition: never,
    style: (feature) => featureModifyStyle(defaultStyle, feature)
  });

  modify.on('modifystart', onModifyStart)
  modify.on('modifyend', onModifyEnd)

  const map = new Map({
    interactions: defaultInteractions().extend([copyPaste, dragRotateZoom, modify, translate]),
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
