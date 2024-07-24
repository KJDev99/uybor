import Button from "@/components/Button";
import Link from "next/link";
import React from "react";
import { FaAngleLeft } from "react-icons/fa6";

const page = () => {
  return (
    <div className="md:p-[30px] rounded-[10px] bg-white gap-[30px] flex max-md:flex-col justify-between w-full md:h-[500px] mb-10">
      <Link
        href={"/profil"}
        className="md:hidden text-lg font-semibold flex items-center"
      >
        {" "}
        <FaAngleLeft />
        Profil
      </Link>
      <h2 className="text-lg text-[#343434] font-semibold md:hidden">To'lovlar</h2>
      <div className="flex flex-col p-[30px] max-md:p-5 h-[280px] bg-shadowcard !max-md:bg-transparent w-full max-md:h-[190px]">
        <h3 className="text-logoKok mb-[27px] text-2xl font-semibold max-md:text-[16px] max-md:mb-[10px]">
          Topuy hamyon
        </h3>
        <h2 className="text-qora flex-grow text-[28px] font-semibold max-md:text-lg">
          Ergashev Xoshimjon
        </h2>
        <p className="text-3xl text-qora font-bold max-md:text-2xl">
          180 000 <span className="text-2xl">so‘m</span>
        </p>
      </div>
      <div className="flex flex-col p-[30px] max-md:px-5 max-md:py-0 md:h-[280px] bg-shadowcard !max-md:bg-transparent w-full">
        <h3 className="text-qora mb-[27px] text-2xl font-semibold max-md:text-lg max-md:mb-[10px]">
          Hisobni to’ldirish
        </h3>
        <div className="flex-grow max-md:mb-5">
          <input
            type="text"
            placeholder="Summani kiriting"
            className="text-qora text-[18px] max-md:text-[16px] font-medium py-[10px] px-5 rounded-[10px] border border-kulrang outline-none w-full"
          />
        </div>
        <button className="h-[44px] w-full border-none bg-main outline-none text-white text-lg rounded-[10px]">
          To’ldirish
        </button>
      </div>
    </div>
  );
};

export default page;
