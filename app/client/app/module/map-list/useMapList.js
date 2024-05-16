import { updateFeature } from '../db/features/features.service.js'

const css = `
.map-list-item {
  width: 100%;
  display: flex;
  background: #ffdb4d;
  box-sizing: border-box;
  border-radius: 3px;
}

.map-list-item label {
  display: flex;
  width: 100%;
  padding: 5px 10px;
}

.map-list-item input {
  margin-right: 5px;
}
`
export const createMapListItem = ({ id, name, visible }) => {
  const template = document.createElement('div')
  template.className = 'map-list-item'
  template.dataset.id = id
  template.innerHTML =
    `<label for="item-${id}">
      <input type="checkbox" id="item-${id}" name="item-${id}" data-id="${id}" ${visible ? 'checked' : ''}>
      ${name}
     </label>`

  return template
}
export const useMapList = (data, geoObjects) => {
  const mapList = document.querySelector('.map-list')
  const search = mapList.querySelector('input[type="search"]')
  const container = document.querySelector('.map-list-container')
  const shadow = container.attachShadow({mode: 'open'});
  const style = document.createElement('style');
  style.innerHTML = css;
  shadow.appendChild(style);

  for (const item of data) {
    shadow.append(createMapListItem({
      id: item.id,
      name: item.properties.iconContent,
      visible: item?.options.visible ?? true,
    }))
  }

  search.addEventListener('input', () => {
    for (const item of shadow.querySelectorAll('.map-list-item')) {
      const value = search.value.toLowerCase()
      if (item.querySelector('label').textContent.toLowerCase().includes(value)) {
        item.style.display = ''
      } else {
        item.style.display = 'none'
      }
    }
  })

  const checkboxes = shadow.querySelectorAll('input[type="checkbox"]')

  for (const item of checkboxes) {
    item.addEventListener('change', async (e) => {
      const placemark = ymaps.geoQuery(geoObjects).search(`properties.id = "${e.target.dataset.id}"`)
      placemark.setOptions('visible', e.target.checked);

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
    })
  }
}
