import React from "react";
import { Link, useLocation } from "react-router";

const Navbar = () => {
  const { pathname } = useLocation();
  return (
    <div className="container">
      <div className="w-full mx-auto flex justify-between bg-linear-to-r from-[#1D3557] to-[#457B9D] p-5 rounded-2xl">
        <ul className="flex gap-2 lg:gap-5">
          <li className="nav-list">
            <Link to="/Chat">Chat</Link>
          </li>
          <li className="nav-list">
            <Link to="/UserList">User</Link>
          </li>
          <li className="nav-list">
            <Link to="/FriendList">Friends</Link>
          </li>
          <li className="nav-list">
            <Link to="/FriendRequest">Friend Request</Link>
          </li>
          <li className="nav-list">
            <Link to="/BlockList">Block List</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
