import { useRef } from 'react';
import Map from './Map';

function App() {
  const ref = useRef<any>(null);

  function test() {
    ref.current.setWaypoints([{ x: 55.826991 , y: 37.593999 }, { x: 55.789141, y: 37.781785 }]);
  }

  return (
    <>
      <div style={{ width: '800px', height: '800px' }}>
        <Map ref={ref} />
      </div>
      <button onClick={test}>test</button>
    </>
  );
}

export default App;
