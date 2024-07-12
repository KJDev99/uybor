"use client";
import { useState } from "react";
import Image from "next/image";
import SeeBlock from "@/assets/images/seeblock.svg";
import SeeLine from "@/assets/images/seeline.svg";
import SeeBlockAct from "@/assets/images/seeblockact.svg";
import SeeLineAct from "@/assets/images/seelineact.svg";
import MainImg from "@/assets/images/asosiyrasm.png";
import ElonBlock from "./ElonBlock";
const TopElon = () => {
  const [view, setView] = useState("block");
  const [valyuta, setValyuta] = useState("uzs");

  return (
    <div className="flex flex-col container  ">
      <div className="flex justify-between mt-[50px] mb-[30px]">
        <h2 className="text-2xl text-qora font-semibold">
          1 420 ta e’lon mavjud
        </h2>
        <div className="flex">
          <div className="flex items-center">
            <p className="text-qora font-medium">Ko'rinishi:</p>
            <Image
              src={view == "block" ? SeeBlockAct : SeeBlock}
              alt="SeeBlock"
              onClick={() => setView("block")}
              className="mx-5 cursor-pointer"
            />
            <Image
              src={view == "line" ? SeeLineAct : SeeLine}
              alt="SeeLine"
              onClick={() => setView("line")}
              className="cursor-pointer"
            />
          </div>
          <div className="flex items-center">
            <p className="text-qora font-medium ml-16">Valyuta:</p>
            <p
              className={`mx-5 cursor-pointer font-medium ${
                valyuta == "uzs" ? "text-logoKok" : "text-kulrang"
              }`}
              onClick={() => setValyuta("uzs")}
            >
              UZS
            </p>
            <p
              className={` cursor-pointer font-medium ${
                valyuta == "usd" ? "text-logoKok" : "text-kulrang"
              }`}
              onClick={() => setValyuta("usd")}
            >
              USD
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <h2 className="text-main mb-[30px] font-semibold text-2xl">
          Top e’lonlar
        </h2>
        <div
          className={`flex flex-wrap ${
            view == "block"
              ? "grid grid-cols-4 gap-7"
              : "grid grid-cols-1 gap-5"
          }`}
        >
          <ElonBlock
            image={MainImg}
            top={true}
            save={true}
            turi={"sotiladi"}
            name={"Srochni sotiladi 6 xonali Yakkasaroy Rovd orqasida"}
            address={"Toshkent, Yakksaroy"}
            data={"17.05.2024"}
            price={"1 250 000 000 so‘m "}
            view={view}
          />
          <ElonBlock
            image={MainImg}
            top={true}
            save={false}
            turi={"ijara"}
            name={"Srochni sotiladi 6 xonali Yakkasaroy Rovd orqasida"}
            address={"Toshkent, Yakksaroy"}
            data={"17.05.2024"}
            price={"1 250 000 000 so‘m "}
            view={view}
          />
          <ElonBlock
            image={MainImg}
            top={true}
            save={false}
            turi={"sotiladi"}
            name={"Srochni sotiladi 6 xonali Yakkasaroy Rovd orqasida"}
            address={"Toshkent, Yakksaroy"}
            data={"17.05.2024"}
            price={"1 250 000 000 so‘m "}
            view={view}
          />
          <ElonBlock
            image={MainImg}
            top={true}
            save={true}
            turi={"ijara"}
            name={"Srochni sotiladi 6 xonali Yakkasaroy Rovd orqasida"}
            address={"Toshkent, Yakksaroy"}
            data={"17.05.2024"}
            price={"1 250 000 000 so‘m "}
            view={view}
          />
          <ElonBlock
            image={MainImg}
            top={true}
            save={false}
            turi={"ijara"}
            name={"Srochni sotiladi 6 xonali Yakkasaroy Rovd orqasida"}
            address={"Toshkent, Yakksaroy"}
            data={"17.05.2024"}
            price={"1 250 000 000 so‘m "}
            view={view}
          />
          <ElonBlock
            image={MainImg}
            top={true}
            save={false}
            turi={"sotiladi"}
            name={"Srochni sotiladi 6 xonali Yakkasaroy Rovd orqasida"}
            address={"Toshkent, Yakksaroy"}
            data={"17.05.2024"}
            price={"1 250 000 000 so‘m "}
            view={view}
          />
          <ElonBlock
            image={MainImg}
            top={true}
            save={false}
            turi={"ijara"}
            name={"Srochni sotiladi 6 xonali Yakkasaroy Rovd orqasida"}
            address={"Toshkent, Yakksaroy"}
            data={"17.05.2024"}
            price={"1 250 000 000 so‘m "}
            view={view}
          />
          <ElonBlock
            image={MainImg}
            top={true}
            save={false}
            turi={"ijara"}
            name={"Srochni sotiladi 6 xonali Yakkasaroy Rovd orqasida"}
            address={"Toshkent, Yakksaroy"}
            data={"17.05.2024"}
            price={"1 250 000 000 so‘m "}
            view={view}
          />
        </div>
      </div>
    </div>
  );
};

export default TopElon;
