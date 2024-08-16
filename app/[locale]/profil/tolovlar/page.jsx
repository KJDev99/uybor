"use client";
import React, { useState, useEffect } from "react";
import api from "@/lib/api";
import Cookies from "js-cookie";
import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa6";
import Loader from "@/components/Loader";

const Page = () => {
  const [userData, setUserData] = useState();
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
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
        setUserData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Xatolik yuz berdi.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);
  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     const authToken = Cookies.get("authToken");
  //     try {
  //       const response = await api.get("/api/v1/user/status/payment", {
  //         headers: {
  //           Authorization: `Bearer ${authToken}`,
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       setStatus(response.data);
  //     } catch (err) {
  //       setError(err.response?.data?.message || "Xatolik yuz berdi.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUserProfile(); // Initial fetch

  //   const intervalId = setInterval(() => {
  //     fetchUserProfile(); // Fetch every 3 seconds
  //   }, 3000); // 3000 milliseconds = 3 seconds

  //   // Clean up interval on component unmount
  //   return () => clearInterval(intervalId);
  // }, []);
  if (loading) return <Loader type="ball-grid-pulse" />;

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = async () => {
    if (!amount || isNaN(amount)) {
      setError("Iltimos, to'g'ri summani kiriting.");
      return;
    }

    const authToken = Cookies.get("authToken");
    if (!authToken) {
      console.error("Foydalanuvchi tizimga kirilgan emas.");
      return;
    }

    try {
      const response = await api.post(
        "/api/v1/user/fill/account",
        {
          redirect_url: "http://topuy.uz/profil/tolovlar",
          amount: parseFloat(amount),
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Redirect to the URL from the backend response
      if (response.data?.url) {
        window.location.href = response.data.url;
      } else {
        setSuccess("Hisob muvaffaqiyatli to'ldirildi!");
        setAmount(""); // Clear the input after successful submission
      }
    } catch (err) {
      setError(err.response?.data?.message || "Xatolik yuz berdi.");
    }
  };

  return (
    <div className="md:p-[30px] rounded-[10px] bg-white gap-[30px] flex max-md:flex-col justify-between w-full md:h-[500px] mb-10">
      <Link
        href={"/profil"}
        className="md:hidden text-lg font-semibold flex items-center"
      >
        <FaAngleLeft />
        Profil
      </Link>
      <h2 className="text-lg text-[#343434] font-semibold md:hidden">
        To'lovlar
      </h2>
      <div className="flex flex-col p-[30px] max-md:p-5 h-[280px] bg-shadowcard !max-md:bg-transparent w-full max-md:h-[190px]">
        <h3 className="text-logoKok mb-[27px] text-2xl font-semibold max-md:text-[16px] max-md:mb-[10px]">
          Topuy hamyon
        </h3>
        <h2 className="text-qora flex-grow text-[28px] font-semibold max-md:text-lg">
          {userData?.full_name}
        </h2>
        <p className="text-3xl text-qora font-bold max-md:text-2xl">
          {userData?.account}
          <span className="text-2xl"> so‘m</span>
        </p>
      </div>
      <div className="flex flex-col p-[30px] max-md:px-5 max-md:py-0 md:h-[280px] bg-shadowcard !max-md:bg-transparent w-full">
        <h3 className="text-qora mb-[27px] text-2xl font-semibold max-md:text-lg max-md:mb-[10px]">
          Hisobni to’ldirish
        </h3>
        <div className="flex-grow max-md:mb-5">
          <input
            type="number"
            placeholder="Summani kiriting"
            value={amount}
            onChange={handleAmountChange}
            className="text-qora text-[18px] max-md:text-[16px] font-medium py-[10px] px-5 rounded-[10px] border border-kulrang outline-none w-full"
          />
        </div>
        <button
          className="h-[44px] w-full border-none bg-main outline-none text-white text-lg rounded-[10px]"
          onClick={handleSubmit}
        >
          To’ldirish
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
      </div>
    </div>
  );
};

export default Page;
