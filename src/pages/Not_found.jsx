import React from 'react'
import { Link } from 'react-router'

const Not_found = () => {
  return (
    <>
  {/* component */}
  <main className="h-screen w-full flex flex-col justify-center items-center bg-[#D4C9BE]">
    <h1 className="text-9xl font-extrabold text-[#002D74] tracking-widest">404</h1>
    <div className="bg-[#002D74] text-white px-2 text-sm rounded rotate-12 absolute">
      Page Not Found
    </div>
    <button className="mt-5">
      <a className="relative inline-block text-sm font-medium text-[#002D74] group focus:ring">
        <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#002D74] group-hover:translate-y-0 group-hover:translate-x-0" />
        <span className="relative block px-8 py-3 bg-[#F1EFEC] border border-current">
          <Link to="/">Go Home</Link>
        </span>
      </a>
    </button>
  </main>
</>

  )
}

export default Not_found