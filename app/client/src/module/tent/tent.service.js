import { Point } from 'ol/geom'

export const createDoors = (feature, sides) => {
  const polygonGeometry = feature.getGeometry();
  const centerPoints = centerCoordinates(polygonGeometry.flatCoordinates, sides)

  if (centerPoints) {
    console.log(centerPoints)
    console.log(polygonGeometry.flatCoordinates)

    return centerPoints.map((center) => new Point(center));
  } else {
    throw new Error('Cannot create doors, wrong coordinates')
  }
}

/**
 * @param { number[] } coordinates
 * @param { string[] } sides
 * @returns {number[]|null}
 */
const centerCoordinates = (coordinates, sides) => {
  const x1 = coordinates[0];
  const x2 = coordinates[2];
  const x3 = coordinates[4];
  const x4 = coordinates[6];

  const y1 = coordinates[1];
  const y2 = coordinates[3];
  const y3 = coordinates[5];
  const y4 = coordinates[7];

  return sides.map((center) => {
    switch (center) {
      case 'left':
        return getCenter([x1, x1, y1, y3]);
      case 'top':
        return getCenter([x3, x4, y3, y4]);
      case 'right':
        return getCenter([x2, x2, y2, y4]);
      case 'bottom':
        return getCenter([x1, x2, y1, y2]);
      default:
        return null
    }
  })
}

const getCenter = (coordinates) => {
  const x1 = coordinates[0];
  const x2 = coordinates[1];
  const y1 = coordinates[2];
  const y2 = coordinates[3];

  return [((x1 + x2) / 2), ((y1 + y2) / 2)];
}