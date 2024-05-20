import { onMapListItemCheck, onMapListSearch } from './map-list.events.js'
import { transformPresetToColor } from '@/utils.js'
import { useCapture } from './useCapture.js'
import { MapListContainer } from '@/module/map-list/map-list.container.js'
import mapListStyle from './map-list.style.pcss?inline'

export const createMapListItem = ({ id, name, color, visible, count, square }) => {
  const template = document.createElement('div')
  template.className = 'map-list-item'
  template.dataset.id = id
  template.innerHTML =
    `
    <div class="color" style="background: ${color}"></div>
    <label for="checkbox-select-${id}" class="checkbox-select">
        <input type="checkbox" id="checkbox-select-${id}" name="checkbox-select-${id}">
    </label>
    <label for="checkbox-eye-${id}" class="checkbox-eye">
      <input type="checkbox" id="checkbox-eye-${id}" name="checkbox-eye-${id}" data-id="${id}" ${visible ? 'checked' : ''}>
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
  style.innerHTML = mapListStyle
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

  const mapListContainer =  new MapListContainer(shadow)

  search.addEventListener('input', () => onMapListSearch({ search, shadow }))

  const visibilityCheckboxes = shadow.querySelectorAll('.checkbox-eye input[type="checkbox"]')

  for (const item of visibilityCheckboxes) {
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
      el.querySelector('.color').style.background = color
    })
  })

  mapList.addEventListener('list:add', (e) => {
    const placemark = e.detail
    mapListContainer.push(placemark)
  })

  mapList.addEventListener('list:remove', (e) => {
    const id = e.detail
    mapListContainer.removeById(id)
  })

  return {
    mapListContainer
  }
}
