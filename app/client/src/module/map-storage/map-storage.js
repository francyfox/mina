import { LayerModel } from '@/module/layer/layer.model.js'
import { MapModel } from '@/module/map/map.model.js'

/**
 * Храним в локальном и подтягиваем данные с базы
 */
export class MapStorage {
  storeId = 'marwa_f3g4s'
  constructor() {
    const store = this.getStore()

    if (!store) {
      const layer = new LayerModel('layer-0', 0);
      console.log(layer.id)
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