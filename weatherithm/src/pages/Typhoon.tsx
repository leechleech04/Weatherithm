import '../styles/Typhoon.scss';
import { getTyphoon } from '../typhoonApi';
import { useEffect, useState } from 'react';
import { FcNoIdea } from 'react-icons/fc';

const Typhoon = () => {
  const [typhoonData, setTyphoonData] = useState<any[]>([]);

  useEffect(() => {
    const fetchTyphoon = async () => {
      const data = await getTyphoon(import.meta.env.VITE_DECODING_API_KEY);
      setTyphoonData(data);
    };
    fetchTyphoon();
  }, []);

  return (
    <div className="background">
      <h1 className="page-title">태풍</h1>
      <div className="typhoon-content">
        {typhoonData.length > 0 ? (
          typhoonData.map((typhoon) => <div></div>)
        ) : (
          <p className="no-data">
            <FcNoIdea size={50} /> 최근 3일 이내 발생한 태풍이 없습니다.
          </p>
        )}
      </div>
    </div>
  );
};

export default Typhoon;
