"use client";

import { useState } from "react";

export default function PlusButton() {
  const [isInbody, setIsInbody] = useState(false);
  const handMouseEnter = () => {
    setIsInbody(true);
  };
  const handMouseLeave = () => {
    setIsInbody(false);
  };
  return (
    <>
      {isInbody && <div>눌러서 인바디 정보를 추가하세요!</div>}
      <svg
        id="Layer_1"
        height="50"
        viewBox="0 0 24 24"
        width="50"
        xmlns="http://www.w3.org/2000/svg"
        data-name="Layer 1"
        onMouseEnter={handMouseEnter}
        onMouseLeave={handMouseLeave}
      >
        <path d="m12 0a12 12 0 1 0 12 12 12.013 12.013 0 0 0 -12-12zm0 21a9 9 0 1 1 9-9 9.01 9.01 0 0 1 -9 9zm1.5-10.5h3.5v3h-3.5v3.5h-3v-3.5h-3.5v-3h3.5v-3.5h3z" />
      </svg>
    </>
  );
}
