import { Icon, Text, Fill } from 'ol/style'
export const areaStyle = (data) => {
  return {
    icon: new Icon({
      src: ''
    }),
    text: new Text({
      text: data.name,
      font: '1.5em sans-serif',
      fill: new Fill({
        color: 'black'
      }),
      offsetY: -20
    })
  }
}