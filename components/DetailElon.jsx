"use client";
import { useEffect, useState } from "react";
import SavedImg from "@/assets/images/saveelon.svg";
import NoSavedImg from "@/assets/images/nosaveelon.svg";
import ShareElonImg from "@/assets/images/shareelon.svg";
import Image from "next/image";
import DetailPageImg from "./DetailPageImg";
import AddInfos from "./AddInfos";

import ElonSlider from "./ElonSlider";
import Link from "next/link";
import api from "@/lib/api";
import { usePathname, useRouter } from "next/navigation";

import { format, parseISO } from "date-fns";
import { useSelector } from "react-redux";
import CurrencyComponent from "./CurrencyComponent";
import DeletedAds from "./DeletedAds";

import Loader from "./Loader";
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";
import { FaEye } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const formatDate = (dateString) => {
  const date = parseISO(dateString);
  return format(date, "dd.MM.yyyy");
};

const DetailElon = () => {
  const [adDetail, setAdDetail] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);

  const [backgroundData2, setBackgroundData2] = useState({
    bannerUrl: "",
    linkUrl: "",
  });

  const pathname = usePathname();
  const adId = pathname.split("/").pop();
  const currencyNow = useSelector((state) => state.currency);

  useEffect(() => {
    const fetchBannerData2 = async () => {
      try {
        const response = await api.get("/api/v1/banner");
        const data = response.data;

        setBackgroundData2({
          bannerUrl: data.banner2_uz,
          linkUrl: data.url2,
        });
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    };

    fetchBannerData2();
  }, []);

  useEffect(() => {
    const fetchAdDetail = async () => {
      try {
        const response = await api.get(`api/v1/ads/${adId}/detail`);
        if (response.data.status == "ACTIVE") {
          setAdDetail(response.data);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdDetail();
  }, [adId]);

  useEffect(() => {
    if (adDetail) {
      const savedElons = JSON.parse(sessionStorage.getItem("savedElons")) || [];
      const isSaved = savedElons.some((elon) => elon.id === adDetail?.id);
      setSaved(isSaved);
    }
  }, [adDetail]);

  const handleSaveClick = (event) => {
    event.stopPropagation();
    event.preventDefault();

    const newSavedStatus = !saved;
    setSaved(newSavedStatus);

    const savedElons = JSON.parse(sessionStorage.getItem("savedElons")) || [];
    const updatedElons = newSavedStatus
      ? [
          ...savedElons,
          {
            ...adDetail,
            save: newSavedStatus,
          },
        ]
      : savedElons.filter((elon) => elon.id !== adDetail.id);

    sessionStorage.setItem("savedElons", JSON.stringify(updatedElons));
  };

  const { t } = useTranslation();

  if (loading) return <Loader type="ball-grid-pulse" />;
  if (error) return <DeletedAds text={t("noelon")} />;

  const infos = [
    { text1: t("detail2"), text2: adDetail.accommodation_type },
    { text1: t("detail3"), text2: adDetail.construction_type },
    { text1: t("detail4"), text2: adDetail.room },
    { text1: t("detail5"), text2: adDetail.floor },
    { text1: t("detail6"), text2: adDetail.total_floor },
    { text1: t("detail7"), text2: adDetail.house_built_year },
    { text1: t("detail8"), text2: adDetail.living_area },
    { text1: t("detail9"), text2: adDetail.total_area },
    {
      text1: t("detail10"),
      text2: adDetail.have_furniture ? t("bor") : t("yoq"),
    },
    {
      text1: t("detail11"),
      text2: adDetail.have_broker_fee ? t("bor") : t("yoq"),
    },
  ];

  const mapState = {
    center: [adDetail.latitude, adDetail.longitude],
    zoom: 12,
  };

  const copyUrlToClipboard = () => {
    // Get the current URL
    const url = window.location.href;

    // Copy the URL to the clipboard
    navigator.clipboard.writeText(url).then(() => {
      // alert("URL copied to clipboard!"); // Optional: notify the user
    });
  };
  const language = localStorage.getItem("language");
  return (
    <div className="container">
      <div className="grid grid-cols-3">
        <div className="flex flex-col col-span-2 max-md:col-span-3 md:p-[30px]">
          <div className="flex justify-between">
            <h1 className="font-qora font-semibold text-2xl max-md:text-lg max-md:mt-[10px]">
              {adDetail.title}
            </h1>
            <Image
              src={saved ? SavedImg : NoSavedImg}
              alt="elon image"
              className="h-[30px] w-[30px] cursor-pointer max-md:mt-2 "
              onClick={handleSaveClick}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h2 className="text-logoKok text-2xl font-semibold mb-[10px] max-md:mb-1 max-md:text-[16px]">
                <CurrencyComponent
                  amount={adDetail.price}
                  currency={currencyNow == "UZS" ? "USD" : "UZS"}
                />
                {/* {adDetail.price} */}
              </h2>
              <div className="flex items-center">
                <p className="text-sm max-md:text-xs font-medium mr-5 text-kulrang">
                  {t("detail")}!
                </p>
                <p className="text-qora max-md:text-xs font-medium">
                  {formatDate(adDetail.created)}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div
                className="h-[33px] w-[33px] bg-white rounded-full flex items-center  justify-center"
                onClick={copyUrlToClipboard}
              >
                <Image
                  src={ShareElonImg}
                  alt="elon image"
                  className="h-[25px] w-[25px] cursor-pointer "
                />
              </div>
              <div className="flex items-center mt-4">
                <FaEye className="text-[16px] text-kulrang" />
                <p className="text-sm text-kulrang ml-2 max-md:text-xs line-clamp-1">
                  {adDetail.views}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <DetailPageImg imgs={adDetail.media} />
          </div>
          <div className="flex flex-col">
            <h2 className="mt-[30px] mb-[10px] text-qora font-semibold max-md:text-lg max-md:mb-3">
              {t("detail1")}
            </h2>
            {infos.map(
              (info, index) =>
                info.text2 && (
                  <AddInfos
                    key={index}
                    bg={index % 2 === 0} // Har ikki element uchun bg klassini qo'shadi
                    text1={info.text1}
                    text2={info.text2}
                  />
                )
            )}
          </div>
          <div className="flex flex-col">
            <h2 className="mt-[20px] mb-[10px] text-qora font-semibold  max-md:text-lg max-md:mb-3">
              {t("tavsif")}
            </h2>
            <p className="p-5 bg-white rounded-[10px] text-qora text-xl max-md:text-sm max-md:p-[10px]">
              {adDetail.description}
            </p>
          </div>
        </div>
        <div className="col-span-1 max-md:col-span-3 flex flex-col max-md:flex-col-reverse mt-[30px]">
          <div className="bg-white shadow-lg p-[30px] rounded-[10px] max-md:my-5 ">
            <h2 className="text-xl mb-5 font-semibold text-qora ">
              {t("muallif")}
            </h2>
            <div className="flex items-center">
              {adDetail.user.photo && (
                <img
                  src={adDetail.user.photo}
                  alt="img"
                  className="rounded-full max-md:h-[54px] max-md:w-[54px] w-[75px] h-[75px]"
                />
              )}
              <p className="text-2xl ml-[30px] font-semibold text-qora max-md:text-[16px]">
                {adDetail.user.full_name}
              </p>
            </div>
            <div className="h-10 w-full border rounded-[10px] mt-[30px] mb-[15px] flex items-center justify-center">
              <a
                href={adDetail.phone}
                className="text-xl font-semibold text-qora "
              >
                {adDetail.phone}
              </a>
            </div>
            <Link href={`/ads/${adDetail.user.id}`}>
              <div className="h-10 w-full border rounded-[10px] flex items-center justify-center text-white bg-main">
                {t("muallif1")}
              </div>
            </Link>
          </div>
          <div className="flex flex-col mb-5">
            <h2 className="mt-[30px] mb-5 text-qora font-semibold max-md:mt-5 max-md:mb-2">
              {t("muallif2")}
            </h2>
            <div className="flex">
              <p className="border border-yozish rounded-[10px] bg-white py-[6px] px-5  text-qora text-lg font-medium mr-5 max-md:text-xs max-md:p-1">
                {language == "uz"
                  ? adDetail.region.name_uz
                  : adDetail.region.name_ru}
              </p>
              <p className="border border-yozish rounded-[10px] bg-white py-[6px] px-5  text-qora text-lg font-medium max-md:text-xs max-md:p-1">
                {language == "uz"
                  ? adDetail.district.name_uz
                  : adDetail.district.name_ru}
              </p>
            </div>
            <p className="text-qora text-lg font-medium mt-[10px] mb-5 max-md:text-sm">
              {adDetail.address}
            </p>
            {adDetail.latitude && (
              <YMaps>
                <Map state={mapState} width="100%" height="200px">
                  <Placemark
                    geometry={[adDetail.latitude, adDetail.longitude]}
                  />
                </Map>
              </YMaps>
            )}
          </div>
          <a
            href={backgroundData2.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div
              className="h-[750px] max-md:hidden w-full bg-no-repeat bg-cover bg-center"
              style={{ backgroundImage: `url(${backgroundData2.bannerUrl})` }}
            ></div>
          </a>
        </div>
      </div>
      <div className="flex flex-col mb-10">
        <h2 className="text-main mb-[30px] font-semibold text-2xl">
          {t("muallif3")}
        </h2>
        <ElonSlider userId={adDetail.user.id} adId={adId} />
      </div>
      <div className="flex flex-col mb-[50px]">
        <h2 className="text-main mb-[30px] font-semibold text-2xl">
          {t("muallif4")}
        </h2>
        <ElonSlider category={adDetail.category} adId={adId} />
      </div>
    </div>
  );
};

export default DetailElon;
