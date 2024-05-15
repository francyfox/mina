export const placemarkAdd = (
  map,
  coords,
  description = {
    iconContent: 'текст',
    hintContent: '',
    balloonContent: '',
  }
) => {
  const placemark = new ymaps.Placemark(coords, description, {
    preset: 'islands#darkOrangeStretchyIcon',
    draggable: true
  });

  placemark.events.add('contextmenu', (e) => {
    const menu = document.getElementById('menu')

    if (menu) {
      menu.remove()
    } else {
      const menuContent = document.createElement('div')
      menuContent.id = 'menu'
      menuContent.innerHTML = '<ul id="menu_list" xmlns="http://www.w3.org/1999/html">\
                      <li>Номер палатки: <br /> <input type="text" name="icon_text" /></li>\
                      <li>Подсказка: <br /> <input type="text" name="hint_text" /></li>\
                      <li>Описание: <br /> <input type="text" name="balloon_text" /></li>\
                  </ul>\
               <div style="display: flex; gap: 10px;">\
               <button name="remove" type="button" >Удалить</button>\
               <button type="submit" >Сохранить</button>\
               </div>';


      document.body.append(menuContent)

      console.log(e.get('pagePixels')[0])

      document.getElementById('menu').style.left = `${e.get('pagePixels')[0]}px`
      document.getElementById('menu').style.top = `${e.get('pagePixels')[1]}px`

      const iconText = document.getElementById('menu').querySelector('input[name="icon_text"]')
      const hintText = document.getElementById('menu').querySelector('input[name="hint_text"]')
      const balloonText = document.getElementById('menu').querySelector('input[name="balloon_text"]')

      iconText.value = placemark.properties.get('iconContent')
      hintText.value = placemark.properties.get('hintContent')
      balloonText.value = placemark.properties.get('balloonContent')

      document.querySelector('button[name="remove"]').addEventListener('click', () => {
        map.geoObjects.remove(placemark)
        document.getElementById('menu').remove();
      })

      document.getElementById('menu').querySelector('button[type="submit"]').addEventListener('click', () => {
        placemark.properties.set({
          iconContent: iconText.value,
          hintContent: hintText.value,
          balloonContent: balloonText.value
        });

        document.getElementById('menu').remove();
      })
    }
  })

  map.geoObjects.add(placemark)
}