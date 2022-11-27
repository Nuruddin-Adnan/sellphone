import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../contexts/AuthProvider';
import useAdmin from '../../../../hooks/useAdmin';
import useSeller from '../../../../hooks/useSeller';
import Loader from '../../../Shared/Loader/Loader';

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    // const [isAdmin] = useAdmin(user?.email);
    // const [isSeller] = useSeller(user?.email);

    // if (isAdmin) {
    //     navigate('/dashboard/allBuyers')
    // }

    // if (isSeller) {
    //     navigate('/dashboard/addProduct')
    // }

    // Queries
    const { data: myOrders = [], isLoading, refetch } = useQuery({
        queryKey: ['allSellers'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/orders/${user.email}`, {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json()
            return data
        }
    })

    if (isLoading) {
        return <Loader></Loader>
    }

    const makePayment = (orderId, productId) => {
        console.log(orderId, productId);
    }

    return (
        <div>
            <h2 className='text-3xl font-bold mb-5'>My Orders </h2>
            <div className="overflow-x-auto">
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Phone</th>
                            <th>Payment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myOrders.length === 0 ?
                                <tr>
                                    <td className='text-error text-center' colSpan="50">No Data Found</td>
                                </tr>
                                :
                                myOrders.map((order, index) =>
                                    <tr key={order._id}>
                                        <th>{index + 1}</th>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={order.productImage} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{order.title}</div>
                                                    <div className="text-sm opacity-50">{order.meetingLocation}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>${order.price}</td>
                                        <td>{order.phone}</td>
                                        <td>
                                            <button className='btn btn-sm btn-success'>Paid</button>
                                            <button onClick={() => makePayment(order._id, order.productId)} className='btn btn-sm btn-error'>Pay Now</button>
                                        </td>
                                    </tr>
                                )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;