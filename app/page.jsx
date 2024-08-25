"use client";
import TopElon from "@/components/TopElon";
import Categorys from "@/components/Categorys";
import Hero from "@/components/Hero";
import React, { useEffect, useState } from "react";
import InnerBg from "@/components/InnerBg";
import Tavfsiya from "@/components/Tavfsiya";
import { useSearchParams } from "next/navigation";
const page = () => {
  const searchParams = useSearchParams();
  const [count, setCount] = useState();

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
