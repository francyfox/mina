export const transformPresetToColor = (preset) => {
  return preset.replace(/islands#|StretchyIcon/gi, '').toLowerCase()
}

export const getPlacemarkById = (id, geoObjects) => {
  return ymaps.geoQuery(geoObjects).search(`properties.id = "${id}"`)
}