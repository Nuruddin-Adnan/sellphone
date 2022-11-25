import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../../contexts/AuthProvider';
import useToken from '../../../hooks/useToken';
import { BiMobileVibration } from 'react-icons/bi';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { signIn, googleSignIn, passwordReset, notify } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');

    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);

    const [email, setEmail] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    let from = location.state?.from?.pathname || "/";

    if (token) {
        navigate(from, { replace: true });
    }

    const handleLogin = data => {
        setLoginError('');
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                if (user) {
                    notify('Login successfull');
                    reset({ data: '' });
                    setLoginUserEmail(user.email);
                }
            })
            .catch(error => setLoginError(error.message))
    }

    const handleGoogleSignIn = () => {
        setLoginError('');
        googleSignIn()
            .then(result => {
                const user = result.user;
                // if (user) {
                //     fetch(`http://localhost:5000/users?email=${user.email}`)
                //         .then(res => res.json())
                //         .then(data => {
                //             if (data.length === 0) {
                //                 saveUser(user.displayName, user.email);
                //             }
                //             else {
                //                 notify('Login successfull');
                //                 setLoginUserEmail(user.email);
                //             }
                //         })

                // }
            })
            .catch(error => setLoginError(error.message))
    }


    // save user data to database
    const saveUser = (name, email) => {
        const createdAt = new Date();
        const user = { name, email, createdAt };
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
                    notify('Login successfull');
                    reset({ data: '' })
                    setLoginUserEmail(user.email);
                }
            })
    }

    const handleSetEmail = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordReset = () => {
        setLoginError('');
        passwordReset(email)
            .then(() => {
                notify('password reset email send to your email. Please check and reset password');
            })
            .catch(error => setLoginError(error.message))
    }




    return (
        <section className='lg:py-20 py-10'>
            <div className="container">
                <Link to='/' className='text-xl flex justify-center font-bold text-blue mb-10'>
                    <BiMobileVibration className='text-2xl mr-2'></BiMobileVibration> SellPhone
                </Link>
                <div className="card max-w-sm mx-auto shadow-xl">
                    <div className="card-body">
                        <h3 className="card-title justify-center">Login</h3>
                        {
                            loginError &&
                            <div className="alert alert-error shadow-lg">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>{loginError}</span>
                                </div>
                            </div>
                        }
                        <form onSubmit={handleSubmit(handleLogin)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email"
                                    {...register("email", {
                                        required: 'Email field is required'
                                    })}
                                    onBlur={handleSetEmail}
                                    placeholder="email" className="input input-bordered" />
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
                                <input type="password" {...register("password",
                                    {
                                        required: 'Password field is required',
                                        minLength: { value: 6, message: 'password must be 6 character or more' }
                                    })} placeholder="password" className="input input-bordered" />
                                {
                                    errors.password &&
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.password?.message}</span>
                                    </label>
                                }
                                <label className="label">
                                    <button type='button' onClick={handlePasswordReset} className="label-text-alt link link-hover">Forgot password?</button>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button type='submit' className="btn btn-blue">Login</button>
                            </div>
                        </form>
                        <p className='text-center text-sm'>New to SellPhone? <Link to='/signup' className='text-blue'>Create new account</Link></p>
                        <div className='divider'>OR</div>
                        <button onClick={handleGoogleSignIn} className='btn btn-outline w-full'> <FcGoogle className='mr-2 w-6 h-6 rounded-full bg-white'></FcGoogle>   CONTINUE WITH GOOGLE</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;