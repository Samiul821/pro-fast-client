import React from "react";
import Banner from "../Banner/Banner";
import ServicesSection from "../Services/ServicesSection";
import ClientSlider from "../ClientSlider/ClientSlider";
import BenefitsSection from "../BenefitsSection/BenefitsSection";
import BeMarchant from "../BeMarchant/BeMarchant";
import HowItWorksSection from "../HowItWorks/HowItWorksSection ";
import FAQSection from "../FAQ/FAQSection";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <HowItWorksSection></HowItWorksSection>
      <ServicesSection></ServicesSection>
      <ClientSlider></ClientSlider>
      <BenefitsSection></BenefitsSection>
      <BeMarchant></BeMarchant>
      <FAQSection></FAQSection>
    </div>
  );
};

export default Home;
