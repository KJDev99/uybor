"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CategorySelect from "./CategorySelect";
import ManzilSelect from "./ManzilSelect";
import XonaSelect from "./XonaSelect";
import NarxSelect from "./NarxSelect";
import Button from "./Button";
import FilterImg from "@/assets/images/filter.svg";
import Image from "next/image";

const Filter = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [filterHidden, setFilterHidden] = useState(true);
  const [categories, setCategory] = useState("");
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [minRoom, setMinRoom] = useState("");
  const [maxRoom, setMaxRoom] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  const router = useRouter();

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.id);
  };

  const handleFilterClick = () => {
    const queryParams = new URLSearchParams();

    setFilterHidden(true);

    // Add filter parameters to query
    const categoryMap = {
      Kvartiralar: "APARTMENT",
      Xovlilar: "HOUSE",
      "Do'konlar": "SHOP",
      Ofislar: "OFFICE",
      "Mehmonxona va dachalar": "HOTEL",
    };

    // Handle categories
    if (Array.isArray(categories)) {
      categories.forEach((category) => {
        if (categoryMap[category]) {
          queryParams.append("category", categoryMap[category]);
        }
      });
    } else {
      // Single category case
      if (categoryMap[categories]) {
        queryParams.append("category", categoryMap[categories]);
      }
    }
    if (selectedOption)
      queryParams.append(
        "ad_type",
        selectedOption == "sotish" ? "SELL" : "RENT"
      );
    if (region) queryParams.append("region", region);
    if (district) queryParams.append("district", district);
    if (minRoom) queryParams.append("min_room", minRoom);
    if (maxRoom) queryParams.append("max_room", maxRoom);
    if (priceMin) queryParams.append("price_min", priceMin);
    if (priceMax) queryParams.append("price_max", priceMax);

    // Redirect to the search results page with query parameters
    router.push(`/?${queryParams.toString()}`);
  };

  return (
    <>
      <div
        className="!h-10 !w-10 flex items-center justify-center flex-shrink-0 bg-logoKok rounded-[10px] md:hidden cursor-pointer"
        onClick={() => setFilterHidden((prev) => !prev)}
      >
        <Image src={FilterImg} alt="Filter" />
      </div>
      <div
        className={`flex flex-col ${
          filterHidden
            ? "max-md:hidden"
            : "max-md:absolute max-md:top-[90px] max-md:bg-white max-md:p-[10px] max-md:left-0 max-md:w-[90%] max-md:translate-x-[5%] max-md:rounded-[10px] z-[11]"
        }`}
      >
        <form className="flex">
          <label htmlFor="sotish" className="flex items-center mr-4">
            <input
              type="radio"
              id="sotish"
              name="ijara"
              onChange={handleOptionChange}
            />
            <span
              className={`ml-2 text-lg font-medium ${
                selectedOption === "sotish" ? "text-logoKok" : "text-kulrang"
              }`}
            >
              Sotish
            </span>
          </label>
          <label htmlFor="ijara" className="flex items-center ml-[50px]">
            <input
              type="radio"
              id="ijara"
              name="ijara"
              onChange={handleOptionChange}
            />
            <span
              className={`ml-2 text-lg font-medium ${
                selectedOption === "ijara" ? "text-logoKok" : "text-kulrang"
              }`}
            >
              Ijara
            </span>
          </label>
        </form>
        <div className="flex max-md:flex-col">
          <CategorySelect setCategory={setCategory} />
          <ManzilSelect setRegion={setRegion} setDistrict={setDistrict} />
          <XonaSelect setMinRoom={setMinRoom} setMaxRoom={setMaxRoom} />
          <NarxSelect setPriceMin={setPriceMin} setPriceMax={setPriceMax} />
          <div
            className="w-[136px] h-10 mt-12 ml-4 max-md:hidden"
            onClick={handleFilterClick}
          >
            <Button main image={FilterImg} text="Saralash" color="white" />
          </div>
          <div
            className="w-full h-10 my-5 md:hidden"
            onClick={handleFilterClick}
          >
            <Button main text="Saralash" color="white" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
