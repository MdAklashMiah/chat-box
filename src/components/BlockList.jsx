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
    <div className="w-full min-h-dvh bg-[#0B0F19] p-4 sm:p-8 overflow-y-auto relative">
      {/* Decorative blurs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-8 border-b border-white/10 pb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Blocked Users
          </h1>
          <p className="text-slate-400 mt-2">Manage the users you have blocked.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {blockList.map((item) => {
            const blockedName = auth.currentUser.uid == item.blocker ? item.blockusername : item.blockername;
            return (
              <div key={item.id} className="bg-[#161B22]/80 backdrop-blur-xl border border-white/5 p-5 rounded-2xl flex items-center justify-between hover:bg-white/[0.02] transition-colors shadow-lg shadow-black/20 group">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-[#161B22] border border-white/10 flex items-center justify-center text-slate-400 font-bold text-lg shadow-lg">
                      {blockedName?.charAt(0).toUpperCase()}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-[#161B22] flex items-center justify-center">
                      <div className="w-2 h-0.5 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <h6 className="text-slate-300 font-semibold tracking-tight">
                      {blockedName}
                    </h6>
                    <p className="text-red-400 text-xs mt-0.5">Blocked</p>
                  </div>
                </div>

                <button
                  onClick={() => handleUnblock(item)}
                  className="bg-white/5 text-slate-300 px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/10 hover:text-white transition-colors border border-white/5 active:scale-95"
                >
                  Unblock
                </button>
              </div>
            );
          })}
        </div>
        
        {blockList.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            </div>
            <h3 className="text-xl font-semibold text-white">No blocked users</h3>
            <p className="text-slate-400 mt-2">You haven't blocked anyone yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockList;
