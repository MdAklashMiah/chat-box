import { getAuth } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatingUserInfo } from "../slices/ChatSlice";

const ChatList = () => {
  const user = useSelector((state) => state.chatUser.value);
  const dispatch = useDispatch();
  const [chatList, setChatList] = useState([]);
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
  console.log(chatList)

  const handleSelectUser = (item)=>{
    if(auth.currentUser.uid == item.senderid){
     dispatch(chatingUserInfo({ name: item.recievername, id: item.recieverid}));
    }else{
      dispatch(chatingUserInfo({ name: item.sendername, id: item.senderid}));
    }
  }

  const handleSearch = (e)=>{
    console.log(e.target.value)
  }

  return (
    <div className="w-full bg-[#2d3748] col-span-1 p-5 overflow-auto h-screen border-r-2 border-[#39455a]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-green-700">Chat-Box</h2>
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
        <svg
          className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1016.65 2.5a7.5 7.5 0 000 15z"
          />
        </svg>
      </div>
      {/* Message Items */}
      <div className="space-y-1 overflow-auto">
        {/* Message Item */}

        {chatList.map((item)=>(        
        <div onClick={()=>handleSelectUser(item)} className={`flex items-center justify-between p-4 rounded-md border-1 border-[#39455a] ${user?.id == item.senderid  || user?.id == item.recieverid ? "bg-[#262e3b]" : "bg-transparent"}`}>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src="https://i.pravatar.cc/40?img=1"
                className="w-10 h-10 rounded-full"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
            </div>
            <div>
                {auth.currentUser.uid == item.senderid 
                ?
                <h4 className="font-semibold text-white text-sm">{item.recievername}</h4>
                :
                <h4 className="font-semibold text-white text-sm">{item.sendername}</h4>
                }
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
