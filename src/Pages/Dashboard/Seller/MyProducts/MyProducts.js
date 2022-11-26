import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../contexts/AuthProvider';
import Loader from '../../../Shared/Loader/Loader';
const Swal = require('sweetalert2')

const MyProducts = () => {
    const { user } = useContext(AuthContext);
    // Queries
    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/products/seller/${user.email}`, {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json()
            return data
        }
    })


    const handleAdvertise = (id, advertisement) => {
        const url = `http://localhost:5000/products/advertise?id=${id}&advertisement=${advertisement}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch();
                    if (advertisement === 'advertised') {
                        toast.success(`Avertised Added successfull`);
                    } else {
                        toast.success(`Avertised Remove successfuly`);
                    }
                }
            })
            .catch(error => {
                toast.error(error.message);
            })
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Do you want to Delete?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            // denyButtonText: `Don't save`,
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/products/delete/${id}`, {
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
                            Swal.fire('Deleted!', '', 'success');
                        }
                    })
            }
        })

    }




    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div>
            <h2 className='text-3xl font-bold mb-5'>My Products</h2>
            <div className="overflow-x-auto">
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Sales Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.length === 0 ?
                                <tr>
                                    <td className='text-error text-center' colSpan='50'>No Product Found</td>
                                </tr>
                                :
                                products.map((product, index) =>
                                    <tr key={product._id}>
                                        <th>{index + 1}</th>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-16 h-16">
                                                        <img src={product?.image} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{product?.title}</div>
                                                    <div className="text-sm opacity-50">{product?.publishedDate}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>${product.price}</td>
                                        <td className='uppercase'>{product.category}</td>
                                        <td><span className={`badge ${product.status === 'available' ? 'badge-success' : 'badge-error'}`}>{product.status}</span></td>
                                        <td>
                                            <div className="btn-group">
                                                <button onClick={() => handleDelete(product._id)} className='btn btn-sm btn-error'>Delete</button>
                                                {
                                                    (product?.status === 'available' && product?.advertisement === 'notadvertised') ?
                                                        <button onClick={() => handleAdvertise(product._id, 'advertised')} className='btn btn-sm btn-blue'>Advertise now</button> :
                                                        <button onClick={() => handleAdvertise(product._id, 'notadvertised')} className='btn btn-sm btn-secondary'>Remove Advertise</button>
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

export default MyProducts;