import { calculateCenter } from '@/utils/utils'

export const featureModifyStyle = (defaultStyle, feature) => {
  feature.get('features').forEach(function (modifyFeature) {
    const modifyGeometry = modifyFeature.get('modifyGeometry');
    if (modifyGeometry) {
      const point = feature.getGeometry().getCoordinates();
      let modifyPoint = modifyGeometry.point;
      if (!modifyPoint) {
        // save the initial geometry and vertex position
        modifyPoint = point;
        modifyGeometry.point = modifyPoint;
        modifyGeometry.geometry0 = modifyGeometry.geometry;
        // get anchor and minimum radius of vertices to be used
        const result = calculateCenter(modifyGeometry.geometry0);
        modifyGeometry.center = result.center;
        modifyGeometry.minRadius = result.minRadius;
      }

      const center = modifyGeometry.center;
      const minRadius = modifyGeometry.minRadius;
      let dx, dy;
      dx = modifyPoint[0] - center[0];
      dy = modifyPoint[1] - center[1];
      const initialRadius = Math.sqrt(dx * dx + dy * dy);
      if (initialRadius > minRadius) {
        const initialAngle = Math.atan2(dy, dx);
        dx = point[0] - center[0];
        dy = point[1] - center[1];
        const currentRadius = Math.sqrt(dx * dx + dy * dy);
        if (currentRadius > 0) {
          const currentAngle = Math.atan2(dy, dx);
          const geometry = modifyGeometry.geometry0.clone();
          geometry.scale(currentRadius / initialRadius, undefined, center);
          geometry.rotate(currentAngle - initialAngle, center);
          modifyGeometry.geometry = geometry;
        }
      }
    }
  });

  return defaultStyle(feature)
}

export const onModifyStart = (event) => {
  event.features.forEach(function (feature) {
    feature.set(
      'modifyGeometry',
      {geometry: feature.getGeometry().clone()},
      true,
    );
  });
}

export const onModifyEnd = (event) => {
  event.features.forEach(function (feature) {
    const modifyGeometry = feature.get('modifyGeometry');
    if (modifyGeometry) {
      feature.setGeometry(modifyGeometry.geometry);
      feature.unset('modifyGeometry', true);
    }
  });
}

export const onModifyChanged = (event) => {
  const feature = event.target.features_.array_.slice(-1)[0];
  const modifyGeometry = feature.get('modifyGeometry');
  if (modifyGeometry) {
    feature.setGeometry(modifyGeometry.geometry);
    feature.unset('modifyGeometry', true);
  }
}