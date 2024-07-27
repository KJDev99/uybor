"use client";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setView } from "@/store";
import Image from "next/image";
import SeeBlock from "@/assets/images/seeblock.svg";
import SeeLine from "@/assets/images/seeline.svg";
import SeeBlockAct from "@/assets/images/seeblockact.svg";
import SeeLineAct from "@/assets/images/seelineact.svg";
import MainImg from "@/assets/images/asosiyrasm.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import ElonBlock from "@/components/ElonBlock";

const itemsPerPage = 20;
const UserElon = () => {
  const [valyuta, setValyuta] = useState("uzs");
  const [currentPage, setCurrentPage] = useState(1);

  const view = useSelector((state) => state.view);
  const dispatch = useDispatch();

  const handleViewChange = (newView) => {
    dispatch(setView(newView));
  };

  const allElonlar = [
    {
      image: MainImg,
      top: false,
      save: false,
      turi: "sotiladi",
      name: "Srochni sotiladi 6 xonali Yakkasaroy Rovd orqasida",
      address: "Toshkent, Yakksaroy",
      data: "17.05.2024",
      price: "1 250 000 000 so‘m a",
      view: view,
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
      view: view,
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
      view: view,
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
      view: view,
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
      view: view,
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
      view: view,
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
      view: view,
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
      view: view,
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
      view: view,
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
      view: view,
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
      view: view,
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
      view: view,
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
      view: view,
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
      view: view,
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
      view: view,
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
      view: view,
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
      view: view,
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
      view: view,
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
      view: view,
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
      view: view,
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
      view: view,
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
      view: view,
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
      view: view,
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
      view: view,
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
      view: view,
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
      view: view,
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
      view: view,
    },
  ];

  // Filter the elonlar where save is true
  const savedElonlar = allElonlar.filter((elon) => elon.save);

  const totalPages = Math.ceil(savedElonlar.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentElonlar = savedElonlar.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const renderPagination = () => {
    if (savedElonlar.length <= itemsPerPage) return null;

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex justify-center mt-[50px] mb-5">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`h-10 bg-white rounded-md w-10 mr-2 flex justify-center items-center ${
            currentPage === 1 && "bg-kulrangOch"
          }`}
        >
          <FaChevronLeft />
        </button>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageClick(pageNumber)}
            className={`w-10 h-10 rounded-md font-semibold mx-1 ${
              currentPage === pageNumber ? "bg-ochKok text-logoKok" : "text-qora bg-white"
            }`}
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`h-10 bg-white rounded-md w-10 ml-2 flex justify-center items-center ${
            currentPage === totalPages && "bg-kulrangOch"
          }`}
        >
          <FaChevronRight />
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col container">
      <div className="flex max-md:flex-col justify-between mt-[50px] mb-[30px]  max-md:mt-[10px]">
        <h2 className="text-2xl text-qora font-semibold max-md:text-[16px]">Muallifning barcha e’lonlari:</h2>
        <div className="flex">
          <div className="flex items-center">
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
            <p className="text-qora font-medium ml-16">Valyuta:</p>
            <p
              className={`mx-5 cursor-pointer font-medium ${
                valyuta == "uzs" ? "text-logoKok" : "text-kulrang"
              }`}
              onClick={() => setValyuta("uzs")}
            >
              UZS
            </p>
            <p
              className={`cursor-pointer font-medium ${
                valyuta == "usd" ? "text-logoKok" : "text-kulrang"
              }`}
              onClick={() => setValyuta("usd")}
            >
              USD
            </p>
          </div>
        </div>
      </div>
      <div
        className={`flex flex-wrap ${
          view == "block" ? "grid grid-cols-4 gap-7 max-md:gap-[15px] max-md:grid-cols-2" : "grid grid-cols-1 gap-5"
        }`}
      >
        {currentElonlar.map((elon, index) => (
          <ElonBlock key={index} {...elon} />
        ))}
      </div>
      {renderPagination()}
    </div>
  );
};

export default UserElon;
