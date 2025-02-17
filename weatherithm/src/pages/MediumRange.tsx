import { useEffect, useState } from 'react';
import '../styles/MediumRange.scss';
import { getMediumRangeOutlook, getMediumRangeLand } from '../mediumRangeApi';
import moment from 'moment';

moment.updateLocale('ko', {
  weekdaysShort: ['일', '월', '화', '수', '목', '금', '토'],
});

const skyStringToImage = (sky: string) => {
  switch (sky) {
    case '구름많고 눈':
      return <img src="/sky/구름많고 눈.png"></img>;
    case '구름많고 비':
      return <img src="/sky/구름많고 비.png"></img>;
    case '구름많고 비/눈':
      return <img src="/sky/구름많고 비/눈.png"></img>;
    case '구름많음':
      return <img src="/sky/구름많음.png"></img>;
    case '맑음':
      return <img src="/sky/맑음.png"></img>;
    case '소나기':
      return <img src="/sky/소나기.png"></img>;
    case '흐리고 눈':
      return <img src="/sky/흐리고 눈.png"></img>;
    case '흐리고 비':
      return <img src="/sky/흐리고 비.png"></img>;
    case '흐리고 비/눈':
      return <img src="/sky/흐리고 비/눈.png"></img>;
    case '흐림':
      return <img src="/sky/흐림.png"></img>;
  }
};

const MediumRange = () => {
  const [outlookRegion, setOutlookRegion] = useState('108');
  const [outlookContent, setOutlookContent] = useState('');
  const outlookRegions = [
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
  ];

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

  const landRegions = [
    '서울·인천·경기도',
    '강원도 영서',
    '강원도 영동',
    '대전·세종·충청남도',
    '충청북도',
    '광주·전라남도',
    '전북자치도',
    '대구·경상북도',
    '부산·울산·경상남도',
    '제주도',
  ];

  const [landData, setLandData] = useState<any[]>([]);

  useEffect(() => {
    const fetchLand = async () => {
      const data = await getMediumRangeLand(
        import.meta.env.VITE_DECODING_API_KEY
      );
      setLandData(data);
    };
    fetchLand();
  }, []);

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
        <table className="land-table">
          <thead>
            <tr>
              <th rowSpan={2}>지역</th>
              {moment().hour() < 6
                ? Array.from({ length: 7 }).map((_, i) => (
                    <th
                      key={i}
                      colSpan={i < 4 ? 2 : undefined}
                      rowSpan={i >= 4 ? 2 : undefined}
                    >
                      {moment()
                        .subtract(1, 'days')
                        .add(i + 4, 'days')
                        .format('MM/DD(ddd)')}
                    </th>
                  ))
                : Array.from({ length: 7 }).map((_, i) => (
                    <th
                      key={i}
                      colSpan={i < 4 ? 2 : undefined}
                      rowSpan={i >= 4 ? 2 : undefined}
                    >
                      {moment()
                        .add(i + 4, 'days')
                        .format('MM/DD(ddd)')}
                    </th>
                  ))}
            </tr>
            <tr>
              {Array.from({ length: 8 }).map((_, i) => (
                <th key={i}>{i % 2 === 0 ? '오전' : '오후'}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {landRegions.map((region, i) => (
              <tr key={i}>
                <th>{region}</th>
                {landData[i] &&
                  Object.keys(landData[i])
                    .filter((key) => {
                      return key.startsWith('wf');
                    })
                    .map((key, j) => (
                      <td key={j}>{skyStringToImage(landData[i][key])}</td>
                    ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MediumRange;
