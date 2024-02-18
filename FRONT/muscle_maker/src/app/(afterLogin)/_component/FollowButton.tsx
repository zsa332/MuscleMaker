// components/FollowButton.tsx
import React from 'react';
import { useFollowRequsetStore } from '@/store/FollowRequestStore';
import style from "@/app/(afterLogin)/_component/followbutton.module.css";
import { useState } from 'react';
interface FollowButtonProps {
  followerId: number;
  followingId: number;
}

const FollowButton: React.FC<FollowButtonProps> = ({ followerId, followingId }) => {
  const { applyFollow, isLoading, followMessage, errorMessage } = useFollowRequsetStore();
  const [show, setShow] = useState(true);

  const handleFollowClick = async () => {
    await applyFollow({ followerId, followingId });

    if(followMessage) {
      alert("팔로우 성공");
      setShow(false);
    }
    if(errorMessage) alert(errorMessage);
  };

  return (
    <div className={style.locate} style = {{display :show?'block':'none'}}>
      <button className={style.button} onClick={handleFollowClick}>
        FOLLOW
      </button>
    </div>
  );
};

export default FollowButton;
