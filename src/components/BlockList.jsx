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

const BlockList = () => {
  const [blockList, setblockList] = useState([]);
  const db = getDatabase();
  const auth = getAuth();

  useEffect(() => {
    const friendReqListRef = ref(db, "blocklist/");
    onValue(friendReqListRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        if (auth.currentUser.uid == item.val().blocker) {
          array.push({ ...item.val(), id: item.key });
        }
      });
      setblockList(array);
    });
  }, []);

  const handleUnblock = (item) => {
    if (auth.currentUser.uid == item.blocker) {
      set(push(ref(db, "friendslist/")), {
        sendername: item.blockername,
        senderid: item.blocker,
        recievername: item.blockusername,
        recieverid: item.blockuser,
      }).then(() => {
        remove(ref(db, "blocklist/" + item.id));
      });
    }else{
        set(push(ref(db, "friendslist/")), {
        sendername: item.blockusername,
        senderid: item.blockuser,
        recievername: item.blockername,
        recieverid: item.blocker,
      }).then(() => {
        remove(ref(db, "blocklist/" + item.id));
      });
    }
  };

  return (
    <>
      <div className="relative w-full rounded-lg bg-linear-to-t from-[#1D3557] shadow-sm">
        <h1 className="text-2xl text-center text-[#F1FAEE] font-bold bg-[#2d3748] border-b-2 border-[#39455a] p-5">Block List</h1>
        <ul className="max-w-2xl text-center mx-auto flex flex-col gap-1 mt-1">
          {blockList.map((item) => (
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
                  {auth.currentUser.uid == item.blocker
                    ? item.blockusername
                    : item.blockername}
                </h6>
                <p className="text-slate-500 text-sm">bbbbbbbbb</p>
              </div>
              <button
                onClick={() => handleUnblock(item)}
                className="bg-blue-400 px-3 py-1 border rounded"
              >
                Unblock
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default BlockList;
