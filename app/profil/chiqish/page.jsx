"use client";

import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  console.log(router);
  const handleLogout = () => {
    // Clear cookies
    Cookies.remove("authToken");

    // Clear local storage
    localStorage.clear();

    // router.replace("/");
    // Or use router.push('/') if you want to add this action to the browser history
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <div className="">
      <Link
        href="/profil"
        className="md:hidden text-lg font-semibold flex items-center max-md:mb-5"
      >
        <FaAngleLeft />
        Profil
      </Link>
      <div className="rounded-[10px] md:bg-white p-[30px] flex items-center justify-center flex-col mb-[50px]">
        <h1 className="text-2xl text-qora font-semibold mt-20 mb-5 max-md:text-lg">
          Profildan chiqmoqchimisiz?
        </h1>
        <p className="text text-qora mb-[60px] max-w-[350px] text-center font-medium max-md:text-sm">
          Chiqsangiz profilingiz o’chib ketmaydi. <br /> Parolni kiritib
          profilga qayta kirishingiz mumkin
        </p>
        <div className="flex mb-20">
          <button
            className="h-[44px] w-[173px] max-md:w-[140px] border border-kulrang text-kulrang text-lg rounded-[10px] mx-5 hover:border-logoKok hover:bg-logoKok hover:text-white transition-all"
            onClick={() => router.replace("/profil/chiqish")}
          >
            Yo'q
          </button>
          <Link href="/">
            <button
              className="h-[44px] w-[173px] max-md:w-[140px] border border-kulrang text-kulrang text-lg rounded-[10px] mx-5 hover:border-logoKok hover:bg-logoKok hover:text-white transition-all"
              onClick={handleLogout}
            >
              Ha
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
