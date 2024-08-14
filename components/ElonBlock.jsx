"use client";
import Image from "next/image";
import SavedImg from "@/assets/images/saveelon.svg";
import NoSavedImg from "@/assets/images/nosaveelon.svg";
import { CiLocationOn } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import CurrencyComponent from "./CurrencyComponent";
import { FaEye } from "react-icons/fa";

const ElonBlock = ({
  top,
  image,
  save,
  turi,
  name,
  address,
  data,
  price,
  id,
  see,
}) => {
  const [saved, setSaved] = useState(save);
  let view = useSelector((state) => state.view);

  let currencyNow = useSelector((state) => state.currency);

  useEffect(() => {
    const savedElons = JSON.parse(sessionStorage.getItem("savedElons")) || [];
    const isSaved = savedElons.some((elon) => elon.id === id);
    setSaved(isSaved);
  }, [id]);

  const handleSaveClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const newSavedStatus = !saved;
    setSaved(newSavedStatus);

    const savedElons = JSON.parse(sessionStorage.getItem("savedElons")) || [];
    const updatedElons = newSavedStatus
      ? [
          ...savedElons,
          {
            id,
            top,
            image,
            save: newSavedStatus,
            turi,
            name,
            address,
            data,
            price,
          },
        ]
      : savedElons.filter((elon) => elon.id !== id);

    sessionStorage.setItem("savedElons", JSON.stringify(updatedElons));
  };

  return (
    <>
      {view == "block" || see ? (
        <Link href={`/${id}`}>
          <div className="flex flex-col bg-white rounded-[20px] max-md:rounded-[5px] overflow-hidden shadow-lg">
            <div className="relative">
              {top && (
                <div className="absolute left-0 top-0 bg-sariq rounded-tl-[20px] rounded-tr-[0px] rounded-br-[15px] rounded-bl-[0px] color-white flex item items-center justify-center font-medium text-white h-[30px] w-[78px] max-md:w-[45px] max-md:h-[22px] max-md:rounded-tl-[5px] max-md:rounded-tr-[0px] max-md:rounded-br-[5px] max-md:rounded-bl-[0px] max-md:text-xs">
                  Top
                </div>
              )}
              <img
                src={image}
                alt={image}
                className="w-full h-[237px] object-cover max-md:h-[138px]"
              />
              <Image
                src={saved ? SavedImg : NoSavedImg}
                alt={image}
                className="absolute top-4 right-4 h-[30px] w-[30px] cursor-pointer z-10"
                onClick={handleSaveClick}
              />
              <div
                className={`absolute h-5 w-20 flex items-center justify-center text-white text-xs capitalize bottom-2 right-2 rounded-full max-md:w-[48px] max-md:h-4 max-md:text-[10px] ${
                  turi == "rent" ? "bg-ijara" : "bg-ochYashil"
                }`}
              >
                {turi == "rent" ? "Ijara" : "Sotiladi"}
              </div>
            </div>
            <div className="py-2 px-4 max-md:px-2 flex flex-col">
              <h3 className="line-clamp-2 text-qora text-lg font-medium max-md:text-sm max-md:line-clamp-1 h-[56px]">
                {name}
              </h3>
              <p className="text-sm text-qora font-medium md:hidden">
                <CurrencyComponent
                  amount={price}
                  currency={currencyNow == "UZS" ? "USD" : "UZS"}
                />
              </p>
              <div className="flex mt-2 mb-1 justify-between">
                <div className="flex items-center">
                  <CiLocationOn className="text-lg" />
                  <p className="text-sm text-kulrang ml-2 max-md:text-xs line-clamp-1">
                    {address}
                  </p>
                </div>
                <div className="flex items-center">
                  <FaEye className="text-[16px] text-kulrang" />
                  <p className="text-sm text-kulrang ml-2 max-md:text-xs line-clamp-1">
                    {/* {see} */}
                    1000
                  </p>
                </div>
              </div>
              <div className="flex justify-between mb-3 max-md:mb-2">
                <p className="text-sm text-kulrang">{data}</p>
                <p className="text-sm text-qora font-medium max-md:hidden">
                  <CurrencyComponent
                    amount={price}
                    currency={currencyNow == "UZS" ? "USD" : "UZS"}
                  />
                </p>
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <Link href={`/${id}`}>
          <div className="flex bg-white rounded-[20px] max-md:rounded-[5px] overflow-hidden shadow-lg md:relative md:h-[190px]">
            <div className="relative max-md:w-[130px] max-md:flex-shrink-0">
              {top && (
                <div className="absolute left-0 top-0 bg-sariq rounded-tl-[20px] rounded-tr-[0px] rounded-br-[15px] rounded-bl-[0px] color-white flex item items-center justify-center font-medium text-white h-[30px] w-[78px] max-md:w-[45px] max-md:h-[22px] max-md:rounded-tl-[5px] max-md:rounded-tr-[0px] max-md:rounded-br-[5px] max-md:rounded-bl-[0px] max-md:text-xs">
                  Top
                </div>
              )}
              <img
                src={image}
                alt={image}
                className="w-[268px] max-md:w-[136px] h-full object-cover"
              />

              <div
                className={`absolute h-5 w-20 flex items-center justify-center text-white text-xs capitalize bottom-2 right-2 rounded-full max-md:w-[48px] max-md:h-4 max-md:text-[10px] ${
                  turi == "rent" ? "bg-ijara" : "bg-ochYashil"
                }`}
              >
                {turi == "rent" ? "Ijara" : "Sotiladi"}
              </div>
              <Image
                src={saved ? SavedImg : NoSavedImg}
                alt={image}
                className="absolute top-3 right-3 h-[23px] w-[23px] cursor-pointer md:hidden"
                onClick={handleSaveClick}
              />
            </div>
            <Image
              src={saved ? SavedImg : NoSavedImg}
              alt={image}
              className="absolute top-4 right-4 h-[30px] w-[30px] cursor-pointer max-md:hidden"
              onClick={handleSaveClick}
            />
            <div className="py-5 px-5 max-md:p-[10px] flex flex-col flex-grow">
              <h3 className="line-clamp-2 text-qora text-xl font-semibold flex-grow max-md:text-sm max-md:mb-1">
                {name}
              </h3>
              <p className="text-2xl text-qora font-semibold md:hidden max-md:text-sm max-md:font-bold max-md:mb-5">
                <CurrencyComponent
                  amount={price}
                  currency={currencyNow == "UZS" ? "USD" : "UZS"}
                />
              </p>
              <div className="flex mt-2 mb-4 max-md:mb-1 justify-between">
                <div className="flex items-center">
                  <CiLocationOn className="text-lg" />
                  <p className="text-sm text-kulrang ml-2 max-md:text-xs">
                    {address}
                  </p>
                </div>

                <div className="flex items-center">
                  <FaEye className="text-[16px] text-kulrang" />
                  <p className="text-sm text-kulrang mx-2 max-md:text-xs line-clamp-1">
                    {/* {see} */}
                    10000
                  </p>
                </div>
              </div>
              <div className="flex justify-between mb-3 items-center">
                <p className="text-sm text-kulrang">{data}</p>
                <p className="text-2xl text-qora font-semibold max-md:hidden ">
                  <CurrencyComponent
                    amount={price}
                    currency={currencyNow == "UZS" ? "USD" : "UZS"}
                  />
                </p>
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default ElonBlock;
