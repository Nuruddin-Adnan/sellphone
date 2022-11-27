import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../contexts/AuthProvider';
import Loader from '../../../Shared/Loader/Loader';

const AddProduct = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [productError, setProductError] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const imageHostKey = process.env.REACT_APP_imgbb_Key;

    // Queries
    const { data: categories = [], isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/categories`, {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json()
            return data
        }
    })

    const handleAddProduct = data => {
        setProductError(true)
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {

                    // get category id from category name
                    axios.get(`http://localhost:5000/categories/${data.category}`)
                        .then(categoryData => {
                            const categoryID = categoryData.data._id;

                            const product = {
                                title: data.title,
                                condition: data.condition,
                                category: categoryID,
                                location: data.location,
                                price: data.price,
                                buyingPrice: data.buyingPrice,
                                buyingDate: data.buyingDate,
                                pnone: data.pnone,
                                image: imgData.data.url,
                                description: data.description,
                                seller: user.email,
                                publishedDate: new Date(),
                                status: 'available',
                                payment: 'unpaid',
                                advertisement: 'notadvertised',
                            }

                            fetch('http://localhost:5000/products', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                                },
                                body: JSON.stringify(product)
                            })
                                .then(res => res.json())
                                .then(data => {
                                    if (data.acknowledged) {
                                        setProductError(false)
                                        navigate('/dashboard/myProducts')
                                    }
                                })
                        })


                } else {
                    toast.error('something went wrong');
                    setProductError(false)
                }
            })
    }

    if (isLoading || productError) {
        return <Loader></Loader>
    }

    return (
        <div>
            <h2 className='text-3xl font-bold mb-5'>Add A product</h2>
            <div className="card bg-base-100">
                <form onSubmit={handleSubmit(handleAddProduct)} className="card-body">
                    <div className="form-control">
                        <label className="label"> <span className="label-text">Product Title</span> </label>
                        <input type="text" placeholder="Product title" className="input input-bordered" {...register("title", { required: 'Product Title field is required' })} />
                        {
                            errors.title &&
                            <label className="label">
                                <span className="label-text-alt text-error">{errors.title?.message}</span>
                            </label>
                        }
                    </div>
                    <div className='grid grid-cols-2 gap-5'>
                        <div className="form-control">
                            <label className="label"> <span className="label-text">Condition</span> </label>
                            <select className="select select-bordered"  {...register("condition", { required: 'Product Title field is required' })}>
                                <option defaultValue="excellent">Excellent</option>
                                <option defaultValue="good">Good</option>
                                <option defaultValue="fair">Fair</option>
                            </select>
                            {
                                errors.condition &&
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.condition?.message}</span>
                                </label>
                            }
                        </div>
                        <div className="form-control">
                            <label className="label"> <span className="label-text"><span className='lg:inline hidden'>Select a</span> Category</span> </label>
                            <select className="select select-bordered"  {...register("category", { required: 'Category Title field is required' })}>
                                {
                                    categories.map(category => <option key={category._id} defaultValue={category.name}>{category.name}</option>)
                                }
                            </select>
                            {
                                errors.category &&
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.category?.message}</span>
                                </label>
                            }
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label"> <span className="label-text">Location</span> </label>
                        <input type="text" placeholder="Location" className="input input-bordered" {...register("location", { required: 'Product location field is required' })} />
                        {
                            errors.location &&
                            <label className="label">
                                <span className="label-text-alt text-error">{errors.location?.message}</span>
                            </label>
                        }
                    </div>
                    <div className="form-control">
                        <label className="label"> <span className="label-text">Price</span> </label>
                        <input type="text" placeholder="Price" className="input input-bordered" {...register("price", { required: 'Product price field is required' })} />
                        {
                            errors.price &&
                            <label className="label">
                                <span className="label-text-alt text-error">{errors.price?.message}</span>
                            </label>
                        }
                    </div>
                    <div className='lg:grid grid-cols-3 gap-5'>
                        <div className="form-control">
                            <label className="label"> <span className="label-text">Buying Price</span> </label>
                            <input type="text" placeholder="Buying Price" className="input input-bordered" {...register("buyingPrice", { required: 'Product buying price field is required' })} />
                            {
                                errors.buyingPrice &&
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.buyingPrice?.message}</span>
                                </label>
                            }
                        </div>
                        <div className="form-control">
                            <label className="label"> <span className="label-text">Buying Date</span> </label>
                            <input type="date" placeholder="Buying Date" className="input input-bordered" {...register("buyingDate", { required: 'Product buying date field is required' })} />
                            {
                                errors.buyingDate &&
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.buyingDate?.message}</span>
                                </label>
                            }
                        </div>
                        <div className="form-control">
                            <label className="label"> <span className="label-text">Phone Number</span> </label>
                            <input type="text" placeholder="Phone Number" className="input input-bordered" {...register("pnone", { required: 'Phone Number field is required' })} />
                            {
                                errors.pnone &&
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.pnone?.message}</span>
                                </label>
                            }
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label"> <span className="label-text">Product Image</span> </label>
                        <input type="file" placeholder="Product Photo" className="file-input file-input-bordered w-full" {...register("image", { required: 'Product image field is required' })} />
                        {
                            errors.image &&
                            <label className="label">
                                <span className="label-text-alt text-error">{errors.image?.message}</span>
                            </label>
                        }
                    </div>
                    <div className="form-control">
                        <label className="label"> <span className="label-text">Product Desctiption</span> </label>
                        <textarea className="textarea textarea-bordered h-40 w-full" {...register("description", { required: 'Product description field is required' })} />
                        {
                            errors.description &&
                            <label className="label">
                                <span className="label-text-alt text-error">{errors.description?.message}</span>
                            </label>
                        }
                    </div>
                    <div className="form-control mt-5">
                        <button className='btn btn-lg btn-blue w-full'>Add a product</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;