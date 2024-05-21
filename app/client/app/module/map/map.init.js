import { buttonGEOJSON, buttonMapList, buttonPoint } from '../control/control.button.js'
import { placemarkAdd } from '../placemark/placemark.add.js'
import { getFeatures } from '../db/features/features.service.js'
import { useMapList } from '../map-list/useMapList.js'
import { useCounters } from '@/module/map-list/useCounters.js'

export async function mapInit() {
  const queryString = window.location.hash;
  const urlParams = new URLSearchParams(queryString);

  const center = urlParams.get('ll')?.split(',')?.map(i => parseFloat(i)) || [21.42089031185469, 39.89985412245573]
  const zoom = parseInt(urlParams.get('z')) || 19
  const isAdmin = urlParams.get('admin')

  const map = new ymaps.Map('map', {
    center,
    zoom,
    controls: ['zoomControl', 'typeSelector'],
    type: 'yandex#satellite'
  })

  const objectManager = new ymaps.ObjectManager()

  if (isAdmin) {
    const point = buttonPoint(map)
    const mapList = buttonMapList()
    const geoJSON = buttonGEOJSON(map, objectManager)

    map.controls.add(geoJSON)
    map.controls.add(point)
    map.controls.add(mapList)
  }

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
    useCounters(map.geoObjects)

    if (isAdmin) {
      document.querySelector('.map-list').style.display = 'flex'
    }

    map.events.add('boundschange', function (e) {
      const queryString = window.location.hash;
      const urlParams = new URLSearchParams(queryString);
      const isAdmin = urlParams.get('admin')

      const centerURL = e.get('newCenter')
      const zoomURL = e.get('newZoom')

      window.location.hash = `${isAdmin ? '&admin=true' : ''}&ll=${centerURL.toString()}&z=${zoomURL.toString()}`
    })
  } catch (e) {
    alert('Не удалось загрузить из БД')
    console.error(e)
  }
}
