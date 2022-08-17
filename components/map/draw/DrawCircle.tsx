import { setIsDrawing, stopDrawing } from '@/redux/slices/drawSlice';
import L, { LatLng, LeafletMouseEvent } from 'leaflet';
import { useMemo, useState } from 'react';
import { Circle, useMap, useMapEvents } from 'react-leaflet';
import { useDispatch } from 'react-redux';

export default function DrawCircle() {
  const dispatch = useDispatch();
  const map = useMap();
  const [centrePoint, setCentrePoint] = useState<LatLng | undefined>();
  const [currentPoint, setCurrentPoint] = useState<LatLng | undefined>();

  const handlers = useMemo(
    () => ({
      click: (e: LeafletMouseEvent) => {
        if (centrePoint && currentPoint) {
          L.circle(centrePoint, { color: 'rgb(79 70 229)', weight: 2, radius: centrePoint.distanceTo(currentPoint) }).addTo(map);
          dispatch(stopDrawing());
        }
        if (!centrePoint) {
          setCentrePoint(e.latlng);
          dispatch(setIsDrawing(true));
        }
      },
      mousemove: (e: LeafletMouseEvent) => {
        setCurrentPoint(e.latlng);
      },
    }),
    [centrePoint, currentPoint, map, dispatch]
  );
  useMapEvents(handlers);

  return centrePoint && currentPoint ? (
    <Circle center={centrePoint} radius={centrePoint.distanceTo(currentPoint)} pathOptions={{ color: 'white' }} />
  ) : null;
}
