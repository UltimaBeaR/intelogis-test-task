// TODO: временно так, чтобы не ругалось на отсутствующие тайпинги плагинов
const L: any = require('leaflet');

const leafletTileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const leafletTileAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

export function createMap(targetElement: HTMLDivElement, graphhopperApiKey: string) {
  let map: any = null;
  let routingControl: any = null;

  function centerMap (e: any) {
    map.panTo(e.latlng);
  }
  
  function zoomIn (e: any) {
    map.zoomIn();
  }
  
  function zoomOut (e: any) {
    map.zoomOut();
  }

  map = L.map(targetElement, {
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

  routingControl = L.Routing.control({
    // Использую это, т.к. дефолтный OSRM demo сервер постоянно лежит
    router: new L.Routing.GraphHopper(graphhopperApiKey),

    draggableWaypoints : false,
    addWaypoints: false,
    routeWhileDragging: false,
    showAlternatives: false,
    show: false,
  });
  
  routingControl.addTo(map);

  return {
    map,
    routingControl
  };
}