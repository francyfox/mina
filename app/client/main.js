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
          draggable: true
        }, {
          preset: 'islands#darkOrangeStretchyIcon'
        });

        placemark.events.add('contextmenu', (e) => {
          const menu = document.getElementById('menu')
          console.log(menu)

          if (menu) {
            menu.remove()
          } else {
            const menuContent = document.createElement('div')
            menuContent.id = 'menu'
            menuContent.innerHTML = '<ul id="menu_list">\
                      <li>Name: <br /> <input type="text" name="icon_text" /></li>\
                      <li>Hint: <br /> <input type="text" name="hint_text" /></li>\
                      <li>Balloon: <br /> <input type="text" name="balloon_text" /></li>\
                  </ul>\
              <div align="center"><input type="submit" value="Save" /></div> ';


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

            document.getElementById('menu').querySelector('input[type="submit"]').addEventListener('click', () => {
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

function init(){
  console.log(ymaps.control)

  const map = new ymaps.Map("map", {
    center: [21.42089031185469,39.89985412245573],
    zoom: 19,
    controls: ['zoomControl', 'searchControl', 'typeSelector']
  });

  const button = buttonPoint(map)
  map.controls.add(button)
}

