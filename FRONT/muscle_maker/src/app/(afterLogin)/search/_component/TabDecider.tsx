"use client";

import { useTab } from "./TabProvider";
import SearchUser from "./SearchUser";
import SearchClub from "./SearchClub";
import SearchTag from "./SearchTag";

export default function TabDecider() {
  const { tab } = useTab();

  switch (tab) {
    case "club":
      return <SearchClub />;
    case "user":
      return <SearchUser />;
    case "tag":
      return <SearchTag />;
    default:
      return null;
  }
}
