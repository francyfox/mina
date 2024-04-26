import { getCenter } from '@/utils/utils.js'
import { Point } from 'ol/geom'

export const createIconGeometry = (coordinates) => {
  const x1 = coordinates[0];
  const x2 = coordinates[2];

  const y2 = coordinates[3];
  const y3 = coordinates[5];

  return new Point(getCenter([x1, x2, y3, y2]))
}