import { useEffect, useRef } from 'react';
import Split from 'react-split';
import ShippingList from './ShippingList';
import Map, { MapImperativeHandle } from './map/Map';
import { appConfig } from 'appConfig';
import { shippingMapService } from 'services';

import classes from './App.module.scss';

function App() {
  const mapRef = useRef<MapImperativeHandle>(null);

  useEffect(() => {
    shippingMapService.setImperativeHandle(mapRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapRef.current]);

  return (
    <main className={classes.main}>
      <Split
        className="split"
        minSize={150}
        gutterSize={20}
        snapOffset={0}
      >
        <div className={classes['left']}>
          <h1>Заявки на погрузку/разгрузку</h1>
          <div className={classes['shipping-list']}>
            <ShippingList />
          </div>
        </div>
        <div className={classes['map']}>
          <Map
            ref={mapRef}
            initialLocation={{ latitude: 55.819720, longitude: 37.611699 }}
            initialZoom={9}
            endWaypointMarkerColor='green'
            startWaypointMarkerText='Погрузка'
            endWaypointMarkerText='Разгрузка'
            graphhopperApiKey={appConfig.graphhopperApiKey}
          />
        </div>
      </Split>
    </main>
  );
}

export default App;
