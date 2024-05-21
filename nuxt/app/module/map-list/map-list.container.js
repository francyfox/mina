import { transformPresetToColor } from '@/utils.js'
import { createMapListItem } from '@/module/map-list/useMapList.js'

export class MapListContainer {
  container
  constructor(container) {
    this.container = container
  }

  push(item) {
    this.container.append(createMapListItem({
      id: item.id,
      name: item.properties.iconContent,
      visible: item?.options?.visible ?? true,
      count: item.properties?.count ?? 0,
      square: item.properties?.square ?? 0,
      color: transformPresetToColor(item.options?.preset)
    }))

  }

  removeById(id) {
    this.container.querySelector(`[data-id="${id}"]`).remove()
  }
}
