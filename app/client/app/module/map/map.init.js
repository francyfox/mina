import { buttonPoint } from '../control/control.button.js'
import { placemarkAdd } from '../placemark/placemark.add.js'
import { getFeatures } from '../db/features/features.service.js'

export async function mapInit(){
  const map = new ymaps.Map("map", {
    center: [21.42089031185469,39.89985412245573],
    zoom: 19,
    controls: ['zoomControl', 'searchControl', 'typeSelector'],
    type: 'yandex#satellite'
  });
  const objectManager = new ymaps.ObjectManager()

  const point = buttonPoint(map)
  map.controls.add(point)

  try {
    const features = await getFeatures()

    for (const feature of features) {
      const geometry =
        await placemarkAdd({
          map,
          coords: feature.geometry,
          description: feature.properties,
          preset: feature.properties.preset
        })
    }

    document.querySelector('.sync').style.visibility = 'hidden'
  } catch (e) {
    alert('Не удалось загрузить из БД')
    console.error(e)
  }
}