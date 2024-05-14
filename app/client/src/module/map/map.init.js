import { View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import XYZ from 'ol/source/XYZ';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { createXYZ } from 'ol/tilegrid'
import {
  defaults as defaultInteractions, DragAndDrop, DragBox, DragRotateAndZoom, Modify, Translate
} from 'ol/interaction'
import Map from 'ol/Map';
import { olMapData } from '@/module/map/map.data';
import { controlBar } from '@/module/control-bar/control-bar.js'
import CopyPaste from 'ol-ext/interaction/CopyPaste';
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
import { never, platformModifierKeyOnly, primaryAction, shiftKeyOnly } from 'ol/events/condition'
import { buildersStyle, createTextStyle, mapDefaultStyle } from '@/module/map/map.style.js'
import { mapElementStyle } from '@/module/map-element/map-element.style.js'
import { createDoors } from '@/module/tent/tent.service.js'
import { pointDoorStyle } from '@/module/tent/tent.style.js'
import { GeometryCollection } from 'ol/geom'
// import { createIconGeometry } from '@/module/area/area.service.js'
// import { pointIconStyle } from '@/module/area/area.style.js'
import {FullScreen, defaults as defaultControls } from 'ol/control';
import LayerSwitcherImage from 'ol-ext/control/LayerSwitcherImage'
import proj4 from 'proj4';
import { getPermalinkParams, onPopStateChangePermalink, updatePermalink } from '@/module/map/map.permalink.js'
import Select from 'ol/interaction/Select'


export const initMap = (features = []) => {
  window.openSansAdded = false;

  const layerGoogleHybrid = new TileLayer({
    title: 'Google Hybrid',
    source: new XYZ({
      url: 'http://mt{0-3}.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga',
      projection: 'EPSG:3395',
      tileGrid: createXYZ({
        extent: [-20037508.342789244, -20037508.342789244, 20037508.342789244, 20037508.342789244]
      })
    }),
  });

  const layerGoogleVector = new TileLayer({
    title: 'Google',
    visible: false,
    source: new XYZ({
      url: 'http://mt{0-3}.google.com/vt/lyrs=m@129&hl=en&x={x}&y={y}&z={z}&s=Ga',
      projection: 'EPSG:3395',
      tileGrid: createXYZ({
        extent: [-20037508.342789244, -20037508.342789244, 20037508.342789244, 20037508.342789244]
      })
    }),
  });

  const layerOSM = new TileLayer({
    title: "OSM",
    baseLayer: false,
    source: new OSM(), //new OSM()
    visible: false
  });

  const source = new VectorSource({
    wrapX: false,
    features: new GeoJSON().readFeatures(featureCollection(features))
  });

  const style = new Style(mapDefaultStyle());

  const vector = new VectorLayer({
    title: 'Draw Source',
    source: source,
    attributions: [ "&copy; <a href='https://data.culture.gouv.fr/explore/dataset/fonds-de-la-guerre-14-18-extrait-de-la-base-memoire'>data.culture.gouv.fr</a>" ],
    logo:"https://www.data.gouv.fr/s/avatars/37/e56718abd4465985ddde68b33be1ef.jpg",
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

  const vectorBuilds = new VectorLayer({
    source: new VectorSource({
      url: '/marwa_building.kml',
      format: new KML({
        extractStyles: false,
        extractAttributes: true
      }),
    }),
    style: (feature, resolution) => new Style(buildersStyle(feature, resolution))
  })

  const vectorFire = new VectorLayer({
    source: new VectorSource({
      url: '/marwa_fire.kml',
      format: new KML({ extractStyles: true })
    }),
  })

  const vectorToilets = new VectorLayer({
    source: new VectorSource({
      url: '/marwa_toilets.kml',
      format: new KML({ extractStyles: true })
    }),
  })

  const vectorHealth = new VectorLayer({
    source: new VectorSource({
      url: '/marwa_health.kml',
      format: new KML({ extractStyles: true })
    }),
  })


  const select = new Select()
  const selectedFeatures = select.getFeatures()
  const dragBox = new DragBox({
    condition: shiftKeyOnly,
    style: new Style({
      stroke: new Stroke({
        color: [0, 0, 255, 1]
      })
    })
  })



  dragBox.on('boxend', function(e) {
    const extent = dragBox.getGeometry().getExtent();
    source.forEachFeatureIntersectingExtent(extent, function(feature) {
      console.log(feature)
      selectedFeatures.push(feature)
    })
  })

  dragBox.on('boxstart', function(e) {
    selectedFeatures.clear();
  })


  const translate = new Translate({
    condition: function (event) {
      return primaryAction(event) && platformModifierKeyOnly(event);
    },
    layers: [vector],
  });

  const dragRotateZoom =  new DragRotateAndZoom()
  const bar = controlBar(vector)
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

  // proj4.defs('EPSG:3395', '+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs');

  const mapParams = getPermalinkParams(olMapData.zoom, olMapData.center, 0)
  const map = new Map({
    interactions: defaultInteractions().extend([dragAndDropInteraction, dragRotateZoom, modify, translate, dragBox]),
    layers: [
      layerOSM,
      layerGoogleVector,
      layerGoogleHybrid,
      vector,
      vectorBuilds,
      vectorToilets,
    ],
    target: 'map',
    view: new View({
      ...mapParams,
      projection: olMapData.projection
    }),
    controls: [ bar, new FullScreen(), new LayerSwitcherImage()]
  });

  let shouldUpdate = true
  const view = map.getView()

  updatePermalink(shouldUpdate, view)
  map.on('moveend', () => updatePermalink(shouldUpdate, view))
  map.on('click', function() {
    selectedFeatures.clear();
  })

  onPopStateChangePermalink(shouldUpdate)

  return {
    map,
    source,
    vector,
    modify
  }
}
