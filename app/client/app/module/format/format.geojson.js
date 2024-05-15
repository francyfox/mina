import { placemarkAdd } from '../placemark/placemark.add.js'

export const importGEOJSON = (geoJson, objectManager, map) => {
  geoJson.features.forEach(function (obj) {
    placemarkAdd(map, obj.geometry, obj.properties, obj.properties.preset)
  });
}