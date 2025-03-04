import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Main from './pages/Main';
import ShortRange from './pages/ShortRange';
import Map from './pages/Map';
import MediumRange from './pages/MediumRange';
import Earthquake from './pages/Earthquake';
import Typhoon from './pages/Typhoon';
import YellowDust from './pages/YellowDust';
import FineDust from './pages/FineDust';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<Layout />}>
        <Route path="/main" element={<Main />} />
        <Route path="/short_range" element={<ShortRange />} />
        <Route path="/medium_range" element={<MediumRange />} />
        <Route path="/earthquake" element={<Earthquake />} />
        <Route path="/typhoon" element={<Typhoon />} />
        <Route path="/yellow_dust" element={<YellowDust />} />
        <Route path="/fine_dust" element={<FineDust />} />
        <Route path="/map" element={<Map />} />
      </Route>
    </Routes>
  );
};

export default App;
