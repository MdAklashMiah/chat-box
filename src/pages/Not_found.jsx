import React from 'react'
import { Link } from 'react-router'

const Not_found = () => {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-[#0B0F19] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 text-center flex flex-col items-center">
        <h1 className="text-[150px] font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-purple-600 tracking-widest leading-none drop-shadow-2xl">
          404
        </h1>
        <div className="bg-[#161B22] border border-white/10 text-slate-300 px-4 py-1.5 text-sm rounded-lg shadow-xl uppercase tracking-widest font-semibold mt-[-20px] mb-8">
          Page Not Found
        </div>
        
        <p className="text-slate-400 mb-8 max-w-sm">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="relative inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold text-white bg-indigo-600 rounded-xl overflow-hidden group hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
        >
          <span className="relative flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            Go Home
          </span>
        </Link>
      </div>
    </main>
  );
}

export default Not_found