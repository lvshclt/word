import { useState } from 'react';

export default function Day({ word }) {
  const [isShow, setIsShow] = useState(false);
  const [isDone, setIsDone] = useState(word.isDone);
  const [isDel, setIsDel] = useState(false);

  function toggleShow() {
    setIsShow(!isShow);
  }
  function toggleDone() {
    // setIsDone(!isDone);
    fetch(`http://localhost:3001/words/${word.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...word, isDone: !isDone }),
    }).then((res) => {
      if (res.ok) setIsDone(!isDone);
    });
  }

  function del() {
    if (window.confirm('??')) {
      fetch(`http://localhost:3001/words/${word.id}`, {
        method: 'DELETE',
      });
    }
    setIsDel(true);
  }

  return !isDel ? (
    <tr className={isDone ? 'off' : ''}>
      <td>
        <input type="checkbox" checked={isDone} onChange={toggleDone} />
      </td>
      <td>{word.eng}</td>
      <td>{isShow && word.kor}</td>
      <td>
        <button onClick={toggleShow}>{isShow ? '숨기기' : '뜻보기'}</button>
        <button className="btn_del" onClick={del}>
          삭제
        </button>
      </td>
    </tr>
  ) : null;
}
