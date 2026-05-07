import React, { useState } from "react";
import { Link, useNavigate } from "react-router"; // v7.6.0 এ ঠিক আছে
import toast, { Toaster } from "react-hot-toast";
import { getDatabase, ref, set } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";

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

  const handleSignup = (e) => {
    e.preventDefault();
    if (!userInfo.name || !userInfo.email || !userInfo.password || !userInfo.cpassword) {
      toast.error("All fields are required!");
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userInfo.email)) {
      toast.error("Invalid Email Address");
    } else if (userInfo.password !== userInfo.cpassword) {
      toast.error("Passwords don't match!");
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
                toast.success("Sign Up Successfully");
                setUserInfo({ name: "", email: "", password: "", cpassword: "" });

                set(ref(db, "userslist/" + user.uid), {
                  name: user.displayName,
                  email: user.email,
                })
                  .then(() => navigate("/login"))
                  .catch((error) => console.log(error));
              })
              .catch((error) => console.log(error));
          });
        })
        .catch((error) => {
          if (error.code.includes("auth/email-already-in-use")) {
            toast.error("This Email Already Used");
          }
          console.log(error.code);
        });
    }
  };

  return (
    <div className="flex flex-col justify-center bg-[#0B0F19] min-h-screen p-4 sm:p-6 relative overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-lg mx-auto bg-[#161B22]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10">
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
            Create Account
          </h2>
          <p className="text-slate-400 mt-2 text-sm">
            Join Chatbuzzz and connect with friends
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          {/* Username */}
          <div>
            <label className="text-slate-300 text-sm font-medium mb-1.5 block">
              Full Name
            </label>
            <input
              value={userInfo.name}
              onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
              type="text"
              className="p-3.5 rounded-xl text-white bg-[#0B0F19]/50 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-full outline-none transition-all placeholder:text-slate-500"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-slate-300 text-sm font-medium mb-1.5 block">
              Email Address
            </label>
            <input
              value={userInfo.email}
              onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
              type="email"
              className="p-3.5 rounded-xl text-white bg-[#0B0F19]/50 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-full outline-none transition-all placeholder:text-slate-500"
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-slate-300 text-sm font-medium mb-1.5 block">
              Password
            </label>
            <div className="relative group">
              <input
                value={userInfo.password}
                onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                type={passVisibility ? "text" : "password"}
                className="p-3.5 rounded-xl text-white bg-[#0B0F19]/50 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-full outline-none transition-all placeholder:text-slate-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setPassVisibility(!passVisibility)}
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

          {/* Confirm Password */}
          <div>
            <label className="text-slate-300 text-sm font-medium mb-1.5 block">
              Confirm Password
            </label>
            <input
              value={userInfo.cpassword}
              onChange={(e) => setUserInfo({ ...userInfo, cpassword: e.target.value })}
              type={passVisibility ? "text" : "password"}
              className="p-3.5 rounded-xl text-white bg-[#0B0F19]/50 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-full outline-none transition-all placeholder:text-slate-500"
              placeholder="••••••••"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full mt-2 bg-indigo-600 text-white py-3.5 rounded-xl hover:bg-indigo-500 transition-colors font-semibold shadow-lg shadow-indigo-600/20 active:scale-[0.98]"
          >
            Create Account
          </button>

          {/* Link */}
          <div className="text-center text-sm mt-6 text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors ml-1"
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
