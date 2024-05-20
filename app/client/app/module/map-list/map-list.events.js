import { updateFeature, updateManyFeatures } from '../db/features/features.service.js'
import { getPlacemarkById } from '../../utils.js'

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
export const toggleVisibilityMapItem = async ({ id = '', value, geoObjects }) => {
  const placemark = getPlacemarkById(id, geoObjects)
  placemark.setOptions('visible', value)
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

export const toggleVisibilityMapItems = async ({ items, geoObjects }) => {
  const queryDataItems = items.map((i) => {
    const { id, value } = i
    const placemark = getPlacemarkById(id, geoObjects)
    placemark.setOptions('visible', value)

    return {
      id,
      data: {
        options: placemark._objects[0].options.getAll()
      }
    }
  })

  document.querySelector('.sync').style.visibility = 'visible'
  try {
    await updateManyFeatures(queryDataItems)

    document.querySelector('.sync').style.visibility = 'hidden'
  } catch (e) {
    alert('Не удалось записать параметр точки')
    console.error(e)
  }
}

export const onMapListItemCheck = async ({ e, shadow, geoObjects }) => {
  const checkboxes = shadow.querySelectorAll('.map-list-item.active .checkbox-eye input')
  const value = e.target.checked
  const items = [...checkboxes].map(i => {
    i.checked = value
    return {
      id: i.dataset.id,
      value
    }
  })

  await toggleVisibilityMapItems({ items, geoObjects })
}
