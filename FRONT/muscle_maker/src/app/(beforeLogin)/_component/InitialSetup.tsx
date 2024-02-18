"use client";

import style from '@/app/(beforeLogin)/_component/initialsetup.module.css';
import { useEffect, useRef, useState } from 'react';
import useProfileImageStore from '@/store/userInfo/profileImageStore';
import useNicknameStore from '@/store/userInfo/nicknameStore';
import useAddressStore from '@/store/userInfo/addressStore';
import useGenderStore from '@/store/userInfo/genderStore';
import useHeightStore from '@/store/userInfo/heightStore';
import useWeightStore from '@/store/userInfo/weightStore';
import useAgeStore from '@/store/userInfo/ageStore';
import useNameStore from '@/store/userInfo/nameStore';
import userEmailStore from '@/store/userInfo/emailStore';
import userPasswordStore from '@/store/userInfo/passwordStore';
import userNameStore from '@/store/userInfo/nameStore';
// import { useNavigate } from 'react-router-dom';
import UserService from '@/app/apis/service/userservice';
import {Cookies} from 'react-cookie';
import userIdStore from '@/store/userInfo/userIdStore';
import passwordStore from '@/store/userInfo/passwordStore';
import emailStore from '@/store/userInfo/emailStore';
import { useRouter } from "next/navigation";

interface UserDto  {
  userId : number,
  emailId : string,
  password : string,
  nickname : string,
  name : string,
  address : string,
  height : number,
  weight : number,
  age : number,
  gender : boolean,
  image : string
}


