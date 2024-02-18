"use client";

import React, { Component, useState } from "react";
import FeedService from "../../../apis/service/feedservice";
import { feeds } from "@/app/apis/api/feedapi";
import { useEffect } from "react";
import UserService from "@/app/apis/service/userservice";
import "./style.css"
import { useRouter } from "next/navigation";

import { Route, Link } from 'react-router-dom';
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
}

interface comment {
  commentId: string;
  userId: string;
  feedId: string;
  content: string;
  image: string;
  nickname: string;
}

interface State {
  feeds: Feed[];
  feedComments: { [feedId: string]: comment[] };
  commentDtos: { [feedId: string]: CommentDto };
  userData: UserData | null;
  likeDatas : LikeData[];

}

interface CommentDto {
  userId: string;
  feedId: string;
  content: string;

}

interface UserData {
  image: string;
  name: string;
  emailId: string;
}

interface LikeData{
  feedId: string;
}



class YourComponent extends Component<{}, State> {

  constructor(props: {}) {
    super(props);
    this.state = {
      feeds: [],
      feedComments: {},
      commentDtos: {},
      userData: null,
      likeDatas:[],
      
    };
  }



  
  async componentDidMount() {
    const userId = localStorage.getItem('userId')
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const keyword = urlParams.get('keyword');
    try {
      const response = await FeedService.searchFeed(keyword as string);
      const feeds: Feed[] = response.data.feeds;
      const likeresponse = await FeedService.getLikeFeed(userId as string);
      const likeDatas: LikeData[] = likeresponse.data.feeds.map((feed: Feed)=> feed.feedId);


      const userInfo = await UserService.getMyUserInfo();
      this.setState({ feeds, userData: userInfo.data , likeDatas});
      console.log("zzzzzzzzz", this.state.userData);
      console.log(likeDatas);
    } catch (error) {
      console.error("피드를 가져오는 중 오류 발생:", error);
    }
  }

  async loadComments(feedId: string) {
    try {
      const response = await FeedService.getComment(feedId);
      const comments: comment[] = response.data.comments;


      const commentsWithUserInfo = await Promise.all(comments.map(async (comment) => {
        const userInfoResponse = await feeds.getbaseinfo(comment.userId);
        const userInfo = userInfoResponse.data.data.users;
        console.log(userInfo);
        return {
          ...comment,
          image: userInfo.image,
          nickname: userInfo.nickname
        };
      }));

      this.setState(prevState => ({
        feedComments: {
          ...prevState.feedComments,
          [feedId]: commentsWithUserInfo
        }
      }));
    } catch (error) {
      console.error("댓글을 가져오는 중 오류 발생:", error);
    }
  }

  async handleLoadComments(feedId: string) {
    await this.loadComments(feedId);
  }


