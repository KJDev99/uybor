"use client";
import Image from "next/image";
import React, { useState } from "react";
import MeningElonlarim from "@/assets/images/meningelonlarim.svg";
import Tolovlar from "@/assets/images/tolovlar.svg";
import Sozlamalar from "@/assets/images/sozlamalar.svg";
import Profilchiqish from "@/assets/images/profilchiqish.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ProfilMenu = () => {
  const [selectedDuration, setSelectedDuration] = useState("meningelonlarim");
  const pathname = usePathname();
  const handleDurationClick = (duration) => {
    setSelectedDuration(duration);
  };

  return (
    <div
      className={`flex flex-col mt-[30px] max-md:mt-5 ${
        selectedDuration === "meningelonlarim"
      }`}
    >
      <div className="w-full gap-5 flex flex-col mb-10">
        <Link className="max-md:hidden" href={"/profil"}>
          <div
            className={`flex rounded-[10px] px-5 py-3 cursor-pointer text-xl font-semibold ${
              selectedDuration === "meningelonlarim"
                ? " bg-ochKok text-logoKok"
                : "bg-transparent text-qora"
            }`}
            onClick={() => handleDurationClick("meningelonlarim")}
          >
            <Image src={MeningElonlarim} alt="MeningElonlarim" />
            <p className="ml-4">Mening e’lonlarim</p>
          </div>
        </Link>
        <Link className="md:hidden" href={"/profil/myelon"}>
          <div
            className={`flex rounded-[10px] px-5 py-3 cursor-pointer text-xl font-semibold ${
              selectedDuration === "meningelonlarim"
                ? " bg-ochKok text-logoKok"
                : "bg-transparent text-qora"
            }`}
            onClick={() => handleDurationClick("meningelonlarim")}
          >
            <Image src={MeningElonlarim} alt="MeningElonlarim" />
            <p className="ml-4">Mening e’lonlarim</p>
          </div>
        </Link>
        <Link href={"/profil/tolovlar"}>
          <div
            className={`flex rounded-[10px] px-5 py-3 cursor-pointer text-xl font-semibold ${
              selectedDuration === "tolovlar"
                ? " bg-ochKok text-logoKok"
                : "bg-transparent text-qora"
            }`}
            onClick={() => handleDurationClick("tolovlar")}
          >
            <Image src={Tolovlar} alt="tolovlar" />
            <p className="ml-4">To’lovlar</p>
          </div>
        </Link>
        <Link href={"/profil/sozlamalar"}>
          <div
            className={`flex rounded-[10px] px-5 py-3 cursor-pointer text-xl font-semibold ${
              selectedDuration === "sozlamalar"
                ? " bg-ochKok text-logoKok"
                : "bg-transparent text-qora"
            }`}
            onClick={() => handleDurationClick("sozlamalar")}
          >
            <Image src={Sozlamalar} alt="sozlamalar" />
            <p className="ml-4">Sozlamalar</p>
          </div>
        </Link>
        <Link href={"/profil/chiqish"}>
          <div
            className={`flex rounded-[10px] px-5 py-3 cursor-pointer text-xl font-semibold ${
              selectedDuration === "profilchiqish"
                ? " bg-ochKok text-logoKok"
                : "bg-transparent text-qora"
            }`}
            onClick={() => handleDurationClick("profilchiqish")}
          >
            <Image src={Profilchiqish} alt="profilchiqish" />
            <p className="ml-4">Profildan chiqish</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProfilMenu;
