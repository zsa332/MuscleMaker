// Feed 인터페이스를 정의합니다. 인터페이스 이름은 대문자로 시작하는 것이 일반적입니다.
interface Feed {
  feedId: number;
  clubId: null;
  userId: number;
  content: string;
  favoriteCnt: number;
  commentCnt: number;
  createdAt: string;
  updatedAt: string;
  imgName: string;
  tags: { name: string }[];
  visibility: number;
}

// Feed 배열을 반환하는 타입을 정의합니다.
type FeedArray = Feed[];

// Feed 배열을 반환하는 비동기 함수를 정의합니다. 함수 이름은 소문자로 시작해야 합니다.
export async function getFeeds(): Promise<FeedArray> {
  const dummyData: FeedArray = [
    {
      feedId: 1,
      clubId: null,
      userId: 1,
      content: "오늘 점심 크림짬뽕과 마늘바게트",
      favoriteCnt: 0,
      commentCnt: 0,
      createdAt: "yyyyMMddHHmmss",
      updatedAt: "yyyyMMddHHmmss",
      imgName: "/muscle.jpg",
      tags: [{ name: "태그1" }, { name: "태그2" }, { name: "태그3" }],
      visibility: 1,
    },
    {
      feedId: 2,
      clubId: null,
      userId: 1,
      content: "오늘 점심 크림짬뽕과 마늘바게트",
      favoriteCnt: 0,
      commentCnt: 0,
      createdAt: "yyyyMMddHHmmss",
      updatedAt: "yyyyMMddHHmmss",
      imgName: "/salad.jpg",
      tags: [{ name: "태그1" }, { name: "태그2" }, { name: "태그3" }],
      visibility: 1,
    },
    {
      feedId: 3,
      clubId: null,
      userId: 1,
      content: "오늘 점심 크림짬뽕과 마늘바게트",
      favoriteCnt: 0,
      commentCnt: 0,
      createdAt: "yyyyMMddHHmmss",
      updatedAt: "yyyyMMddHHmmss",
      imgName: "/muscle.jpg",
      tags: [{ name: "태그1" }, { name: "태그2" }, { name: "태그3" }],
      visibility: 1,
    },
    {
      feedId: 4,
      clubId: null,
      userId: 1,
      content: "오늘 점심 크림짬뽕과 마늘바게트",
      favoriteCnt: 0,
      commentCnt: 0,
      createdAt: "yyyyMMddHHmmss",
      updatedAt: "yyyyMMddHHmmss",
      imgName: "/salad.jpg",
      tags: [{ name: "태그1" }, { name: "태그2" }, { name: "태그3" }],
      visibility: 1,
    },
    {
      feedId: 5,
      clubId: null,
      userId: 1,
      content: "오늘 점심 크림짬뽕과 마늘바게트",
      favoriteCnt: 0,
      commentCnt: 0,
      createdAt: "yyyyMMddHHmmss",
      updatedAt: "yyyyMMddHHmmss",
      imgName: "/muscle.jpg",
      tags: [{ name: "태그1" }, { name: "태그2" }, { name: "태그3" }],
      visibility: 1,
    },
    {
      feedId: 6,
      clubId: null,
      userId: 1,
      content: "오늘 점심 크림짬뽕과 마늘바게트",
      favoriteCnt: 0,
      commentCnt: 0,
      createdAt: "yyyyMMddHHmmss",
      updatedAt: "yyyyMMddHHmmss",
      imgName: "/salad.jpg",
      tags: [{ name: "태그1" }, { name: "태그2" }, { name: "태그3" }],
      visibility: 1,
    },
  ];

  // 더미 데이터를 비동기적으로 반환합니다.
  return new Promise((resolve) => {
    // 가짜 지연 시간을 설정합니다. (예시: 1000ms)
    setTimeout(() => {
      resolve(dummyData);
    }, 0); // 0초의 가짜 지연 시간
  });
}
