import { useNavigate } from "react-router";
import Userlist from "./Userlist";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import FriendRequest from "../components/FriendRequest";
import FriendList from "../components/FriendsList";
import BlockList from "../components/BlockList";


const Home = () => {
  const navigate = useNavigate();
  return (
    <>
    <Userlist/>
    <FriendRequest/>
    <FriendList/>
    <BlockList/>
    </>
  );
};

export default Home;
