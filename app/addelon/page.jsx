"use client";
import AddNarx from "@/components/AddNarx";
import KategoriyaTanlash from "@/components/kategoriyaTanlash";
import SarlavhaKiritish from "@/components/SarlavhaKiritish";
import AddManzil from "@/components/AddManzil";
import React, { useState } from "react";
import AddImage from "@/components/AddImage";
import TopgaChiqarish from "@/components/TopgaChiqarish";
import Button from "@/components/Button";

const page = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.id);
  };
  return (
    <div className="container">
      <h1 className="mt-10 text-qora text-3xl font-semibold max-md:my-2 max-md:text-lg">
        E’lon joylashtirish
      </h1>
      <div className="md:px-5">
        <h2 className="font-semibold text-2xl text-qora my-5 text-[16px] max-md:mt-0 max-md:mb-5">
          E’loningiz haqida ma’lumot bering
        </h2>
        <form className="flex">
          <label htmlFor="sotish" className="flex items-center mr-4 ">
            <input
              type="radio"
              id="sotish"
              name="ijara"
              onChange={handleOptionChange}
            />
            <span
              className={`ml-2 text-lg font-medium max-md:text-sm ${
                selectedOption === "sotish" ? "text-logoKok" : "text-kulrang"
              }`}
            >
              Sotish uchun
            </span>
          </label>
          <label
            htmlFor="ijara"
            className="flex items-center ml-[50px] max-md:ml-5"
          >
            <input
              type="radio"
              id="ijara"
              name="ijara"
              onChange={handleOptionChange}
            />
            <span
              className={`ml-2 text-lg font-medium max-md:text-sm ${
                selectedOption === "ijara" ? "text-logoKok" : "text-kulrang"
              }`}
            >
              Ijaraga berish uchun
            </span>
          </label>
        </form>
        <div className="w-1/2 max-md:w-full">
          <KategoriyaTanlash
            categories={[
              "Kvartiralar",
              "Xovlilar",
              "Ofislar",
              "Do'konlar",
              "Mehmonxona va dachalar",
            ]}
            heading="Kategoriyani tanlang"
          />
        </div>
        <div className="w-1/2 max-md:w-full">
          <SarlavhaKiritish
            label="Sarlavhani kiriting"
            placeholder="Sarlavha"
            message="Kamida 10 belgi"
            type="text"
          />
        </div>
        <div className="w-1/2 max-md:w-full">
          <AddNarx />
        </div>
        <div className="w-3/4 max-md:w-full">
          <AddManzil />
        </div>
        <div className="w-full">
          <AddImage />
        </div>
        <div className="w-1/2 flex flex-col max-md:w-full">
          <h2 className="text-2xl font-medium ml-5 max-md:mb-1 max-md:text-[16px] max-md:ml-[0px]">
            Qo’shimcha ma’lumotlar
          </h2>
          <KategoriyaTanlash
            categories={["1", "2", "3", "4", "5"]}
            heading="Xonalar soni"
          />
          <KategoriyaTanlash
            categories={["birlamchi", "Ikkilamchi"]}
            heading="Turarjoy turi"
          />
          <KategoriyaTanlash
            categories={["Panel", "G'isht"]}
            heading="Qurilish turi"
          />
          <SarlavhaKiritish label="Uy qurilgan yil" type="number" />
          <KategoriyaTanlash categories={["Bor", "Yo'q"]} heading="Mebel" />
          <SarlavhaKiritish label="Yashash maydoni:" type="number" />
          <SarlavhaKiritish label="Umumiy maydoni:" type="number" />
          <SarlavhaKiritish label="Qavat" type="number" />
          <SarlavhaKiritish label="Binoning qavatlari" type="number" />
          <KategoriyaTanlash
            categories={["Bor", "Yo'q"]}
            heading="Vositachilik haqqi"
          />
        </div>
        <div className="w-3/4 flex flex-col  max-md:w-full">
          <h2 className="text-2xl font-medium ml-5 mt-5 mb-[10px]  max-md:mb-1 max-md:text-[16px] max-md:ml-[0px]">
            Tavsif
          </h2>
          <textarea
            placeholder="O‘zingizni shu e’lonni ko‘rayotgan odam o’riniga qo’ying va tavsif yozing"
            className="w-full h-[177px] px-3 py-4 border-kulrangOch  text-kulrang bg-yozish text-sm rounded-[10px] outline-none"
          ></textarea>
          <p className="ml-5 text-kulrang mt-1 mb-5 text-sm">
            Kamida 40ta belgi
          </p>
        </div>

        <div className="w-1/2 flex flex-col  max-md:w-full">
          <h2 className="text-2xl font-medium ml-5  max-md:mb-1 max-md:text-[16px] max-md:ml-[0px]">
            E’lon beruvchi
          </h2>
          <SarlavhaKiritish label="Ism" type="text" />
          <SarlavhaKiritish label="Telefon raqam" type="number" />
          <SarlavhaKiritish label="Qo’shimcha telefon raqam" type="number" />
        </div>
        <div className="w-3/4  max-md:w-full">
          <TopgaChiqarish />
        </div>
        <div className="w-full flex justify-center mb-10">
          <div className="w-1/2 h-[50px]">
            <Button main text="E’lonni joylash" color="white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
