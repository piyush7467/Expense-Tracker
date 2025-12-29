import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./component/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import YearPage from "./pages/general/YearPage";
import MonthPage from "./pages/general/MonthPage";
import WeekPage from "./pages/general/Weekpage";
import GeneralExpenseWrapper from "./pages/general/GeneralExpenseWrapper";


const router = createBrowserRouter([
// {
//     path: "/",
//     element: (
//       <>
//         <Navbar />
//         <PrivateRoute>
//           <Home />
//         </PrivateRoute>
//       </>
//     ),
//   },


  {
    path: "/",
    element: (
      <>
        <Navbar />
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      </>
    ),
  },



  {
    path: "/dashboard/general",
    element: (
      <>
        <Navbar />
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      </>
    ),
  },

  // {
  //   path: "/dashboard/general/:year",
  //   element: (
  //     <>
  //       <Navbar />
  //       <PrivateRoute>
  //         <MonthPage />
  //       </PrivateRoute>
  //     </>
  //   ),
  // },

  // {
  //   path: "/dashboard/general/:year/:month",
  //   element: (
  //     <>
  //       <Navbar />
  //       <PrivateRoute>
  //         <WeekPage />
  //       </PrivateRoute>
  //     </>
  //   ),
  // },

  // {
  //   path: "/dashboard/general/:year/:month/:week",
  //   element: (
  //     <>
  //       <Navbar />
  //       <PrivateRoute>
  //         <GeneralExpenseWrapper />
  //       </PrivateRoute>
  //     </>
  //   ),
  // },
  

  {
    path: "/login",
    element: (
      <>
        <Navbar />
        <Login />
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        <Navbar />
        <Signup />
      </>
    ),
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
