import Image from "next/image";
import React from "react";
import Img from "@/assets/images/deleted.svg";
import Link from "next/link";

const EmptyAds = ({ text }) => {
  return (
    <div className="w-full min-h-[700px] flex flex-col justify-center items-center">
      <Image src={Img} alt="empty" className="w-[178px] mb-10" />
      <p className="font-semibold text-xl text-#343434">{text}</p>
      <Link href="/">
        <button className="text-white mt-[30px] h-[50px] w-[320px] flex justify-center items-center border-none outline-none rounded-[10px] text-lg font-semibold bg-[#015EA8]">
          Bosh sahifaga o‘tish
        </button>
      </Link>
    </div>
  );
};

export default EmptyAds;
