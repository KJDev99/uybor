"use client";
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronLeft } from "react-icons/fa6";

const AddNarx = ({ formData, setFormData, value }) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const categoryRef = useRef(null);

  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const { t } = useTranslation();
  const handleFromChange = (event) => {
    const inputValue = event.target.value;
    if (!isNaN(inputValue)) {
      setFormData({ ...formData, price: inputValue });
      setFromValue(inputValue);
    }
  };
  const [rate, setRate] = useState(null);
  useEffect(() => {
    const fetchRate = async () => {
      const storedRate = localStorage.getItem("currencyRate");
      if (storedRate) {
        setRate(JSON.parse(storedRate));
      } else {
        try {
          const response = await api.get(
            "https://cbu.uz/uz/arkhiv-kursov-valyut/json/USD/"
          );
          const newRate = response.data[0]?.Rate || 0;
          localStorage.setItem("currencyRate", JSON.stringify(newRate));
          setRate(newRate);
        } catch (error) {
          console.error("Error fetching currency rate:", error);
        }
      }
    };

    fetchRate();
  }, []);

  const categories = ["So'm", "Usd"];

  const toggleCategory = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const handleClickOutside = (event) => {
    if (categoryRef.current && !categoryRef.current.contains(event.target)) {
      setIsCategoryOpen(false);
    }
  };

  const handleRadioChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setIsCategoryOpen(false);
    // setFormData({...formData, "currency":category});
    if (category == "So'm")
      setFormData({ ...formData, currency: "UZS", price: fromValue });
    else if (category == "Usd")
      setFormData({ ...formData, currency: "UZS", price: fromValue * rate });
  };

  useEffect(() => {
    if (value) {
      setFromValue(value.price);
      setSelectedCategory(value.currency);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col relative mr-[10px]">
      <h2 className="text-kulrang font-medium ml-[20px] mt-5 mb-2 text-sm">
        {t("add8")}
      </h2>
      <div className="flex ">
        <input
          value={fromValue}
          onChange={handleFromChange}
          type="text"
          className="outline-none pr-4 overflow-hidden text-qora font-medium flex p-[10px] h-10 w-full rounded-[10px] justify-between items-center cursor-pointer border border-yozish"
        />
        <div className="flex flex-col ml-5" ref={categoryRef}>
          <div
            className={`flex p-[10px] h-10 w-[130px] rounded-[10px] justify-between items-center cursor-pointer  bg-yozish`}
            onClick={toggleCategory}
          >
            <p
              className={`text-nowrap w-[130px] pr-4 overflow-hidden text-qora font-medium `}
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
            <div className="flex flex-col p-[10px] mt-2 rounded-[10px] absolute bg-yozish  w-[130px] top-[90px] z-[11]">
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
                      value={category}
                      className="hidden"
                      checked={selectedCategory === category}
                      onChange={handleRadioChange}
                    />
                    <p
                      className={`w-[130px] px-4 py-2 rounded-md flex items-center justify-between ${
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
        </div>
      </div>
    </div>
  );
};

export default AddNarx;
