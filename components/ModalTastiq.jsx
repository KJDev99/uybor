import React, { useState } from "react";
import axios from "axios";
import { AiOutlineLeft } from "react-icons/ai";
import api from "@/lib/api";

const ModalTastiq = ({ setStep, phone }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!code) {
      setError("Kodni kiriting");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/api/v1/user/verify", {
        phone,
        code: parseInt(code, 10),
      });

      // Success handling
      console.log("Kod tasdiqlandi:", response.data);
      setStep(2); // Oqibatda keyingi qadamga o'tish
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
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="border-none outline-none px-5 py-3 rounded-[5px] bg-yozish text-qora"
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <p className="mt-5 text-kulrang text-sm font-semibold">
        Agar kod kelmagan bo'lsa
        <span className="text-main cursor-pointer"> qayta yuborish</span>{" "}
        bosing.
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
