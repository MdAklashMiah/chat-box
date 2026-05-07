import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { getAuth } from "firebase/auth";

const FriendRequest = () => {
  const [friendReqList, setfriendReqList] = useState([]);
  const db = getDatabase();
  const auth = getAuth();

  useEffect(() => {
    const friendReqListRef = ref(db, "friendrequestlist/");
    onValue(friendReqListRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        if (
          // auth.currentUser.uid == item.val().senderid 
          auth.currentUser.uid == item.val().recieverid
        ) {
          array.push({...item.val(), id: item.key});
        }
      });
      setfriendReqList(array);
    });
  }, []);

  const handleAcceptFriend = (item)=>{
    console.log("clicked", item)
    set(push(ref(db, "friendslist/")), {
        ...item,
        }).then(() => {
          remove(ref(db, "friendrequestlist/" + item.id))
        });
  }

  return (
    <div className="w-full min-h-dvh bg-[#0B0F19] p-4 sm:p-8 overflow-y-auto relative">
      {/* Decorative blurs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-8 border-b border-white/10 pb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Friend Requests
            </h1>
            <p className="text-slate-400 mt-2">Manage your incoming friend requests.</p>
          </div>
          {friendReqList.length > 0 && (
            <span className="bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full text-sm font-bold border border-indigo-500/30">
              {friendReqList.length} New
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {friendReqList.map((item) => (
            <div key={item.id} className="bg-[#161B22]/80 backdrop-blur-xl border border-white/5 p-5 rounded-2xl flex items-center justify-between hover:bg-white/[0.02] transition-colors shadow-lg shadow-black/20 group">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20">
                    {item.sendername?.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div>
                  <h6 className="text-white font-semibold tracking-tight group-hover:text-blue-400 transition-colors">
                    {item.sendername}
                  </h6>
                  <p className="text-slate-500 text-xs mt-0.5">Wants to be friends</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleAcceptFriend(item)} 
                  className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20 active:scale-95"
                >
                  Accept
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {friendReqList.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            </div>
            <h3 className="text-xl font-semibold text-white">No new requests</h3>
            <p className="text-slate-400 mt-2">You don't have any pending friend requests right now.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendRequest;
