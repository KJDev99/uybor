import React, { useState } from "react";
import {
  AiOutlineLeft,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import axios from "axios";
import api from "@/lib/api";
import Link from "next/link";
import Msg from "./Msg";
import { useTranslation } from "react-i18next";

const ModalPassVerify = ({ setStep, closeModal }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("1");

  const { t } = useTranslation();
  const phone = sessionStorage.getItem("phoneUser");

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setError("Parollar mos kelmayapti.");
      return;
    }

    if (password.length < 8) {
      setError("Parolning uzunligi 8 ta belgidan kam bo'lmasligi kerak.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/api/v1/user/change/password", {
        phone,
        password,
        confirm_password: confirmPassword,
      });
      <Msg
        text="Parol muvaffaqiyatli o'zgartirildi"
        status="success"
        seeMsg={msg}
      />;
      setTimeout(() => {
        setMsg("0");
        setStep(2);
      }, 2000);
    } catch (err) {
      setError("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <button
        onClick={() => setStep(5)}
        className="absolute top-5 left-5 text-qora"
      >
        <AiOutlineLeft size={24} />
      </button>
      <h3 className="text-center text-qora text-2xl mb-5">{t("login25")}</h3>
      <p className="text-kulrang text-sm">{t("login26")}</p>
      <p className="mt-5 mb-2 ml-5 text-qora font-medium text-sm">
        {t("login27")}
      </p>
      <div className="relative w-full">
        <input
          type={isPasswordVisible ? "text" : "password"}
          placeholder={t("login4")}
          className="border-none outline-none px-5 py-3 rounded-[5px] bg-yozish text-qora w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
          onClick={handleTogglePasswordVisibility}
        >
          {isPasswordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </button>
      </div>
      <p className="mt-5 mb-2 ml-5 text-qora font-medium text-sm">
        {t("login28")}
      </p>
      <div className="relative w-full">
        <input
          type={isPasswordVisible ? "text" : "password"}
          placeholder={t("login8")}
          className="border-none outline-none px-5 py-3 rounded-[5px] bg-yozish text-qora w-full"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
          onClick={handleTogglePasswordVisibility}
        >
          {isPasswordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button
        className="bg-main text-white h-[50px] mb-2 text-lg rounded-[5px] mt-5"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Yuklanmoqda..." : "Parolni yangilash"}
      </button>
      <p className="text-center text-kulrang text-sm font-semibold max-md:text-xs">
        {t("login11")}{" "}
        <Link
          onClick={closeModal}
          href="/foydalanishshartlari"
          className="text-main  cursor-pointer"
        >
          {t("login12")}
        </Link>{" "}
        {t("login13")}
      </p>
    </div>
  );
};

export default ModalPassVerify;
