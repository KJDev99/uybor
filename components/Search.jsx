'use client'
import React, { useState } from "react";
import Button from "./Button";
import { IoMdClose } from "react-icons/io";
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
    <div className="flex justify-between h-[60px] relative">
      <input
        type="text"
        className="border border-kulrang text-kulrang flex-grow rounded-[10px] h-10 pl-[50px] mr-5 bg-white"
        placeholder="Qidirish"
        value={searchValue}
        onChange={handleInputChange}
      />
      {searchValue && (
        <IoMdClose
          className="absolute right-[176px] top-[12px] text-xl text-qora cursor-pointer"
          onClick={clearInput}
        />
      )}
      <div className="w-[136px] h-10">
        <Button main image={SearchImg} text="E’lon&nbsp;joylash" color="white" />
      </div>
    </div>
  );
};

export default Search;
