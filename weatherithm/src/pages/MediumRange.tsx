import { useEffect, useState } from 'react';
import '../styles/MediumRange.scss';
import {
  getMediumRangeOutlook,
  getMediumRangeLand,
  getMediumRangeTemp,
} from '../mediumRangeApi';
import moment from 'moment';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

moment.updateLocale('ko', {
  weekdaysShort: ['일', '월', '화', '수', '목', '금', '토'],
});

const skyStringToImage = (sky: string) => {
  switch (sky) {
    case '구름많고 눈':
      return <img src="/sky/구름많고 눈.png" />;
    case '구름많고 비':
      return <img src="/sky/구름많고 비.png" />;
    case '구름많고 비/눈':
      return <img src="/sky/구름많고 비/눈.png" />;
    case '구름많음':
      return <img src="/sky/구름많음.png" />;
    case '맑음':
      return <img src="/sky/맑음.png" />;
    case '소나기':
      return <img src="/sky/소나기.png" />;
    case '흐리고 눈':
      return <img src="/sky/흐리고 눈.png" />;
    case '흐리고 비':
      return <img src="/sky/흐리고 비.png" />;
    case '흐리고 비/눈':
      return <img src="/sky/흐리고 비/눈.png" />;
    case '흐림':
      return <img src="/sky/흐림.png" />;
    case '구름많고 소나기':
    case '흐리고 소나기':
      return <img src="/sky/소나기.png" />;
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

  const tempRegions = {
    '서울·인천·경기도': {
      서울: '11B10101',
      인천: '11B20201',
      수원: '11B20601',
      파주: '11B20305',
      이천: '11B20701',
      평택: '11B20606',
    },
    '강원도 영서': {
      춘천: '11D10301',
      원주: '11D10401',
    },
    '강원도 영동': {
      강릉: '11D20501',
    },
    '대전·세종·충청남도': {
      대전: '11C20401',
      세종: '11C20404',
      홍성: '11C20104',
    },
    충청북도: {
      청주: '11C10301',
      충주: '11C10101',
      영동: '11C10402',
    },
    '광주·전라남도': {
      광주: '11F20501',
      목포: '21F20801',
      여수: '11F20401',
      순천: '11F20603',
      광양: '11F20402',
      나주: '11F20503',
    },
    전북자치도: {
      전주: '11F10201',
      군산: '21F10501',
      정읍: '11F10203',
      남원: '11F10401',
      고창: '21F10601',
      무주: '11F10302',
    },
    '부산·울산·경상남도': {
      부산: '11H20201',
      울산: '11H20101',
      창원: '11H20301',
      진주: '11H20701',
      거창: '11H20502',
      통영: '11H20401',
    },
    '대구·경상북도': {
      대구: '11H10701',
      안동: '11H10501',
      포항: '11H10201',
      경주: '11H10202',
      울진: '11H10101',
      울릉도: '11E00101',
    },
    제주도: {
      제주: '11G00201',
      서귀포: '11G00401',
    },
  };

  const [tempMin, setTempMin] = useState<any[]>([]);
  const [tempMax, setTempMax] = useState<any[]>([]);
  const [tempRegion, setTempRegion] = useState('11B10101');

  useEffect(() => {
    const fetchTemp = async () => {
      const { tempMin, tempMax } = await getMediumRangeTemp(
        import.meta.env.VITE_DECODING_API_KEY,
        tempRegion
      );
      setTempMin(tempMin);
      setTempMax(tempMax);
    };
    fetchTemp();
  }, [tempRegion]);

  const data = {
    labels:
      moment().hour() < 6
        ? Array.from({ length: 6 }).map((_, i) =>
            moment()
              .add(i + 5, 'days')
              .format('MM/DD(ddd)')
          )
        : Array.from({ length: 7 }).map((_, i) =>
            moment()
              .add(i + 4, 'days')
              .format('MM/DD(ddd)')
          ),
    datasets: [
      {
        label: '최고기온',
        data: tempMax,
        borderWidth: 2,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        pointRadius: 5,
      },
      {
        label: '최저기온',
        data: tempMin,
        borderWidth: 2,
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        pointRadius: 5,
      },
    ],
  };

  const options = {
    interaction: {
      mode: 'index' as const,
      intersect: true,
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 16,
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 16,
          },
        },
      },
    },
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
        <table className="land-table">
          <thead>
            <tr>
              <th rowSpan={2}>지역</th>
              {moment().hour() < 6
                ? Array.from({ length: 6 }).map((_, i) => (
                    <th
                      key={i}
                      colSpan={i < 3 ? 2 : undefined}
                      rowSpan={i >= 3 ? 2 : undefined}
                    >
                      {moment()
                        .subtract(1, 'days')
                        .add(i + 5, 'days')
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
      <div className="temp">
        <h2 className="sub-title">최저/최고기온</h2>
        <select
          value={tempRegion}
          onChange={(e) => setTempRegion(e.target.value)}
          className="temp-select"
        >
          {Object.entries(tempRegions).map(([region, cities]) => (
            <optgroup key={region} label={region}>
              {Object.entries(cities).map(([city, code]) => (
                <option key={code} value={code}>
                  {city}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <Line options={options} data={data} className="temp-chart" />
      </div>
    </div>
  );
};

export default MediumRange;
