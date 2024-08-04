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
import { usePathname } from "next/navigation";

import { format, parseISO } from "date-fns";
import MapComponent from "./MapContainer";
import { useSelector } from "react-redux";
import CurrencyComponent from "./CurrencyComponent";

const formatDate = (dateString) => {
  const date = parseISO(dateString);
  return format(date, "dd.MM.yyyy");
};

const DetailElon = () => {
  const [saved, setSaved] = useState(false);

  const [adDetail, setAdDetail] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pathname = usePathname();
  const adId = pathname.split("/").pop();

  let currencyNow = useSelector((state) => state.currency);

  useEffect(() => {
    const fetchAdDetail = async () => {
      try {
        const response = await api.get(`api/v1/ads/${adId}/detail`);
        setAdDetail(response.data);
        console.log(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdDetail();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const infos = [
    { text1: "Turarjoy turi:", text2: adDetail.accommodation_type },
    { text1: "Qurilish turi:", text2: adDetail.construction_type },
    { text1: "Xonalar soni:", text2: adDetail.room },
    { text1: "Qavat:", text2: adDetail.floor },
    { text1: "Binoning qavatlari:", text2: adDetail.total_floor },
    { text1: "Uy qurilgan yil:", text2: adDetail.house_built_year },
    { text1: "Yashash maydoni:", text2: adDetail.living_area },
    { text1: "Umumiy maydoni:", text2: adDetail.total_area },
    { text1: "Mebel:", text2: adDetail.have_furniture ? "Bor" : "Yo'q" },
    {
      text1: "Vositachilik haqi:",
      text2: adDetail.have_broker_fee ? "Bor" : "Yo'q",
    },
  ];

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
              className="h-[30px] w-[30px] cursor-pointer "
              onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();
                setSaved((prev) => !prev);
              }}
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
                  Joyalangan sana!:
                </p>
                <p className="text-qora max-md:text-xs font-medium">
                  {formatDate(adDetail.created)}
                </p>
              </div>
            </div>
            <div className="h-[33px] w-[33px] bbg-white rounded-full flex items-center  justify-center">
              <Image
                src={ShareElonImg}
                alt="elon image"
                className="h-[25px] w-[25px] cursor-pointer "
              />
            </div>
          </div>
          <div className="mt-5">
            <DetailPageImg imgs={adDetail.media} />
          </div>
          <div className="flex flex-col">
            <h2 className="mt-[30px] mb-[10px] text-qora font-semibold max-md:text-lg max-md:mb-3">
              Qo’shimcha ma’lumotlar
            </h2>
            {infos.map((info, index) => (
              <AddInfos
                key={index}
                bg={index % 2 === 0} // Har ikki element uchun bg klassini qo'shadi
                text1={info.text1}
                text2={info.text2}
              />
            ))}
          </div>
          <div className="flex flex-col">
            <h2 className="mt-[20px] mb-[10px] text-qora font-semibold  max-md:text-lg max-md:mb-3">
              Tavsif
            </h2>
            <p className="p-5 bg-white rounded-[10px] text-qora text-xl max-md:text-sm max-md:p-[10px]">
              {adDetail.description}
            </p>
          </div>
        </div>
        <div className="col-span-1 max-md:col-span-3 flex flex-col max-md:flex-col-reverse mt-[30px]">
          <div className="bg-white shadow-lg p-[30px] rounded-[10px] max-md:my-5 ">
            <h2 className="text-xl mb-5 font-semibold text-qora ">
              E’lon muallifi
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
                Muallifning barcha e’lonlari
              </div>
            </Link>
          </div>
          <div className="flex flex-col">
            <h2 className="mt-[30px] mb-5 text-qora font-semibold max-md:mt-5 max-md:mb-2">
              Manzil
            </h2>
            <div className="flex">
              <p className="border border-yozish rounded-[10px] bg-white py-[6px] px-5  text-qora text-lg font-medium mr-5 max-md:text-xs max-md:p-1">
                {adDetail.region.name_uz}
              </p>
              <p className="border border-yozish rounded-[10px] bg-white py-[6px] px-5  text-qora text-lg font-medium max-md:text-xs max-md:p-1">
                {adDetail.district.name_uz}
              </p>
            </div>
            <p className="text-qora text-lg font-medium mt-[10px] mb-5 max-md:text-sm">
              {adDetail.address}
            </p>
            {/* <MapComponent
              latitude={adDetail.latitude}
              longitude={adDetail.longitude}
            /> */}
          </div>
        </div>
      </div>
      <div className="flex flex-col mb-10">
        <h2 className="text-main mb-[30px] font-semibold text-2xl">
          Muallifning boshqa e’lonlari
        </h2>
        <ElonSlider userId={adDetail.user.id} adId={adId} />
      </div>
      <div className="flex flex-col mb-[50px]">
        <h2 className="text-main mb-[30px] font-semibold text-2xl">
          O’xshash e‘lonlar
        </h2>
        <ElonSlider category={adDetail.category} adId={adId} />
      </div>
    </div>
  );
};

export default DetailElon;
