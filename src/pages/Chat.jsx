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

const Chat = () => {
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
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [massageCollection]);

  return (
    <div className="w-full relative grid grid-cols-4 items-center bg-linear-to-t from-[#1D3557] rounded-xl shadow  overflow-hidden">
      <ChatList />
      {user ? (
        <div className="w-full col-span-3 bg-[#262e3b] relative rounded-lg h-screen overflow-y-scroll">
          <div className="w-full py-5 flex items-center justify-between px-10 bg-[#2d3748] border-b-2 border-[#39455a] sticky top-0 left-0 z-10">
            <div className="flex items-center gap-4">
              {/* <div className="relative">
              <img
                src="https://i.pravatar.cc/40?img=1"
                className="w-10 h-10 rounded-full"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
            </div> */}
              <div>
                <h4 className="text-[#457B9D] font-semibold text-xl">
                  {user?.name}
                </h4>
              </div>
            </div>
            <div className="flex gap-5 text-2xl bg-[#457B9D] p-2 rounded-sm">
              <HiOutlineVideoCamera />
              <IoCallOutline />
            </div>
          </div>
          <div className="p-5 min-h-full bg-linear-to-t from-[#1D3557]">
            <div className="flex flex-col h-full">
              <div className="grid grid-cols-12 gap-y-2">
                {massageCollection.map((msgitem) =>
                  msgitem.senderid == auth.currentUser.uid ? (
                    <div className="col-start-6 col-end-13  p-3 rounded-lg">
                      <div className="flex items-center justify-start  flex-row-reverse">
                        <div className="text-4xl">
                          <CgProfile className="text-[#457B9D]" />
                        </div>
                        <div className="relative mr-3 text-sm bg-linear-to-r from-[#457B9D] py-2 px-4 shadow rounded-xl break-words max-w-[90%]">
                          <h2 className=" text-[16px] font-medium text-[#F1FAEE]">
                            {msgitem.msg}
                          </h2>
                          <p className="text-[#F1FAEE]">
                            {moment(
                              msgitem.date,
                              "YYYYMMDD , h:mm:ss"
                            ).fromNow()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="col-start-1 col-end-8  p-3 rounded-lg">
                      <div className="flex flex-row items-center">
                        <div className="text-4xl">
                          <CgProfile className="text-[#457B9D]" />
                        </div>
                        <div className="relative ml-3 text-sm bg-linear-to-l from-[#457B9D] py-2 px-4 shadow rounded-xl break-words max-w-[90%]">
                          <h2 className="text-[16px] font-medium text-[#F1FAEE]">
                            {msgitem.msg}
                          </h2>
                          <p className="text-[#F1FAEE]">
                            {moment(
                              msgitem.date,
                              "YYYYMMDD , h:mm:ss"
                            ).fromNow()}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
               <div ref={bottomRef} />
            </div>
          </div>
          <div className="w-full py-5 flex items-center px-5 bg-[#2d3748] border-t-2 border-[#39455a] sticky bottom-0 left-0 ">
            <label htmlFor="file-upload" className="absolute left-10 text-4xl">
              <MdAttachment />
            </label>
            {/* <input type="file" id="file-upload" className="hidden" /> */}
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
              placeholder="Enter Your Text"
              className="bg-[#262e3b] text-white py-4 px-20 w-full h-full rounded-lg border-1 border-[#39455a]"
            />
            <button
              onClick={handleSendMsg}
              className="absolute right-10 cursor-pointer"
            >
              <LuSendHorizontal className="text-4xl  text-green-700" />
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full col-span-3 text-center">
          <h2 className="text-center text-4xl font-bold text-[#457B9D]">
            Hi, Welcome Back
          </h2>
          <span className="text-[#457B9D] italic">
            Let's Chat with everyone.
          </span>
        </div>
      )}
    </div>
  );
};

export default Chat;
