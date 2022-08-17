import { setIsDrawing, stopDrawing } from '@/redux/slices/drawSlice';
import L, { LeafletMouseEvent } from 'leaflet';
import { useMemo, useState } from 'react';
import { Polyline, useMap, useMapEvents } from 'react-leaflet';
import { useDispatch } from 'react-redux';
import { pointsAreClose } from './helpers';

export default function DrawPolyline() {
  const dispatch = useDispatch();
  const map = useMap();
  const [lastPoint, setLastPoint] = useState<[number, number] | undefined>();
  const [currentPoint, setCurrentPoint] = useState<[number, number] | undefined>();
  const [positions, setPositions] = useState<[number, number][]>([]);

  const handlers = useMemo(
    () => ({
      click: (e: LeafletMouseEvent) => {
        if (lastPoint && currentPoint && pointsAreClose(lastPoint, currentPoint)) {
          L.polyline(positions, { color: 'rgb(129 140 248)', weight: 2 }).addTo(map);
          dispatch(stopDrawing());
        }
        if (lastPoint && currentPoint && !pointsAreClose(lastPoint, currentPoint)) {
          setPositions((prevState) => [...prevState, lastPoint, currentPoint]);
          setLastPoint(currentPoint);
        }
        if (!lastPoint) {
          dispatch(setIsDrawing(true));
          setLastPoint([e.latlng.lat, e.latlng.lng]);
        }
      },
      mousemove: (e: LeafletMouseEvent) => {
        setCurrentPoint([e.latlng.lat, e.latlng.lng]);
      },
    }),
    [currentPoint, lastPoint, positions, map, dispatch]
  );
  useMapEvents(handlers);

  return lastPoint && currentPoint ? (
    <Polyline positions={[...positions, lastPoint, currentPoint]} pathOptions={{ color: 'white' }} />
  ) : null;
}
