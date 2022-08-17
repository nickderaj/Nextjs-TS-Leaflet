import { stopDrawing } from '@/redux/slices/drawSlice';
import L, { LeafletMouseEvent } from 'leaflet';
import { useMemo } from 'react';
import { useMap, useMapEvents } from 'react-leaflet';
import { useDispatch } from 'react-redux';

export default function DrawMarker() {
  const dispatch = useDispatch();
  const map = useMap();

  const handlers = useMemo(
    () => ({
      click: (e: LeafletMouseEvent) => {
        L.circle(e.latlng, { color: 'rgb(199 210 254)', weight: 8, radius: 1 }).addTo(map);
        dispatch(stopDrawing());
      },
    }),
    [map, dispatch]
  );
  useMapEvents(handlers);

  return null;
}
