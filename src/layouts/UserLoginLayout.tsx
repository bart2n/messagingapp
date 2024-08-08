import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";

function UserLoginLayout() {
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
        <Input
          type="search"
          placeholder="Search"
          className="w-1/3 focus-visible:ring-1  border-2"
        />
        <div className="gap-4 flex">
          <Link to="/dashboard/institution-create">Eğitmen Olun</Link>
          <Link to="/dashboard/institution-main">Profil</Link>
        </div>
      </nav>
      <main className="h-full ">
        <Outlet />
      </main>
    </div>
  );
}

export default UserLoginLayout;
