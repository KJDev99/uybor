"use client";
import AddNarx from "@/components/AddNarx";
import KategoriyaTanlash from "@/components/kategoriyaTanlash";
import SarlavhaKiritish from "@/components/SarlavhaKiritish";
import AddManzil from "@/components/AddManzil";
import React, { useState } from "react";

const page = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.id);
  };
  return (
    <div className="container">
      <h1 className="mt-10 text-qora text-3xl font-semibold">
        E’lon joylashtirish
      </h1>
      <div className="px-5">
        <h2 className="font-semibold text-2xl text-qora my-5 ">
          E’loningiz haqida ma’lumot bering
        </h2>
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
              Sotish uchun
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
              Ijaraga berish uchun
            </span>
          </label>
        </form>
        <div className="w-1/2 my-5">
          <KategoriyaTanlash />
        </div>
        <div className="w-1/2">
          <SarlavhaKiritish />
        </div>
        <div className="w-1/2">
          <AddNarx />
        </div>
        <div className="w-3/4">
          <AddManzil />
        </div>
      </div>
    </div>
  );
};

export default page;
