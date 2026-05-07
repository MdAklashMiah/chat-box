import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { MdBlock } from "react-icons/md";
import { ImHome } from "react-icons/im";
import { AiFillMessage } from "react-icons/ai";
import { FaUserFriends, FaUsers } from "react-icons/fa";
import { RiUserReceivedFill } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { userLoginInfo } from "../slices/UserSlice";
import { Link, useLocation, useNavigate } from "react-router";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineMessage } from "react-icons/ai";

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();
  const user = useSelector((state) => state.userLogin.value);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          userLoginInfo({
            name: user.displayName,
            email: user.email,
            uid: user.uid,
          })
        );
      } else {
        dispatch(userLoginInfo(null));
        navigate("/login");
      }
    });
  }, [dispatch, auth, navigate]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // ✅ Menu Items
  const menuItems = [
    { to: "/", icon: <ImHome />, label: "Home" },
    { to: "/Chat", icon: <AiFillMessage />, label: "Message" },
    { to: "/FriendList", icon: <FaUserFriends />, label: "Friends" },
    { to: "/UserList", icon: <FaUsers />, label: "Users" },
    {
      to: "/FriendRequest",
      icon: <RiUserReceivedFill />,
      label: "Friend Request",
    },
    { to: "/BlockList", icon: <MdBlock />, label: "Block List" },
  ];

  return (
    <>
      {/* 🔹 Top Navbar (Mobile) */}
      <div className="md:hidden flex items-center justify-between bg-[#0B0F19]/80 backdrop-blur-xl border-b border-white/5 text-white p-4 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <span className="text-xl text-indigo-500">
            <AiOutlineMessage />
          </span>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            Chatbuzzz
          </span>
        </div>
        <button onClick={() => setOpen(!open)} className="text-slate-300 hover:text-white transition-colors">
          <GiHamburgerMenu size={24} />
        </button>
      </div>

      {/* 🔹 Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-[#0B0F19] border-r border-white/5 shadow-2xl transform transition-transform duration-300 z-50 flex flex-col
        ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static`}
      >
        <div className="flex flex-col h-full overflow-y-auto px-4 py-6 custom-scrollbar">
          {/* Logo */}
          <div className="hidden md:flex items-center gap-3 mb-10 px-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <AiOutlineMessage className="text-white text-xl" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Chatbuzzz
            </span>
          </div>

          {/* Menu */}
          <ul className="space-y-1 flex-1">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Menu</div>
            {menuItems.map((item, i) => {
              const isActive = pathname === item.to;
              return (
                <li key={i}>
                  <Link
                    to={item.to}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? "bg-indigo-600/10 text-indigo-400 font-medium"
                        : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    <span className={`text-xl transition-transform duration-200 ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
                      {item.icon}
                    </span>
                    <span className="text-[15px]">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* User + Logout */}
          <div className="mt-auto pt-6 border-t border-white/5">
            <div className="bg-[#161B22] rounded-2xl p-4 border border-white/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="overflow-hidden">
                  <h1 className="text-sm text-white font-medium truncate capitalize">
                    {user?.name}
                  </h1>
                  <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 py-2 px-4 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded-xl transition-colors cursor-pointer w-full text-sm font-medium"
              >
                <IoLogOutOutline className="text-lg" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* 🔹 Overlay (Mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-[#0B0F19]/80 backdrop-blur-sm md:hidden z-40"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
