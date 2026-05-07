import React, { useEffect, useRef, useState } from "react";
import { LuSendHorizontal } from "react-icons/lu";
import { MdAttachment } from "react-icons/md";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { IoCallOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { AiOutlineMessage } from "react-icons/ai";
import ChatList from "../components/ChatList";
import { useSelector, useDispatch } from "react-redux";
import { getDatabase, onValue, push, ref, set, update } from "firebase/database";
import { auth } from "../firebase.config";
import moment from "moment/moment";
import { chatingUserInfo } from "../slices/ChatSlice";
import { FaArrowLeft } from "react-icons/fa6";

const Chat = () => {
  const dispatch = useDispatch();
  const [showChat, setShowChat] = useState(false);
  const [massageCollection, setmassageCollection] = useState([]);
  const db = getDatabase();
  const [message, setmassage] = useState(null);
  const user = useSelector((state) => state.chatUser.value);
  const bottomRef = useRef(null);

  // input handle
  const handlemassage = (e) => {
    setmassage(e.target.value);
  };

  // send message
  const handleSendMsg = () => {
    if (!message || message.trim() === "") return;

    set(push(ref(db, "massagelist/")), {
      sendername: auth.currentUser.displayName,
      senderid: auth.currentUser.uid,
      recievername: user.name,
      recieverid: user.id,
      msg: message,
      status: "unread",
      date: `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}-${new Date().getHours()}-${new Date().getMinutes()}`,
    }).then(() => {
      setmassage("");
    });
  };

  // fetch conversation with current user
  useEffect(() => {
    const massageCollectionRef = ref(db, "massagelist/");
    onValue(massageCollectionRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        if (
          (auth.currentUser.uid == item.val().senderid &&
            user?.id == item.val().recieverid) ||
          (auth.currentUser.uid == item.val().recieverid &&
            user?.id == item.val().senderid)
        ) {
          array.push({ ...item.val(), id: item.key });
        }
      });
      setmassageCollection(array);
    });
  }, [user?.id]);

  // auto scroll bottom
  useEffect(() => {
    if (massageCollection.length > 0) {
      bottomRef.current?.scrollIntoView({ behavior: "auto" });
    }
  }, [massageCollection]);

  // unread → read when chat is opened
  useEffect(() => {
    if (!user?.id) return;

    const msgRef = ref(db, "massagelist/");
    onValue(msgRef, (snapshot) => {
      snapshot.forEach((msgItem) => {
        const data = msgItem.val();
        if (
          data.recieverid === auth.currentUser.uid &&
          data.senderid === user.id &&
          data.status === "unread"
        ) {
          update(ref(db, "massagelist/" + msgItem.key), {
            ...data,
            status: "read",
          });
        }
      });
    });
  }, [user?.id]);

  // when user selected
  const handleSelectUser = (item) => {
    if (auth.currentUser.uid == item.senderid) {
      dispatch(
        chatingUserInfo({ name: item.recievername, id: item.recieverid })
      );
    } else {
      dispatch(chatingUserInfo({ name: item.sendername, id: item.senderid }));
    }
    setShowChat(true);
  };

  return (
    <div className="w-full h-[calc(100dvh-70px)] md:h-dvh relative grid grid-cols-1 lg:grid-cols-4 bg-[#0B0F19] overflow-hidden">
      {/* Sidebar */}
      <div className={`${showChat ? "hidden lg:block" : "block"} w-full h-full`}>
        <ChatList onSelectUser={handleSelectUser} />
      </div>

      {/* Empty State */}
      {!user && (
        <div className="hidden lg:flex w-full flex-col items-center justify-center col-span-3 h-full relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="w-24 h-24 bg-white/5 rounded-3xl backdrop-blur-xl border border-white/10 flex items-center justify-center mb-6 shadow-2xl">
            <AiOutlineMessage className="text-5xl text-indigo-400" />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight mb-2">
            Welcome to Chatbuzzz
          </h2>
          <span className="text-slate-400 max-w-sm text-center text-sm leading-relaxed">
            Select a conversation from the sidebar or start a new one to connect with your friends.
          </span>
        </div>
      )}

      {/* Chat Window */}
      {user && showChat && (
        <div className="w-full col-span-3 bg-[#0B0F19] relative h-[calc(100dvh-70px)] md:h-dvh flex flex-col">
          {/* Header */}
          <div className="w-full py-3.5 sm:py-4 px-4 sm:px-6 bg-[#161B22]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between z-10 sticky top-0">
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => {
                  dispatch(chatingUserInfo(null));
                  setShowChat(false);
                }}
                className="lg:hidden w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              >
                <FaArrowLeft className="text-sm" />
              </button>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/20">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#161B22] rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm sm:text-base tracking-tight">
                    {user?.name}
                  </h4>
                  <p className="text-emerald-400 text-xs font-medium">Online</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 sm:gap-3 text-slate-300">
              <button className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center transition-colors">
                <IoCallOutline className="text-xl" />
              </button>
              <button className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center transition-colors">
                <HiOutlineVideoCamera className="text-xl" />
              </button>
              <button className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center transition-colors">
                <CgProfile className="text-xl" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 bg-transparent custom-scrollbar flex flex-col gap-4">
            {massageCollection.map((msgitem) => {
              const isSender = msgitem.senderid == auth.currentUser.uid;
              return (
                <div key={msgitem.id} className={`flex w-full ${isSender ? "justify-end" : "justify-start"}`}>
                  <div className={`flex max-w-[85%] md:max-w-[70%] items-end gap-2 ${isSender ? "flex-row-reverse" : "flex-row"}`}>
                    
                    {/* Avatar for receiver (only showing on receiver side) */}
                    {!isSender && (
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold mb-1">
                         {user?.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    
                    <div className={`flex flex-col ${isSender ? "items-end" : "items-start"}`}>
                      <div 
                        className={`px-4 py-2.5 rounded-2xl shadow-sm ${
                          isSender 
                            ? "bg-indigo-600 text-white rounded-br-sm shadow-indigo-600/10" 
                            : "bg-[#161B22] text-slate-200 border border-white/5 rounded-bl-sm"
                        }`}
                      >
                        <p className="text-[14px] sm:text-[15px] leading-relaxed break-words">
                          {msgitem.msg}
                        </p>
                      </div>
                      <span className="text-[10px] text-slate-500 mt-1 mx-1 font-medium">
                        {moment(msgitem.date, "YYYY-MM-DD-H-m").format("LT")}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* Input Area */}
          <div className="w-full bg-[#161B22]/80 backdrop-blur-xl border-t border-white/5 p-3 sm:p-4 pb-4 md:pb-4 sticky bottom-0">
            <div className="max-w-4xl mx-auto flex items-end gap-2">
              <button className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors flex-shrink-0">
                <MdAttachment className="text-2xl" />
              </button>
              
              <div className="flex-1 bg-[#0B0F19] border border-white/10 rounded-2xl flex items-end overflow-hidden focus-within:border-indigo-500/50 focus-within:ring-1 focus-within:ring-indigo-500/50 transition-all shadow-inner">
                <textarea
                  onChange={handlemassage}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMsg();
                    }
                  }}
                  value={message || ""}
                  placeholder="Type a message..."
                  className="w-full max-h-32 bg-transparent text-slate-200 text-[14px] sm:text-[15px] py-3.5 px-4 outline-none resize-none overflow-y-auto custom-scrollbar"
                  rows="1"
                />
              </div>
              
              <button 
                onClick={handleSendMsg}
                disabled={!message || message.trim() === ""}
                className={`p-3 rounded-xl flex items-center justify-center transition-all flex-shrink-0 shadow-lg ${
                  message && message.trim() !== ""
                    ? "bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-600/20 active:scale-95"
                    : "bg-white/5 text-slate-500 cursor-not-allowed"
                }`}
              >
                <LuSendHorizontal className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
