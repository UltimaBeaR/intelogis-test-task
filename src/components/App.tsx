import { useRef, useState } from 'react';
import Split from 'react-split';
import ShippingList from './ShippingList';
import Map, { MapImperativeHandle } from './map/Map';
import { appConfig } from 'appConfig';
import { locations } from 'initialData/locations';

import classes from './App.module.scss';

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function App() {
  const mapRef = useRef<MapImperativeHandle>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [routeInfo, setRouteInfo] = useState({ from: '', to: '' });

  async function test() {
    setIsLoading(true);

    const fromLocationIdx = getRandomInt(0, locations.length - 1);

    let toLocationIdx: number;
    while (true) {
      toLocationIdx = getRandomInt(0, locations.length - 1);
      if (toLocationIdx !== fromLocationIdx)
        break;
    }
    
    const fromLocation = locations[fromLocationIdx];
    const toLocation = locations[toLocationIdx];

    setRouteInfo({
      from: fromLocation.name,
      to: toLocation.name
    });

    await mapRef.current?.setWaypoints([
      { latitude: fromLocation.latitude, longitude: fromLocation.longitude },
      { latitude: toLocation.latitude, longitude: toLocation.longitude }
    ]);

    setIsLoading(false);
  }

  return (
    <main className={classes.main}>
      <Split
        className="split"
        minSize={150}
        gutterSize={20}
        snapOffset={0}
      >
        <div className={classes['left']}>
          <h1>Заявки на погрузку/разгрузку <button onClick={test}>test</button></h1>
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
