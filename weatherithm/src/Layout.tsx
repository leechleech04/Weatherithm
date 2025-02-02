import { Outlet } from 'react-router-dom';
import { IoMenu } from 'react-icons/io5';
import { TiWeatherPartlySunny } from 'react-icons/ti';
import './styles/Layout.scss';
import { useEffect, useState } from 'react';

const Layout = () => {
  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    const menu = document.querySelector<HTMLAnchorElement>('.menu-box');
    if (visibility) {
      menu?.classList.remove('hidden');
    } else {
      menu?.classList.add('hidden');
    }
  }, [visibility]);

  const onClick = () => {
    setVisibility(!visibility);
  };

  return (
    <div>
      <div className="menu-box">
        <aside>
          <h1>Weatherithm</h1>
          <ul>
            <li>
              <p>단기예보</p>
              <TiWeatherPartlySunny />
            </li>
          </ul>
        </aside>
        <button className="menu-btn" onClick={onClick}>
          <IoMenu className="menu-icon" />
        </button>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
