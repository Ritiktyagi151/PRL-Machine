import React from "react";
import HeroSection from "./HeroSection";
import About from "../Home/About";
import { div } from "framer-motion/client";
import { ImOpt } from "react-icons/im";
import ProductShowcase from "./ProductShowcase";
import TestimonialSlider from "./Testimonial";
import WhyChooseUs from "./WhyChooseUs";
// import MachineSlider from "./Sliderbanner";
import TeamSection from "./Our-leadership";
import ValuedClients from "./Our-Clients";
import NewsletterSection from "./NewsLetter";
import FeaturesSection from "./Feature";
// import BannerSlider from "./Images-sliders";
import VideoHeroWithSlider from "./Homepagevideo";

import OurCustomers from "./TrustedSlider";
import OurPartners from "./TrustedSlider";
import PRL_Journey from "./Our-journey";
import Journey from "./Jouney";
import EnquiryForm from "../../components/EnquiryForm";

const Home = () => {
  return (
    <div>
      <EnquiryForm />
      {/* <MachineSlider /> */}
      <VideoHeroWithSlider />
      <About />
      <ProductShowcase />
      <PRL_Journey />
      {/* <Journey /> */}
      {/* <BannerSlider /> */}
      <HeroSection />
      <OurPartners />
      {/* <OurCustomers /> */}
      <TestimonialSlider />
      <WhyChooseUs />
      <FeaturesSection />
      <TeamSection />
      <ValuedClients />
      <NewsletterSection />
    </div>
  );
};

export default Home;
