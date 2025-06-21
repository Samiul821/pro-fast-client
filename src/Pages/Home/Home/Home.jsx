import React from 'react';
import Banner from '../Banner/Banner';
import ServicesSection from '../Services/ServicesSection';
import ClientSlider from '../ClientSlider/ClientSlider';
import BenefitsSection from '../BenefitsSection/BenefitsSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <ServicesSection></ServicesSection>
            <ClientSlider></ClientSlider>
            <BenefitsSection></BenefitsSection>
        </div>
    );
};

export default Home;