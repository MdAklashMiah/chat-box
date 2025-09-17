import React from "react";
import { Link, useLocation } from "react-router";
import { BsChatLeftTextFill } from "react-icons/bs";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaUserFriends, FaUserPlus } from "react-icons/fa";
import { MdBlock } from "react-icons/md";

const Navbar = () => {
  const { pathname } = useLocation();

  const navItems = [
    { to: "/Chat", label: "Chat", icon: <BsChatLeftTextFill /> },
    { to: "/UserList", label: "User", icon: <FaRegCircleUser /> },
    { to: "/FriendList", label: "Friends", icon: <FaUserFriends /> },
    { to: "/FriendRequest", label: "Requests", icon: <FaUserPlus /> },
    { to: "/BlockList", label: "Blocked", icon: <MdBlock /> },
  ];

  return (
    <div className="w-full">
      <nav
        className="bg-gradient-to-r from-[#1D3557] to-[#457B9D]
                   fixed bottom-0 left-0 right-0 z-50
                   md:static md:py-5
                   shadow-[0_-2px_6px_rgba(0,0,0,0.25)] md:shadow-none
                   rounded-t-2xl md:rounded-none"
      >
        <ul
          className="flex justify-between md:justify-center flex-wrap 
                     gap-2 md:gap-8 px-3 md:px-8 text-white"
        >
          {navItems.map((item) => (
            <li
              key={item.to}
              className="flex flex-col items-center flex-1 
                         text-[10px] sm:text-xs md:text-base font-medium py-2"
            >
              <Link
                to={item.to}
                className={`flex flex-col items-center hover:text-gray-200 transition-colors ${
                  pathname === item.to ? "text-yellow-300" : ""
                }`}
              >
                <span className="text-lg sm:text-xl md:text-2xl mb-0.5">
                  {item.icon}
                </span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
