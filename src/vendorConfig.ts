import L from 'leaflet';

// leaflet

// По дефолту leaflet будет пытаться взять иконки в /marker-icon.png - меняем это

L.Marker.prototype.options.icon = L.icon({
  iconUrl: '/leaflet-markers/marker-icon-2x-blue.png',
  shadowUrl: '/leaflet-markers/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
