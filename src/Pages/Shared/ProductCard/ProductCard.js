import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AiFillCheckCircle, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import moment from 'moment';

const ProductCard = ({ product }) => {
    const { user } = useContext(AuthContext);
    const [sellerInfo, setSellerInfo] = useState([]);

    useEffect(() => {
        if (product) {
            axios.get(`http://localhost:5000/users?email=${product.seller}`)
                .then(res => {
                    setSellerInfo(res.data[0]);
                })
        }
    }, [product])

    if (product) {
        const { _id, image, title, condition, price, category, buyingPrice, buyingDate, description, location, pnone, publishedDate } = product;

        // if (sellerInfo === undefined) {
        //     return false;
        // }


        const handleWishList = (id) => {
            console.log(id);
        }

        return (
            <div className="card bg-base-100 shadow-xl">
                <figure className='text-center relative'>
                    <div className="absolute top-0 right-0 p-4">
                        <button onClick={() => handleWishList(_id)} className='w-6 h-6 text-red-600 bg-white rounded-full grid place-items-center shadow-xl tooltip tooltip-left' data-tip="Add to Wishlist">
                            <AiOutlineHeart className='text-lg'></AiOutlineHeart>
                            {/* <AiFillHeart className='text-lg'></AiFillHeart> */}
                        </button>
                    </div>
                    <img src={image} className='max-w-full h-[180px] object-cover' alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title items-baseline">
                        {title}
                        <div className="badge badge-secondary"> {condition}</div>

                    </h2>
                    <Link className="text-sm text-blue opacity-50 hover:underline hover:underline">{category}</Link>
                    <p>{description.length > 100 ? description.slice(0, 100) + '...' : description}</p>
                    <div className="flex items-center space-x-3">
                        <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                                <img src={sellerInfo?.photoURL} alt="Avatar Tailwind CSS Component" />
                            </div>
                        </div>
                        <div>
                            <div className="font-bold flex items-center">{sellerInfo?.name} <span className='tooltip' data-tip="Verified User"><AiFillCheckCircle className='text-lg ml-1 text-success' /></span></div>
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
                        user?.uid ?
                            <button className="btn btn-lg btn-blue">Book now</button> :
                            <Link to='/login' className="btn btn-lg btn-blue">Login to Book</Link>
                    }
                </div>
            </div>
        );
    }

};

export default ProductCard;