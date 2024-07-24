"use client";
import MyElon from "@/components/MyElon";
import ProfilMenu from "@/components/ProfilMenu";
import { usePathname } from "next/navigation";
import logo from "@/assets/images/logo.svg";
import Image from "next/image";
import LanguageSelector from "@/components/SelectLanguage";
const page = () => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <>
      <div className="max-md:hidden">
        <MyElon />
      </div>
      {pathname == "/profil" && (
        <div className="w-1/4 max-md:w-full md:hidden h-screen ">
          <div className="w-full border-b border-[#015EA8] mb-5 flex justify-between">
            <Image src={logo} alt="" className="w-[56px] mb-5" />
            <LanguageSelector />
          </div>
          <div className="w-full h-[60px] rounded-[10px] flex  md:hidden ml-[20px]">
            <div className="flex items-center ">
              <img
                src="/images/person.png"
                alt=""
                className="h-10 w-10 mr-[30px] "
              />
              <h2 className="text-qora text-2xl font-medium">Xoshimjon</h2>
            </div>
          </div>
          <ProfilMenu />
        </div>
      )}
    </>
  );
};

export default page;
