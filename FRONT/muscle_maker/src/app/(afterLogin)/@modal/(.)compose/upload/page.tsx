'use client';

import style from "./modal.module.css";
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
import FeedService from '@/app/apis/service/feedservice';
import TextareaAutosize from "react-textarea-autosize";
import UserService from "@/app/apis/service/userservice";

interface FeedDto {
  userId: string;
  content: string;
  tags: string[];
  visibility: any;
}



interface Club {
  clubId: string;
  title: string;
  category: string;
}

const YourComponent: React.FC = () => {
  const router = useRouter();
  const imageRef = useRef<HTMLInputElement>(null);
  const [feedDto, setFeedDto] = useState<FeedDto>({ userId: localStorage.getItem('userId') as string, content: '', visibility: '1', tags: [] });
  const [img, setImg] = useState<any>(null);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [data, setData] = useState(null);
  const [exerciseTitle, setExerciseTitle] = useState<string>('');
  const [foodTitle, setFoodTitle] = useState<string>('');
  const [exerciseId, setExerciseId] = useState<string>('');
  const [foodId, setFoodId] = useState<string>('');
  const [isChecked, setChecked] = useState(false);
  const [isChecked2, setChecked2] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    UserService.getClubContainUser(localStorage.getItem('userId') as string)
      .then(response => {
        const clubData: Club[] = response.data;
        if (clubData.length == 1) {
          const check = clubData[0].category;
          if (check) {
            setFoodTitle(clubData[0].title);
            setFoodId(clubData[0].clubId);
          } else {
            setExerciseTitle(clubData[0].title);
            setExerciseId(clubData[0].clubId);
          }
        }
        if (clubData.length == 2) {
          const check = clubData[0].category;
       
          if (check) {
            setFoodTitle(clubData[0].title);
            setFoodId(clubData[0].clubId);
          } else {
            setExerciseTitle(clubData[0].title);
            setExerciseId(clubData[0].clubId);
          }
        }
        const check = clubData[1].category;

        if (check) {
          setFoodTitle(clubData[1].title);
          setFoodId(clubData[1].clubId);
        } else{
          setExerciseTitle(clubData[1].title);
          setExerciseId(clubData[1].clubId);
        }

   

      })
      .catch(error => {
        console.log(error);
      })

          // 컴포넌트가 언마운트될 때 스크롤 다시 활성화
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);


  const onChangeClub = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const num = event.target.value;

    if(num=="0"){
      setChecked(false)
      setChecked2(false)
    }
    else if(num=="1"){
      setChecked(true)
      setChecked2(false)
    }
    else{
      setChecked(false)
      setChecked2(true)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFeedDto(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFeedDto(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleTagInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFeedDto(prevState => ({
      ...prevState,
      tags: value.split(' ').filter(tag => tag.trim())
    }));
  };


  const onClickClose = () => {
    router.back();
  };

  const handleImgChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = async () => {

    if(imgPreview==null){
      alert("사진을 등록해주세요")
      return;
    }

    const formData = new FormData();
    formData.append('feedDto', new Blob([JSON.stringify(feedDto)], { type: 'application/json' }));
    if (img) {
      formData.append('img', img, img.name); // 이미지 파일과 파일 이름을 함께 전달
    }
    console.log(formData);

    try {
      if(!isChecked && !isChecked2){
        const response = await axios.post(
          "https://back.muscle-maker.site/feeds/write",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
      //운동
      if(isChecked){
        const newFeedDto = { ...feedDto, clubId: exerciseId ,visibility : 3 };
        const formData = new FormData();
        formData.append('feedDto', new Blob([JSON.stringify(newFeedDto)], { type: 'application/json' }));
        if (img) {
          formData.append('img', img, img.name); // 이미지 파일과 파일 이름을 함께 전달
        }
        const response = await axios.post(
          "https://back.muscle-maker.site/feeds/write",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
      //식단
      if(isChecked2){
        const newFeedDto2 = { ...feedDto, clubId: foodId ,visibility : 4 };
        const formData = new FormData();
        formData.append('feedDto', new Blob([JSON.stringify(newFeedDto2)], { type: 'application/json' }));
        if (img) {
          formData.append('img', img, img.name); // 이미지 파일과 파일 이름을 함께 전달
        }
        const response = await axios.post(
          "https://back.muscle-maker.site/feeds/write",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
    } catch (error) {
      console.error(error);
    }

    onClickClose();

  };




  return (
    <div className={style.modalBackground}>
      <div className={style.modal}>
        <div className={style.top}>
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
          <div className={style.topTitle}>새 게시물 만들기</div>
          <button className={style.actionButton} onClick={handleSubmit}>
                  등록하기
          </button>
        </div>
        <div className={style.modalForm}>
          <div className={style.modalBody}>
            <div className={style.inputDiv}>
              <div className={style.inputPic}>
                <label htmlFor="fileUpload" className="file-upload-label">
                    {/* <div style={{width:'100%', height:'100%'}}> */}
                      <div className = {style.uploadPic}>
                          {imgPreview && (
                              <div className={style.imagePreview}>
                                <img
                                  style={{width:'100%'}}
                                  src={imgPreview}
                                  alt="Preview"
                                  className={style.previewImage}/>
                              </div>
                            )}
                          {!imgPreview && (
                            <img src = "/picupload_icon.png" className={style.uploadPicIcon}></img>
                          )}
                      {/* </div> */}
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
              
              <div className={style.contentDiv}>
                <form style={{height:'60%'}}>
                  <textarea className={style.input}
                      name="content"
                      placeholder="게시물의 내용을 입력해주세요."
                      value={feedDto.content}
                      onChange = {handleTextAreaChange}
                  />
                </form>
              
                <div className={style.select}>
                <select className={style.selectClub} onChange={onChangeClub}>
                  <option value="" hidden>클럽을 선택하세요.</option>
                  <option value="0">클럽 선택 안함</option>
                  { 
                    exerciseTitle && <option value="1">{exerciseTitle}</option>
                  }
                  {
                    foodTitle && <option value="2">{foodTitle}</option>
                  }
                </select>
                  <div className={style.tag}>
                    <label>태그 : </label>
                    <input id="tag"
                      name="tags"
                      placeholder="태그를 입력해주세요!"
                      onChange={handleTagInputChange}
                      style={{border: 'none',
                        fontSize: '15px', width:'75%'}}/>
                  </div>
                </div>
              </div>
            </div>
            
            
          </div>

        </div> 
      </div>
    </div>
  );
};

export default YourComponent;
