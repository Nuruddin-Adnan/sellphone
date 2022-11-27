import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';
import { FaFlag } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import moment from 'moment';
import BookingModal from '../BookingModal/BookingModal';
import toast from 'react-hot-toast';
const Swal = require('sweetalert2')

const ProductCard = ({ product }) => {
    const { user } = useContext(AuthContext);
    const [sellerInfo, setSellerInfo] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [isBooked, setIsBooked] = useState(false)
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {


        if (product) {
            axios.get(`http://localhost:5000/users?email=${product.seller}`)
                .then(res => {
                    setSellerInfo(res.data[0]);
                });
        }

        if (product.category) {
            // get category id from category name
            axios.get(`http://localhost:5000/categories/id/${product?.category}`)
                .then(res => {
                    setCategoryName(res.data.name);
                })
        }

        if (user?.uid) {
            // get and set alredy bocked item
            axios({
                method: 'get',
                url: `http://localhost:5000/orders/${user.email}?productId=${product._id}`,
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => {
                    (res.data.length > 0) && setIsBooked(true);
                })
        }

    }, [product, user, isBooked])

    if (product) {
        const { _id, image, title, condition, price, category, buyingPrice, buyingDate, description, location, pnone, publishedDate } = product;

        // if (sellerInfo === undefined) {
        //     return false;
        // }


        const handleReportToAdmin = (id) => {
            if (!user?.uid) {
                toast.error('Please login to report');
                return;
            }
            Swal.fire({
                title: 'Report to Admin?',
                showDenyButton: false,
                showCancelButton: true,
                confirmButtonText: 'Yes Report',
                // denyButtonText: `Don't save`,
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch(`http://localhost:5000/products/report/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.modifiedCount > 0) {
                                Swal.fire('Reported!', '', 'success');
                            }
                        })
                        .catch(error => toast.error(error.message))
                }
            })
        }

        return (
            <>
                <div className="card bg-base-100 shadow-xl">
                    <figure className='text-center relative pt-5'>
                        <div className="absolute top-0 right-0 p-4">
                            <button onClick={() => handleReportToAdmin(_id)} className='w-8 h-8 text-gray-500 bg-white rounded-full grid place-items-center  tooltip tooltip-left border' data-tip="Report to Admin">
                                <FaFlag className='text-md'></FaFlag>
                            </button>
                        </div>
                        <img src={image} className='max-w-full h-[180px] object-cover' alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title items-baseline">
                            {title}
                            <div className="badge badge-secondary"> {condition}</div>

                        </h2>
                        <Link to={`/category/${category}`} className="text-sm text-blue opacity-50  hover:underline">{categoryName}</Link>
                        <p>{description.length > 75 ? description.slice(0, 75) + '...' : description}</p>
                        <div className="flex items-center space-x-3">
                            <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img src={sellerInfo?.photoURL} alt="Avatar Tailwind CSS Component" />
                                </div>
                            </div>
                            <div>
                                <div className="font-bold flex items-center">
                                    {sellerInfo?.name}
                                    {sellerInfo?.varified && <span className='tooltip' data-tip="Verified Seller"><AiFillCheckCircle className='text-lg ml-1 text-success' /></span>}
                                </div>
                                <div className="text-sm opacity-50">{location} <span>Published: {moment(publishedDate).format("Do MMM yyy")}</span></div>
                                <div className='text-sm opacity-50'></div>
                            </div>
                        </div>
                        <ul>
                            <li className='text-sm'>Buying Price: <span className='font-semibold'>${buyingPrice}</span></li>
                            <li className='text-sm'>Buying Date: <span className='font-semibold'>{moment(buyingDate).format("Do MMM yyy")}</span></li>
                            <li className='text-sm'>Mobile number: <span className='font-semibold'>{pnone}</span></li>
                        </ul>
                        <div className="card-actions justify-between">
                            <h3 className='text-xl font-bold text-blue'>Price: ${price}</h3>
                        </div>
                        {
                            isBooked ? <button className="btn btn-lg btn-blue" disabled>Booked!</button> :
                                user?.uid ?
                                    <label onClick={() => setModalOpen(true)} htmlFor={`booking${_id}`} className="btn btn-lg btn-blue">Book now</label> :
                                    <Link to='/login' className="btn btn-lg btn-blue">Login to Book</Link>
                        }
                    </div>
                </div>
                {modalOpen && user && <BookingModal
                    product={product}
                    user={user}
                    modalId={`booking${_id}`}
                    setModalOpen={setModalOpen}
                    setIsBooked={setIsBooked}
                >
                </BookingModal>}

            </>
        );
    }

};

export default ProductCard;