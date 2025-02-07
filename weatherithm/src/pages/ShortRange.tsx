import '../styles/ShortRange.scss';
import {
  CiLocationArrow1,
  CiCloudSun,
  CiSun,
  CiCloud,
  CiCloudMoon,
} from 'react-icons/ci';
import { IoMoonOutline } from 'react-icons/io5';
import { TfiTarget } from 'react-icons/tfi';
import { FiCloudRain } from 'react-icons/fi';
import { FaLocationArrow, FaRegSnowflake } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setX } from '../store';
import { setY } from '../store';
import convertLatLonToGrid from '../convertLatLonToGrid';
import todayShortRange from '../shortRangeApi';
import moment from 'moment';

const calculateTodayTime = (i: number): string => {
  let time: number;
  if (i >= 21) {
    time = i - 21;
  } else {
    time = i + 3;
  }

  return time < 10 ? '0' + time : String(time);
};

const SKYCodeToIcon = (code: number, fcstTime: string) => {
  if (Number(fcstTime) >= 800 && Number(fcstTime) <= 1800) {
    switch (code) {
      case 1:
        return <CiSun size={40} />;
      case 3:
        return <CiCloudSun size={40} />;
    }
  } else {
    switch (code) {
      case 1:
        return <IoMoonOutline size={40} />;
      case 3:
        return <CiCloudMoon size={40} />;
    }
  }
  return <CiCloud size={40} />;
};

const PTYCodeToIcon = (code: number) => {
  switch (code) {
    case 1:
    case 4:
      return <FiCloudRain size={40} />;
    case 2:
    case 3:
      return <FaRegSnowflake size={40} />;
  }
};

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

  const [regionTodayData, setRegionTodayData] = useState<any>();

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
                onClick={async () => {
                  const { x, y } = convertLatLonToGrid(region.y, region.x);
                  dispatch(setX(x));
                  dispatch(setY(y));
                  setRegionList([]);
                  setKeyword(region.place_name);
                  setRegionTodayData(
                    await todayShortRange(
                      import.meta.env.VITE_API_KEY,
                      pos.x,
                      pos.y
                    )
                  );
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
        onClick={async () => {
          navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const { x, y } = convertLatLonToGrid(lat, lon);
            dispatch(setX(x));
            dispatch(setY(y));
          });
          setRegionTodayData(
            await todayShortRange(import.meta.env.VITE_API_KEY, pos.x, pos.y)
          );
        }}
      >
        <TfiTarget size={25} className="current-location-icon" />
        현재 위치 조회
      </div>
      <div className="today-data" style={{ position: 'relative' }}>
        <h2>오늘의 예보</h2>
        <h2
          style={{
            position: 'absolute',
            right: '0.5rem',
            top: '0.5rem',
            fontSize: '1.3rem',
            color: '#0098e0',
          }}
        >
          {moment().format('YYYY-MM-DD')}
        </h2>
        <div style={{ overflowX: 'scroll', width: '100%' }}>
          <table className="today-data-list">
            <thead>
              <tr>
                <th className="today-category">시각</th>
                {Array(24)
                  .fill(0)
                  .map((_, i) => {
                    return (
                      <th key={calculateTodayTime(i)} className="today-time">
                        {calculateTodayTime(i)}시
                      </th>
                    );
                  })}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="today-category">하늘상태</th>
                {regionTodayData
                  ?.filter((item: any) => item.category === 'SKY')
                  .map((data: any, i: any) => {
                    return (
                      <td key={calculateTodayTime(i)} className="today-data">
                        {SKYCodeToIcon(Number(data.fcstValue), data.fcstTime)}
                      </td>
                    );
                  })}
              </tr>
              <tr>
                <th className="today-category">강수형태</th>
                {regionTodayData
                  ?.filter((item: any) => item.category === 'PTY')
                  .map((data: any, i: any) => {
                    return (
                      <td key={calculateTodayTime(i)} className="today-data">
                        {PTYCodeToIcon(Number(data.fcstValue))}
                      </td>
                    );
                  })}
              </tr>
              <tr>
                <th className="today-category">기온</th>
                {regionTodayData
                  ?.filter((item: any) => item.category === 'TMP')
                  .map((data: any, i: any) => {
                    return (
                      <td key={calculateTodayTime(i)} className="today-data">
                        {data.fcstValue}℃
                      </td>
                    );
                  })}
              </tr>
              <tr>
                <th className="today-category">강수확률</th>
                {regionTodayData
                  ?.filter((item: any) => item.category === 'POP')
                  .map((data: any, i: any) => {
                    return (
                      <td key={calculateTodayTime(i)} className="today-data">
                        {data.fcstValue}%
                      </td>
                    );
                  })}
              </tr>
              <tr>
                <th className="today-category">풍향</th>
                {regionTodayData
                  ?.filter((item: any) => item.category === 'VEC')
                  .map((data: any, i: any) => {
                    return (
                      <td key={calculateTodayTime(i)} className="today-data">
                        {
                          <FaLocationArrow
                            size={20}
                            color="0098e0"
                            style={{
                              transform: `rotate(${data.fcstValue - 225}deg)`,
                            }}
                          />
                        }
                      </td>
                    );
                  })}
              </tr>
              <tr>
                <th className="today-category">풍속</th>
                {regionTodayData
                  ?.filter((item: any) => item.category === 'WSD')
                  .map((data: any, i: any) => {
                    return (
                      <td key={calculateTodayTime(i)} className="today-data">
                        {data.fcstValue}m/s
                      </td>
                    );
                  })}
              </tr>
              <tr>
                <th className="today-category">습도</th>
                {regionTodayData
                  ?.filter((item: any) => item.category === 'REH')
                  .map((data: any, i: any) => {
                    return (
                      <td key={calculateTodayTime(i)} className="today-data">
                        {data.fcstValue}%
                      </td>
                    );
                  })}
              </tr>{' '}
            </tbody>
          </table>
        </div>
        <p className="warning">
          지역을 변경하였는데 날씨가 바뀌지 않는다면 같은 지역으로 한 번 더
          선택해주세요.
        </p>
      </div>
    </div>
  );
};

export default ShortRange;
