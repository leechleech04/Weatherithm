import '../styles/Main.scss';
import { veryShortRange } from '../shortRangeApi';
import convertLatLonToGrid from '../convertLatLonToGrid';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { CiCloudSun, CiSun, CiCloud, CiCloudMoon } from 'react-icons/ci';
import { IoMoonOutline } from 'react-icons/io5';
import { FiCloudRain } from 'react-icons/fi';
import { FaRegSnowflake } from 'react-icons/fa';

const SKYCodeToIcon = (code: number) => {
  const fcstTime = moment().add(1, 'hours').format('HH00');
  if (Number(fcstTime) >= 800 && Number(fcstTime) <= 1800) {
    switch (code) {
      case 1:
        return <CiSun size={70} style={{ verticalAlign: 'bottom' }} />;
      case 3:
        return <CiCloudSun size={70} style={{ verticalAlign: 'bottom' }} />;
    }
  } else {
    switch (code) {
      case 1:
        return <IoMoonOutline size={70} style={{ verticalAlign: 'bottom' }} />;
      case 3:
        return <CiCloudMoon size={70} style={{ verticalAlign: 'bottom' }} />;
    }
  }
  return <CiCloud size={70} style={{ verticalAlign: 'bottom' }} />;
};

const PTYCodeToIcon = (code: number) => {
  switch (code) {
    case 1:
    case 4:
      return <FiCloudRain size={70} style={{ verticalAlign: 'bottom' }} />;
    case 2:
    case 3:
      return <FaRegSnowflake size={70} style={{ verticalAlign: 'bottom' }} />;
    default:
      return '강수없음';
  }
};

const bindRN1 = (code: string) => {
  if (code !== '강수없음') {
    return `${code}mm`;
  } else {
    return '강수없음';
  }
};

const Main: React.FC = () => {
  interface Position {
    x: number;
    y: number;
  }
  const [pos, setPos] = useState<Position>({ x: 0, y: 0 });
  const [mainData, setMainData] = useState<[any]>([null]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const { x, y } = convertLatLonToGrid(lat, lon);
      setPos({ x, y });
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await veryShortRange(
        import.meta.env.VITE_API_KEY,
        pos.x,
        pos.y
      );
      setMainData(
        data.filter(
          (item: any) =>
            item.fcstTime === moment().add(1, 'hours').format('HH00')
        )
      );
    };

    if (pos.x !== 0 && pos.y !== 0) {
      fetchData();
    }
  }, [pos]);

  return (
    <div className="background">
      <h1 className="main-page-title">Weatherithm</h1>
      <p className="current-date">
        {moment().add(1, 'hours').format('YYYY년 MM월 DD일 HH시 ')} 기준 현위치
        주요 날씨 정보
      </p>
      {mainData ? (
        <div className="main-data">
          <p className="T1H-data">
            {
              mainData?.filter((data: any) => data?.category === 'T1H')[0]
                ?.fcstValue
            }
            °C
          </p>
          <p className="SKY-data">
            {SKYCodeToIcon(
              mainData?.filter((data: any) => data?.category === 'SKY')[0]
                ?.fcstValue
            )}
          </p>
          <div className="wrap-PTY-RN1">
            <p className="PTY-data">
              {PTYCodeToIcon(
                mainData?.filter((data: any) => data?.category === 'PTY')[0]
                  ?.fcstValue
              )}
            </p>
            <p className="RN1-data">
              {bindRN1(
                mainData?.filter((data: any) => data?.category === 'RN1')[0]
                  ?.fcstValue
              )}
            </p>
          </div>
          <p className="WSD-data">
            {
              mainData?.filter((data: any) => data?.category === 'WSD')[0]
                ?.fcstValue
            }
            m/s
          </p>
        </div>
      ) : (
        <p>로딩중...</p>
      )}
    </div>
  );
};

export default Main;
