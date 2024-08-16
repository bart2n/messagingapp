import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { isUserAuthenticate, signOut } from "@/lib/utils";
import { useEffect } from "react";
import UserSearchBar from "./UserSearchBar";

function UserLoggedInLayout() {
  useEffect(() => {
    if (!isUserAuthenticate()) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div>
      <nav
        className="flex items-center justify-between
      fixed top-0 left-0 w-full bg-white p-4 shadow-sm z-10 font-kanit
      "
      >
        <Link to="/">
          <h1 className="text-2xl">Carpedu</h1>
        </Link>
        <UserSearchBar className="w-1/3 focus-visible:ring-1  border-2 relative z-50 overflow-visible" />
       
        <div className="gap-4 flex">
          <Link to="/dashboard/institution-main">Eğitmen Olun</Link>
          <Link to="/dashboard/institution-main">Profil</Link>
          <p className="cursor-pointer" onClick={() => signOut()}>
            Çıkış Yap
          </p>
        </div>
      </nav>
      <main className="h-full  pt-20">
        <Outlet />
      </main>
    </div>
  );
}

export default UserLoggedInLayout;
