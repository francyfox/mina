import { buttonGEOJSON, buttonPoint } from '../control/control.button.js'

export function mapInit(){
  const map = new ymaps.Map("map", {
    center: [21.42089031185469,39.89985412245573],
    zoom: 19,
    controls: ['zoomControl', 'searchControl', 'typeSelector'],
    type: 'yandex#satellite'
  });
  const objectManager = new ymaps.ObjectManager()

  const point = buttonPoint(map)
  const geoJson = buttonGEOJSON(map, objectManager)
  map.controls.add(point)
  map.controls.add(geoJson)
}