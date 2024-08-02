import { useState } from "react";
import {
  AiOutlineLeft,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import LogoImage from "@/assets/images/logo.svg";
import Image from "next/image";
import ModalRegistr from "./ModalRegistr";
import ModalLogin from "./ModalLogin";
import ModalTastiq from "./ModalTastiq";
import ModalNewPass from "./ModalNewPass";

const LoginModal = ({ closeModal }) => {
  const [step, setStep] = useState(2);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [number, setNumber] = useState("");

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const renderContent = () => {
    switch (step) {
      case 2:
        return (
          <ModalLogin setStep={setStep} step={step} closeModal={closeModal} />
        );
      case 3:
        return <ModalRegistr setStep={setStep} step={step}  setNumber={setNumber} closeModal={closeModal} />;
      case 4:
        return (
          <ModalNewPass setStep={setStep} step={step}/>
        );
      case 5:
        return <ModalTastiq setStep={setStep} step={step} phone={number} closeModal={closeModal}/>;
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
                className="border-none outline-none px-5 py-3 rounded-[5px] bg-yozish text-qora w-full"
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
                className="border-none outline-none px-5 py-3 rounded-[5px] bg-yozish text-qora w-full"
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
    <div className="flex flex-col items-center justify-center max-md:w-[335px] mx-auto">
      <Image
        src={LogoImage}
        alt="image"
        className="mb-[40px] mt-[10px] max-md:w-[100px] max-md:mt-[50px]"
      />
      {renderContent()}
    </div>
  );
};

export default LoginModal;
