import { stopDrawing } from '@/redux/slices/drawSlice';
import { RootState } from '@/redux/store';
import L, { LeafletMouseEvent } from 'leaflet';
import { useMemo } from 'react';
import { useMap, useMapEvents } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { pointsWithinImage } from './helpers';

export default function DrawMarker() {
  const { bounds } = useSelector((state: RootState) => state.draw)
  const dispatch = useDispatch();
  const map = useMap();

  const handlers = useMemo(
    () => ({
      click: (e: LeafletMouseEvent) => {
        if (!bounds || !pointsWithinImage(e.latlng, bounds)) return;
        
        L.circle(e.latlng, { color: 'rgb(199 210 254)', weight: 8, radius: 1 }).addTo(map);
        dispatch(stopDrawing());
      },
    }),
    [map, dispatch, bounds]
  );
  useMapEvents(handlers);

  return null;
}
