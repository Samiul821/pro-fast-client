import React from 'react';
import Banner from '../Banner/Banner';
import ServicesSection from '../Services/ServicesSection';
import ClientSlider from '../ClientSlider/ClientSlider';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <ServicesSection></ServicesSection>
            <ClientSlider></ClientSlider>
        </div>
    );
};

export default Home;