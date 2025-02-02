import { useEffect, useState } from 'react';
import convertLatLonToGrid from '../convertLatLonToGrid';

declare global {
  interface Window {
    kakao: any;
  }
}

interface Place {
  id: string;
  place_name: string;
  category_name: string;
  category_group_code: string;
  category_group_name: string;
  phone: string;
  address_name: string;
  road_address_name: string;
  x: string;
  y: string;
  place_url: string;
  distance: string;
}

const { kakao } = window;

const Map = () => {
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  const [map, setMap] = useState<any>(null);
  const [places, setPlaces] = useState<any>(null);

  useEffect(() => {
    const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(latitude, longitude), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    setMap(new kakao.maps.Map(container, options)); //지도 생성 및 객체 리턴
  }, [latitude, longitude]);

  useEffect(() => {
    if (map && kakao.maps.services) {
      setPlaces(new kakao.maps.services.Places(map));
    }
  }, [map]);

  const [keyword, setKeyword] = useState<string>('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  const [result, setResult] = useState<Place[]>([]);
  const onClick = () => {
    if (places) {
      const callback = function (result: Place[], status: string) {
        if (status === kakao.maps.services.Status.OK) {
          console.log(result);
          setResult(result);
        }
      };

      places.keywordSearch(keyword, callback);
    } else {
      console.error('Places 객체가 초기화되지 않았습니다.');
    }
  };

  return (
    <div>
      <div
        id="map"
        style={{
          width: '500px',
          height: '400px',
        }}
      ></div>
      <input type="text" onChange={onChange} />
      <button onClick={onClick}>검색</button>
      <div>
        {result.map((place) => (
          <div key={place.id}>
            <h2>{place.place_name}</h2>
            <p>{place.road_address_name}</p>
            <p>{`longitude: ${place.x} latitude: ${place.y}`}</p>
            <p>{`격좌좌표: (${JSON.stringify(
              convertLatLonToGrid(Number(place.y), Number(place.x))
            )})`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Map;
