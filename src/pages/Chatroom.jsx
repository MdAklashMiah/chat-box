// import { useState } from "react";
// import { FiSearch, FiVideo, FiPhone, FiPlus, FiMoon, FiSun } from "react-icons/fi";
// import { BsThreeDotsVertical } from "react-icons/bs";

// const ChatApp = () => {
//   const [darkMode, setDarkMode] = useState(true);
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");

//   const mockUsers = [
//     {
//       id: 1,
//       name: "Moshiur Rashid",
//       avatar: "https://scontent.fdac24-2.fna.fbcdn.net/v/t39.30808-6/457209413_1217855355914939_8049005764013222975_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEErWBbTOP0HpnCGl8YPLolukWiZt2sBlC6RaJm3awGUOEpEcUueJiI81cQQONuIKjG3MgkGyPMe7TAb6nZpRyX&_nc_ohc=Zz_RetImljAQ7kNvwGsQC6q&_nc_oc=AdlDQImXZ5-qDtffkPBenRxhxuDVGBdkphB0mZ28QJGKIAryJelUOFl1DklagjqaLVQ&_nc_zt=23&_nc_ht=scontent.fdac24-2.fna&_nc_gid=LWCITDXCO5u43OsKlwj_nQ&oh=00_AfLOaBdLSuMpSyjMgKpDUsuuEcNzEzaReDq0LcZHdN6plQ&oe=6826E9B7",
//       status: "online",
//       lastMessage: "Hey, how are you doing?",
//       timestamp: "10:30 AM",
//       unread: 3
//     },
//     {
//       id: 2,
//       name: "Emran Khan",
//       avatar: "https://scontent.fdac24-4.fna.fbcdn.net/v/t39.30808-6/402913409_3656676561238783_926055351817214552_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGkDvw3K02muHhaECHqBoYdi3sBznGAjK2LewHOcYCMreOMkGNsqV4JAEdEcAWFkL7XkKaeTXx72AegABakzkX9&_nc_ohc=GSnk157zS48Q7kNvwHZnTTX&_nc_oc=AdlURZjkficpuA92RayZ_at_t4UksC4O_RtCruvP4tVMJahTsQqZyjOLcESQk7YKGGo&_nc_zt=23&_nc_ht=scontent.fdac24-4.fna&_nc_gid=JWTz9n99nLgH3DsMFJW-GQ&oh=00_AfKEmkCfBKdLO6rsaGYRb3wBAVADL57T9Wexbzik2JKWdA&oe=68291B75",
//       status: "offline",
//       lastMessage: "Let's catch up soon!",
//       timestamp: "Yesterday",
//       unread: 0
//     },
//     {
//       id: 3,
//       name: "Mahan Khan Shahir",
//       avatar: "https://scontent.fdac24-5.fna.fbcdn.net/v/t39.30808-6/496436538_4003654619888052_8990585409128278529_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeG8rJfmlcLuFdAxpjvqyrB2-pOyX62XrV_6k7JfrZetX4lVQsosV3WS1R4z1tU7RbAHuakbqA8O_-KVJVb25Sbq&_nc_ohc=B_UOgusbQsIQ7kNvwFjf9Ka&_nc_oc=AdmFTDq-YpdJNSJsdQqU6zNITvCtTWKPEvxVz2MsUvXke6907sIJv2DKKmSw6KdFaDQ&_nc_zt=23&_nc_ht=scontent.fdac24-5.fna&_nc_gid=5vqV_i9zCEUwSjGQ1MOH7w&oh=00_AfJwrv4OX_jb6JN7ZZmV3w0JcMbGDr5IkPKicr2ZJQknTg&oe=68291A7C",
//       status: "online",
//       lastMessage: "The meeting is scheduled for tomorrow",
//       timestamp: "2:45 PM",
//       unread: 1
//     }
//   ];

