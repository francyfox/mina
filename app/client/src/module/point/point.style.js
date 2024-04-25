import { Icon, Fill, Stroke, Text } from 'ol/style'
export const pointStyle = (data) => {
  return {
    image: new Icon({
      src: data.icon,
      scale: data.scale
    }),

    text: new Text({
      text: `${data.name}`,
      font: '1.5em sans-serif',
      fill: new Fill({
        color: 'black'
      }),
      offsetY: 30,
      stroke: new Stroke({
        color: 'white',
        width: 3
      })
    }),
  }
}