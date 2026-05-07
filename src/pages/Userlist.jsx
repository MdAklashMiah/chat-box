import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, push, set } from "firebase/database";
import { getAuth } from "firebase/auth";


const Userlist = () => {
  const [userList, setUserList] = useState([]);
  const [checkRequestId, setcheckRequestId] = useState([]);
  const [checkFriendId, setcheckFriendId] = useState([]);
  const db = getDatabase();
  const auth = getAuth();

  useEffect(() => {
    const userListRef = ref(db, "userslist/");
    onValue(userListRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        if (item.key != auth.currentUser.uid) {
          array.push({ ...item.val(), id: item.key });
        }
      });
      setUserList(array);
    });
  }, []);

  useEffect(() => {
    const friendReqListRef = ref(db, "friendrequestlist/");
    onValue(friendReqListRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        array.push(item.val().senderid + item.val().recieverid);
      });
      setcheckRequestId(array);
    });
  }, []);
  useEffect(() => {
    const friendReqListRef = ref(db, "friendslist/");
    onValue(friendReqListRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        array.push(item.val().senderid + item.val().recieverid);
      });
      setcheckFriendId(array);
    });
  }, []);
  console.log(checkFriendId);

  const handleFriendRequest = (item) => {
    set(push(ref(db, "friendrequestlist/")), {
      sendername: auth.currentUser.displayName,
      senderid: auth.currentUser.uid,
      recievername: item.name,
      recieverid: item.id,
    }).then(() => {
      console.log("friend request done");
    });
  };

  console.log(checkRequestId);
  return (
    <div className="w-full min-h-dvh bg-[#0B0F19] p-4 sm:p-8 overflow-y-auto relative">
      {/* Decorative blurs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-8 border-b border-white/10 pb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Discover People
          </h1>
          <p className="text-slate-400 mt-2">Connect with new people and expand your network.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userList.map((item) => {
            return (
              <div key={item.id} className="bg-[#161B22]/80 backdrop-blur-xl border border-white/5 p-5 rounded-2xl flex items-center justify-between hover:bg-white/[0.02] transition-colors shadow-lg shadow-black/20 group">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/20">
                      {item.name?.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <h6 className="text-white font-semibold tracking-tight group-hover:text-indigo-400 transition-colors">
                      {item.name}
                    </h6>
                    <p className="text-slate-500 text-xs mt-0.5">{item.email}</p>
                  </div>
                </div>

                <div>
                  {checkFriendId.includes(auth.currentUser.uid + item.id) ||
                  checkFriendId.includes(item.id + auth.currentUser.uid) ? (
                    <button className="bg-white/5 text-slate-400 px-4 py-2 rounded-xl text-sm font-medium border border-white/5 cursor-default">
                      Friends
                    </button>
                  ) : checkRequestId.includes(auth.currentUser.uid + item.id) ||
                    checkRequestId.includes(item.id + auth.currentUser.uid) ? (
                    <button className="bg-indigo-500/10 text-indigo-400 px-4 py-2 rounded-xl text-sm font-medium border border-indigo-500/20 cursor-default">
                      Pending
                    </button>
                  ) : (
                    <button
                      onClick={() => handleFriendRequest(item)}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20 active:scale-95"
                    >
                      Add Friend
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        {userList.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            </div>
            <h3 className="text-xl font-semibold text-white">No users found</h3>
            <p className="text-slate-400 mt-2">Check back later for new people.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Userlist;
