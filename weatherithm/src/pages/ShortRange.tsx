import { useEffect, useState } from 'react';
import convertLatLonToGrid from '../convertLatLonToGrid';
import { IoMdSearch } from 'react-icons/io';
import '../styles/Search.scss';

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

const ShortRange = () => {
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
    <div className="background">
      <form className="search-form">
        <input type="text" className="search-input" />
        <button type="submit" className="search-button">
          <IoMdSearch />
        </button>
      </form>
      <div
        id="map"
        style={{
          width: '500px',
          height: '400px',
          display: 'none',
        }}
      ></div>
    </div>
  );
};

export default ShortRange;
