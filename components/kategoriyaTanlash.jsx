"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft } from "react-icons/fa";

const AddManzil = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isDistrictOpen, setIsDistrictOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredDistrict, setHoveredDistrict] = useState(null);
  const categoryRef = useRef(null);
  const districtRef = useRef(null);

  const categories = [
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

  const toggleDistrict = () => {
    setIsDistrictOpen(!isDistrictOpen);
  };

  const handleClickOutside = (event) => {
    if (categoryRef.current && !categoryRef.current.contains(event.target)) {
      setIsCategoryOpen(false);
    }
    if (districtRef.current && !districtRef.current.contains(event.target)) {
      setIsDistrictOpen(false);
    }
  };

  const handleCategoryChange = (event) => {
    const category = event.target.id;
    setSelectedCategory(category);
    setSelectedDistrict("");
    setIsCategoryOpen(false);
    setIsDistrictOpen(true);
  };

  const handleDistrictChange = (event) => {
    const district = event.target.id;
    setSelectedDistrict(district);
    setIsDistrictOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col relative mr-[10px] ">
      <h2 className="text-kulrang font-medium ml-[20px] mt-5 mb-2 text-sm">
        Kategoriyani tanlang
      </h2>
      <div className="flex flex-col border border-kulrangOch rounded-[10px]" ref={categoryRef}>
        <div
          className={`flex p-[10px] h-10 w-full rounded-[10px] justify-between items-center cursor-pointer bg-white`}
          onClick={toggleCategory}
        >
          <p className={`text-nowrap w-full pr-4 overflow-hidden text-qora font-medium`}>
            {selectedCategory}
          </p>
          <FaChevronLeft
            className={`text-qora transition-transform z-10 ${
              isCategoryOpen ? "rotate-90" : "-rotate-90"
            }`}
          />
        </div>
        {isCategoryOpen && (
          <div className="flex flex-col p-[10px] mt-2 rounded-[10px] absolute bg-white shadow-lg w-full top-[90px] z-10">
            {categories.map((category, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => setHoveredCategory(category)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <label className={`flex items-center mb-2 cursor-pointer`} htmlFor={category}>
                  <input
                    type="radio"
                    id={category}
                    name="category"
                    className="hidden"
                    checked={selectedCategory === category}
                    onChange={handleCategoryChange}
                  />
                  <p
                    className={`w-full px-4 py-2 rounded-md flex items-center justify-between ${
                      selectedCategory === category || hoveredCategory === category
                        ? "bg-ochKok text-qora font-medium"
                        : "text-kulrang"
                    }`}
                  >
                    {category}
                  </p>
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedCategory && (
        <div className="flex flex-col relative mr-[10px] mt-5">
          <h2 className="text-kulrang font-medium ml-[20px] mt-5 mb-2 text-sm">
            Tumanni tanlang
          </h2>
          <div className="flex flex-col" ref={districtRef}>
            <div
              className={`flex p-[10px] h-10 w-full rounded-[10px] justify-between items-center cursor-pointer bg-white`}
              onClick={toggleDistrict}
            >
              <p className={`text-nowrap w-full pr-4 overflow-hidden text-qora font-medium`}>
                {selectedDistrict}
              </p>
              <FaChevronLeft
                className={`text-qora transition-transform z-10 ${
                  isDistrictOpen ? "rotate-90" : "-rotate-90"
                }`}
              />
            </div>
            {isDistrictOpen && (
              <div className="flex flex-col p-[10px] mt-2 rounded-[10px] absolute bg-white shadow-lg w-full top-[90px] z-10">
                {districts[selectedCategory].map((district, index) => (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => setHoveredDistrict(district)}
                    onMouseLeave={() => setHoveredDistrict(null)}
                  >
                    <label className={`flex items-center mb-2 cursor-pointer`} htmlFor={district}>
                      <input
                        type="radio"
                        id={district}
                        name="district"
                        className="hidden"
                        checked={selectedDistrict === district}
                        onChange={handleDistrictChange}
                      />
                      <p
                        className={`w-full px-4 py-2 rounded-md flex items-center justify-between ${
                          selectedDistrict === district || hoveredDistrict === district
                            ? "bg-ochKok text-qora font-medium"
                            : "text-kulrang"
                        }`}
                      >
                        {district}
                      </p>
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddManzil;
