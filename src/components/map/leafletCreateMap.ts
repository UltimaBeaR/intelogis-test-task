import L from 'leaflet';

import type { MarkerColor } from './Map';

export function createMap(
  targetElement: HTMLDivElement,
  initialLocation: L.LatLng,
  initialZoom: number,
  startWaypointMarkerColor: MarkerColor,
  endWaypointMarkerColor: MarkerColor,
  intermediateWaypointMarkerColor: MarkerColor,
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
    zoom: initialZoom,
    layers: [
      L.tileLayer(leafletTileUrl, {
        attribution: leafletTileAttribution
      }),
    ]
  });

  const routingControl = createRouting(
    map,
    startWaypointMarkerColor,
    endWaypointMarkerColor,
    intermediateWaypointMarkerColor,
    graphhopperApiKey,
    startRountingCallback,
    endRoutingCallback
  );

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
  startWaypointMarkerColor: MarkerColor,
  endWaypointMarkerColor: MarkerColor,
  intermediateWaypointMarkerColor: MarkerColor,
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

    createMarker: function(i, wp, n) {
      const isFirstWaypoint = i === 0;
      const isLastWaypoint = i === n - 1;

      if (isFirstWaypoint) {
        return createColoredMarker(wp.latLng, startWaypointMarkerColor, true);
      }

      if (isLastWaypoint) {
        return createColoredMarker(wp.latLng, endWaypointMarkerColor, true);
      }

      return createColoredMarker(wp.latLng, intermediateWaypointMarkerColor, true);
    }
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

function createColoredMarker(latLng: L.LatLng, color: MarkerColor, use2x: boolean) {
  return L.marker(latLng, { icon: createColoredMarkerIcon(color, use2x) });
}

function createColoredMarkerIcon(color: MarkerColor, use2x: boolean) {
  return L.icon({
    iconUrl: `/leaflet-markers/marker-icon${use2x ? '-2x' : ''}-${color}.png`,
    shadowUrl: '/leaflet-markers/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
}