//   const filteredChats = mockUsers.filter(user =>
//     user.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className={`h-screen flex ${darkMode ? "dark bg-gray-900" : "bg-gray-50"}`}>
//       {/* Sidebar */}
//       <div className="w-1/4 border-r border-gray-200 dark:border-gray-700 p-4">
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center space-x-3">
//             <img
//               src="https://scontent.fdac24-4.fna.fbcdn.net/v/t39.30808-6/480727478_1875587433249546_4194754770573616106_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeF_q3jdcV2bouFGOj4r4UZrhckO0upGQ92FyQ7S6kZD3fXUCaUrqiLHaB85SZv36XzneCqIKtEtkNL6x8Ps5lbO&_nc_ohc=ZkmERD2zPH0Q7kNvwGP5Aor&_nc_oc=AdlRnpKkkS80P4s2jDrcMqWnKaFvq127H448a1w9z09cxjL0H6apxtQ-i5QmsZJBjfo&_nc_zt=23&_nc_ht=scontent.fdac24-4.fna&_nc_gid=PONio7YdpkPr3HZAfQG2BA&oh=00_AfL6GATTEyKtyQKCnVH8yYfkHLU2dNZnM2YySe8xBn5quw&oe=6826DA03"
//               alt="Your Profile"
//               className="w-10 h-10 rounded-full"
//             />
//             <div>
//               <h2 className="font-semibold dark:text-white">Aklasur Rahman</h2>
//               <p className="text-sm text-green-500">Active Now</p>
//             </div>
//           </div>
//           <button
//             onClick={() => setDarkMode(darkMode)}
//             className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
//           >
//             {darkMode ? (
//               <FiSun className="text-white" />
//             ) : (
//               <FiMoon className="text-gray-600" />
//             )}
//           </button>
//         </div>

//         <div className="relative mb-6">
//           <FiSearch className="absolute left-3 top-3 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search chats..."
//             className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>

//         <button className="w-full bg-blue-600 text-white py-2 rounded-lg mb-6 flex items-center justify-center space-x-2">
//           <FiPlus />
//           <span>New Chat</span>
//         </button>

//         <div className="space-y-4">
//           {filteredChats.map((user) => (
//             <div
//               key={user.id}
//               onClick={() => setSelectedChat(user)}
//               className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
//                 selectedChat?.id === user.id
//                   ? "bg-blue-50 dark:bg-gray-800"
//                   : "hover:bg-gray-100 dark:hover:bg-gray-800"
//               }`}
//             >
//               <div className="relative">
//                 <img
//                   src={user.avatar}
//                   alt={user.name}
//                   className="w-12 h-12 rounded-full"
//                 />
//                 <div
//                   className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
//                     user.status === "online" ? "bg-green-500" : "bg-gray-400"
//                   }`}
//                 />
//               </div>
//               <div className="flex-1">
//                 <h3 className="font-medium dark:text-white">{user.name}</h3>
//                 <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
//                   {user.lastMessage}
//                 </p>
//               </div>
//               <div className="text-right">
//                 <p className="text-xs text-gray-500 dark:text-gray-400">
//                   {user.timestamp}
//                 </p>
//                 {user.unread > 0 && (
//                   <span className="bg-blue-500 text-white rounded-full px-2 py-1 text-xs">
//                     {user.unread}
//                   </span>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Main Chat Area */}
//       <div className="flex-1 flex flex-col">
//         {selectedChat ? (
//           <>
//             <div className="border-b border-gray-200 dark:border-gray-700 p-4">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <img
//                     src={selectedChat.avatar}
//                     alt={selectedChat.name}
//                     className="w-10 h-10 rounded-full"
//                   />
//                   <div>
//                     <h2 className="font-semibold dark:text-white">
//                       {selectedChat.name}
//                     </h2>
//                     <p className="text-sm text-gray-500 dark:text-gray-400">
//                       {selectedChat.status === "online" ? "Active now" : "Offline"}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                   <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
//                     <FiPhone className="text-gray-600 dark:text-gray-400" />
//                   </button>
//                   <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
//                     <FiVideo className="text-gray-600 dark:text-gray-400" />
//                   </button>
//                   <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
//                     <BsThreeDotsVertical className="text-gray-600 dark:text-gray-400" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <div className="flex-1 p-4 bg-gray-50 dark:bg-gray-900 flex flex-col justify-between">
//               <div className="flex justify-center items-center h-full text-gray-500 dark:text-gray-400">
//                 <p>Start your conversation with {selectedChat.name}</p>
//               </div>
//               <div className="mt-4 border-t dark:border-gray-700 pt-4">
//                 <div className="flex items-center space-x-2">
//                   <input
//                     type="text"
//                     placeholder="Type your message..."
//                     className="flex-1 px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-blue-500 dark:text-white"
//                   />
//                   <button className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                       <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </>
//         ) : (
//           <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
//             <div className="text-center">
//               <h2 className="text-2xl font-semibold mb-2 dark:text-white">
//                 Welcome to ChatApp
//               </h2>
//               <p className="text-gray-500 dark:text-gray-400">
//                 Select a chat to start messaging
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatApp;

