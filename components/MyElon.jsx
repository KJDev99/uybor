"use client";
import React, { useState } from "react";
import MyElonItem from "./MyElonItem";
import MainImg from "@/assets/images/asosiyrasm.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa6";
import Cookies from "js-cookie";
import api from "@/lib/api";

const itemsPerPage = 20;
const MyElon = () => {
  const [selectedDuration, setSelectedDuration] = useState("aktiv");

  const [currentPage, setCurrentPage] = useState(1);
  const fetchMyAds = async () => {
    const authToken = Cookies.get("authToken");
    if (!authToken) {
      console.error("Foydalanuvchi tizimga kirilgan emas.");
      return;
    }
  
    try {
      const response = await api.get("/api/v1/ads/my-ads", {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data); 
    } catch (error) {
      console.error("Xato:", error.response ? error.response.data : error.message);
    }
  };
  fetchMyAds();
  

  const allElonlar = [
    {
      image: MainImg,
      top: true,
      edit: true,
      finish: true,
      turi: "sotiladi",
      name: "Srochni sotiladi 1 xonali Yakkasaroy Rovd orqasida",
      address: "Toshkent, Yakksaroy",
      data: "17.05.2024",
      price: "1 250 000 000 so‘m ",
    }
  ];

  const handleDurationClick = (duration) => {
    setSelectedDuration(duration);
  };
  return (
    <div className="bg-white md:px-5 pb-10 pt-[30px] max-md:pt-2 rounded-[10px] flex flex-col">
      <Link
        href={"/profil"}
        className="md:hidden text-lg font-semibold flex items-center"
      >
        {" "}
        <FaAngleLeft />
        Profil
      </Link>
      <h2 className="text-qora text-2xl font-semibold mb-10 max-md:mb-5 max-md:text-lg">
        Jami e’lonlar: 15
      </h2>
      <div className="flex justify-between mb-[30px] max-md:gap-3 overflow-y-auto">
        <div
          className={`flex rounded-[10px] px-4 py-2 max-md:px-2 max-md:py-1 max-md:text-lg max-md:flex-shrink-0  cursor-pointer border text-xl font-semibold ${
            selectedDuration === "aktiv"
              ? " bg-transparent text-logoKok border-logoKok"
              : "bg-transparent text-qora border-kulrangOch"
          }`}
          onClick={() => handleDurationClick("aktiv")}
        >
          <p className="text-lg">Aktiv e’lonlar: 4</p>
        </div>
        <div
          className={`flex rounded-[10px] px-4 py-2 max-md:px-2 max-md:py-1 max-md:text-lg max-md:flex-shrink-0  cursor-pointer border text-xl font-semibold ${
            selectedDuration === "tasdiq"
              ? " bg-transparent text-logoKok border-logoKok"
              : "bg-transparent text-qora border-kulrangOch"
          }`}
          onClick={() => handleDurationClick("tasdiq")}
        >
          <p className="text-lg">Tasdiqlanishi kutilayotgan: 2</p>
        </div>
        <div
          className={`flex rounded-[10px] px-4 py-2 max-md:px-2 max-md:py-1 max-md:text-lg max-md:flex-shrink-0  cursor-pointer border text-xl font-semibold ${
            selectedDuration === "yakunlangan"
              ? " bg-transparent text-logoKok border-logoKok"
              : "bg-transparent text-qora border-kulrangOch"
          }`}
          onClick={() => handleDurationClick("yakunlangan")}
        >
          <p className="text-lg">Yakunlangan: 8</p>
        </div>
        <div
          className={`flex rounded-[10px] px-4 py-2 max-md:px-2 max-md:py-1 max-md:text-lg max-md:flex-shrink-0 cursor-pointer border text-xl font-semibold ${
            selectedDuration === "bekor"
              ? " bg-transparent text-logoKok border-logoKok"
              : "bg-transparent text-qora border-kulrangOch"
          }`}
          onClick={() => handleDurationClick("bekor")}
        >
          <p className="text-lg">Rad etilgan: 1</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5">
        {allElonlar.map((elon, index) => {
          if (selectedDuration === "aktiv") {
            return (
              elon.finish && elon.edit && <MyElonItem key={index} {...elon} />
            );
          } else if (selectedDuration === "tasdiq") {
            return (
              !elon.finish &&
              elon.top &&
              elon.edit && <MyElonItem key={index} {...elon} />
            );
          } else if (selectedDuration === "yakunlangan") {
            return (
              !elon.finish &&
              elon.top &&
              !elon.edit && <MyElonItem key={index} {...elon} />
            );
          } else if (selectedDuration === "bekor") {
            return (
              !elon.finish &&
              elon.top &&
              elon.edit && <MyElonItem key={index} {...elon} />
            );
          } else {
            return "";
          }
        })}
      </div>
      {/* {renderPagination()} */}
    </div>
  );
};

export default MyElon;
