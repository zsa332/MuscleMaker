import { Suspense } from "react";
import InitialSetupModal from "@/app/(beforeLogin)/_component/InitialSetup";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InitialSetupModal />
    </Suspense>
  );
}
