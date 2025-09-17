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
    <>
      <div className="relative w-full rounded-lg bg-linear-to-t from-[#1D3557] shadow-sm ">
        <h1 className="text-2xl text-center text-[#F1FAEE] font-bold bg-[#1D3557] border-b-2 border-[#39455a] p-5">People You May Know</h1>
        <ul className="max-w-2xl text-center mx-auto flex flex-col gap-1 mt-1">
          {userList.map((item) => {
            return (
              <li className="text-white flex w-full items-center bg-[#1D3557] justify-between rounded-md p-3 transition-all ">
                <div className="mr-4 grid place-items-center">
                  <img
                    alt="candice"
                    src="https://docs.material-tailwind.com/img/face-1.jpg"
                    className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center"
                  />
                </div>
                <div>
                  <h6 className="text-white font-medium">{item.name}</h6>
                  <p className="text-slate-500 text-sm">{item.email}</p>
                </div>
                {checkFriendId.includes(auth.currentUser.uid + item.id) ||
                checkFriendId.includes(item.id + auth.currentUser.uid) ? (
                  <button>cancel</button>
                ) : checkRequestId.includes(auth.currentUser.uid + item.id) ||
                  checkRequestId.includes(item.id + auth.currentUser.uid) ? (
                  <button>cancel</button>
                ) : (
                  <button
                    onClick={() => handleFriendRequest(item)}
                    className="bg-blue-400 px-3 py-1 border rounded"
                  >
                    Add Friend
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Userlist;
