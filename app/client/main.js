import './style.css'
document.addEventListener('DOMContentLoaded', function(){
  ymaps.ready(init);
});

window.currentButton = ''

const buttonPoint = (map) => {
  const button = new ymaps.control.Button('<b>Метка</b>');
  button.events.add('select', function () {
    window.currentButton = 'point'
    map.events.add('click', (e) => {
      if (window.currentButton === 'point') {
        const coords = e.get('coords')
        const placemark = new ymaps.Placemark(coords, {
          iconContent: 'текст',
          hintContent: '',
          balloonContent: '',
        }, {
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
    })
  })

  return button
}

const buttonGEOJSON = (map, objectManager) => {
  const button = new ymaps.control.Button('<b>GEOJSON</b>');

  button.events.add('click', function () {
    if (document.querySelector('.modal')) {
      document.querySelector('.modal').remove()
    } else {
      const modal = document.createElement('div')
      modal.className = 'modal'
      modal.id = 'geoJson'
      modal.innerHTML = `<form>
       <input name="upload" type="file" />
       <button type="button" name="export">Экспорт</button>
    </form>`

      document.body.append(modal)

      modal.querySelector('button[name="export"]').addEventListener('click', () => {
        modal.remove()
      })

      modal.querySelector('input[name="upload"]').addEventListener('change', (e) => {
        const file = e.target.files[0]
        const reader = new FileReader();

        reader.readAsText(file);

        reader.onload = function() {
          try {
            const json = JSON.parse(reader.result)
            importGEOJSON(json, objectManager, map)
          } catch (e) {
            console.log(e)
            alert('Не удалось импортировать файл')
          }
        };

        reader.onerror = function() {
          console.log(reader.error);
          alert('Не удалось прочитать файл')
        };

        modal.remove()
      })
    }
  })

  return button
}

const importGEOJSON = (geoJson, objectManager, map) => {
  geoJson.features.forEach(function (obj) {
    obj.properties.balloonContent = obj.properties.description;

    if (obj.properties.iconCaption) {
      obj.options = {
        preset: "islands#greenDotIconWithCaption"
      }
    }
  });

  objectManager.add(geoJson);
  map.geoObjects.add(objectManager);
}

function init(){
  console.log(ymaps.control)

  const map = new ymaps.Map("map", {
    center: [21.42089031185469,39.89985412245573],
    zoom: 19,
    controls: ['zoomControl', 'searchControl', 'typeSelector']
  });
  const objectManager = new ymaps.ObjectManager()

  const point = buttonPoint(map)
  const geoJson = buttonGEOJSON(map, objectManager)
  map.controls.add(point)
  map.controls.add(geoJson)
}

