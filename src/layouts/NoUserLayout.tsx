import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { isUserAuthenticate } from "@/lib/utils";
import { useEffect } from "react";
import UserSearchBar from "./UserSearchBar";
function NoUserLayout() {
  useEffect(() => {
    if (isUserAuthenticate()) {
      window.location.href = "/dashboard";
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
        {/*   <Input
          type="search"
          placeholder="Search"
          className="w-1/3 focus-visible:ring-1  border-2"
        /> */}
        <UserSearchBar className="w-1/3 focus-visible:ring-1  border-2 relative z-50 overflow-visible" />
        <div className="gap-4 flex">
          <Link to="/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link to="/register">
            <Button variant="default">Register</Button>
          </Link>
        </div>
      </nav>
      <main className="h-full ">
        <Outlet />
      </main>
    </div>
  );
}

export default NoUserLayout;
