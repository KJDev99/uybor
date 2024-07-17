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
          <div className="flex flex-col bg-white rounded-[20px] overflow-hidden shadow-lg">
            <div className="relative">
              {top && (
                <div className="absolute left-0 top-0 bg-sariq rounded-tl-[20px] rounded-tr-[0px] rounded-br-[15px] rounded-bl-[0px] color-white flex item items-center justify-center font-medium text-white h-[30px] w-[78px]">
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
                className={`absolute h-5 w-20 flex items-center justify-center text-white text-xs capitalize bottom-2 right-2 rounded-full ${
                  turi == "ijara" ? "bg-ijara" : "bg-ochYashil"
                }`}
              >
                {turi}
              </div>
            </div>
            <div className="py-2 px-4 flex flex-col">
              <h3 className="line-clamp-2 text-qora text-lg font-medium">
                {name}
              </h3>
              <div className="flex mt-2 mb-1">
                <CiLocationOn className="text-lg" />
                <p className="text-sm text-kulrang ml-2 ">{address}</p>
              </div>
              <div className="flex justify-between mb-3">
                <p className="text-sm text-kulrang">{data}</p>
                <p className="text-sm text-qora font-medium">{price}</p>
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <Link href="/detailspage">
          <div className="flex bg-white rounded-[20px] overflow-hidden shadow-lg relative">
            <div className="relative">
              {top && (
                <div className="absolute left-0 top-0 bg-sariq rounded-tl-[20px] rounded-tr-[0px] rounded-br-[15px] rounded-bl-[0px] color-white flex item items-center justify-center font-medium text-white h-[30px] w-[78px]">
                  Top
                </div>
              )}
              <Image src={image} alt={image} className="w-full" />

              <div
                className={`absolute h-5 w-20 flex items-center justify-center text-white text-xs capitalize bottom-2 right-2 rounded-full ${
                  turi == "ijara" ? "bg-ijara" : "bg-ochYashil"
                }`}
              >
                {turi}
              </div>
            </div>
            <Image
              src={saved ? SavedImg : NoSavedImg}
              alt={image}
              className="absolute top-4 right-4 h-[30px] w-[30px] cursor-pointer"
              onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();
                setSaved((prev) => !prev);
              }}
            />
            <div className="py-5 px-5 flex flex-col flex-grow">
              <h3 className="line-clamp-2 text-qora text-xl font-semibold flex-grow">
                {name}
              </h3>
              <div className="flex mt-2 mb-4">
                <CiLocationOn className="text-lg" />
                <p className="text-sm text-kulrang ml-2 ">{address}</p>
              </div>
              <div className="flex justify-between mb-3 items-center">
                <p className="text-sm text-kulrang">{data}</p>
                <p className="text-2xl text-qora font-semibold">{price}</p>
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default ElonBlock;