"use client";
import React, { useState } from "react";
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
  const [seachQuery, setSeachQuery] = useState({
    category: "",
    address: "",
    min_room: "",
    max_room: "",
    price_min: "",
    price_max: "",
  });
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.id);
  };
  console.log(seachQuery);
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
          <CategorySelect setSeachQuery={setSeachQuery}/>
          <ManzilSelect />
          <XonaSelect />
          <NarxSelect />
          <div className="w-[136px] h-10 mt-12 ml-4 max-md:hidden">
            <Button main image={FilterImg} text="Saralash" color="white" />
          </div>
          <div className="w-full h-10 my-5 md:hidden">
            <Button main text="Saralash" color="white" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
