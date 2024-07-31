"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setView } from "@/store";
import Image from "next/image";
import SeeBlock from "@/assets/images/seeblock.svg";
import SeeLine from "@/assets/images/seeline.svg";
import SeeBlockAct from "@/assets/images/seeblockact.svg";
import SeeLineAct from "@/assets/images/seelineact.svg";
import MainImg from "@/assets/images/asosiyrasm.png";
import ElonBlock from "./ElonBlock";
import api from "@/lib/api";

const TopElon = () => {
  const [valyuta, setValyuta] = useState("uzs");

  const view = useSelector((state) => state.view);
  const dispatch = useDispatch();

  const handleViewChange = (newView) => {
    dispatch(setView(newView));
  };

  const [ads, setAds] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await api.get("/api/v1/ads/list?is_top=true");
        const transformedAds = response.data.results.map((ad) => ({
          image: ad.media,
          top: ad.is_top,
          save: true,
          turi: ad.ad_type.toLowerCase(),
          name: ad.title,
          address: `${ad.region.name_uz} ${ad.district.name_uz}`,
          data: new Date(ad.created).toLocaleDateString("en-GB"),
          price: `${ad.price.toLocaleString()} ${ad.currency}`,
          view: view,
          id: ad.id,
        }));
        setAds(transformedAds);
        console.log(transformedAds);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAds();
  }, []);

  return (
    <div className="flex flex-col container  ">
      <div className="flex justify-between mt-[50px] md:mb-[30px] max-md:flex-col-reverse">
        <h2 className="text-2xl text-qora font-semibold max-md:text-lg  max-md:mt-5 max-md:mb-2">
          1 420 ta e’lon mavjud
        </h2>
        <div className="flex max-md:justify-between">
          <div className="flex items-center ">
            <p className="text-qora font-medium">Ko'rinishi:</p>
            <Image
              src={view == "block" ? SeeBlockAct : SeeBlock}
              alt="SeeBlock"
              onClick={() => handleViewChange("block")}
              className="mx-5 cursor-pointer"
            />
            <Image
              src={view == "line" ? SeeLineAct : SeeLine}
              alt="SeeLine"
              onClick={() => handleViewChange("line")}
              className="cursor-pointer"
            />
          </div>
          <div className="flex items-center">
            <p className="text-qora font-medium md:ml-16">Valyuta:</p>
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
        <h2 className="text-main mb-[30px] max-md:mb-[10px] font-semibold text-2xl max-md:text-lg">
          Top e’lonlar
        </h2>
        <div
          className={`flex flex-wrap ${
            view == "block"
              ? "grid grid-cols-4 gap-7 max-md:gap-[15px] max-md:grid-cols-2"
              : "grid grid-cols-1 gap-5"
          }`}
        >
          {ads.map((elon, index) => (
            <ElonBlock key={index} {...elon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopElon;
