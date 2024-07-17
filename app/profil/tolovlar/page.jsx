import Button from "@/components/Button";
import React from "react";

const page = () => {
  return (
    <div className="p-[30px] rounded-[10px] bg-white gap-[30px] flex justify-between w-full h-[500px] mb-10">
      <div className="flex flex-col p-[30px] h-[280px] bg-shadowcard w-full">
        <h3 className="text-logoKok mb-[27px] text-2xl font-semibold">
          Topuy hamyon
        </h3>
        <h2 className="text-qora flex-grow text-[28px] font-semibold">
          Ergashev Xoshimjon
        </h2>
        <p className="text-3xl text-qora font-bold">
          180 000 <span className="text-2xl">so‘m</span>
        </p>
      </div>
      <div className="flex flex-col p-[30px] h-[280px] bg-shadowcard w-full">
        <h3 className="text-qora mb-[27px] text-2xl font-semibold">
          Hisobni to’ldirish
        </h3>
        <div className="flex-grow">
          <input
            type="text"
            placeholder="Summani kiriting"
            className="text-qora text-[18px] font-medium py-[10px] px-5 rounded-[10px] border-kulrang outline-none w-full"
          />
        </div>
        <button className="h-[44px] w-full border-none bg-main outline-none text-white text-lg rounded-[10px]">To’ldirish</button>
      </div>
    </div>
  );
};

export default page;
