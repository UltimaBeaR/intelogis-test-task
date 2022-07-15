import { useRef } from 'react';
import Map, { MapImperativeHandle } from './map/Map';
import { appConfig } from 'appConfig';

function App() {
  const ref = useRef<MapImperativeHandle>(null);

  function test() {
    ref.current?.setWaypoints([{ x: 55.826991 , y: 37.593999 }, { x: 55.789141, y: 37.781785 }]);
  }

  return (
    <>
      <div style={{ width: '800px', height: '800px' }}>
        <Map ref={ref} graphhopperApiKey={appConfig.graphhopperApiKey} />
      </div>
      <button onClick={test}>test</button>
    </>
  );
}

export default App;
