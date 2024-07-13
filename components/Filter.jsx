"use client";
import React, { useState } from "react";
import CategorySelect from "./CategorySelect";
import ManzilSelect from "./ManzilSelect";
import XonaSelect from "./XonaSelect";
import NarxSelect from "./NarxSelect";
import Button from "./Button";
import FilterImg from "@/assets/images/filter.svg";

const Filter = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.id);
  };

  return (
    <div className="flex flex-col">
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
      <div className="flex">
        <CategorySelect />
        <ManzilSelect />
        <XonaSelect />
        <NarxSelect />
        <div className="w-[136px] h-10 mt-12 ml-4">
          <Button main image={FilterImg} text="Saralash" color="white" />
        </div>
      </div>
    </div>
  );
};

export default Filter;
