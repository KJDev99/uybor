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
    <div className="container bg-white p-[30px]">
      <h1 className=" text-qora text-2xl font-semibold">E’lonni tahrirlash</h1>
      <div className="px-5">
      
        <div className="w-full">
          <TopgaChiqarish />
        </div>
        <div className="border w-full border-kulrang"></div>
        <div className="w-full">
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
        <div className="w-full">
          <SarlavhaKiritish
            label="Sarlavhani kiriting"
            placeholder="Sarlavha"
            type="text"
          />
        </div>
        <div className="w-full">
          <AddNarx />
        </div>
        <div className="w-full">
          <AddManzil />
        </div>
        <div className="w-full">
          <AddImage textImage={true} size={'120'}/>
        </div>
        <div className="w-full flex flex-col">
          <h2 className="text-2xl font-medium ml-5">Ko’proq ma’lumotlar</h2>
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
        <div className="w-full flex flex-col">
          <h2 className="text-2xl font-medium ml-5 mt-5 mb-[10px]">Tavsif</h2>
          <textarea
            placeholder="O‘zingizni shu e’lonni ko‘rayotgan odam o’riniga qo’ying va tavsif yozing"
            className="w-full h-[177px] px-3 py-4 border-kulrangOch  text-kulrang bg-yozish text-sm rounded-[10px] outline-none"
          ></textarea>
          <p className="ml-5 text-kulrang mt-1 mb-5 text-sm">
            Kamida 40ta belgi
          </p>
        </div>

        <div className="w-full flex flex-col">
          <h2 className="text-2xl font-medium ml-5">E’lon beruvchi</h2>
          <SarlavhaKiritish label="Ism" type="text" />
          <SarlavhaKiritish label="Telefon raqam" type="number" />
          <SarlavhaKiritish label="Qo’shimcha telefon raqam" type="number" />
        </div>

        <div className="w-full flex justify-center mb-10">
          <div className="w-full h-[50px] mt-3">
            <Button main text="Saqlash" color="white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
