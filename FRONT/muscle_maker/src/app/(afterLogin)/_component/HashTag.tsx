// HashTag.tsx
import { MouseEvent } from "react";
import style from './hashTag.module.css'

interface HashTagProps {
  hashTag: string;
  onClick: (hashTag: string) => void;
}

const HashTag: React.FC<HashTagProps> = ({ hashTag, onClick }) => {
  const handleClick = (event: MouseEvent<HTMLSpanElement>) => {
    event.preventDefault(); 
    onClick(hashTag); 
  };

  return (
    <div style={{ cursor: 'pointer',color : ' rgb(29, 155, 240)'}}> {/* 직접 스타일 적용 */}
      <div onClick={handleClick} style={{marginBottom:'-2px'}} className={style.hashTag}>
        {hashTag}
      </div>
      <br /> 
    </div>
  );
};

export default HashTag;
