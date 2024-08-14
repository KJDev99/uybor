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
import { AiOutlineClose } from "react-icons/ai";
import Msg from "@/components/Msg";
import Loader from "@/components/Loader";

const getToken = () => Cookies.get("authToken");
const page = () => {
  const token = getToken();
  const [selectedOption, setSelectedOption] = useState("");
  const [formData, setFormData] = useState({
    ad_type: "",
  });

  const [topDay, setTopDay] = useState("");
  const [seeTop, SetSeeTop] = useState(false);
  const [seeMsg, setSeeMsg] = useState("0");

  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const data = new FormData();
  const fields = [
    "ad_type",
    "phone",
    "title",
    "category",
    "price",
    "currency",
    "region",
    "district",
    "latitude",
    "longitude",
    "room",
    "accommodation_type",
    "construction_type",
    "house_built_year",
    "have_furniture",
    "living_area",
    "total_area",
    "floor",
    "total_floor",
    "have_broker_fee",
    "description",
    "extra_phone",
  ];

  // Iterate through the fields and append only if they have a value
  fields.forEach((field) => {
    if (formData[field]) {
      data.append(field, formData[field]);
    }
  });
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
    setLoading(true);
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
      // router.push("/");
      SetSeeTop(true);
      setSeeMsg("1");
      setTimeout(() => {
        setSeeMsg("0");
      }, 3000);
      // Formani tozalash yoki foydalanuvchiga tasdiq xabari ko'rsatish
    } catch (error) {
      console.error("Error creating ad:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = async () => {
    const authToken = Cookies.get("authToken");
    if (!authToken) {
      return;
    }

    try {
      const response = await api.post(
        `/api/v1/ads/${id}/raise/top`,
        { day: +topDay },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      window.location.reload();
      setIsOpenTop(false);
    } catch (error) {
      setSeeMsg("1");
      console.log(seeMsg);
      setTimeout(() => {
        setSeeMsg("0");
        router.push("/profil/tolovlar");
      }, 2000);
    }
  };
  const closeModal = (e) => {
    e.preventDefault();
    router.push("/profil");
  };

  if (loading) return <Loader type="ball-grid-pulse" />;
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
          <SarlavhaKiritish
            label="Xonalar soni"
            type="number"
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
            categories={["Panelli", "G'isht", "Monolit", "Blokli"]}
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
            type="text"
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
        {seeMsg && (
          <Msg
            status="success"
            seeMsg={seeMsg}
            text="E'lon Muvofaqqiyatli qo'shildi"
          />
        )}
        {seeTop && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-10">
            <div
              className="relative bg-[#F8FCFF] p-10 rounded-md shadow-md w-[860px] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-5 right-5 text-qora"
              >
                <AiOutlineClose size={24} />
              </button>
              <TopgaChiqarish
                setTopDay={setTopDay}
                title="E’loningizni Topga chiqarmoqchimisiz?"
                text="E’loningizni sotish imkoniyatlarini oshiring va ko’proq xaridorlarni jalb qiling.
    Siz uchun manfaatli bo’lgan quyidagi paketlardan birini tanlang va e’loningizni Topga ko’taring."
              />
              <button
                className="bg-logoKok rounded-[10px] text-white w-1/2 h-10 mx-auto"
                onClick={handleButtonClick}
              >
                Topga ko’tarish
              </button>
            </div>
          </div>
        )}
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
