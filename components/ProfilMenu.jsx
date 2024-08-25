"use client";
import Image from "next/image";
import React, { useState } from "react";
import MeningElonlarim from "@/assets/images/meningelonlarim.svg";
import Tolovlar from "@/assets/images/tolovlar.svg";
import Sozlamalar from "@/assets/images/sozlamalar.svg";
import Profilchiqish from "@/assets/images/profilchiqish.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

const ProfilMenu = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [selectedDuration, setSelectedDuration] = useState(pathname);
  const handleDurationClick = (duration) => {
    setSelectedDuration(duration);
  };

  return (
    <div
      className={`flex flex-col mt-[30px] max-md:mt-5 ${
        selectedDuration === "meningelonlarim"
      }`}
    >
      <div className="w-full gap-5 flex flex-col mb-10 md:min-h-[80vh]">
        <Link className="max-md:hidden" href={"/profil"}>
          <div
            className={`flex rounded-[10px] px-5 py-3 cursor-pointer text-xl font-semibold ${
              selectedDuration === "/profil"
                ? " bg-ochKok text-logoKok"
                : "bg-transparent text-qora"
            }`}
            onClick={() => handleDurationClick("/profil")}
          >
            <Image src={MeningElonlarim} alt="MeningElonlarim" />
            <p className="ml-4">{t("pmenu1")}</p>
          </div>
        </Link>
        <Link className="md:hidden" href={"/profil/myelon"}>
          <div
            className={`flex rounded-[10px] px-5 py-3 cursor-pointer text-xl font-semibold ${
              selectedDuration === "/profil/myelon"
                ? " bg-ochKok text-logoKok"
                : "bg-transparent text-qora"
            }`}
            onClick={() => handleDurationClick("/profil/myelon")}
          >
            <Image src={MeningElonlarim} alt="MeningElonlarim" />
            <p className="ml-4">{t("pmenu1")}</p>
          </div>
        </Link>
        <Link href={"/profil/hamkor"}>
          <div
            className={`flex rounded-[10px] px-5 py-3 cursor-pointer text-xl font-semibold ${
              selectedDuration === "/profil/hamkor"
                ? " bg-ochKok text-logoKok"
                : "bg-transparent text-qora"
            }`}
            onClick={() => handleDurationClick("/profil/hamkor")}
          >
            <Image src={Tolovlar} alt="hamkor" />
            <p className="ml-4">{t("pmenu2")}</p>
          </div>
        </Link>
        <Link href={"/profil/tolovlar"}>
          <div
            className={`flex rounded-[10px] px-5 py-3 cursor-pointer text-xl font-semibold ${
              selectedDuration === "/profil/tolovlar"
                ? " bg-ochKok text-logoKok"
                : "bg-transparent text-qora"
            }`}
            onClick={() => handleDurationClick("/profil/tolovlar")}
          >
            <Image src={Tolovlar} alt="tolovlar" />
            <p className="ml-4">{t("pmenu3")}</p>
          </div>
        </Link>
        <Link href={"/profil/sozlamalar"}>
          <div
            className={`flex rounded-[10px] px-5 py-3 cursor-pointer text-xl font-semibold ${
              selectedDuration === "/profil/sozlamalar"
                ? " bg-ochKok text-logoKok"
                : "bg-transparent text-qora"
            }`}
            onClick={() => handleDurationClick("/profil/sozlamalar")}
          >
            <Image src={Sozlamalar} alt="sozlamalar" />
            <p className="ml-4">{t("pmenu4")}</p>
          </div>
        </Link>
        <Link href={"/profil/chiqish"}>
          <div
            className={`flex rounded-[10px] px-5 py-3 cursor-pointer text-xl font-semibold ${
              selectedDuration === "/profil/chiqish"
                ? " bg-ochKok text-logoKok"
                : "bg-transparent text-qora"
            }`}
            onClick={() => handleDurationClick("/profil/chiqish")}
          >
            <Image src={Profilchiqish} alt="profilchiqish" />
            <p className="ml-4">{t("pmenu5")}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProfilMenu;
