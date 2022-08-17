import { setIsDrawing, stopDrawing } from '@/redux/slices/drawSlice';
import { RootState } from '@/redux/store';
import L, { LeafletMouseEvent } from 'leaflet';
import { useMemo, useState } from 'react';
import { Polyline, useMap, useMapEvents } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { pointsAreClose, pointsWithinImage } from './helpers';

export default function DrawPolygon() {
  const [firstPoint, setFirstPoint] = useState<[number, number] | undefined>();
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
        
        if (firstPoint && currentPoint && pointsAreClose(currentPoint, firstPoint)) {
          L.polygon(positions, { color: 'rgb(199 210 254)', weight: 2 }).addTo(map);
          dispatch(stopDrawing());
        }
        if (firstPoint && lastPoint && currentPoint && !pointsAreClose(lastPoint, currentPoint)) {
          setPositions((prevState) => [...prevState, lastPoint, currentPoint]);
          setLastPoint(currentPoint);
        }
        if (!firstPoint && !lastPoint) {
          // set first point
          dispatch(setIsDrawing(true));
          setFirstPoint([e.latlng.lat, e.latlng.lng]);
          setLastPoint([e.latlng.lat, e.latlng.lng]);
        }
      },
      mousemove: (e: LeafletMouseEvent) => {
        setCurrentPoint([e.latlng.lat, e.latlng.lng]);
      },
    }),
    [firstPoint, currentPoint, lastPoint, positions, map, dispatch, bounds]
  );
  useMapEvents(handlers);

  return firstPoint && lastPoint && currentPoint ? (
    <Polyline positions={[...positions, lastPoint, currentPoint]} pathOptions={{ color: 'white' }} />
  ) : null;
}
