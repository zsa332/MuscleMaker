import Link from "next/link";
import style from "./hashTag.module.css";

type Props = { hashTag: string };
export default function Trend({ hashTag }: Props) {
  return <div className={style.hashTag}>{hashTag}</div>;
}
