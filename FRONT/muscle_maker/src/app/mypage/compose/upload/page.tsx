import { Suspense } from "react";
import ClubuploadModal from "@/app/mypage/_component/ClubuploadModal"

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClubuploadModal />
    </Suspense>
  )
}