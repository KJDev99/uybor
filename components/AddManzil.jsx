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
    <div className="flex flex-col relative mr-[10px]">
      <h2 className="text-qora text-2xl font-semibold ml-[20px] mt-5 mb-2">
        Manzil
      </h2>
      <p className="text-sm text-kulrang mb-2 ml-[20px]">
        Manzilni qo’lda yozing yoki xaritadan belgilang
      </p>
      <div className="flex gap-5" ref={categoryRef}>
        <div
          className={`flex p-[10px] h-10 w-1/2 rounded-[10px] justify-between items-center cursor-pointer bg-white border border-kulrangOch`}
          onClick={toggleCategory}
        >
          <p
            className={`text-nowrap w-1/2 pr-4 overflow-hidden text-qora font-medium`}
          >
            {selectedCategory}
          </p>
          <FaChevronLeft
            className={`text-qora transition-transform z-10 ${
              isCategoryOpen ? "rotate-90" : "-rotate-90"
            }`}
          />
        </div>
        {isCategoryOpen && (
          <div className="flex flex-col p-[10px] mt-2 rounded-[10px] absolute bg-white shadow-lg w-1/2 top-[90px] z-10">
            {categories.map((category, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => setHoveredCategory(category)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <label
                  className={`flex items-center mb-2 cursor-pointer`}
                  htmlFor={category}
                >
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
                      selectedCategory === category ||
                      hoveredCategory === category
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
        {selectedCategory && (
          <div className="flex relative mr-[10px] w-1/2 border border-kulrangOch rounded-[10px]">
            <div className="flex flex-col w-full" ref={districtRef}>
              <div
                className={`flex p-[10px] h-10 w-full rounded-[10px] justify-between items-center cursor-pointer bg-white`}
                onClick={toggleDistrict}
              >
                <p
                  className={`text-nowrap w-full pr-4 overflow-hidden text-qora font-medium`}
                >
                  {selectedDistrict}
                </p>
                <FaChevronLeft
                  className={`text-qora transition-transform z-10 ${
                    isDistrictOpen ? "rotate-90" : "-rotate-90"
                  }`}
                />
              </div>
              {isDistrictOpen && (
                <div className="flex flex-col p-[10px] mt-2 rounded-[10px] absolute bg-white shadow-lg w-full top-[40px] z-10">
                  {districts[selectedCategory].map((district, index) => (
                    <div
                      key={index}
                      className="relative"
                      onMouseEnter={() => setHoveredDistrict(district)}
                      onMouseLeave={() => setHoveredDistrict(null)}
                    >
                      <label
                        className={`flex items-center mb-2 cursor-pointer`}
                        htmlFor={district}
                      >
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
                            selectedDistrict === district ||
                            hoveredDistrict === district
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
      <input
        type="text"
        className="mb-5 mt-[10px] outline-none pr-4 overflow-hidden text-qora font-medium flex p-[10px] h-10 w-full rounded-[10px] justify-between items-center cursor-pointer border border-yozish"
      />
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24537.891990688517!2d64.43917506583864!3d39.756798174628564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f5005d07f3e5d61%3A0x23e40e8c2b477b21!2sTURON%20PLAZA!5e0!3m2!1sru!2s!4v1721148984897!5m2!1sru!2s"
        width="100%"
        height="413"
        loading="lazy"
        className="mb-5 rounded-[10px] border-none outline-none"
      ></iframe>
    </div>
  );
};

export default AddManzil;
