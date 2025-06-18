import { useEffect } from "react";
import Chat from "./Chat";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { userLoginInfo } from "../slices/UserSlice";


const Home = () => {
  const dispatch = useDispatch();
  const auth = getAuth()
  const navigate = useNavigate()
  const data = useSelector((state) => state.userLogin.value);

  console.log(auth)

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      console.log(user)
  if (user) {
    dispatch(userLoginInfo({
      name : user.displayName,
      email : user.email,
      uid : user.uid
    }))
  } else {
    dispatch(userLoginInfo(null))
  }
});
  },[dispatch])

  // useEffect(()=>{
  //   if(!data){
  //     navigate('/login')
  //   }
  // })
  return (
    <>
    <h1>aaaaaaaaa</h1>
    {/* <h2 className="text-black">{data.displayName}</h2> */}
    {/* <Chat/> */}
    
    </>
  );
};

export default Home;
