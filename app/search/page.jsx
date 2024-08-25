"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import Filter from "@/components/Filter";
import Search from "@/components/Search";
import Tavfsiya from "@/components/Tavfsiya";
import TopElon from "@/components/TopElon";
import React from "react";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const [ads, setAds] = useState([]);
  const category = searchParams.get("category") || "";
  const [search, setSearch] = useState("");
  const [adType, setAdType] = useState("");
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [minRoom, setMinRoom] = useState("");
  const [maxRoom, setMaxRoom] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const search1 = searchParams.get("search");
  return (
    <>
      <div className="container pt-[50px] max-md:pt-[30px]">
        <div className="flex md:flex-col md:bg-[#ffffffd8] rounded-2xl p-5 max-md:p-0 max-md:items-center">
          <Search setSearch={setSearch} search1={search1} />
          <Filter
            setAdType={setAdType}
            setRegion={setRegion}
            setDistrict={setDistrict}
            setMinRoom={setMinRoom}
            setMaxRoom={setMaxRoom}
            setPriceMin={setPriceMin}
            setPriceMax={setPriceMax}
          />
        </div>
      </div>
      <TopElon category={category} search={search || search1} />
      <Tavfsiya category={category} search={search || search1} />
    </>
  );
};

export default SearchPage;
