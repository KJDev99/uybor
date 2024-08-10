"use client";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ElonBlock from "./ElonBlock";
import api from "@/lib/api";
import ElonBlockSkeleton from "./ElonBlockSkeleton";
import { useSearchParams } from "next/navigation";

const Tavfsiya = ({ setCount }) => {
  const view = useSelector((state) => state.view);

  const [ads, setAds] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 20;
  const [prevPage, setPrevPage] = useState(1);
  const searchParams = useSearchParams();
  const [adType, setAdType] = useState("");
  const [category, setCategory] = useState("");
  const [district, setDistrict] = useState("");
  const [minRoom, setMinRoom] = useState("");
  const [maxRoom, setMaxRoom] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Extract values from query parameters
    const adTypeParam = searchParams.get("ad_type") || ""; // Default to empty string if null
    const categoryParam = searchParams.getAll("category") || ""; // Default to empty string if null
    const districtParam = searchParams.get("district") || ""; // Default to empty string if null
    const minRoomParam = searchParams.get("min_room") || ""; // Default to empty string if null
    const maxRoomParam = searchParams.get("max_room") || ""; // Default to empty string if null
    const priceMinParam = searchParams.get("price_min") || ""; // Default to empty string if null
    const priceMaxParam = searchParams.get("price_max") || ""; // Default to empty string if null
    const searchParam = searchParams.get("search") || ""; // Default to empty string if null

    // Update state with the extracted values
    setAdType(adTypeParam);
    setCategory(categoryParam);
    setDistrict(districtParam);
    setMinRoom(minRoomParam);
    setMaxRoom(maxRoomParam);
    setPriceMin(priceMinParam);
    setPriceMax(priceMaxParam);
    setSearch(searchParam);
  }, [searchParams]);

  const fetchAds = async () => {
    setLoading(true);
    try {
      let url = "/api/v1/ads/list?is_top=false";
      category.forEach((categor, index) => {
        if (url !== "/api/v1/ads/list?is_top=false?") url += "&";
        if (index > 0) {
          url += "&";
        }
        url += `category=${encodeURIComponent(categor)}`;
      });
      if (search) {
        if (url !== "/api/v1/ads/list?is_top=false?") url += "&"; // Add '&' if url already has parameters
        url += `search=${encodeURIComponent(search)}`;
      }

      if (adType) {
        if (url !== "/api/v1/ads/list?is_top=false?") url += "&"; // Add '&' if url already has parameters
        url += `ad_type=${encodeURIComponent(adType)}`;
      }

      if (district) {
        if (url !== "/api/v1/ads/list?is_top=false?") url += "&"; // Add '&' if url already has parameters
        url += `district=${encodeURIComponent(district)}`;
        console.log(url);
      }

      if (minRoom) {
        if (url !== "/api/v1/ads/list?is_top=false?") url += "&"; // Add '&' if url already has parameters
        url += `room_min=${encodeURIComponent(minRoom)}`;
      }

      if (maxRoom) {
        if (url !== "/api/v1/ads/list?is_top=false?") url += "&"; // Add '&' if url already has parameters
        url += `room_max=${encodeURIComponent(maxRoom)}`;
      }

      if (priceMin) {
        if (url !== "/api/v1/ads/list?is_top=false?") url += "&"; // Add '&' if url already has parameters
        url += `price_min=${encodeURIComponent(priceMin)}`;
      }

      if (priceMax) {
        if (url !== "/api/v1/ads/list?is_top=false?") url += "&"; // Add '&' if url already has parameters
        url += `price_max=${encodeURIComponent(priceMax)}`;
      }
      url += `&limit=${itemsPerPage}&offset=${
        (currentPage - 1) * itemsPerPage
      }`;
      const response = await api.get(url);
      const { next, count } = response.data;
      setNextPageUrl(next);
      setTotalPages(Math.ceil(count / itemsPerPage));
      const transformedAds = response.data.results.map((ad) => ({
        image: ad.media,
        top: ad.is_top,
        save: true,
        turi: ad.ad_type.toLowerCase(),
        name: ad.title,
        address: `${ad.region.name_uz} ${ad.district.name_uz}`,
        data: new Date(ad.created).toLocaleDateString("en-GB"),
        price: ad.price,
        currency: ad.currency,
        view: view,
        id: ad.id,
      }));
      if (currentPage === prevPage) {
        setAds(transformedAds);
      } else {
        setAds((prevAds) => [...prevAds, ...transformedAds]);
      }
      setPrevPage(currentPage);
      setCount(response.data.count);
      setTotalPages(Math.ceil(response.data.count / itemsPerPage));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds(currentPage);
  }, [
    search,
    category,
    adType,
    district,
    minRoom,
    maxRoom,
    maxRoom,
    priceMin,
    priceMax,
    currentPage,
  ]);

  const handleNextPage = () => {
    if (nextPageUrl) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    return (
      <div className="flex justify-center ">
        <button
          onClick={handleNextPage}
          disabled={!nextPageUrl}
          className={`mt-[50px] mb-5 bg-transparent rounded-md w-[210px] h-[30px] flex justify-center items-center border border-[#015EA8] text-[#015EA8] cursor-pointer ${
            !nextPageUrl && "hidden h-0"
          }`}
        >
          Yana ko’rsatish
        </button>
      </div>
    );
  };
  return (
    <div className="flex flex-col container mb-[60px] mt-5">
      <div className="flex flex-col">
        <h2 className="text-main mb-[30px] font-semibold text-2xl max-md:text-sm max-md:mb-[10px]">
          Tavsiya etamiz
        </h2>
        <div
          className={`flex flex-wrap ${
            view === "block"
              ? "grid grid-cols-4 gap-7 max-md:gap-[15px] max-md:grid-cols-2"
              : "grid grid-cols-1 gap-5"
          }`}
        >
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <ElonBlockSkeleton key={index} view={view} />
              ))
            : ads.map((elon, index) => <ElonBlock key={index} {...elon} />)}
        </div>
        {renderPagination()}
      </div>
    </div>
  );
};

export default Tavfsiya;
