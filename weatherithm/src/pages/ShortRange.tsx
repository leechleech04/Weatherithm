import '../styles/ShortRange.scss';
import { CiLocationArrow1 } from 'react-icons/ci';
import { TfiTarget } from 'react-icons/tfi';
import { useState, useRef } from 'react';
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

  const [region, setRegion] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="background">
      <h1 className="page-title">단기예보</h1>
      <form className="region-search-box" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="지역을 입력하세요"
          value={region}
          autoFocus
          ref={inputRef}
          onChange={(e) => setRegion(e.target.value)}
        />
        <button type="submit">
          <CiLocationArrow1 size={40} className="search-icon" />
        </button>
      </form>
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
