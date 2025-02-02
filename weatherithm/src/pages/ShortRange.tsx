import '../styles/ShortRange.scss';
import { CiLocationArrow1 } from 'react-icons/ci';
import { useState, useRef } from 'react';

const ShortRange = () => {
  const [region, setRegion] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="background">
      <h1 className="page-title">단기예보</h1>
      <form className="region-search-box" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="지역을 입력하세요"
          value={region}
          autoFocus
          ref={inputRef}
          onChange={(e) => setRegion(e.target.value)}
        />
        <button type="submit">
          <CiLocationArrow1 size={40} className="search-icon" />
        </button>
      </form>
    </div>
  );
};

export default ShortRange;
