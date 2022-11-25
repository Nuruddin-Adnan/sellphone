import React from 'react';
import Banner from '../Banner/Banner';
import Categories from '../Categories/Categories';
import Intro from '../Intro/Intro';

const Home = () => {
    return (
        <main>
            <Banner></Banner>
            <Intro></Intro>
            <Categories></Categories>
        </main>
    );
};

export default Home;