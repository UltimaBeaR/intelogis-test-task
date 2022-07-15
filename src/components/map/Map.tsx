import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import L from 'leaflet';
import LeafletMapContainer from 'components/LeafletMapContainer';
import { createMap } from './leafletCreateMap';

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
  const lefaletRoutingControlRef = useRef<L.Routing.Control | null>(null);

  useImperativeHandle(ref, () => ({
    setWaypoints(waypoints: Waypoint[]) {
      const newWaypoints = waypoints.map(val => L.latLng(val.latitude, val.longitude));

      lefaletRoutingControlRef.current?.setWaypoints(newWaypoints);

      return Promise.resolve();
    }
  }));

  function createMapInternal(targetElement: HTMLDivElement) {
    const { map, routingControl } = createMap(targetElement, props.graphhopperApiKey);

    leafletMapRef.current = map;
    lefaletRoutingControlRef.current = routingControl;

    return map;
  }

  return (
    <LeafletMapContainer createMap={createMapInternal} />
  );
});

export default Map;