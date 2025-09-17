import { getAuth } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatingUserInfo } from "../slices/ChatSlice";
import { IoSearchOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

const ChatList = ({ onSelectUser }) => {
  const user = useSelector((state) => state.chatUser.value);
  const dispatch = useDispatch();
  const [chatList, setChatList] = useState([]);
  const [searchUser, setSearchUser] = useState([]);
  const db = getDatabase();
  const auth = getAuth();

  useEffect(() => {
    const friendReqListRef = ref(db, "friendslist/");
    onValue(friendReqListRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        if (
          auth.currentUser.uid == item.val().senderid ||
          auth.currentUser.uid == item.val().recieverid
        ) {
          array.push({ ...item.val(), id: item.key });
        }
      });
      setChatList(array);
    });
  }, []);

  const handleSelectUser = (item) => {
    if (auth.currentUser.uid == item.senderid) {
      dispatch(
        chatingUserInfo({ name: item.recievername, id: item.recieverid })
      );
    } else {
      dispatch(chatingUserInfo({ name: item.sendername, id: item.senderid }));
    }
    if (onSelectUser) {
      onSelectUser(item);
    }
  };

  const handleSearch = (e) => {
    console.log(e.target.value);
    let searchList = chatList.filter(
      (item) =>
        item.sendername.toUpperCase().replaceAll(" ", "") ==
          e.target.value.toUpperCase() ||
        item.recievername.toUpperCase().replaceAll(" ", "") ==
          e.target.value.toUpperCase()
    );
    setSearchUser(searchList);
  };

  console.log(searchUser);

  return (
    <div className="w-full bg-linear-to-b from-[#457B9D] col-span-1 p-3 sm:p-5 overflow-auto h-full sm:h-screen border-r-2 border-[#39455a]">
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-lg sm:text-2xl font-bold text-[#457B9D]">Chats</h2>
    <button className="text-gray-400 hover:text-gray-600">•••</button>
  </div>

  {/* Search Bar */}
  <div className="relative mb-5">
    <input
      onChange={handleSearch}
      type="text"
      placeholder="Search.."
      className="w-full pl-10 pr-4 py-2 border border-[#39455a] rounded-md bg-[#ffffff] text-sm text-black placeholder-[#39455a] focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <IoSearchOutline className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
  </div>

  {/* Message Items */}
  <div className="space-y-2 overflow-auto">
    {chatList.map((item) => (
      <div
        onClick={() => handleSelectUser(item)}
        className={`flex items-center justify-between p-3 sm:p-4 rounded-md border border-[#39455a] cursor-pointer transition hover:bg-[#2a3244] ${
          user?.id == item.senderid || user?.id == item.recieverid
            ? "bg-[#457B9D]"
            : "bg-[#1D3557]"
        }`}
      >
        <div className="flex items-center space-x-3 w-3/4 overflow-hidden">
          <CgProfile className="text-3xl sm:text-4xl text-[#ffffff] flex-shrink-0" />
          <div className="overflow-hidden">
            <h4 className="font-semibold text-white text-sm truncate">
              {auth.currentUser.uid == item.senderid
                ? item.recievername
                : item.sendername}
            </h4>
            <p className="text-xs text-gray-300 truncate">
              Hello devid, how are you today?
            </p>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-xs text-white">Dec, 8</p>
          <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-medium block w-fit">
            5
          </span>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default ChatList;
