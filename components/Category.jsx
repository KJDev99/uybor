import Image from "next/image";
import React from "react";

const Category = ({ image, text }) => {
  return (
    <div className="flex flex-col bg-white rounded-[10px] w-[224px] items-center shadow-lg max-md:flex-shrink-0 max-md:w-[90px]">
      <Image className="w-full rounded-[10px]" src={image} alt='text' />
      <p className="text-sm font-semibold text-qora md:my-2 max-md:h-[30px] max-md:text-[10px] text-center mdd:leading-3 flex items-center">{text}</p>
    </div>
  );
};

export default Category;
