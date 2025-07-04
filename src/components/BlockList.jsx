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
      <div className="relative w-md h-1/2 rounded-lg border border-slate-200 bg-white shadow-sm p-2 mt-2">
        <h1 className="text-2xl font-bold">Block List</h1>
        <ul>
          {blockList.map((item) => (
            <li className="text-slate-800 flex w-full items-center justify-between rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100">
              <div className="mr-4 grid place-items-center">
                <img
                  alt="candice"
                  src="https://docs.material-tailwind.com/img/face-1.jpg"
                  className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center"
                />
              </div>
              <div>
                <h6 className="text-slate-800 font-medium">
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
