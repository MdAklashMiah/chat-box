import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { MdBlock } from "react-icons/md";
import { ImHome } from "react-icons/im";
import { AiFillMessage } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { RiUserReceivedFill } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { userLoginInfo } from "../slices/UserSlice";
import { Link, Links, useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();
  const user = useSelector((state) => state.userLogin.value);
  console.log(pathname);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
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
  }, [dispatch]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div>
    <aside
      id="default-sidebar"
      className="min-w-xs h-full min-h-screen relative md:hidden lg:block"
      aria-label="Sidebar"
    >
      <div className="min-w-xs h-full flex flex-col justify-between px-3 py-4 overflow-y-auto fixed top-0 left-0 bg-linear-to-t from-[#1D3557] border-r-4 border-[#F1FAEE]">
        <div>
          <div className="logo py-4">
            <a href="#" className="text-3xl font-bold text-[#457B9D]">Chat-Box</a>
          </div>
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/"
                href="#"
                className={`flex items-center p-2 text-gray-900 rounded-lg ${
                  pathname == "/" && "bg-gray-700"
                } dark:text-white `}
              >
                <ImHome />
                <span className="ms-3">Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/Chat"
                href="#"
                className={`flex items-center p-2 text-gray-900 rounded-lg ${
                  pathname == "/Chat" && "bg-gray-700"
                } dark:text-white `}
              >
                <AiFillMessage />
                <span className="flex-1 ms-3 whitespace-nowrap">Message</span>
              </Link>
            </li>
            <li>
              <Link
                to="/FriendList"
                href="#"
                className={`flex items-center p-2 text-gray-900 rounded-lg ${
                  pathname == "/FriendList" && "bg-gray-700"
                } dark:text-white `}
              >
                <FaUserFriends />
                <span className="flex-1 ms-3 whitespace-nowrap">Friends</span>
              </Link>
            </li>
            <li>
              <Link
                to="/UserList"
                href="#"
                className={`flex items-center p-2 text-gray-900 rounded-lg ${
                  pathname == "/UserList" && "bg-gray-700"
                } dark:text-white `}
              >
                <FaUsers />
                <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
              </Link>
            </li>
            <li>
              <Link
                to="/FriendRequest"
                href="#"
                className={`flex items-center p-2 text-gray-900 rounded-lg ${
                  pathname == "/FriendRequest" && "bg-gray-700"
                } dark:text-white `}
              >
                <RiUserReceivedFill />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Friend Request
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/BlockList"
                href="#"
                className={`flex items-center p-2 text-gray-900 rounded-lg ${
                  pathname == "/BlockList" && "bg-gray-700"
                } dark:text-white `}
              >
                <MdBlock />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Block List
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h1 className="text-2xl text-white mb-2.5 font-medium capitalize">
            {user?.name}
          </h1>
          <div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 p-2 text-xl text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer"
            >
              <IoLogOutOutline />
              <span className="flex-1 ms-3 whitespace-nowrap">Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </aside>

    </div>
  );
};

export default Sidebar;
