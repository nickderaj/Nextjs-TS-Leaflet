import { RootState } from '@/redux/store';
import { MapContainer } from 'react-leaflet';
import { useSelector } from 'react-redux';
import Draw from './draw/Draw';
import MapImage from './MapImage';

export default function Map({ imageSrc }: { imageSrc: string }) {
  const { isDrawing } = useSelector((state: RootState) => state.draw);

  return (
    <MapContainer
      center={[0, 0]}
      zoom={5}
      doubleClickZoom={false}
      scrollWheelZoom={true}
      maxBoundsViscosity={1}
      dragging={!isDrawing}
      zoomControl={false}
    >
      <MapImage imageSrc={imageSrc} />
      <Draw />
    </MapContainer>
  );
}
