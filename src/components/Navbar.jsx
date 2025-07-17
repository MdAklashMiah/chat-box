import React from "react";
import { Link, useLocation } from "react-router";
import { BsChatLeftTextFill } from "react-icons/bs";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { MdBlock } from "react-icons/md";

const Navbar = () => {
  const { pathname } = useLocation();
  return (
    <div className="container">
      <div className="w-full mx-auto bg-linear-to-r from-[#1D3557] to-[#457B9D] py-5">
        <ul className="flex justify-between gap-3 md:gap-4 lg:gap-5 px-3 md:px-8">
          <li className="nav-list">
            <Link to="/Chat" className="text-base font-medium">
              <BsChatLeftTextFill className="mx-auto"/>
              Chat
            </Link>
          </li>
          <li className="nav-list">
            <Link to="/UserList" className="text-base font-medium">
              <FaRegCircleUser className="mx-auto"/>
              User
            </Link>
          </li>
          <li className="nav-list">
            <Link to="/FriendList" className="text-base font-medium">
              <FaUserFriends className="mx-auto"/>
              Friends
            </Link>
          </li>
          <li className="nav-list">
            <Link to="/FriendRequest" className="text-base font-medium">
              <FaUserPlus className="mx-auto"/>
              Friend Request
            </Link>
          </li>
          <li className="nav-list">
            <Link to="/BlockList" className="text-base font-medium">
              <MdBlock className="mx-auto"/>
              Block List
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
