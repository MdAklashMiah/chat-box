import { useNavigate } from "react-router";
import Userlist from "./Userlist";
import { useSelector } from "react-redux";
import { useEffect } from "react";


const Home = () => {
  const navigate = useNavigate();
  return (
    <>
    <Userlist/>
    
    </>
  );
};

export default Home;
