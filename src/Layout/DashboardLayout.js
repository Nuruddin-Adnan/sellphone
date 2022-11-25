import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import { AiOutlineUser } from 'react-icons/ai';
import { AuthContext } from '../contexts/AuthProvider';
import useAdmin from '../hooks/useAdmin';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user.email)
    return (
        <>
            <Navbar></Navbar>
            <div className="container">
                <div className="drawer drawer-mobile">
                    <input id="dashboard-sidenav" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content bg-[#F1F5F9] p-5">
                        {/* Dashboard content goes here */}
                        <Outlet></Outlet>
                    </div>
                    <div className="drawer-side">
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
                        </ul>

                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardLayout;