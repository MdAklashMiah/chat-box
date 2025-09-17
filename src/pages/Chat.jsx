import React, { useEffect, useRef, useState } from "react";
import { LuSendHorizontal } from "react-icons/lu";
import { MdAttachment } from "react-icons/md";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { IoCallOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import ChatList from "../components/ChatList";
import { useSelector } from "react-redux";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { auth } from "../firebase.config";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
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
  const handlemassage = (e) => {
    setmassage(e.target.value);
    console.log(e.target.value);
  };

  const handleSendMsg = () => {
    if (!message || message.trim() === "") {
      return;
    }
    set(push(ref(db, "massagelist/")), {
      sendername: auth.currentUser.displayName,
      senderid: auth.currentUser.uid,
      recievername: user.name,
      recieverid: user.id,
      msg: message,
      date: `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}-${new Date().getHours()}-${new Date().getMinutes()}`,
    }).then(() => {
      setmassage("");
    });
  };

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
  console.log(massageCollection);

  useEffect(() => {
    if (massageCollection.length > 0) {
      bottomRef.current?.scrollIntoView({ behavior: "auto" });
    }
  }, [massageCollection]);

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

  console.log("Redux User:", user);
  console.log("Show Chat:", showChat);

  return (
    <div className="w-full min-h-dvh relative grid grid-cols-1 lg:grid-cols-4 bg-gradient-to-b from-[#457B9D] to-[#1D3557] rounded-xl shadow overflow-hidden">
  {/* Sidebar */}
  <div className={`${showChat ? "hidden lg:block" : "block"} w-full`}>
    <ChatList onSelectUser={handleSelectUser} />
  </div>

  {/* Empty State */}
  {!user && (
    <div className="w-full flex flex-col items-center justify-center col-span-3 text-center p-5">
      <h2 className="text-2xl sm:text-4xl font-bold text-white">Hi, Welcome Back</h2>
      <span className="text-white italic text-sm sm:text-base">Let's Chat with everyone.</span>
    </div>
  )}

  {/* Chat Window */}
  {user && showChat && (
    <div className="w-full col-span-3 bg-[#262e3b] relative rounded-lg min-h-dvh flex flex-col">
      {/* Header */}
      <div className="w-full py-3 sm:py-5 flex items-center justify-between px-5 sm:px-10 bg-[#457B9D] border-b border-[#39455a] sticky top-0 z-10">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => {
              dispatch(chatingUserInfo(null));
              setShowChat(false);
            }}
            className="lg:hidden text-white text-xl"
          >
            <FaArrowLeft />
          </button>
          <h4 className="text-white font-semibold text-base sm:text-xl">{user?.name}</h4>
        </div>
        <div className="flex gap-3 sm:gap-5 text-xl sm:text-2xl text-white">
          <HiOutlineVideoCamera />
          <IoCallOutline />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-5 py-3 bg-[#1D3557]">
        <div className="grid grid-cols-12 gap-y-2">
          {massageCollection.map((msgitem) =>
            msgitem.senderid == auth.currentUser.uid ? (
              <div className="col-start-6 col-end-13 p-2 sm:p-3">
                <div className="flex flex-row-reverse items-start gap-2 sm:gap-3">
                  <CgProfile className="text-2xl sm:text-3xl text-white" />
                  <div className="bg-[#457B9D] p-2 sm:p-3 rounded-xl shadow max-w-[75%] sm:max-w-[60%] break-words">
                    <h2 className="text-sm sm:text-base font-medium text-[#F1FAEE]">
                      {msgitem.msg}
                    </h2>
                    <p className="text-xs text-gray-200">{moment(msgitem.date, "YYYYMMDD, h:mm:ss").fromNow()}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="col-start-1 col-end-8 p-2 sm:p-3">
                <div className="flex items-start gap-2 sm:gap-3">
                  <CgProfile className="text-2xl sm:text-3xl text-white" />
                  <div className="bg-[#457B9D] p-2 sm:p-3 rounded-xl shadow max-w-[75%] sm:max-w-[60%] break-words">
                    <h2 className="text-sm sm:text-base font-medium text-[#F1FAEE]">
                      {msgitem.msg}
                    </h2>
                    <p className="text-xs text-gray-200">{moment(msgitem.date, "YYYYMMDD, h:mm:ss").fromNow()}</p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-3 bg-[#457B9D] border-t border-[#39455a]">
        <MdAttachment className="text-2xl sm:text-3xl text-white cursor-pointer" />
        <input
          onChange={handlemassage}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMsg();
            }
          }}
          type="text"
          value={message}
          placeholder="Enter your text..."
          className="flex-1 py-2 sm:py-3 px-3 sm:px-5 rounded-lg border border-[#39455a] bg-white text-black text-sm sm:text-base"
        />
        <button onClick={handleSendMsg}>
          <LuSendHorizontal className="text-2xl sm:text-3xl text-white" />
        </button>
      </div>
    </div>
  )}
</div>

  );
};

export default Chat;
