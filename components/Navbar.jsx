"use client";
import Image from "next/image";
import LogoImg from "@/assets/images/logo.svg";
import Elonberish from "@/assets/images/elonberish.svg";
import Profil from "@/assets/images/profil.svg";
import Savedmsg from "@/assets/images/savedmsg.svg";
import LanguageSelector from "./SelectLanguage";
import Button from "./Button";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineClose, AiOutlineLeft } from "react-icons/ai";
import LoginModal from "./LoginModal";

const Navbar = () => {
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const openModalTop = () => {
    setIsOpenLogin(true);
    document.body.style.overflow = "hidden";
    console.log("asdasd");
  };
  const closeModal = () => {
    setIsOpenLogin(false);
    document.body.style.overflow = "auto";
  };
  return (
    <div className="bg-[#EDF7FF]">
      <div className="container h-20 flex justify-between border-b-[0.5px] border-logoKok">
        <Link href="/">
          <Image src={LogoImg} alt="Logo" className="w-[74px] ml-[70px] mt-4" />
        </Link>
        <div className="flex items-center">
          <LanguageSelector />
          <Link href="/tanlanganlar">
            <div className="ml-8">
              <Button color="qora" image={Savedmsg} text="Tanlanganlar" />
            </div>
          </Link>
          <Link href="/profil">
            <div className="ml-8">
              <Button color="qora" image={Profil} text="Profil" />
            </div>
          </Link>
          <div className="ml-8" onClick={openModalTop}>
            <Button color="qora" image={Profil} text="Kirish" />
          </div>
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
          {isOpenLogin && (
            <div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
              onClick={closeModal}
            >
              <div
                className="relative bg-[#F8FCFF] p-[30px] rounded-[20px] shadow-md w-[450px]"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeModal}
                  className="absolute top-5 right-5 text-qora"
                >
                  <AiOutlineClose size={24} />
                </button>

                <LoginModal />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
