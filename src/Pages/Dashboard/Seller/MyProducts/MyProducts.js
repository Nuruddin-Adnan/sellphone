import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../contexts/AuthProvider';
import Loader from '../../../Shared/Loader/Loader';
import MyProductRow from './MyProductRow';
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
                                    <MyProductRow
                                        key={product._id}
                                        product={product}
                                        handleAdvertise={handleAdvertise}
                                        handleDelete={handleDelete}
                                        index={index}
                                    >
                                    </MyProductRow>
                                )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProducts;