import { nanoid } from 'nanoid'
export class MapElementModel {
  _id
  _layer_id
  name = ''
  type = 'tent'
  _featureJson = null
  isHidden = false
  constructor(name, type, isHidden, featureJson) {
    this._id = nanoid(5)
    this._layer_id = nanoid(5)
    this.name = name
    this.type = type
    this.isHidden = isHidden
    this._featureJson = featureJson
  }

  set featureJson(featureJson) {
    this._featureJson = featureJson
  }

  get featureJson() {
    return this._featureJson
  }

  set layerId(layerId) {
    this._layer_id = layerId
  }
  get layerId() {
    return this._layer_id
  }
}