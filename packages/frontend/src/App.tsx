import './normalize.css';
import './App.scss';

import Footer from './features/Footer';
import Home from './features/Home';
import Navbar from './features/Navbar';

function App() {
  return (
    <>
      <Navbar />
      {/* TODO: Add react-router */}
      <main style={{ flexGrow: 1, maxWidth: '400px', alignSelf: 'center' }}>
        <Home />
      </main>
      <Footer />
    </>
  );
}

export default App;
