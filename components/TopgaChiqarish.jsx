import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const TopgaChiqarish = ({ text, title, setTopDay }) => {
  const [selectedOption, setSelectedOption] = useState("top");
  const [selectedDuration, setSelectedDuration] = useState("7");

  const { t } = useTranslation();

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.id);
  };

  const handleDurationClick = (duration) => {
    setSelectedDuration(duration);
    setTopDay(duration);
  };

  return (
    <div className="flex flex-col mt-[10px]">
      {text || title ? (
        <>
          <h2 className="text-qora text-3xl font-semibold ml-[25px] mb-5 max-md:text-2xl max-md:ml-0">
            {title}
          </h2>
          <p className="text text-qora mb-[30px] ml-[25px] max-md:text-sm max-md:ml-0">
            {text}
          </p>
        </>
      ) : (
        <>
          <h2 className="text-qora text-xl font-semibold max-md:text-lg">
            {t("top1")}
          </h2>
          <p className="text-sm text-kulrang mb-2 ml-[20px] max-md:ml-[10px]">
            {t("top2")}
          </p>
          <form className="flex ml-5 mb-5">
            <label htmlFor="top" className="flex items-center mr-4">
              <input
                type="radio"
                id="top"
                name="oddiy"
                onChange={handleOptionChange}
                checked={selectedOption === "top"}
              />
              <span
                className={`ml-2 text-lg font-medium max-md:text-sm ${
                  selectedOption === "top" ? "text-logoKok" : "text-kulrang"
                }`}
              >
                {t("top1")}
              </span>
            </label>
            <label
              htmlFor="oddiy"
              className="flex items-center md:ml-[50px] max-md:ml-5"
            >
              <input
                type="radio"
                id="oddiy"
                name="oddiy"
                onChange={handleOptionChange}
              />
              <span
                className={`ml-2 text-lg font-medium max-md:text-sm ${
                  selectedOption === "oddiy" ? "text-logoKok" : "text-kulrang"
                }`}
              >
                {t("top3")}
              </span>
            </label>
          </form>
        </>
      )}
      <div className="w-full gap-5 flex mb-10 max-md:hidden">
        <div
          className={`rounded-[10px] p-5 border cursor-pointer ${
            selectedDuration === "3"
              ? "border-logoKok bg-ochKok"
              : "bg-white border-kulrangOch"
          }`}
          onClick={() => handleDurationClick("3")}
        >
          <h2
            className={`font-bold mb-[10px] text-center text-[32px] ${
              selectedDuration === "3" ? "text-logoKok" : "text-kulrang"
            }`}
          >
            3 {t("top4")}
          </h2>
          <h3 className={`text-2xl mb-[10px] font-semibold `}>
            4 000 {t("top5")}
          </h3>
          <p className="text-sm text-kulrang">{t("top6")}</p>
        </div>
        <div
          className={`rounded-[10px] p-5 border cursor-pointer ${
            selectedDuration === "7"
              ? "border-logoKok bg-ochKok"
              : "bg-white border-kulrangOch"
          }`}
          onClick={() => handleDurationClick("7")}
        >
          <h2
            className={`font-bold mb-[10px] text-center text-[32px]  ${
              selectedDuration === "7" ? "text-logoKok" : "text-kulrang"
            }`}
          >
            7 {t("top4")}
          </h2>
          <h3 className={`text-2xl mb-[10px] font-semibold`}>
            9 000 {t("top5")}
          </h3>
          <p className="text-sm text-kulrang">{t("top7")}</p>
        </div>
        <div
          className={`rounded-[10px] p-5 border cursor-pointer ${
            selectedDuration === "30"
              ? "border-logoKok bg-ochKok"
              : "bg-white border-kulrangOch"
          }`}
          onClick={() => handleDurationClick("30")}
        >
          <h2
            className={`font-bold mb-[10px] text-center text-[32px] ${
              selectedDuration === "30" ? "text-logoKok" : "text-kulrang"
            }`}
          >
            30 {t("top4")}
          </h2>
          <h3 className={`text-2xl mb-[10px] font-semibold `}>
            35 000 {t("top5")}
          </h3>
          <p className="text-sm text-kulrang">{t("top8")}</p>
        </div>
      </div>
      <div className="w-full gap-5 flex mb-5 md:hidden justify-center">
        <div
          className={`rounded-[10px] w-[92px] h-[34px] border cursor-pointer flex items-center justify-center ${
            selectedDuration === "3"
              ? "border-logoKok bg-[#015EA8]"
              : "bg-white border-kulrangOch"
          }`}
          onClick={() => handleDurationClick("3")}
        >
          <h2
            className={`font-bold text-center text-182px] ${
              selectedDuration === "3" ? "text-white" : "text-kulrang"
            }`}
          >
            3 {t("top4")}
          </h2>
        </div>
        <div
          className={`rounded-[10px] w-[92px] h-[34px] border cursor-pointer flex items-center justify-center ${
            selectedDuration === "7"
              ? "border-logoKok bg-[#015EA8]"
              : "bg-white border-kulrangOch"
          }`}
          onClick={() => handleDurationClick("7")}
        >
          <h2
            className={`font-bold text-center text-[18px]  ${
              selectedDuration === "7" ? "text-white" : "text-kulrang"
            }`}
          >
            7 {t("top4")}
          </h2>
        </div>
        <div
          className={`rounded-[10px] w-[92px] h-[34px] border cursor-pointer flex items-center justify-center ${
            selectedDuration === "30"
              ? "border-logoKok bg-[#015EA8]"
              : "bg-white border-kulrangOch"
          }`}
          onClick={() => handleDurationClick("30")}
        >
          <h2
            className={`font-bold text-center text-[18px] ${
              selectedDuration === "30" ? "text-white" : "text-kulrang"
            }`}
          >
            30 {t("top4")}
          </h2>
        </div>
      </div>
      <div className="md:hidden">
        {selectedDuration === "3" && (
          <div className="flex flex-col w-full px-5">
            <h3 className={`text-lg mb-[5px] font-semibold `}>
              4 000 {t("top5")}
            </h3>
            <p className="text-sm text-kulrang mb-[30px]">{t("top6")}</p>
          </div>
        )}
        {selectedDuration === "7" && (
          <div className="flex flex-col w-full px-5">
            <h3 className={`text-lg mb-[5px] font-semibold`}>
              9 000 {t("top5")}
            </h3>
            <p className="text-sm text-kulrang mb-[30px]">{t("top7")}</p>
          </div>
        )}
        {selectedDuration === "30" && (
          <div className="flex flex-col w-full px-5">
            <h3 className={`text-lg mb-[5px] font-semibold `}>
              35 000 {t("top5")}
            </h3>
            <p className="text-sm text-kulrang mb-[30px]">{t("top8")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopgaChiqarish;
