import { addFeature, removeFeature, updateFeature } from '../db/features/features.service.js'
import { nanoid } from 'nanoid'
import { menuContentTemplate } from '@/module/placemark/placemark.template.js'
import { getPlacemarkAdminURL, getPlacemarkUserURL, getPlacemarkYandexURL } from '@/utils.js'

export const togglePointMenu = ({ e, placemark, map }) => {
  const queryString = window.location.hash
  const urlParams = new URLSearchParams(queryString)
  const menu = document.getElementById('menu')

  if (menu) {
    menu.remove()
  } else {
    const menuContent = document.createElement('div')
    menuContent.id = 'menu'
    menuContent.innerHTML = menuContentTemplate(urlParams.get('admin'), placemark)

    document.body.append(menuContent)

    document.getElementById('menu').style.left = `${e.get('position')[0]}px`
    document.getElementById('menu').style.top = `${e.get('position')[1]}px`

    if (urlParams.get('admin')) {
      const iconText = document.getElementById('menu').querySelector('input[name="icon_text"]')
      const hintText = document.getElementById('menu').querySelector('input[name="hint_text"]')
      const balloonText = document.getElementById('menu').querySelector('input[name="balloon_text"]')
      const color = document.getElementById('menu').querySelector('select[name="color"]')
      const square = document.getElementById('menu').querySelector('input[name="square_number"]')
      const count = document.getElementById('menu').querySelector('input[name="count_number"]')
      const maqtab = document.getElementById('menu').querySelector('input[name="maqtab_text"]')

      iconText.value = placemark.properties.get('iconContent')
      hintText.value = placemark.properties.get('hintContent')
      balloonText.value = placemark.properties.get('balloonContent')
      color.value = placemark.options.get('preset')
      square.value = placemark.properties.get('square')
      count.value = placemark.properties.get('count')
      maqtab.value = placemark.properties.get('maqtab')


      document.querySelector('button[name="share"]').addEventListener('click', () => {
        const link = document.createElement('a')
        link.href = getPlacemarkYandexURL(placemark.geometry._coordinates)
        link.setAttribute('target', '_blank')
        link.click()
        link.remove()
      })

      document.querySelector('button[name="remove"]').addEventListener('click', async () => {
        const id = placemark.properties.get('id')
        map.geoObjects.remove(placemark)
        document.getElementById('menu').remove()

        const event = new CustomEvent('list:remove', { detail: id })
        document.querySelector('.map-list').dispatchEvent(event)
        document.querySelector('.sync').style.visibility = 'visible'
        try {
          await removeFeature(id)
          document.querySelector('.sync').style.visibility = 'hidden'
        } catch (e) {
          alert('Не удалось удалить метку')
          console.error(e)
        }
      })

      document.getElementById('menu').querySelector('button[type="submit"]').addEventListener('click', async () => {
        placemark.properties.set({
          iconContent: iconText.value,
          hintContent: hintText.value,
          balloonContent: balloonText.value,
          square: square.value,
          count: count.value,
          preset: color.value,
          maqtab: maqtab.value,
          yandexMapUrl: getPlacemarkYandexURL(placemark.geometry._coordinates),
          userUrl: getPlacemarkUserURL(placemark.geometry._coordinates),
          adminUrl: getPlacemarkAdminURL(placemark.geometry._coordinates)
        })

        window.localStorage.setItem('maqtab', maqtab.value)

        placemark.options.set({
          preset: color.value
        })

        document.getElementById('menu').remove()
        document.querySelector('.sync').style.visibility = 'visible'
        try {
          await updateFeature(placemark.properties.get('id'), {
            options: placemark.options.getAll(),
            properties: {
              ...placemark.properties.getAll()
            }
          })
          document.querySelector('.sync').style.visibility = 'hidden'
        } catch (e) {
          alert('Не удалось обновить данные по метке')
          console.error(e)
        }
      })
    }
  }
}
export const placemarkAdd = async (
  {
    map,
    coords,
    description = {
      id: nanoid(),
      iconContent: 'текст',
      hintContent: '',
      balloonContent: '',
      maqtab: window.localStorage.getItem('maqtab') || '',
    },
    preset = 'islands#darkOrangeStretchyIcon',
    visible = true
  },
  showPopup = false,
  addToDb = false
) => {
  const placemark = new ymaps.Placemark(coords, description, {
    preset,
    visible,
    draggable: true
  })

  placemark.events.add('contextmenu', (e) => togglePointMenu({ e, placemark, map }))
  placemark.events.add('dragend', async (e) => {

    document.querySelector('.sync').style.visibility = 'visible'
    try {
      placemark.properties.set('adminUrl',  getPlacemarkAdminURL(placemark.geometry._coordinates))
      placemark.properties.set('userUrl',  getPlacemarkUserURL(placemark.geometry._coordinates))
      placemark.properties.set('yandexMapUrl', getPlacemarkYandexURL(placemark.geometry._coordinates))
      await updateFeature(placemark.properties.get('id'), {
        geometry: {
          type: 'Point',
          coordinates: placemark.geometry._coordinates
        },
        properties: placemark.properties.getAll()
      })
      document.querySelector('.sync').style.visibility = 'hidden'
    } catch (e) {
      alert('Не удалось записать перемещение точки в бд')
      console.error(e)
    }
  })

  map.geoObjects.add(placemark)

  if (showPopup) {
    placemark.events.fire('contextmenu', {
      position: window.mousePosition
    })
  }

  if (addToDb) {
    const placemarkData = {
      id: placemark.properties.get('id'),
      type: 'Feature',
      options: placemark.options.getAll(),
      geometry: { type: 'Point', coordinates: placemark.geometry._coordinates },
      properties: {
        ...placemark.properties.getAll()
      }
    }
    const event = new CustomEvent('list:add', { detail: placemarkData })
    document.querySelector('.map-list').dispatchEvent(event)
    document.querySelector('.sync').style.visibility = 'visible'
    try {
      await addFeature(placemarkData)
      document.querySelector('.sync').style.visibility = 'hidden'
    } catch (e) {
      alert('Не удалось добавить маркер ')
      console.error(e)
    }
  }

  return placemark
}
