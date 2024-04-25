import { Text, Fill, Stroke } from 'ol/style'
import FontSymbol from 'ol-ext/style/FontSymbol'
export const areaStyle = (data) => {
  return {
    text: new Text({
      text: data.name,
      font: '1.5em sans-serif',
      fill: new Fill({
        color: 'black'
      }),
      stroke: new Stroke({
        color: 'white',
        width: 3
      }),
      offsetY: -20
    })
  }
}