import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useAdmin from '../../hooks/useAdmin';
import Loader from '../../Pages/Shared/Loader/Loader';

const AdminRoute = ({ children }) => {
    const { user, loading, logOut } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email);
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <Loader></Loader>
    }

    if (user && isAdmin) {
        return children
    }

    logOut()
        .then(() => {
            toast.error('You dont have permission')
        })

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRoute;