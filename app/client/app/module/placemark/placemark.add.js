import { addFeature, removeFeature, updateFeature } from '../db/features/features.service.js'
import { nanoid } from 'nanoid'

export const togglePointMenu = ({ e, placemark, map}) => {
  const menu = document.getElementById('menu')

  if (menu) {
    menu.remove()
  } else {
    const menuContent = document.createElement('div')
    menuContent.id = 'menu'
    menuContent.innerHTML = '<ul id="menu_list">\
                      <li>Номер палатки: <br /> <input type="text" name="icon_text" /></li>\
                      <li>Подсказка: <br /> <input type="text" name="hint_text" /></li>\
                      <li>Описание: <br /> <input type="text" name="balloon_text" /></li>\
                      <li>Кв. м: <br /> <input type="number" name="square_number" /></li>\
                      <li>Кол-во: <br /> <input type="number" name="count_number" /></li>\
                      <li>Цвет: <br /> \
                      <select name="color">\
                      <option value="islands#blueStretchyIcon" style="background: blue">Голубой</option> \
                      <option value="islands#redStretchyIcon" style="background: red">Красный</option> \
                      <option value="islands#greenStretchyIcon" style="background: green">Зеленый</option> \
                      <option value="islands#pinkStretchyIcon" style="background: pink">Розовый</option> \
                      <option value="islands#grayStretchyIcon" style="background: grey">Серый</option> \
                      <option value="islands#brownStretchyIcon" style="background: brown">Коричневый</option> \
                      <option value="islands#darkOrangeStretchyIcon" style="background: darkorange">Оранжевый</option> \
                      </select>\
                      </li>\
                  </ul>\
               <div style="display: flex; gap: 10px;">\
               <button name="remove" type="button" >Удалить</button>\
               <button type="submit" >Сохранить</button>\
               </div>';


    document.body.append(menuContent)

    document.getElementById('menu').style.left = `${e.get('position')[0]}px`
    document.getElementById('menu').style.top = `${e.get('position')[1]}px`

    const iconText = document.getElementById('menu').querySelector('input[name="icon_text"]')
    const hintText = document.getElementById('menu').querySelector('input[name="hint_text"]')
    const balloonText = document.getElementById('menu').querySelector('input[name="balloon_text"]')
    const color = document.getElementById('menu').querySelector('select[name="color"]')
    const square = document.getElementById('menu').querySelector('input[name="square_number"]')
    const count = document.getElementById('menu').querySelector('input[name="count_number"]')

    iconText.value = placemark.properties.get('iconContent')
    hintText.value = placemark.properties.get('hintContent')
    balloonText.value = placemark.properties.get('balloonContent')
    color.value = placemark.options.get('preset')
    square.value = placemark.properties.get('square')
    count.value = placemark.properties.get('count')

    document.querySelector('button[name="remove"]').addEventListener('click', () => {
      map.geoObjects.remove(placemark)
      document.getElementById('menu').remove();

      document.querySelector('.sync').style.visibility = 'visible'
      try {
        console.log(placemark.properties.get('id'))
        removeFeature(placemark.properties.get('id'))
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
        preset: color.value
      });

      placemark.options.set({
        preset: color.value
      })

      document.getElementById('menu').remove();
      document.querySelector('.sync').style.visibility = 'visible'
      try {
        await updateFeature(placemark.properties.get('id'), {
          options: placemark.options.getAll(),
          properties: {
            ...placemark.properties.getAll(),
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
export const placemarkAdd = async (
  {
    map,
    coords,
    description = {
      id: nanoid(),
      iconContent: 'текст',
      hintContent: '',
      balloonContent: '',
    },
    preset = 'islands#darkOrangeStretchyIcon',
  },
  showPopup = false,
  addToDb = false
) => {
  const placemark = new ymaps.Placemark(coords, description, {
    preset,
    draggable: true
  })

  placemark.events.add('contextmenu', (e) => togglePointMenu({e, placemark, map}))
  placemark.events.add('dragend', async (e) => {

    document.querySelector('.sync').style.visibility = 'visible'
    try {
      await updateFeature(placemark.properties.get('id'), {
        geometry: {
          type: 'Point',
          coordinates: placemark.geometry._coordinates
        }
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
    document.querySelector('.sync').style.visibility = 'visible'
    try {
      await addFeature({
        id: placemark.properties.get('id'),
        type: 'Feature',
        options: placemark.options.getAll(),
        geometry: { type: 'Point', coordinates: placemark.geometry._coordinates },
        properties: {
          ...placemark.properties.getAll(),
        }
      })
      document.querySelector('.sync').style.visibility = 'hidden'
    } catch (e) {
      alert('Не удалось добавить маркер ')
      console.error(e)
    }

  }
}