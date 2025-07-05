import React from "react";
import { LuSendHorizontal } from "react-icons/lu";
import { MdAttachment } from "react-icons/md";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { IoCallOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import ChatList from "../components/ChatList";

const Chat = () => {
  return (
    <div className="w-full relative grid grid-cols-4 bg-[#2d3748] rounded-xl shadow  overflow-hidden">
      
      <ChatList/>
      <div className="w-full col-span-3 bg-[#262e3b] relative rounded-lg h-screen overflow-y-scroll">
        <div className="w-full py-5 flex items-center justify-between px-10 bg-[#2d3748] border-b-2 border-[#39455a] sticky top-0 left-0 z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
                <img
                  src="https://i.pravatar.cc/40?img=1"
                  className="w-10 h-10 rounded-full"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Danish Hebo</h4>
              </div>
          </div>
          <div className="flex gap-5 text-2xl bg-[#F1EFEC] p-2 rounded-sm">
            <HiOutlineVideoCamera />
            <IoCallOutline />
          </div>
        </div>
        <div className="p-5 min-h-full">
          <div className="flex flex-col h-full">
              <div className="grid grid-cols-12 gap-y-2">
                <div className="col-start-1 col-end-8 p-3 rounded-lg">
                  <div className="flex flex-row items-center">
                    <div className="text-4xl">
                      <CgProfile />
                    </div>
                    <div className="relative ml-3 text-sm bg-[#D4C9BE] py-2 px-4 shadow rounded-xl">
                      <div>Hey!  How Are You?</div>
                    </div>
                  </div>
                </div>
                <div className="col-start-1 col-end-8 p-3 rounded-lg">
                  <div className="flex flex-row items-center">
                    <div className="text-4xl">
                      <CgProfile />
                    </div>
                    <div className="relative ml-3 text-sm bg-[#D4C9BE] py-2 px-4 shadow rounded-xl">
                      <div>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Vel ipsa commodi illum saepe numquam maxime
                        asperiores voluptate sit, minima perspiciatis.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-start-6 col-end-13 p-3 rounded-lg">
                  <div className="flex items-center justify-start flex-row-reverse">
                    <div className="text-4xl">
                      <CgProfile />
                    </div>
                    <div className="relative mr-3 text-sm bg-[#D4C9BE] py-2 px-4 shadow rounded-xl">
                      <div>I'm ok what about you?</div>
                    </div>
                  </div>
                </div>
                <div className="col-start-6 col-end-13 p-3 rounded-lg">
                  <div className="flex items-center justify-start flex-row-reverse">
                    <div className="text-4xl">
                      <CgProfile />
                    </div>
                    <div className="relative mr-3 text-sm bg-[#D4C9BE] py-2 px-4 shadow rounded-xl">
                      <div>
                        Lorem ipsum dolor sit, amet consectetur adipisicing. ?
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-start-1 col-end-8 p-3 rounded-lg">
                  <div className="flex flex-row items-center">
                    <div className="text-4xl">
                      <CgProfile />
                    </div>
                    <div className="relative ml-3 text-sm bg-[#D4C9BE] py-2 px-4 shadow rounded-xl">
                      <div>Lorem ipsum dolor sit amet !</div>
                    </div>
                  </div>
                </div>
                <div className="col-start-6 col-end-13 p-3 rounded-lg">
                  <div className="flex items-center justify-start flex-row-reverse">
                    <div className="text-4xl">
                      <CgProfile />
                    </div>
                    <div className="relative mr-3 text-sm bg-[#D4C9BE] py-2 px-4 shadow rounded-xl">
                      <div>
                        Lorem ipsum dolor sit, amet consectetur adipisicing. ?
                      </div>
                      <div className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">
                        Seen
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-start-1 col-end-8 p-3 rounded-lg">
                  <div className="flex flex-row items-center">
                    <div className="text-4xl">
                      <CgProfile />
                    </div>
                    <div className="relative ml-3 text-sm bg-[#D4C9BE] py-2 px-4 shadow rounded-xl">
                      <div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Perspiciatis, in.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-start-1 col-end-8 p-3 rounded-lg">
                  <div className="flex flex-row items-center">
                    <div className="text-4xl">
                      <CgProfile />
                    </div>
                    <div className="relative ml-3 text-sm bg-[#D4C9BE] py-2 px-4 shadow rounded-xl">
                      <div className="flex flex-row items-center">
                        <button className="flex items-center justify-center bg-gray-500 hover:bg-indigo-800 rounded-full h-8 w-10">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </button>
                        <div className="flex flex-row items-center space-x-px ml-4">
                          <div className="h-2 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-2 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-4 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-8 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-8 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-10 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-10 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-12 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-10 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-6 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-5 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-4 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-3 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-2 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-2 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-2 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-10 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-2 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-10 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-8 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-8 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-1 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-1 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-2 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-8 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-8 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-2 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-2 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-2 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-2 w-1 bg-gray-500 rounded-lg" />
                          <div className="h-4 w-1 bg-gray-500 rounded-lg" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div className="w-full py-5 flex items-center px-5 bg-[#2d3748] border-t-2 border-[#39455a] sticky bottom-0 left-0 ">
          <label htmlFor="file-upload" className="absolute left-10 text-4xl">
            <MdAttachment />
          </label>
          {/* <input type="file" id="file-upload" className="hidden" /> */}
          <input type="text" placeholder="Enter Your Text" className="bg-[#262e3b] text-white p-4 pl-20 w-full h-full rounded-lg border-1 border-[#39455a]" />
          <LuSendHorizontal className="text-4xl absolute right-10 text-green-700" />
        </div>
      </div>
    </div>
  );
};

export default Chat;
