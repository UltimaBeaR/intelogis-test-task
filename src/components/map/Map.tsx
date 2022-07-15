import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import L from 'leaflet';
import LeafletMapContainer from 'components/LeafletMapContainer';
import { createMap } from './leafletCreateMap';

import classes from './Map.module.scss';

export interface Waypoint {
  latitude: number;
  longitude: number;
}

export interface MapProps {
  graphhopperApiKey: string;
}

export interface MapImperativeHandle {
  setWaypoints: (waypoints: Waypoint[]) => Promise<void>;
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
    setWaypoints(waypoints: Waypoint[]) {
      if (leafletMapRef.current == null || leafletRoutingControlRef.current == null || resolveResultForSetWaypointsRef.current !== null) {
        return Promise.reject();
      }

      const routing = leafletRoutingControlRef.current;

      const newWaypoints = waypoints.map(val => L.latLng(val.latitude, val.longitude));
      routing.setWaypoints(newWaypoints);

      return new Promise((resolve) => {
        resolveResultForSetWaypointsRef.current = resolve;
      });
    }
  }));

  const createMapInternal = useCallback((targetElement: HTMLDivElement) => {
    const { map, routingControl } = createMap(
      targetElement,
      props.graphhopperApiKey,
      () => { setIsLoading(true); },
      () => { setIsLoading(false); }
    );

    leafletMapRef.current = map;
    leafletRoutingControlRef.current = routingControl;

    return map;
  }, [ props.graphhopperApiKey ]);

  return (
    <div className={`${classes.wrapper} ${isLoading ? classes.loading : ''}`}>
      <LeafletMapContainer createMap={createMapInternal} />
    </div>
  );
});

export default Map;