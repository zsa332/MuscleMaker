import style from "./trendSection.module.css";
import HashTag from "./HashTag";
import { useRouter } from "next/navigation";

export default function TrendSection() {
  const hashTags = ["#운동", "#갓생", "#식단", "#아이유챌린지", "#아이브_식단"];
  const router = useRouter();

  const handleHashTagClick = (hashTag: string) => {
    router.push(`search?keyword=${hashTag.slice(1)}`);
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  return (
    <div>
      <div style={{position:"fixed"}}>
        <h3>나를 위한 해시태그</h3>
        {hashTags.map((hashTag, index) => (
          <HashTag hashTag={hashTag} key={index} onClick={handleHashTagClick} />
        ))}
      </div>
    </div>
  );
}
