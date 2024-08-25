import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const XonaSelect = ({ setMinRoom, setMaxRoom }) => {
  const { t } = useTranslation();
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");

  useEffect(() => {
    // Update the min and max values whenever the inputs change
    setMinRoom(fromValue);
    setMaxRoom(toValue);
  }, [fromValue, toValue, setMinRoom, setMaxRoom]);

  const handleFromChange = (event) => {
    const inputValue = event.target.value;
    if (!isNaN(inputValue)) {
      // Raqamni tekshirish
      setFromValue(inputValue);
    }
  };

  const handleToChange = (event) => {
    const inputValue = event.target.value;
    if (!isNaN(inputValue)) {
      // Raqamni tekshirish
      setToValue(inputValue);
    }
  };

  return (
    <div className="flex flex-col relative mr-[10px]">
      <h2 className="text-qora font-medium ml-[10px] mt-5 mb-1">
        {t("filter6")}
      </h2>
      <div className="flex">
        <div
          className={`flex p-[10px] h-10 w-[100px] max-md:w-1/2 rounded-[10px] justify-between items-center cursor-pointer mr-[5px] ${
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
          className={`flex p-[10px] h-10 w-[100px] max-md:w-1/2 rounded-[10px] justify-between items-center cursor-pointer ${
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

export default XonaSelect;
