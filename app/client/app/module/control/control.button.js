import { nanoid } from 'nanoid'
import { importGEOJSON } from '../format/format.geojson.js'
import { placemarkAdd } from '../placemark/placemark.add.js'

export const buttonPoint = (map) => {
  const button = new ymaps.control.Button('<b>Метка</b>');
  button.events.add('select', function () {
    window.currentButton = 'point'
    map.events.add('click', async (e) => {
      if (window.currentButton === 'point') {
        const coords = e.get('coords')

        await placemarkAdd({ map, coords }, true, true)
      }
    })
  })

  button.events.add('deselect', () => {
    window.currentButton = ''
  })

  return button
}

export const buttonGEOJSON = (map, objectManager) => {
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
        const objects = []
        map.geoObjects.each((i) => {
          objects.push({
            id: nanoid(),
            type: 'Feature',
            options: i.options.getAll(),
            geometry: { type: 'Point', coordinates: i.geometry._coordinates },
            properties: {
              ...i.properties.getAll(),
            }
          })
        })

        const json = {
          "type": "FeatureCollection",
          "metadata": {
            "name": "Marwa",
            "creator": "Yandex Map Constructor",
            "description": "marwa"
          },
          features: objects
        }

        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([JSON.stringify(json, null, 2)], {
          type: "application/geo+json"
        }));

        const date = new Date().toISOString()

        a.setAttribute("download", `marwa_${date}.geojson`);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

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
            console.error(e)
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