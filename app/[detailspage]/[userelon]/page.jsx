"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setView } from "@/store";
import Image from "next/image";
import SeeBlock from "@/assets/images/seeblock.svg";
import SeeLine from "@/assets/images/seeline.svg";
import SeeBlockAct from "@/assets/images/seeblockact.svg";
import SeeLineAct from "@/assets/images/seelineact.svg";
import ElonBlock from "@/components/ElonBlock";
import api from "@/lib/api";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { setCurrency } from "@/store";

const UserElon = () => {
  const [offset, setOffset] = useState(0);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const view = useSelector((state) => state.view);
  const currencyNow = useSelector((state) => state.currency);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const modifiedPathname = pathname.replace("/ads/", "");

  const fetchAds = async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `/api/v1/ads/author/${modifiedPathname}?offset=${offset}&limit=12`
      );
      setNextPageUrl(response.data.next);
      console.log(response.data.next, "its");

      const transformedAds = response.data.results.map((ad) => ({
        image: ad.media,
        top: ad.is_top,
        save: true,
        turi: ad.ad_type.toLowerCase(),
        name: ad.title,
        address: `${ad.region.name_uz} ${ad.district.name_uz}`,
        data: new Date(ad.created).toLocaleDateString("en-GB"),
        price: ad.price,
        view: "block",
        id: ad.id,
        currencyNow: currencyNow,
      }));

      setAds((prevAds) =>
        offset === 0 ? transformedAds : [...prevAds, ...transformedAds]
      );
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setAds([]); // Clear ads on pathname change for fresh load
    setOffset(0); // Reset offset on pathname change
  }, [pathname]);

  useEffect(() => {
    fetchAds();
  }, [offset]);

  const handleLoadMore = () => {
    if (nextPageUrl) {
      setOffset((prevOffset) => prevOffset + 12);
    }
  };

  const renderPagination = () => (
    <div className="flex justify-center">
      <button
        onClick={handleLoadMore}
        disabled={loading}
        className={`mt-[50px] mb-5 bg-transparent rounded-md w-[210px] h-[30px] flex justify-center items-center border border-[#015EA8] text-[#015EA8] cursor-pointer ${
          loading && "opacity-50 cursor-not-allowed"
        } ${!nextPageUrl && "hidden h-0"}`}
      >
        {t("buttonYana")}
      </button>
    </div>
  );

  return (
    <div className="flex flex-col container">
      <div className="flex max-md:flex-col justify-between mt-[50px] mb-[30px] max-md:mt-[10px]">
        <h2 className="text-2xl text-qora font-semibold max-md:text-[16px]">
          {t("muallif1")}
        </h2>
        <div className="flex">
          <div className="flex items-center">
            <p className="text-qora font-medium">{t("korish")}:</p>
            <Image
              src={view == "block" ? SeeBlockAct : SeeBlock}
              alt="SeeBlock"
              onClick={() => dispatch(setView("block"))}
              className="mx-5 cursor-pointer"
            />
            <Image
              src={view == "line" ? SeeLineAct : SeeLine}
              alt="SeeLine"
              onClick={() => dispatch(setView("line"))}
              className="cursor-pointer"
            />
          </div>
          <div className="flex items-center">
            <p className="text-qora font-medium md:ml-16">{t("valyuta")}:</p>
            <p
              className={`mx-5 cursor-pointer font-medium ${
                currencyNow === "UZS" ? "text-logoKok" : "text-kulrang"
              }`}
              onClick={() => dispatch(setCurrency("UZS"))}
            >
              UZS
            </p>
            <p
              className={`cursor-pointer font-medium ${
                currencyNow === "USD" ? "text-logoKok" : "text-kulrang"
              }`}
              onClick={() => dispatch(setCurrency("USD"))}
            >
              USD
            </p>
          </div>
        </div>
      </div>
      <div
        className={`flex flex-wrap mb-[30px] ${
          view == "block"
            ? "grid grid-cols-4 gap-7 max-md:gap-[15px] max-md:grid-cols-2"
            : "grid grid-cols-1 gap-5"
        }`}
      >
        {loading && !ads.length ? (
          <p>Loading...</p>
        ) : (
          ads.map((elon, index) => <ElonBlock key={index} {...elon} />)
        )}
      </div>
      {renderPagination()}
    </div>
  );
};

export default UserElon;
