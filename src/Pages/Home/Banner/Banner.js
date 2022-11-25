import React from 'react';
import banner1 from '../../../assets/images/banner/banner-image-1.png';

const Banner = () => {
    return (
        <section className="hero py-10 lg:py-32">
            <div className="hero-content flex-col lg:flex-row-reverse container">
                <div className="lg:w-1/2 rounded-lg">
                    <img src={banner1} className="max-w-full" alt='banner mobile' />
                </div>
                <div className='lg:w-1/2'>
                    <h1 className="lg:text-5xl text-3xl font-bold text-dark" style={{ lineHeight: '1.2' }}>Buy and Sell your Phone With Trust!</h1>
                    <p className="py-6">SellPhone is one of the best online platforms to buy and sell your phone. We ensure your security and believe in you. The largest collection helps you to full fill your demand. Your phone is our priority</p>
                    <button className="btn btn-blue">See All Products</button>
                </div>
            </div>
        </section>
    );
};

export default Banner;