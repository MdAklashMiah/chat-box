import { getAuth } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatingUserInfo } from "../slices/ChatSlice";
import { IoSearchOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import moment from "moment";

const ChatList = ({ onSelectUser }) => {
  const user = useSelector((state) => state.chatUser.value);
  const dispatch = useDispatch();
  const [chatList, setChatList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const db = getDatabase();
  const auth = getAuth();

  useEffect(() => {
    const friendRef = ref(db, "friendslist/");
    const msgRef = ref(db, "massagelist/");

    // Friend list + messages live sync
    onValue(friendRef, (snapshot) => {
      const friends = [];
      snapshot.forEach((item) => {
        if (
          auth.currentUser.uid === item.val().senderid ||
          auth.currentUser.uid === item.val().recieverid
        ) {
          friends.push({ ...item.val(), id: item.key });
        }
      });

      // এখন message listener বসাবো
      onValue(msgRef, (msgSnap) => {
        const updatedList = friends.map((friend) => {
          let lastMsg = null;
          let unreadCount = 0;

          msgSnap.forEach((msgItem) => {
            const data = msgItem.val();
            const friendId =
              auth.currentUser.uid === friend.senderid
                ? friend.recieverid
                : friend.senderid;

            if (
              (data.senderid === auth.currentUser.uid &&
                data.recieverid === friendId) ||
              (data.recieverid === auth.currentUser.uid &&
                data.senderid === friendId)
            ) {
              // সর্বশেষ মেসেজ সেট করা
              if (!lastMsg || data.date > lastMsg.date) {
                lastMsg = { ...data, id: msgItem.key };
              }

              // unread count
              if (
                data.recieverid === auth.currentUser.uid &&
                data.status === "unread"
              ) {
                unreadCount++;
              }
            }
          });

          return { ...friend, lastMsg, unreadCount };
        });

        // last message এর date অনুযায়ী sort করা
        updatedList.sort((a, b) => {
          if (!a.lastMsg) return 1;
          if (!b.lastMsg) return -1;
          return moment(b.lastMsg.date).diff(moment(a.lastMsg.date));
        });

        setChatList(updatedList);
      });
    });
  }, []);

  const handleSelectUser = (item) => {
    if (auth.currentUser.uid === item.senderid) {
      dispatch(
        chatingUserInfo({ name: item.recievername, id: item.recieverid })
      );
    } else {
      dispatch(chatingUserInfo({ name: item.sendername, id: item.senderid }));
    }
    if (onSelectUser) onSelectUser(item);
  };

  const handleSearch = (e) => setSearchQuery(e.target.value);

  const filteredChatList = chatList.filter((item) => {
    const senderName = item.sendername.toLowerCase().replace(/\s/g, "");
    const receiverName = item.recievername.toLowerCase().replace(/\s/g, "");
    const query = searchQuery.toLowerCase().replace(/\s/g, "");
    return senderName.includes(query) || receiverName.includes(query);
  });

  const highlightMatch = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-yellow-300 text-black px-1 rounded">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="w-full max-h-screen bg-linear-to-b from-[#457B9D] col-span-1 p-3 sm:p-5 overflow-auto h-full sm:h-screen border-r-2 border-[#39455a]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-2xl font-bold text-[#457B9D]">Chats</h2>
        <button className="text-gray-400 hover:text-gray-600">•••</button>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <input
          onChange={handleSearch}
          type="text"
          placeholder="Search..."
          value={searchQuery}
          className="w-full pl-10 pr-4 py-2 border border-[#39455a] rounded-md bg-[#ffffff] text-sm text-black placeholder-[#39455a] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <IoSearchOutline className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      {/* Chat list */}
      <div className="space-y-2 overflow-auto">
        {filteredChatList.length > 0 ? (
          filteredChatList.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelectUser(item)}
              className={`flex items-center justify-between p-3 sm:p-4 rounded-md border border-[#39455a] cursor-pointer transition hover:bg-[#2a3244] ${
                user?.id === item.senderid || user?.id === item.recieverid
                  ? "bg-[#457B9D]"
                  : "bg-[#1D3557]"
              }`}
            >
              <div className="flex items-center space-x-3 w-3/4 overflow-hidden">
                <CgProfile className="text-3xl sm:text-4xl text-[#ffffff] flex-shrink-0" />
                <div className="overflow-hidden">
                  <h4 className="font-semibold text-white text-sm truncate">
                    {auth.currentUser.uid === item.senderid
                      ? highlightMatch(item.recievername, searchQuery)
                      : highlightMatch(item.sendername, searchQuery)}
                  </h4>
                  <p className="text-xs text-gray-300 truncate">
                    {item.lastMsg ? item.lastMsg.msg : "No messages yet"}
                  </p>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                {item.lastMsg && (
                  <p className="text-xs text-white">
                    {moment(item.lastMsg.date, "YYYY-MM-DD-H-m").fromNow()}
                  </p>
                )}
                {item.unreadCount > 0 && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-medium block w-fit mt-1">
                    {item.unreadCount}
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-300 mt-5">No chats found</p>
        )}
      </div>
    </div>
  );
};

export default ChatList;
