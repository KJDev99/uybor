"use client";
import React, { useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import api from "@/lib/api";
import Cookies from "js-cookie";
import { router } from "next/navigation";
import { useTranslation } from "react-i18next";

const ModalTastiq = ({ setStep, phone, closeModal }) => {
  // const useQueryParam = (param) => {
  //   const pathname = usePathname();
  //   const queryParams = useMemo(() => {
  //     const url = new URL(pathname, "https://topuy.uz");
  //     return new URLSearchParams(url.search);
  //   }, [pathname]);

  //   return queryParams.get(param);
  // };

  // const referalValue = useQueryParam("referal");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  const handleVerify = async () => {
    if (!code) {
      setError("Kodni kiriting");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const cleanPhone = phone.replace(/-/g, "");
      const referral = sessionStorage.getItem("referal");

      const payload = {
        phone: cleanPhone,
        code: parseInt(code, 10),
      };

      if (referral) {
        payload.referral = referral;
      }

      const response = await api.post("/api/v1/user/verify", payload);

      // Success handlin
      Cookies.set("authToken", response.data.access);
      localStorage.setItem("user", JSON.stringify(response.data));
      closeModal();
      router.push("/profil");
      window.location.reload();
    } catch (err) {
      setError("Kod noto‘g‘ri yoki serverda muammo bor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <button
        onClick={() => setStep(3)}
        className="absolute top-5 left-5 text-qora"
      >
        <AiOutlineLeft size={24} />
      </button>
      <h3 className="text-center text-qora text-2xl mb-5">{t("login18")}</h3>
      <p className="text-kulrang text-sm">{t("login19")}</p>
      <p className="mt-5 mb-2 ml-5 text-qora font-medium text-sm">
        {t("login20")}
      </p>
      <input
        type="text"
        placeholder="kod"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="border-none outline-none px-5 py-3 rounded-[5px] bg-yozish text-qora"
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <p className="mt-5 text-kulrang text-sm font-semibold">
        {t("login21")}
        <span className="text-main cursor-pointer">{t("login22")}</span>{" "}
        {t("login23")}
      </p>
      <button
        className="bg-main text-white h-[50px] mb-2 text-lg rounded-[5px] mt-5"
        onClick={handleVerify}
        disabled={loading}
      >
        {loading ? "Yuborilmoqda..." : "Tasdiqlash"}
      </button>
    </div>
  );
};

export default ModalTastiq;
