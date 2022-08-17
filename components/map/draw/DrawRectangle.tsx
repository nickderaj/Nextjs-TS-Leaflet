import { setIsDrawing, stopDrawing } from '@/redux/slices/drawSlice';
import { RootState } from '@/redux/store';
import L, { LeafletMouseEvent } from 'leaflet';
import { useMemo, useState } from 'react';
import { Rectangle, useMap, useMapEvents } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { pointsWithinImage } from './helpers';

export default function DrawRectangle() {
  const [lastPoint, setLastPoint] = useState<[number, number] | undefined>();
  const [currentPoint, setCurrentPoint] = useState<[number, number] | undefined>();
  const { bounds } = useSelector((state: RootState) => state.draw);
  const dispatch = useDispatch();
  const map = useMap();

  const handlers = useMemo(
    () => ({
      click: (e: LeafletMouseEvent) => {
        if (!bounds || !pointsWithinImage(e.latlng, bounds)) return;

        if (lastPoint && currentPoint) {
          L.rectangle([lastPoint, currentPoint], { color: 'rgb(79 70 229)', weight: 2 }).addTo(map);
          dispatch(stopDrawing());
        }
        if (!lastPoint) {
          setLastPoint([e.latlng.lat, e.latlng.lng]);
          dispatch(setIsDrawing(true));
        }
      },
      mousemove: (e: LeafletMouseEvent) => {
        setCurrentPoint([e.latlng.lat, e.latlng.lng]);
      },
    }),
    [lastPoint, currentPoint, map, dispatch, bounds]
  );
  useMapEvents(handlers);

  return lastPoint && currentPoint ? <Rectangle bounds={[lastPoint, currentPoint]} pathOptions={{ color: 'white' }} /> : null;
}
