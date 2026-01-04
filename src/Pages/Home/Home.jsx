import React from "react";
import Banner from "./Banner";
import HowItWorks from "./HowItWorks";
import OurServices from "./OurServices";
import SalesTeam from "./SalesTeam";
import Reviews from "./Reviews/Reviews";
import Features from "./Features";
import SecondBanner from "./secondBanner";
import FAQ from "./FAQ";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <HowItWorks></HowItWorks>
      <OurServices></OurServices>
      <SalesTeam></SalesTeam>
      <Features></Features>
      <SecondBanner></SecondBanner>
      <Reviews></Reviews>
      <FAQ></FAQ>
    </div>
  );
};

export default Home;
