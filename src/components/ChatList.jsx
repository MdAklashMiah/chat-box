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
    <div className="w-full bg-[#2d3748] col-span-1 p-5 overflow-auto h-screen border-r-2 border-[#39455a]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-[#457B9D]">Chats</h2>
        <button className="text-gray-400 hover:text-gray-600">•••</button>
      </div>
      {/* Search Bar */}
      <div className="relative mb-5">
        <input
          onChange={handleSearch}
          type="text"
          placeholder="Search.."
          className="w-full pl-10 pr-4 py-2 border-1 border-[#39455a] rounded-md bg-[#262e3b] text-sm text-white placeholder-[#39455a] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <IoSearchOutline className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
      {/* Message Items */}
      <div className="space-y-1 overflow-auto">
        {/* Message Item */}

        {searchUser.length > 0
          ? searchUser.map((item) => (
              <div
                onClick={() => handleSelectUser(item)}
                className={`flex items-center justify-between p-4 rounded-md border-1 border-[#39455a] ${
                  user?.id == item.senderid || user?.id == item.recieverid
                    ? "bg-[#262e3b]"
                    : "bg-transparent"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <CgProfile className="text-4xl text-[#457B9D]" />
                  <div>
                    {auth.currentUser.uid == item.senderid ? (
                      <h4 className="font-semibold text-white text-sm">
                        {item.recievername}
                      </h4>
                    ) : (
                      <h4 className="font-semibold text-white text-sm">
                        {item.sendername}
                      </h4>
                    )}
                    <p className="text-xs text-gray-500">
                      Hello devid, how are you today?
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Dec, 8</p>
                  <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-medium ml-auto block w-fit">
                    5
                  </span>
                </div>
              </div>
            ))
          : chatList.map((item) => (
              <div
                onClick={() => handleSelectUser(item)}
                className={`flex items-center justify-between p-4 rounded-md border-1 border-[#39455a] ${
                  user?.id == item.senderid || user?.id == item.recieverid
                    ? "bg-linear-to-r from-[#1D3557]"
                    : "bg-[#262e3b]"
                }`}
              >
                <div className="flex items-center space-x-3 ">
                  <CgProfile className="text-4xl text-[#457B9D]" />
                  <div>
                    {auth.currentUser.uid == item.senderid ? (
                      <h4 className="font-semibold text-white text-sm">
                        {item.recievername}
                      </h4>
                    ) : (
                      <h4 className="font-semibold text-white text-sm">
                        {item.sendername}
                      </h4>
                    )}
                    <p className="text-xs text-gray-500">
                      Hello devid, how are you today?
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Dec, 8</p>
                  <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-medium ml-auto block w-fit">
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
