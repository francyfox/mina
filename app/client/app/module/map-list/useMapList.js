import { onMapListItemCheck, onMapListSearch } from './map-list.events.js'
import { transformPresetToColor } from '../../utils.js'
import { useCapture } from './useCapture.js'

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
  padding: 0 4px;
  background: #fdfdfd;
  border-radius: 3px;
}

.map-list-item.active {
  box-shadow: inset 6px 0px 0 0px #ff0000;
  filter: drop-shadow(2px 4px 6px black);
}

.map-list-item.active input {
  box-shadow: inset 0 0 0px 2px #ff0000;
}

.map-list-item.active span {
  color: #fff;
  background: #ff0000;
}
`
export const createMapListItem = ({ id, name, color, visible }) => {
  const template = document.createElement('div')
  template.className = 'map-list-item'
  template.dataset.id = id
  template.style.backgroundColor = color
  template.innerHTML =
    `<label for="item-${id}">
      <input type="checkbox" id="item-${id}" name="item-${id}" data-id="${id}" ${visible ? 'checked' : ''}>
      <span>${name}</span>
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
      visible: item?.options?.visible ?? true,
      color: transformPresetToColor(item.options?.preset)
    }))
  }

  useCapture(shadow)

  search.addEventListener('input', () => onMapListSearch({ search, shadow }))

  const checkboxes = shadow.querySelectorAll('input[type="checkbox"]')

  for (const item of checkboxes) {
    item.addEventListener('change', (e) => onMapListItemCheck({ e, geoObjects, shadow }))
  }
}
