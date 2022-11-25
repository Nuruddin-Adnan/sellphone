import React from 'react';
import { AiFillCheckCircle, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure className='text-center relative'>
                <div className="absolute top-0 right-0 p-4">
                    <Link className='w-6 h-6 text-red-600 bg-white rounded-full grid place-items-center shadow-xl tooltip tooltip-left' data-tip="Add to Wishlist">
                        <AiOutlineHeart className='text-lg'></AiOutlineHeart>
                        {/* <AiFillHeart className='text-lg'></AiFillHeart> */}
                    </Link>
                </div>
                <img src="https://imagemobiles.com/wp-content/uploads/2022/09/Apple-iPhone-14-Mobile-Phone-493177754-i-1-1200Wx1200H-414x414.jpg" className='max-w-full h-[200px] object-cover' alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title items-baseline">
                    Product Name
                    <div className="badge badge-secondary"> good</div>

                </h2>
                <Link className="text-sm opacity-50 hover:underline hover:text-blue">Category</Link>
                <p>This is product description This is product description This is product description</p>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src="https://placeimg.com/400/225/arch" alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold flex items-center">Hart Hagerty <span className='tooltip' data-tip="Verified User"><AiFillCheckCircle className='text-lg ml-1 text-success' /></span></div>
                        <div className="text-sm opacity-50">United States <span>Published: 27/12/2022</span></div>
                        <div className='text-sm opacity-50'></div>
                    </div>
                </div>
                <ul>
                    <li>Buying Price: <span className='font-semibold'>$30</span></li>
                    <li>Buying Date: <span className='font-semibold'>25/mar/2022</span></li>
                    <li>Mobile number: <span className='font-semibold'>01771117454</span></li>
                </ul>
                <div className="card-actions justify-between">
                    <h3 className='text-xl font-bold text-blue'>Price: $33</h3>
                </div>
                <button className="btn btn-lg btn-blue">Book now</button>
            </div>
        </div>
    );
};

export default ProductCard;