"use client";
import TopElon from "@/components/TopElon";
import Categorys from "@/components/Categorys";
import Hero from "@/components/Hero";
import React, { useState } from "react";
import InnerBg from "@/components/InnerBg";
import Tavfsiya from "@/components/Tavfsiya";
import "leaflet/dist/leaflet.css";
import { useSearchParams } from "next/navigation";
const page = () => {
  const searchParams = useSearchParams();
  const [count, setCount] = useState();
  // console.log(String(searchParams).slice(0, String(searchParams).length - 1));
  sessionStorage.setItem(
    "referal",
    String(searchParams).slice(0, String(searchParams).length - 1)
  );
  return (
    <>
      <Hero />
      {searchParams == "" && <Categorys />}
      <TopElon count={count} />
      {searchParams == "" && <InnerBg />}
      <Tavfsiya setCount={setCount} />
    </>
  );
};

export default page;
