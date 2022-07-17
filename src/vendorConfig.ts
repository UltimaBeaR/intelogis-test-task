import L from 'leaflet';
import { appConfig } from 'appConfig';

// leaflet

// По дефолту leaflet будет пытаться взять иконки в /marker-icon.png - меняем это

L.Marker.prototype.options.icon = L.icon({
  iconUrl: `${appConfig.publicUrl}/leaflet-markers/marker-icon-2x-blue.png`,
  shadowUrl: `${appConfig.publicUrl}/leaflet-markers/marker-shadow.png`,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
