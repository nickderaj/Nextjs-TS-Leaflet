import dynamic from 'next/dynamic';

// Leaflet can't be rendered using SSR, so have to disable it
const Map = dynamic(() => import('./Map'), {
  ssr: false,
});

export default Map;
