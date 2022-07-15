import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import LeafletMapContainer from 'components/LeafletMapContainer';
import { createMap } from './leafletCreateMap';

// TODO: временно так, чтобы не ругалось на отсутствующие тайпинги плагинов
const L: any = require('leaflet');

export interface MapProps {
  graphhopperApiKey: string;
}

export interface MapImperativeHandle {
  setWaypoints: (waypoints: any) => void;
}

const Map = forwardRef((props: MapProps, ref: React.ForwardedRef<MapImperativeHandle>) => {
  const leafletMapRef = useRef<any>(null);
  const lefaletRoutingControlRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    setWaypoints(waypoints: any) {
      const newWaypoints = waypoints.map((val: any) => L.latLng(val.x, val.y));

      lefaletRoutingControlRef.current.setWaypoints(newWaypoints);
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