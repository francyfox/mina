import { View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import {
  defaults as defaultInteractions, DragAndDrop, DragRotateAndZoom, Modify, Translate
} from 'ol/interaction'
import Map from 'ol/Map';
import { olMapData } from '@/module/map/map.data';
import { controlBar } from '@/module/control-bar/control-bar.js'
// import CopyPaste from 'ol-ext/interaction/CopyPaste';
import { GeoJSON, KML } from 'ol/format'
import { featureCollection } from '@/module/feature/feature.collection.js'
import { Fill, Stroke, Style } from 'ol/style'
import CircleStyle from 'ol/style/Circle'
import { calculateCenter, styleGeometry } from '@/utils/utils'
import { MultiPoint, Point } from 'ol/geom'
import {
  featureModifyStyle,
  onModifyChanged,
  onModifyEnd,
  onModifyStart
} from '@/module/feature/feature.modify-style.js'
import { never, platformModifierKeyOnly, primaryAction } from 'ol/events/condition'
import { mapDefaultStyle } from '@/module/map/map.style.js'
import { mapElementStyle } from '@/module/map-element/map-element.style.js'
import { createDoors } from '@/module/tent/tent.service.js'
import { pointDoorStyle } from '@/module/tent/tent.style.js'
import { GeometryCollection } from 'ol/geom'
// import { createIconGeometry } from '@/module/area/area.service.js'
// import { pointIconStyle } from '@/module/area/area.style.js'
import {FullScreen, defaults as defaultControls} from 'ol/control';


export const initMap = (features = []) => {
  const raster = new TileLayer({
    source: new OSM(), //new OSM()
  });

  const source = new VectorSource({
    wrapX: false,
    features: new GeoJSON().readFeatures(featureCollection(features))
  });

  const style = new Style(mapDefaultStyle());

  const vector = new VectorLayer({
    source: source,
    style: function (feature) {
      const data = feature.getProperties()
      let styles = [style];
      const modifyGeometry = feature.get('modifyGeometry');
      const geometry = modifyGeometry
        ? modifyGeometry.geometry
        : feature.getGeometry();
      const result = calculateCenter(geometry);
      const center = result.center;

      // START

      if (data.type === 'tent') {
        const doors = createDoors(feature, data.doorPositions)

        if (doors) {
          const featureStyles = {
            'Polygon': new Style(mapElementStyle(data)),
            'Point': new Style(pointDoorStyle())
          }
          feature.setGeometry(new GeometryCollection([...doors, feature.getGeometry()]))
          styles = [...styles, ...styleGeometry(featureStyles, feature)]
          // styles.push(styleGeometry(featureStyles, feature))
        }
      } else if (data.type === 'area') {
        // const iconGeometry = createIconGeometry(feature.flatCoordinates)
        // const iconStyle = new Style(pointIconStyle(iconGeometry, data))
        // feature.setGeometry(new GeometryCollection([feature.getGeometry(), iconGeometry]))
        // lastFeature.value[0].setStyle()
      }
      // END

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

  // const translate = new Translate({
  //   condition: function (event) {
  //     return primaryAction(event) && platformModifierKeyOnly(event);
  //   },
  //   layers: [vector],
  // });

  // TODO: copyPaste not working
  // const copyPaste = new CopyPaste()
  // const dragRotateZoom =  new DragRotateAndZoom()
  // const bar = controlBar(vector)
  const dragAndDropInteraction = new DragAndDrop({
    formatConstructors: [
      GeoJSON,
      // use constructed format to set options
      new KML({ extractStyles: true }),
    ],
  });

  dragAndDropInteraction.on('addfeatures', function (event) {
    const vectorSource = new VectorSource({
      features: event.features,
    });
    map.addLayer(
      new VectorLayer({
        source: vectorSource,
      }),
    );
    map.getView().fit(vectorSource.getExtent());
  });

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
  modify.on('change', onModifyChanged)

  const map = new Map({
    interactions: defaultInteractions().extend([dragAndDropInteraction]), //copyPaste, dragRotateZoom, modify, translate,
    layers: [raster, vector],
    target: 'map',
    view: new View(olMapData),
    controls: defaultControls().extend([new FullScreen()]),
    // controls: [ bar ]
  });

  return {
    map,
    source,
    vector,
    modify
  }
}
