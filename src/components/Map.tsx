import LeafletMapContainer from './LeafletMapContainer';

// TODO: временно так, чтобы не ругалось на отсутствующие тайпинги плагинов
const L: any = require('leaflet');

// https://cherniavskii.com/using-leaflet-in-react-apps/
// https://stackoverflow.com/questions/57345400/how-do-i-initialize-third-party-libraries-while-using-react-hooks
// https://www.liedman.net/leaflet-routing-machine/

const leafletTileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const leafletTileAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

function createMap(mapElement: HTMLDivElement) {
  let map: any = null;

  function centerMap (e: any) {
    map.panTo(e.latlng);
  }
  
  function zoomIn (e: any) {
    map.zoomIn();
  }
  
  function zoomOut (e: any) {
    map.zoomOut();
  }

  map = L.map(mapElement, {
    contextmenu: true,
    contextmenuWidth: 140,
    contextmenuItems: [{
      text: 'Центрировать',
      callback: centerMap
    }, '-', {
      text: 'Приблизить',
      callback: zoomIn
    }, {
      text: 'Отдалить',
      callback: zoomOut
    }],

    center: [49.8419, 24.0315],
    zoom: 16,
    layers: [
      L.tileLayer(leafletTileUrl, {
        attribution: leafletTileAttribution
      }),
    ]
  });

  const marker = new L.Marker([46.947, 7.4448]).on('click', markerOnClick).addTo(map);

  function markerOnClick(e: any)
  {
    alert("hi. you clicked the marker at " + e.latlng);
  }

  console.log('Map created', map);

  return map;
}

function Map() {
  return (
    <LeafletMapContainer createMap={createMap} />
  );
}

export default Map;