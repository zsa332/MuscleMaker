import { ReactNode } from "react";
import style from "./layout.module.css";
import Link from "next/link";
import Image from "next/image";
import logo from "@/asset/logo.svg";
import MyPage from "@/app/(afterLogin)/my/page";
import UserNavMenu from "@/app/(afterLogin)/_component/UserNavMenu";
import setting from "@/asset/setting.svg";
import clubadd from "@/asset/clubadd.svg";
import clubmanage from "@/asset/clubmanage.svg";
import Logo from "@/app/(afterLogin)/_component/Logo";

// type Props = {
//   children: ReactNode;
// };

export default async function AfterLoginLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    tag: string;
    userId: string;
  };
}) {
  return (
    <div className={style.container}>
      <header className={style.leftSectionWrapper}>
        <section className={style.leftSection}>
          <div className={style.leftSectionFixed}>
            <Logo />
            <nav>
              <ul className={style.ulTag}>
                <UserNavMenu userId={params.userId} />
              </ul>
            </nav>
            <MyPage />
          </div>
        </section>
      </header>
      <div className={style.rightSectionWrapper}>
        <main className={style.main}>{children}</main>
      </div>
    </div>
  );
}
