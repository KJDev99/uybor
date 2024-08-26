"use client";
import React from "react";
import { useTranslation } from "react-i18next";

const page = () => {
  const { t } = useTranslation();
  return (
    <div className="container">
      <div className="flex flex-col text-[#343434]">
        <h2 className="my-8 text-[#343434] text-2xl font-bold md:px-[100px] text-center">
          {t("shart1")}
        </h2>
        <p className="text-[#343434] text-sm mb-5">{t("shart2")}</p>
        <p className="text-[#343434] mb-5 ">{t("shart3")}</p>
        <h3 className="text-lg mb-5 font-bold"> {t("shart4")}</h3>
        <p className="mb-5">
          {t("shart5")} <br /> {t("shart6")} <br /> {t("shart7")}
        </p>
        <h3 className="text-lg mb-5 font-bold"> {t("shart8")}</h3>
        <p className="mb-5">
          {t("shart9")} <br /> {t("shart10")} <br /> {t("shart11")}
          <br /> {t("shart1")}
        </p>
        <h3 className="text-lg mb-5 font-bold">{t("section3_title")}</h3>
        <p className="mb-5">
          {t("section3_1_title")}
          <br />
          {t("section3_1_1")}
          <br />
          {t("section3_1_2")}
          <br />
          {t("section3_1_3")}
          <br />
          {t("section3_1_4")}
          <br />
          {t("section3_2_title")}
          <br />
          {t("section3_2_1")}
          <br />
          {t("section3_2_2")}
          <br />
          {t("section3_2_3")}
          <br />
          {t("section3_2_4")}
          <br />
          {t("section3_2_5")}
          <br />
          {t("section3_2_6")}
          <br />
          {t("section3_3_title")}
          <br />
          {t("section3_3_1")}
          <br />
          {t("section3_3_2")}
          <br />
          {t("section3_3_3")}
          <br />
          {t("section3_3_4")}
          <br />
          {t("section3_3_5")}
          <br />
          {t("section3_4_title")}
          <br />
          {t("section3_4_1")}
        </p>
        <h3 className="text-lg mb-5 font-bold">{t("section4_title")}</h3>
        <p className="mb-5">
          {t("section4_1")} <br />
          {t("section4_2")} <br />
          {t("section4_3")}
        </p>
        <h3 className="text-lg mb-5 font-bold">{t("section5_title")}</h3>
        <p className="mb-5">
          {t("section5_1")} <br />
          {t("section5_2")} <br />
          {t("section5_3")} <br />
          {t("section5_4")} <br />
          {t("section5_5")} <br />
          {t("section5_6")} <br />
          {t("section5_7")}
        </p>
        <h3 className="text-lg mb-5 font-bold">{t("section6_title")}</h3>
        <p className="mb-5">
          {t("section6_1")} <br />
          {t("section6_2")}
        </p>
        <h3 className="text-lg mb-5 font-bold">{t("section7_title")}</h3>
        <p className="mb-5">
          {t("section7_1")} <br />
          {t("section7_2")} <br />
          {t("section7_3")}
        </p>
      </div>
    </div>
  );
};

export default page;
