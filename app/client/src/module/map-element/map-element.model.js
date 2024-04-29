import { nanoid } from 'nanoid'
export class MapElementModel {
  _id
  _layerId
  name = ''
  type = 'tent'
  _featureJson = null
  isHidden = false

  /**
   * @param { { id?: string, layerId: string, name: string, type?: string, isHidden?: boolean, featureJson?: string } } data
   */
  constructor(data) {
    const { id, layerId, name, type, isHidden, featureJson } = data
    this._id = id ?? nanoid(5)
    this._layerId = layerId
    this.name = name
    this.type = type ?? 'tent'
    this.isHidden = isHidden ?? false
    this._featureJson = featureJson ?? ''
  }

  set id(id) {
    this._id = id
  }

  get id() {
    return this._id
  }

  set featureJson(featureJson) {
    this._featureJson = featureJson
  }

  get featureJson() {
    return this._featureJson
  }

  set layerId(layerId) {
    this._layerId = layerId
  }
  get layerId() {
    return this._layerId
  }
}