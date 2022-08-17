import { setBounds } from '@/redux/slices/drawSlice';
import L from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { useDispatch } from 'react-redux';

export default function MapImage({ imageSrc }: { imageSrc: string }) {
  const map = useMap();
  const dispatch = useDispatch();

  useEffect(() => {
    // insert the image onto the map
    const img = new Image();
    img.onload = () => {
      if (img.height > 0 && img.width > 0) {
        const southWest = map.unproject([0, img.height], 5);
        const northEast = map.unproject([img.width, 0], 5);
        const bounds = new L.LatLngBounds(southWest, northEast);

        const image = L.imageOverlay(imageSrc, bounds).addTo(map);
        const imageBounds = image.getBounds();
        map.fitBounds(imageBounds);
        map.setMaxBounds(imageBounds);
        dispatch(
          setBounds({
            top: imageBounds.getNorthEast().lat,
            bottom: imageBounds.getSouthWest().lat,
            left: imageBounds.getSouthWest().lng,
            right: imageBounds.getNorthEast().lng,
          })
        );
      }
    };
    img.src = imageSrc;
  }, [map, imageSrc, dispatch]);

  return null;
}
