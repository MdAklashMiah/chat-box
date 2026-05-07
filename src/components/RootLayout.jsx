import React from "react";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";

const RootLayout = () => {
  const user = useSelector((state) => state.chatUser.value);
  return (
    <main className="flex relative bg-[#0B0F19] min-h-dvh overflow-hidden selection:bg-indigo-500/30">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="flex-1 h-dvh overflow-hidden relative">
        <Outlet />
      </div>
      {!user &&(
        <div className="w-full block lg:hidden fixed bottom-0 left-0 z-50">
          <Navbar />
        </div>
      )}
    </main>
  );
};

export default RootLayout;
