import { useRef } from 'react';
import Map, { MapImperativeHandle } from './map/Map';
import { appConfig } from 'appConfig';

function App() {
  const ref = useRef<MapImperativeHandle>(null);

  async function test() {
    await ref.current?.setWaypoints([
      { latitude: 55.826991 , longitude: 37.593999 },
      { latitude: 55.789141, longitude: 37.781785 }
    ]);

    //alert('Путь готов');
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
