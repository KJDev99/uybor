"use client";
import Image from "next/image";
import SavedImg from "@/assets/images/saveelon.svg";
import NoSavedImg from "@/assets/images/nosaveelon.svg";
import { CiLocationOn } from "react-icons/ci";
import { useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";

const ElonBlock = ({
  top,
  image,
  save,
  turi,
  name,
  address,
  data,
  price,
  viewBlock,
}) => {
  const [saved, setSaved] = useState(save);
  let view = useSelector((state) => state.view);
  if (viewBlock) {
    view = viewBlock;
  } else {
  }
  return (
    <>
      {view == "block" ? (
        <Link href="/detailspage">
          <div className="flex flex-col bg-white rounded-[20px] max-md:rounded-[5px] overflow-hidden shadow-lg">
            <div className="relative">
              {top && (
                <div className="absolute left-0 top-0 bg-sariq rounded-tl-[20px] rounded-tr-[0px] rounded-br-[15px] rounded-bl-[0px] color-white flex item items-center justify-center font-medium text-white h-[30px] w-[78px] max-md:w-[45px] max-md:h-[22px] max-md:rounded-tl-[5px] max-md:rounded-tr-[0px] max-md:rounded-br-[5px] max-md:rounded-bl-[0px] max-md:text-xs">
                  Top
                </div>
              )}
              <Image src={image} alt={image} className="w-full" />
              <Image
                src={saved ? SavedImg : NoSavedImg}
                alt={image}
                className="absolute top-4 right-4 h-[30px] w-[30px] cursor-pointer z-10"
                onClick={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                  setSaved((prev) => !prev);
                }}
              />
              <div
                className={`absolute h-5 w-20 flex items-center justify-center text-white text-xs capitalize bottom-2 right-2 rounded-full max-md:w-[48px] max-md:h-4 text-[10px] ${
                  turi == "ijara" ? "bg-ijara" : "bg-ochYashil"
                }`}
              >
                {turi}
              </div>
            </div>
            <div className="py-2 px-4 max-md:px-2 flex flex-col">
              <h3 className="line-clamp-2 text-qora text-lg font-medium max-md:text-sm max-md:line-clamp-1">
                {name}
              </h3>
              <p className="text-sm text-qora font-medium md:hidden">{price}</p>
              <div className="flex mt-2 mb-1">
                <CiLocationOn className="text-lg" />
                <p className="text-sm text-kulrang ml-2 ">{address}</p>
              </div>
              <div className="flex justify-between mb-3 max-md:mb-2">
                <p className="text-sm text-kulrang">{data}</p>
                <p className="text-sm text-qora font-medium max-md:hidden">
                  {price}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <Link href="/detailspage">
          <div className="flex bg-white rounded-[20px] max-md:rounded-[5px] overflow-hidden shadow-lg md:relative">
            <div className="relative">
              {top && (
                <div className="absolute left-0 top-0 bg-sariq rounded-tl-[20px] rounded-tr-[0px] rounded-br-[15px] rounded-bl-[0px] color-white flex item items-center justify-center font-medium text-white h-[30px] w-[78px] max-md:w-[45px] max-md:h-[22px] max-md:rounded-tl-[5px] max-md:rounded-tr-[0px] max-md:rounded-br-[5px] max-md:rounded-bl-[0px] max-md:text-xs">
                  Top
                </div>
              )}
              <Image
                src={image}
                alt={image}
                className="w-full h-full object-cover"
              />

              <div
                className={`absolute h-5 w-20 flex items-center justify-center text-white text-xs capitalize bottom-2 right-2 rounded-full ${
                  turi == "ijara" ? "bg-ijara" : "bg-ochYashil"
                }`}
              >
                {turi}
              </div>
              <Image
                src={saved ? SavedImg : NoSavedImg}
                alt={image}
                className="absolute top-3 right-3 h-[23px] w-[23px] cursor-pointer md:hidden"
                onClick={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                  setSaved((prev) => !prev);
                }}
              />
            </div>
            <Image
              src={saved ? SavedImg : NoSavedImg}
              alt={image}
              className="absolute top-4 right-4 h-[30px] w-[30px] cursor-pointer max-md:hidden"
              onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();
                setSaved((prev) => !prev);
              }}
            />
            <div className="py-5 px-5 max-md:p-[10px] flex flex-col flex-grow">
              <h3 className="line-clamp-2 text-qora text-xl font-semibold flex-grow max-md:text-sm max-md:mb-1">
                {name}
              </h3>
              <p className="text-2xl text-qora font-semibold md:hidden max-md:text-sm max-md:font-bold max-md:mb-5">
                {price}
              </p>
              <div className="flex mt-2 mb-4 max-md:mb-1">
                <CiLocationOn className="text-lg" />
                <p className="text-sm text-kulrang ml-2 ">{address}</p>
              </div>
              <div className="flex justify-between mb-3 items-center">
                <p className="text-sm text-kulrang">{data}</p>
                <p className="text-2xl text-qora font-semibold max-md:hidden ">
                  {price}
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
