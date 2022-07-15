import { useEffect, useRef } from 'react';
import L from 'leaflet';

export interface LeafletMapContainerProps {
  // note: лучше использовать useCallback извне для этой функции,
  // чтобы карты не пересоздавались каждый раз когда идет ре-рендер внешнего компонента, задающего эту функцию
  createMap: (targetElement: HTMLDivElement) => L.Map;
}

function LeafletMapContainer(props: LeafletMapContainerProps) {
  const mapTargetElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createdMap = props.createMap(mapTargetElementRef.current!);

    return () => {
      createdMap.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.createMap]);

  return (
    <div ref={mapTargetElementRef} style={{ width: '100%', height: '100%' }} />
  );
}

export default LeafletMapContainer;
