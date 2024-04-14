import './normalize.css';
import './App.scss';

import { useState } from 'react';

import reactLogo from './assets/react.svg';
import Navbar from './features/Navbar';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <div style={{ marginTop: '2rem' }}>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Pawza</h1>
      <h3>Your name is: Isabella</h3>
      <div className="card">
        <button onClick={() => setCount((p) => p + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
