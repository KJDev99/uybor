'use client'
import TopElon from "@/components/TopElon";
import Categorys from "@/components/Categorys";
import Hero from "@/components/Hero";
import React, { useState } from "react";
import InnerBg from "@/components/InnerBg";
import Tavfsiya from "@/components/Tavfsiya";
import 'leaflet/dist/leaflet.css';
const page = () => {
  const [count, setCount] = useState()
  return (
    <>
      <Hero />
      <Categorys />
      <TopElon setCount={setCount} count={count}/>
      <InnerBg />
      <Tavfsiya setCount={setCount} count={count}/>
    </>
  );
};

export default page;
