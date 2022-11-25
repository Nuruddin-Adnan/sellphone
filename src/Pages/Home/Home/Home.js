import React from 'react';
import AdvertisedProducts from '../AdvertisedProducts/AdvertisedProducts';
import Banner from '../Banner/Banner';
import Categories from '../Categories/Categories';
import Intro from '../Intro/Intro';
import LatestProducts from '../LatestProducts/LatestProducts';
import Newsletter from '../Newsletter/Newsletter';

const Home = () => {
    return (
        <main>
            <Banner></Banner>
            <Intro></Intro>
            <Categories></Categories>
            <AdvertisedProducts></AdvertisedProducts>
            <LatestProducts></LatestProducts>
            <Newsletter></Newsletter>
        </main>
    );
};

export default Home;