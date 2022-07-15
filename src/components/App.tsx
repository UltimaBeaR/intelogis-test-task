import { useRef, useState } from 'react';
import Split from 'react-split'
import Map, { MapImperativeHandle } from './map/Map';
import { appConfig } from 'appConfig';

import classes from './App.module.scss';

function App() {
  const ref = useRef<MapImperativeHandle>(null);

  const [isLoading, setIsLoading] = useState(false);

  async function test() {
    setIsLoading(true);

    await ref.current?.setWaypoints([
      { latitude: 55.826991 , longitude: 37.593999 },
      { latitude: 55.826991 + (Math.random() - 0.5) * 0.3, longitude: 37.593999 + (Math.random() - 0.5) * 0.3 }
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
        <div className={classes['shipping-table']}>
          <button disabled={isLoading} onClick={test}>test</button>
        </div>
        <div className={classes['map']}>
          <Map ref={ref} initialLocation={{ latitude: 55.819720, longitude: 37.611699 }} graphhopperApiKey={appConfig.graphhopperApiKey} />
        </div>
      </Split>
    </main>
  );
}

export default App;
