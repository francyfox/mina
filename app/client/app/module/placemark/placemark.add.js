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
               <button class="sm" name="remove" type="button" >Удалить</button>\
               <button class="sm" type="submit" >Сохранить</button>\
               <button class="sm" name="share" type="button" ><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59c-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0c-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606c.648 17.722 3.826 35.527 9.69 52.721c1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96c28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83c-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37c-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569c-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51c27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612c5.864 17.194 9.042 34.999 9.69 52.721c.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z" fill="currentColor"></path></svg></button>\
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


    document.querySelector('button[name="share"]').addEventListener('click', () => {
      const url = new URL('https://yandex.ru/maps/')
      const [y, x] = placemark.geometry._coordinates
      url.searchParams.append('pt', `${x.toFixed(6)},${y.toFixed(6)}`)
      url.searchParams.append('z', '18')
      url.searchParams.append('l', 'sat')

      const link = document.createElement('a')
      link.href = url.toString()
      link.setAttribute('target', '_blank')
      link.click()
      link.remove()
    })

    document.querySelector('button[name="remove"]').addEventListener('click', async () => {
      map.geoObjects.remove(placemark)
      document.getElementById('menu').remove();

      document.querySelector('.sync').style.visibility = 'visible'
      try {
        await removeFeature(placemark.properties.get('id'))
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
      })

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