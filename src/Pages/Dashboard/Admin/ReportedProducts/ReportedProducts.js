import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import Loader from '../../../Shared/Loader/Loader';
const Swal = require('sweetalert2')

const ReportedProducts = () => {
    // Queries
    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/products/reported`, {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json()
            return data
        }
    })

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Do you want to Delete?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            // denyButtonText: `Don't save`,
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/products/reported/delete/${id}`, {
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
                    }).catch(error => toast.error(error.message))
            }
        })

    }


    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div>
            <h2 className='text-3xl font-bold mb-5'>Reported Products </h2>
            <div className="overflow-x-auto">
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product</th>
                            <th>Seller</th>
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
                                                    <div className="text-sm opacity-50">{product?.location} {product?.publishedDate}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{product?.seller}</td>
                                        <td>
                                            <div className="btn-group">
                                                <button onClick={() => handleDelete(product._id)} className='btn btn-sm btn-error'>Delete</button>
                                                <button className='btn btn-sm btn-blue'>Remove Report</button>
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

export default ReportedProducts;