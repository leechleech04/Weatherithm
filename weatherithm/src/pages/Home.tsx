import { Link } from 'react-router-dom';
import '../styles/Home.scss';
import { useEffect, useState } from 'react';

const Home: React.FC = () => {
  const [bgColor, setBgColor] = useState<string>('#191970');

  useEffect(() => {
    const searchLink =
      document.querySelector<HTMLAnchorElement>('.search-link');

    const handleMouseEnter = () => {
      setBgColor('#87cefa');
    };

    const handleMouseLeave = () => {
      setBgColor('#191970');
    };

    if (searchLink) {
      searchLink.addEventListener('mouseenter', handleMouseEnter);
      searchLink.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        searchLink.removeEventListener('mouseenter', handleMouseEnter);
        searchLink.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  });

  return (
    <div className="background" style={{ backgroundColor: bgColor }}>
      <div className="circle">
        <h1>Weatherithm</h1>
        <p>당신의 하루를 맞춤 설계하는 날씨 서비스</p>
        <Link to="/short_range" className="search-link">
          시작하기
        </Link>
      </div>
    </div>
  );
};

export default Home;
