"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Profil from "@/assets/images/profil.svg";
import Mediauy from "@/assets/images/mediauy.svg";
import Mediaelon from "@/assets/images/mediaelon.svg";
import Savedmsg from "@/assets/images/savedmsg.svg";

const MobileNavBar = ({ isAuthenticated, openModalTop }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const openModalTopMedia = () => {
    openModalTop();
    setIsVisible(false);
  };

  return (
    <div
      className={`fixed md:hidden bg-white left-[50%] translate-x-[-50%] bottom-[10px] max-md:py-2 max-md:px-5 z-[999] rounded-[10px] flex shadow-lg transition-transform duration-300 ${
        isVisible ? "transform translate-y-0" : "transform translate-y-full"
      }`}
    >
      <Link
        href="/"
        className="mx-[12px] flex flex-col items-center justify-center my-2"
      >
        <Image src={Mediauy} alt="Image" />
        <p className="text-[#343434] font-medium mt-2 text-xs">
          Bosh&nbsp;sahifa
        </p>
      </Link>

      {isAuthenticated ? (
        <Link
          href="/addelon"
          className="mx-[12px] flex flex-col items-center justify-center my-2"
        >
          <Image src={Mediaelon} alt="Image" />
          <p className="text-[#343434] font-medium mt-2 text-xs">
            E'lon&nbsp;joylash
          </p>
        </Link>
      ) : (
        <div
          onClick={openModalTopMedia}
          className="mx-[12px] flex flex-col items-center justify-center my-2 cursor-pointer"
        >
          <Image src={Mediaelon} alt="Image" />
          <p className="text-[#343434] font-medium mt-2 text-xs">
            E'lon&nbsp;joylash
          </p>
        </div>
      )}
      <Link
        href="/tanlanganlar"
        className="mx-[12px] flex flex-col items-center justify-center my-2"
      >
        <Image src={Savedmsg} alt="Image" />
        <p className="text-[#343434] font-medium mt-2 text-xs">Tanlanganlar</p>
      </Link>
      {isAuthenticated ? (
        <Link
          href="/profil"
          className="mx-[12px] flex flex-col items-center justify-center my-2"
        >
          <Image src={Profil} alt="Image" />
          <p className="text-[#343434] font-medium mt-2 text-xs">Profil</p>
        </Link>
      ) : (
        <div
          className="mx-[12px] flex flex-col items-center justify-center my-2 cursor-pointer"
          onClick={openModalTopMedia}
        >
          <Image src={Profil} alt="Image" />
          <p className="text-[#343434] font-medium mt-2 text-xs">Kirish</p>
        </div>
      )}
    </div>
  );
};

export default MobileNavBar;
