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
    <div className="w-full px-4 pb-4 md:px-0 md:pb-0">
      <nav
        className="bg-[#161B22]/90 backdrop-blur-xl border border-white/10
                   rounded-2xl shadow-2xl z-50
                   md:static md:py-0 md:border-none md:bg-transparent md:shadow-none"
      >
        <ul
          className="flex justify-between md:justify-center items-center
                     px-4 py-3 md:py-0 md:px-8 text-white gap-2"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.to;
            return (
              <li
                key={item.to}
                className="flex flex-col items-center flex-1"
              >
                <Link
                  to={item.to}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 w-full ${
                    isActive ? "text-indigo-400 bg-white/5" : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  }`}
                >
                  <span className={`text-xl sm:text-2xl mb-1 transition-transform duration-300 ${isActive ? "scale-110" : ""}`}>
                    {item.icon}
                  </span>
                  <span className={`text-[10px] sm:text-xs font-medium ${isActive ? "opacity-100" : "opacity-80"}`}>
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
