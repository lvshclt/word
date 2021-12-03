import { Link } from 'react-router-dom';

export default function EmptyPage() {
  return (
    <div>
      <h4>잘못된 접근입니다!</h4>
      <Link to="/">
        <h2>돌아가기</h2>
      </Link>
    </div>
  );
}
