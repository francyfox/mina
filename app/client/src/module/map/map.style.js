import { Fill, Stroke, Text } from 'ol/style'
import CircleStyle from 'ol/style/Circle'

export const mapDefaultStyle = () => {
  return {
    geometry: function (feature) {
      const modifyGeometry = feature.get('modifyGeometry');
      return modifyGeometry ? modifyGeometry.geometry : feature.getGeometry();
    },
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0.2)',
    }),
    stroke: new Stroke({
      color: '#ffcc33',
      width: 2,
    }),
    image: new CircleStyle({
      radius: 7,
      fill: new Fill({
        color: '#ffcc33',
      }),
    }),
  }
}

export const formatProp = (prop) => prop.value === 'NULL' ? '' : prop.value
export const createTextStyle = function (feature, resolution) {
  const props = feature.getProperties()
  return new Text({
    text: props.type.value === 'tent' ? `№ ${formatProp(props.tentNo)} \n Кол-во: ${formatProp(props.personCoun)}` : '',
    fill: new Fill({color: '#FFF'}),
    font: '1em sans-serif',
    offsetY: 0,
    offsetX: 0,
    rotation: 0,
    textAlign: 'center',
  });
};

export const buildersStyle = (feature, resolution) => {
  return {
    fill: new Fill({
      color: 'rgba(212,77,43,0.8)',
    }),
    stroke: new Stroke({
      color: 'rgba(212,77,43,1)',
      width: 2,
    }),
    text: createTextStyle(feature, resolution)
  }
}
