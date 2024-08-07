import Image from "next/image";
import React from "react";
import Img from "@/assets/images/boshelon.svg";

const EmptyAds = ({ text }) => {
  return (
    <div className="w-full min-h-[600px] flex flex-col justify-center items-center">
      <Image src={Img} alt="empty" className="w-[178px] mb-10" />
      <p className="font-semibold text-xl text-#343434">{text}</p>
    </div>
  );
};

export default EmptyAds;
