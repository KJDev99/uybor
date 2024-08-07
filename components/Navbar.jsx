"use client";
import Image from "next/image";
import LogoImg from "@/assets/images/logo.svg";
import Elonberish from "@/assets/images/elonberish.svg";
import Profil from "@/assets/images/profil.svg";
import Savedmsg from "@/assets/images/savedmsg.svg";
import LanguageSelector from "./SelectLanguage";
import Button from "./Button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineLeft } from "react-icons/ai";
import LoginModal from "./LoginModal";
import MobileNavBar from "./MobileNavBar";
import Cookies from "js-cookie";

const Navbar = () => {
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const openModalTop = () => {
    setIsOpenLogin(true);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setIsOpenLogin(false);
    document.body.style.overflow = "auto";
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = () => {
      const authToken = Cookies.get("authToken");
      if (authToken) {
        setIsAuthenticated(true);
        closeModal();
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, []);

  const [savedElons, setSavedElons] = useState([]);

  useEffect(() => {
    const checkSavedElons = () => {
      const savedElons = JSON.parse(sessionStorage.getItem("savedElons")) || [];
      setSavedElons(savedElons);
    };

    // Initial load
    checkSavedElons();

    // Set up interval to poll for changes
    const intervalId = setInterval(checkSavedElons, 100); // every second

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-[#EDF7FF] max-md:mx-5 ">
      <div className="container h-20 flex justify-between border-b-[0.5px] border-logoKok max-md:hidden">
        <Link href="/">
          <Image src={LogoImg} alt="Logo" className="w-[74px] ml-[70px] mt-4" />
        </Link>
        <div className="flex items-center">
          <LanguageSelector />
          <Link href="/tanlanganlar">
            <div className="ml-8 relative">
              {savedElons.length > 0 ? (
                <span className="absolute text-xs rounded-full text-white bg-logoKok w-6 h-6 flex items-center justify-center left-[-20px] top-[-10px]">
                  {savedElons.length}
                </span>
              ) : null}
              <Button color="qora" image={Savedmsg} text="Tanlanganlar" />
            </div>
          </Link>
          {isAuthenticated ? (
            <Link href="/profil">
              <div className="ml-8">
                <Button color="qora" image={Profil} text="Profil" />
              </div>
            </Link>
          ) : (
            <div className="ml-8" onClick={openModalTop}>
              <Button color="qora" image={Profil} text="Kirish" />
            </div>
          )}

          {isAuthenticated ? (
            <Link href="/addelon">
              <div className="w-[200px] h-10 ml-10">
                <Button
                  main
                  borderRadiusFull
                  color="white"
                  image={Elonberish}
                  text="E’lon joylash"
                />
              </div>
            </Link>
          ) : (
            <div className="w-[200px] h-10 ml-10" onClick={openModalTop}>
              <Button
                main
                borderRadiusFull
                color="white"
                image={Elonberish}
                text="E’lon joylash"
              />
            </div>
          )}
        </div>
      </div>
      {isOpenLogin && (
        <div
          className="fixed inset-0 flex md:items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
          onClick={closeModal}
        >
          <div
            className="relative bg-[#F8FCFF] p-[30px] md:rounded-[20px] shadow-md md:w-[450px] max-md:p-0 max-md:w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 text-qora"
            >
              <AiOutlineClose size={24} />
            </button>

            <LoginModal closeModal={closeModal} />
          </div>
        </div>
      )}
      <MobileNavBar
        isAuthenticated={isAuthenticated}
        openModalTop={openModalTop}
      />
    </div>
  );
};

export default Navbar;
