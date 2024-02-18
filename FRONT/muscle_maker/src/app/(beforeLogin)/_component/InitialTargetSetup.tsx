"use client";

import style from "@/app/(beforeLogin)/_component/initialtargetsetupe.module.css";
import { useRouter } from "next/navigation";

export default function InitialTargetSetup() {
  const router = useRouter();
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/");
  };
  return (
    <>
      <div className={style.modalBackground}>
        <div className={style.modal}>
          <div className={style.modalHeader}>
            <div style={{ textAlign: "center", fontWeight: "bold" }}>
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
              원하는 목표를 설정하세요!
            </div>
          </div>
          <form autoComplete="off" onSubmit={onSubmit}>
            <div
              className={style.modalBody}
              style={{ marginTop: "20px", marginBottom: "20px" }}
            >
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="targetWeight">
                  목표 몸무게
                </label>
                <input
                  id="targetWeight"
                  name="targetWeight"
                  className={style.input}
                  type="number"
                  placeholder=""
                />
              </div>

              <div className={style.inputGenderDiv}>
                <label
                  className={style.inputLabel}
                  htmlFor="targetName"
                ></label>
                <div className={style.radioBtns}>
                  <div className={style.radioBtn}>
                    <input
                      id="radio1"
                      type="radio"
                      name="targetName"
                      value="plus"
                      className={style.radioBtnInput}
                    ></input>
                    <label htmlFor="radio1" className={style.radioBtnLabel}>
                      증량
                    </label>
                  </div>
                  <div className={style.radioBtn}>
                    <input
                      id="radio2"
                      type="radio"
                      name="targetName"
                      value="minus"
                      className={style.radioBtnInput}
                    ></input>
                    <label htmlFor="radio2" className={style.radioBtnLabel}>
                      감량
                    </label>
                  </div>
                </div>
              </div>

              <div className={style.targetSetupEnd}>
                <div className={style.targetSetupLine}>
                  로그인 후 입력하시겠습니까?
                  <a className={style.passButton} href="/">
                    건너뛰기
                  </a>
                </div>
              </div>
              <div className={style.buttonDiv}>
                <button type="submit" className={style.actionButton}>
                  로그인 하러 가기
                </button>
                <div className={style.error}></div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
