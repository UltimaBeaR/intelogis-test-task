import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import L from 'leaflet';
import LeafletMapContainer from 'components/utility/LeafletMapContainer';
import createMap from './createMap';

import classes from './Map.module.scss';

export interface MapPosition {
  latitude: number;
  longitude: number;
}

export type MarkerColor = 'black' | 'blue' | 'gold' | 'green' | 'grey' | 'orange' | 'red' | 'violet' | 'yellow';

export interface MapProps {
  initialLocation?: MapPosition;
  initialZoom?: number;
  startWaypointMarkerColor?: MarkerColor;
  endWaypointMarkerColor?: MarkerColor;
  startWaypointMarkerText?: string,
  endWaypointMarkerText?: string,
  graphhopperApiKey: string;
}

export interface MapImperativeHandle {
  setWaypoints: (waypoints: MapPosition[]) => Promise<void>;
}

const Map = forwardRef((props: MapProps, ref: React.ForwardedRef<MapImperativeHandle>) => {
  const leafletMapRef = useRef<L.Map | null>(null);
  const leafletRoutingControlRef = useRef<L.Routing.Control | null>(null);

  const resolveResultForSetWaypointsRef = useRef<(() => void) | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // В момент когда загрузка завершается - резолвим промис для setWaypoints()
    if (resolveResultForSetWaypointsRef.current !== null && !isLoading) {
      resolveResultForSetWaypointsRef.current();
      resolveResultForSetWaypointsRef.current = null;
    }
  }, [isLoading]);

  useImperativeHandle(ref, () => ({
    setWaypoints(waypoints: MapPosition[]) {
      if (leafletMapRef.current == null || leafletRoutingControlRef.current == null || resolveResultForSetWaypointsRef.current !== null) {
        return Promise.reject();
      }

      const routing = leafletRoutingControlRef.current;

      const newWaypoints = waypoints.map(val => L.latLng(val.latitude, val.longitude));
      routing.setWaypoints([]);
      routing.setWaypoints(newWaypoints);

      return new Promise((resolve) => {
        resolveResultForSetWaypointsRef.current = resolve;
      });
    }
  }));

  const createMapInternal = useCallback((targetElement: HTMLDivElement) => {
    const initialLocation = props.initialLocation ?? { latitude: 0, longitude: 0 };
    const initialZoom = props.initialZoom ?? 16;

    const startWaypointMarkerColor = props.startWaypointMarkerColor ?? 'blue';
    const endWaypointMarkerColor = props.endWaypointMarkerColor ?? 'blue';
  
    const startWaypointMarkerText = props.startWaypointMarkerText ?? 'Начальная точка';
    const endWaypointMarkerText = props.endWaypointMarkerText ?? 'Конечная точка';

    const { map, routingControl } = createMap(
      targetElement,
      L.latLng(initialLocation.latitude, initialLocation.longitude),
      initialZoom,
      startWaypointMarkerColor,
      endWaypointMarkerColor,
      'blue',
      startWaypointMarkerText,
      endWaypointMarkerText,
      'Промежуточная точка',
      props.graphhopperApiKey,
      () => { setIsLoading(true); },
      () => { setIsLoading(false); }
    );

    leafletMapRef.current = map;
    leafletRoutingControlRef.current = routingControl;

    return map;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.graphhopperApiKey]);

  return (
    <div className={`${classes.wrapper} ${isLoading ? classes.loading : ''}`}>
      <LeafletMapContainer createMap={createMapInternal} />
    </div>
  );
});

export default Map;