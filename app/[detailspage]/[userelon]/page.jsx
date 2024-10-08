"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setView } from "@/store";
import Image from "next/image";
import SeeBlock from "@/assets/images/seeblock.svg";
import SeeLine from "@/assets/images/seeline.svg";
import SeeBlockAct from "@/assets/images/seeblockact.svg";
import SeeLineAct from "@/assets/images/seelineact.svg";
import MainImg from "@/assets/images/asosiyrasm.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import ElonBlock from "@/components/ElonBlock";
import api from "@/lib/api";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { setCurrency } from "@/store";

const UserElon = () => {
  const [valyuta, setValyuta] = useState("uzs");
  const { t } = useTranslation();

  const currencyNow = useSelector((state) => state.currency);

  const view = useSelector((state) => state.view);
  const dispatch = useDispatch();

  const handleViewChange = (newView) => {
    dispatch(setView(newView));
  };

  const handleCurrencyChange = (newCurrency) => {
    dispatch(setCurrency(newCurrency));
  };

  const pathname = usePathname();
  const modifiedPathname = pathname.replace("/ads/", "");
  const [ads, setAds] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAds = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/api/v1/ads/author/${modifiedPathname}`);
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
      setAds(transformedAds);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, [pathname]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col container">
      <div className="flex max-md:flex-col justify-between mt-[50px] mb-[30px]  max-md:mt-[10px]">
        <h2 className="text-2xl text-qora font-semibold max-md:text-[16px]">
          {t("muallif1")}
        </h2>
        <div className="flex">
          <div className="flex items-center">
            <p className="text-qora font-medium">{t("korish")}:</p>
            <Image
              src={view == "block" ? SeeBlockAct : SeeBlock}
              alt="SeeBlock"
              onClick={() => handleViewChange("block")}
              className="mx-5 cursor-pointer"
            />
            <Image
              src={view == "line" ? SeeLineAct : SeeLine}
              alt="SeeLine"
              onClick={() => handleViewChange("line")}
              className="cursor-pointer"
            />
          </div>
          <div className="flex items-center">
            <p className="text-qora font-medium md:ml-16">{t("valyuta")}:</p>
            <p
              className={`mx-5 cursor-pointer font-medium ${
                currencyNow === "UZS" ? "text-logoKok" : "text-kulrang"
              }`}
              onClick={() => handleCurrencyChange("UZS")}
            >
              UZS
            </p>
            <p
              className={`cursor-pointer font-medium ${
                currencyNow === "USD" ? "text-logoKok" : "text-kulrang"
              }`}
              onClick={() => handleCurrencyChange("USD")}
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
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          ads.map((elon, index) => <ElonBlock key={index} {...elon} />)
        )}
      </div>
    </div>
  );
};

export default UserElon;
