import { Stroke, Fill } from 'ol/style'
import { tentStyle } from '@/module/tent/tent.style.js'
import { areaStyle } from '@/module/area/area.style.js'

export const mapElementStyle = (data, geometry) => {
  const style = {
    geometry,
    stroke: new Stroke({
      width: 2,
      color: data.color
    }),
    fill: new Fill({
      color: data.color + '33'
    })
  }

  return data.type === 'tent'
    ? {...style, ...tentStyle(data) }
    : {...style, ...areaStyle(data) }
}