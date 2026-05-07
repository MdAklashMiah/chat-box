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
    <div className="w-full min-h-dvh bg-[#0B0F19] p-4 sm:p-8 overflow-y-auto relative">
      {/* Decorative blurs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-8 border-b border-white/10 pb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            My Friends
          </h1>
          <p className="text-slate-400 mt-2">Manage your friends and connections.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {friendReqList.map((item) => {
            const friendName = auth.currentUser.uid == item.senderid ? item.recievername : item.sendername;
            return (
              <div key={item.id} className="bg-[#161B22]/80 backdrop-blur-xl border border-white/5 p-5 rounded-2xl flex items-center justify-between hover:bg-white/[0.02] transition-colors shadow-lg shadow-black/20 group">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-emerald-500/20">
                      {friendName?.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <h6 className="text-white font-semibold tracking-tight group-hover:text-emerald-400 transition-colors">
                      {friendName}
                    </h6>
                    <p className="text-slate-500 text-xs mt-0.5">Connected</p>
                  </div>
                </div>

                <button
                  onClick={() => handleBlock(item)}
                  className="bg-red-500/10 text-red-400 px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-500/20 hover:text-red-300 transition-colors border border-red-500/20 active:scale-95"
                >
                  Block
                </button>
              </div>
            );
          })}
        </div>
        
        {friendReqList.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            </div>
            <h3 className="text-xl font-semibold text-white">No friends yet</h3>
            <p className="text-slate-400 mt-2">Start sending requests to connect with people.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendList;
