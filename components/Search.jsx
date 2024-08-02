"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Button from "./Button";
import { IoMdClose, IoMdSearch } from "react-icons/io";
import SearchImg from "@/assets/images/search.svg";

const Search = ({ setSearch, search1 }) => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    console.log(pathname);
  };
  useEffect(() => {
    setSearchValue(search1);
  }, [pathname]);

  const clearInput = () => {
    setSearchValue("");
    setSearch(""); // Clear search value in parent component when input is cleared
  };

  const handleSearchClick = () => {
    if (searchValue && pathname !== "/search") {
      // Redirect to /search page with the search query parameter
      router.push(`/search?search=${encodeURIComponent(searchValue)}`);
      setSearch(searchValue);
    } else {
      setSearch(searchValue);
    }
  };

  return (
    <div className="flex justify-between items-center h-[60px] relative w-full">
      <input
        type="text"
        className="border border-kulrang text-kulrang flex-grow rounded-[10px] h-10 pl-[50px] max-md:px-[15px] mr-5 bg-white"
        placeholder="Qidirish"
        value={searchValue}
        onChange={handleInputChange}
      />
      {searchValue && (
        <IoMdClose
          className="absolute right-[180px] top-[20px] max-md:top-[10px] max-md:right-7 text-xl text-qora cursor-pointer"
          onClick={clearInput}
        />
      )}

      <div className="w-[136px] h-10 max-md:hidden" onClick={handleSearchClick}>
        <Button main image={SearchImg} text="Qidirish" color="white" />
      </div>
    </div>
  );
};

export default Search;
