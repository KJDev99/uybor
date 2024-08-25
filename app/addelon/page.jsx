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
import { useTranslation } from "react-i18next";

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
  const [seeMsgW, setSeeMsgW] = useState("0");
  const [seeMsgWA, setSeeMsgWA] = useState("0");

  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

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
    if (
      !(
        formData.ad_type &&
        formData.category &&
        formData.currency &&
        formData.description &&
        formData.district &&
        formData.price &&
        formData.region &&
        formData.title
      )
    ) {
      console.log("else data", formData);
      setSeeMsgWA("1");
      setTimeout(() => {
        setSeeMsgWA("0");
      }, 3000);
      return;
    }

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
      setSeeMsgW("1");
      setTimeout(() => {
        setSeeMsgW("0");
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
        {t("add0")}
      </h1>
      <form className="md:px-5" onSubmit={handleSubmit}>
        <h2 className="font-semibold text-2xl text-qora my-5 text-[16px] max-md:mt-0 max-md:mb-5">
          {t("add1")}
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
              {t("add2")}
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
              {t("add3")}
            </span>
          </label>
        </div>
        <div className="w-1/2 max-md:w-full">
          <KategoriyaTanlash
            categories={[
              t("APARTMENT"),
              t("HOUSE"),
              t("OFFICE"),
              t("SHOP"),
              t("HOTEL"),
            ]}
            heading={t("add4")}
            formData={formData}
            setFormData={setFormData}
            reqName="category"
          />
        </div>
        <div className="w-1/2 max-md:w-full">
          <SarlavhaKiritish
            label={t("add5")}
            placeholder={t("add6")}
            message={t("add7")}
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
            {t("add13")}
          </h2>
          <SarlavhaKiritish
            label={t("add14")}
            type="number"
            formData={formData}
            setFormData={setFormData}
            reqName="room"
          />
          <KategoriyaTanlash
            categories={[t("NEW"), t("OLD")]}
            heading={t("add34")}
            formData={formData}
            setFormData={setFormData}
            reqName="accommodation_type"
          />
          <KategoriyaTanlash
            categories={[t("PANEL"), t("BRICK"), t("MONOLITH"), t("BLOCK")]}
            heading={t("add35")}
            formData={formData}
            setFormData={setFormData}
            reqName="construction_type"
          />
          <SarlavhaKiritish
            label={t("add15")}
            type="number"
            formData={formData}
            setFormData={setFormData}
            reqName="house_built_year"
          />
          <KategoriyaTanlash
            categories={[t("bor"), t("yoq")]}
            heading={t("add36")}
            formData={formData}
            setFormData={setFormData}
            reqName="have_furniture"
          />
          <SarlavhaKiritish
            label={t("add16")}
            type="number"
            formData={formData}
            setFormData={setFormData}
            reqName="living_area"
          />
          <SarlavhaKiritish
            label={t("add17")}
            type="number"
            formData={formData}
            setFormData={setFormData}
            reqName="total_area"
          />
          <SarlavhaKiritish
            label={t("add18")}
            type="number"
            formData={formData}
            setFormData={setFormData}
            reqName="floor"
          />
          <SarlavhaKiritish
            label={t("add19")}
            type="number"
            formData={formData}
            setFormData={setFormData}
            reqName="total_floor"
          />
          <KategoriyaTanlash
            categories={[t("bor"), t("yoq")]}
            heading={t("add37")}
            formData={formData}
            setFormData={setFormData}
            reqName="have_broker_fee"
          />
        </div>
        <div className="w-3/4 flex flex-col  max-md:w-full">
          <h2 className="text-2xl font-medium ml-5 mt-5 mb-[10px]  max-md:mb-1 max-md:text-[16px] max-md:ml-[0px]">
            {t("add20")}
          </h2>
          <textarea
            placeholder={t("add21")}
            className="w-full h-[177px] px-3 py-4 border-kulrangOch  text-kulrang bg-yozish text-sm rounded-[10px] outline-none"
            value={formData.description}
            onChange={handleDescriptionChange}
          ></textarea>
          <p className="ml-5 text-kulrang mt-1 mb-5 text-sm">{t("add22")}</p>
        </div>

        <div className="w-1/2 flex flex-col  max-md:w-full">
          <h2 className="text-2xl font-medium ml-5  max-md:mb-1 max-md:text-[16px] max-md:ml-[0px]">
            {t("add23")}
          </h2>
          <SarlavhaKiritish
            label={t("add24")}
            type="text"
            formData={formData}
            setFormData={setFormData}
            reqName="user"
          />
          <SarlavhaKiritish
            label={t("add25")}
            type="text"
            formData={formData}
            setFormData={setFormData}
            reqName="phone"
          />
          <SarlavhaKiritish
            label={t("add26")}
            type="number"
            formData={formData}
            setFormData={setFormData}
            reqName="extra_phone"
          />
        </div>
        <div className="w-full flex justify-center my-10">
          <div className="w-1/2 h-[50px]" onClick={handleSubmit}>
            <Button main text={t("add27")} color="white" />
          </div>
        </div>
      </form>
      {seeMsg && <Msg status="success" seeMsg={seeMsg} text={t("add28")} />}
      {seeMsgW && <Msg status="warning" seeMsg={seeMsgW} text={t("add29")} />}
      {seeMsgWA && <Msg status="warning" seeMsg={seeMsgWA} text={t("add30")} />}
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
              title={t("add31")}
              text={t("add32")}
            />
            <button
              className="bg-logoKok rounded-[10px] text-white w-1/2 h-10 mx-auto"
              onClick={handleButtonClick}
            >
              {t("add33")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
