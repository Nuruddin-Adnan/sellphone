import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProductCard from '../../Shared/ProductCard/ProductCard';

const LatestProducts = () => {
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/products/available?limit=3')
            .then(res => {
                setLatestProducts(res.data)
            })

    }, [setLatestProducts]);

    return (
        <section className='lg:py-20 py-10'>
            <div className="container">
                <div className="flex items-baseline pb-20">
                    <h2 className='text-2xl font-bold text-center whitespace-nowrap'>Latest Products</h2>
                    <hr className='w-full' />
                </div>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 lg:gap-8 gap-5">
                    {
                        latestProducts.map(latestProduct => <ProductCard key={latestProduct._id} product={latestProduct}></ProductCard>)
                    }
                </div>
            </div>
        </section>
    );
};

export default LatestProducts;