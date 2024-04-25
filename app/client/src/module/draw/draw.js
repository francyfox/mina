import { createBox } from 'ol/interaction/Draw';
import { Draw } from 'ol/interaction';

export const drawTypes = {
  none: 'None',
  polygon: 'Polygon',
  box: 'Box',
}

export function customDraw(map, source, drawType) {

  let value = drawType;
  if (value !== 'None') {
    let geometryFunction;

    if (value === 'Box') {
      value = 'Marker';
      geometryFunction = createBox();
    }

    window.draw = new Draw({
      source: source,
      type: value,
      geometryFunction: geometryFunction
    });

    map.addInteraction(window.draw);
  }
}