import { buttonGEOJSON, buttonMapList, buttonPoint } from '../control/control.button.js'
import { placemarkAdd } from '../placemark/placemark.add.js'
import { getFeatures } from '../db/features/features.service.js'
import { useMapList } from '../map-list/useMapList.js'

export async function mapInit(){
  const map = new ymaps.Map("map", {
    center: [21.42089031185469,39.89985412245573],
    zoom: 19,
    controls: ['zoomControl', 'typeSelector'],
    type: 'yandex#satellite'
  });

  const objectManager = new ymaps.ObjectManager()

  const point = buttonPoint(map)
  const mapList = buttonMapList()
  const geoJSON = buttonGEOJSON(map, objectManager)

  map.controls.add(geoJSON)
  map.controls.add(point)
  map.controls.add(mapList)

  try {
    const features = await getFeatures()

    for (const feature of features) {
      await placemarkAdd({
        map,
        coords: feature.geometry,
        description: feature.properties,
        preset: feature.properties.preset,
        visible: feature.options.visible
      })
    }

    document.querySelector('.sync').style.visibility = 'hidden'

    useMapList(features, map.geoObjects)
  } catch (e) {
    alert('Не удалось загрузить из БД')
    console.error(e)
  }
}