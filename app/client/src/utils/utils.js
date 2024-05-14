import { getHeight, getWidth } from 'ol/extent'

export const getCenter = (coordinates) => {
  const x1 = coordinates[0];
  const x2 = coordinates[1];
  const y1 = coordinates[2];
  const y2 = coordinates[3];

  return [((x1 + x2) / 2), ((y1 + y2) / 2)];
}

export function styleGeometry(styles, feature) {
  const geoms = feature.getGeometry().getGeometries();

  return geoms.map((geom) => {
    const type = geom.getType();
    const style = styles[type];

    style.setGeometry(geom);
    return style;
  })
}

export function calculateCenter(geometry) {
  let center, coordinates, minRadius;
  const type = geometry.getType();
  if (type === 'Polygon') {
    let x = 0;
    let y = 0;
    let i = 0;
    coordinates = geometry.getCoordinates()[0].slice(1);
    coordinates.forEach(function (coordinate) {
      x += coordinate[0];
      y += coordinate[1];
      i++;
    });
    center = [x / i, y / i];
  } else if (type === 'LineString') {
    center = geometry.getCoordinateAt(0.5);
    coordinates = geometry.getCoordinates();
  } else {
    center = getCenter(geometry.getExtent());
  }
  let sqDistances;
  if (coordinates) {
    sqDistances = coordinates.map(function (coordinate) {
      const dx = coordinate[0] - center[0];
      const dy = coordinate[1] - center[1];
      return dx * dx + dy * dy;
    });
    minRadius = Math.sqrt(Math.max.apply(Math, sqDistances)) / 3;
  } else {
    minRadius =
      Math.max(
        getWidth(geometry.getExtent()),
        getHeight(geometry.getExtent()),
      ) / 3;
  }
  return {
    center: center,
    coordinates: coordinates,
    minRadius: minRadius,
    sqDistances: sqDistances,
  };
}