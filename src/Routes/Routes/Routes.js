import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import Login from "../../Pages/Auth/Login/Login";
import SignUp from "../../Pages/Auth/SignUp/SignUp";
import AllBuyers from "../../Pages/Dashboard/Admin/AllBuyers/AllBuyers";
import AllSellers from "../../Pages/Dashboard/Admin/AllSellers/AllSellers";
import Home from "../../Pages/Home/Home/Home";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: '/dashboard/allBuyers',
                element: <AdminRoute><AllBuyers></AllBuyers></AdminRoute>
            },
            {
                path: '/dashboard/allSellers',
                element: <AdminRoute><AllSellers></AllSellers></AdminRoute>
            },
            // {
            //     path: '/dashboard/adddoctor',
            //     element: <AdminRoute><AddDoctor></AddDoctor></AdminRoute>
            // },
            // {
            //     path: '/dashboard/managedoctors',
            //     element: <AdminRoute><ManageDoctors></ManageDoctors></AdminRoute>
            // },
        ]
    }
])

export default router;