import React from 'react'

const Chatroom = () => {
  return (
    <>
  {/* component */}
  <div className="flex h-screen antialiased text-gray-800">
    <div className="flex flex-row h-full w-full overflow-x-hidden">
      <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-[#dfa674] flex-shrink-0">
        <div className="flex flex-row items-center justify-center h-12 w-full">
          <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>
          <div className="ml-2 font-bold text-2xl">Chat Box</div>
        </div>
        <div className="flex flex-col items-center text-[#dfa674] bg-[#002D74] border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
          <div className="h-20 w-20 rounded-full border overflow-hidden">
            <img
              src="https://scontent.fdac24-4.fna.fbcdn.net/v/t39.30808-6/480727478_1875587433249546_4194754770573616106_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeF_q3jdcV2bouFGOj4r4UZrhckO0upGQ92FyQ7S6kZD3fXUCaUrqiLHaB85SZv36XzneCqIKtEtkNL6x8Ps5lbO&_nc_ohc=ZkmERD2zPH0Q7kNvwGP5Aor&_nc_oc=AdlRnpKkkS80P4s2jDrcMqWnKaFvq127H448a1w9z09cxjL0H6apxtQ-i5QmsZJBjfo&_nc_zt=23&_nc_ht=scontent.fdac24-4.fna&_nc_gid=HenkQSyZs47sr5imdaCpyg&oh=00_AfIwDHn0EFoIVkJQKiabSb1VNT-tidQb1kFRKza_wyje3w&oe=68290C83"
              alt="Avatar"
              className="h-full w-full"
            />
          </div>
          <div className="text-sm font-semibold mt-2">Aklasur Rahman</div>
          <div className="text-xs text-gray-500">MERN Stack Developer</div>
          <div className="flex flex-row items-center mt-3">
            <div className="flex flex-col justify-center h-4 w-8 bg-indigo-500 rounded-full">
              <div className="h-3 w-3 bg-white rounded-full self-end mr-1" />
            </div>
            <div className="leading-none ml-1 text-xs">Active</div>
          </div>
        </div>
        <div className="flex flex-col mt-8">
          <div className="flex flex-row items-center justify-between text-xs">
            <span className="font-bold">Active Conversations</span>
            <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
              4
            </span>
          </div>
          <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
            <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
              <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                <img className='rounded-full' src="https://scontent.fdac24-2.fna.fbcdn.net/v/t39.30808-1/457209413_1217855355914939_8049005764013222975_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=111&ccb=1-7&_nc_sid=1d2534&_nc_eui2=AeEErWBbTOP0HpnCGl8YPLolukWiZt2sBlC6RaJm3awGUOEpEcUueJiI81cQQONuIKjG3MgkGyPMe7TAb6nZpRyX&_nc_ohc=Zz_RetImljAQ7kNvwGsQC6q&_nc_oc=AdlDQImXZ5-qDtffkPBenRxhxuDVGBdkphB0mZ28QJGKIAryJelUOFl1DklagjqaLVQ&_nc_zt=24&_nc_ht=scontent.fdac24-2.fna&_nc_gid=jT4nHQtpanl-Soys5GaoqA&oh=00_AfKhCT8p8fn_IlvrqWDwZ1b5U8992AC8CjkbXI3kLx6tgQ&oe=6828FE75" alt="images" />
              </div>
              <div className="ml-2 text-sm font-semibold">Moshiur Rashid</div>
            </button>
            <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
              <div className="flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full">
                <img className='rounded-full' src="https://scontent.fdac24-5.fna.fbcdn.net/v/t39.30808-6/496436538_4003654619888052_8990585409128278529_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeG8rJfmlcLuFdAxpjvqyrB2-pOyX62XrV_6k7JfrZetX4lVQsosV3WS1R4z1tU7RbAHuakbqA8O_-KVJVb25Sbq&_nc_ohc=B_UOgusbQsIQ7kNvwFjf9Ka&_nc_oc=AdmFTDq-YpdJNSJsdQqU6zNITvCtTWKPEvxVz2MsUvXke6907sIJv2DKKmSw6KdFaDQ&_nc_zt=23&_nc_ht=scontent.fdac24-5.fna&_nc_gid=5vqV_i9zCEUwSjGQ1MOH7w&oh=00_AfJwrv4OX_jb6JN7ZZmV3w0JcMbGDr5IkPKicr2ZJQknTg&oe=68291A7C" alt="images" />
              </div>
              <div className="ml-2 text-sm font-semibold">Mahan Khan Shahir</div>
              <div className="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none">
                2
              </div>
            </button>
            <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
              <div className="flex items-center justify-center h-8 w-8 bg-orange-200 rounded-full">
                <img className='rounded-full' src="https://scontent.fdac24-4.fna.fbcdn.net/v/t39.30808-6/402913409_3656676561238783_926055351817214552_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGkDvw3K02muHhaECHqBoYdi3sBznGAjK2LewHOcYCMreOMkGNsqV4JAEdEcAWFkL7XkKaeTXx72AegABakzkX9&_nc_ohc=GSnk157zS48Q7kNvwHZnTTX&_nc_oc=AdlURZjkficpuA92RayZ_at_t4UksC4O_RtCruvP4tVMJahTsQqZyjOLcESQk7YKGGo&_nc_zt=23&_nc_ht=scontent.fdac24-4.fna&_nc_gid=Z_XJlLzFtFiqLTpICtrcOA&oh=00_AfIGqL8jhUvsuyZ6tprr-pmn1yxZa_-Ui4W9wdhlSwT75g&oe=68291B75" alt="images" />
              </div>
              <div className="ml-2 text-sm font-semibold">Emran Khan</div>
            </button>
            <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
              <div className="flex items-center justify-center h-8 w-8 bg-pink-200 rounded-full">
                <img className='rounded-full' src="https://scontent.fdac24-3.fna.fbcdn.net/v/t39.30808-6/306163067_2486113018195182_5256457216596682304_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeE4b_iYz4cJcVKtTyRsocjWJM-A2PZFMRgkz4DY9kUxGP0HJfq91A48dWRa22rkceTzMh7iLZzZsMnDMmzBMuSj&_nc_ohc=GdThON-VGtEQ7kNvwFhJrGe&_nc_oc=AdkxK9FPTtdlMtsbCo2QV-edcMO4kz-EXhVzBdI6F8LytIiqxI7nANn3UJYupjSDA9U&_nc_zt=23&_nc_ht=scontent.fdac24-3.fna&_nc_gid=JjgwHrnHdLcb81sGVEqRYQ&oh=00_AfIOrQC5sMEdCSvlIqci2ohHbEnafc9BR9l7SsofbAE0TQ&oe=68290B26" alt="images" />
              </div>
              <div className="ml-2 text-sm font-semibold">Robi Sarker </div>
            </button>
            <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
              <div className="flex items-center justify-center h-8 w-8 bg-purple-200 rounded-full">
                <img className='rounded-full' src="https://scontent.fdac24-5.fna.fbcdn.net/v/t39.30808-6/495387524_703898398757856_7282825231077812960_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEYbW_2kdrwaxnzlLFwxThUycSQfvU-qNXJxJB-9T6o1ZGxlrsJaPBQKRSkvvuhF-ZnOT93la76bWL88HwlrlbM&_nc_ohc=Hwuuw6tdOnoQ7kNvwHRFOyy&_nc_oc=Adkfbuyfz3RAu-ROm73zxsv-6Yvuaqok6tDOg8JkmMVBAGeHjtZM8yiL5XrInxALd4A&_nc_zt=23&_nc_ht=scontent.fdac24-5.fna&_nc_gid=gugNPu5LlMSHXxvOS_e9Zw&oh=00_AfIsCOsqm7IIHtq1ITuCuEWE7ZExzBouEYaVW96moOCu8w&oe=68292861" alt="images" />
              </div>
              <div className="ml-2 text-sm font-semibold">Rasel Rizwan</div>
            </button>
          </div>
          <div className="flex flex-row items-center justify-between text-xs mt-6">
            <span className="font-bold">Archivied</span>
            <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
              7
            </span>
          </div>
          <div className="flex flex-col space-y-1 mt-4 -mx-2">
            <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
              <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                <img className='rounded-full' src="https://scontent.fdac24-2.fna.fbcdn.net/v/t39.30808-1/457209413_1217855355914939_8049005764013222975_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=111&ccb=1-7&_nc_sid=1d2534&_nc_eui2=AeEErWBbTOP0HpnCGl8YPLolukWiZt2sBlC6RaJm3awGUOEpEcUueJiI81cQQONuIKjG3MgkGyPMe7TAb6nZpRyX&_nc_ohc=Zz_RetImljAQ7kNvwGsQC6q&_nc_oc=AdlDQImXZ5-qDtffkPBenRxhxuDVGBdkphB0mZ28QJGKIAryJelUOFl1DklagjqaLVQ&_nc_zt=24&_nc_ht=scontent.fdac24-2.fna&_nc_gid=jT4nHQtpanl-Soys5GaoqA&oh=00_AfKhCT8p8fn_IlvrqWDwZ1b5U8992AC8CjkbXI3kLx6tgQ&oe=6828FE75" alt="images" />
              </div>
              <div className="ml-2 text-sm font-semibold">Moshiur Rashid</div>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-auto bg-[#dfa674] h-full p-6">
        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-[#002D74] h-full p-4">
          <div className="flex flex-col h-full overflow-x-auto mb-4">
            <div className="flex flex-col h-full">
              <div className="grid grid-cols-12 gap-y-2">
                <div className="col-start-1 col-end-8 p-3 rounded-lg">
                  <div className="flex flex-row items-center">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                      A
                    </div>
                    <div className="relative ml-3 text-sm bg-[#dfa674] py-2 px-4 shadow rounded-xl">
                      <div>Hey How are you today?</div>
                    </div>
                  </div>
                </div>
                <div className="col-start-1 col-end-8 p-3 rounded-lg">
                  <div className="flex flex-row items-center">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                      A
                    </div>
                    <div className="relative ml-3 text-sm bg-[#dfa674] py-2 px-4 shadow rounded-xl">
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
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                      A
                    </div>
                    <div className="relative mr-3 text-sm bg-[#dfa674] py-2 px-4 shadow rounded-xl">
                      <div>I'm ok what about you?</div>
                    </div>
                  </div>
                </div>
                <div className="col-start-6 col-end-13 p-3 rounded-lg">
                  <div className="flex items-center justify-start flex-row-reverse">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                      A
                    </div>
                    <div className="relative mr-3 text-sm bg-[#dfa674] py-2 px-4 shadow rounded-xl">
                      <div>
                        Lorem ipsum dolor sit, amet consectetur adipisicing. ?
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-start-1 col-end-8 p-3 rounded-lg">
                  <div className="flex flex-row items-center">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                      A
                    </div>
                    <div className="relative ml-3 text-sm bg-[#dfa674] py-2 px-4 shadow rounded-xl">
                      <div>Lorem ipsum dolor sit amet !</div>
                    </div>
                  </div>
                </div>
                <div className="col-start-6 col-end-13 p-3 rounded-lg">
                  <div className="flex items-center justify-start flex-row-reverse">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                      A
                    </div>
                    <div className="relative mr-3 text-sm bg-[#dfa674] py-2 px-4 shadow rounded-xl">
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
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                      A
                    </div>
                    <div className="relative ml-3 text-sm bg-[#dfa674] py-2 px-4 shadow rounded-xl">
                      <div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Perspiciatis, in.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-start-1 col-end-8 p-3 rounded-lg">
                  <div className="flex flex-row items-center">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                      A
                    </div>
                    <div className="relative ml-3 text-sm bg-[#dfa674] py-2 px-4 shadow rounded-xl">
                      <div className="flex flex-row items-center">
                        <button className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-800 rounded-full h-8 w-10">
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
          <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
            <div>
              <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-grow ml-4">
              <div className="relative w-full">
                <input
                  type="text"
                  className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                />
                <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="ml-4">
              <button className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
                <span>Send</span>
                <span className="ml-2">
                  <svg
                    className="w-4 h-4 transform rotate-45 -mt-px"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</>

  )
}

export default Chatroom