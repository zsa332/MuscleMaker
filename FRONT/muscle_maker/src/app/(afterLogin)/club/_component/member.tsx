import style from "@/app/(afterLogin)/club/_component/member.module.css"
import FollowButton from "../../_component/FollowButton"
import { useEffect, useState } from "react";
import { clubs } from "@/app/apis/api/clubapi";
import { useRouter } from "next/navigation";

interface MemberProps{
  clubId : number;
}

interface Member{
  "userId" : number;
  "nickname" : string;
  "image" : string;
  "completionPercent": number;
  "completionToday" : boolean;
}

export default function MemberPage({clubId} : MemberProps) {
  const [members, setMembers] = useState<Member[]|null>(null);
  const route = useRouter();

  useEffect(()=>{
    const fetchData = async () => {
      try{
        const response: Member[] = (await clubs.getClubMembers(clubId)).data.data;
        setMembers(response);
      }
      catch{
        console.log("멤버 불러오기 실패")
        setMembers(null);
      }
    }

    fetchData();
  }, [clubId]);
  return (
    <>
      <div className={style.policy_container}>
        <div className={style.policy_table}>
          <div className={style.headings}>
            <span className={style.heading} style={{flexBasis:'33.33%'}}>&nbsp;</span>
            <span className={style.heading} style={{flexBasis:'33.33%'}}>닉네임</span>
            <span className={style.heading} style={{flexBasis:'33.33%'}}>총달성률</span>
            <span className={style.heading} style={{flexBasis:'33.33%'}}>일일 달성</span>
          </div>

          {
            members && members.map((member)=>(
              <div className={style.policy}>
                <span style={{flexBasis:'33.33%'}}> 
                  <img 
                    src = {member.image} 
                    style={{height:'60px', width:'60px', cursor:'pointer' , borderRadius: '50%'}}
                    onClick={()=> {
                      route.push(`/userpage/${member.userId}/myfeed`)
                    }}></img>
                </span>
                <span style={{flexBasis:'33.33%', paddingTop:'20px'}}>
                  {member.nickname}</span>
                <span style={{flexBasis:'33.33%', paddingTop:'20px'}}>{member.completionPercent}%</span>
                <span style={{flexBasis:'33.33%', paddingTop:'20px'}}>{member.completionToday?"O":"X"}</span>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}