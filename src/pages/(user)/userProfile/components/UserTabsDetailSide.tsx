import MyProfileTab from "./MyProfileTab";
import EnrolledCourses from "./EnrolledCourses";
import WishListCourses from "./WishListCourses";
function UserTabsSide({ selectedTab }: { selectedTab: string }) {
  return (
    <div className="w-9/12 mt-8 bg-white rounded">
      {selectedTab === "myProfile" && <MyProfileTab />}
      {selectedTab === "enrolledCourses" && <EnrolledCourses />}
      {selectedTab === "wishListCourses" && <WishListCourses />}
    </div>
  );
}

export default UserTabsSide;
