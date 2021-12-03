import { useNavigate } from 'react-router';
import useFetch from '../hooks/useFetch';

export default function CreateDay() {
  const days = useFetch('http://localhost:3001/days');

  const navigate = useNavigate();

  function onClick(e) {
    fetch('http://localhost:3001/days/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        day: days.length + 1,
      }),
    }).then((res) => {
      if (res.ok) {
        alert('완료!');
        navigate('/');
      }
    });
  }

  return (
    <div>
      <h3>현재일수{days.length}</h3>
      <button onClick={onClick}>저장</button>
    </div>
  );
}
