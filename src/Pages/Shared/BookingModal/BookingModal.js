import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const BookingModal = ({ product, user, modalId, setModalOpen }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { displayName, email } = user;
    const { _id, title, price, image } = product;

    const handleBookingSubmit = data => {
        const bookingInfo = {
            productImage: image,
            title: title,
            productId: _id,
            price: price,
            user: email,
            phone: data.phone,
            meetingLocation: data.meetingLocation
        }

        axios({
            method: 'post',
            url: 'http://localhost:5000/orders',
            data: bookingInfo,
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then((data => {
                console.log(data);
                toast.success('Order Placed successfully')
                setModalOpen(false);
            }))
            .catch(error => toast.error(error.message));

    }


    return (
        <>
            <input type="checkbox" id={modalId} className="modal-toggle" />
            <div className="modal">
                <form onSubmit={handleSubmit(handleBookingSubmit)} className="modal-box relative">
                    <label htmlFor={modalId} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg">{title}</h3>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Your Name</span>
                        </label>
                        <input type="text" defaultValue={displayName} className="input input-bordered" disabled />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" defaultValue={email} className="input input-bordered" disabled />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Item Name</span>
                        </label>
                        <input type="text" defaultValue={title} className="input input-bordered" disabled />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Price Price</span>
                        </label>
                        <input type="text" defaultValue={price} className="input input-bordered" disabled />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Phone Number</span>
                        </label>
                        <input type="text" className="input input-bordered"  {...register("phone", { required: 'This field is required' })} />
                        {
                            errors.phone &&
                            <label className="label">
                                <span className="label-text-alt text-error">{errors.phone?.message}</span>
                            </label>
                        }
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Meeting Location</span>
                        </label>
                        <input type="text" className="input input-bordered" {...register("meetingLocation", { required: 'This field is required' })} />
                        {
                            errors.meetingLocation &&
                            <label className="label">
                                <span className="label-text-alt text-error">{errors.meetingLocation?.message}</span>
                            </label>
                        }
                    </div>
                    <div className="from-control mt-5">
                        <button className="btn btn-blue w-full">Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default BookingModal;