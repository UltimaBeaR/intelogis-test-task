import { useEffect, useRef } from 'react';

interface LeafletMapContainerProps {
  createMap: (targetElement: HTMLDivElement) => any;
}

function LeafletMapContainer(props: LeafletMapContainerProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createdMap = props.createMap(mapRef.current!);

    return () => {
      if (createdMap) {
        createdMap?.remove();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.createMap]);

  return (
    <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
  );
}

export default LeafletMapContainer;
