import React from "react";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

const RootLayout = () => {
  return (
    <main className="flex gap-5 bg-[#002c74d9] relative">
      <Sidebar />
      <Outlet />
    </main>
  );
};

export default RootLayout;
