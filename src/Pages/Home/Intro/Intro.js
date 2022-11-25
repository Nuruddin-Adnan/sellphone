import React from 'react';
import icon1 from '../../../assets/images/icon/icon1.png';
import icon2 from '../../../assets/images/icon/icon2.png';
import icon3 from '../../../assets/images/icon/icon3.png';
import icon4 from '../../../assets/images/icon/icon4.png';

const Intro = () => {
    return (
        <section>
            <div className="container">
                <div className="grid place-items-center  xl:grid-cols-4 md:grid-cols-2">
                    <div className='flex items-center border p-5 w-full'>
                        <img src={icon1} className='max-w-full' alt="icon" />
                        <div className='ml-3'>
                            <h3 className='text-md font-bold'> FREE DELIVERY </h3>
                            <p> For all oders over $120 </p>
                        </div>
                    </div>
                    <div className='flex items-center border p-5 w-full'>
                        <img src={icon2} className='max-w-full' alt="icon" />
                        <div className='ml-3'>
                            <h3 className='text-md font-bold'> SAFE PAYMENT </h3>
                            <p> 100% secure payment </p>
                        </div>
                    </div>
                    <div className='flex items-center border p-5 w-full'>
                        <img src={icon3} className='max-w-full' alt="icon" />
                        <div className='ml-3'>
                            <h3 className='text-md font-bold'> SHOP WITH CONFIDENCE </h3>
                            <p> If goods have problems </p>
                        </div>
                    </div>
                    <div className='flex items-center border p-5 w-full'>
                        <img src={icon4} className='max-w-full' alt="icon" />
                        <div className='ml-3'>
                            <h3 className='text-md font-bold'> 24/7 HELP CENTER </h3>
                            <p> Dedicated 24/7 support </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Intro;