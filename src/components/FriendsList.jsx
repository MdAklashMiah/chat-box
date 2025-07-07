import React, { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { getAuth } from "firebase/auth";

const FriendList = () => {
  const [friendReqList, setfriendReqList] = useState([]);
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
      setfriendReqList(array);
    });
  }, []);

  const handleBlock = (item) => {
    if (auth.currentUser.uid == item.senderid) {
      console.log("reciever");
      set(push(ref(db, "blocklist/")), {
        blocker: item.senderid,
        blockername: item.sendername,
        blockuser: item.recieverid,
        blockusername: item.recievername,
      }).then(() => {
        remove(ref(db, "friendslist/" + item.id))
      });
    } else {
      console.log("sender");
      set(push(ref(db, "blocklist/")), {
        blocker: item.recieverid,
        blockername: item.recievername,
        blockuser: item.senderid,
        blockusername: item.sendername,
      }).then(() => {
        remove(ref(db, "friendslist/" + item.id))
      });
    }
  };

  return (
    <>
      <div className="relative w-full rounded-lg bg-linear-to-t from-[#1D3557] shadow-sm">
        <h2 className="text-2xl text-center text-[#F1FAEE] font-bold bg-[#2d3748] border-b-2 border-[#39455a] p-5">Friends List</h2>
        <ul className="max-w-2xl text-center mx-auto flex flex-col gap-1 mt-1">
          {friendReqList.map((item) => (
            <li className="text-white flex w-full items-center bg-gray-700 justify-between rounded-md p-3 transition-all">
              <div className="mr-4 grid place-items-center">
                <img
                  alt="candice"
                  src="https://docs.material-tailwind.com/img/face-1.jpg"
                  className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center"
                />
              </div>
              <div>
                <h6 className="text-white font-medium">
                  {auth.currentUser.uid == item.senderid
                    ? item.recievername
                    : item.sendername}
                </h6>
                <p className="text-slate-500 text-sm">info</p>
              </div>
              <button
                onClick={() => handleBlock(item)}
                className="bg-blue-400 px-3 py-1 border rounded"
              >
                Block
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FriendList;
