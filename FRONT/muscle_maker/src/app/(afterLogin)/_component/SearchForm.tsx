import style from "./searchForm.module.css";
import { useRouter } from "next/navigation";
import { FormEvent,useState ,useEffect} from "react";
import FeedService from "@/app/apis/service/feedservice";

// searchIconPath를 필요에 따라 실제 아이콘 경로로 대체해야 합니다.
const searchIconPath = "M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z";

export default function SearchForm() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  
  useEffect(() => {
    if (searchQuery.trim() !== '') { // 검색어가 비어있지 않은 경우에만 페이지 이동을 시도합니다.
      router.push(`/search?keyword=${searchQuery}`);
    }
  }, [searchQuery]);
  

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newSearchQuery = (document.getElementsByName("search")[0] as HTMLInputElement).value;
    setSearchQuery(prevSearchQuery => prevSearchQuery === newSearchQuery ? newSearchQuery + ' ' : newSearchQuery);
  };
  


  return (
    <form className={style.search} onSubmit={onSubmit}>
      <button
        type="button"
        style={{ cursor: "pointer", backgroundColor: "transparent", border: "none", paddingLeft:'0px', marginBottom:'-8px'}}
      >
        <svg width={20} viewBox="0 0 24 24" aria-hidden="true">
          <path d={searchIconPath}></path>
        </svg>
      </button>
      <input name="search" type="search" />
    </form>
  );
}
