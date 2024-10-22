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
      const entries = [...params.entries()]; // Barcha parametrlardan massiv yaratamiz

      if (entries.length > 0) {
        sessionStorage.setItem("referal", entries[0][0]);
      }
    }
  }, []);

  useEffect(() => {
    // Google Tag Manager and Analytics initialization
    const gtagScript = document.createElement("script");
    gtagScript.src =
      "https://www.googletagmanager.com/gtag/js?id=AW-16740535290";
    gtagScript.async = true;
    document.head.appendChild(gtagScript);

    const gtagInitScript = document.createElement("script");
    gtagInitScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'AW-16740535290');
    `;
    document.head.appendChild(gtagInitScript);

    // Cleanup function to remove scripts on unmount
    return () => {
      document.head.removeChild(gtagScript);
      document.head.removeChild(gtagInitScript);
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
