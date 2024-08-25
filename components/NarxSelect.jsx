import { t } from "i18next";
import React, { useState, useEffect } from "react";

const NarxSelect = ({ setPriceMin, setPriceMax }) => {
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");

  useEffect(() => {
    // Update the min and max values whenever the inputs change
    setPriceMin(fromValue);
    setPriceMax(toValue);
  }, [fromValue, toValue, setPriceMin, setPriceMax]);

  const handleFromChange = (event) => {
    const inputValue = event.target.value;
    if (!isNaN(inputValue)) {
      // Check if the value is a number
      setFromValue(inputValue);
    }
  };

  const handleToChange = (event) => {
    const inputValue = event.target.value;
    if (!isNaN(inputValue)) {
      // Check if the value is a number
      setToValue(inputValue);
    }
  };

  return (
    <div className="flex flex-col relative mr-[10px]">
      <h2 className="text-qora font-medium ml-[10px] mt-5 mb-1">
        {t("filter7")}
      </h2>
      <div className="flex">
        <div
          className={`flex p-[10px] h-10 w-[200px] max-md:w-1/2 rounded-[10px] justify-between items-center cursor-pointer mr-[5px] ${
            fromValue ? "bg-ochKok" : "border border-kulrang"
          }`}
        >
          <input
            type="text"
            className="w-full bg-transparent text-qora font-medium outline-none"
            placeholder={t("dan")}
            value={fromValue}
            onChange={handleFromChange}
          />
        </div>
        <div
          className={`flex p-[10px] h-10 w-[200px] max-md:w-1/2 rounded-[10px] justify-between items-center cursor-pointer ${
            toValue ? "bg-ochKok" : "border border-kulrang"
          }`}
        >
          <input
            type="text"
            className="w-full bg-transparent text-qora font-medium outline-none"
            placeholder={t("gacha")}
            value={toValue}
            onChange={handleToChange}
          />
        </div>
      </div>
    </div>
  );
};

export default NarxSelect;
