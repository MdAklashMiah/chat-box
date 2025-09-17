import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { userLoginInfo } from "../slices/UserSlice";
import { getDatabase, ref, update } from "firebase/database";

const Login = () => {
  const db = getDatabase();
  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  const [passVisibility, setPassVisibility] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleEmail = (e) => {
    setLoginInfo((prev) => ({ ...prev, email: e.target.value.trim() }));
  };
  const handlePassword = (e) => {
    setLoginInfo((prev) => ({ ...prev, password: e.target.value.trim() }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginInfo.email || !loginInfo.password) {
      toast.error("All fields are required");
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(loginInfo.email)
    ) {
      toast.error("Invalid Email Address");
    } else {
      signInWithEmailAndPassword(auth, loginInfo.email, loginInfo.password)
        .then((userCredential) => {
          const user = userCredential.user;
          if (user.emailVerified) {
            dispatch(userLoginInfo(user));
            navigate("/");
          } else {
            toast.error("Please Verify Your Email");
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === "auth/user-not-found") {
            toast.error("User not found");
          } else if (errorCode === "auth/wrong-password") {
            toast.error("Incorrect password");
          } else if (errorCode === "auth/too-many-requests") {
            toast.error("Too many attempts. Try again later.");
          } else {
            toast.error("Invalid Email or Password");
          }
        });
    }
  };

  const handleShowPassword = () => {
    setPassVisibility(!passVisibility);
  };

  const handleLoginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        update(ref(db, "userslist/" + user.uid), {
          name: user.displayName,
          email: user.email,
        })
          .then(() => {
            dispatch(userLoginInfo(user));
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error.code);
      });
  };

  return (
    <section className="bg-[#1D3557] min-h-screen flex justify-center items-center px-4">
      <div className="w-full max-w-lg bg-[#457B9D] border border-slate-300 rounded-2xl p-6 sm:p-8">
        <Toaster />
        <h2 className="font-bold text-2xl sm:text-3xl text-[#F1FAEE] text-center">
          Login
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4 mt-8">
          <div>
            <label className="text-[#F1FAEE] text-sm font-medium mb-2 block">
              Email
            </label>
            <input
              onChange={handleEmail}
              value={loginInfo.email}
              name="email"
              type="email"
              className="p-3 rounded-xl text-black border border-[#1D3557] bg-white placeholder-[#1D3557] w-full"
              placeholder="Email"
            />
          </div>
          <div>
            <label className="text-[#F1FAEE] text-sm font-medium mb-2 block">
              Password
            </label>
            <div className="relative">
              <input
                onChange={handlePassword}
                value={loginInfo.password}
                className="p-3 rounded-xl text-black border border-[#1D3557] bg-white w-full placeholder-[#1D3557]"
                type={passVisibility ? "text" : "password"}
                name="password"
                placeholder="Password"
              />
              {passVisibility ? (
                <svg
                  onClick={handleShowPassword}
                  xmlns="http://www.w3.org/2000/svg"
                  width={18}
                  height={18}
                  fill="#39455a"
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                  viewBox="0 0 16 16"
                >
                  <path d="m13.359 11.238-1.473-1.473..."></path>
                </svg>
              ) : (
                <svg
                  onClick={handleShowPassword}
                  xmlns="http://www.w3.org/2000/svg"
                  width={18}
                  height={18}
                  fill="#39455a"
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8s-3-5.5-8-5.5..."></path>
                </svg>
              )}
            </div>
          </div>
          <button
            className="bg-[#1D3557] border text-white py-3 rounded-xl duration-300 hover:bg-white hover:text-[#1D3557] font-medium"
            type="submit"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-gray-100">
          <div className="flex items-center gap-2">
            <hr className="flex-1 border-[#1D3557]" />
            <p className="text-[#1D3557] font-semibold text-sm">OR</p>
            <hr className="flex-1 border-[#1D3557]" />
          </div>
        </div>

        <button
          onClick={handleLoginWithGoogle}
          className="bg-white border py-3 w-full rounded-xl mt-5 flex justify-center items-center text-sm duration-300 hover:bg-[#1D3557] hover:text-white font-medium"
        >
          <svg className="mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="22px">
            <path fill="#FFC107" d="M43.611,20.083..."></path>
          </svg>
          Login with Google
        </button>

        <div className="mt-8 text-sm text-[#F1FAEE] flex justify-between items-center">
          <p>If you don't have an account..</p>
          <Link
            to={"/signup"}
            className="bg-[#1D3557] border rounded-xl py-2 px-4 sm:px-5 hover:bg-white hover:text-[#1D3557] font-semibold duration-300"
          >
            Register
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
