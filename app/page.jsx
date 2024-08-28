"use client";
import TopElon from "@/components/TopElon";
import Categorys from "@/components/Categorys";
import Hero from "@/components/Hero";
import React, { useEffect, useState } from "react";
import InnerBg from "@/components/InnerBg";
import Tavfsiya from "@/components/Tavfsiya";

const Page = (params) => {
  const searchParams = params.searchParams.search || null;
  const [count, setCount] = useState();

  useEffect(() => {
    sessionStorage.setItem("referal", params.searchParams.search);
  }, [searchParams]);

  return (
    <>
      <Hero />
      {!searchParams && <Categorys />}
      <TopElon count={count} />
      {!searchParams && <InnerBg />}
      <Tavfsiya setCount={setCount} />
    </>
  );
};

export default Page;
