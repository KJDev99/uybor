import React, { useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import api from "@/lib/api";
import Cookies from "js-cookie";
import { router } from "next/navigation";

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
  // const referalValue = useSearchParams();

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
        referral: sessionStorage.getItem("referal"),
      });

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
