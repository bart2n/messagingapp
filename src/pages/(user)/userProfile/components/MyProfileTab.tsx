import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FollowersTab from "./FollowersTab";
import MyFollowingTab from "./MyFollowingTab";
function MyProfileTab() {
  return (
    <div className=" ">
      <Tabs defaultValue="courses" className="w-full ">
        <TabsList className="w-full justify-around bg-slate-50">
          <TabsTrigger value="profileInfo">Porfil Bilgilerim</TabsTrigger>
          <TabsTrigger value="myFollowers">Takipçilerim</TabsTrigger>
          <TabsTrigger value="myFollowing">Takip Ettiklerim</TabsTrigger>
          <TabsTrigger value="editProfileInfo">Profilimi Düzenle</TabsTrigger>
        </TabsList>
        <TabsContent value="profileInfo">
          <div>
            <div>
              <p className="text">Ad Soyad</p>
              <p className="text">John Doe</p>
            </div>
            <div>
              <p className="text">Kullanıcı Adı</p>
              <p className="text">johndoe</p>
            </div>
            <div>
              <p className="text">E-posta</p>
              <p className="text">mail@mail.com</p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="myFollowers">
          <FollowersTab />
        </TabsContent>
        <TabsContent value="myFollowing">
          <MyFollowingTab />
        </TabsContent>
        <TabsContent value="editProfileInfo">
          <div>
            <div>
              <p className="text">Ad Soyad</p>
              <input type="text" placeholder="Ad Soyad" />
            </div>
            <div>
              <p className="text">Kullanıcı Adı</p>
              <input type="text" placeholder="Kullanıcı Adı" />
            </div>
            <div>
              <p className="text">E-posta</p>
              <input type="text" placeholder="E-posta" />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default MyProfileTab;
