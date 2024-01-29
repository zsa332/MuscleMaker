import React, { useEffect, useState } from 'react';
import { ClubInfo } from '../_lib/ClubInfo'; // 함수의 경로에 맞게 수정해주세요.

const clubAchieveData: any = {
  message: "사용자가 속한 클럽 조회 성공",
  data: {
    completionPercent: 90, // 예시로 90% 진행률
    exp: 80,
    successDays: 100,
    calender: {
      year: 2024,
      month: 1,
      detail: [
        { day: 23, percent: 90 },
        // 기타 날짜 및 진행률 데이터...
      ],
    },
  },
};
