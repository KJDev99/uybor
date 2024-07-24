"use client";
import React, { useState } from "react";
import Button from "./Button";
import { IoMdClose, IoMdSearch  } from "react-icons/io";
import SearchImg from "@/assets/images/search.svg";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const clearInput = () => {
    setSearchValue("");
  };

  return (
    <div className="flex justify-between h-[60px] relative w-full ">
      <input
        type="text"
        className="border border-kulrang text-kulrang flex-grow rounded-[10px] h-10 pl-[50px] max-md:px-[15px] mr-5 bg-white"
        placeholder="Qidirish"
        value={searchValue}
        onChange={handleInputChange}
      />
      {searchValue && (
        <IoMdClose
          className="absolute right-[176px] top-[12px] max-md:top-[10px] max-md:right-7 text-xl text-qora cursor-pointer"
          onClick={clearInput}
        />
      )}
      {!searchValue && (
        <IoMdSearch 
          className="absolute right-[176px] top-[12px] max-md:top-[10px] max-md:right-7 text-xl text-qora cursor-pointer"
          onClick={clearInput}
        />
      )}
      <div className="w-[136px] h-10 max-md:hidden">
        <Button
          main
          image={SearchImg}
          text="E’lon&nbsp;joylash"
          color="white"
        />
      </div>
    </div>
  );
};

export default Search;
