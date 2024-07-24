import SarlavhaKiritish from "@/components/SarlavhaKiritish";
import Link from "next/link";
import React from "react";
import { FaAngleLeft } from "react-icons/fa6";

const page = () => {
  return (
    <div className="md:bg-white md:p-[30px] rounded-[10px] mb-[30px] flex justify-between max-md:flex-col">
      <Link
        href={"/profil"}
        className="md:hidden text-lg font-semibold flex items-center max-md:mb-5"
      >
        {" "}
        <FaAngleLeft />
        Profil
      </Link>
      <h2 className="text-lg text-[#343434] font-semibold md:hidden">
        Sozlamalar
      </h2>
      <div className="flex justify-between  w-full max-md:flex-col-reverse">
        <div className="w-3/5 flex flex-col max-md:w-full">
          <h2 className="text-xl text-qora font-semibold max-md:hidden">
            Profil ma’lumotlari
          </h2>
          <SarlavhaKiritish label="Ismingiz" type="text" />
          <SarlavhaKiritish label="Telefon raqam" type="number" />
          <h2 className="text-xl text-qora font-semibold mt-[30px]">
            Parolni yangilash
          </h2>
          <SarlavhaKiritish label="Parolni kiriting" type="number" />
          <SarlavhaKiritish label="Yangi parolni kiriting" type="number" />
          <button className="h-[44px] w-full border-none bg-main outline-none text-white text-lg rounded-[10px] mt-[30px]">
            Saqlash
          </button>
        </div>
        <div className="w-2/5 flex flex-col items-center max-md:w-full">
          <div className="relative w-[223px] h-[223px] max-md:h-[102px] max-md:w-[102px] rounded-full mt-10 overflow-hidden ">
            <img
              className="w-full h-full object-cover"
              src="/images/person.png"
              alt="user"
            />
            <div className="absolute bottom-0 left-0 h-[58px] max-md:h-[30px] max-md:text-[10px] w-full bg-[#ffffffcd] text-lg text-logoKok flex items-center justify-center ">
              O’zgartirish
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
