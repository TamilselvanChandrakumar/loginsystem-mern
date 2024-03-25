import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import { Password } from "./components/Password";
import Profile from "./components/Profile";
import Recovery from "./components/Recovery";
import Register from "./components/Register";
import Reset from "./components/Reset";
import UserName from "./components/UserName";

function App() {
  // root routes

  const router = createBrowserRouter([
    {
      path: "/",
      element: <UserName></UserName>,
    },
    {
      path: "/register",
      element: <Register></Register>,
    },
    {
      path: "/password",
      element: <Password></Password>,
    },
    {
      path: "/profile",
      element: <Profile></Profile>,
    },
    {
      path: "/recover",
      element: <Recovery></Recovery>,
    },
    {
      path: "/reset",
      element: <Reset></Reset>,
    },
    {
      path: "*",
      element: <PageNotFound></PageNotFound>,
    },
  ]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
