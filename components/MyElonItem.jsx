"use client";
import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";
import EditImg from "@/assets/images/editelon.svg";
import StarImg from "@/assets/images/starelon.svg";
import FinishImg from "@/assets/images/yakunlash.svg";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import TopgaChiqarish from "./TopgaChiqarish";

const MyElonItem = ({
  top,
  image,
  turi,
  name,
  address,
  data,
  price,
  edit,
  finish,
  status,
  id,
  handleConfirmAction,
}) => {
  const [isOpenTop, setIsOpenTop] = useState(false);
  const [isOpenFinish, setIsOpenFinish] = useState(false);
  console.log(status);
  const openModalTop = () => {
    setIsOpenTop(true);
    document.body.style.overflow = "hidden";
  };
  const openModalFinish = () => {
    setIsOpenFinish(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsOpenTop(false);
    setIsOpenFinish(false);
    document.body.style.overflow = "auto";
  };
  const handleConfirm = () => {
    console.log("asd");
    handleConfirmAction(id);
    closeModal();
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
    const year = date.getUTCFullYear();
    return `${day}.${month}.${year}`;
  };

  return (
    <>
      <div className="flex bg-white rounded-[20px] max-md:rounded-[5px] overflow-hidden shadow-lg relative z-0">
        <div className="relative max-md:w-[130px] max-md:flex-shrink-0">
          {top && (
            <div className="absolute left-0 top-0 bg-sariq rounded-tl-[20px] rounded-tr-[0px] rounded-br-[15px] rounded-bl-[0px] color-white flex item items-center justify-center font-medium text-white h-[30px] w-[78px] max-md:w-[45px] max-md:h-[22px] max-md:rounded-tl-[5px] max-md:rounded-tr-[0px] max-md:rounded-br-[5px] max-md:rounded-bl-[0px] max-md:text-xs">
              Top
            </div>
          )}
          <img
            src={image}
            alt={image}
            className="w-[230px] h-[190px] object-cover"
          />

          <div
            className={`absolute h-5 w-20 flex items-center justify-center text-white text-xs capitalize bottom-2 right-2 rounded-full max-md:w-[48px] max-md:h-4 max-md:text-[10px] ${
              turi == "RENT" ? "bg-ijara" : "bg-ochYashil"
            }`}
          >
            {turi == "RENT" ? "Ijara" : "Sotiladi"}
          </div>
        </div>
        <div className="py-5 px-5 max-md:p-[10px] flex flex-col flex-grow">
          <h3 className="line-clamp-2 text-qora text-xl font-semibold flex-grow  max-md:text-sm max-md:mb-1">
            {name}
          </h3>
          <p className="text-2xl text-qora font-semibold md:hidden max-md:text-sm max-md:font-bold max-md:mb-5">
            {price} So'm
          </p>
          <div className="flex mt-2 mb-4 max-md:mb-1">
            <CiLocationOn className="text-lg" />
            <p className="text-sm text-kulrang ml-2 max-md:text-xs">
              {address}
            </p>
          </div>
          <div className="flex justify-between mb-3 items-center">
            <p className="text-sm text-kulrang">{formatDate(data)}</p>
            <p className="text-2xl text-qora font-semibold max-md:hidden ">
              {price} So'm
            </p>
          </div>
          <div className="flex justify-end gap-5 border-t border-kulrang pt-[10px] max-md:hidden">
            {!top && status == "aktiv" && (
              <button
                onClick={openModalTop}
                className="text text-qora px-4 py-1 rounded-md font-medium bg-[#FFE8BC] outline-none border-none flex justify-center items-center"
              >
                <Image src={StarImg} alt="edit" className="mr-2" />
                Topga chiqarish
              </button>
            )}
            {(status == "aktiv" || status == "tasdiq") && (
              <Link href={"/profil/editelon"}>
                <button className="text text-qora px-4 py-1 rounded-md font-medium bg-[#E7F4FF] outline-none border-none flex justify-center items-center">
                  <Image src={EditImg} alt="edit" className="mr-2" />
                  Tahrirlash
                </button>
              </Link>
            )}
            {status == "aktiv" && (
              <button
                onClick={openModalFinish}
                className="text text-qora px-4 py-1 rounded-md font-medium bg-[#CFFFDD] outline-none border-none flex justify-center items-center"
              >
                <Image src={FinishImg} alt="edit" className="mr-2" />
                Yakunlash
              </button>
            )}
            {status == "bekor" && (
              <button className="text cursor-not-allowed text-white px-4 py-1 rounded-md font-medium bg-[#FF0000] outline-none border-none flex justify-center items-center">
                Rad etilgan
              </button>
            )}
          </div>
        </div>
      </div>
      {isOpenTop && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-10"
          onClick={closeModal}
        >
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
              title="E’loningizni Topga chiqarmoqchimisiz?"
              text="E’loningizni sotish imkoniyatlarini oshiring va ko’proq xaridorlarni jalb qiling.
Siz uchun manfaatli bo’lgan quyidagi paketlardan birini tanlang va e’loningizni Topga ko’taring."
            />
            <button className="bg-logoKok rounded-[10px] text-white w-1/2 h-10 mx-auto">
              Topga ko’tarish
            </button>
          </div>
        </div>
      )}
      {isOpenFinish && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-10"
          onClick={closeModal}
        >
          <div
            className="relative bg-[#F8FCFF] p-10 rounded-md shadow-md w-[860px]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 text-qora"
            >
              <AiOutlineClose size={24} />
            </button>
            <h2 className="text-3xl font-semibold mb-5 text-qora">
              E’lonni yakunlash
            </h2>
            <p className="text-qora mb-[50px]">
              E’lonni yakunlashni tasdiqlaysizmi?
            </p>
            <div className="flex justify-center">
              <button
                onClick={handleConfirm}
                className="border hover:border-logoKok hover:bg-ochKok border-kulrang text-kulrang  rounded-[10px] transition hover:text-qora w-[150px] h-10 mx-5"
              >
                Ha
              </button>
              <button className="border hover:border-logoKok hover:bg-ochKok border-kulrang text-kulrang  rounded-[10px] transition hover:text-qora w-[150px] h-10 mx-5">
                Yoq
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-end gap-[15px] border-b border-kulrang pb-[15px] md:hidden">
        {!top && (
          <button
            onClick={openModalTop}
            className="text text-qora px-4 py-1 rounded-md max-md:rounded-[5px] font-medium bg-[#FFE8BC] outline-none border-none flex justify-center items-center max-md:text-xs max-md:px-1 max-md:h-[30px] "
          >
            <Image src={StarImg} alt="edit" className="mr-[6px]" />
            Topga chiqarish
          </button>
        )}
        {edit && (
          <Link href={"/profil/editelon"}>
            <button className="text text-qora px-4 py-1 rounded-md max-md:rounded-[5px] font-medium bg-[#E7F4FF] outline-none border-none flex justify-center items-center max-md:text-xs max-md:px-1 max-md:h-[30px] ">
              <Image src={EditImg} alt="edit" className="mr-[6px]" />
              Tahrirlash
            </button>
          </Link>
        )}
        {finish && (
          <button
            onClick={openModalFinish}
            className="text text-qora px-4 py-1 rounded-md max-md:rounded-[5px] font-medium bg-[#CFFFDD] outline-none border-none flex justify-center items-center max-md:text-xs max-md:px-1 max-md:h-[30px]  "
          >
            <Image src={FinishImg} alt="edit" className="mr-[6px]" />
            Yakunlash
          </button>
        )}
        {isOpenTop && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm max-md:px-5"
            onClick={closeModal}
          >
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
                title="E’loningizni Topga chiqarmoqchimisiz?"
                text="E’loningizni sotish imkoniyatlarini oshiring va ko’proq xaridorlarni jalb qiling.
Siz uchun manfaatli bo’lgan quyidagi paketlardan birini tanlang va e’loningizni Topga ko’taring."
              />
              <button className="bg-logoKok rounded-[10px] text-white w-1/2 h-10 mx-auto">
                Topga ko’tarish
              </button>
            </div>
          </div>
        )}
        {isOpenFinish && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-[11] "
            onClick={closeModal}
          >
            <div
              className="relative bg-[#F8FCFF] p-10 rounded-md shadow-md md:w-[860px] max-md:w-[350px]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-5 right-5 text-qora"
              >
                <AiOutlineClose size={24} />
              </button>
              <h2 className="text-3xl font-semibold mb-5 text-qora">
                E’lonni yakunlash
              </h2>
              <p className="text-qora mb-[50px]">
                E’lonni yakunlashni tasdiqlaysizmi?
              </p>
              <div className="flex justify-center">
                <button className="border hover:border-logoKok hover:bg-ochKok border-kulrang text-kulrang  rounded-[10px] transition hover:text-qora w-[150px] h-10 mx-5">
                  Ha
                </button>
                <button className="border hover:border-logoKok hover:bg-ochKok border-kulrang text-kulrang  rounded-[10px] transition hover:text-qora w-[150px] h-10 mx-5">
                  Yoq
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyElonItem;
