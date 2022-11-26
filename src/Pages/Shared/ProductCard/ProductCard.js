import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiFillCheckCircle, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const [sellerInfo, setSellerInfo] = useState([]);

    useEffect(() => {
        if (product) {
            axios.get(`http://localhost:5000/users?email=${product.seller}`)
                .then(res => {
                    setSellerInfo(res.data);
                })
        }
    }, [])

    if (product) {
        const { _id, image, title, condition, price, category, buyingPrice, buyingDate, advertisement, description, location, pnone, publishedDate, seller } = product;

        if (sellerInfo.length === 0) {
            return false;
        }


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
                    <img src={image} className='max-w-full h-[200px] object-cover' alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title items-baseline">
                        {title}
                        <div className="badge badge-secondary"> {condition}</div>

                    </h2>
                    <Link className="text-sm opacity-50 hover:underline hover:text-blue">{category}</Link>
                    <p>{description}</p>
                    <div className="flex items-center space-x-3">
                        <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                                <img src="https://placeimg.com/400/225/arch" alt="Avatar Tailwind CSS Component" />
                            </div>
                        </div>
                        <div>
                            <div className="font-bold flex items-center">{sellerInfo[0].name} <span className='tooltip' data-tip="Verified User"><AiFillCheckCircle className='text-lg ml-1 text-success' /></span></div>
                            <div className="text-sm opacity-50">{location} <span>Published: {publishedDate}</span></div>
                            <div className='text-sm opacity-50'></div>
                        </div>
                    </div>
                    <ul>
                        <li>Buying Price: <span className='font-semibold'>${buyingPrice}</span></li>
                        <li>Buying Date: <span className='font-semibold'>{buyingDate}</span></li>
                        <li>Mobile number: <span className='font-semibold'>{pnone}</span></li>
                    </ul>
                    <div className="card-actions justify-between">
                        <h3 className='text-xl font-bold text-blue'>Price: ${price}</h3>
                    </div>
                    <button className="btn btn-lg btn-blue">Book now</button>
                </div>
            </div>
        );
    }

};

export default ProductCard;