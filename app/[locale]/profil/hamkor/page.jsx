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
  const [cardNumber, setCardNumber] = useState("");
  const [fullName, setFullName] = useState("");
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
        setCardNumber(response.data.card_number);
        setFullName(response.data.card_name);
        setText("https://topuy.uz/?" + response.data.code);
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

  const fetchUserProfile2 = async () => {
    const authToken = Cookies.get("authToken");
    if (!authToken) {
      console.error("Foydalanuvchi tizimga kirilgan emas.");
      return;
    }
    try {
      setLoading(true);
      const response = await api.post(
        "/api/v1/user/referral",
        { card_number: cardNumber, card_name: fullName },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setUserData(response.data);
      setText("https://topuy.uz/?" + response.data.code);
    } catch (err) {
      setError(err.response?.data?.message || "Xatolik yuz berdi.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (cardNumber && fullName) {
      fetchUserProfile2();
      // Qo'shimcha kod: ma'lumotlarni serverga yuboring yoki boshqa amallarni bajaring
    } else {
      alert("Iltimos, barcha maydonlarni to'ldiring.");
    }
  };

  if (loading) return <Loader type="ball-grid-pulse" />;
  return (
    <div>
      <div className="py-7 px-[60px] bg-white border border-[#015EA8] rounded-xl mb-5 max-md:py-4 max-md:px-5">
        <h2 className="text-xl font-semibold mb-3 max-md:text-[16px] max-md:mb-2">
          Hamkorlik qilish quyidagi tartibda bo’ladi
        </h2>
        <p className="max-md:text-sm">
          Sizning referal silkangiz bo’yicha ro’yxatdan o’tgan harbir
          foydalanuvchi uchun 1000 so’mdan keshbek (bonus) haftaning dushanba
          kuniga qadar bank karta raqamizga o’tkazib beriladi. Qo’shimcha
          savollar bo’yicha telegramdagi{" "}
          <a className="text-logoKok" href="https://t.me/topuy_official">
            https://t.me/topuy_official
          </a>
          ning adminiga murojaat qilishingiz mumkin….
        </p>
      </div>
      <div className="py-7 px-[60px] bg-white border border-[#015EA8] rounded-xl mb-5 max-md:py-4 max-md:px-5">
        <h2 className="text-xl font-semibold mb-3 max-md:text-[16px] max-md:mb-2">
          Referal silka:
        </h2>
        <div className="flex max-md:flex-col">
          <p className="mr-[50px] max-md:mr-0 max-md:mb-5">{text}</p>
          <button
            className="border border-[#015EA8] h-10 w-[140px] bg-[#015EA8] rounded-lg text-white max-md:ml-auto"
            onClick={handleCopy}
          >
            Nusxa olish
          </button>
        </div>
      </div>
      <div className="py-7 px-[60px] bg-white border border-[#015EA8] rounded-xl mb-5 max-md:py-4 max-md:px-5">
        <h2 className="text-xl font-semibold mb-3 max-md:text-[16px] max-md:mb-2">
          Keshbek
        </h2>
        <div className="flex max-md:justify-around">
          <p className="mr-[50px] max-md:mr-0 text-sm">
            Ro’yxatdan o’tganlar: {userData?.users}
          </p>
          <p className="mr-[50px] max-md:mr-0 text-sm">
            Keshbek summasi: {userData?.amount}
          </p>
        </div>
        <div className="mt-6 mb-[10px] flex max-md:flex-col">
          <div className="flex flex-col mr-5 max-md:mr-0 max-md:mb-5">
            <p className="mb-[10px]">Karta raqam:</p>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="p-[10px] rounded-[10px] w-[360px] border border-[#015EA8] max-md:w-full"
              placeholder="Karta raqamingizni kiriting"
            />
          </div>
          <div className="flex flex-col max-md:mr-0 max-md:mb-5">
            <p className="mb-[10px]">Ism familiya:</p>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="p-[10px] rounded-[10px] w-[360px] border border-[#015EA8] max-md:w-full"
              placeholder="Karta Egasining ism familyasini  kiriting"
            />
          </div>
          <div className="flex flex-col justify-end max-md:justify-center">
            <button
              onClick={handleSubmit}
              className="px-3 bg-logoKok text-white rounded h-11 ml-4 mb-[2px] max-md:w-full max-md:ml-0"
            >
              Saqlash
            </button>
          </div>
        </div>
      </div>
      <div className="py-7 px-[60px] bg-white border border-[#015EA8] rounded-xl mb-5 max-md:py-4 max-md:px-0">
        <h2 className="text-xl font-semibold mb-3 max-md:text-[16px] max-md:mb-2 max-md:px-4">
          To‘lovlar tarixi
        </h2>
        <div className="flex flex-col">
          <div className="mt-[30px] w-full flex max-md:mt-2">
            <div className="w-1/4 flex justify-center items-center text-white text-sm font-medium bg-[#015EA8] h-[40px] max-md:text-xs text-center">
              Summa
            </div>
            <div className="w-1/4 flex justify-center items-center text-white text-sm font-medium bg-[#015EA8] h-[40px] max-md:text-xs text-center">
              Referaldan kelganlar
            </div>
            <div className="w-1/4 flex justify-center items-center text-white text-sm font-medium bg-[#015EA8] h-[40px] max-md:text-xs text-center">
              Chekni ko’rish
            </div>
            <div className="w-1/4 flex justify-center items-center text-white text-sm font-medium bg-[#015EA8] h-[40px] max-md:text-xs text-center">
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
