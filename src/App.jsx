import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Home from './pages/Home';
import Not_found from './pages/Not_found';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chatroom from './pages/Chatroom';
import Message from './pages/Message';
import RootLayout from './components/RootLayout';
import Chat from './pages/Chat';
import Userlist from './pages/Userlist';
import FriendList from './components/FriendsList';
import FriendRequest from './components/FriendRequest';
import BlockList from './components/BlockList';


const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "/Chat", Component: Chat },
      { path: "/UserList", Component: Userlist },
      { path: "/FriendList", Component: FriendList },
      { path: "/FriendRequest", Component: FriendRequest },
      { path: "/BlockList", Component: BlockList },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signup",
    Component: Signup,
  },
  {
    path: "*",
    Component: Not_found,
  },
  {
    path: "/chatroom",
    Component: Chatroom,
  }
]);


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Login/>,
//   },
//   {
//     path: "*",
//     element: <Not_found/>,
//   },
//   {
//     path: "/home",
//     element: <Home/>,
//   },
//   {
//     path: "/message",
//     element: <Message/>,
//   },
//   {
//     path: "/login",
//     element: <Login/>,
//   },
//   {
//     path: "/signup",
//     element: <Signup/>
//   },
//   {
//     path: "/chatroom",
//     element: <Chatroom/>
//   }
// ]);

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App