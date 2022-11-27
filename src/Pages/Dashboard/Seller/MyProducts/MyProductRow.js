import React from 'react';

const MyProductRow = ({ product, index, handleDelete, handleAdvertise }) => {

    return (
        <tr>
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
            <td className='uppercase'>{product?.category}</td>
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
    );
};

export default MyProductRow;