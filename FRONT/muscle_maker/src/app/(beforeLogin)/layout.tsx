import {ReactNode} from "react";

type Props = { children: ReactNode, modal: ReactNode };
export default function Layout({children, modal}: Props) {
  return (
    <div>
      비포 로그인 레이아웃////////////////////
      {children}
      {modal}
    </div>
  )
}