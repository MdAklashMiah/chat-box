import { useNavigate } from "react-router";
import Userlist from "./Userlist";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import FriendRequest from "../components/FriendRequest";
import FriendList from "../components/FriendsList";
import BlockList from "../components/BlockList";
import Chat from "../pages/Chat"
import Navbar from "../components/Navbar";


const Home = () => {
  const navigate = useNavigate();
  return (
    <>
   <FriendRequest/>
    </>
  );
};

export default Home;
