import { ReactNode } from "react";
import style from "./layout.module.css";
import Link from "next/link";
import Image from "next/image";
import logo from "@/asset/logo.svg";
import MyPage from "@/app/(afterLogin)/my/page";
import MyNavMenu from "@/app/(afterLogin)/_component/MyNavMenu";
import setting from "@/asset/setting.svg";
import clubadd from "@/asset/clubadd.svg";
import clubmanage from "@/asset/clubmanage.svg";
import { ClubButton } from "@/app/mypage/_component/ClubButton";
import Logo from "@/app/(afterLogin)/_component/Logo";

type Props = { children: ReactNode; modal: ReactNode };

export default async function AfterLoginLayout({ children, modal }: Props) {
  return (
    <div className={style.container}>
      <header className={style.leftSectionWrapper}>
        <section className={style.leftSection}>
          <div className={style.leftSectionFixed}>
            <Logo />
            <nav>
              <ul className={style.ulTag}>
                <MyNavMenu />
                <ClubButton />
                <li>
                  <Link href="/mypage/setting">
                    <div className={style.navPill} style={{ opacity: 0.5 }}>
                      <Image
                        src={setting}
                        alt="setting_icon"
                        width={25}
                        height={25}
                      />
                      <div style={{ fontWeight: "bold" }}>설정</div>
                    </div>
                  </Link>
                </li>
              </ul>
            </nav>
            <MyPage />
          </div>
        </section>
      </header>
      <div className={style.rightSectionWrapper}>
        <main className={style.main}>{children}</main>
      </div>
      {modal}
    </div>
  );
}
