import style from "./post.module.css";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import Image from "next/image";
import Youjin from "@/asset/youjin.jpg";
import chaewon from "@/asset/chaewon.jpg";
// import ActionButtons from
dayjs.locale("ko");
dayjs.extend(relativeTime);

// Post 컴포넌트 파일에서
interface PostProps {
  post: {
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
  };
}

const Post: React.FC<PostProps> = ({ post }) => {
  // Post 컴포넌트의 내용
  return (
    <article className={style.post}>
      <div className={style.postImage}>
        <Image src={chaewon} alt="chaewon" width={500} height={500} />
      </div>
      <div className={style.postWrapper}>
        <div className={style.postUserSection}>
          <Link href="" className={style.postUserImage}>
            <Image src={Youjin} alt="Youjin" width={40} height={40} />
            <div className={style.postShade} />
          </Link>
        </div>
        <div className={style.postBody}>
          <div className={style.postMeta}>
            <Link href="" style={{ textDecoration: "none", color: "black" }}>
              <span className={style.postUserName}>채원</span>
              &nbsp;
              <span className={style.postUserId}>@{post.userId}</span>
              &nbsp; · &nbsp;
            </Link>
            <span className={style.postDate}>
              {dayjs(post.createdAt).fromNow(true)}
            </span>
          </div>
          <div>{post.content}</div>
          <br></br>
          <div className={style.postImageSection}></div>
        </div>
      </div>
    </article>
  );
  // return (
  //   // JSX 내용
  //   // <Link href={`/../home/detail/${post.feedId}`}>
  //   <Link key={post.feedId} href={`/detail/${post.feedId}`} passHref>
  //     <div>
  //       <Image src={Youjin} alt="Youjin" width={500} height={500} />
  //       <p>{post.content}</p>
  //     </div>
  //   </Link>
  // );
};

export default Post;
