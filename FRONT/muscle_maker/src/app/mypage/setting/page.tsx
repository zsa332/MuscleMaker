// pages.tsx

"use client"
import Settings from "./_component/Settings";
import React, { useState, useEffect } from 'react';
import PasswordVerification from "./_component/PasswordVerification";
import UserService from "@/app/apis/service/userservice";


interface UserData {
  image: string;
  name: string;
  emailId: string;
}

export default function SettingPage() {
  const [isVerified, setIsVerified] = useState(false);
  const [response, setResponse] =  useState<UserData | null>(null); 

  useEffect(() => {
    UserService.getMyUserInfo()
      .then(data => {
        console.log(data);
        setResponse(data.data);
      })
      .catch(error => {
        console.error('오류 발생:', error);
      });
  }, []); 


  return (
    <div>
      <div>
        {!isVerified ? (
          // onSuccess 콜백과 현재 로그인된 사용자의 이메일을 PasswordVerification 컴포넌트에 전달합니다.
          <PasswordVerification onSuccess={() => setIsVerified(true)} loggedInEmail={response?.emailId} />
        ) : (
          <Settings />
        )}
      </div>
    </div>
  );
};

