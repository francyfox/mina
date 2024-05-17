import { onMapListItemCheck, onMapListSearch } from './map-list.events.js'
import { transformPresetToColor } from '../../utils.js'
import { useCapture } from './useCapture.js'

const css = `
.map-list-item {
  padding: 0 5px;
  width: 100%;
  display: flex;
  align-items: center;
  background: #ffdb4d;
  box-sizing: border-box;
  border-radius: 3px;
}

.map-list-item .icon {
  margin: 5px 0;
  padding: 3px;
  display: flex;
  background: #fff;
  border-radius: 3px;
}

.map-list-item svg {
  width: 24px;
  height: 24px;
  color: #000;
}

.map-list-item label {
  display: flex;
  padding: 5px 10px;
}

.map-list-item input {
  box-shadow: inset 0 0 0px 2px #fff;
  margin-right: 5px;
  width: 20px;
  height: 20px;
  overflow: hidden;
}

.map-list-item span {
  width: 50px;
  padding: 0 4px;
  background: #fdfdfd;
  border-radius: 3px;
}

.map-list-item.active .icon {
  background: #ff4433;
  box-shadow: 0 0 0px 2px #fff;
}

.map-list-item.active .icon svg {
  color: #fff;
}

.map-list-item ul {
    margin: 5px 5px 5px 0px;
   padding: 0;
   width: 100%;
   list-style: none;
   display: grid;
   gap: 0.5em;
   grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
}

.map-list-item ul li {
  padding: 0 4px;
  background: #fdfdfd;
  border-radius: 3px;
}
`
export const createMapListItem = ({ id, name, color, visible, count, square }) => {
  const template = document.createElement('div')
  template.className = 'map-list-item'
  template.dataset.id = id
  template.style.backgroundColor = color
  template.innerHTML =
    `
    <div class="icon"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M12 17a2 2 0 1 1 0 4a2 2 0 0 1 0-4zm7 0a2 2 0 1 1 0 4a2 2 0 0 1 0-4zM5 17a2 2 0 1 1 0 4a2 2 0 0 1 0-4zm7-7a2 2 0 1 1 0 4a2 2 0 0 1 0-4zm7 0a2 2 0 1 1 0 4a2 2 0 0 1 0-4zM5 10a2 2 0 1 1 0 4a2 2 0 0 1 0-4zm7-7a2 2 0 1 1 0 4a2 2 0 0 1 0-4zm7 0a2 2 0 1 1 0 4a2 2 0 0 1 0-4zM5 3a2 2 0 1 1 0 4a2 2 0 0 1 0-4z" fill="currentColor"></path></g></svg></div>
    <label for="item-${id}">
      <input type="checkbox" id="item-${id}" name="item-${id}" data-id="${id}" ${visible ? 'checked' : ''}>
      <span class="name">${name}</span>
     </label>
     <ul>
        <li class="count">${count}</li>
        <li class="square">${square}</li>
     </ul>
`

  return template
}


export const useMapList = (data, geoObjects) => {
  const mapList = document.querySelector('.map-list')
  const search = mapList.querySelector('input[type="search"]')
  const container = document.querySelector('.map-list-container')
  const shadow = container.attachShadow({ mode: 'open' })
  const style = document.createElement('style')
  style.innerHTML = css
  shadow.appendChild(style)

  for (const item of data) {
    shadow.append(createMapListItem({
      id: item.id,
      name: item.properties.iconContent,
      visible: item?.options?.visible ?? true,
      count: item.properties?.count ?? 0,
      square: item.properties?.square ?? 0,
      color: transformPresetToColor(item.options?.preset)
    }))
  }

  useCapture(shadow)

  search.addEventListener('input', () => onMapListSearch({ search, shadow }))

  const checkboxes = shadow.querySelectorAll('input[type="checkbox"]')

  for (const item of checkboxes) {
    item.addEventListener('change', (e) => onMapListItemCheck({ e, shadow, geoObjects }))
  }

  geoObjects.each(function (geoObject) {
    geoObject.properties.events.add("change", function () {
      const id = geoObject.properties.get('id')
      const iconContent = geoObject.properties.get('iconContent')
      const count = geoObject.properties.get('count')
      const square = geoObject.properties.get('square')

      const el = shadow.querySelector(`[data-id="${id}"]`)
      el.querySelector('.name').textContent = iconContent
      el.querySelector('.count').textContent = count
      el.querySelector('.square').textContent = square
    })

    geoObject.options.events.add("change", function () {
      const id = geoObject.properties.get('id')
      const color = transformPresetToColor(geoObject.options.get('preset'))
      const el = shadow.querySelector(`[data-id="${id}"]`)
      el.style.backgroundColor = color
    })
  })
}
