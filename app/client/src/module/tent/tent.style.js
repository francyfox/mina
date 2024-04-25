import { Fill, Stroke, Text } from 'ol/style'

export const tentStyle = (data) => {
  return {
    text: new Text({
      text: `${data.tentNo} \n${data.personCount}`,
      font: '1.5em sans-serif',
      fill: new Fill({
        color: 'black'
      }),
      offsetY: 0,
      stroke: new Stroke({
        color: 'white',
        width: 3
      })
    }),
    stroke: new Stroke({
      width: 2,
      color: data.color
    }),
    fill: new Fill({
      color: data.color + '33'
    })
  }
}