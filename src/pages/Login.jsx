import React, { useState } from "react";
import { Link } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { userLoginInfo } from "../slices/UserSlice";
import { getDatabase, ref, set } from "firebase/database";

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
    setLoginInfo((prev) => {
      return { ...prev, email: e.target.value };
    });
  };
  const handlePassword = (e) => {
    setLoginInfo((prev) => {
      return { ...prev, password: e.target.value };
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginInfo.email || !loginInfo.password) {
      toast.error("all fields are requered");
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(loginInfo.email)
    ) {
      toast.error("invalid Email Address");
    } else {
      signInWithEmailAndPassword(auth, loginInfo.email, loginInfo.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // console.log(user)
          if (user.emailVerified) {
            dispatch(userLoginInfo(user));
            navigate("/");
          } else {
            toast.error("Please Verify Your Email");
          }
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          if (errorCode.includes("auth/invalid-credential")) {
            toast.error("Invalid Email or Password");
          }
        });
      console.log("Login Submited", loginInfo);
    }
  };

  const handleShowPassword = () => {
    setPassVisibility(!passVisibility);
  };

  const handleLoginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        set(ref(db, "userslist/" + user.uid), {
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
        // Handle Errors here.
        const errorCode = error.code;
        console.log(errorCode);
      });
  };

  return (
    <section className="bg-linear-to-t from-[#1D3557] to-[#2d3748] min-h-screen flex box-border justify-center items-center">
      <div className="max-w-lg w-full mx-auto bg-[#2d3748] border border-slate-300 rounded-2xl p-8">
        <Toaster />
        <div className=" ">
          <h2 className="font-bold text-3xl text-[#F1FAEE]">Login</h2>
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
                className="p-3 rounded-xl text-white border border-[#39455a] placeholder-gray-500 w-full"
                placeholder="Email"
              />
            </div>
            <div className="relative">
              <label className="text-[#F1FAEE] text-sm font-medium mb-2 block">
                Password
              </label>
              <div className="relative">
                <input
                  onChange={handlePassword}
                  value={loginInfo.password}
                  className="p-3 rounded-xl text-white border border-[#39455a] w-full placeholder-gray-500"
                  type={passVisibility ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                />
                <svg
                  onClick={handleShowPassword}
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="#39455a"
                  id="togglePassword"
                  className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer z-20 opacity-100"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"></path>
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"></path>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  className="bi bi-eye-slash-fill absolute top-1/2 right-3 -z-1 -translate-y-1/2 cursor-pointer hidden"
                  id="mama"
                  viewBox="0 0 16 16"
                >
                  <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"></path>
                  <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"></path>
                </svg>
              </div>
            </div>
            <button
              className="bg-[#206ab1] text-white py-3 rounded-xl hover:scale-105 duration-300 hover:bg-[#457B9D] font-medium"
              type="submit"
            >
              Login
            </button>
          </form>
          <div className="mt-6  items-center text-gray-100">
            <hr className="border-[#206ab1]" />
            <p className="text-[#206ab1] text-center font-semibold text-sm my-1">
              OR
            </p>
            <hr className="border-[#206ab1]" />
          </div>
          <button
            onClick={handleLoginWithGoogle}
            className="bg-white border py-3 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-[#60a8bc4f] font-medium cursor-pointer"
          >
            <svg
              className="mr-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="25px"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
            Login with Google
          </button>
          <div className="mt-10 text-sm text-[#F1FAEE] border-b border-gray-500 py-5 playfair tooltip">
            Forget password?
          </div>
          <div className="mt-4 text-sm text-[#F1FAEE]  flex justify-between items-center container-mr">
            <p className="mr-3 md:mr-0 ">If you don't have an account..</p>
            <Link
              to={"/signup"}
              className="hover:border register text-white bg-[#206ab1] hover:border-gray-400 rounded-xl py-3 px-5 hover:scale-110 hover:bg-[#002c7424] font-semibold duration-300"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
