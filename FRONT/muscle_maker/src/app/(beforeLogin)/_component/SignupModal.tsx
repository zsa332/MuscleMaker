"use client";

import style from "@/app/(beforeLogin)/_component/signup.module.css";
import { useState } from "react";
import emailStore from "@/store/userInfo/emailStore";
import nameStore from "@/store/userInfo/nameStore";
import passwordStore from "@/store/userInfo/passwordStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import UserService from "@/app/apis/service/userservice";

export default function SignupModal() {
  const router = useRouter();
  const userService = UserService;

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password2Error, setPassword2Error] = useState("");
  const [password2, setPassword2] = useState("");

  const { name, setName } = nameStore();
  const { password, setPassword } = passwordStore();
  const { email, setEmail } = emailStore();

  const [disabled, setDisabled] = useState(false);

  const nameValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const emailValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    setEmail(e.target.value);

    if (!emailRegex.test(email)) {
      setEmailError("이메일 형식이 아닙니다.");
      setDisabled(true);
    } else {
      setEmailError("");
      setDisabled(false);
    }
  };

  const passwordValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordError("숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요");
      setDisabled(true);
    } else {
      setPasswordError("");
      setDisabled(false);
    }
  };

  const password2Validateion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordConfirmCurrent = e.target.value;
    setPassword2(e.target.value);

    if (password !== passwordConfirmCurrent) {
      setPassword2Error("비밀번호가 틀렸습니다.");
      setDisabled(true);
    } else {
      setPassword2Error("");
      setDisabled(false);
    }
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/ls/initialSetup");
  };

  return (
    <>
      <div className={style.modalBackground}>
        <div className={style.modal}>
          <div className={style.modalHeader}>
            <div className={style.textDesign}>
              MUSCLE <br></br>MAKER
            </div>
            <div
              style={{
                textAlign: "center",
                fontSize: "15px",
                color: "gray",
                marginTop: "8px",
              }}
            >
              친구들의 사진과 운동 루틴을 보려면 <br></br>가입하세요.
            </div>
          </div>
          <form autoComplete="off" onSubmit={onSubmit}>
            <div className={style.modalBody}>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="name"></label>
                <input
                  id="name"
                  name="name"
                  value={name}
                  className={style.input}
                  type="text"
                  placeholder="이름"
                  onChange={nameValidation}
                  required
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="email"></label>
                <input
                  id="email"
                  name="email"
                  value={email}
                  className={style.input}
                  type="text"
                  placeholder="이메일 아이디"
                  onChange={emailValidation}
                  required
                />
                <span className={style.error} aria-live="polite">
                  {emailError}
                </span>
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="password"></label>
                <input
                  id="password"
                  name="password"
                  value={password}
                  className={style.input}
                  type="password"
                  placeholder="비밀번호"
                  onChange={passwordValidation}
                  required
                />
                <span className={style.error} aria-live="polite">
                  {passwordError}
                </span>
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="password2"></label>
                <input
                  id="password2"
                  name="password2"
                  className={style.input}
                  type="password"
                  placeholder="비밀번호 확인"
                  onChange={password2Validateion}
                  required
                />
                <span className={style.error} aria-live="polite">
                  {password2Error}
                </span>
              </div>
              <div className={style.signUpEnd}>
                <div className={style.signUpLine}>
                  이미 가입되어 있으신가요?
                  <a
                    className={style.loginButton}
                    onClick={() => {
                      router.push("/");
                    }}
                  >
                    <Link href="/">로그인</Link>
                  </a>
                </div>
              </div>
              <div className={style.buttonDiv}>
                <button
                  type="submit"
                  className={style.actionButton}
                  disabled={disabled}
                >
                  상세 정보 입력하기
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
