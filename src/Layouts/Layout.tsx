import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="md:hidden">
        <Outlet />
        <Sidebar />
      </div>
      <div className="hidden md:flex">
        <Sidebar />
        <div className="w-full border-2  overflow-y-auto border-purple-500">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
