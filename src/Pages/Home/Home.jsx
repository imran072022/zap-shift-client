import React from "react";
import Banner from "./Banner";
import HowItWorks from "./HowItWorks";
import OurServices from "./OurServices";
import SalesTeam from "./SalesTeam";
import Reviews from "./Reviews/Reviews";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <HowItWorks></HowItWorks>
      <OurServices></OurServices>
      <SalesTeam></SalesTeam>
      <Reviews></Reviews>
    </div>
  );
};

export default Home;
