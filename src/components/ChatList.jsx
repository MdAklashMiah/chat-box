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
    <div className="w-full bg-[#161B22]/50 col-span-1 p-4 sm:p-5 h-[calc(100vh-80px)] md:h-screen overflow-hidden flex flex-col border-r border-white/5 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-5 mt-1">
        <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">Chats</h2>
        <button className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-5 group">
        <input
          onChange={handleSearch}
          type="text"
          placeholder="Search conversations..."
          value={searchQuery}
          className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-[#0B0F19] border border-white/10 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
        />
        <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-indigo-400 transition-colors" />
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto space-y-1.5 custom-scrollbar pr-1">
        {filteredChatList.length > 0 ? (
          filteredChatList.map((item) => {
            const isActive = user?.id === item.senderid || user?.id === item.recieverid;
            return (
              <div
                key={item.id}
                onClick={() => handleSelectUser(item)}
                className={`flex items-center justify-between p-3 sm:p-3.5 rounded-xl cursor-pointer transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-600/10 border border-indigo-500/20 shadow-sm"
                    : "bg-transparent border border-transparent hover:bg-white/5"
                }`}
              >
                <div className="flex items-center space-x-3.5 w-[70%] overflow-hidden">
                  <div className="relative flex-shrink-0">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
                      {auth.currentUser.uid === item.senderid
                        ? item.recievername.charAt(0).toUpperCase()
                        : item.sendername.charAt(0).toUpperCase()}
                    </div>
                    {/* Online indicator mock */}
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#161B22] rounded-full"></div>
                  </div>
                  <div className="overflow-hidden flex-1">
                    <h4 className={`font-semibold text-sm truncate ${isActive ? "text-indigo-300" : "text-slate-200"}`}>
                      {auth.currentUser.uid === item.senderid
                        ? highlightMatch(item.recievername, searchQuery)
                        : highlightMatch(item.sendername, searchQuery)}
                    </h4>
                    <p className={`text-[13px] truncate mt-0.5 ${item.unreadCount > 0 ? "text-slate-200 font-medium" : "text-slate-500"}`}>
                      {item.lastMsg ? item.lastMsg.msg : "No messages yet"}
                    </p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 flex flex-col items-end justify-center h-full">
                  {item.lastMsg && (
                    <span className={`text-[11px] font-medium ${item.unreadCount > 0 ? "text-indigo-400" : "text-slate-500"}`}>
                      {moment(item.lastMsg.date, "YYYY-MM-DD-H-m").format("LT")}
                    </span>
                  )}
                  {item.unreadCount > 0 && (
                    <span className="bg-indigo-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold mt-1.5 shadow-sm shadow-indigo-500/30">
                      {item.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <IoSearchOutline className="text-3xl text-slate-500" />
            </div>
            <p className="text-slate-400 font-medium text-sm">No conversations found</p>
            <p className="text-slate-500 text-xs mt-1">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
