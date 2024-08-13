"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import api from "@/lib/api";
import TolovItems from "@/components/TolovItems";
import Loader from "@/components/Loader";

const page = () => {
  const [userData, setUserData] = useState();
  const [error, setError] = useState(null);
  const [tolovlar, setTolovlar] = useState([]);
  const [loading, setLoading] = useState(true);

  const [text, setText] = useState("");

  const handleCopy = () => {
    // Clipboard API yordamida matnni nusxalash
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // alert("Matn nusxalandi!");
      })
      .catch((err) => {
        console.error("Matn nusxalanmadi: ", err);
      });
  };
  useEffect(() => {
    const fetchUserProfile = async () => {
      const authToken = Cookies.get("authToken");
      if (!authToken) {
        console.error("Foydalanuvchi tizimga kirilgan emas.");
        return;
      }
      try {
        const response = await api.get("/api/v1/user/referral", {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });
        setUserData(response.data);
        setText("https://topuy.uz/?referal=" + response.data.code);
      } catch (err) {
        setError(err.response?.data?.message || "Xatolik yuz berdi.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
    const fetchUserTolov = async () => {
      const authToken = Cookies.get("authToken");
      if (!authToken) {
        console.error("Foydalanuvchi tizimga kirilgan emas.");
        return;
      }
      try {
        const response = await api.get("api/v1/user/payment/history", {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });
        setTolovlar(response.data.results);
        console.log(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Xatolik yuz berdi.");
      }
    };
    fetchUserTolov();
  }, []);

  if (loading) return <Loader type="ball-grid-pulse" />;
  return (
    <div>
      <div className="py-7 px-[60px] bg-white border border-[#015EA8] rounded-xl mb-5">
        <h2 className="text-xl font-semibold mb-3">
          Hamkorlik qilish quyidagi tartibda bo’ladi
        </h2>
        <p>
          ishlangann keshbekni hisobingizga o'tkazish uchun ma'lumotlaringizni
          to'ldiring va haftaning dushanba kuni sizga tayyorlangan kashbek
          o'tkazilib beriladi
        </p>
      </div>
      <div className="py-7 px-[60px] bg-white border border-[#015EA8] rounded-xl mb-5">
        <h2 className="text-xl font-semibold mb-3">Referal silka:</h2>
        <div className="flex">
          <p className="mr-[50px]">{text}</p>
          <button
            className="border border-[#015EA8] h-10 w-[140px] bg-[#015EA8] rounded-lg text-white"
            onClick={handleCopy}
          >
            Nusxa olish
          </button>
        </div>
      </div>
      <div className="py-7 px-[60px] bg-white border border-[#015EA8] rounded-xl mb-5">
        <h2 className="text-xl font-semibold mb-3">Keshbek</h2>
        <div className="flex">
          <p className="mr-[50px]">Ro’yxatdan o’tganlar: {userData?.users}</p>
          <p className="mr-[50px]">Keshbek summasi: {userData?.amount}</p>
        </div>
        <div className="mt-6 mb-[10px] flex">
          <div className="flex flex-col mr-5">
            <p className="mb-[10px]">Karta raqam:</p>
            <input
              type="text"
              className="p-[10px] rounded-[10px] w-[360px] border border-[#015EA8]"
              placeholder="Karta raqamingizni kiriting"
            />
          </div>
          <div className="flex flex-col">
            <p className="mb-[10px]">Ism familiya:</p>
            <input
              type="text"
              className="p-[10px] rounded-[10px] w-[360px] border border-[#015EA8]"
              placeholder="Karta Egasining ism familyasini  kiriting"
            />
          </div>
        </div>
      </div>
      <div className="py-7 px-[60px] bg-white border border-[#015EA8] rounded-xl mb-5">
        <h2 className="text-xl font-semibold mb-3">To‘lovlar tarixi</h2>
        <div className="flex flex-col">
          <div className="mt-[30px] w-full flex">
            <div className="w-1/4 flex justify-center items-center text-white text-sm font-medium bg-[#015EA8] h-[40px]">
              Summa
            </div>
            <div className="w-1/4 flex justify-center items-center text-white text-sm font-medium bg-[#015EA8] h-[40px]">
              Referaldan kelganlar
            </div>
            <div className="w-1/4 flex justify-center items-center text-white text-sm font-medium bg-[#015EA8] h-[40px]">
              Chekni ko’rish
            </div>
            <div className="w-1/4 flex justify-center items-center text-white text-sm font-medium bg-[#015EA8] h-[40px]">
              To‘langan sana
            </div>
          </div>
          <div className="flex flex-col">
            {tolovlar.length > 0 ? (
              tolovlar.map((tolovlar, id) => (
                <TolovItems
                  bg={id % 2 == 1 ? true : false}
                  amount={tolovlar.amount}
                  users={tolovlar.users_count}
                  chek={tolovlar.chek}
                  created={tolovlar.created}
                />
              ))
            ) : (
              <p className="text-center mt-4">No users found.</p>
            )}
          </div>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default page;
