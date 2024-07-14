"use client";
import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import Image from "next/image";

const languages = [
  { code: "O'z", flag: "/images/uzbflag.png", name: "O’zbek tili" },
  { code: "Ru", flag: "/images/rusflag.png", name: "Pусский язык" },
];

const LanguageSelector = () => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const toggleLanguage = () => {
    setIsLanguageOpen(!isLanguageOpen);
  };

  const handleLanguageChange = (event) => {
    const selectedLang = languages.find(
      (lang) => lang.code === event.target.value
    );
    if (selectedLang) {
      setSelectedLanguage(selectedLang);
    }
    setIsLanguageOpen(false);
  };

  return (
    <div className="flex flex-col relative mr-[10px]">
      <div className="flex flex-col">
        <div
          className={`flex p-[10px] h-10 justify-between items-center cursor-pointer`}
          onClick={toggleLanguage}
        >
          <Image
            src={selectedLanguage.flag}
            alt={`${selectedLanguage.name} flag`}
            width={15}
            height={15}
            className="mr-2 object-cover"
          />
          <p
            className={`text-nowrap  pr-4 overflow-hidden ${
              selectedLanguage !== "Hammasi"
                ? "text-qora font-medium"
                : "text-kulrang"
            }`}
          >
            {selectedLanguage.code}
          </p>
          <FaChevronLeft
            className={`text-qora transition-transform z-10 ${
              isLanguageOpen ? "rotate-90" : "-rotate-90"
            }`}
          />
        </div>
        {isLanguageOpen && (
          <div className="flex flex-col p-[2px] mt-2 rounded-[10px] absolute bg-white shadow-lg w-[125px] top-[40px] z-10">
            {languages.map((language, index) => (
              <label
                key={index}
                className={`flex items-center cursor-pointer`}
                htmlFor={language.code}
              >
                <input
                  type="radio"
                  id={language.code}
                  name="language"
                  value={language.code}
                  className="hidden"
                  checked={selectedLanguage.name === language.name}
                  onChange={handleLanguageChange}
                />
                <p
                  className={`w-full px-2 py-2 text-xs rounded-md flex items-center justify-between ${
                    selectedLanguage.name === language.name
                      ? "bg-logoKok text-white  font-medium"
                      : "text-qora"
                  }`}
                >
                  <span className="flex items-center">
                    <Image
                      src={language.flag}
                      alt={`${language.name} flag`}
                      width={15}
                      height={15}
                      className="mr-2"
                    />
                    {language.name}
                  </span>
                </p>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;
