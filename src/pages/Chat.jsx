import React from "react";
import { LuSendHorizontal } from "react-icons/lu";
import { MdAttachment } from "react-icons/md";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { IoCallOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

const Chat = () => {
  return (
    <div className="w-full grid grid-cols-4 bg-[#D4C9BE] rounded-xl shadow pl-5 overflow-hidden">
      <div className="w-full bg-[#F1EFEC] col-span-1 p-5 rounded-lg overflow-auto h-screen">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Chat</h2>
          <button className="text-gray-400 hover:text-gray-600">•••</button>
        </div>
        {/* Search Bar */}
        <div className="relative mb-5">
          <input
            type="text"
            placeholder="Search.."
            className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-100 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1016.65 2.5a7.5 7.5 0 000 15z"
            />
          </svg>
        </div>
        {/* Message Items */}
        <div className="space-y-4 overflow-auto pr-2.5">
          {/* Message Item */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/40?img=1"
                  className="w-10 h-10 rounded-full"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Danish Hebo</h4>
                <p className="text-xs text-gray-500">
                  Hello devid, how are you today?
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Dec, 8</p>
              <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-medium ml-auto block w-fit">
                5
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/40?img=2"
                  className="w-10 h-10 rounded-full"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Mariya Desoja</h4>
                <p className="text-xs text-gray-500">How are you today?</p>
              </div>
            </div>
            <div className="text-xs text-gray-400">Dec, 8</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/40?img=3"
                  className="w-10 h-10 rounded-full"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Jenny Wilson</h4>
                <p className="text-xs text-gray-500">
                  I'm waiting for you response!
                </p>
              </div>
            </div>
            <div className="text-xs text-gray-400">Dec, 8</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/40?img=4"
                  className="w-10 h-10 rounded-full"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Henry Fisher</h4>
                <p className="text-xs text-gray-500">
                  What do you think about it?
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Dec, 8</p>
              <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-medium ml-auto block w-fit">
                2
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/40?img=1"
                  className="w-10 h-10 rounded-full"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Danish Hebo</h4>
                <p className="text-xs text-gray-500">
                  Hello devid, how are you today?
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Dec, 8</p>
              <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-medium ml-auto block w-fit">
                5
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/40?img=2"
                  className="w-10 h-10 rounded-full"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Mariya Desoja</h4>
                <p className="text-xs text-gray-500">How are you today?</p>
              </div>
            </div>
            <div className="text-xs text-gray-400">Dec, 8</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/40?img=3"
                  className="w-10 h-10 rounded-full"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Jenny Wilson</h4>
                <p className="text-xs text-gray-500">
                  I'm waiting for you response!
                </p>
              </div>
            </div>
            <div className="text-xs text-gray-400">Dec, 8</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/40?img=4"
                  className="w-10 h-10 rounded-full"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Henry Fisher</h4>
                <p className="text-xs text-gray-500">
                  What do you think about it?
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Dec, 8</p>
              <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-medium ml-auto block w-fit">
                2
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/40?img=1"
                  className="w-10 h-10 rounded-full"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Danish Hebo</h4>
                <p className="text-xs text-gray-500">
                  Hello devid, how are you today?
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Dec, 8</p>
              <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-medium ml-auto block w-fit">
                5
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/40?img=2"
                  className="w-10 h-10 rounded-full"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Mariya Desoja</h4>
                <p className="text-xs text-gray-500">How are you today?</p>
              </div>
            </div>
            <div className="text-xs text-gray-400">Dec, 8</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/40?img=3"
                  className="w-10 h-10 rounded-full"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Jenny Wilson</h4>
                <p className="text-xs text-gray-500">
                  I'm waiting for you response!
                </p>
              </div>
            </div>
            <div className="text-xs text-gray-400">Dec, 8</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/40?img=4"
                  className="w-10 h-10 rounded-full"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Henry Fisher</h4>
                <p className="text-xs text-gray-500">
                  What do you think about it?
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Dec, 8</p>
              <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-medium ml-auto block w-fit">
                2
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/40?img=1"
                  className="w-10 h-10 rounded-full"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Danish Hebo</h4>
                <p className="text-xs text-gray-500">
                  Hello devid, how are you today?
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Dec, 8</p>
              <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-medium ml-auto block w-fit">
                5
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/40?img=2"
                  className="w-10 h-10 rounded-full"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Mariya Desoja</h4>
                <p className="text-xs text-gray-500">How are you today?</p>
              </div>
            </div>
            <div className="text-xs text-gray-400">Dec, 8</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/40?img=3"
                  className="w-10 h-10 rounded-full"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Jenny Wilson</h4>
                <p className="text-xs text-gray-500">
                  I'm waiting for you response!
                </p>
              </div>
            </div>
            <div className="text-xs text-gray-400">Dec, 8</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/40?img=4"
                  className="w-10 h-10 rounded-full"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Henry Fisher</h4>
                <p className="text-xs text-gray-500">
                  What do you think about it?
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Dec, 8</p>
              <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-medium ml-auto block w-fit">
                2
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/40?img=1"
                  className="w-10 h-10 rounded-full"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Danish Hebo</h4>
                <p className="text-xs text-gray-500">
                  Hello devid, how are you today?
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Dec, 8</p>
              <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-medium ml-auto block w-fit">
                5
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/40?img=2"
                  className="w-10 h-10 rounded-full"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Mariya Desoja</h4>
                <p className="text-xs text-gray-500">How are you today?</p>
              </div>
            </div>
            <div className="text-xs text-gray-400">Dec, 8</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/40?img=3"
                  className="w-10 h-10 rounded-full"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Jenny Wilson</h4>
                <p className="text-xs text-gray-500">
                  I'm waiting for you response!
                </p>
              </div>
            </div>
            <div className="text-xs text-gray-400">Dec, 8</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/40?img=4"
                  className="w-10 h-10 rounded-full"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Henry Fisher</h4>
                <p className="text-xs text-gray-500">
                  What do you think about it?
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Dec, 8</p>
              <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-medium ml-auto block w-fit">
                2
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/40?img=1"
                  className="w-10 h-10 rounded-full"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Danish Hebo</h4>
                <p className="text-xs text-gray-500">
                  Hello devid, how are you today?
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Dec, 8</p>
              <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-medium ml-auto block w-fit">
                5
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/40?img=2"
                  className="w-10 h-10 rounded-full"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Mariya Desoja</h4>
                <p className="text-xs text-gray-500">How are you today?</p>
              </div>
            </div>
            <div className="text-xs text-gray-400">Dec, 8</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/40?img=3"
                  className="w-10 h-10 rounded-full"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Jenny Wilson</h4>
                <p className="text-xs text-gray-500">
                  I'm waiting for you response!
                </p>
              </div>
            </div>
            <div className="text-xs text-gray-400">Dec, 8</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/40?img=4"
                  className="w-10 h-10 rounded-full"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Henry Fisher</h4>
                <p className="text-xs text-gray-500">
                  What do you think about it?
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Dec, 8</p>
              <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-medium ml-auto block w-fit">
                2
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full col-span-3 bg-[#F1EFEC] relative rounded-lg h-screen overflow-y-scroll">
        <div className="w-full py-5 flex items-center justify-between px-10 bg-[#D4C9BE] sticky top-0 left-0 z-10">
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
        <div className="w-full py-5 flex items-center px-5 bg-[#D4C9BE] sticky bottom-0 left-0 ">
          <label htmlFor="file-upload" className="absolute left-10 text-4xl">
            <MdAttachment />
          </label>
          <input type="file" id="file-upload" className="hidden" />
          <input type="text" className="bg-amber-50 p-4 pl-20 w-full h-full" />
          <LuSendHorizontal className="text-4xl absolute right-10" />
        </div>
      </div>
    </div>
  );
};

export default Chat;
