"use client";
import { useState } from "react";
import SavedImg from "@/assets/images/saveelon.svg";
import NoSavedImg from "@/assets/images/nosaveelon.svg";
import ShareElonImg from "@/assets/images/shareelon.svg";
import Image from "next/image";
import DetailPageImg from "./DetailPageImg";
import AddInfos from "./addInfos";

import ElonSlider from "./ElonSlider";

const DetailElon = () => {
  const [saved, setSaved] = useState(false);
  return (
    <div className="container">
      <div className="grid grid-cols-3">
        <div className="flex flex-col col-span-2 p-[30px]">
          <div className="flex justify-between">
            <h1 className="font-qora font-semibold text-2xl">
              Srochni sotiladi 6 xonali Yakkasaroy Rovd orqasida{" "}
            </h1>
            <Image
              src={saved ? SavedImg : NoSavedImg}
              alt="elon image"
              className="h-[30px] w-[30px] cursor-pointer "
              onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();
                setSaved((prev) => !prev);
              }}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h2 className="text-logoKok text-2xl font-semibold mb-[10px]">
                1 250 000 000 so’m
              </h2>
              <div className="flex items-center">
                <p className="text-sm font-medium mr-5 text-kulrang">
                  Joyalangan sana:
                </p>
                <p className="text-qora font-medium">18.06.2024</p>
              </div>
            </div>
            <div className="h-[33px] w-[33px] bbg-white rounded-full flex items-center  justify-center">
              <Image
                src={ShareElonImg}
                alt="elon image"
                className="h-[25px] w-[25px] cursor-pointer "
              />
            </div>
          </div>
          <div className="mt-5">
            <DetailPageImg />
          </div>
          <div className="flex flex-col">
            <h2 className="mt-[30px] mb-[10px] text-qora font-semibold">
              Qo’shimcha ma’lumotlar
            </h2>
            <AddInfos bg text1={"Turarjoy turi:"} text2={"Ikkilamchi"} />
            <AddInfos text1={"Qurilish turi:"} text2={"Panel"} />
            <AddInfos bg text1={"Xonalar soni:"} text2={"2"} />
            <AddInfos text1={"Qavat:"} text2={"3"} />
            <AddInfos bg text1={"Binoning qavatlari:"} text2={"9"} />
            <AddInfos text1={"Uy qurilgan yil:"} text2={"2004"} />
            <AddInfos bg text1={"Yashash maydoni:"} text2={"82"} />
            <AddInfos text1={"Umumiy maydoni:"} text2={"125"} />
            <AddInfos bg text1={"Mebel:"} text2={"Yo’q"} />
            <AddInfos text1={"Vositachilik haqi:"} text2={"Yo’q"} />
          </div>
          <div className="flex flex-col">
            <h2 className="mt-[20px] mb-[10px] text-qora font-semibold">
              Tavsif
            </h2>
            <p className="p-5 bg-white rounded-[10px] text-qora text-xl">
              Uy zo’r chotkiy daxshat o’ta baquvat. Har bitta g’ishti mehr bilan
              qo’yilgan, suvoqlarini juda chiroyli qilib o’zim qilganman. Remont
              qimisiz. O’zi zo’r. Hamma sharoitlari bor. WiFi, kirmoshina...
              hamma narsa bor. Mazza qilib kotta xolezi uyida yashagande
              yashorasiz
            </p>
          </div>
        </div>
        <div className="col-span-1 flex flex-col mt-[30px]">
          <div className="bg-white shadow-lg p-[30px] rounded-[10px]">
            <h2 className="text-xl mb-5 font-semibold text-qora">
              E’lon muallifi
            </h2>
            <div className="flex items-center">
              <img
                src="https://picsum.photos/75/75"
                alt="img"
                className="rounded-full"
              />
              <p className="text-2xl ml-[30px] font-semibold text-qora">
                Xoshimjon
              </p>
            </div>
            <div className="h-10 w-full border rounded-[10px] mt-[30px] mb-[15px] flex items-center justify-center">
              <a
                href="tel:+998901234567"
                className="text-xl font-semibold text-qora "
              >
                +99890 123 45 67
              </a>
            </div>
            <div className="h-10 w-full border rounded-[10px] flex items-center justify-center text-white bg-main">
              Muallifning barcha e’lonlari
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="mt-[30px] mb-5 text-qora font-semibold">Manzil</h2>
            <div className="flex">
              <p className="border border-yozish rounded-[10px] bg-white py-[6px] px-5  text-qora text-lg font-medium mr-5">
                Toshkent shahar
              </p>
              <p className="border border-yozish rounded-[10px] bg-white py-[6px] px-5  text-qora text-lg font-medium">
                Yunusobod tuman
              </p>
            </div>
            <p className="text-qora text-lg font-medium mt-[10px] mb-5">
              Yunusobod 10-daha, Farogat ko’chasi 21
            </p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12269.151690810271!2d64.44374555!3d39.755643449999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f5005d07f3e5d61%3A0x23e40e8c2b477b21!2sTURON%20PLAZA!5e0!3m2!1sru!2s!4v1720971052104!5m2!1sru!2s"
              width="full"
              height="280"
              loading="lazy"
              className="rounded-[10px]"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="flex flex-col mb-10">
        <h2 className="text-main mb-[30px] font-semibold text-2xl">
          Muallifning barcha e’lonlari
        </h2>
        <ElonSlider />
      </div>
      <div className="flex flex-col mb-[50px]">
        <h2 className="text-main mb-[30px] font-semibold text-2xl">
          O’xshash e‘lonlar
        </h2>
        <ElonSlider />
      </div>
    </div>
  );
};

export default DetailElon;
