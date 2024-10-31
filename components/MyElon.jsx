"use client";
import React, { useEffect, useState } from "react";
import MyElonItem from "./MyElonItem";
import NoItems from "./NoItems"; // Import your NoItems component
import MainImg from "@/assets/images/asosiyrasm.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa6";
import Cookies from "js-cookie";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import Pagination from "./Pagination";

const itemsPerPage = 20;
const MyElon = () => {
  const { t } = useTranslation();
  const [selectedDuration, setSelectedDuration] = useState("aktiv");
  const [myElons, setMyElons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalAds, setTotalAds] = useState(0);
  const [myElonsCount, setMyElonsCount] = useState({}); // Initialize as an empty object
  const router = useRouter();
  // Fetch my ads and count
  const statusMapping = {
    aktiv: "ACTIVE",
    tasdiq: "WAITING",
    bekor: "REJECTED",
    yakunlangan: "SOLD",
  };

  const fetchMyAds = async (status, offset) => {
    const authToken = Cookies.get("authToken");
    if (!authToken) {
      console.error("Foydalanuvchi tizimga kirilgan emas.");
      return;
    }

    try {
      const response = await api.get(
        `/api/v1/ads/my-ads?status=${status}&offset=${offset}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setTotalAds(response.data.count); // Update total ads for pagination
      setMyElons(response.data);
      response.data.results.reverse();
    } catch (error) {
      console.error(
        "Xato:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handlePageChange = (page) => {
    const offset = (page - 1) * 10;
    setCurrentPage(page);
    fetchMyAds(status, offset);
  };

  useEffect(() => {
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
    document.body.scrollTo({ top: 0, behavior: "smooth" });
    const status = statusMapping[selectedDuration] || "WAITING"; // Default to "WAITING" if no match
    fetchMyAds(status, (currentPage - 1) * 10);
  }, [status, currentPage]);

  // const fetchMyAds = async (status) => {
  //   const authToken = Cookies.get("authToken");
  //   if (!authToken) {
  //     console.error("Foydalanuvchi tizimga kirilgan emas.");
  //     return;
  //   }

  //   try {
  //     const response = await api.get(
  //       `/api/v1/ads/my-ads?status=${status}&offset=10&limit=10`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${authToken}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     setMyElons(response.data);
  //     response.data.results.reverse();
  //     console.log(response.data, "text");
  //   } catch (error) {
  //     console.error(
  //       "Xato:",
  //       error.response ? error.response.data : error.message
  //     );
  //   }
  // };

  const handleConfirmAction = async (adId) => {
    const authToken = Cookies.get("authToken");
    try {
      await api.put(
        `/api/v1/ads/${adId}/update/status`,
        {
          id: adId,
          status: "SOLD",
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const response = await api.get(`/api/v1/ads/my-ads?status=ACTIVE`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      router.push("/profil");
      setMyElons(response.data);

      fetchMyAdsCount();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMyAdsCount = async () => {
    const authToken = Cookies.get("authToken");
    if (!authToken) {
      console.error("Foydalanuvchi tizimga kirilgan emas.");
      return;
    }

    try {
      const response = await api.get("/api/v1/ads/count/ads", {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });
      setMyElonsCount(response.data); // Ensure count is an object
    } catch (error) {
      console.error(
        "Xato:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    const status = statusMapping[selectedDuration] || "WAITING"; // Default to "WAITING" if no match
    fetchMyAds(status);
    fetchMyAdsCount();
  }, [selectedDuration]);

  const handleDurationClick = (duration) => {
    setSelectedDuration(duration);
  };

  return (
    <div className="bg-white md:px-5 pb-10 pt-[30px] max-md:pt-2 rounded-[10px] flex flex-col">
      <Link
        href={"/profil"}
        className="md:hidden text-lg font-semibold flex items-center"
      >
        <FaAngleLeft /> {t("navbar2")}
      </Link>
      <h2 className="text-qora text-2xl font-semibold mb-10 max-md:mb-5 max-md:text-lg">
        {t("pmenu6")} {myElonsCount.total || 0}
      </h2>
      <div className="flex justify-between mb-[30px] max-md:gap-3 overflow-y-auto">
        <div
          className={`flex rounded-[10px] px-4 py-2 max-md:px-2 max-md:py-1 max-md:text-lg max-md:flex-shrink-0 cursor-pointer border text-xl font-semibold ${
            selectedDuration === "aktiv"
              ? "bg-transparent text-logoKok border-logoKok"
              : "bg-transparent text-qora border-kulrangOch"
          }`}
          onClick={() => handleDurationClick("aktiv")}
        >
          <p className="text-lg">
            {t("pmenu7")} {myElonsCount.active || 0}
          </p>
        </div>
        <div
          className={`flex rounded-[10px] px-4 py-2 max-md:px-2 max-md:py-1 max-md:text-lg max-md:flex-shrink-0 cursor-pointer border text-xl font-semibold ${
            selectedDuration === "tasdiq"
              ? "bg-transparent text-logoKok border-logoKok"
              : "bg-transparent text-qora border-kulrangOch"
          }`}
          onClick={() => handleDurationClick("tasdiq")}
        >
          <p className="text-lg">
            {t("pmenu8")} {myElonsCount.waiting || 0}
          </p>
        </div>
        <div
          className={`flex rounded-[10px] px-4 py-2 max-md:px-2 max-md:py-1 max-md:text-lg max-md:flex-shrink-0 cursor-pointer border text-xl font-semibold ${
            selectedDuration === "yakunlangan"
              ? "bg-transparent text-logoKok border-logoKok"
              : "bg-transparent text-qora border-kulrangOch"
          }`}
          onClick={() => handleDurationClick("yakunlangan")}
        >
          <p className="text-lg">
            {t("pmenu9")} {myElonsCount.sold || 0}
          </p>
        </div>
        <div
          className={`flex rounded-[10px] px-4 py-2 max-md:px-2 max-md:py-1 max-md:text-lg max-md:flex-shrink-0 cursor-pointer border text-xl font-semibold ${
            selectedDuration === "bekor"
              ? "bg-transparent text-logoKok border-logoKok"
              : "bg-transparent text-qora border-kulrangOch"
          }`}
          onClick={() => handleDurationClick("bekor")}
        >
          <p className="text-lg">
            {t("pmenu10")} {myElonsCount.rejected || 0}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5">
        {myElons?.results?.length ? (
          myElons.results.map((elon, index) => (
            <MyElonItem
              key={index}
              image={elon.media}
              name={elon.title}
              price={elon.price}
              currency={elon.currency}
              data={elon.created}
              status={selectedDuration}
              turi={elon.ad_type}
              region={elon.region?.name_uz}
              district={elon.district?.name_uz}
              id={elon.id}
              top={elon.is_top}
              handleConfirmAction={handleConfirmAction}
            />
          ))
        ) : (
          <NoItems text={t("pmenu11")} />
        )}
        {totalAds > 10 && (
          <div className="w-full flex justify-end">
            <Pagination
              totalAds={totalAds}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyElon;
