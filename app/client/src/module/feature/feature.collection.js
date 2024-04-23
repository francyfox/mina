import { Fill, Stroke, Style } from 'ol/style.js';
import { GeoJSON } from 'ol/format';

export const featureCollection = (features) => {
  return {
    type: "FeatureCollection",
    crs: {
      type: "name",
      properties: {
        name: "EPSG:4326",
      },
    },
    features
  }
}

export const featuresJSON = (features) => {
  return new GeoJSON().writeFeatures(features)
}

export const featuresStyles = {
  'Polygon': new Style({
    stroke: new Stroke({
      color: 'blue',
      lineDash: [4],
      width: 3,
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)',
    }),
  }),
}