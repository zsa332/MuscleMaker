"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { users } from "@/app/apis/api/user";
import UserService from "@/app/apis/service/userservice";

type Props = {
  userId: string;
};

interface UserData {
  userId: string;
  emailId: string;
  nickname: string;
  name: string;
  address: string;
  height: string;
  weight: string;
  age: string;
  gender: string;
  image: string;
}

interface FormData {
  emailId: string;
  nickname: string;
  name: string;
  address: string;
  height: string;
  weight: string;
  age: string;
  gender: string;
  image: string;
}

export function EmailandPosition({ userId }: Props) {
  const [formData, setFormData] = useState<FormData>({
    emailId: "",
    nickname: "",
    name: "",
    address: "",
    height: "",
    weight: "",
    age: "",
    gender: "",
    image: "",
  });
  const [response, setResponse] = useState<UserData | null>(null);

  useEffect(() => {
    UserService.getMyUserInfo()
      .then((data) => {
        console.log(data);
        setResponse(data.data);
      })
      .catch((error) => {
        console.error("오류 발생:", error);
      });
  }, []);

  useEffect(() => {
    if (response) {
      setFormData({
        emailId: response.emailId,
        nickname: response.nickname,
        name: response.name,
        address: response.address,
        height: response.height,
        weight: response.weight,
        age: response.age,
        gender: response.gender,
        image: response.image,
      });
    }
  }, [response]);

  return (
    <>
      <div style={{ marginBottom: "6px" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="15"
          height="15"
        >
          <g id="_01_align_center" data-name="01 align center">
            <path d="M13.338.833a2,2,0,0,0-2.676,0L0,10.429v10.4a3.2,3.2,0,0,0,3.2,3.2H20.8a3.2,3.2,0,0,0,3.2-3.2v-10.4ZM15,22.026H9V17a3,3,0,0,1,6,0Zm7-1.2a1.2,1.2,0,0,1-1.2,1.2H17V17A5,5,0,0,0,7,17v5.026H3.2a1.2,1.2,0,0,1-1.2-1.2V11.319l10-9,10,9Z" />
          </g>
        </svg>
        &nbsp;
        {formData.address}
      </div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="Outline"
          viewBox="0 0 24 24"
          width="15"
          height="15"
        >
          <path d="M19,1H5A5.006,5.006,0,0,0,0,6V18a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V6A5.006,5.006,0,0,0,19,1ZM5,3H19a3,3,0,0,1,2.78,1.887l-7.658,7.659a3.007,3.007,0,0,1-4.244,0L2.22,4.887A3,3,0,0,1,5,3ZM19,21H5a3,3,0,0,1-3-3V7.5L8.464,13.96a5.007,5.007,0,0,0,7.072,0L22,7.5V18A3,3,0,0,1,19,21Z" />
        </svg>
        &nbsp;
        {formData.emailId}
      </div>
    </>
  );
}
