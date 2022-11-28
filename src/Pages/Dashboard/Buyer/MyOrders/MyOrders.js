import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../contexts/AuthProvider';
import Loader from '../../../Shared/Loader/Loader';

const MyOrders = () => {
    const { user } = useContext(AuthContext);

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

    const handleCancelOrder = id => {
        console.log(id);
        fetch(`http://localhost:5000/orders/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success('Order cancel')
                }
            })
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
                                            <div className='btn-group'>
                                                {
                                                    order?.paymentStatus === 'paid' ?
                                                        <button className='btn btn-sm btn-success'>Paid</button>
                                                        :
                                                        <>
                                                            <button onClick={() => makePayment(order._id, order.productId)} className='btn btn-sm btn-warning'>Pay Now</button>
                                                            <button onClick={() => handleCancelOrder(order._id)} className='btn btn-sm btn-error'>Cancel Order</button>
                                                        </>
                                                }
                                            </div>
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