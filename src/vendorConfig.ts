import L from 'leaflet';

// leaflet

// По дефолту leaflet будет пытаться взять иконки в /marker-icon.png - меняем это

L.Marker.prototype.options.icon = L.icon({
  iconUrl: '/leaflet-images/marker-icon.png',
  iconRetinaUrl: '/leaflet-images/marker-icon-2x.png',
  shadowUrl: '/leaflet-images/marker-shadow.png',
  shadowRetinaUrl: '/leaflet-images/marker-shadow.png',
  iconAnchor: [ 25 / 2, 41 ]
});
