import { useEffect, useState } from 'react';
import '../styles/MediumRange.scss';
import { getMediumRangeOutlook } from '../mediumRangeApi';

const MediumRange = () => {
  const [outlookRegion, setOutlookRegion] = useState('108');
  const [outlookContent, setOutlookContent] = useState('');
  const [outlookRegions] = useState([
    { code: '108', name: '전국' },
    { code: '105', name: '강원' },
    { code: '109', name: '서울·인천·경기' },
    { code: '131', name: '충북' },
    { code: '133', name: '대전·세종·충남' },
    { code: '146', name: '전북' },
    { code: '156', name: '광주·전남' },
    { code: '143', name: '대구·경북' },
    { code: '159', name: '부산·울산·경남' },
    { code: '184', name: '제주도' },
  ]);

  useEffect(() => {
    const fetchOutlook = async () => {
      const content = await getMediumRangeOutlook(
        import.meta.env.VITE_DECODING_API_KEY,
        outlookRegion
      );
      setOutlookContent(content);
    };
    fetchOutlook();
  }, [outlookRegion]);

  const handleOutlookNavClick = (code: string) => {
    setOutlookRegion(code);
  };

  return (
    <div className="background">
      <h1 className="page-title">중기예보</h1>
      <div className="outlook">
        <h2 className="sub-title">기상전망</h2>
        <ul className="outlook-nav">
          {outlookRegions.map((region) => (
            <li
              key={region.code}
              onClick={() => handleOutlookNavClick(region.code)}
              className={outlookRegion === region.code ? 'active-nav' : ''}
            >
              {region.name}
            </li>
          ))}
        </ul>
        <p className="outlook-content">{outlookContent}</p>
      </div>
      <div className="land">
        <h2 className="sub-title">육상예보</h2>
      </div>
    </div>
  );
};

export default MediumRange;
