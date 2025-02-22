"use client";
import Image from "next/image";
import LogoImg from "@/assets/images/logo1.svg";
import { FaFacebook } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import Link from "next/link";
import { useTranslation } from "react-i18next";
const Footer = () => {
  const { t } = useTranslation();
  return (
    <div className="h-full bg-[#042037] pt-[50px]">
      <div className="container flex flex-col">
        <div className="grid grid-cols-3 mb-10 ">
          <div className="flex flex-col items-center max-md:col-span-3 max-md:items-start max-md:mb-[30px]">
            <Image src={LogoImg} alt="Logo" className="w-[74px]" />
            <div className="flex mt-7">
              <a href="https://t.me/topuy_rasmiy" target="blank">
                <FaTelegram className="text-white text-3xl mx-5 max-md:text-2xl max-md:mr-5 max-md:ml-0" />
              </a>
              <a href="https://www.instagram.com/topuy_rasmiy/" target="blank">
                <FaInstagram className="text-white text-3xl mx-5 max-md:text-2xl max-md:mr-5 max-md:ml-0" />
              </a>
              <a href="https://www.facebook.com/topuy.rasmiy" target="blank">
                <FaFacebook className="text-white text-3xl mx-5 max-md:text-2xl max-md:mr-5 max-md:ml-0" />
              </a>
            </div>
          </div>
          <div className="flex flex-col max-md:col-span-3">
            <h3 className="text-kulrangOch text-sm font-bold mb-[10px]">
              {t("footer1")}
            </h3>
            <a
              href="tel:+998974667788"
              className="text-kulrangOch text-sm mb-3"
            >
              +998 97 466 77 88
            </a>
            <a
              href="mailto:topuyofficial@gmail.com"
              className="text-kulrangOch text-sm mb-3"
            >
              topuyofficial@gmail.com
            </a>
            <a href="tel:" className="text-kulrangOch text-sm mb-3"></a>
            <p className="text-kulrangOch text-sm mb-3">{t("footer2")}</p>
          </div>
          <div className="flex flex-col max-md:col-span-3">
            <Link href="/foydalanishshartlari">
              <p className="text-kulrangOch text-sm mb-3">{t("footer3")}</p>
            </Link>
            <Link href="/profil">
              <p className="text-kulrangOch text-sm mb-3">{t("footer4")}</p>
            </Link>
            <Link href="/profil/sozlamalar">
              <p className="text-kulrangOch text-sm mb-3">{t("footer5")}</p>
            </Link>
          </div>
        </div>
        <div className="text-kulrangOch text-xs font-semibold py-[15px]  border-t-[0.5px] border-kulrangOch text-center">
          Copyright 2024. Topuy.uz made by{" "}
          <a
            className="text-logoOch font-black text-sm"
            target="blank"
            href="https://upgrow.uz/"
          >
            Upgrow agency
          </a>
          . All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
