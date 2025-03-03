import { Outlet, Link } from 'react-router-dom';
import { IoMenu } from 'react-icons/io5';
import { TiWeatherPartlySunny } from 'react-icons/ti';
import { RiEarthquakeLine } from 'react-icons/ri';
import { PiHurricane } from 'react-icons/pi';
import { TbFaceMask } from 'react-icons/tb';
import '../styles/Layout.scss';
import { useEffect, useState } from 'react';

const Layout: React.FC = () => {
  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    const menu = document.querySelector<HTMLAnchorElement>('.menu-box');
    if (visibility) {
      menu?.classList.remove('menu-hidden');
    } else {
      menu?.classList.add('menu-hidden');
    }
  }, [visibility]);

  const menuToggle = () => {
    setVisibility(!visibility);
  };

  return (
    <div>
      <div className="menu-box">
        <aside>
          <Link to="/main">
            <h1>Weatherithm</h1>
          </Link>
          <ul>
            <li>
              <Link to="/short_range" className="menu-link">
                <p className="menu-name">단기예보</p>
                <TiWeatherPartlySunny className="menu-icon" />
              </Link>
            </li>
            <li>
              <Link to="/medium_range" className="menu-link">
                <p className="menu-name">중기예보</p>
                <TiWeatherPartlySunny className="menu-icon" />
              </Link>
            </li>
            <li>
              <Link to="/earthquake" className="menu-link">
                <p className="menu-name">지진·해일</p>
                <RiEarthquakeLine className="menu-icon" />
              </Link>
            </li>
            <li>
              <Link to="/typhoon" className="menu-link">
                <p className="menu-name">태풍</p>
                <PiHurricane className="menu-icon" />
              </Link>
            </li>
            <li>
              <Link to="/yellow_dust" className="menu-link">
                <p className="menu-name">황사</p>
                <TbFaceMask className="menu-icon" />
              </Link>
            </li>
            <li>
              <Link to="/fine_dust" className="menu-link">
                <p className="menu-name">미세먼지</p>
                <TbFaceMask className="menu-icon" />
              </Link>
            </li>
          </ul>
        </aside>
        <button className="menu-btn" onClick={menuToggle}>
          <IoMenu className="menu-bar" />
        </button>
      </div>
      <div className="content-box">
        <div className="background">
          <Outlet />
        </div>
      </div>
      <footer>
        <p>data.go.kr 공공데이터포털 - 기상청</p>
        <p>kakao developer - kakao map</p>
        <p>기상청 날씨누리</p>
      </footer>
    </div>
  );
};

export default Layout;
