import { Icon, Fill, Stroke, Text } from 'ol/style'
export const pointStyle = (data) => {
  return {
    geometry: 'Point',
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

export const pointDoorStyle = (angle) => {
  return {
    // https://static.thenounproject.com/png/1328910-200.png
    image: new Icon({
      src: 'https://openlayers.org/en/latest/examples/data/icon.png',
      scale: 0.8,
      // rotation: angle
    }),
  }
}