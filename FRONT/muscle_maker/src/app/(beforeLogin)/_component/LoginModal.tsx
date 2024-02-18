"use client";

import style from "@/app/(beforeLogin)/_component/login.module.css";
import { ChangeEventHandler, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import UserService from "@/app/apis/service/userservice";

export default function LoginModal() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [emailDomain, setEmailDomain] = useState("");
  const userService = UserService;

  const onChangeId: ChangeEventHandler<HTMLInputElement> = (e) => {
    setId(e.target.value);
  };

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

  const onChangeEmailDomain: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setEmailDomain(e.target.value);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    var loginDto: object = {
      emailId: id + "@" + emailDomain,
      password: password,
    };

    try {
      const response = await userService.authorize(loginDto);

      //토큰 반환값이랑 userId 반환값 처리 부분
      if (typeof window !== "undefined") {
        localStorage.setItem("token", response.token);
        localStorage.setItem("userId", response.userId);
        // 브라우저 환경에서만 실행할 코드

        window.location.href = "/home";
      }
    } catch (error) {
      alert("로그인 실패");
    }
  };

  const onClickKakao = () => {
    if (typeof window !== "undefined") {
      // 브라우저 환경에서만 실행할 코드
      window.location.href =
        "https://kauth.kakao.com/oauth/authorize?client_id=f7054ff4270562c55c1ab6082aafe08f&redirect_uri=https://back.muscle-maker.site/users/kakao/callback&response_type=code";
    }
  };

  return (
    <>
      <div className={style.modalBackground}>
        <div className={style.modal}>
          <div className={style.modalHeader}>
            <div className={style.textDesign}>
              MUSCLE <br></br> MAKER
            </div>
          </div>

          <form onSubmit={onSubmit}>
            <div className={style.modalBody}>
              <div className={style.inputDiv}>
                <label className={style.labelEmail} htmlFor="id">
                  <input
                    id="id"
                    name="email"
                    className={style.inputEmail}
                    value={id}
                    onChange={onChangeId}
                    type="text"
                    placeholder="이메일 주소"
                    required
                  />
                  <div className={style.textEmail}>@</div>
                  <select
                    className={style.selectEmailDomain}
                    title="이메일 도메인 주소 선택"
                    name="emailDomain"
                    onChange={onChangeEmailDomain}
                    required
                  >
                    <option value="">-선택-</option>
                    <option value="naver.com">naver.com</option>
                    <option value="gmail.com">gmail.com</option>
                    <option value="hanmail.net">hanmail.net</option>
                    <option value="hotmail.com">hotmail.com</option>
                    <option value="korea.com">korea.com</option>
                    <option value="nate.com">nate.com</option>
                    <option value="yahoo.com">yahoo.com</option>
                  </select>
                </label>
              </div>
              <div className={style.inputDiv}>
                <label htmlFor="password"></label>
                <input
                  id="password"
                  name="password"
                  className={style.input}
                  value={password}
                  onChange={onChangePassword}
                  type="password"
                  placeholder="비밀번호"
                  required
                />
              </div>
              <div className={style.buttonDiv}>
                <button className={style.actionButton} type="submit">
                  로그인
                </button>
                <button
                  className={style.kakaoButton}
                  type="button"
                  onClick={onClickKakao}
                >
                  <div>
                    <img
                      className={style.kakaoLogo}
                      src="/kakao_icon.png"
                      alt="이미지 찾을 수 없음"
                    ></img>
                    <span>카카오 로그인</span>
                  </div>
                </button>
              </div>
              <div className={style.loginEnd}>
                <div className={style.loginLine}>
                  회원이 아니신가요?{" "}
                  <Link
                    href="/ls/signup"
                    style={{
                      color: "black",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    회원가입
                  </Link>
                </div>
              </div>
            </div>
            <div className={style.message}>{message}</div>
          </form>
        </div>
      </div>
    </>
  );
}
