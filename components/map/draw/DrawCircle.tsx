import { setIsDrawing, stopDrawing } from '@/redux/slices/drawSlice';
import { RootState } from '@/redux/store';
import L, { LatLng, LeafletMouseEvent } from 'leaflet';
import { useMemo, useState } from 'react';
import { Circle, useMap, useMapEvents } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { pointsWithinImage } from './helpers';

export default function DrawCircle() {
  const [centrePoint, setCentrePoint] = useState<LatLng | undefined>();
  const [currentPoint, setCurrentPoint] = useState<LatLng | undefined>();
  const { bounds } = useSelector((state: RootState) => state.draw)
  const dispatch = useDispatch();
  const map = useMap();

  const handlers = useMemo(
    () => ({
      click: (e: LeafletMouseEvent) => {
        if (!bounds || !pointsWithinImage(e.latlng, bounds)) return;
        
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
    [centrePoint, currentPoint, map, dispatch, bounds]
  );
  useMapEvents(handlers);

  return centrePoint && currentPoint ? (
    <Circle center={centrePoint} radius={centrePoint.distanceTo(currentPoint)} pathOptions={{ color: 'white' }} />
  ) : null;
}
