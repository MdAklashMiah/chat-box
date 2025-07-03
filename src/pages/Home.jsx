import { useNavigate } from "react-router";
import Userlist from "./Userlist";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import FriendRequest from "../components/FriendRequest";


const Home = () => {
  const navigate = useNavigate();
  return (
    <>
    <Userlist/>
    <FriendRequest/>
    </>
  );
};

export default Home;
