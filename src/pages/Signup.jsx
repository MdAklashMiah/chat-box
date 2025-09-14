import React, { useState } from "react";
import { Link } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import Login from "./Login";
import { getDatabase, ref, set } from "firebase/database";

import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router";

const Signup = () => {
  const db = getDatabase();
  const [passVisibility, setPassVisibility] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleUsername = (e) => {
    setUserInfo((prev) => {
      return { ...prev, name: e.target.value };
    });
  };

  const handleEmail = (e) => {
    setUserInfo((prev) => {
      return { ...prev, email: e.target.value };
    });
  };
  const handlePassword = (e) => {
    setUserInfo((prev) => {
      return { ...prev, password: e.target.value };
    });
  };
  const handleConfirmPassword = (e) => {
    setUserInfo((prev) => {
      return { ...prev, cpassword: e.target.value };
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (
      !userInfo.name ||
      !userInfo.email ||
      !userInfo.password ||
      !userInfo.cpassword
    ) {
      toast.error("All fields are required!");
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userInfo.email)
    ) {
      toast.error("invalid Email Address");
    } else if (userInfo.password !== userInfo.cpassword) {
      toast.error(
        "Passwords don't match! Please ensure both fields contain the same password"
      );
    } else {
      createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
        .then((userCredential) => {
          sendEmailVerification(auth.currentUser).then(() => {
            updateProfile(auth.currentUser, {
              displayName: userInfo.name,
              photoURL: "https://example.com/jane-q-user/profile.jpg",
            })
              .then(() => {
                const user = userCredential.user;
                // ...
                toast.success("Sign UP Successfully");
                setUserInfo({
                  name: "",
                  email: "",
                  password: "",
                  cpassword: "",
                });
                console.log(user);
                set(ref(db, "userslist/" + user.uid), {
                  name: user.displayName,
                  email: user.email,
                }).then(() => {
                  navigate("/login");
                }).catch((error) =>{
                  console.log(error)
                })
              })
              .catch((error) => {
                console.log(error);
              });
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..

          if (errorCode.includes("auth/email-already-in-use")) {
            toast.error("This Email Already Used");
          }

          console.log(errorCode);
        });
    }
  };

  const handleShowPassword = () => {
    setPassVisibility(!passVisibility);
  };

  return (
    <div className="flex flex-col justify-center bg-[#1D3557] sm:h-screen p-4">
      <Toaster />
      <div className="max-w-lg w-full mx-auto bg-[#457B9D] border border-slate-300 rounded-2xl p-8">
        <div className="text-center mb-12">
          <h2 className="font-bold text-3xl text-[#F1FAEE]">
            Create Your Account
          </h2>
        </div>
        <form onSubmit={handleSignup}>
          <div className="space-y-2">
            <div>
              <label className="text-[#F1FAEE] text-sm font-medium mb-2 block">
                User Name
              </label>
              <input
                value={userInfo.name}
                onChange={handleUsername}
                name="User"
                type="text"
                className="p-3 rounded-xl bg-[#ffffff] text-black border border-[#1D3557] w-full placeholder-[#1D3557]"
                placeholder="Enter Your User Name"
              />
            </div>
            <div>
              <label className="text-[#F1FAEE] text-sm font-medium mb-2 block">
                Email Id
              </label>
              <input
                value={userInfo.email}
                onChange={handleEmail}
                name="email"
                type="email"
                className="p-3 rounded-xl bg-[#ffffff] text-black border border-[#1D3557] w-full placeholder-[#1D3557]"
                placeholder="Enter email"
              />
            </div>
            <div className="relative">
              <label className="text-[#F1FAEE] text-sm font-medium mb-2 block">
                Password
              </label>
              <div className="relative">
                <input
                  value={userInfo.password}
                  onChange={handlePassword}
                  name="password"
                  type={passVisibility ? "text" : "password"}
                  className="p-3 rounded-xl bg-[#ffffff] text-black border border-[#1D3557] w-full placeholder-[#1D3557]"
                  placeholder="Enter password"
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
              </div>
            </div>
            <div className="relative">
              <label className="text-[#F1FAEE] text-sm font-medium mb-2 block">
                Confirm Password
              </label>

              <div className="relative">
                <input
                  value={userInfo.cpassword}
                  onChange={handleConfirmPassword}
                  name="cpassword"
                  type={passVisibility ? "text" : "password"}
                  className="p-3 rounded-xl bg-[#ffffff] text-black border border-[#1D3557] w-full placeholder-[#1D3557]"
                  placeholder="Enter confirm password"
                />
              </div>
            </div>
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="text-white ml-3 block text-sm"
              >
                I accept the{" "}
                <a
                  href="javascript:void(0);"
                  className="text-[#1D3557] font-medium hover:underline ml-1"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-[#1D3557] border  hover:bg-[#ffffff] hover:text-[#1D3557] focus:outline-none cursor-pointer"
            >
              Sign Up
            </button>
          </div>
          <p className="text-[#1D3557] text-sm font-medium mt-6 text-center flex justify-between items-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="register text-white bg-[#1D3557] border rounded-xl py-3 px-5 hover:bg-[#ffffff] hover:text-[#1D3557] font-semibold duration-300"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
