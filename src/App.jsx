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


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "*",
    element: <Not_found/>,
  },
  {
    path: "/home",
    element: <Home/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/signup",
    element: <Signup/>
  },
  {
    path: "/chatroom",
    element: <Chatroom/>
  }
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App