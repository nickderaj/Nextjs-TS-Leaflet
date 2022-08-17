import L from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export default function MapImage() {
  const map = useMap();
  const imageSrc = 'loki.jpg';

  useEffect(() => {
    // insert the image onto the map
    const img = new Image();
    img.onload = () => {
      if (img.height > 0 && img.width > 0) {
        const southWest = map.unproject([0, img.height], 5);
        const northEast = map.unproject([img.width, 0], 5);
        const bounds = new L.LatLngBounds(southWest, northEast);

        const image = L.imageOverlay(imageSrc, bounds).addTo(map);
        map.fitBounds(image.getBounds());
      }
    };
    img.src = imageSrc;
  }, [map]);

  return null;
}
