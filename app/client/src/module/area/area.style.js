import { Icon, Text, Fill, Stroke } from 'ol/style'
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
      offsetY: -40
    })
  }
}

export const pointIconStyle = (geometry, data) => {
  return {
    geometry,
    // https://static.thenounproject.com/png/1328910-200.png
    image: new Icon({
      src: data.icon,
      scale: 1.5,
      offsetY: 20
      // rotation: angle
    }),
  }
}