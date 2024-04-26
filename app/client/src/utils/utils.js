export const getCenter = (coordinates) => {
  const x1 = coordinates[0];
  const x2 = coordinates[1];
  const y1 = coordinates[2];
  const y2 = coordinates[3];

  return [((x1 + x2) / 2), ((y1 + y2) / 2)];
}