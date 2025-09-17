import React from "react";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";

const RootLayout = () => {
  const user = useSelector((state) => state.chatUser.value);
  return (
    <main className="flex relative bg-[#457B9D] h-screen">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <Outlet />
      {!user &&(
      <div className="w-full block lg:hidden absolute bottom-0 left-1/2 -translate-x-1/2">
        <Navbar />
      </div>
      )}
    </main>
  );
};

export default RootLayout;
