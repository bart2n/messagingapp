import { useState } from "react";
import TabsSide from "./components/TabsSide";
import UserTabsSide from "./components/UserTabsDetailSide";

function UserProfile() {
  const [selectedTab, setSelectedTab] = useState("myProfile");

  return (
    <div className="bg-slate-100 h-full">
      <div className="flex gap-10 container">
        <TabsSide setSelectedTab={setSelectedTab} />
        <UserTabsSide selectedTab={selectedTab} />
      </div>
    </div>
  );
}

export default UserProfile;
