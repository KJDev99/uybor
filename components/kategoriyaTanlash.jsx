"use client";
import { useState, useEffect, useRef } from "react";
import { FaChevronLeft } from "react-icons/fa";

const KategoriyaTanlash = ({ categories, heading }) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const categoryRef = useRef(null);

  const toggleCategory = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const handleClickOutside = (event) => {
    if (categoryRef.current && !categoryRef.current.contains(event.target)) {
      setIsCategoryOpen(false);
    }
  };

  const handleCategoryChange = (event) => {
    const category = event.target.id;
    setSelectedCategory(category);
    setIsCategoryOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col relative mr-[10px]">
      <h2 className="text-kulrang font-medium ml-[20px] mt-5 mb-2 text-sm">
        {heading}
      </h2>
      <div
        className="flex flex-col border border-kulrangOch rounded-[10px]"
        ref={categoryRef}
      >
        <div
          className={`flex p-[10px] h-10 w-full rounded-[10px] justify-between items-center cursor-pointer bg-white`}
          onClick={toggleCategory}
        >
          <p
            className={`text-nowrap w-full pr-4 overflow-hidden text-qora font-medium`}
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
          <div className="flex flex-col p-[10px] mt-2 rounded-[10px] absolute bg-white shadow-lg w-full top-[90px] z-20">
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
      </div>
    </div>
  );
};

export default KategoriyaTanlash;
