import { updateFeature } from '../db/features/features.service.js'
export const onMapListSearch = ({ search, shadow }) => {
  for (const item of shadow.querySelectorAll('.map-list-item')) {
    const value = search.value.toLowerCase()
    if (item.querySelector('label').textContent.toLowerCase().includes(value)) {
      item.style.display = ''
    } else {
      item.style.display = 'none'
    }
  }
}

export const toogleVisibilityMapItem = async ({ e, geoObjects }) => {
  const placemark = ymaps.geoQuery(geoObjects).search(`properties.id = "${e.target.dataset.id}"`)
  placemark.setOptions('visible', e.target.checked)
  const id = placemark._objects[0].properties.get('id')
  const options = placemark._objects[0].options.getAll()

  document.querySelector('.sync').style.visibility = 'visible'

  try {
    await updateFeature(id, {
      options
    })
    document.querySelector('.sync').style.visibility = 'hidden'
  } catch (e) {
    alert('Не удалось записать параметр точки')
    console.error(e)
  }
}

export const onMapListItemCheck = async ({ e, geoObjects, shadow }) => {
  if (document.querySelector('.map-list-container').classList.contains('capture-mode')) {
    const checkboxes = shadow.querySelectorAll('.map-list-item.active input[type="checkbox"]')
    const value = e.target.checked

    for (const checkbox of checkboxes) {
      checkbox.checked = value

      await toogleVisibilityMapItem({ e, geoObjects })
    }
  } else {
    await toogleVisibilityMapItem({ e, geoObjects })
  }
}