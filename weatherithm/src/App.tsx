import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Main from './pages/Main';
import ShortRange from './pages/ShortRange';
import Map from './pages/Map';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<Layout />}>
        <Route path="/main" element={<Main />} />
        <Route path="/short_range" element={<ShortRange />} />
        <Route path="/map" element={<Map />} />
      </Route>
    </Routes>
  );
};

export default App;
