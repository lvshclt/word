import useFetch from '../hooks/useFetch';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';

export default function CreateWord() {
  const days = useFetch('http://localhost:3001/days'); //[{},{},{}]

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const engRef = useRef(null);
  const korRef = useRef(null);
  const dayRef = useRef(null);

  function onSubmit(e) {
    if (!isLoading) {
      e.preventDefault();

      setIsLoading(true);
      fetch('http://localhost:3001/words/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          day: dayRef.current.value,
          eng: engRef.current.value,
          kor: korRef.current.value,
          isDone: false,
        }),
      }).then((res) => {
        if (res.ok) {
          alert('완료!');
          navigate(`/day/${dayRef.current.value}`);
          setIsLoading(false);
        }
      });
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="input_area">
        <label>Eng</label>
        <input type="text" placeholder="computer" ref={engRef} />
      </div>
      <div className="input_area">
        <label>Kor</label>
        <input type="text" placeholder="컴퓨터" ref={korRef} />
      </div>
      <div className="input_area">
        <label>Day</label>
        <select ref={dayRef}>
          {days.map((day) => (
            <option>{day.day}</option>
          ))}
        </select>
        <button style={{ opacity: isLoading ? 0.3 : 1 }}> {isLoading ? 'saving' : '저장'}</button>
      </div>
    </form>
  );
}
