import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch.jsx';
import Word from './Word.jsx';

export default function Day() {
  const navigate = useNavigate();
  let day = useParams().aaa * 1;


  const words = useFetch(`http://localhost:3001/words?day=${day}`);
  const max = useFetch(`http://localhost:3001/days`).length;

  function toNext() {
    day = day + 1;
    if (day <= max) navigate(`/day/${day}`);
    else alert('마지막 날입니다');
  }
  function toPrev() {
    day = day - 1;
    if (day >= 1) navigate(`/day/${day}`);
    else alert('가장 첫번째 날입니다');
  }

  return (
    <>
      <h2>Day {day}</h2>
      {words.length === 0 && <span>Loading</span>}
      <table>
        {words.map((word) => (
          <Word word={word} key={word.id} />
        ))}
      </table>
      <div className="buttons">
        <button className="move prev" onClick={toPrev}>
          이전 날로
        </button>
        <button className="move nuxt" onClick={toNext}>
          다음 날로
        </button>
      </div>
    </>
  );
}
