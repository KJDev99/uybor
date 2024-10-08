import { useState } from "react";
import api from "@/lib/api";
import Cookies from "js-cookie";
import {
  AiOutlineLeft,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import InputMask from "react-input-mask";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const ModalLogin = ({ step, setStep, closeModal }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  const validatePhone = () => {
    // Format: +998-__-___-__-__
    const phonePattern = /^\+998\d{2}-\d{3}-\d{2}-\d{2}$/;
    if (!phonePattern.test(phone)) {
      setError("Telefon raqam to'liq va to'g'ri formatda kiritilishi kerak.");
      return false;
    }
    setError("");
    return true;
  };
  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validatePhone()) {
      setError(null);
      try {
        const cleanPhone = phone.replace(/-/g, "");
        const response = await api.post("/api/v1/user/login", {
          phone: cleanPhone,
          password,
        });
        Cookies.set("authToken", response.data.access);
        localStorage.setItem("user", JSON.stringify(response.data));
        closeModal();
        window.location.reload();
      } catch (err) {
        setError("Login xatosi");
      }
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col w-full">
      <div className="flex w-full bg-yozish">
        <button
          className={`h-[50px] w-1/2 border-2 border-yozish text-xl font-medium rounded max-md:text-[16px] ${
            step === 2 ? "bg-ochKok text-main" : "text-kulrang bg-yozish"
          }`}
          onClick={() => setStep(2)}
          type="button"
        >
          {t("login")}
        </button>
        <button
          className={`h-[50px] w-1/2 border border-yozish text-xl font-medium rounded max-md:text-[16px] ${
            step === 3 ? "bg-ochKok text-main" : "text-kulrang bg-yozish"
          }`}
          onClick={() => setStep(3)}
          type="button"
        >
          {t("login1")}
        </button>
      </div>
      <p className="mt-5 mb-2 ml-5 text-qora font-medium text-sm">
        {t("login2")}
      </p>
      <InputMask
        mask="+998__-___-__-__"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border-none outline-none px-5 py-3 rounded-[5px] bg-yozish text-qora max-md:text-sm"
        formatChars={{
          _: "[0-9]", // `_` ni faqat raqamlar uchun ruxsat beradi
        }}
      >
        {(inputProps) => (
          <input type="tel" placeholder={t("login3")} {...inputProps} />
        )}
      </InputMask>

      <p className="mt-5 mb-2 ml-5 text-qora font-medium text-sm">
        {t("login4")}
      </p>
      <div className="relative w-full">
        <input
          type={isPasswordVisible ? "text" : "password"}
          placeholder={t("login4")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-none outline-none px-5 py-3 rounded-[5px] bg-yozish text-qora w-full max-md:text-sm"
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
          onClick={handleTogglePasswordVisibility}
        >
          {isPasswordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </button>
      </div>
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
      <p
        className="cursor-pointer mb-3 mt-5 ml-5 font-bold text-main text-sm max-md:text-xs"
        onClick={() => setStep(4)}
      >
        {t("login5")}
      </p>
      <button
        type="submit"
        className="bg-main text-white h-[50px] mb-2 text-lg rounded-[5px] max-md:text-[16px]"
      >
        {t("login")}
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
    </form>
  );
};

export default ModalLogin;
