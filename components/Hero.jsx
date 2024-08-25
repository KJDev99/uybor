"use client";
import { useSearchParams } from "next/navigation";
import Filter from "./Filter";
import Search from "./Search";
import { useTranslation } from "react-i18next";
const Hero = () => {
  const searchParams = useSearchParams();

  // Tekshiruvni o'zgartirish
  const isSearchParamsEmpty = !searchParams || searchParams.toString() === "";
  const { t } = useTranslation();
  return (
    <div
      className={`main_bg h-[calc(550px-80px)]  bg-no-repeat bg-cover bg-center ${
        isSearchParamsEmpty ? "h-[calc(550px-80px)] max-md:h-[295px]" : "h-max"
      }`}
      style={{
        backgroundImage: isSearchParamsEmpty
          ? "url('./images/mainbg.webp')"
          : "none",
      }}
    >
      <div className="container pt-[50px] max-md:pt-[30px]">
        <div className="flex md:flex-col md:bg-[#ffffffd8] rounded-2xl p-5 max-md:p-0 max-md:items-center">
          <Search />
          <Filter />
        </div>
        {isSearchParamsEmpty && (
          <div className="flex flex-col">
            <h1 className="mt-7 mb-3 font-semibold text-logoKok text-[42px] max-md:text-2xl max-md:mt-[30px] max-md:mb-[6px]">
              {t("mainTitle")}
            </h1>
            <p className="text-logoKok font-semibold max-md:text-sm">
              {t("subTitle")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
