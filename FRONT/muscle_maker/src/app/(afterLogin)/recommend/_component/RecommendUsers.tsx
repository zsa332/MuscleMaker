"use client";

// RecommendUsers.tsx
import React, { useEffect, useState } from "react";
import {
  User,
  getUsers,
} from "@/app/(afterLogin)/recommend/_lib/userrecommend";
import style from "@/app/(afterLogin)/recommend/_component/recommendUsers.module.css";
import Image from "next/image";
import FollowModal from "../../_component/FollowModal";
import useFollowModalStore from "@/store/FollowModalStore";
import FollowerList from "../../_component/FollowerList";
import FollowButton from "../../_component/FollowButton";
import { useRouter } from "next/navigation";
import axios from "axios";

const RecommendUsers: React.FC = () => {
  const router = useRouter();

  const [isSort, setIsSort] = useState(false);
  const [userId, setUserId] = useState<string>("0");
  const [type, setType] = useState<string>("0");
  const [recommedatedUsers, setRecommendatedUsers] = useState<RecommedatedUser[]|null>(null);
  const [myFollowList, setMyFollowingList] = useState<followList|null>(null);

  interface User {
    "userId" : number,
    "nickname" : string
  }

  interface followList{
    "followerList" : User[],
    "followingList" : User[]
  }


  interface RecommedatedUser {
    "userId" : number,
    "imgUrl" : string,
    "nickname" : string,
    "followingNum" : number,
    "feedNum" : number
  }
  useEffect(() => {
    console.log("aa");
    if (typeof window !== "undefined") {
      const storedUserId = localStorage?.getItem("userId");
      if (storedUserId) {
        console.log(`Setting userId: ${storedUserId}`);
        setUserId(storedUserId);
      }
    }
  }, []);
  
  useEffect(() => {
    // `userId`가 "0"이 아닐 때만 데이터 가져오기 로직 실행
    if (userId !== "0") {
      console.log(`Fetching data for userId: ${userId} and type: ${type}`);
  
      const fetchData = async () => {
        try {
          const res = await axios.get(`https://back.muscle-maker.site/users/recommendation?userId=${userId}&type=${type}`);
          const response: RecommedatedUser[] = res.data.data;
          console.log(response);
  
          if (response.length === 0) {
            alert("추천 사용자가 없습니다. 인바디 정보를 입력하세요!");
            setRecommendatedUsers(null);
          } else {
            setRecommendatedUsers(response);
          }
        } catch (e) {
          console.error(e);
          alert("추천 사용자가 없습니다. 인바디 정보를 입력하세요!");
          setRecommendatedUsers(null);
        }
      };
  
      fetchData();
  
      const getFollowList = async () => {
        try {
          const res = await axios.get(`https://back.muscle-maker.site/follows?userId=${userId}&sortType=0`);
          const response: followList = res.data.data;
          setMyFollowingList(response);
        } catch (e) {
          console.error(e);
        }
      };
  
      getFollowList();
    }
  }, [userId, type]); // `userId`와 `type` 변경 시에만 실행
  
  const onClickSort = () => {
    setIsSort(!isSort)
  }

  return (
    <div>
      <table className={style.table}>
        <thead>
          <tr className={style.navcontainer}>
            <th className={style.emptygoal}></th>
            <th className={style.emptybox}></th>
            <th className={style.emptybox}>팔로워</th>
            <th className={style.emptybox}>게시물</th>
            <th className={style.emptybox} style={{alignContent:'center'}}>
              <img src = "/sort_icon.png" style={{width:'35px', opacity:'0.6', cursor:'pointer'}} onClick = {onClickSort}></img>
            </th>
          </tr>
        </thead>
        <ul className={style.sortList} style={{display:isSort?'block':'none'}}>
                <hr style={{marginLeft:'-20px', marginRight:'20px'}} className = {style.line}></hr>
                <li className={style.listElement} onClick={()=>{setType("0"); }} >팔로워 순</li>
                <li style={{marginTop:'10px'}} className={style.listElement} onClick={()=>{setType("1");}}>유사 BMI 순</li>
                <li style = {{marginTop:'10px'}} className={style.listElement} onClick={()=>{setType("2");}}>유사 골격근량 순</li>
                <hr style={{marginLeft:'-20px', marginRight:'20px'}} className = {style.line}></hr>
        </ul>
        <tbody className={style.position}>
           {RecommendUsers!=null && recommedatedUsers?.length !=0 && recommedatedUsers?.map((user) => (
            <tr className={style.container}  style={{paddingLeft:0, paddingRight:0}}>
              <td>
                <Image
                  src={user.imgUrl}
                  alt={"clubImage"}
                  width={60}
                  height={60}
                  className={style.clubImage}
                  onClick={()=> {router.push(`/userpage/${user.userId}/myfeed`)}}
                  style={{cursor:'pointer'}}
                />
              </td>
              <td className={style.clubgoal}>{user.nickname}</td>
              <td className={style.clubmember_count}>{user.followingNum}
                명
              </td>
              <td className={style.clublevel}>{user.feedNum}개</td>
              <td className={style.clublevel}>
                <span style={{display : (myFollowList?.followingList.some(x=>x.userId === user.userId))? 'none' : 'block'}}>
                  <FollowButton followerId={Number(userId)} followingId={Number(user.userId)} />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecommendUsers;
