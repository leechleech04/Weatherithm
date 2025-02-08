import { Outlet, Link } from 'react-router-dom';
import { IoMenu } from 'react-icons/io5';
import { TiWeatherPartlySunny } from 'react-icons/ti';
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
                <p>단기예보</p>
                <TiWeatherPartlySunny />
              </Link>
            </li>
          </ul>
        </aside>
        <button className="menu-btn" onClick={menuToggle}>
          <IoMenu className="menu-icon" />
        </button>
      </div>
      <div className="content-box">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
