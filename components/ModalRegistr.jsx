import api from "@/lib/api";
import Link from "next/link";
import { useState } from "react";
import {
  AiOutlineLeft,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import InputMask from "react-input-mask";

const ModalRegistr = ({ setStep, step, setNumber, closeModal }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [checkboxError, setCheckboxError] = useState(false);

  const validatePhone = () => {
    const phonePattern = /^\+998\d{2}-\d{3}-\d{2}-\d{2}$/;
    if (!phonePattern.test(phone)) {
      setError("Telefon raqam to'liq va to'g'ri formatda kiritilishi kerak.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    if (!validatePhone()) valid = false;
    if (!isChecked) {
      setCheckboxError(true);
      valid = false;
    } else {
      setCheckboxError(false);
    }

    if (password !== confirmPassword) {
      setPasswordError(true);
      valid = false;
    } else {
      setPasswordError(false);
    }

    if (valid) {
      setError(null);
      setSuccess(null);

      try {
        const response = await api.post("/api/v1/user/register", {
          phone,
          password,
          confirm_password: confirmPassword,
          full_name: fullName,
        });
        setSuccess("User verified successfully!");
        setStep(5);
        setNumber(phone);
      } catch (err) {
        setError(err.response.data.message || "An error occurred");
      }
    }
  };

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col  w-full">
      <div className="flex w-full bg-yozish">
        <button
          className={`h-[50px] w-1/2 border-2 border-yozish text-xl font-medium rounded max-md:text-[16px] ${
            step === 2 ? "bg-ochKok text-main" : "text-kulrang bg-yozish"
          }`}
          onClick={() => setStep(2)}
          type="button"
        >
          Kirish
        </button>
        <button
          className={`h-[50px] w-1/2 border border-yozish text-xl font-medium rounded max-md:text-[16px] ${
            step === 3 ? "bg-ochKok text-main" : "text-kulrang bg-yozish"
          }`}
          onClick={() => setStep(3)}
          type="button"
        >
          Ro’yxatdan&nbsp;o’tish
        </button>
      </div>
      <p className="mt-5 mb-2 ml-5 text-qora font-medium text-sm">Isminggiz</p>
      <input
        type="text"
        placeholder="Ism"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="border-none outline-none px-5 py-3 rounded-[5px] bg-yozish text-qora  max-md:text-sm"
      />
      <p className="mt-5 mb-2 ml-5 text-qora font-medium text-sm">
        Telefon raqamingiz
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
          <input type="tel" placeholder="Telefon raqam" {...inputProps} />
        )}
      </InputMask>
      <p className="mt-5 mb-2 ml-5 text-qora font-medium text-sm">Parol</p>
      <div className="relative w-full">
        <input
          type={isPasswordVisible ? "text" : "password"}
          placeholder="Parol"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`border  outline-none px-5 py-3 rounded-[5px] ${
            passwordError ? "border-red-500" : "border-transparent"
          } bg-yozish text-qora w-full max-md:text-sm`}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 outline-none max-md:text-[16px]"
          onClick={handleTogglePasswordVisibility}
        >
          {isPasswordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </button>
      </div>
      <p className="mt-5 mb-2 ml-5 text-qora font-medium text-sm max-md:text-xs">
        Parolni tasdiqlash
      </p>
      <div className="relative w-full">
        <input
          type={isPasswordVisible ? "text" : "password"}
          placeholder="Parolni tasdiqlash"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={`border  outline-none px-5 py-3 rounded-[5px] ${
            passwordError ? "border-red-500" : "border-transparent"
          } bg-yozish text-qora w-full max-md:text-sm`}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 outline-none max-md:text-[16px]"
          onClick={handleTogglePasswordVisibility}
        >
          {isPasswordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </button>
      </div>
      <label
        className={`flex items-center mb-3 mt-5 border-b ${
          checkboxError ? "border-b-red-500" : "border-b-transparent"
        }`}
      >
        <input
          type="checkbox"
          className={`mr-3 `}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        <p className="text-sm font-semibold text-kulrang  max-md:text-xs">
          Men{" "}
          <Link
            onClick={closeModal}
            href="/foydalanishshartlari"
            className="text-main cursor-pointer"
          >
            Foydalanish shartlari
          </Link>
          ni qabul qilaman
        </p>
      </label>
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
      {success && <p className="text-green-500 text-xs italic">{success}</p>}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded  max-md:text-[16px]"
      >
        Ro’yxatdan o’tish
      </button>
    </form>
  );
};

export default ModalRegistr;
