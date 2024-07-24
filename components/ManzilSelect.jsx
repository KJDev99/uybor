"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft } from "react-icons/fa6";

const ManzilSelect = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Hammasi");
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const categoryRef = useRef(null);

  const categories = [
    "Hammasi",
    "Andijon",
    "Buxoro",
    "Fargʻona",
    "Jizzax",
    "Namangan",
    "Navoiy",
    "Qashqadaryo",
    "Qoraqalpogʻiston",
    "Samarqand",
    "Sirdaryo",
    "Surxondaryo",
    "Toshkent shahar",
    "Toshkent viloyati",
    "Xorazm",
  ];

  const districts = {
    Andijon: ["Andijon", "Asaka", "Xo'jaobod"],
    Buxoro: ["Buxoro", "Gʻijduvon", "Kogon"],
    Fargʻona: ["Fargʻona", "Quva", "Rishton"],
    Jizzax: ["Jizzax", "Forish", "Zafarobod"],
    Namangan: ["Namangan", "Chortoq", "Uychi"],
    Navoiy: ["Navoiy", "Konimex", "Karmana"],
    Qashqadaryo: ["Qarshi", "Shahrisabz", "Kitob"],
    Qoraqalpogʻiston: ["Nukus", "Mo'ynoq", "Xo'jayli"],
    Samarqand: ["Samarqand", "Bulungʻur", "Jomboy"],
    Sirdaryo: ["Guliston", "Sirdaryo", "Yangiyer"],
    Surxondaryo: ["Termiz", "Denov", "Shahrisabz"],
    "Toshkent shahar": ["Toshkent"],
    "Toshkent viloyati": [
      "Toshkent",
      "Bektemir",
      "Chirchiq",
      "Olmaliq",
      "Angren",
      "Yangiobod",
    ],
    Xorazm: ["Urganch", "Xiva", "Shovot"],
    Hammasi: [],
  };

  const toggleCategory = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const handleClickOutside = (event) => {
    if (categoryRef.current && !categoryRef.current.contains(event.target)) {
      setIsCategoryOpen(false);
    }
  };

  const handleDistrictClick = (district) => {
    setSelectedCategory(district);
    setIsCategoryOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const displaySelectedCategory = () => {
    return selectedCategory ? selectedCategory : "Hammasi";
  };

  return (
    <div className="flex flex-col relative mr-[10px]">
      <h2 className="text-qora font-medium ml-[10px] mt-5 mb-1">Manzil</h2>
      <div className="flex flex-col" ref={categoryRef}>
        <div
          className={`flex p-[10px] h-10 w-[200px] max-md:w-full rounded-[10px] justify-between items-center cursor-pointer ${
            displaySelectedCategory() !== "Hammasi"
              ? "bg-ochKok"
              : "border border-kulrang"
          }`}
          onClick={toggleCategory}
        >
          <p
            className={`text-nowrap w-[150px] max-md:w-full pr-4 overflow-hidden ${
              displaySelectedCategory() !== "Hammasi"
                ? "text-qora font-medium"
                : "text-kulrang"
            }`}
          >
            {displaySelectedCategory()}
          </p>
          <FaChevronLeft
            className={`text-qora transition-transform z-10 ${
              isCategoryOpen ? "rotate-90" : "-rotate-90"
            }`}
          />
        </div>
        {isCategoryOpen && (
          <div className="flex flex-col p-[10px] mt-2 rounded-[10px] absolute bg-white shadow-lg w-[216px] max-md:w-[60%] top-[90px] z-[11]">
            {categories.map((category, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => setHoveredCategory(category)}
                onMouseLeave={() => setHoveredCategory(null)}
                onClick={() => setHoveredCategory(category)}
              >
                <p
                  className={`w-full px-4 py-2 rounded-md flex items-center justify-between cursor-pointer ${
                    hoveredCategory === category
                      ? "bg-ochKok text-qora font-medium"
                      : "text-kulrang"
                  }`}
                >
                  {category}
                  {category !== "Hammasi" && (
                    <FaChevronLeft
                      className={`text-kulrang transition-transform z-10 rotate-180`}
                    />
                  )}
                </p>
                {(hoveredCategory === category) && districts[category] && (
                  <div className="absolute left-full top-0 mt-[-10px] bg-white w-[216px] max-md:w-[80%] shadow-lg p-[10px] rounded-[10px]">
                    {districts[category].map((district, idx) => (
                      <div
                        key={idx}
                        className="cursor-pointer text-kulrang hover:bg-ochKok hover:text-qora p-2 rounded-md"
                        onClick={() => handleDistrictClick(district)}
                      >
                        {district}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManzilSelect;
