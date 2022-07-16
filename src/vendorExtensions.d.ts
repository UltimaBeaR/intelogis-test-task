import L from 'leaflet';

// Расширения типов для lefeat с учетом плагинов (т.к. не для всех есть тайпинги)
declare module 'leaflet' {
  // Опции для создания L.Map через L.map(), которые добавляет плагин leaflet-contextmenu
  interface MapOptions {
    contextmenu?: boolean;
    contextmenuWidth?: number;
    contextmenuItems?: any[];
  }

  namespace Routing {
    class Control {
      // В тайпингах плагина leaflet-routing-machine почему-то не добавили это
      addTo(map: L.Map);
    }

    interface RoutingControlOptions {
      // В тайпингах плагина leaflet-routing-machine почему-то не добавили это
      
      draggableWaypoints?: boolean;
      createMarker?: (i: number, wp: Waypoint, n: number) => any;
    }

    // Плагин lrm-graphhopper
    class GraphHopper extends IRouter {
      constructor(apiKey: string);
      route(waypoints: Waypoint[], callback: (error?: IError, routes?: IRoute[]) => any, context?: {}, options?: RoutingOptions): void;
    }
  }
}