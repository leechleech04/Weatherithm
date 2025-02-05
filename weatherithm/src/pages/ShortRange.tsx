import '../styles/ShortRange.scss';
import { CiLocationArrow1 } from 'react-icons/ci';
import { TfiTarget } from 'react-icons/tfi';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setX } from '../store';
import { setY } from '../store';
import convertLatLonToGrid from '../convertLatLonToGrid';

const ShortRange = () => {
  const dispatch = useDispatch();

  interface Position {
    x: number;
    y: number;
  }

  const pos = useSelector((state: Position) => state);

  const [places, setPlaces] = useState<any>();
  useEffect(() => {
    if (window.kakao.maps.services) {
      setPlaces(new window.kakao.maps.services.Places());
    }
  }, [window.kakao]);

  const [keyword, setKeyword] = useState('');

  const [regionList, setRegionList] = useState<any[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.focus();
    }
    const callback = (result: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setRegionList(result);
      }
    };

    places.keywordSearch(keyword, callback);
  };

  const regionListRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      regionListRef.current &&
      !regionListRef.current.contains(e.target as Node)
    ) {
      setRegionList([]);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <div className="background">
      <h1 className="page-title">단기예보</h1>
      <form className="keyword-search-box" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="주요지명으로 입력하세요"
          value={keyword}
          autoFocus
          ref={inputRef}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit">
          <CiLocationArrow1 size={40} className="search-icon" />
        </button>
      </form>
      <div style={{ position: 'relative', width: '100%' }} ref={regionListRef}>
        {regionList.length > 0 && (
          <ul className="region-list">
            {regionList.map((region) => (
              <li
                key={region.id}
                className="region"
                onClick={() => {
                  const { x, y } = convertLatLonToGrid(region.y, region.x);
                  dispatch(setX(x));
                  dispatch(setY(y));
                  setRegionList([]);
                  setKeyword(region.place_name);
                }}
              >
                <h2>{region.place_name}</h2>
                <p>{region.address_name}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div
        className="current-location"
        onClick={() => {
          navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const { x, y } = convertLatLonToGrid(lat, lon);
            dispatch(setX(x));
            dispatch(setY(y));
          });
        }}
      >
        <TfiTarget size={25} className="current-location-icon" />
        현재 위치 조회
      </div>
      <p>
        당신의 현재 위치: {pos.x} {pos.y}
      </p>
    </div>
  );
};

export default ShortRange;
