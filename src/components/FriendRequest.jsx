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
    <>
      <div className="relative w-full max-h-screen rounded-lg bg-linear-to-t from-[#1D3557] shadow-sm">
        <h2 className="text-2xl text-center text-[#F1FAEE] font-bold bg-[#1D3557] border-b-2 border-[#39455a] p-5">Friends Request</h2>
        <ul className="max-w-2xl text-center mx-auto flex flex-col gap-1 mt-1">
          {friendReqList.map((item) => (
            <li className="text-white flex w-full items-center bg-[#1D3557] justify-between rounded-md p-3 transition-all">
              <div className="mr-4 grid place-items-center">
                <img
                  alt="candice"
                  src="https://docs.material-tailwind.com/img/face-1.jpg"
                  className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center"
                />
              </div>
              <div>
                <h6 className="text-white font-medium">
                  {item.sendername}
                </h6>
                <p className="text-slate-500 text-sm">bbbbbbbbb</p>
              </div>
              <button onClick={()=>handleAcceptFriend(item)} className="bg-blue-400 px-3 py-1 border rounded">
                Accept
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FriendRequest;
