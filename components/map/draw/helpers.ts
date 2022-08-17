import { LatLng } from 'leaflet';

export const pointsAreClose = (firstPoint: [number, number], secondPoint: [number, number]) => {
  if (Math.abs(firstPoint[0] - secondPoint[0]) < 0.05 && Math.abs(firstPoint[0] - secondPoint[0]) < 0.05) return true;
  return false;
};

export const pointsWithinImage = (point: LatLng, bounds: { top: number; left: number; bottom: number; right: number }) => {
  if (point.lat <= bounds.top && point.lat >= bounds.bottom && point.lng <= bounds.right && point.lng >= bounds.left) return true;
  return false;
};
