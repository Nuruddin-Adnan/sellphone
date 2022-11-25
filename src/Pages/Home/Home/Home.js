import React from 'react';
import AdvertisedProducts from '../AdvertisedProducts/AdvertisedProducts';
import Banner from '../Banner/Banner';
import Categories from '../Categories/Categories';
import Intro from '../Intro/Intro';

const Home = () => {
    return (
        <main>
            <Banner></Banner>
            <Intro></Intro>
            <Categories></Categories>
            <AdvertisedProducts></AdvertisedProducts>
        </main>
    );
};

export default Home;