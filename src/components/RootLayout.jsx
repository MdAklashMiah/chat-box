import React from "react";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

const RootLayout = () => {
  return (
    <main className="flex relative bg-[#262e3b]">
      <Sidebar />
      <Outlet />
    </main>
  );
};

export default RootLayout;
