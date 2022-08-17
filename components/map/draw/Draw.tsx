import { setDrawMode } from '@/redux/slices/drawSlice';
import { RootState } from '@/redux/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DrawCircle from './DrawCircle';
import DrawMarker from './DrawMarker';
import DrawPolygon from './DrawPolygon';
import DrawPolyline from './DrawPolyline';
import DrawRectangle from './DrawRectangle';

export default function Draw() {
  const dispatch = useDispatch();
  const { drawMode } = useSelector((state: RootState) => state.draw);

  useEffect(() => {
    if (window) {
      window.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === '1') dispatch(setDrawMode('rectangle'));
        if (e.key === '2') dispatch(setDrawMode('polygon'));
        if (e.key === '3') dispatch(setDrawMode('polyline'));
        if (e.key === '4') dispatch(setDrawMode('marker'));
        if (e.key === '5') dispatch(setDrawMode('circle'));
      });
    }
  });

  return (
    <>
      {drawMode === 'rectangle' && <DrawRectangle />}
      {drawMode === 'polyline' && <DrawPolyline />}
      {drawMode === 'polygon' && <DrawPolygon />}
      {drawMode === 'marker' && <DrawMarker />}
      {drawMode === 'circle' && <DrawCircle />}
    </>
  );
}
