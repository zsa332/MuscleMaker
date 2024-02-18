"use client";

import style from "./modal.module.css";
import { ChangeEventHandler, FormEvent, FormEventHandler } from "react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function Page({ params }: any) {
  const router = useRouter();
  const imageRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState();
  const [club, setClub] = useState(true);
  const [feed, setFeed] = useState(true);

  const onChangeContent = (event: any) => {
    setContent(event.target.value);
  };
  const onClickButton = () => {};
  const onClickClose = () => {
    router.back();
  };
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {};
  const me = {
    name: "youjin",
  };
  const clubCheckBox = () => {
    setClub(!club);
  };
  const feedCheckBox = () => {
    setFeed(!feed);
  };
  return (
    <div className="">
      <h1>게시글 상세 페이지</h1>
    </div>
  );
}
// "use client";
// const App = () => {
//   const handleScrollToComponent = (id) => {
//     const element = document.getElementById(id);
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <div>
//       {/* 라우팅 링크 등으로 각 컴포넌트로 이동 */}
//       <button onClick={() => handleScrollToComponent("1")}>
//         Scroll to Component 1
//       </button>
//       <button onClick={() => handleScrollToComponent("2")}>
//         Scroll to Component 2
//       </button>
//       <button onClick={() => handleScrollToComponent("3")}>
//         Scroll to Component 3
//       </button>
//       <button onClick={() => handleScrollToComponent("4")}>
//         Scroll to Component 4
//       </button>

//       {/* 스크롤 대상 컴포넌트들 */}
//       <div
//         id="1"
//         style={{ width: "100px", height: "100px", backgroundColor: "gray" }}
//       >
//         1
//       </div>
//       <div
//         id="2"
//         style={{ width: "100px", height: "100px", backgroundColor: "gray" }}
//       >
//         2
//       </div>
//       <div
//         id="3"
//         style={{ width: "100px", height: "100px", backgroundColor: "gray" }}
//       >
//         3
//       </div>
//       <div
//         id="4"
//         style={{ width: "100px", height: "100px", backgroundColor: "gray" }}
//       >
//         4
//       </div>
//       <div
//         id="5"
//         style={{ width: "100px", height: "100px", backgroundColor: "gray" }}
//       >
//         5
//       </div>
//       <div
//         id="6"
//         style={{ width: "100px", height: "100px", backgroundColor: "gray" }}
//       >
//         6
//       </div>
//     </div>
//   );
// };

// export default App;