export default function InitialSetupModal() {
  
  const {email} = userEmailStore();
  const {name} = userNameStore();
  const {password} = userPasswordStore();
  
  
  const [code, setCode] = useState('');
  const [isKakao, setKakao] = useState(false);
  
  const {imgFile,setImgFile} = useProfileImageStore();
  const {nickname, setNickname} = useNicknameStore();
  const {address, setAddress} = useAddressStore();
  const {gender, setGender}  = useGenderStore();
  const {height, setHeight} = useHeightStore();
  const {weight, setWeight} = useWeightStore();
  const {age, setAge} = useAgeStore();
  const {setUserId} = userIdStore();
  
  const userservice = UserService;
  
  const cookies = new Cookies();
  
  const [imgPath, setImgPath] = useState('');
  const imgRef = useRef<HTMLInputElement>(null);
  

  const navigate = useRouter();
  const initialUserState: UserDto = {
    userId : 0,
    emailId: emailStore().email,
    password: passwordStore().password,
    nickname: '',
    name: userNameStore().name,
    address: '',
    height: 0,
    weight: 0,
    age: 0,
    gender: false,
    image: ''
  };
  
  const [userDto, setuserDto] = useState<UserDto>(initialUserState);
  const onChangeNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setuserDto(prevState => ({
      ...prevState,
      [id]: value
    }));
  }
  
  const onChangeAge = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setuserDto(prevState => ({
      ...prevState,
      [id]: value
    }));
  }
  
  const onChangeGender = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // 'male'인 경우 false, 'female'인 경우 true로 설정
    const genderValue = value === 'male' ? false : true;
    setuserDto(prevState => ({
      ...prevState,
      gender: genderValue
    }));
  }
  


  const onChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setuserDto(prevState => ({
      ...prevState,
      [id]: value
    }));
  }

  const onChangeHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setuserDto(prevState => ({
      ...prevState,
      [id]: value
    }));
  }

  const onChangeWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setuserDto(prevState => ({
      ...prevState,
      [id]: value
    }));
  }

  const previewImage = () => {
    if (imgRef.current && imgRef.current.files) {
      const img = imgRef.current.files[0];
      setImgFile(img);

      //이미지 미리보기 기능
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = () => {
        setImgPath(reader.result as string);
      };
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    
    event.preventDefault();

    const formData = new FormData();
    formData.append('userDto', new Blob([JSON.stringify(userDto)],{ type: 'application/json' }));
    if (imgFile) {
      formData.append('img', imgFile); // 이미지 파일과 파일 이름을 함께 전달
    } else {
      formData.append('img', new Blob([''], { type: 'image/jpeg' }));
    }


    try {
      const response = UserService.signup(formData);
      console.log(response);
     
      navigate.back();
      navigate.back();
    } catch (error) {
      console.error(error);
      
    }
      
    
  }
    

  useEffect(() => {
    if (typeof window !== "undefined") {
      // 브라우저 환경에서만 실행할 코드

      const url: string = window.location.href;

      // 정규식을 사용하여 'code' 값 추출
      const match = url.match(/code=([^&]*)/);
      const code = match ? match[1] : null;

      if (code != null) {
        setCode(code);
        setKakao(true);
      }
    }
  });
  return (
    <>
      <div className={style.modalBackground}>
        <div className={style.modal}>
          <div className={style.modalHeader}>
            <button
              onClick={() => {
                window ? window.history.back() : null;
              }}
              style={{
                background: "transparent",
                border: "0px",
                marginLeft: "0px",
              }}
            >
              <img
                src="/left-arrow.png"
                style={{ height: "20px", width: "20px", cursor: "pointer" }}
              ></img>
            </button>
          </div>
          <form onSubmit={onSubmit}>
            <div className={style.modalBody}>
              <div className={style.imageUpload}>
                <label className={style.originImg} htmlFor="chooseFile">
                  <img
                    className={style.image}
                    src={imgPath ? imgPath : `/exercise_icon.PNG`}
                  ></img>
                </label>
                <input
                  type="file"
                  id="chooseFile"
                  name="chooseFile"
                  accept="image/*"
                  style={{ visibility: "hidden" }}
                  ref={imgRef}
                  onChange={previewImage}
                ></input>
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="nickname">닉네임</label>
                <input id="nickname" name="nickname" value={userDto.nickname} className={style.input} type="text" placeholder="" required onChange={onChangeNickName}/>
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="age">나이</label>
                <input id="age" name="age"  value = {userDto.age} className={style.input} type="text" placeholder="" onChange={onChangeAge}/>
              </div>
              <div className={style.inputGenderDiv}>
                <label className={style.inputLabel} htmlFor="gender">
                  성별
                </label>
                <div className={style.radioBtns}>
                  <div className={style.radioBtn}>
                    <input
                      id="radio1"
                      type="radio"
                      name="gender"
                      value="male"
                      className={style.radioBtnInput}
                      onChange={onChangeGender}
                    ></input>
                    <label htmlFor="radio1" className={style.radioBtnLabel}>
                      남자
                    </label>
                  </div>
                  <div className={style.radioBtn}>
                    <input
                      id="radio2"
                      type="radio"
                      name="gender"
                      value="female"
                      className={style.radioBtnInput}
                      onChange={onChangeGender}
                    ></input>
                    <label htmlFor="radio2" className={style.radioBtnLabel}>
                      여자
                    </label>
                  </div>
                </div>
                <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="age">주소</label>
                <input id="address" name="address" value={userDto.address} className={style.input} type="text" placeholder="" onChange={onChangeAddress}/>
              </div>
              </div>
              <div className={style.inputBodyDiv}>
                <div className={style.inputOneBodyInfo}>
                  <label className={style.inputLabel} htmlFor="weight">체중</label>
                  <input id="weight" name="weight" value={userDto.weight} className={style.inputBody} type="number" placeholder="" onChange={onChangeWeight}/>
                </div>
                <div className={style.inputOneBodyInfo}>
                  <label className={style.inputLabel} htmlFor="height">신장</label>
                  <input id="height" name="height" value={userDto.height} className={style.inputBody} type="number" placeholder="" onChange={onChangeHeight}/>
                </div>
              </div>
              <div className={style.buttonDiv}>
                <button type="submit" className={style.actionButton}>
                  회원가입 완료
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
