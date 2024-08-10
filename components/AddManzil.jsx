"use client";
import api from "@/lib/api";
import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft } from "react-icons/fa";

const AddManzil = ({ formData, setFormData, value }) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isDistrictOpen, setIsDistrictOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredDistrict, setHoveredDistrict] = useState(null);
  const categoryRef = useRef(null);
  const districtRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [districts, setDistricts] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/api/v1/region");
        setCategories(response.data); // Assuming response.data is an array of categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedCategory) {
        try {
          const response = await api.get(
            `/api/v1/district?region=${selectedCategory}`
          );
          setDistricts({
            [selectedCategory]: response.data, // Assuming response.data is an array of districts
          });
        } catch (error) {
          console.error("Error fetching districts:", error);
        }
      }
    };

    fetchDistricts();
  }, [selectedCategory]);

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
    setFormData({ ...formData, region: category });
  };

  const handleDistrictChange = (event) => {
    const district = event.target.id;
    setSelectedDistrict(district);
    setIsDistrictOpen(false);

    for (let i = 0; i < districts[selectedCategory].length; i++) {
      if (districts[selectedCategory][i].name_uz == district) {
        setFormData((prevData) => ({
          ...prevData,
          district: districts[selectedCategory][i].id,
        }));
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddressChange = (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      adress: value,
    }));
  };

  return (
    <div className="flex flex-col relative mr-[10px]">
      <h2 className="text-qora text-2xl font-semibold ml-[20px] mt-5 mb-2 max-md:ml-0 max-md:text-[16px] max-md:mb-1">
        Manzil
      </h2>
      <p className="text-sm text-kulrang mb-2 ml-[20px] max-md:ml-0">
        Manzilni qo’lda yozing yoki xaritadan belgilang
      </p>
      <div className="flex gap-5 max-md:flex-col" ref={categoryRef}>
        <div
          className={`flex p-[10px] h-10 w-1/2 max-md:w-full rounded-[10px] justify-between items-center cursor-pointer bg-white border border-kulrangOch`}
          onClick={toggleCategory}
        >
          <p
            className={`text-nowrap w-1/2 pr-4 overflow-hidden text-qora font-medium`}
          >
            {categories[selectedCategory - 3]?.name_uz}
          </p>
          <FaChevronLeft
            className={`text-qora transition-transform z-10 ${
              isCategoryOpen ? "rotate-90" : "-rotate-90"
            }`}
          />
        </div>
        {isCategoryOpen && (
          <div className="flex flex-col p-[10px] mt-2 rounded-[10px] absolute bg-white shadow-lg w-1/2 max-md:w-full top-[90px] z-[11]">
            {categories.map((category, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <label
                  className={`flex items-center mb-2 cursor-pointer`}
                  htmlFor={category.id}
                >
                  <input
                    type="radio"
                    id={category.id}
                    name="category"
                    className="hidden"
                    checked={selectedCategory === category.id}
                    onChange={handleCategoryChange}
                  />
                  <p
                    className={`w-full px-4 py-2 rounded-md flex items-center justify-between ${
                      selectedCategory === category.name_uz ||
                      hoveredCategory === category.id
                        ? "bg-ochKok text-qora font-medium"
                        : "text-kulrang"
                    }`}
                  >
                    {category.name_uz}
                  </p>
                </label>
              </div>
            ))}
          </div>
        )}
        {selectedCategory && (
          <div className="flex relative mr-[10px] w-1/2 max-md:w-full  border border-kulrangOch rounded-[10px]">
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
                  {(districts[selectedCategory] || []).map(
                    (district, index) => (
                      <div
                        key={index}
                        className="relative"
                        onMouseEnter={() =>
                          setHoveredDistrict(district.name_uz)
                        }
                        onMouseLeave={() => setHoveredDistrict(null)}
                      >
                        <label
                          className={`flex items-center mb-2 cursor-pointer`}
                          htmlFor={district.name_uz}
                        >
                          <input
                            type="radio"
                            id={district.name_uz}
                            name="district"
                            className="hidden"
                            checked={selectedDistrict === district.name_uz}
                            onChange={handleDistrictChange}
                          />
                          <p
                            className={`w-full px-4 py-2 rounded-md flex items-center justify-between ${
                              selectedDistrict === district.name_uz ||
                              hoveredDistrict === district.name_uz
                                ? "bg-ochKok text-qora font-medium"
                                : "text-kulrang"
                            }`}
                          >
                            {district.name_uz}
                          </p>
                        </label>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <input
        type="text"
        value={formData?.adress}
        onChange={handleAddressChange}
        className="mb-5 mt-[10px] outline-none pr-4 overflow-hidden text-qora font-medium flex p-[10px] h-10 w-full rounded-[10px] justify-between items-center cursor-pointer border border-yozish"
      />
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24537.891990688517!2d64.43917506583864!3d39.756798174628564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f5005d07f3e5d61%3A0x23e40e8c2b477b21!2sTURON%20PLAZA!5e0!3m2!1sru!2s!4v1721148984897!5m2!1sru!2s"
        loading="lazy"
        className="mb-5 rounded-[10px] border-none outline-none h-[380px] w-full max-md:h-[335px]"
      ></iframe>
    </div>
  );
};

export default AddManzil;
