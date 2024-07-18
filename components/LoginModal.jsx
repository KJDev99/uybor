import { useState } from "react";
import {
  AiOutlineLeft,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import LogoImage from "@/assets/images/logo.svg";
import Image from "next/image";

const LoginModal = () => {
  const [step, setStep] = useState(2);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const backStep = () => {
    if (step > 2) {
      setStep(step - 1);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const renderContent = () => {
    switch (step) {
      case 2:
        return (
          <div className="flex flex-col">
            <div className="flex w-full bg-yozish">
              <button
                className={`h-[50px] w-1/2 border-2 border-yozish text-xl font-medium rounded ${
                  step === 2 ? "bg-ochKok text-main" : "text-kulrang bg-yozish"
                }`}
                onClick={() => setStep(2)}
              >
                Kirish
              </button>
              <button
                className={`h-[50px] w-1/2 border border-yozish text-xl font-medium rounded ${
                  step === 3 ? "bg-ochKok text-main" : "text-kulrang bg-yozish"
                }`}
                onClick={() => setStep(3)}
              >
                Ro’yxatdan o’tish
              </button>
            </div>
            <p className="mt-5 mb-2 ml-5 text-qora font-medium text-sm">
              Telefon raramingiz
            </p>
            <input
              type="tel"
              placeholder="Telefon raqam"
              className="border-none outline-none px-5 py-3 rounded-[5px] bg-yozish text-qpra"
            />
            <p className="mt-5 mb-2 ml-5 text-qora font-medium text-sm">
              Parol
            </p>
            <div className="relative w-full">
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Parol"
                className="border-none outline-none px-5 py-3 rounded-[5px] bg-yozish text-qpra w-full"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                onClick={handleTogglePasswordVisibility}
              >
                {isPasswordVisible ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </button>
            </div>
            <p
              className="cursor-pointer mb-3 mt-5 ml-5 font-bold text-main text-sm"
              onClick={() => setStep(4)}
            >
              Parolni unutdingizmi?
            </p>
            <button className="bg-main text-white h-[50px] mb-2  text-lg rounded-[5px]">
              Kirish
            </button>
            <p className="text-center text-kulrang text-sm font-semibold">
              Tizimga kirish orqali siz{" "}
              <span className="text-main">Foydalanish shartlarimizga</span>{" "}
              rozilik bildirasiz.
            </p>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col w-full">
            <button
              onClick={() => setStep(2)}
              className="absolute top-5 left-5 text-qora"
            >
              <AiOutlineLeft size={24} />
            </button>
            <div className="flex w-full bg-yozish">
              <button
                className={`h-[50px] w-1/2 border-2 border-yozish text-xl font-medium rounded ${
                  step === 2 ? "bg-ochKok text-main" : "text-kulrang bg-yozish"
                }`}
                onClick={() => setStep(2)}
              >
                Kirish
              </button>
              <button
                className={`h-[50px] w-1/2 border border-yozish text-xl font-medium rounded ${
                  step === 3 ? "bg-ochKok text-main" : "text-kulrang bg-yozish"
                }`}
                onClick={() => setStep(3)}
              >
                Ro’yxatdan&nbsp;o’tish
              </button>
            </div>
            <p className="mt-5 mb-2 ml-5 text-qora font-medium text-sm">
              Isminggiz
            </p>
            <input
              type="text"
              placeholder="Ism"
              className="border-none outline-none px-5 py-3 rounded-[5px] bg-yozish text-qpra"
            />
            <p className="mt-5 mb-2 ml-5 text-qora font-medium text-sm">
              Telefon qaramingiz
            </p>
            <input
              type="tel"
              placeholder="Telefon raqam"
              className="border-none outline-none px-5 py-3 rounded-[5px] bg-yozish text-qpra"
            />
            <p className="mt-5 mb-2 ml-5 text-qora font-medium text-sm">
              Parol
            </p>
            <div className="relative w-full">
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Parol"
                className="border-none outline-none px-5 py-3 rounded-[5px] bg-yozish text-qpra w-full"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                onClick={handleTogglePasswordVisibility}
              >
                {isPasswordVisible ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </button>
            </div>
            <p className="mt-5 mb-2 ml-5 text-qora font-medium text-sm">
              Parolni tasdiqlash
            </p>
            <div className="relative w-full">
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder=" Parolni tasdiqlash"
                className="border-none outline-none px-5 py-3 rounded-[5px] bg-yozish text-qpra w-full"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                onClick={handleTogglePasswordVisibility}
              >
                {isPasswordVisible ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </button>
            </div>
            <label className="flex items-center mb-3 mt-5">
              <input type="checkbox" className="mr-3" />
              <p className="text-sm font-semibold text-kulrang">
                Men <span className="text-main">Foydalanish shartlari</span>ni
                qabul qilaman
              </p>
            </label>
            <button className="bg-blue-500 text-white px-4 py-2">
              Ro’yxatdan o’tish
            </button>
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col w-full">
            <button
              onClick={() => setStep(2)}
              className="absolute top-5 left-5 text-qora"
            >
              <AiOutlineLeft size={24} />
            </button>
            <h3 className="text-center text-qora text-2xl mb-5">
              Parolni unutdingizmi?
            </h3>
            <p className="text-kulrang text-sm">
              Tasdiqlash jarayoni uchun telefon raqam kiriting
            </p>
            <p className="mt-5 mb-2 ml-5 text-qora font-medium text-sm">
              Telefon raramingiz
            </p>
            <input
              type="tel"
              placeholder="Telefon raqam"
              className="border-none outline-none px-5 py-3 rounded-[5px] bg-yozish text-qpra"
            />
            <button
              className="bg-main text-white h-[50px] mb-2  text-lg rounded-[5px] mt-5"
              onClick={() => setStep(5)}
            >
              Davom etish
            </button>
          </div>
        );
      case 5:
        return (
          <div className="flex flex-col w-full">
            <button
              onClick={() => setStep(4)}
              className="absolute top-5 left-5 text-qora"
            >
              <AiOutlineLeft size={24} />
            </button>
            <h3 className="text-center text-qora text-2xl mb-5">Tasdiqlash</h3>
            <p className="text-kulrang text-sm">
              Telefon raqamingizga yuborilgan kodni kiriting
            </p>
            <p className="mt-5 mb-2 ml-5 text-qora font-medium text-sm">
              Tasdiqlash kodi
            </p>
            <input
              type="text"
              placeholder="kod"
              className="border-none outline-none px-5 py-3 rounded-[5px] bg-yozish text-qpra"
            />
            <p className="mt-5 text-kulrang text-sm font-semibold">
              Agar kod kelmagan bo'lsa
              <span className="text-main cursor-pointer">
                qayta yuborish
              </span>{" "}
              bosing.
            </p>
            <button
              className="bg-main text-white h-[50px] mb-2  text-lg rounded-[5px] mt-5"
              onClick={() => setStep(6)}
            >
              Tasdiqlash
            </button>
          </div>
        );
      case 6:
        return (
          <div className="flex flex-col w-full">
            <button
              onClick={() => setStep(5)}
              className="absolute top-5 left-5 text-qora"
            >
              <AiOutlineLeft size={24} />
            </button>
            <h3 className="text-center text-qora text-2xl mb-5">
              Parolni yangilash
            </h3>
            <p className="text-kulrang text-sm">
              Kirish uchun parolni yangilang
            </p>
            <p className="mt-5 mb-2 ml-5 text-qora font-medium text-sm">
              Yangi parol kiriting
            </p>
            <div className="relative w-full">
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Parol"
                className="border-none outline-none px-5 py-3 rounded-[5px] bg-yozish text-qpra w-full"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                onClick={handleTogglePasswordVisibility}
              >
                {isPasswordVisible ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </button>
            </div>
            <p className="mt-5 mb-2 ml-5 text-qora font-medium text-sm">
              Yangi parolni qayta kiriting
            </p>
            <div className="relative w-full">
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder=" Parolni tasdiqlash"
                className="border-none outline-none px-5 py-3 rounded-[5px] bg-yozish text-qpra w-full"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                onClick={handleTogglePasswordVisibility}
              >
                {isPasswordVisible ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </button>
            </div>
            <button
              className="bg-main text-white h-[50px] mb-2  text-lg rounded-[5px] mt-5"
              onClick={() => setStep(2)}
            >
              Parolni yangilash
            </button>
            <p className="text-center text-kulrang text-sm font-semibold mt-2">
              Tizimga kirish orqali siz{" "}
              <span className="text-main">Foydalanish shartlarimizga</span>{" "}
              rozilik bildirasiz.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className=" flex flex-col items-center justify-center ">
      {/* {step > 2 && (
        <button onClick={backStep} className="absolute top-5 left-5 text-qora">
          <AiOutlineLeft size={24} />
        </button>
      )} */}

      <Image src={LogoImage} alt="image" className="mb-[40px] mt-[10px]" />

      {renderContent()}
    </div>
  );
};

export default LoginModal;
