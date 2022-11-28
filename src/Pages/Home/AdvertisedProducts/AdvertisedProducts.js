import React, { useEffect, useState } from 'react';
import ProductCard from '../../Shared/ProductCard/ProductCard';
import axios from 'axios';

const AdvertisedProducts = () => {
    const [advertisedProducts, setAdvertisedProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/products/advertise')
            .then(res => {
                const filteredProducts = res.data.filter(product => product.status !== 'sold')
                setAdvertisedProducts(filteredProducts)
            })

    }, [setAdvertisedProducts])


    if (advertisedProducts.length === 0) {
        return false;
    }


    return (
        <section className='lg:pb-20 pb-10'>
            <div className="container">
                <div className="flex items-baseline pb-20">
                    <h2 className='text-2xl font-bold text-center whitespace-nowrap'>Advertise Products</h2>
                    <hr className='w-full' />
                </div>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 lg:gap-8 gap-5">
                    {
                        advertisedProducts.map(advertisedProduct => <ProductCard key={advertisedProduct._id} product={advertisedProduct}></ProductCard>)
                    }
                </div>
            </div>
        </section>
    );
};

export default AdvertisedProducts;