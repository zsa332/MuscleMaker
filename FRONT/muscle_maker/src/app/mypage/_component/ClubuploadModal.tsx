"use client";

import style from "./modal.module.css";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import axios from "axios";

interface clubRegistRequest {
  title: string;
  category: boolean;
  goal: string;
}

export default function clubRegist() {
  const router = useRouter();
  const imageRef = useRef<HTMLInputElement>(null);
  const [img, setImg] = useState<any>(null);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [clubRegistRequest, setClubRegistRequest] = useState<clubRegistRequest>(
    { title: "", category: false, goal: "" }
  );

  const navigate = useRouter();
  const [content, setContent] = useState();
  const [club, setClub] = useState(true);
  const [feed, setFeed] = useState(false);
  const onChangeContent = (event: any) => {
    setContent(event.target.value);
  };
  const onClickButton = () => {};
  const onClickClose = () => {
    router.back();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setClubRegistRequest((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  

  const titleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setClubRegistRequest((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const checkInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    let newCategory = false;

    if (id === 'clubExercise' && checked) {
      newCategory = false; // 운동에 체크되면 1
    } else if (id === 'clubDiet' && checked) {
      newCategory = true; // 식단에 체크되면 0
    }

    setClubRegistRequest((prevState) => ({
      ...prevState,
      category: newCategory,
    }));
  };

  const handleImgChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setImg(file);

      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target) {
          const imageDataURL = e.target.result as string;
          setImgPreview(imageDataURL);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    const userId = localStorage.getItem("userId");
    formData.append(
      "clubRegistRequest",
      new Blob([JSON.stringify(clubRegistRequest)], {
        type: "application/json",
      })
    );
    if (img) {
      formData.append("img", img); // 이미지 파일과 파일 이름을 함께 전달
    } else {
      formData.append("img", new Blob([""], { type: "image/jpeg" }));
    }
    try {
      const response = await axios.post(
        `https://back.muscle-maker.site/clubs?userId=${userId}`,
        formData
      );

      console.log("서버 응답:", response.data);
      navigate.back();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={style.modalBackground}>
      <div className={style.modal}>
        <button className={style.closeButton} onClick={onClickClose}>
          <svg
            width={24}
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"
          >
            <g>
              <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
            </g>
          </svg>
        </button>
        <form className={style.modalForm} onSubmit={handleSubmit}>
          <div className={style.modalBody}>
            <div className={style.container}>
              <div className={style.label}>클럽명 :</div>
              <input
                className={style.inputBox}
                name="title"
                placeholder="클럽명을 정해주세요"
                value={clubRegistRequest.title}
                onChange={titleInputChange}
              />
            </div>
            <div className={style.inputPic}>
              <label htmlFor="fileUpload" className="file-upload-label">
                <div className={style.uploadPic}>
                  {imgPreview && (
                    <div className={style.imagePreview}>
                      <img
                        style={{ width: "100%" }}
                        src={imgPreview}
                        alt="Preview"
                        className={style.previewImage}
                      />
                    </div>
                  )}
                  {!imgPreview && (
                    <img
                      src="/picupload_icon.png"
                      className={style.uploadPicIcon}
                    ></img>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  id="fileUpload"
                  className={style.uploadButton}
                  onChange={handleImgChange}
                  ref={imageRef}
                />
              </label>
            </div>
            <div className={style.inputDiv}>
              <div className={style.container}>
                <div className={style.test2}>클럽 목표 :</div>
                <textarea
                  className={style.input} /* input 대신 textarea로 변경 */
                  name="goal"
                  placeholder="클럽 소개글을 올려주세요!" /* 입력 상자가 더 많은 텍스트를 허용하도록 */
                  value={clubRegistRequest.goal}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className={style.mid}>
            <div>
              <label>Club : </label>
              <span>운동</span>
              <input
                type="checkbox"
                id="clubExercise"
                onChange={checkInputChange}
                checked={clubRegistRequest.category === false}
              />
              <span>식단</span>
              <input
                type="checkbox"
                id="clubDiet"
                onChange={checkInputChange}
                checked={clubRegistRequest.category === true}
              />
            </div>
          </div>
          <div className={style.modalFooter}>
            <div className={style.modalDivider} />
            <div className={style.footerButtons}>
              <div className={style.footerButtonLeft}></div>
              <button type="submit" className={style.actionButton}>
                생성하기
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
