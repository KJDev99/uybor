"use client";
import MyElon from "@/components/MyElon";
import ProfilMenu from "@/components/ProfilMenu";
import { usePathname } from "next/navigation";
import logo from "@/assets/images/logo.svg";
import Image from "next/image";
import LanguageSelector from "@/components/SelectLanguage";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import api from "@/lib/api";
import Loader from "@/components/Loader";
const page = () => {
  const pathname = usePathname();
  const [userInfo, setUserInfo] = useState("");
  const [loading, setLoading] = useState(true);
  const fetchMyInfo = async () => {
    const authToken = Cookies.get("authToken");
    if (!authToken) {
      console.error("Foydalanuvchi tizimga kirilgan emas.");
      return;
    }

    try {
      const response = await api.get("/api/v1/user/profile", {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });
      setUserInfo(response.data); // Ensure count is an object
    } catch (error) {
      console.error(
        "Xato:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMyInfo();
  }, []);

  if (loading) return <Loader type="ball-grid-pulse" />;
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
              {userInfo.photo && (
                <img
                  src={userInfo.photo}
                  alt="img"
                  className="rounded-full max-md:h-[54px] max-md:w-[54px] w-[75px] h-[75px] mr-4"
                />
              )}

              <h2 className="text-qora text-2xl font-medium">
                {userInfo.full_name}
              </h2>
            </div>
          </div>
          <ProfilMenu />
        </div>
      )}
    </>
  );
};

export default page;
