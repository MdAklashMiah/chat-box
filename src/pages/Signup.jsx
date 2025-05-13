import React from "react";
import { Link } from "react-router";
import Login from "./Login";

const Signup = () => {
  return (
    <div className="flex flex-col justify-center bg-[#002D74] sm:h-screen p-4">
      <div className="max-w-lg w-full mx-auto bg-[#dfa674] border border-slate-300 rounded-2xl p-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl">Create Your Account</h1>
        </div>
        <form>
          <div className="space-y-2">
            <div>
              <label className="text-slate-800 text-sm font-medium mb-2 block">
                Email Id
              </label>
              <input
                name="email"
                type="text"
                className="p-3 rounded-xl border w-full"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="text-slate-800 text-sm font-medium mb-2 block">
                User Name
              </label>
              <input
                name="User"
                type="text"
                className="p-3 rounded-xl border w-full"
                placeholder="Enter Your User Name"
              />
            </div>
            <div>
              <label className="text-slate-800 text-sm font-medium mb-2 block">
                Password
              </label>
              <input
                name="password"
                type="password"
                className="p-3 rounded-xl border w-full"
                placeholder="Enter password"
              />
            </div>
            <div>
              <label className="text-slate-800 text-sm font-medium mb-2 block">
                Confirm Password
              </label>
              <input
                name="cpassword"
                type="password"
                className="p-3 rounded-xl border w-full"
                placeholder="Enter confirm password"
              />
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
                className="text-slate-800 ml-3 block text-sm"
              >
                I accept the{" "}
                <a
                  href="javascript:void(0);"
                  className="text-[#002D74] font-medium hover:underline ml-1"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>
          <div className="mt-4">
            <button
              type="button"
              className="w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-[#002D74] hover:bg-[#206ab1] focus:outline-none cursor-pointer"
            >
              Create an account
            </button>
          </div>
          <p className="text-slate-800 text-sm font-medium mt-6 text-center flex justify-between items-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="hover:border register text-white bg-[#002D74] hover:border-gray-400 rounded-xl py-3 px-5 hover:scale-110 hover:bg-[#002c7424] font-semibold duration-300"
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
