import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { NavLink, useLoaderData } from 'react-router-dom';
import ProductCard from '../../Shared/ProductCard/ProductCard';

const CategoryProducts = () => {
    const products = useLoaderData();
    const { data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/categories');
            const data = await res.json();
            return data;
        }
    })

    return (
        <section className='bg-[#F2F2F2] py-10'>
            <div className="container">
                <div className="lg:grid grid-cols-4 gap-5">
                    <div className="lg:col-span-1">
                        <ul className="menu bg-base-100 p-2 rounded-box sticky top-0 mb-lg-0 mb-8">
                            <li className="font-bold text-lg border-b-gray-400">
                                <span>All Category</span>
                            </li>
                            {
                                categories.map(category => <li key={category._id}><NavLink to={`/category/${category.name}`}>{category.name}</NavLink></li>)
                            }

                        </ul>
                    </div>
                    <div className="lg:col-span-3">
                        <div className='grid xl:grid-cols-3 md:grid-cols-2 gap-5'>
                            {
                                products.map(product => <ProductCard key={product._id} product={product}></ProductCard>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CategoryProducts;