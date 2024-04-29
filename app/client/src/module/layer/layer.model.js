import { nanoid } from 'nanoid'
export class LayerModel {
  _id
  name = ''
  position= 0
  mapElementCollection = []

  /**
   * @param {{ id?: string, name: string, position: number, mapElementCollection?: [] }} data
   */
  constructor(data) {
    const { id, name, position, mapElementCollection } = data
    this._id = id ?? nanoid(5)
    this.name = name
    this.position = position
    this.mapElementCollection = mapElementCollection ?? []
  }

  set id(id) {
    this._id = id
  }

  get id() {
    return this._id
  }

  updateFeatures() {

  }

  removeFeatures() {

  }
}