"use client";
import styles from "@/app/(afterLogin)/club/_component/post.module.css"
import style from "./feed.module.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { useEffect, useState, ChangeEventHandler, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import FeedService from "@/app/apis/service/feedservice";
import UserService from "@/app/apis/service/userservice";
// import ActionButtons from
dayjs.locale("ko");
dayjs.extend(relativeTime);

interface ClubFeedProps{
  clubId : number;
}
interface Feed {
  feedId: string;
  content: string;
  userId: string;
  imgUrl?: string;
  userImgUrl?: any;
  username: any;
  nickname: any;
  tags: string[]; // tags 속성 추가
  favoriteCnt: string;
  commentCnt: string;
  createDate: string;
}

interface comment {
  commentId: string;
  userId: string;
  feedId: string;
  content: string;
  userImgUrl: string;
  nickname: string;
}

interface UserData {
  image: string;
  name: string;
  emailId: string;
}



export default function ClubFeed({clubId} : ClubFeedProps) {
  const [userId, setUserId] = useState<string>("0");
  const [clubFeeds, setClubFeeds] = useState<Feed[]|null>(null);
  // const [pointFeed, setPointFeed] = useState<string>("0");
  const [likeDatas, setLikeDatas] = useState<string[] | null>(null);
  const [commentFeed, setCommentFeed] = useState<string>("0");
  const [comments, setComments] = useState<comment[] | null>(null);
  const [userInfo, setUserInfo] = useState<UserData | null>(null);
  const [commentContent, setCommentContent] = useState<string>("");
  // const [commentFeed, setCommentFeed] = useState<string>("0");
  const router = useRouter();

  interface Feed{
    "feedId" : number,
    "userId" : number,
    "clubId" : number,
    "content" : string,
    "nickname" : string,
    "userImgUrl" : string,
    "imgUrl" : string,
    "commentCnt" : number,
    "favoriteCnt" : number,
    "visibility" : number,
    "flag" : boolean,
    "tags" : string[],
    "createDate" : string,
    "updateDate" : string,
    "favorite" : false
  }

  useEffect(()=>{
    if(typeof window!=="undefined"){
      const storedUserId  = localStorage?.getItem("userId");
      if(storedUserId) setUserId(storedUserId);
    }
  },[])

  useEffect(()=>{
    axios.get(`https://back.muscle-maker.site/feeds/club?clubId=${clubId}&userId=${userId}`)
      .then(
        (res) => {
          const response : Feed[]= res.data.data;
          setClubFeeds(response);
        }
      )
      .catch(
        e => console.log(e)
      )
  },[userId])

  const fetchFeedData = async () => {
    try {
      const likeresponse = await FeedService.getLikeFeed(userId); // 내가 좋아요 눌렀던 피드들  불러오기
      setLikeDatas(likeresponse.data.feeds.map((feed: Feed) => feed.feedId));

      const userResponse = await UserService.getMyUserInfo(); // 유저 정보 불러옴
      setUserInfo(userResponse.data);

      axios.get(`https://back.muscle-maker.site/feeds/club?clubId=${clubId}&userId=${userId}`)
      .then(
        (res) => {
          const response : Feed[]= res.data.data;
          setClubFeeds(response);
        }
      )
      .catch(
        e => console.log(e)
      )
    } catch (error) {
      console.error("피드를 가져오는 중 오류 발생:", error);
    }
  };


  const onClickHeart = async (feedId: string) => {
    await FeedService.feedLike(userId, feedId); // 좋아요 처리를 하고
    fetchFeedData();
  };

  const onSubmitComments = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (commentContent === "") {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    const commentDto = {
      userId: userId,
      feedId: commentFeed,
      content: commentContent,
    };

    try {
      await FeedService.commentWrite(commentDto);
      onClickComment(commentFeed);
      setCommentContent("");
    } catch (e) {
      console.log(e);
    }
  };

  const onChangeComment: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCommentContent(e.target.value);
  };
  const onClickComment = async (feedId: string) => {
    const response: comment[] = (
      await axios.get(`https://back.muscle-maker.site/feeds/comments/${feedId}`)
    ).data.data.comments;
    setComments(response);
    console.log(response);
    setCommentFeed(feedId);
    fetchFeedData();
  };

  return (
    <>
        <div className={style.postConttainer}>
          {clubFeeds && clubFeeds.map((feed)=> (
              <div className={style.postbox}>
              <div className={style.memberContainer}>
                <div className={style.profileImage} style = {{backgroundImage:`url(${feed.userImgUrl})`, cursor:'pointer'}} 
                  onClick = {()=>{router.push(`/userpage/${feed.userId}/myfeed`)}}></div>
                <div className={style.profile}>
                  <div>{feed.nickname}</div>
                  <div style={{fontSize:'10px', color:'gray'}}>{feed.createDate}</div>
                </div>
              </div>
              <div className={style.contentContainer}>
                <div>{feed.content}</div>
              </div>
              <div className={style.imageContainer} style={{backgroundImage:`url(${feed.imgUrl})`}}></div>
              {/* <div className={style.postButtom}> */}
              
              <div className={styles.feedContent}>
              <div
                style={{
                  marginTop: "5px",
                  marginLeft: "-5px",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    onClickHeart(feed.feedId.toString());
                  }}
                >
                  {likeDatas != null &&
                  likeDatas.some((x) => x == feed.feedId.toString()) ? (
                    <img
                      src="/heart_full.png"
                      style={{ width: "20px", height: "20px", margin: "5px" }}
                    ></img>
                  ) : (
                    <img
                      src="/heart_empty.png"
                      style={{
                        width: "20px",
                        height: "20px",
                        margin: "5px",
                        opacity: "0.5",
                      }}
                    ></img>
                  )}
                  <span
                    className="favoriteCnt"
                    style={{
                      fontSize: "20px",
                      color: "gray",
                      verticalAlign: "top",
                    }}
                  >
                    {feed.favoriteCnt}
                  </span>{" "}
                  &nbsp;
                </div>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    onClickComment(`${feed.feedId}`);
                  }}
                >
                  <img
                    src="/comment.png"
                    style={{
                      width: "22px",
                      height: "21px",
                      margin: "5px",
                      opacity: "0.5",
                    }}
                  ></img>
                  <span
                    className="commentCnt"
                    style={{
                      fontSize: "20px",
                      color: "gray",
                      verticalAlign: "top",
                    }}
                  >
                    {feed.commentCnt}
                  </span>{" "}
                  &nbsp;
                </div>
              </div>
              {commentFeed === `${feed.feedId}` && (
                <div className={styles.commentContainer}>
                  <div className={styles.comments}>
                    {comments &&
                      comments.map((comment) => (
                        <div className={styles.comment}>
                          <img
                            src={comment.userImgUrl}
                            className={styles.image}
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              router.push(`/userpage/${comment.userId}/myfeed`);
                            }}
                            ></img>
                          <div className={styles.commentElse}>
                            <div
                              style={{
                                color: "gray",
                                fontSize: "13px",
                                marginTop: "2px",
                              }}
                              >
                              {comment.nickname}
                            </div>{" "}
                            &nbsp; &nbsp;
                            <div>{comment.content}</div>
                          </div>
                        </div>
                      ))}
                  </div>
                  <form onSubmit={onSubmitComments}>
                    <label htmlFor="comment">
                      <img
                        src={userInfo?.image}
                        className={styles.commentImage}
                        ></img>
                    </label>
                    <input
                      type="text"
                      id="comment"
                      className={styles.commentInput}
                      placeholder="댓글 달기"
                      value={commentContent}
                      onChange={onChangeComment}
                      ></input>
                    <button className={styles.commentButton} type="submit">
                      게시
                    </button>
                  </form>
                </div>
              )}
              </div>
            </div>
          ))}
        </div>
    </>
  );
}



