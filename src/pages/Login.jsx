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
    <section className="bg-[#0B0F19] min-h-screen flex justify-center items-center px-4 relative overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-[#161B22]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10">
        <Toaster
          toastOptions={{
            style: {
              background: "#1E293B",
              color: "#F8FAFC",
              border: "1px solid rgba(255,255,255,0.1)",
            },
          }}
        />
        
        <div className="text-center mb-8">
          <h2 className="font-extrabold text-3xl text-white tracking-tight">
            Welcome back
          </h2>
          <p className="text-slate-400 mt-2 text-sm">
            Sign in to continue to Chatbuzzz
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="text-slate-300 text-sm font-medium mb-1.5 block">
              Email Address
            </label>
            <input
              onChange={handleEmail}
              value={loginInfo.email}
              name="email"
              type="email"
              className="p-3.5 rounded-xl text-white bg-[#0B0F19]/50 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-full outline-none transition-all placeholder:text-slate-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-slate-300 text-sm font-medium mb-1.5 block">
              Password
            </label>
            <div className="relative group">
              <input
                onChange={handlePassword}
                value={loginInfo.password}
                className="p-3.5 rounded-xl text-white bg-[#0B0F19]/50 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-full outline-none transition-all placeholder:text-slate-500"
                type={passVisibility ? "text" : "password"}
                name="password"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={handleShowPassword}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
              >
                {passVisibility ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.359 11.238L15 12.879l-1.414 1.414-1.641-1.641A9.97 9.97 0 0 1 8 13.5C3 13.5 0 8 0 8s.8-1.55 2.138-3.048L.5 3.414 1.914 2l1.378 1.378A9.96 9.96 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.622 1.206-1.641 2.738zM12.062 9.94c.82-1.077 1.438-2.028 1.438-2.028S11.5 4.5 8 4.5c-.81 0-1.57.17-2.261.472l1.62 1.62A3.5 3.5 0 0 1 10.908 10.1l1.154 1.154zM4.148 5.562a8.04 8.04 0 0 0-1.848 2.348S4 11.5 8 11.5c.805 0 1.56-.168 2.25-.468l-1.58-1.58A3.5 3.5 0 0 1 5.148 6.562L4.148 5.562z"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
          <button
            className="mt-2 bg-indigo-600 text-white py-3.5 rounded-xl hover:bg-indigo-500 transition-colors font-semibold shadow-lg shadow-indigo-600/20 active:scale-[0.98]"
            type="submit"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 flex items-center justify-center gap-3 text-slate-500">
          <div className="h-px bg-white/10 flex-1" />
          <span className="text-xs font-medium uppercase tracking-wider">Or continue with</span>
          <div className="h-px bg-white/10 flex-1" />
        </div>

        <button
          onClick={handleLoginWithGoogle}
          className="bg-white/5 border border-white/10 py-3.5 w-full rounded-xl mt-6 flex justify-center items-center text-sm hover:bg-white/10 transition-colors font-medium text-white group"
        >
          <svg className="mr-3 transition-transform group-hover:scale-110" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
          </svg>
          Google
        </button>

        <div className="mt-8 text-sm text-slate-400 text-center">
          Don't have an account?{" "}
          <Link
            to={"/signup"}
            className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
          >
            Create account
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
