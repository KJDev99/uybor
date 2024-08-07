import Image from "next/image";
import LogoImg from "@/assets/images/logo.svg";
import { FaFacebook } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import Link from "next/link";
const Footer = () => {
  return (
    <div className="h-full bg-[#042037] pt-[50px]">
      <div className="container flex flex-col">
        <div className="grid grid-cols-3 mb-10 ">
          <div className="flex flex-col items-center max-md:col-span-3 max-md:items-start max-md:mb-[30px]">
            <Image src={LogoImg} alt="Logo" className="w-[74px]" />
            <div className="flex mt-7">
              <a href="https://t.me/topuy_official" target="blank">
                <FaTelegram className="text-white text-3xl mx-5 max-md:text-2xl max-md:mr-5 max-md:ml-0" />
              </a>
              <a href="https://instagram.com/topuy_official" target="blank">
                <FaInstagram className="text-white text-3xl mx-5 max-md:text-2xl max-md:mr-5 max-md:ml-0" />
              </a>
              <a href="https://instagram.com/topuy_official" target="blank">
                <FaFacebook className="text-white text-3xl mx-5 max-md:text-2xl max-md:mr-5 max-md:ml-0" />
              </a>
            </div>
          </div>
          <div className="flex flex-col max-md:col-span-3">
            <h3 className="text-kulrangOch text-sm font-bold mb-[10px]">
              Biz haqimizda
            </h3>
            <a
              href="tel:+998974667788"
              className="text-kulrangOch text-sm mb-3"
            >
              +998 97 466 77 88
            </a>
            <a
              href="mailto:opuyofficial@gmail.com"
              className="text-kulrangOch text-sm mb-3"
            >
              opuyofficial@gmail.com
            </a>
            <a href="tel:" className="text-kulrangOch text-sm mb-3"></a>
            <p className="text-kulrangOch text-sm mb-3">
              Navoiy shahar, Navoiy tumani
            </p>
          </div>
          <div className="flex flex-col max-md:col-span-3">
            <Link href="/foydalanishshartlari">
              <p className="text-kulrangOch text-sm mb-3">
                Foydalanish shartlari
              </p>
            </Link>
            <Link href="/profil">
              <p className="text-kulrangOch text-sm mb-3">Mening e’lonlarim</p>
            </Link>
            <Link href="/profil/sozlamalar">
              <p className="text-kulrangOch text-sm mb-3">Profil</p>
            </Link>
          </div>
        </div>
        <div className="text-kulrangOch text-xs font-semibold py-[15px]  border-t-[0.5px] border-kulrangOch text-center">
          Copyright 2024. Topuy.uz made by{" "}
          <a
            className="text-logoOch font-black text-sm"
            target="blank"
            href="https://instagram.com/upgrow.uz"
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
