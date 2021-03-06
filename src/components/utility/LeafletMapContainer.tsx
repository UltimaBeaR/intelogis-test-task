import { useEffect, useRef } from 'react';
import L from 'leaflet';

export interface LeafletMapContainerProps {
  /**
   * Функция для создания и настройки карты через leaflet
   * 
   * note: лучше использовать useCallback извне для этой функции,
   * чтобы карты не пересоздавались каждый раз когда идет ре-рендер внешнего компонента, задающего эту функцию
   */
  createMap: (targetElement: HTMLDivElement) => L.Map;

  autoInvalidateSize?: boolean;
}

/**
 * Простой контейнер для leaflet карты. Подстраивается под размер родителя
 */
function LeafletMapContainer(props: LeafletMapContainerProps) {
  const mapTargetElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createdMap = props.createMap(mapTargetElementRef.current!);

    if (props.autoInvalidateSize ?? true) {
      setInterval(function () {
        createdMap.invalidateSize({ pan: false });
      }, 500);
    }

    return () => {
      createdMap.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.createMap, props.autoInvalidateSize]);

  return (
    <div ref={mapTargetElementRef} style={{ width: '100%', height: '100%' }} />
  );
}

export default LeafletMapContainer;
