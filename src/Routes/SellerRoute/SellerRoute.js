import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useSeller from '../../hooks/useSeller';
import Loader from '../../Pages/Shared/Loader/Loader';

const SellerRoute = ({ children }) => {
    const { user, loading, logOut } = useContext(AuthContext);
    const [isSeller, isSellerLoading] = useSeller(user?.email);
    const location = useLocation();

    if (loading || isSellerLoading) {
        return <Loader></Loader>
    }

    if (user && isSeller) {
        return children
    }

    logOut()
        .then(() => {
            toast.error('You dont have permission')
        })

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default SellerRoute;