"use client";
import { useState } from "react";
import Image from "next/image";
import SeeBlock from "@/assets/images/seeblock.svg";
import SeeLine from "@/assets/images/seeline.svg";
import SeeBlockAct from "@/assets/images/seeblockact.svg";
import SeeLineAct from "@/assets/images/seelineact.svg";
const AllElon = () => {
  const [view, setView] = useState("block");

  return (
    <div className="flex flex-col container  ">
      <div className="flex justify-between mt-[50px] mb-[30px]">
        <h2 className="text-2xl text-qora">1 420 ta e’lon mavjud</h2>
        <div className="flex">
          <div className="flex">
            <p className="text-qora font-medium">Ko'rinishi:</p>
            <Image
              src={view ? SeeBlockAct : SeeBlock}
              alt="SeeBlock"
              onClick={() => setView("line")}
            />
            <Image
              src={view ? SeeLine : SeeLineAct}
              alt="SeeLine"
              onClick={() => setView("block")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllElon;
