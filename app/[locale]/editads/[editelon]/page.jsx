"use client";
import React, { useState, useEffect } from "react";
import AddNarx from "@/components/AddNarx";
import KategoriyaTanlash from "@/components/kategoriyaTanlash";
import SarlavhaKiritish from "@/components/SarlavhaKiritish";
import AddManzil from "@/components/AddManzil";
import AddImage from "@/components/AddImage";
import Button from "@/components/Button";
import { FaAngleLeft } from "react-icons/fa6";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api"; // Ensure this path is correct for your project
import Cookies from "js-cookie";
import Msg from "@/components/Msg";
const getToken = () => Cookies.get("authToken");
const EditAdPage = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const { editelon } = useParams();

  const [seeMsg, setSeeMsg] = useState("0");
  const [seeMsgW, setSeeMsgW] = useState("0");

  let adId = editelon;
  const [formData, setFormData] = useState({
    ad_type: "",
    title: "",
    category: "",
    price: "",
    currency: "",
    region: "",
    district: "",
    adress: "",
    room: "",
    accommodation_type: "",
    construction_type: "",
    house_built_year: "",
    have_furniture: "",
    living_area: "",
    total_area: "",
    floor: "",
    total_floor: "",
    have_broker_fee: "",
    description: "",
    extra_phone: "",
    media: [],
  });
  const [getData, setGetData] = useState();
  const [media, setMedia] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch the existing ad data and populate the formData state
    const fetchAdData = async () => {
      try {
        const response = await api.get(`/api/v1/ads/${adId}/detail`);
        setGetData(response.data);
        setFormData(response.data);
        // Handle media if necessary
        response.data;
        setSelectedOption(response.data.ad_type);
      } catch (error) {
        console.error("Error fetching ad data:", error);
      }
    };

    fetchAdData();
  }, [adId]);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.id);
    setFormData((prevData) => ({
      ...prevData,
      ad_type: e.target.id,
    }));
    console.log(getData);
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
    const data = new FormData();
    data.append("ad_type", formData.ad_type);
    data.append("phone", formData.phone);
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("currency", formData.currency);

    // data.append("region", formData.region.id);
    typeof formData.region == "string"
      ? data.append("region", formData.region)
      : data.append("region", formData.region.id);
    typeof formData.district == "number"
      ? data.append("district", formData.district)
      : data.append("district", formData.district.id);
    formData.adress &&
      formData.adress &&
      data.append("adress", formData.adress);
    formData.room && data.append("room", formData.room);
    formData.accommodation_type &&
      data.append("accommodation_type", formData.accommodation_type);
    formData.construction_type &&
      data.append("construction_type", formData.construction_type);
    formData.house_built_year &&
      data.append("house_built_year", formData.house_built_year);
    formData.have_furniture &&
      data.append("have_furniture", formData.have_furniture);
    formData.living_area && data.append("living_area", formData.living_area);
    formData.total_area && data.append("total_area", formData.total_area);
    formData.floor && data.append("floor", formData.floor);
    formData.total_floor && data.append("total_floor", formData.total_floor);
    formData.have_broker_fee &&
      data.append("have_broker_fee", formData.have_broker_fee);
    formData.description && data.append("description", formData.description);
    formData.extra_phone && data.append("extra_phone", formData.extra_phone);
    formData.media &&
      formData.media?.forEach((fileObj) => {
        data.append("urls", fileObj?.file);
      });
    formData.media2 &&
      formData.media2?.forEach((fileObj) => {
        data.append("media", fileObj?.file);
      });
    const token = getToken();

    if (!token) {
      console.error("User is not authenticated");
      return;
    }
    try {
      // PUT request to update the ad
      await api.patch(`/api/v1/ads/${adId}/update`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setSeeMsg("1");
      setTimeout(() => {
        setSeeMsg("0");
        router.push("/profil/myelon");
      }, 1000);
    } catch (error) {
      setSeeMsgW(1);
      setTimeout(() => {
        setSeeMsgW("0");
      }, 2000);
      console.error("Error updating ad:", error);
    }
  };

  return (
    <div className="container md:bg-white p-[30px] max-md:p-0">
      <Link
        href={"/profil/myelon"}
        className="md:hidden text-lg font-medium flex items-center"
      >
        <FaAngleLeft />
        Mening e'lonlarim
      </Link>
      <h1 className=" text-qora text-2xl font-semibold max-md:my-2 max-md:text-lg px-5">
        E’lonni tahrirlash
      </h1>
      {getData && (
        <div className="px-5">
          <div className="border w-full border-kulrang"></div>
          <div className="flex my-3">
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
              formData={formData}
              setFormData={setFormData}
              reqName="category"
              value={getData?.category}
            />
          </div>
          <div className="w-full">
            <SarlavhaKiritish
              label="Sarlavhani kiriting"
              placeholder="Sarlavha"
              type="text"
              formData={formData}
              setFormData={setFormData}
              reqName="title"
              value={getData.title} // Assumes getData has a 'value' property
            />
          </div>
          <div className="w-full">
            <AddNarx
              formData={formData}
              setFormData={setFormData}
              value={getData}
            />
          </div>
          <div className="w-full">
            <AddManzil
              formData={formData}
              setFormData={setFormData}
              value={getData}
            />
          </div>
          <div className="w-full">
            <AddImage
              textImage={true}
              size={"120"}
              formData={formData}
              setFormData={setFormData}
              value={getData.media}
            />
          </div>
          <div className="w-full flex flex-col">
            <h2 className="text-2xl font-medium ml-5 max-md:mb-1 max-md:text-[16px] max-md:ml-[0px]">
              Ko’proq ma’lumotlar
            </h2>
            <SarlavhaKiritish
              label="Xonalar soni"
              type="number"
              formData={formData}
              setFormData={setFormData}
              reqName="room"
              value={getData?.room}
            />

            <KategoriyaTanlash
              categories={["birlamchi", "Ikkilamchi"]}
              heading="Turarjoy turi"
              formData={formData}
              setFormData={setFormData}
              reqName="accommodation_type"
              value={getData?.accommodation_type}
            />
            <KategoriyaTanlash
              categories={["Panel", "G'isht"]}
              heading="Qurilish turi"
              formData={formData}
              setFormData={setFormData}
              reqName="construction_type"
              value={getData?.construction_type}
            />
            <SarlavhaKiritish
              label="Uy qurilgan yil"
              type="number"
              formData={formData}
              setFormData={setFormData}
              reqName="house_built_year"
              value={getData?.house_built_year}
            />
            <KategoriyaTanlash
              categories={["Bor", "Yo'q"]}
              heading="Mebel"
              formData={formData}
              setFormData={setFormData}
              reqName="have_furniture"
              value={getData?.have_furniture}
            />
            <SarlavhaKiritish
              label="Yashash maydoni"
              type="number"
              formData={formData}
              setFormData={setFormData}
              reqName="living_area"
              value={getData?.living_area}
            />
            <SarlavhaKiritish
              label="Umumiy maydoni"
              type="number"
              formData={formData}
              setFormData={setFormData}
              reqName="total_area"
              value={getData?.total_area}
            />
            <SarlavhaKiritish
              label="Qavat"
              type="number"
              formData={formData}
              setFormData={setFormData}
              reqName="floor"
              value={getData?.floor}
            />
            <SarlavhaKiritish
              label="Binoning qavatlari"
              type="number"
              formData={formData}
              setFormData={setFormData}
              reqName="total_floor"
              value={getData?.total_floor}
            />
            <KategoriyaTanlash
              categories={["Bor", "Yo'q"]}
              heading="Vositachilik haqqi"
              formData={formData}
              setFormData={setFormData}
              reqName="have_broker_fee"
              value={getData?.have_broker_fee}
            />
          </div>
          <div className="w-full flex flex-col">
            <h2 className="text-2xl font-medium ml-5 mt-5 mb-[10px] max-md:mb-1 max-md:text-[16px] max-md:ml-[0px]">
              Tavsif
            </h2>
            <textarea
              value={formData.description}
              onChange={handleDescriptionChange}
              placeholder="O‘zingizni shu e’lonni ko‘rayotgan odam o’riniga qo’ying va tavsif yozing"
              className="w-full h-[177px] px-3 py-4 border-kulrangOch text-kulrang bg-yozish text-sm rounded-[10px] outline-none"
            ></textarea>
            <p className="ml-5 text-kulrang mt-1 mb-5 text-sm">
              Kamida 40ta belgi
            </p>
          </div>

          <div className="w-full flex flex-col">
            <h2 className="text-2xl font-medium ml-5 max-md:mb-1 max-md:text-[16px] max-md:ml-[0px]">
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
              value={getData?.extra_phone}
            />
          </div>

          <div className="w-full flex justify-center mb-10">
            <div className="w-full h-[50px] mt-3" onClick={handleSubmit}>
              <Button main text="Saqlash" color="white" />
            </div>
          </div>
        </div>
      )}
      {seeMsg && (
        <Msg
          status="success"
          seeMsg={seeMsg}
          text="E'lon Muvofaqqiyatli o'zgartirildi"
        />
      )}
      {seeMsgW && (
        <Msg
          status="warning"
          seeMsg={seeMsgW}
          text="Barcha ma'lumotlarni to'ldiring"
        />
      )}
    </div>
  );
};

export default EditAdPage;

// Example usage in Next.js
// export async function getServerSideProps(context) {
//   const { adId } = context.params; // Get the adId from the URL

//   return {
//     props: {
//       adId,
//     },
//   };
// }

// export default EditAdPage;
