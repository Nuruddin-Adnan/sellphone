import React from 'react';

const Newsletter = () => {
    return (
        <div>
            <div className="hero " style={{ backgroundImage: `url("https://png.pngtree.com/thumb_back/fh260/background/20190813/pngtree-digital-technology-blue-background-banner-image_298195.jpg")` }} >
                <div className="hero-overlay opacity-0"></div>
                <div className="hero-content text-center text-neutral-content lg:py-20 py-10">
                    <div className="max-w-md">
                        <h2 className="mb-5 lg:text-5xl text-3xl font-bold">Join Our Newsletter Now</h2>
                        <p className="mb-5">You may unsubscribe at any moment. For that purpose, please find our contact info in the legal notice.</p>
                        <form className="form-control">
                            <label className="input-group text-base-content">
                                <input type="email" placeholder="info@site.com" className="input w-full input-bordered" />
                                <button className='btn btn-blue'>Email</button>
                            </label>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;