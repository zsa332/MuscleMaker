"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import FeedService from "@/app/apis/service/feedservice";
import UserService from "@/app/apis/service/userservice";

interface User {
  userId: number;
  nickname: string;
  image?: string;
}

const SearchTag = () => {
  const query = useSearchParams();
  const search = query.get("keyword");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await FeedService.searchFeed(search as string);
        const response = await UserService.searchuser(search as string);
        // console.log(check);
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [search]); // useEffect를 검색어(search)가 변경될 때마다 호출

  return (
    <div>
      {/* feeds를 사용하여 데이터를 화면에 렌더링 */}
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {users.length === 0 ? (
          <h2 style={{ textAlign: "center" }}>
            검색어와 일치하는 사용자가 없습니다.
          </h2>
        ) : (
          users.map((user) => (
            <li
              key={user.userId}
              style={{
                marginBottom: "20px",
                marginLeft: "15px",
                marginRight: "15px",
                border: "1px solid #ccc",
                borderRadius: "20px",
                paddingBottom: "10px",
                backgroundColor: "white",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                {user.image ? (
                  <img
                    src={user.image}
                    style={{
                      width: "85px",
                      height: "85px",
                      borderRadius: "50%",
                      marginTop: "8px",
                      marginRight: "20px",
                      marginLeft: "8px",
                    }}
                    alt="프로필 이미지"
                  />
                ) : (
                  <img
                    src="https://i.postimg.cc/hjSy5pJF/5cac274d00b12.jpg"
                    style={{
                      width: "85px",
                      height: "85px",
                      borderRadius: "50%",
                      marginTop: "8px",
                      marginRight: "20px",
                      marginLeft: "8spx",
                    }}
                    alt="기본 이미지"
                  />
                )}
                <div>
                  <p style={{ marginBottom: "5px" }}>
                    닉네임 : {user.nickname}
                  </p>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
      {/* 다른 코드들 */}
    </div>
  );
};

export default SearchTag;
