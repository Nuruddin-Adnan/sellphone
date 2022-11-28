import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loader from '../../../Shared/Loader/Loader';
const Swal = require('sweetalert2')

const AllSellers = () => {
    // Queries
    const { data: allSellers = [], isLoading, refetch } = useQuery({
        queryKey: ['allSellers'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users/allSellers`, {
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

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Do you want to Delete?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            // denyButtonText: `Don't save`,
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/users/delete/${id}`, {
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

    const handleVarified = (id) => {
        Swal.fire({
            title: 'Do you want to Varify the Seller?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Varified',
            // denyButtonText: `Don't save`,
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/users/varify/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.modifiedCount > 0) {
                            refetch();
                            Swal.fire('Varified!', '', 'success');
                        }
                    })
            }
        })

    }

    return (
        <div>
            <h2 className='text-3xl font-bold mb-5'>All Sellers </h2>
            <div className="overflow-x-auto">
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allSellers.length === 0 ?
                                <tr>
                                    <td className='text-error text-center' colSpan="50">No User Found</td>
                                </tr>
                                :
                                allSellers.map((buyer, index) =>
                                    <tr key={buyer._id}>
                                        <th>{index + 1}</th>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={buyer?.photoURL} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{buyer?.name}</div>
                                                    <div className="text-sm opacity-50">{buyer?.createdAt}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{buyer.email}</td>
                                        <td><span className='badge badge-secondary'>{buyer.role}</span></td>
                                        <td>
                                            <div className="btn-group">
                                                <button onClick={() => handleDelete(buyer._id)} className='btn btn-sm btn-error'>Delete</button>
                                                {
                                                    buyer?.varified ?
                                                        <button className='btn btn-sm btn-blue'>Varified Seller</button>
                                                        :
                                                        <button onClick={() => handleVarified(buyer._id)} className='btn btn-sm btn-warning'>Please Varify</button>
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

export default AllSellers;