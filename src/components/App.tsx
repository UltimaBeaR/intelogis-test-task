import { useState } from 'react';
import Map from './Map';

function App() {
  const [showMap, setShowMap] = useState(true);

  return (
    <>
      <div style={{ width: '400px', height: '400px' }}>
        <Map />
      </div>
      <div style={{ width: '800px', height: '800px' }}>
        { showMap && <Map /> }
      </div>

      <div><button onClick={() => { setShowMap(!showMap); }}>Show/Hide</button></div>
    </>
  );
}

export default App;
