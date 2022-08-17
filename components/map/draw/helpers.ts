export const pointsAreClose = (firstPoint: [number, number], secondPoint: [number, number]) => {
  if (Math.abs(firstPoint[0] - secondPoint[0]) < 0.05 && Math.abs(firstPoint[0] - secondPoint[0]) < 0.05) return true;
  return false;
};
