"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import clubService from "@/app/apis/service/clubservice";

interface Club {
  clubId: number;
  image?: string;
  name: string;
  goal: string;
  memberCnt: number;
}

const SearchTag = () => {
  const query = useSearchParams();
  const search = query.get("keyword");
  const [clubs, setClubs] = useState<Club[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await clubService.searchClub(search as string);
        console.log(search);
        setClubs(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [search]); // useEffect를 검색어(search)가 변경될 때마다 호출

  return (
    <div>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {clubs.map((club) => (
          <li
            key={club.clubId}
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
              {club.image ? (
                <img
                  src={club.image}
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
                <p
                  style={{
                    marginBottom: "5px",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  {club.name}
                </p>
                <p style={{ marginBottom: "5px" }}>클럽 목표 : {club.goal}</p>
                <p>가입인원 : {club.memberCnt}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {/* 다른 코드들 */}
    </div>
  );
};

export default SearchTag;
