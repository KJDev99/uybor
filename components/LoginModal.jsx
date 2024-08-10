import { useState } from "react";

import LogoImage from "@/assets/images/logo.svg";
import Image from "next/image";
import ModalRegistr from "./ModalRegistr";
import ModalLogin from "./ModalLogin";
import ModalTastiq from "./ModalTastiq";
import ModalNewPass from "./ModalNewPass";
import ModalVerifyTasdiq from "./ModalVerifyTasdiq";
import ModalPassVerify from "./ModalPassVerify";

const LoginModal = ({ closeModal }) => {
  const [step, setStep] = useState(2);
  const [number, setNumber] = useState("");

  const renderContent = () => {
    switch (step) {
      case 2:
        return (
          <ModalLogin setStep={setStep} step={step} closeModal={closeModal} />
        );
      case 3:
        return (
          <ModalRegistr
            setStep={setStep}
            step={step}
            setNumber={setNumber}
            closeModal={closeModal}
          />
        );
      case 4:
        return <ModalNewPass setStep={setStep} step={step} />;
      case 5:
        return (
          <ModalTastiq
            setStep={setStep}
            step={step}
            phone={number}
            closeModal={closeModal}
          />
        );
      case 6:
        return (
          <ModalVerifyTasdiq
            setStep={setStep}
            step={step}
            phone={number}
            closeModal={closeModal}
          />
        );
      case 7:
        return (
          <ModalPassVerify
            setStep={setStep}
            step={step}
            closeModal={closeModal}
          />
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
