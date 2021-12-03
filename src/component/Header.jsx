import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
  const [isDimmed, setIsDimmed] = useState(false);

  function onClick() {
    setIsDimmed(!isDimmed);
  }

  return (
    <div className={`header ${isDimmed ? 'opacity' : ''}`}>
      <Link to="/">
        <h1>opic voca</h1>
      </Link>
      <div className="menu">
        <Link to="/create_word" className="link">
          단어추가
        </Link>
        <Link to="/create_day" className="link">
          day 추가
        </Link>
        <button onClick={onClick}>test</button>
      </div>
    </div>
  );
}
