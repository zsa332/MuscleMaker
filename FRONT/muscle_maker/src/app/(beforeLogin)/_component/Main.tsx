import style from '@/app/(beforeLogin)/_component/main.module.css';
import Link from 'next/link';

export default function Main() {
  return (
    <>
      <div>
        <h1>로그인하세요</h1>
        <h2>지금 가입하세요</h2>
        <Link href="/ls/signup">가입하기</Link>
        <h3>이미 가입하셨나요?</h3>
        <Link href="/ls/login">로그인</Link>
      </div>
    </>
    
  )
}