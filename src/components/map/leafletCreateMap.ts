import L from 'leaflet';

export function createMap(
  targetElement: HTMLDivElement,
  initialLocation: L.LatLng,
  graphhopperApiKey: string,
  startRountingCallback: () => void,
  endRoutingCallback: (isSuccess: boolean) => void
) {
  const leafletTileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const leafletTileAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  const mapWrapper: { map: L.Map | null } = { map: null };

  const contextMenu = createContextMenu(mapWrapper);

  const map = mapWrapper.map = L.map(targetElement, {
    contextmenu: true,
    contextmenuWidth: contextMenu.width,
    contextmenuItems: contextMenu.items,

    center: [initialLocation.lat, initialLocation.lng],
    zoom: 16,
    layers: [
      L.tileLayer(leafletTileUrl, {
        attribution: leafletTileAttribution
      }),
    ]
  });

  const routingControl = createRouting(map, graphhopperApiKey, startRountingCallback, endRoutingCallback);

  return {
    map,
    routingControl
  };
}

function createContextMenu(mapWrapper: { map: L.Map | null }) {
  function centerMap(e: any) {
    mapWrapper.map?.panTo(e.latlng);
  }
  
  function zoomIn() {
    mapWrapper.map?.zoomIn();
  }
  
  function zoomOut() {
    mapWrapper.map?.zoomOut();
  }

  return {
    width: 140,

    items: [
      {
        text: 'Центрировать',
        callback: centerMap
      },
      '-',
      {
        text: 'Приблизить',
        callback: zoomIn
      },
      {
        text: 'Отдалить',
        callback: zoomOut
      }
    ]
  };
}

function createRouting(
  map: L.Map,
  graphhopperApiKey: string,
  startRountingCallback: () => void,
  endRoutingCallback: (isSuccess: boolean) => void
) {
  const routingControl = L.Routing.control({
    // Использую это, т.к. дефолтный OSRM demo сервер постоянно лежит
    router: new L.Routing.GraphHopper(graphhopperApiKey),

    draggableWaypoints : false,
    addWaypoints: false,
    routeWhileDragging: false,
    showAlternatives: false,
    show: false,
    fitSelectedRoutes: true,
  });

  routingControl.on('routingstart', () => {
    startRountingCallback();
  });

  routingControl.on('routesfound', () => {
    endRoutingCallback(true);
  });

  routingControl.on('routingerror', () => {
    endRoutingCallback(false);
  });
  
  routingControl.addTo(map);

  return routingControl;
}