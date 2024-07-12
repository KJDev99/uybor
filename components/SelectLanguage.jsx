"use client";
import React, { useState } from "react";
import Image from "next/image";

const languages = [
  { code: "O'z", flag: "images/uzbflag.png", name: "O’zbek tili" },
  { code: "Ru", flag: "images/rusflag.png", name: "Pусский язык" },
];

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const handleChange = (event) => {
    const selectedCode = event.target.value;
    const selectedLang = languages.find((lang) => lang.code === selectedCode);
    setSelectedLanguage(selectedLang);
  };

  return (
    <div className="flex items-center">
      <img
        src={selectedLanguage.flag}
        alt="flag   "
        width={15}
        height={15}
        className="mr-2"
      />
      <select
        className=" bg-transparent border-none  leading-tight focus:outline-none w-[46px]"
        onChange={handleChange}
        value={selectedLanguage.code}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
