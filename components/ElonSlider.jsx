import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import ElonBlock from "./ElonBlock";
import MainImg from "@/assets/images/asosiyrasm.png";
import { Navigation } from "swiper/modules";

export default function ElonSlider() {

  const view = "block";

  const allElonlar = [
    {
      image: MainImg,
      top: false,
      save: false,
      turi: "ijara",
      name: "Srochni sotiladi 6 xonali Yakkasaroy Rovd orqasida",
      address: "Toshkent, Yakksaroy",
      data: "17.05.2024",
      price: "1 250 000 000 so‘m ",
      viewBlock: "block",
    },
    {
      image: MainImg,
      top: false,
      save: true,
      turi: "sotiladi",
      name: "Srochni sotiladi 6 xonali Yakkasaroy Rovd orqasida",
      address: "Toshkent, Yakksaroy",
      data: "17.05.2024",
      price: "1 250 000 000 so‘m ",
      viewBlock: "block",
    },
    {
      image: MainImg,
      top: false,
      save: true,
      turi: "sotiladi",
      name: "Srochni sotiladi 6 xonali Yakkasaroy Rovd orqasida",
      address: "Toshkent, Yakksaroy",
      data: "17.05.2024",
      price: "1 250 000 000 so‘m ",
      viewBlock: "block",
    },
    {
      image: MainImg,
      top: false,
      save: true,
      turi: "sotiladi",
      name: "Srochni sotiladi 6 xonali Yakkasaroy Rovd orqasida",
      address: "Toshkent, Yakksaroy",
      data: "17.05.2024",
      price: "1 250 000 000 so‘m ",
      viewBlock: "block",
    },
    {
      image: MainImg,
      top: false,
      save: false,
      turi: "ijara",
      name: "Srochni sotiladi 6 xonali Yakkasaroy Rovd orqasida",
      address: "Toshkent, Yakksaroy",
      data: "17.05.2024",
      price: "1 250 000 000 so‘m ",
      viewBlock: "block",
    },
    {
      image: MainImg,
      top: false,
      save: true,
      turi: "sotiladi",
      name: "Srochni sotiladi 6 xonali Yakkasaroy Rovd orqasida",
      address: "Toshkent, Yakksaroy",
      data: "17.05.2024",
      price: "1 250 000 000 so‘m ",
      viewBlock: "block",
    },
    {
      image: MainImg,
      top: false,
      save: true,
      turi: "sotiladi",
      name: "Srochni sotiladi 6 xonali Yakkasaroy Rovd orqasida",
      address: "Toshkent, Yakksaroy",
      data: "17.05.2024",
      price: "1 250 000 000 so‘m ",
      viewBlock: "block",
    },
    {
      image: MainImg,
      top: false,
      save: true,
      turi: "sotiladi",
      name: "Srochni sotiladi 6 xonali Yakkasaroy Rovd orqasida",
      address: "Toshkent, Yakksaroy",
      data: "17.05.2024",
      price: "1 250 000 000 so‘m ",
      viewBlock: "block",
    },
  ];
  
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        navigation={true}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        modules={[Navigation]}
        className="mySwiper mySwiper3"
      >
        {allElonlar.map((elon, index) => (
          <SwiperSlide key={index} className="flex w-auto">
            <ElonBlock {...elon} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
