import { forwardRef, useImperativeHandle, useRef } from 'react';
import LeafletMapContainer from './LeafletMapContainer';

// TODO: временно так, чтобы не ругалось на отсутствующие тайпинги плагинов
const L: any = require('leaflet');

// https://cherniavskii.com/using-leaflet-in-react-apps/
// https://stackoverflow.com/questions/57345400/how-do-i-initialize-third-party-libraries-while-using-react-hooks
// https://www.liedman.net/leaflet-routing-machine/

const leafletTileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const leafletTileAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';



const Map = forwardRef((props, ref) => {
  const leafletMapRef = useRef<any>(null);
  const lefaletRoutingControlRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({

    setWaypoints(waypoints: any) {
      const newWaypoints = waypoints.map((val: any) => L.latLng(val.x, val.y));

      lefaletRoutingControlRef.current.setWaypoints(newWaypoints);
    }

  }));


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
  
    const icon = L.icon({
      iconUrl: '/leaflet-images/marker-icon.png',
      iconRetinaUrl: '/leaflet-images/marker-icon-2x.png',
      shadowUrl: '/leaflet-images/marker-shadow.png',
      shadowRetinaUrl: '/leaflet-images/marker-shadow.png',
    });
  
    //const marker = new L.marker([46.947, 7.4448], { icon: icon }).on('click', markerOnClick).addTo(map);
  
    // function markerOnClick(e: any)
    // {
    //   alert("hi. you clicked the marker at " + e.latlng);
    // }
  
    const waypoints = [
      L.latLng(57.74, 11.94),
      L.latLng(57.6792, 11.949)
    ];
  
    const control = L.Routing.control({
      //waypoints: waypoints,
  
      plan: L.Routing.plan(null, {
        createMarker: function(i: any, wp: any) {
          return L.marker(wp.latLng, {
            draggable: false,
            icon: icon
          });
        }
      }),
  
      draggableWaypoints : false,
      addWaypoints: false,
      routeWhileDragging: false,
  
      serviceUrl: 'https://routing.openstreetmap.de/routed-bike/route/v1',
      showAlternatives: false,
  
      show: false,
    });
    
    control.addTo(map);
  
    //control.setWaypoints(waypoints);

    leafletMapRef.current = map;
    lefaletRoutingControlRef.current = control;
  
    return map;
  }




  return (
    <LeafletMapContainer createMap={createMap} />
  );
});

export default Map;