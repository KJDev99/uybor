"use client";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ElonBlock from "./ElonBlock";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import api from "@/lib/api";
import ElonBlockSkeleton from "./ElonBlockSkeleton";

const Tavfsiya = ({ category, search, setCount, count }) => {
  const view = useSelector((state) => state.view);

  const [ads, setAds] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [previousPageUrl, setPreviousPageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 20;
  const fetchAds = async (pageNumber) => {
    setLoading(true);
    try {
      let url = "/api/v1/ads/list?is_top=false";
      if (category) {
        url += `&category=${encodeURIComponent(category)}`;
      }
      if (search) {
        url += `&search=${encodeURIComponent(search)}`;
      }
      url += `&limit=${itemsPerPage}&offset=${
        (currentPage - 1) * itemsPerPage
      }&page=${pageNumber}&size=${itemsPerPage}`;
      const response = await api.get(url);
      const { next, previous, count } = response.data;
      setNextPageUrl(next);
      setPreviousPageUrl(previous);
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
      setAds(transformedAds);
      setTotalPages(Math.ceil(response.data.count / itemsPerPage));
      // setCount(transformedAds.length);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds(currentPage);
  }, [currentPage, search]);

  const handleNextPage = () => {
    if (nextPageUrl) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePreviousPage = () => {
    if (previousPageUrl) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    let startPage = 1;
    let endPage = 4;

    if (currentPage > 2) {
      startPage = currentPage - 1;
      endPage = currentPage + 2;
      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = endPage - 3;
        if (startPage < 1) startPage = 1;
      }
    }

    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) pageNumbers.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pageNumbers.push("...");
      pageNumbers.push(totalPages);
    }

    return (
      <div className="flex justify-center mt-[50px] mb-5">
        <button
          onClick={handlePreviousPage}
          disabled={!previousPageUrl}
          className={`h-10 bg-white rounded-md w-10 mr-2 flex justify-center items-center ${
            !previousPageUrl && "bg-kulrangOch"
          }`}
        >
          <FaChevronLeft />
        </button>
        {pageNumbers.map((pageNumber, index) => (
          <button
            key={index}
            onClick={() => {
              if (pageNumber !== "...") {
                handlePageClick(pageNumber);
              }
            }}
            className={`w-10 h-10 rounded-md font-semibold mx-1 ${
              pageNumber === currentPage
                ? "bg-ochKok text-logoKok"
                : "text-qora bg-white"
            }`}
            disabled={pageNumber === "..."}
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={!nextPageUrl}
          className={`h-10 bg-white rounded-md w-10 ml-2 flex justify-center items-center ${
            !nextPageUrl && "bg-kulrangOch"
          }`}
        >
          <FaChevronRight />
        </button>
      </div>
    );
  };
  return (
    <div className="flex flex-col container mb-[60px]">
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
