import { createBox, createRegularPolygon } from 'ol/interaction/Draw';
import { Polygon } from 'ol/geom';
import { Draw } from 'ol/interaction';
export function customDraw(map: any, source: any, drawType: string) {

  let value = drawType;
  if (value !== 'None') {
    let geometryFunction;
    if (value === 'Square') {
      value = 'Circle';
      geometryFunction = createRegularPolygon(4);
    } else if (value === 'Box') {
      value = 'Circle';
      geometryFunction = createBox();
    } else if (value === 'Star') {
      value = 'Circle';
      geometryFunction = function (coordinates: any, geometry: any) {
        const center = coordinates[0];
        const last = coordinates[coordinates.length - 1];
        const dx = center[0] - last[0];
        const dy = center[1] - last[1];
        const radius = Math.sqrt(dx * dx + dy * dy);
        const rotation = Math.atan2(dy, dx);
        const newCoordinates = [];
        const numPoints = 12;
        for (let i = 0; i < numPoints; ++i) {
          const angle = rotation + (i * 2 * Math.PI) / numPoints;
          const fraction = i % 2 === 0 ? 1 : 0.5;
          const offsetX = radius * fraction * Math.cos(angle);
          const offsetY = radius * fraction * Math.sin(angle);
          newCoordinates.push([center[0] + offsetX, center[1] + offsetY]);
        }
        newCoordinates.push(newCoordinates[0].slice());
        if (!geometry) {
          geometry = new Polygon([newCoordinates]);
        } else {
          geometry.setCoordinates([newCoordinates]);
        }
        return geometry;
      };
    }

    window.draw = new Draw({
      source: source,
      type: value,
      geometryFunction: geometryFunction
    });

    map.addInteraction(draw);
  }
}