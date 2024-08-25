"use client";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronLeft } from "react-icons/fa";

const KategoriyaTanlash = ({
  categories,
  heading,
  setFormData,
  formData,
  reqName,
  value,
}) => {
  const { t } = useTranslation();
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
    if (category == t("APARTMENT"))
      setFormData({ ...formData, [reqName]: "APARTMENT" });
    else if (category == t("HOUSE"))
      setFormData({ ...formData, [reqName]: "HOUSE" });
    else if (category == t("OFFICE"))
      setFormData({ ...formData, [reqName]: "OFFICE" });
    else if (category == t("SHOP"))
      setFormData({ ...formData, [reqName]: "SHOP" });
    else if (category == t("HOTEL"))
      setFormData({ ...formData, [reqName]: "HOTEL" });
    else if (category == t("NEW"))
      setFormData({ ...formData, [reqName]: "NEW" });
    else if (category == t("OLD"))
      setFormData({ ...formData, [reqName]: "OLD" });
    else if (category == t("BRICK"))
      setFormData({ ...formData, [reqName]: "BRICK" });
    else if (category == t("PANEL"))
      setFormData({ ...formData, [reqName]: "PANEL" });
    else if (category == t("MONOLITH"))
      setFormData({ ...formData, [reqName]: "MONOLITH" });
    else if (category == t("BLOCK"))
      setFormData({ ...formData, [reqName]: "BLOCK" });
    else if (category == t("bor"))
      setFormData({ ...formData, [reqName]: true });
    else if (category == t("yoq"))
      setFormData({ ...formData, [reqName]: false });
    else setFormData({ ...formData, [reqName]: category });
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    if (value) {
      if (value == "APARTMENT") setSelectedCategory(t("APARTMENT"));
      else if (value == "HOUSE") setSelectedCategory(t("HOUSE"));
      else if (value == "OFFICE") setSelectedCategory(t("OFFICE"));
      else if (value == "SHOP") setSelectedCategory(t("SHOP"));
      else if (value == "HOTEL") setSelectedCategory(t("HOTEL"));
      else if (value == "NEW") setSelectedCategory(t("NEW"));
      else if (value == "OLD") setSelectedCategory(t("OLD"));
      else if (value == "BRICK") setSelectedCategory(t("BRICK"));
      else if (value == "PANEL") setSelectedCategory(t("PANEL"));
      else if (value == "MONOLITH") setSelectedCategory(t("MONOLITH"));
      else if (value == "BLOCK") setSelectedCategory(t("BLOCK"));
      else if (value === true) setSelectedCategory(t("bor"));
      else if (value === false) setSelectedCategory(t("yoq"));
      else setSelectedCategory(value); // Default case
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col relative mr-[10px]">
      <h2 className="text-kulrang font-medium ml-[20px] mt-5 mb-2 text-sm max-md:mt-2">
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
          <div className="flex flex-col p-[10px] mt-2 rounded-[10px] absolute bg-white shadow-lg w-full top-[90px] z-20 max-md:top-[70px]">
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
