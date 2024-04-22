import { createBox } from 'ol/interaction/Draw';
import { Draw } from 'ol/interaction';

export const drawTypes = {
  none: 'None',
  polygon: 'Polygon',
  box: 'Box',
}

declare global {
  interface Window { draw: any; }
}


export function customDraw(map: any, source: any, drawType: string) {

  let value = drawType;
  if (value !== 'None') {
    let geometryFunction;

    if (value === 'Box') {
      value = 'Circle';
      geometryFunction = createBox();
    }

    window.draw = new Draw({
      source: source,
      type: value as any,
      geometryFunction: geometryFunction
    });

    map.addInteraction(window.draw);
  }
}