import { useEffect, useState } from 'react';
import '../styles/Main.scss';
import convertLatLonToGrid from '../convertLatLonToGrid';

const Main: React.FC = () => {
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);
  return (
    <div className="background">
      당신의 위치 위도와 경도는 다음과 같습니다.
      <br />
      latitude: {latitude}
      <br />
      longitude: {longitude}
      <br />
      당신의 좌표는 다음과 같습니다.
      <br />
      x: {convertLatLonToGrid(latitude, longitude).x}
      <br />
      y: {convertLatLonToGrid(latitude, longitude).y}
    </div>
  );
};

export default Main;
