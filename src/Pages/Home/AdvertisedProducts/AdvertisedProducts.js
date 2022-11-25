import React from 'react';
import ProductCard from '../../Shared/ProductCard/ProductCard';

const AdvertisedProducts = () => {
    return (
        <section className='lg:py-20 py-10'>
            <div className="container">
                <div className="flex items-baseline pb-20">
                    <h2 className='text-2xl font-bold text-center whitespace-nowrap'>Advertise Products</h2>
                    <hr className='w-full' />
                </div>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 lg:gap-8 gap-5">
                    <ProductCard></ProductCard>
                    <ProductCard></ProductCard>
                    <ProductCard></ProductCard>
                    <ProductCard></ProductCard>
                    <ProductCard></ProductCard>
                    <ProductCard></ProductCard>
                </div>
            </div>
        </section>
    );
};

export default AdvertisedProducts;