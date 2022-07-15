import { useEffect, useRef } from 'react';
import L from 'leaflet';

export interface LeafletMapContainerProps {
  createMap: (targetElement: HTMLDivElement) => L.Map;
}

function LeafletMapContainer(props: LeafletMapContainerProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createdMap = props.createMap(mapRef.current!);

    return () => {
      createdMap.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.createMap]);

  return (
    <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
  );
}

export default LeafletMapContainer;
