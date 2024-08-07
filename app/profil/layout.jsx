"use client";
import ProfilMenu from "@/components/ProfilMenu";
import api from "@/lib/api";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const Profil = ({ children }) => {
  const [userInfo, setUserInfo] = useState("");
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
    }
  };

  useEffect(() => {
    fetchMyInfo();
  }, []);
  return (
    <div className="container">
      <div className="flex md:gap-[30px] mt-5  ">
        <div className="w-1/4 max-md:w-full max-md:hidden  ">
          <ProfilMenu />
        </div>
        <div className="w-3/4 flex flex-col max-md:w-full">
          <div className="w-full h-[70px] bg-white rounded-[10px] flex justify-end mb-5 max-md:hidden">
            <div className="flex items-center ">
              <h2 className="text-qora text-2xl font-medium mr-5">
                {userInfo.full_name}
              </h2>

              {userInfo.photo && (
                <img
                  src={userInfo.photo}
                  alt="img"
                  className="h-10 w-10 mr-[60px] ml-5"
                />
              )}
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Profil;
