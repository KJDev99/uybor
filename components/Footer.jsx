import Image from "next/image";
import LogoImg from "@/assets/images/logo.svg";
import { FaFacebook } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="h-full bg-[#042037] pt-[50px]">
      <div className="container flex flex-col">
        <div className="grid grid-cols-3 mb-10">
          <div className="flex flex-col items-center ">
            <Image src={LogoImg} alt="Logo" className="w-[74px]" />
            <div className="flex mt-7">
              <FaFacebook className="text-white text-3xl mx-5" />
              <FaInstagram className="text-white text-3xl mx-5" />
              <FaTelegram className="text-white text-3xl mx-5" />
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-kulrangOch text-sm font-bold mb-[10px]">
              Biz haqimizda
            </h3>
            <p className="text-kulrangOch text-sm mb-3">+998 90 123 45 67</p>
            <p className="text-kulrangOch text-sm mb-3">info@topuy.uz</p>
            <p className="text-kulrangOch text-sm mb-3">
              Toshkent shahar, Shayxontohur tumani
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-kulrangOch text-sm mb-3">
              Foydalanish shartlari
            </p>
            <p className="text-kulrangOch text-sm mb-3">Mening e’lonlarim</p>
            <p className="text-kulrangOch text-sm mb-3">Profil</p>
          </div>
        </div>
        <div className="text-kulrangOch text-xs font-semibold py-[15px]  border-t-[0.5px] border-kulrangOch ">
          Copyright 2024. Topuy.uz made by Upgrow. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
