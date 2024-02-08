import { Suspense } from "react";
import Main from "@/app/(beforeLogin)/_component/Main";
import LoginModal from "./_component/LoginModal";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginModal />
    </Suspense>
  );
}
