import React, { useEffect, useState } from 'react';
import style from '@/app/(afterLogin)/recommend/_component/recommendGroups.module.css';
import Image from 'next/image';
import { joinClubStore } from '@/store/joinClub'; // 상태 및 업데이트 함수 가져오기
// import { getClubs } from '../_lib/clubrecommend';
import { clubs as clubsApi } from '@/app/apis/api/clubapi'
import { useRouter } from 'next/navigation';
import { users } from '@/app/apis/api/user';
import axios from 'axios';

const RecommendGroups: React.FC = () => {
  const [ recommendationClubs, setRecommendationClubs] = useState<Club[]|null>(null); // Zustand 상태 및 업데이트 함수 가져오기
  const router = useRouter();
  const [userId, setUserId] = useState<String>("0");
  const [isSort, setIsSort] = useState(false);
  const [sortNum, setSortNum] = useState(0);

  interface Club {
    clubId: number;
    title : string;
    goal: string;
    category: boolean; // '헬스' 또는 '식단'과 같은 문자열을 받을 수 있도록 변경
    memberCnt: number;
    level: number;
    image: string; // 클럽 이미지 URL
    exp : number;
    successDays : number;
  }
  

  // 새로 추천받기 함수
  const fetchNewRecommendations = (num : number) => {
    axios.get(`https://back.muscle-maker.site/clubs/recommendation?userId=${userId}&sorting=${num}`)
      .then(
        (res) => {
          const response : Club[] = res.data.data;

          if(response.length==0){
            alert("추천 클럽이 없습니다.")
            setRecommendationClubs(null)
          }
          else setRecommendationClubs(response);
        }
      )
      .catch(
        e => console.log(e)
      )
  };

  const onClickJoin = (clubId : number) => {
    const clubRequest = {
      "clubId" : clubId,
      "userId" : userId
    }

    axios.post(`https://back.muscle-maker.site/users/clubs/join`,clubRequest)
    .then(
      res => alert(res.data.message)
    )
    .catch(
      error => {
        if(error.response){
          alert(error.response.data.message);
        }
        else console.log(error);
      }
    )

  }


  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId2 = localStorage?.getItem("userId");
      if (storedUserId2) {
        setUserId(storedUserId2);
      }
    }
    else if (userId === "0") {
      alert("로그인이 필요합니다.")
      return;
    }
    
    fetchNewRecommendations(sortNum); // 컴포넌트 마운트 시 초기 추천 클럽 정보 가져오기


  }, [userId, sortNum]);

  const onClickSort = () => {
    setIsSort(!isSort)
  }


  return (
    <div>
      
      <table className={style.table}>
        <thead>
          <tr className={style.navcontainer}>
            <th className={style.emptygoal}>&nbsp;</th>
            <th className={style.emptygoal}>목표</th>
            <th className={style.emptybox}>종류</th>
            <th className={style.emptybox}>맴버</th>
            <th className={style.emptybox}>레벨</th>
            <th className={style.emptybox} style={{alignContent:'center'}}>
              <img src = "/sort_icon.png" style={{width:'35px', opacity:'0.6', cursor:'pointer'}} onClick = {onClickSort}></img>
            </th>
          </tr>
        </thead>
        <ul className={style.sortList} style={{display:isSort?'block':'none'}}>
                <hr style={{marginLeft:'-20px', marginRight:'20px'}} className = {style.line}></hr>
                <li className={style.listElement} onClick={()=>{setSortNum(0); }} >멤버수 순</li>
                <li style={{marginTop:'10px'}} className={style.listElement} onClick={()=>{setSortNum(1);}}>달성일 순</li>
                <li style = {{marginTop:'10px'}} className={style.listElement} onClick={()=>{setSortNum(2);}}>레벨 순</li>
                <hr style={{marginLeft:'-20px', marginRight:'20px'}} className = {style.line}></hr>
        </ul>
        <tbody className={style.position}>
          { recommendationClubs!=null && recommendationClubs?.length!=0 
           && (
            recommendationClubs.map(club => (
              <tr key={club.clubId} className={style.container} style={{paddingLeft:0, paddingRight:0}}>
                <td>
                  <Image src={club.image || "/default_image.jpg"} alt="clubImage" width={60} height={60} className={style.clubImage}
                    onClick={()=> {router.push(`/club/${club.clubId}`)}}/>
                </td>
                <td className={style.clubgoal}>{club.goal}</td>
                <td className={style.clubcategory}>{club.category ? '식단' : '운동'}</td>
                <td className={style.clubmember_count}>{club.memberCnt}명</td>
                <td className={style.clublevel}>{club.level}</td>
                <td className={style.clubjoin}>
                  <button onClick={() => onClickJoin(club.clubId)}>가입 신청</button>
                </td>
              </tr>
            ))
          ) }
        
        </tbody>
      </table>
    </div>
  );
};

export default RecommendGroups;




