import { Stroke } from 'ol/style'
import { tentStyle } from '@/module/tent/tent.style.js'
import { areaStyle } from '@/module/area/area.style.js'

export const mapElementStyle = (data) => {
  const style = {
    stroke: new Stroke({
      width: 2,
      color: data.color
    }),
  }

  return data.type === 'tent'
    ? {...style, ...tentStyle(data) }
    : {...style, ...areaStyle(data) }
}