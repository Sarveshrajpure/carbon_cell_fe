import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

export default function NavBarSideBarLayout() {
  return (
    <div className="h-full ">
      <NavBar />

      <div>
        <Outlet />
      </div>
    </div>
  );
}
