import TopElon from "@/components/TopElon";
import Categorys from "@/components/Categorys";
import Hero from "@/components/Hero";
import React from "react";
import InnerBg from "@/components/InnerBg";
import Tavfsiya from "@/components/Tavfsiya";
import 'leaflet/dist/leaflet.css';
const page = () => {
  return (
    <>
      <Hero />
      <Categorys />
      <TopElon />
      <InnerBg />
      <Tavfsiya />
    </>
  );
};

export default page;
