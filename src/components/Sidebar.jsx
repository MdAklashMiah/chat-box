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
      <div className="md:hidden flex items-center justify-between bg-[#1D3557] text-white p-4 sticky top-0 z-40">
        <div className="flex items-center">
          <span className="text-lg sm:text-xl font-bold">
            <AiOutlineMessage />
          </span>
          <span className="text-lg sm:text-xl font-bold">Chatbuzzz</span>
        </div>
        <button onClick={() => setOpen(!open)}>
          <GiHamburgerMenu size={24} />
        </button>
      </div>

      {/* 🔹 Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-60 sm:w-64 bg-[#1D3557] border-r-4 border-[#F1FAEE] transform transition-transform duration-300 z-50 
        ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static`}
      >
        <div className="h-full flex flex-col justify-between px-3 py-4 overflow-y-auto">
          <div>
            {/* Logo */}
            <div className="hidden md:flex items-center text-center">
              <span className="text-2xl sm:text-3xl font-bold text-white">
                <AiOutlineMessage />
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-white rounded">
                Chatbuzzz
              </span>
            </div>

            {/* Menu */}
            <ul className="space-y-2 font-medium mt-5">
              {menuItems.map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.to}
                    className={`flex items-center p-2 rounded-lg ${
                      pathname === item.to
                        ? "bg-[#457B9D] text-white"
                        : "text-gray-200"
                    } hover:bg-[#457B9D] transition`}
                    onClick={() => setOpen(false)}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="ml-3 text-sm sm:text-base">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* User + Logout */}
          <div className="mt-5 border-t border-gray-600 pt-4">
            <h1 className="text-sm sm:text-lg text-white mb-3 font-medium capitalize">
              {user?.name}
            </h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 p-2 text-white rounded-lg hover:bg-gray-600 cursor-pointer w-full text-sm sm:text-base"
            >
              <IoLogOutOutline />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* 🔹 Overlay (Mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
