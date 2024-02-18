// Settings.tsx

"use client"
// Settings.tsx

"use client"
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { users } from '@/app/apis/api/user';
import UserService from '@/app/apis/service/userservice';

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

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface Props {
  updateUserInfo: (form: FormData) => Promise<void>;
  updatePassword: (ModifyPasswordRequest: any, config: any) => Promise<void>;
}

const Settings: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    emailId: '',
    nickname: '',
    name: '',
    address: '',
    height: '',
    weight: '',
    age: '',
    gender: '',
    image: ''
  });
  const [password, setPassword] = useState<PasswordData>({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [response, setResponse] = useState<UserData | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    UserService.getMyUserInfo()
      .then(data => {
        console.log(data);
        setResponse(data.data);
      })
      .catch(error => {
        console.error('오류 발생:', error);
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
        image: response.image
      });
    }
  }, [response]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };

  const handleEditModeToggle = () => {
    setEditMode(!editMode);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const localStorageToken = localStorage.getItem("token");
    try {
      await users.updateUserInfo(formData);
      alert("formdata change")
      if (password.newPassword === password.confirmNewPassword) {
        await users.updatePassword({
          newPassword: password.newPassword,
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorageToken}`
          }
        });
      } else {
        alert('Passwords do not match');
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="emailId" value={formData.emailId} onChange={handleInputChange} placeholder="Email" disabled={!editMode} />
      <input type="text" name="nickname" value={formData.nickname} onChange={handleInputChange} placeholder="Nickname" disabled={!editMode} />
      <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Address" disabled={!editMode} />
      <input type="file" name="image" onChange={handleInputChange} disabled={!editMode} />
      {/* <input type="password" name="currentPassword" value={password.currentPassword} onChange={handlePasswordChange} placeholder="Current Password" disabled={!editMode} /> */}
      <input type="password" name="newPassword" value={password.newPassword} onChange={handlePasswordChange} placeholder="New Password" disabled={!editMode} />
      {/* <input type="password" name="confirmNewPassword" value={password.confirmNewPassword} onChange={handlePasswordChange} placeholder="Confirm New Password" disabled={!editMode} /> */}
      {editMode ? (
        <button type="submit">Update Info</button>
      ) : (
        <button type="button" onClick={handleEditModeToggle}>Edit</button>
      )}
    </form>
  );
}

export default Settings;
