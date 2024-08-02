"use client";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ElonBlock from "./ElonBlock";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import api from "@/lib/api";

const Tavfsiya = ({ category, search }) => {
  const view = useSelector((state) => state.view);

  const [ads, setAds] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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
        (pageNumber - 1) * itemsPerPage
      }&page=${pageNumber}&size=${itemsPerPage}`;
      const response = await api.get(url);
      const transformedAds = response.data.results.map((ad) => ({
        image: ad.media,
        top: ad.is_top,
        save: true,
        turi: ad.ad_type.toLowerCase(),
        name: ad.title,
        address: `${ad.region.name_uz} ${ad.district.name_uz}`,
        data: new Date(ad.created).toLocaleDateString("en-GB"),
        price: `${ad.price.toLocaleString()} ${ad.currency}`,
        view: view,
        id: ad.id,
      }));
      setAds(transformedAds);
      setTotalPages(Math.ceil(response.data.count / itemsPerPage));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds(page);
  }, [page, search]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pageNumbers = [];

    // Always show the first page
    pageNumbers.push(1);

    // Add ellipsis if there are pages between the first page and current page
    if (page > 4) {
      pageNumbers.push("...");
    }

    // Add the pages around the current page
    for (
      let i = Math.max(2, page - 1);
      i <= Math.min(totalPages - 1, page + 1);
      i++
    ) {
      pageNumbers.push(i);
    }

    // Add ellipsis if there are pages between the current page and the last page
    if (page < totalPages - 3) {
      pageNumbers.push("...");
    }

    // Always show the last page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    // Remove duplicates and ensure correct ordering
    const uniquePageNumbers = Array.from(new Set(pageNumbers));

    return (
      <div className="flex justify-center mt-[50px] mb-5">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className={`h-10 bg-white rounded-md w-10 mr-2 flex justify-center items-center ${
            page === 1 && "bg-kulrangOch"
          }`}
        >
          <FaChevronLeft />
        </button>
        {uniquePageNumbers.map((pageNumber, index) =>
          pageNumber === "..." ? (
            <span
              key={index}
              className="w-10 h-10 rounded-md font-semibold mx-1 text-qora bg-white flex justify-center items-center"
            >
              ...
            </span>
          ) : (
            <button
              key={pageNumber}
              onClick={() => handlePageClick(pageNumber)}
              className={`w-10 h-10 rounded-md font-semibold mx-1 ${
                page === pageNumber
                  ? "bg-ochKok text-logoKok"
                  : "text-qora bg-white"
              }`}
            >
              {pageNumber}
            </button>
          )
        )}
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className={`h-10 bg-white rounded-md w-10 ml-2 flex justify-center items-center ${
            page === totalPages && "bg-kulrangOch"
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
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            ads.map((elon, index) => <ElonBlock key={index} {...elon} />)
          )}
        </div>
        {renderPagination()}
      </div>
    </div>
  );
};

export default Tavfsiya;
