import style from '@/app/(beforeLogin)/_component/main.module.css';
import Link from 'next/link';
import LoginModal from './LoginModal';

export default function Main() {
  return (
    <>
      <div>
        <LoginModal></LoginModal>
      </div>
    </>
    
  )
}