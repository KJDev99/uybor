"use client";
import AddNarx from "@/components/AddNarx";
import KategoriyaTanlash from "@/components/kategoriyaTanlash";
import SarlavhaKiritish from "@/components/SarlavhaKiritish";
import AddManzil from "@/components/AddManzil";
import React, { useState } from "react";
import AddImage from "@/components/AddImage";
import TopgaChiqarish from "@/components/TopgaChiqarish";
import Button from "@/components/Button";
import Cookies from "js-cookie";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

const getToken = () => Cookies.get("authToken");
const page = () => {
  const token = getToken();
  const [selectedOption, setSelectedOption] = useState("");
  const [formData, setFormData] = useState({
    ad_type: "",
  });
  const router = useRouter();
  const data = new FormData();
  data.append("ad_type", formData.ad_type);
  data.append("phone", formData.phone);
  data.append("title", formData.title);
  data.append("category", formData.category);
  data.append("price", formData.price);
  data.append("currency", formData.currency);
  data.append("region", formData.region);
  data.append("district", formData.district);
  data.append("adress", formData.adress);
  data.append("room", formData.room);
  data.append("accommodation_type", formData.accommodation_type);
  data.append("construction_type", formData.construction_type);
  data.append("house_built_year", formData.house_built_year);
  data.append("have_furniture", formData.have_furniture);
  data.append("living_area", formData.living_area);
  data.append("total_area", formData.total_area);
  data.append("floor", formData.floor);
  data.append("total_floor", formData.total_floor);
  data.append("have_broker_fee", formData.have_broker_fee);
  data.append("description", formData.description);
  data.append("extra_phone", formData.extra_phone);
  if (formData.media && formData.media.length > 0) {
    formData.media.forEach((fileObj) => {
      data.append("media", fileObj.file); // Append each file under the key 'media'
    });
  }

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.id);
    setFormData({ ...formData, ad_type: e.target.id });
  };

  const handleDescriptionChange = (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      description: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Tokenni olish
    const token = getToken();

    if (!token) {
      console.error("User is not authenticated");
      return;
    }

    try {
      // API so'rovini yuborish
      const response = await api.post(`/api/v1/ads/create`, data, {
        headers: {
          "Content-Type": "multipart/form-data", // FormData yuborish uchun
          Authorization: `Bearer ${token}`, // Tokenni Authorization headerida yuborish
        },
      });
      router.push("/");
      // Formani tozalash yoki foydalanuvchiga tasdiq xabari ko'rsatish
    } catch (error) {
      console.error("Error creating ad:", error);
    }
  };
  return (
    <div className="container">
      <h1 className="mt-10 text-qora text-3xl font-semibold max-md:my-2 max-md:text-lg">
        E’lon joylashtirish
      </h1>
      <form className="md:px-5" onSubmit={handleSubmit}>
        <h2 className="font-semibold text-2xl text-qora my-5 text-[16px] max-md:mt-0 max-md:mb-5">
          E’loningiz haqida ma’lumot bering
        </h2>
        <div className="flex">
          <label htmlFor="SELL" className="flex items-center mr-4 ">
            <input
              type="radio"
              id="SELL"
              name="ad_type"
              onChange={handleOptionChange}
              checked={selectedOption === "SELL"}
            />
            <span
              className={`ml-2 text-lg font-medium max-md:text-sm ${
                selectedOption === "SELL" ? "text-logoKok" : "text-kulrang"
              }`}
            >
              Sotish uchun
            </span>
          </label>
          <label
            htmlFor="RENT"
            className="flex items-center ml-[50px] max-md:ml-5"
          >
            <input
              type="radio"
              id="RENT"
              name="ad_type"
              onChange={handleOptionChange}
              checked={selectedOption === "RENT"}
            />
            <span
              className={`ml-2 text-lg font-medium max-md:text-sm ${
                selectedOption === "RENT" ? "text-logoKok" : "text-kulrang"
              }`}
            >
              Ijaraga berish uchun
            </span>
          </label>
        </div>
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
            formData={formData}
            setFormData={setFormData}
            reqName="category"
          />
        </div>
        <div className="w-1/2 max-md:w-full">
          <SarlavhaKiritish
            label="Sarlavhani kiriting"
            placeholder="Sarlavha"
            message="Kamida 10 belgi"
            type="text"
            formData={formData}
            setFormData={setFormData}
            reqName="title"
          />
        </div>
        <div className="w-1/2 max-md:w-full">
          <AddNarx formData={formData} setFormData={setFormData} />
        </div>
        <div className="w-3/4 max-md:w-full">
          <AddManzil formData={formData} setFormData={setFormData} />
        </div>
        <div className="w-full">
          <AddImage formData={formData} setFormData={setFormData} />
        </div>
        <div className="w-1/2 flex flex-col max-md:w-full">
          <h2 className="text-2xl font-medium ml-5 max-md:mb-1 max-md:text-[16px] max-md:ml-[0px]">
            Qo’shimcha ma’lumotlar
          </h2>
          <KategoriyaTanlash
            categories={["1", "2", "3", "4", "5"]}
            heading="Xonalar soni"
            formData={formData}
            setFormData={setFormData}
            reqName="room"
          />
          <KategoriyaTanlash
            categories={["birlamchi", "Ikkilamchi"]}
            heading="Turarjoy turi"
            formData={formData}
            setFormData={setFormData}
            reqName="accommodation_type"
          />
          <KategoriyaTanlash
            categories={["Panel", "G'isht"]}
            heading="Qurilish turi"
            formData={formData}
            setFormData={setFormData}
            reqName="construction_type"
          />
          <SarlavhaKiritish
            label="Uy qurilgan yil"
            type="number"
            formData={formData}
            setFormData={setFormData}
            reqName="house_built_year"
          />
          <KategoriyaTanlash
            categories={["Bor", "Yo'q"]}
            heading="Mebel"
            formData={formData}
            setFormData={setFormData}
            reqName="have_furniture"
          />
          <SarlavhaKiritish
            label="Yashash maydoni:"
            type="number"
            formData={formData}
            setFormData={setFormData}
            reqName="living_area"
          />
          <SarlavhaKiritish
            label="Umumiy maydoni:"
            type="number"
            formData={formData}
            setFormData={setFormData}
            reqName="total_area"
          />
          <SarlavhaKiritish
            label="Qavat"
            type="number"
            formData={formData}
            setFormData={setFormData}
            reqName="floor"
          />
          <SarlavhaKiritish
            label="Binoning qavatlari"
            type="number"
            formData={formData}
            setFormData={setFormData}
            reqName="total_floor"
          />
          <KategoriyaTanlash
            categories={["Bor", "Yo'q"]}
            heading="Vositachilik haqqi"
            formData={formData}
            setFormData={setFormData}
            reqName="have_broker_fee"
          />
        </div>
        <div className="w-3/4 flex flex-col  max-md:w-full">
          <h2 className="text-2xl font-medium ml-5 mt-5 mb-[10px]  max-md:mb-1 max-md:text-[16px] max-md:ml-[0px]">
            Tavsif
          </h2>
          <textarea
            placeholder="O‘zingizni shu e’lonni ko‘rayotgan odam o’riniga qo’ying va tavsif yozing"
            className="w-full h-[177px] px-3 py-4 border-kulrangOch  text-kulrang bg-yozish text-sm rounded-[10px] outline-none"
            value={formData.description}
            onChange={handleDescriptionChange}
          ></textarea>
          <p className="ml-5 text-kulrang mt-1 mb-5 text-sm">
            Kamida 40ta belgi
          </p>
        </div>

        <div className="w-1/2 flex flex-col  max-md:w-full">
          <h2 className="text-2xl font-medium ml-5  max-md:mb-1 max-md:text-[16px] max-md:ml-[0px]">
            E’lon beruvchi
          </h2>
          <SarlavhaKiritish
            label="Ism"
            type="text"
            formData={formData}
            setFormData={setFormData}
            reqName="user"
          />
          <SarlavhaKiritish
            label="Telefon raqam"
            type="number"
            formData={formData}
            setFormData={setFormData}
            reqName="phone"
          />
          <SarlavhaKiritish
            label="Qo’shimcha telefon raqam"
            type="number"
            formData={formData}
            setFormData={setFormData}
            reqName="extra_phone"
          />
        </div>
        {/* <div className="w-3/4  max-md:w-full">
          <TopgaChiqarish />
        </div> */}
        <div className="w-full flex justify-center my-10">
          <div className="w-1/2 h-[50px]" onClick={handleSubmit}>
            <Button main text="E’lonni joylash" color="white" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default page;
