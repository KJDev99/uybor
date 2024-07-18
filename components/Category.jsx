import Image from "next/image";
import React from "react";

const Category = ({ image, text }) => {
  return (
    <div className="flex flex-col bg-white rounded-[10px] w-[224px] items-center shadow-lg">
      <Image className="w-full rounded-[10px]" src={image} alt={text} />
      <p className="text-sm font-semibold text-qora my-2">{text}</p>
    </div>
  );
};

export default Category;
