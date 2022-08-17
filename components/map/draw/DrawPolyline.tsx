import { setIsDrawing, stopDrawing } from '@/redux/slices/drawSlice';
import { RootState } from '@/redux/store';
import L, { LeafletMouseEvent } from 'leaflet';
import { useMemo, useState } from 'react';
import { Polyline, useMap, useMapEvents } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { pointsAreClose, pointsWithinImage } from './helpers';

export default function DrawPolyline() {
  const [lastPoint, setLastPoint] = useState<[number, number] | undefined>();
  const [currentPoint, setCurrentPoint] = useState<[number, number] | undefined>();
  const [positions, setPositions] = useState<[number, number][]>([]);
  const { bounds } = useSelector((state: RootState) => state.draw)
  const dispatch = useDispatch();
  const map = useMap();

  const handlers = useMemo(
    () => ({
      click: (e: LeafletMouseEvent) => {
        if (!bounds || !pointsWithinImage(e.latlng, bounds)) return;
        
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
    [currentPoint, lastPoint, positions, map, dispatch, bounds]
  );
  useMapEvents(handlers);

  return lastPoint && currentPoint ? (
    <Polyline positions={[...positions, lastPoint, currentPoint]} pathOptions={{ color: 'white' }} />
  ) : null;
}
