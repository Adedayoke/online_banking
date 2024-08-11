import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Signup from './pages/signup/Signup'
import Login from './pages/Login'
import AppLayout from './ui/AppLayout'
import SignupOne from './pages/signup/SignupOne'
import SignupTwo from './pages/signup/SignupTwo'

const router = createBrowserRouter([
  {
    element: <AppLayout/>,
    children: [
      {
        path: "/",
        element: <HomePage/>
      },
      {
        path: "signup",
        element: <Signup/>,
        children: [
          {
            path: "/signup/one",
            element: <SignupOne />
          },
          {
            path: "/signup/two",
            element: <SignupTwo />
          },
        ]
      },
      {
        path: "login",
        element: <Login/>
      },
    ]
  }
])
export default function App() {
  return (
    <RouterProvider router={router} />
  )
}
