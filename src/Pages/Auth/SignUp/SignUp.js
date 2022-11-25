import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import useToken from '../../../hooks/useToken';
import { BiMobileVibration } from 'react-icons/bi';
import toast from 'react-hot-toast';
import { PreloaderContext } from '../../../contexts/PreloaderProvider/PreloaderProvider';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { notify, createUser, updateUserProfile } = useContext(AuthContext);
    const { setPreloader } = useContext(PreloaderContext);
    const [signUpError, setSignUpError] = useState('');
    const [createdUserEmail, setCreatedUserEmail] = useState('')
    const [token] = useToken(createdUserEmail);
    const navigate = useNavigate();
    const location = useLocation();

    const imageHostKey = process.env.REACT_APP_imgbb_Key;

    let from = location.state?.from?.pathname || "/";

    if (token) {
        navigate(from, { replace: true })
    }

    const hangleSignup = data => {
        setSignUpError('');
        setPreloader(true);

        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                if (user) {
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
                                const userInfo = {
                                    displayName: data.name,
                                    photoURL: imgData.data.url
                                }
                                updateUserProfile(userInfo)
                                    .then(() => {
                                        saveUser(user.displayName, user.email, data.role, imgData.data.url);
                                    }).catch(error => setSignUpError(error.message))
                            } else {
                                toast.error('something went wrong')
                            }
                        })
                }
            })
            .catch(error => setSignUpError(error.message))
    }

    // save user data to database
    const saveUser = (name, email, role, photoURL) => {
        const createdAt = new Date();
        const user = { name, email, role, photoURL, createdAt };
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    notify('user create successfully')
                    setPreloader(false)
                    setCreatedUserEmail(email)
                    document.getElementById('signUpForm').reset();
                }
            })
    }

    return (
        <section className='lg:py-20 py-10'>
            <div className="container">
                <Link to='/' className='text-xl flex justify-center font-bold text-blue mb-10'>
                    <BiMobileVibration className='text-2xl mr-2'></BiMobileVibration> SellPhone
                </Link>
                <div className="card max-w-sm mx-auto shadow-xl">
                    <div className="card-body">
                        <h3 className="card-title justify-center">Signup</h3>
                        <form id="signUpForm" onSubmit={handleSubmit(hangleSignup)}>
                            {
                                signUpError &&
                                <div className="alert alert-error shadow-lg">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        <span>{signUpError}</span>
                                    </div>
                                </div>
                            }
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="your name" className="input input-bordered" {...register("name", {
                                    required: 'Name field is required'
                                })} />
                                {
                                    errors.name &&
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.name?.message}</span>
                                    </label>
                                }
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" {...register("email", { required: 'Email field is required' })} />
                                {
                                    errors.email &&
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.email?.message}</span>
                                    </label>
                                }
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" {...register("password", {
                                    required: 'Password field is required',
                                    minLength: { value: 6, message: 'Password must be 6 character or more' },
                                    // pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/, message: 'Password must be contains al least one Uppercase, one Lowercase, One special letter and one number' }
                                })} />
                                {
                                    errors.password &&
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.password?.message}</span>
                                    </label>
                                }
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Upload Profile Picture</span>
                                </label>
                                <input type="file" className="file-input file-input-bordered w-full" {...register("image", {
                                    required: 'Please chose an image'
                                })} />
                                {
                                    errors.image &&
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.image?.message}</span>
                                    </label>
                                }
                            </div>
                            <div className="form-control mt-3 grid grid-cols-2 gap-3">
                                <label className='flex items-center'>
                                    <input type="radio" defaultValue="user" name="role" className="radio radio-accent mr-2"  {...register("role")} defaultChecked />
                                    Default User
                                </label>
                                <label className='flex items-center'>
                                    <input type="radio" defaultValue="seller" name="role" className="radio radio-accent mr-2" {...register("role")} />
                                    Become a Seller
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button type='submit' className="btn btn-blue">Signup</button>
                            </div>
                        </form>
                        <p className='text-center text-sm'>Already have an account? <Link to='/login' className='text-blue'>Please Login</Link></p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignUp;