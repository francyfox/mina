import { nanoid } from 'nanoid'
export class LayerModel {
  _id
  name = ''
  position= 0
  mapElementCollection = []

  constructor(name, position) {
    this._id = nanoid(5)
    this.name = name
    this.position = position
    this.mapElementCollection = []
  }

  get id() {
    return this._id
  }

  updateFeatures() {

  }

  removeFeatures() {

  }
}