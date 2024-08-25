import React, { useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import api from "@/lib/api";
import { useTranslation } from "react-i18next";

const ModalVerifyTasdiq = ({ setStep, closeModal }) => {
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

    const phone = sessionStorage.getItem("phoneUser");

    try {
      const response = await api.post("/api/v1/user/verify", {
        phone: phone,
        code: parseInt(code, 10),
        is_forgot_password: true,
      });

      // Debug: print response to debug

      // Check the success condition based on response
      setStep(7); // Proceed if verification is successful
    } catch (err) {
      console.error("Verification Error:", err);
      setError("Kod noto‘g‘ri yoki serverda muammo bor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <button
        onClick={() => setStep(2)}
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
        placeholder="Kod"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="border-none outline-none px-5 py-3 rounded-[5px] bg-yozish text-qora"
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <p className="mt-5 text-kulrang text-sm font-semibold">
        {t("login21")}
        <span
          className="text-main cursor-pointer"
          // onClick={() => console.log("Qayta yuborish clicked")}
        >
          {" "}
          {t("login22")}
        </span>{" "}
        {t("login23")}
      </p>
      <button
        className="bg-main text-white h-[50px] mb-2 text-lg rounded-[5px] mt-5"
        onClick={handleVerify}
        disabled={loading}
      >
        {loading ? t("login24") : t("login18")}
      </button>
    </div>
  );
};

export default ModalVerifyTasdiq;
