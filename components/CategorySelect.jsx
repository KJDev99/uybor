"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft } from "react-icons/fa6";

const CategorySelect = ({setSeachQuery}) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const categoryRef = useRef(null);

  const toggleCategory = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const handleClickOutside = (event) => {
    if (categoryRef.current && !categoryRef.current.contains(event.target)) {
      setIsCategoryOpen(false);
    }
  };

  const handleCheckboxChange = (event) => {
    const category = event.target.id;
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const displaySelectedCategories = () => {
    // setSearchQuery(prevQuery => ({ ...prevQuery, category: selectedCategories.join(", ")}));
    if (selectedCategories.length === 0) {
      return "Hammasi";
    } else if (selectedCategories.length <= 1) {
      return selectedCategories.join(", ");
    } else {
      return selectedCategories.slice(0, 1).join(", ") + ", ...";
    }
  };

  return (
    <div className="flex flex-col relative mr-[10px]">
      <h2 className="text-qora font-medium ml-[10px] mt-5 mb-1">Kategoriya</h2>
      <div className="flex flex-col" ref={categoryRef}>
        <div
          className={`flex p-[10px] h-10 w-[200px] max-md:w-full rounded-[10px] justify-between items-center  cursor-pointer ${
            selectedCategories.length !== 0
              ? "bg-ochKok"
              : "border border-kulrang"
          }`}
          onClick={toggleCategory}
        >
          <p
            className={`text-nowrap w-[150px] pr-4  overflow-hidden ${
              selectedCategories.length !== 0
                ? "text-qora font-medium "
                : "text-kulrang "
            }`}
          >
            {displaySelectedCategories()}
          </p>
          <FaChevronLeft
            className={`text-qora transition-transform z-10 ${
              isCategoryOpen ? "rotate-90" : "-rotate-90"
            }`}
          />
        </div>
        {isCategoryOpen && (
          <div className="flex flex-col p-[10px] mt-2 rounded-[10px] absolute bg-white shadow-lg w-[280px] max-md:w-full top-[90px] z-[11]">
            {[
              "Kvartiralar",
              "Xovlilar",
              "Do'konlar",
              "Ofislar",
              "Mehmonxona va dachalar",
            ].map((category, index) => (
              <label
                key={index}
                className={`flex items-center mb-2`}
                htmlFor={category}
              >
                <input
                  type="checkbox"
                  id={category}
                  className={`w-7 h-7 mr-2 rounded`}
                  checked={selectedCategories.includes(category)}
                  onChange={handleCheckboxChange}
                />
                <p
                  className={`w-full px-4 rounded-md ${
                    selectedCategories.includes(category)
                      ? "bg-ochKok text-qora font-medium"
                      : "text-kulrang"
                  }`}
                >
                  {category}
                </p>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySelect;
