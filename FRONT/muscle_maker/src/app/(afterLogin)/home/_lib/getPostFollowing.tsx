"use client";

import style from '@/app/(afterLogin)/home/_lib/post.module.css';
import FeedService from '@/app/apis/service/feedservice';
import UserService from '@/app/apis/service/userservice';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState, ChangeEventHandler } from 'react';

export default function getPostRecommend() {
  const [feeds, setFeeds] = useState<Feed[] | null>(null);
  const [userId, setUserId] = useState<string>("0");
  const [pointFeed, setPointFeed] = useState<string>("0");
  const [likeDatas, setLikeDatas] = useState<string[] | null>(null);
  const [commentFeed, setCommentFeed] = useState<string>("0");
  const [comments, setComments] = useState<comment[] | null>(null);
  const [userInfo, setUserInfo] = useState<UserData | null>(null);
  const [commentContent, setCommentContent] = useState<string>("");
  const router = useRouter();

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

  const fetchFeedData = async () => {
    try {
      const response = await FeedService.getFollowFeed(userId); //피드 불러오기
      setFeeds(response.data.feeds);

      const likeresponse = await FeedService.getLikeFeed(userId); // 내가 좋아요 눌렀던 피드들  불러오기
      setLikeDatas(likeresponse.data.feeds.map((feed: Feed) => feed.feedId));

      const userResponse = await UserService.getMyUserInfo(); // 유저 정보 불러옴
      setUserInfo(userResponse.data);
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
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage?.getItem("userId");
      if (storedUserId) setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    fetchFeedData();
  }, [userId]);

  return (
    <div className={style.postContainer}>
      {feeds &&
        feeds.map((feed) => (
          <div className={style.post} key={feed.feedId}>
            <div className={style.profile}>
              <img className={style.profileImage} src = {feed.userImgUrl} onMouseOver={()=>{setPointFeed(feed.feedId)}} onMouseOut={()=>{setPointFeed("0")}}></img>
              {
                feed.feedId === pointFeed && (
                  <div onMouseOver={()=>{setPointFeed(feed.feedId)}} onMouseOut={()=>{setPointFeed("0")}} className={style.profileImageCover} onClick={()=>{
                    router.push(`/userpage/${feed.userId}/myfeed`)
                  }}></div>
                )
              }
              <div className = {style.profileDetail}>
                <div>
                  <span className={style.nickname}>{feed.nickname}</span>
                  <span
                    className="createDate"
                    style={{
                      color: "gray",
                      fontSize: "15px",
                      position: "absolute",
                      right: "23px",
                      top: "136px",
                    }}
                  >
                    {feed.createDate}
                  </span>
                </div>
              </div>
            </div>

            <div className={style.feedContent}>
              <div className={style.content}>
                <span className="feedContent">{feed.content}</span>
                <div className={style.tags}>
                  {feed.tags &&
                    feed.tags.map((tag) => (
                      <span className={style.tag}>#{tag} </span>
                    ))}
                </div>
                <div>
                  <div
                    style={{ backgroundImage: `url(${feed.imgUrl})` }}
                    className={style.contentImage}
                  ></div>
                </div>
              </div>

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
                    onClickHeart(feed.feedId);
                  }}
                >
                  {likeDatas != null &&
                  likeDatas.some((x) => x == feed.feedId) ? (
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
                    onClickComment(feed.feedId);
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
              { commentFeed === feed.feedId && 
                    <div className={style.commentContainer}>
                      <div className={style.comments}>
                        {comments &&
                          comments.map((comment)=>(
                            <div className={style.comment}>
                              <img src = {comment.userImgUrl} className={style.image}onClick={()=>{
                    router.push(`/userpage/${comment.userId}/myfeed`)
                  }}></img>
                              <div className={style.commentElse}>
                                <div style={{color:'gray', fontSize:'13px', marginTop:'2px'}}>{comment.nickname}</div> &nbsp; &nbsp;
                                <div>{comment.content}</div>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                      <form onSubmit={onSubmitComments}> 
                        <label htmlFor="comment">
                          <img src = {userInfo?.image} className={style.commentImage}></img>
                        </label>
                        <input type = "text" id="comment" className={style.commentInput} placeholder='댓글 달기' value = {commentContent} onChange={onChangeComment} ></input>
                        <button className={style.commentButton}>게시</button>
                      </form>
                    </div>
                  }
            </div>
          </div>
        ))}
    </div>
  );
}
