// userrecommend.ts

export interface User {
  userId: number;
  username: string;
  handle: string;
  profileImage: string;
  following: number[]; // 사용자가 팔로우하는 사용자들의 ID 배열
  follower: number[]; // 사용자를 팔로우하는 사용자들의 ID 배열
  goalDays: number;
}

export interface UsersResponse {
  status: number;
  message: string;
  data: User[];
}


// dummyApi.ts

export function getUsers(): Promise<UsersResponse> {
  return Promise.resolve({
    status: 200,
    message: "조회 성공",
    data: [
      {
        userId: 2,
        username: "_soyonii",
        handle: "_soyonii",
        profileImage: "/salad.jpg",
        following: [3], // 예시: userId 3을 팔로우
        follower: [4], // 예시: userId 4에게 팔로우됨
        goalDays: 6,
      },
      {
        userId: 3,
        username: "영서링",
        handle: "youngseoring",
        profileImage: "/run.jpg",
        following: [2], // 예시: userId 2를 팔로우
        follower: [2], // 예시: userId 2에게 팔로우됨
        goalDays: 6,
      },
      {
        userId: 4,
        username: "sss",
        handle: "triple_s",
        profileImage: "/youjin.jpg",
        following: [2], // 예시: userId 2를 팔로우
        follower: [3], // 예시: userId 3에게 팔로우됨
        goalDays: 6,
      },
    ],
  });
}
