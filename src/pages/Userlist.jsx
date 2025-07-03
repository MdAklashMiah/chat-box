import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, push, set } from "firebase/database";
import { getAuth } from "firebase/auth";

const Userlist = () => {
  const [userList, setUserList] = useState([]);
  const db = getDatabase();
  const auth = getAuth();

  useEffect(() => {
    const userListRef = ref(db, "userslist/");
    onValue(userListRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        if (item.key != auth.currentUser.uid) {
          array.push({...item.val(), id: item.key});
        }
      });
      setUserList(array);
    });
  }, []);

  const handleFriendRequest = (item) => {
    set(push(ref(db, "friendrequestlist/")), {
      sendername : auth.currentUser.displayName,
      senderid: auth.currentUser.uid,
      recievername: item.name,
      recieverid: item.id,
    }).then(()=>{
      console.log("friend request done")
    })
  };
  return (
    <>
      <div className="relative w-md h-1/2 rounded-lg border border-slate-200 bg-white shadow-sm p-2 mt-2">
        <h1 className="text-2xl font-bold">User List</h1>
        <ul>
          {userList.map((item) => {
            return (
              <li className="text-slate-800 flex w-full items-center justify-between rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100">
                <div className="mr-4 grid place-items-center">
                  <img
                    alt="candice"
                    src="https://docs.material-tailwind.com/img/face-1.jpg"
                    className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center"
                  />
                </div>
                <div>
                  <h6 className="text-slate-800 font-medium">{item.name}</h6>
                  <p className="text-slate-500 text-sm">{item.email}</p>
                </div>
                <button
                  onClick={()=>handleFriendRequest(item)}
                  className="bg-blue-400 px-3 py-1 border rounded"
                >
                  Add Friend
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Userlist;
