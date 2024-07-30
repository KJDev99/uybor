import React, { useState } from 'react';
import { AiOutlineLeft } from 'react-icons/ai';
import InputMask from 'react-input-mask';

const ModalNewPass = ({ setStep }) => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);

  const validatePhone = () => {
    // Format: +998-__-___-__-__
    const phonePattern = /^\+998-\d{2}-\d{3}-\d{2}-\d{2}$/;
    if (!phonePattern.test(phone)) {
      setError("Telefon raqam to'liq va to'g'ri formatda kiritilishi kerak.");
      return false;
    }
    setError("");
    return true;
  };

  const handleContinue = () => {
    if (validatePhone()) {
      setStep(5);
    }
  };

  return (
    <div className="flex flex-col w-full p-5">
      <button
        onClick={() => setStep(2)}
        className="absolute top-5 left-5 text-qora"
      >
        <AiOutlineLeft size={24} />
      </button>
      <h3 className="text-center text-qora text-2xl mb-5">
        Parolni unutdingizmi?
      </h3>
      <p className="text-kulrang text-sm text-center">
        Tasdiqlash jarayoni uchun telefon raqam kiriting
      </p>
      <p className="mt-5 mb-2 ml-5 text-qora font-medium text-sm">
        Telefon raqamingiz
      </p>
      <InputMask
        mask="+998-__-___-__-__"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border-none outline-none px-5 py-3 rounded-[5px] bg-yozish text-qora w-full"
        formatChars={{
          _: "[0-9]", // `_` ni faqat raqamlar uchun ruxsat beradi
        }}
      >
        {(inputProps) => (
          <input
            type="tel"
            placeholder="Telefon raqam"
            {...inputProps}
          />
        )}
      </InputMask>
      {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
      <button
        className="bg-main text-white h-[50px] mb-2 text-lg rounded-[5px] mt-5"
        onClick={handleContinue}
      >
        Davom etish
      </button>
    </div>
  );
};

export default ModalNewPass;
