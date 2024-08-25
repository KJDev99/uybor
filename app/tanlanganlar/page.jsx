"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setView } from "@/store";
import { setCurrency } from "@/store";
import Image from "next/image";
import SeeBlock from "@/assets/images/seeblock.svg";
import SeeLine from "@/assets/images/seeline.svg";
import SeeBlockAct from "@/assets/images/seeblockact.svg";
import SeeLineAct from "@/assets/images/seelineact.svg";
import SavedImg from "@/assets/images/saveelon.svg";
import ElonBlock from "@/components/ElonBlock";
import EmptyAds from "@/components/EmptyAds";
import { useTranslation } from "react-i18next";

const Tanlanganlar = () => {
  const { t } = useTranslation();
  const [savedElons, setSavedElons] = useState([]);

  useEffect(() => {
    const savedElons = JSON.parse(sessionStorage.getItem("savedElons")) || [];
    setSavedElons(savedElons);
  }, []);

  const handleRemoveClick = (id) => {
    const updatedElons = savedElons.filter((elon) => elon.id !== id);
    sessionStorage.setItem("savedElons", JSON.stringify(updatedElons));
    setSavedElons(updatedElons);
  };
  const view = useSelector((state) => state.view);
  const currencyNow = useSelector((state) => state.currency);
  const dispatch = useDispatch();

  const handleViewChange = (newView) => {
    dispatch(setView(newView));
  };

  const handleCurrencyChange = (newCurrency) => {
    dispatch(setCurrency(newCurrency));
  };
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  return (
    <div className="flex flex-col container mb-10">
      {savedElons.length > 0 ? (
        <>
          <div className="flex max-md:flex-col justify-between mt-[50px] mb-[30px]  max-md:mt-[10px]">
            <h2 className="text-2xl text-qora font-semibold max-md:text-[16px]">
              {t("tanlangan")}
            </h2>
            <div className="flex ">
              <div className="flex items-center">
                <p className="text-qora font-medium">Ko'rinishi:</p>
                <Image
                  src={view === "block" ? SeeBlockAct : SeeBlock}
                  alt="SeeBlock"
                  onClick={() => handleViewChange("block")}
                  className="mx-5 cursor-pointer"
                />
                <Image
                  src={view === "line" ? SeeLineAct : SeeLine}
                  alt="SeeLine"
                  onClick={() => handleViewChange("line")}
                  className="cursor-pointer"
                />
              </div>
              <div className="flex items-center">
                <p className="text-qora font-medium ml-16">Valyuta:</p>
                <p
                  className={`mx-5 cursor-pointer font-medium ${
                    currencyNow == "UZS" ? "text-logoKok" : "text-kulrang"
                  }`}
                  onClick={() => handleCurrencyChange("UZS")}
                >
                  UZS
                </p>
                <p
                  className={` cursor-pointer font-medium ${
                    currencyNow == "USD" ? "text-logoKok" : "text-kulrang"
                  }`}
                  onClick={() => handleCurrencyChange("USD")}
                >
                  USD
                </p>
              </div>
            </div>
          </div>
          <div
            className={`flex flex-wrap ${
              view === "block"
                ? "grid grid-cols-4 gap-7 max-md:gap-[15px] max-md:grid-cols-2"
                : "grid grid-cols-1 gap-5"
            }`}
          >
            {savedElons.map((elon) => (
              <div key={elon.id} className="relative">
                <ElonBlock
                  address={
                    elon.address ||
                    elon.region.name_uz + " " + elon.district.name_uz
                  }
                  name={elon.name || elon.title}
                  image={elon.image || elon.media[0].file}
                  price={elon.price || elon.price}
                  top={elon.top || elon.is_top}
                  turi={elon.turi || elon.ad_type}
                  data={elon.data || formatDate(elon.created)}
                  id={elon.id}
                />
                <Image
                  src={SavedImg}
                  alt="no save"
                  className="absolute top-4 right-4 h-[30px] w-[30px] cursor-pointer z-10"
                  onClick={() => handleRemoveClick(elon.id)}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <EmptyAds text={t("tanlanganyoq")} />
      )}
    </div>
  );
};

export default Tanlanganlar;
