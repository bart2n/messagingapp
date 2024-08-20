import pp from "@/assets/pp.jpg";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import TabWithIcon from "./TabWithIcon";

function TabsSide({ setSelectedTab }: { setSelectedTab: any }) {
  const handleSelectTab = (value: any) => {
    setSelectedTab(value);
  };
  return (
    <div className="w-3/12 max-w-fit flex flex-col justify-items-start align-baseline">
      <div
      className="flex flex-col items-center justify-center gap-4 p-4"
      >
        <img src={pp} alt="user" className="w-24 h-24 rounded-full" />
        <p className="text-lg font-bold">John Doe</p>
        <div className="flex gap-2">
        <Button className="bg-primary text-white px-2 py-1 rounded-md">
          Takip Et
        </Button>
        <Button className="bg-primary text-white px-2 py-1 rounded-md">
          Mesaj At
        </Button>
      </div>
      </div>
     

      <div className="flex gap-2 w-fit rounded flex-col border-2 bg-white  p-4">
        <TabWithIcon
          icon={<Home />}
          text="Profilim"
          onClick={() => handleSelectTab("myProfile")}
        />
        <TabWithIcon
          icon={<Home />}
          text="Kayıt olduğum kurslar"
          onClick={() => handleSelectTab("enrolledCourses")}
        />
        <TabWithIcon
          icon={<Home />}
          text="İstek listem"
          onClick={() => handleSelectTab("wishListCourses")}
        />
      </div>
    </div>
  );
}

export default TabsSide;
