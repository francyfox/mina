import { LayerModel } from '@/module/layer/layer.model.js'
import { MapModel } from '@/module/map/map.model.js'

/**
 * Храним в локальном и подтягиваем данные с базы
 */
export class MapStorage {
  storeId = 'marwa_f3g4s'
  constructor() {
    const store = this.getStore()

    if (!window.localStorage.getItem(this.storeId)) {
      const layer = new LayerModel({
        name: 'layer-0',
        position: 0
      });
      const map = new MapModel(layer.id, [ layer ])

      this.setStore(map)
    }
  }

  getStore() {
    const store = window.localStorage.getItem(this.storeId)
    return store? JSON.parse(store) : null
  }

  setStore(value) {
    window.localStorage.setItem(this.storeId, JSON.stringify(value))
  }
}