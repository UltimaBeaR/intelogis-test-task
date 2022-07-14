import { MapContainer, TileLayer } from 'react-leaflet';

const leafletTileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const leafletTileAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

function Map() {
  return (
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true} className='fit-parent'>
        <TileLayer url={leafletTileUrl} attribution={leafletTileAttribution} />
      </MapContainer>
  );
}

export default Map;
