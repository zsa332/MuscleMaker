import { Suspense } from "react";
import SignupModal from "@/app/(beforeLogin)/_component/SignupModal";

export default function signup() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <SignupModal />
      </Suspense>
    </>
  );
}
