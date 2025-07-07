import React from "react";
import { Link, useLocation } from "react-router";

const Navbar = () => {
  const { pathname } = useLocation();
  return (
    <div className="container absolute z-10 left-1/2 -translate-x-1/2">
      <div className="w-full mx-auto flex justify-between bg-linear-to-r from-[#1D3557] to-[#457B9D] p-5 rounded-2xl">
        <div className="">
          <h2 className="text-2xl font-bold text-white">Chat-Box</h2>
        </div>
        <ul className="flex gap-5">
          <li className="nav-list">
            <Link to="/UserList" href="#">
              User
            </Link>
          </li>
          <li className="nav-list">
            <a href="#">Friends</a>
          </li>
          <li className="nav-list">
            <a href="#">Friend Request</a>
          </li>
          <li className="nav-list">
            <a href="#">Group</a>
          </li>
          <li className="nav-list">
            <a href="#">Blocklist</a>
          </li>
        </ul>
        <div className=""><input type="text" placeholder="Search" /></div>
      </div>
    </div>
  );
};

export default Navbar;
