"use client";
import TopElon from "@/components/TopElon";
import Categorys from "@/components/Categorys";
import Hero from "@/components/Hero";
import React, { useEffect, useState } from "react";
import InnerBg from "@/components/InnerBg";
import Tavfsiya from "@/components/Tavfsiya";
import { useSearchParams } from "next/navigation";

const Page = (params) => {
  const searchParams = params.searchParams.search || null;
  const [count, setCount] = useState();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const entries = [...params.entries()];

      if (entries.length > 0) {
        sessionStorage.setItem("referal", entries[0][0]);
      }
    }
  }, []);

  useEffect(() => {
    const gtagScript1 = document.createElement("script");
    gtagScript1.src =
      "https://www.googletagmanager.com/gtag/js?id=AW-16740535290";
    gtagScript1.async = true;
    document.head.appendChild(gtagScript1);

    const gtagInitScript1 = document.createElement("script");
    gtagInitScript1.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'AW-16740535290');
    `;
    document.head.appendChild(gtagInitScript1);

    const gtagScript2 = document.createElement("script");
    gtagScript2.src =
      "https://www.googletagmanager.com/gtag/js?id=G-MR794LVBPZ";
    gtagScript2.async = true;
    document.head.appendChild(gtagScript2);

    const gtagInitScript2 = document.createElement("script");
    gtagInitScript2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-MR794LVBPZ');
    `;
    document.head.appendChild(gtagInitScript2);

    return () => {
      document.head.removeChild(gtagScript1);
      document.head.removeChild(gtagInitScript1);
      document.head.removeChild(gtagScript2);
      document.head.removeChild(gtagInitScript2);
    };
  }, []);

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
