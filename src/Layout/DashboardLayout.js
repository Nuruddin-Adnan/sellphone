import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import { AiOutlineUser } from 'react-icons/ai';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { AuthContext } from '../contexts/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import useSeller from '../hooks/useSeller';
import Footer from '../Pages/Shared/Footer/Footer';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user.email)
    const [isSeller] = useSeller(user.email)
    return (
        <>
            <Navbar></Navbar>
            <div className="container my-5">
                <div className="drawer drawer-mobile min-h-screen h-auto">
                    <input id="dashboard-sidenav" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content bg-[#F1F5F9] p-5">
                        {/* Dashboard content goes here */}
                        <Outlet></Outlet>
                    </div>
                    <div className="drawer-side bg-base-100">
                        <label htmlFor="dashboard-sidenav" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80">
                            {
                                isAdmin && <>
                                    <li>
                                        <NavLink to='/dashboard/allBuyers'> <AiOutlineUser></AiOutlineUser> All Buyers</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/dashboard/allSellers'> <AiOutlineUser></AiOutlineUser> All Sellers</NavLink>
                                    </li>
                                </>
                            }
                            {
                                isSeller && <>
                                    <li>
                                        <NavLink to='/dashboard/addProduct'> <MdOutlineProductionQuantityLimits></MdOutlineProductionQuantityLimits> Add A product</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/dashboard/myProducts'> <MdOutlineProductionQuantityLimits></MdOutlineProductionQuantityLimits> My Products</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/dashboard/myBuyers'> <AiOutlineUser></AiOutlineUser> My buyers</NavLink>
                                    </li>
                                </>
                            }
                        </ul>

                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    );
};

export default DashboardLayout;