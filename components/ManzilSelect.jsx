"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import api from "@/lib/api";
import { useTranslation } from "react-i18next";

const ManzilSelect = ({ setRegion, setDistrict }) => {
  const { t } = useTranslation();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Hammasi");
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [districts, setDistricts] = useState({});
  const categoryRef = useRef(null);

  const language = localStorage.getItem("language");

  // Fetch categories from backend
  const fetchCategories = async () => {
    try {
      const response = await api.get("/api/v1/region");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch districts for a specific region from backend
  const fetchDistricts = async (regionId) => {
    try {
      const response = await api.get(`/api/v1/district?region=${regionId}`);
      setDistricts((prev) => ({ ...prev, [regionId]: response.data }));
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  // Handle category click to open districts dropdown
  const handleCategoryClick = (category) => {
    setHoveredCategory(category);
  };

  // Handle district click to set the selected category
  const handleDistrictClick = (district) => {
    setDistrict(district.id);
    setSelectedCategory(language == "uz" ? district.name_uz : district.name_ru);
    setIsCategoryOpen(false);
  };

  // Toggle the category dropdown
  const toggleCategory = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  // Close the category dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (categoryRef.current && !categoryRef.current.contains(event.target)) {
      setIsCategoryOpen(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (hoveredCategory) {
      const categoryId = hoveredCategory.id;
      if (!districts[categoryId]) {
        fetchDistricts(categoryId);
      }
    }
  }, [hoveredCategory]);

  const displaySelectedCategory = () => {
    return selectedCategory ? selectedCategory : "Hammasi";
  };

  return (
    <div className="flex flex-col relative mr-[10px]">
      <h2 className="text-qora font-medium ml-[10px] mt-5 mb-1">
        {t("filter5")}
      </h2>
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
            {categories.map((category) => (
              <div
                key={category.id}
                className="relative"
                onMouseEnter={() => setHoveredCategory(category)}
                onMouseLeave={() => setHoveredCategory(null)}
                onClick={() => handleCategoryClick(category)}
              >
                <p
                  className={`w-full px-4 py-2 rounded-md flex items-center justify-between cursor-pointer ${
                    hoveredCategory === category
                      ? "bg-ochKok text-qora font-medium"
                      : "text-kulrang"
                  }`}
                >
                  {/* {category.name_uz} */}
                  {language == "uz"
                    ? category.name_uz
                    : category.name_ru !== t("all") && (
                        <FaChevronLeft
                          className={`text-kulrang transition-transform z-10 ${
                            hoveredCategory === category
                              ? "rotate-[270deg]"
                              : "rotate-180"
                          }`}
                        />
                      )}
                </p>
                {hoveredCategory === category && districts[category.id] && (
                  <div className="absolute left-full top-0 mt-[-10px] bg-white w-[216px] max-md:w-[80%] shadow-lg p-[10px] rounded-[10px]">
                    {districts[category.id].map((district) => (
                      <div
                        key={district.id}
                        className="cursor-pointer text-kulrang hover:bg-ochKok hover:text-qora p-2 rounded-md"
                        onClick={() => handleDistrictClick(district)}
                      >
                        {language == "uz" ? district.name_uz : district.name_ru}
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
