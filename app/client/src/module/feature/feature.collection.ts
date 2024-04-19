import { FeatureItem } from '@/module/feature/polygon/polygon.tent';

export const featureCollection = (features: FeatureItem[]) => {
  return {
    type: "FeatureCollection",
    crs: {
      type: "name",
      properties: {
        name: "EPSG:4326",
      },
    },
    features
  }
}