1.  npx create-react-app 폴더명

- cmd에서 먼저 cd 해놓고 첫 시작.
- 참고로 좋은 프로젝트 있으면
  그거 그냥 패키지락닷제이슨 확보해놓고 앞으로는 npm i 해버리자
  sass typescript react prettier react-router-dom 서버 포함한걸로

2.  npm install react-router-dom

3.  .env 라는 파일 만들고 SKIP_PREFLIGHT_CHECK=true 입력.

- npm start 돌아가게 하는거임.. 버전문제인듯

4.  npm start

5.  src/db/data.json

- 더미데이터

6. </h1>컴포넌트 폴더

- src/component

7. 컴포넌트 만들기
   export default function Header() {
   return <></>;
   }

8. 리액트로 스타일제어

- 클릭이벤트 -> 토글함수로 어떤 state바꿈 -> state가 어떻게 되는 지에 따라 클래스네임 변경 -> 스타일 바뀜
 <div className={sample ? 'off' : 'on'}>  a  </div>
 <div style={sample ? { color: 'red' } : { color: 'blue' }}>  b  </div>
<button className={`move prev ${sample ? '' : 'notAvailable'}`}>이전 날로</button>

9. 임시 서버 띄우기

   새로운 터미널에, 임시 서버. 프로토타입용. 공부용.
   npm install -g json-server
   json-server --watch ./src/db/data.json --port 3001
   더미데이터 주소 포트주소(안겹치게)

10. 다양한 재료

<react>
import { useRef } from 'react';
import { useEffect, useState } from 'react';

<react-router>
import { useNavigate } from 'react-router';

<react-router-dom>
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

11. useEffect

useEffect(() => {}, []);
useEffect(() => {}, [변수]);

12. fetch

- 처음에 빈 배열인데, 최초렌더링 후 fetch해서 집어넣는 형태

const [days, setDays] = useState([]);

useEffect(() => {
fetch('http://localhost:3001/days')
.then((res) => res.json())
.then((data) => {
setDays(data)
});
}, []);

13. http://localhost:3001/words?day=1

1일치 단어만 모아보기

14. BrowserRouter, Routes, Route, Link, useParams

버튼을 눌러서, 특정 url로 이동 -> route를 통해 특정 url일때 어떤 컴포넌트를 보일지 안내
-> 근데 모든 url에 일일이 대응하기보단, url의 일부를 변수로 쓸 수 있음. :/변수명 의 형태로.
-> 이때 안내한다고 한 컴포넌트에, {변수명 : url입력값}의 형태로, 전달됨.
-> 컴포넌트에서 사용하는 법은 const bbb = useParams().변수명 임.
-> 결과적으로, url이 어떤 규칙을 띌 때, 그 변수를 그대로 컴포넌트가 끌어다가 써서 요리할 수 있음.

    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<DayList />} />
          <Route path="/day/:aaa" element={<Day />} />
        </Routes>
      </div>
    </BrowserRouter>

15. 커스텀 훅
    /src/hooks 만듦
    안에 컴포넌트처럼 넣으면됨. 사실상 컴포넌트.
    그리고 리턴을 제대로 해서, 그 훅을 사용한 애가 잘 이어서 사용할 수 있게끔해놓기/

import { useState, useEffect } from 'react';

export default function useFetch(url) {
const [data, setData] = useState([]);

useEffect(() => {
fetch(url)
.then((res) => res.json())
.then((data) => {
setData(data);
});
}, [url]);

return data;
}

16. CRUD의 DELETE 구현

fetch( '주소' , {method: 'DELETE' } )

function del() {
fetch(`http://localhost:3001/words/${word.id}`, { method: 'DELETE' });
}

이 주소에 있는 것들이 다 사라진다.
근데 화면에 즉시 반영되는 것은 별개의 문제이기때문에(state에 변화가 없으면 아무것도 안바뀐다),
화면에 나타나는 것을 state로 정한다음, 삭제하는 순간, 그 state에 변화를 줘서 화면에도 삭제하는것으로 한다.
아예 return isDel? null : 삭제안한경우 내보내야할 태그.
이런식으로 했다.

17. useRef

포커싱을 주거나, 값을 알기 위해
dom 객체를 타겟팅하는 것.

초깃값 null로 넣어놓고
각 dom에 ref태그를 걸어둔다.

그 상자에 current하면, 그 dom태그에 접근할수있고
value는 결국 그의 값이다.

import { useRef } from 'react';

const engRef = useRef(null);

<input type="text" placeholder="computer" ref={engRef} />

alert(engRef.current.value);

18. CRUD의 POST 구현

fetch(
//1
'url',
//2
{method:'POST',headers:{}, body:JSON.stringify({어떤모양으로})}
)

.then((res) => {
if (res.ok) {
fetch 다되고 할 거~
}
});

function onSubmit(e) {
e.preventDefault();

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
      }
    });

}

참고로 id는 자동부여됨

19. useNavigate

클릭없이 링크로 가게하는 것
보통 navigate라는 상수에 useNavigate()라는 훅을 호출하는 형태로 집어넣는다.
근데 집어넣은게 함수다.
고로, navigate(~~~주소) 로하면된다.

import { useNavigate } from 'react-router';

const navigate = useNavigate();

// navigate('/');
// navigate(-1);
// navigate(-2);
// navigate(`post/%'`);

navigate(`/day/${dayRef.current.value}`);

20. 로딩

컴포넌트를 불러와야되는데 인터넷느려서 안 뜨고있는 상황
그 컴포넌트가 사용하는 데이터 배열. 그 배열의 길이가 0일때가
안 뜬 상황이라 간주.
그럴때 다른걸 return하게하면된다.

export default function DayList() {
const days = useFetch('http://localhost:3001/days');

if (days.length === 0) return <h1>Loading...</h1>;

return (
<>

<ul className="list_day">
{days.map((day) => (
<li key={day.id}>
<Link to={`/day/${day.day}`}>Day {day.day}</Link>
</li>
))}
</ul>
</>
);
}

21. 클릭막아두기

기본적으로 isLoading 을 false 로 해놓고
false일때만 눌러지게, 즉 온클릭이벤트 시행되게 한다.

그다음
다끝나면 다시 isLoading false로 해놓으면됨.

const [isLoading, setIsLoading] = useState(false);

function onSubmit(e) {
if (!isLoading) {

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
return <button style={{ opacity: isLoading ? 0.3 : 1 }}> {isLoading ? 'saving' : '저장'}</button>
}

22. state와 css변동
    return <button style={{ opacity: isLoading ? 0.3 : 1 }}> {isLoading ? 'saving' : '저장'}</button>
