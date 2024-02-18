// PasswordVerification.tsx

import React, { useState } from 'react';
import { users } from '@/app/apis/api/user';

// onSuccess와 loggedInEmail에 대한 타입을 명시적으로 선언합니다.
interface PasswordVerificationProps {
  onSuccess: () => void;
  loggedInEmail: any;
}

const PasswordVerification: React.FC<PasswordVerificationProps> = ({ onSuccess, loggedInEmail }) => {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const loginDto: object = {
    emailId: loggedInEmail,
    password: password,
  };

  const verifyPassword = async () => {
    try {
      const data = await users.authorize(loginDto);

      if (data) {
        onSuccess();
      } else {
        setErrorMessage('비밀번호가 올바르지 않습니다. 다시 시도해주세요.');
      }
    } catch (error: unknown) {
      // error가 Error 인스턴스인지 확인합니다.
      const message = error instanceof Error ? error.message : '비밀번호 검증 중 오류가 발생했습니다.';
      console.error('비밀번호 검증 실패:', error);
      setErrorMessage(message);
    }
  };

  return (
    <div>
      <input
        type="password"
        placeholder="비밀번호를 입력하세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={verifyPassword}>확인</button>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </div>
  );
};

export default PasswordVerification;