  async handleLike(feedId: string) {
    const { likeDatas } = this.state;
    console.log("zzzzzz",likeDatas);

    
    const isLiked = likeDatas.includes(feedId as any);

  
    
    const response = await FeedService.feedLike(localStorage.getItem('userId') as string,feedId);
    this.componentDidMount();
    console.log(response);
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, feedId: string) => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      commentDtos: {
        ...prevState.commentDtos,
        [feedId]: {
          ...prevState.commentDtos[feedId],
          [name]: value
        }
      }
    }));
  };
  pagemove(userId : string){
    // const router = useRouter();
    // router.push(`/userpage/${userId}/myfeed`);
  }


  async handleAddComment(feedId: string) {
    const { commentDtos } = this.state;
    const commentDto = commentDtos[feedId]; // 해당 피드에 대한 댓글 DTO 가져오기
    try {
      commentDto.feedId = feedId;
      commentDto.userId = localStorage.getItem('userId') || '';


      
      await FeedService.commentWrite(commentDto);
      this.componentDidMount();
      await this.loadComments(feedId);
      this.setState(prevState => ({
        commentDtos: {
          ...prevState.commentDtos,
          [feedId]: { userId: localStorage.getItem('userId') || '', content: '', feedId: '' }
        }
      }));
    } catch (error) {
      console.error("댓글을 추가하는 중 오류 발생:", error);
    }
  }




  render() {
    const { feeds } = this.state;
    const { likeDatas } = this.state;
    return (
      <div style={{ fontFamily: "Arial, sans-serif" }}>
        <h1
          style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}
        >

        </h1>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {feeds.map((feed) => (
            <li key={feed.feedId} style={{ marginBottom: "30px" }}>
              <div
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  padding: "20px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  {feed.userImgUrl ? (
                 <a href={`/userpage/${feed.userId}/myfeed`}>
                    <img
                      src={feed.userImgUrl}
                      onClick={() => this.pagemove(feed.userId)}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        marginRight: "20px",
                        
                      }}
                      alt="프로필 이미지"
                    />
                    </a>
                  ) : (
                    <a href={`/userpage/${feed.userId}/myfeed`}>
                    <img
                      src="https://i.postimg.cc/hjSy5pJF/5cac274d00b12.jpg"
                      onClick={() => this.pagemove(feed.userId)}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        marginRight: "10px",
                      }}
                      alt="기본 이미지"
                    />
                       </a>
                  )}
               <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{feed.nickname}</p>

                </div>

                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                   {feed.content}
                </p>
                {feed.tags && feed.tags.length > 0 && (
                  <p className="tag-list"> #{feed.tags.join('  #')}</p>
                )}

                {feed.imgUrl && (
                  <img
                    src={feed.imgUrl}
                    alt="피드 이미지"
                    style={{
                      width: "100%",
                      borderRadius: "10px",
                      marginBottom: "10px",
                    }}
                  />
                )}
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span>{feed.username}</span>
                </div>
                <>
                  <div className="div">
                
                    < img
                      loading="lazy"
                      src={likeDatas.includes(feed.feedId as any) 
                        ? "https://i.ibb.co/yd3zt3w/image.png" 
                        : "https://cdn.builder.io/api/v1/image/assets/TEMP/3dfe03a8940167edfb4ada875d713778315d60024b24cddf4e0e7d5a3ecc20f6?"}
                      className="img"
                      onClick={() => this.handleLike(feed.feedId)}
                    />
                    <div className="div-2">{feed.favoriteCnt}   </div>

                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/2337fef23ed142a166c5a0fee526e0ab3dd1e48ac9733829e4bcdf97ba99454e?"
                      className="img"
                      onClick={() => this.handleLoadComments(feed.feedId)}
                    />
                    <div className="div-3"> {feed.commentCnt}</div>
                  </div>
                  <style jsx>{`
        .div {
          display: flex;
          width: 110px;
          max-width: 100%;
          gap: 2px;
          font-size: 12px;
          color: #565656;
          white-space: nowrap;
          letter-spacing: 1.2px;
          line-height: 183%;
          padding-right: 100px;
          padding-bottom:15px;
        }
        @media (max-width: 991px) {
          .div {
            margin-left: 10px;
            white-space: initial;
          }
        }
        .img {
          aspect-ratio: 1;
          object-fit: auto;
          object-position: center;
          width: 100%;
          flex: 1;
          margin-right: 3px;
        }
        .div-2 {
          font-family: Blinker, sans-serif;
          margin-right: 10px;
          font-size : 20px;
          
        }
        .div-3 {
          font-family: Blinker, sans-serif;
          flex-grow: 1;
          margin: auto 0;
          font-size : 20px;
        }
      `}</style>
                </>
                {/* 
                <button onClick={() => this.handleLoadComments(feed.feedId)}>
                  더보기
                </button> */}
                {this.state.feedComments[feed.feedId]?.length > 0 && (
                  <div>
               
                    <ul style={{ listStyle: "none", padding: "0px 0px 10px 0px" }}>
                      {this.state.feedComments[feed.feedId].map((comment, commentId) => (
                        <li key={commentId} style={{ display: "flex", alignItems: "center", padding: "10px 0px 10px 0px" }}>
                          <img
                            src={comment.image}
                            style={{
                              width: "30px",
                              height: "30px",
                              borderRadius: "50%",
                              marginRight: "20px",
                            }}
                          />
                          <span>
                            <strong>{comment.nickname}</strong>: {comment.content}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                )}
                <div>
                  <div className="comment-input-container">
                    {this.state.userData ? (
                      <img
                        src={this.state.userData.image}
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          alignSelf: "center"
                        }}
                        alt="프로필 이미지"
                      />
                    ) : (
                      <img
                        src="https://i.postimg.cc/hjSy5pJF/5cac274d00b12.jpg"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          marginRight: "20px",
                        }}
                        alt="기본 이미지"
                      />
                    )}
                    <div  className="test-input">
                    <input
                      className="comment-input"
                      type="text"
                      name="content"
                      placeholder="댓글을 입력해 주세요"
                      value={this.state.commentDtos[feed.feedId]?.content || ''}
                      onChange={(event) => this.handleInputChange(event, feed.feedId)}
                    />
                    <button className="comment-submit-btn" onClick={() => this.handleAddComment(feed.feedId)}> 작성</button>
                    </div>
                  </div>

                </div>
              </div>

            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default YourComponent;
