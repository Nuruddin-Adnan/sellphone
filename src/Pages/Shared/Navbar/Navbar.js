import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { BsReverseLayoutTextSidebarReverse } from 'react-icons/bs';
import { BiMobileVibration } from 'react-icons/bi';
import { AiOutlineDashboard, AiOutlineLogout } from 'react-icons/ai';
import { AuthContext } from '../../../contexts/AuthProvider';
import useAdmin from '../../../hooks/useAdmin';
import useSeller from '../../../hooks/useSeller';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);
    const [isSeller] = useSeller(user?.email);
    const navigate = useNavigate();


    const handleLogOut = () => {
        logOut()
            .then(() => {
                localStorage.removeItem('accessToken');
                navigate('/login')
            })
            .catch(error => console.error(error.message))
    }

    const menuItems =
        <>
            <li><NavLink to='/' className='rounded-lg'>Home</NavLink></li>
            <li><NavLink to='/blog' className='rounded-lg'>Blog</NavLink></li>
        </>

    return (
        <header className='shadow-sm bg-blue text-white'>
            <div className="navbar justify-between container">
                <div>
                    {
                        user?.uid &&
                        <div className='lg:hidden pl-4'>
                            <label htmlFor="dashboard-sidenav" className="text-xl drawer-button"><BsReverseLayoutTextSidebarReverse /></label>
                        </div>
                    }
                    <div className="divider divider-horizontal mr-0 lg:hidden"></div>
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52 text-black">
                            {menuItems}
                        </ul>
                    </div>
                    <Link to='/' className='text-xl normal-case btn btn-ghost'>
                        <BiMobileVibration className='text-2xl mr-2'></BiMobileVibration> SellPhone
                    </Link>
                </div>

                <div>

                    <div className="hidden lg:flex">
                        <ul className="menu menu-horizontal p-0">
                            {menuItems}
                        </ul>
                    </div>

                    <div className="divider divider-horizontal my-auto hidden lg:block bg-slate-200 w-px h-10 ml-5 mr-10"></div>



                    {
                        user?.uid ?
                            <div className="dropdown dropdown-end mr-4 mt-[5px] text-black">
                                <div tabIndex={0} className="avatar">
                                    <div className="w-12 rounded-full ring ring-base-300 ring-offset-base-100 ring-offset-2 cursor-pointer">
                                        <img src={user?.photoURL} alt="avatar" />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                                    {
                                        isAdmin && <>
                                            <li>
                                                <Link to='/dashboard/allBuyers'> <AiOutlineDashboard></AiOutlineDashboard> Dashboard</Link>
                                            </li>
                                        </>
                                    }
                                    {
                                        isSeller && <>
                                            <li>
                                                <Link to='/dashboard/addProduct'> <AiOutlineDashboard></AiOutlineDashboard> Dashboard</Link>
                                            </li>
                                        </>
                                    }
                                    {
                                        !isSeller && !isAdmin && <>
                                            <li>
                                                <Link to='/dashboard/myorders'> <AiOutlineDashboard></AiOutlineDashboard> My Orders</Link>
                                            </li>
                                        </>
                                    }
                                    <li><button onClick={handleLogOut}> <AiOutlineLogout></AiOutlineLogout>Logout</button></li>
                                </ul>
                            </div>
                            :
                            <Link to='/login' className="btn btn-white mr-4"> Login</Link>
                    }
                </div>
            </div>
        </header>
    );
};

export default Navbar;