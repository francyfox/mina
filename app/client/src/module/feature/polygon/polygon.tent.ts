export interface FeatureItem    {
  type: 'Feature'
  geometry: {
    type: 'Polygon'
    coordinates: []
  },
}
// export const polygonTent: FeatureItem = (x: number, y: number) => {
//   return {
//     type: 'Feature',
//     geometry: {
//       type: 'Polygon',
//       coordinates: [
//         [x, y],
//         [x - 0.1, y - 0.1],
//         [x + 2, y + 2],
//         [x + 3, y + 3],
//         [x, y],
//       ]
//     }
//   }
// }