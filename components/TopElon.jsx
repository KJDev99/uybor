import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setView, setCurrency } from "@/store";
import Image from "next/image";
import SeeBlock from "@/assets/images/seeblock.svg";
import SeeLine from "@/assets/images/seeline.svg";
import SeeBlockAct from "@/assets/images/seeblockact.svg";
import SeeLineAct from "@/assets/images/seelineact.svg";
import ElonBlock from "./ElonBlock";
import ElonBlockSkeleton from "./ElonBlockSkeleton"; // Importing the skeleton component
import api from "@/lib/api";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import Link from "next/link";

const TopElon = ({ count }) => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.resolvedLanguage);

  const view = useSelector((state) => state.view);
  const currencyNow = useSelector((state) => state.currency);
  const dispatch = useDispatch();

  const searchParams = useSearchParams();
  const [adType, setAdType] = useState("");
  const [category, setCategory] = useState("");
  const [district, setDistrict] = useState("");
  const [minRoom, setMinRoom] = useState("");
  const [maxRoom, setMaxRoom] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [search, setSearch] = useState("");
  const [countTop, setCountTop] = useState("");

  const [prevPage, setPrevPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const itemsPerPage = 12;

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
  const handleViewChange = (newView) => {
    dispatch(setView(newView));
  };

  const handleCurrencyChange = (newCurrency) => {
    dispatch(setCurrency(newCurrency));
  };

  const [ads, setAds] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAds = async () => {
    setLoading(true);
    try {
      let url = "/api/v1/ads/list?is_top=true";
      category.forEach((categor, index) => {
        if (url !== "/api/v1/ads/list?is_top=true?") url += "&";
        if (index > 0) {
          url += "&";
        }
        url += `category=${encodeURIComponent(categor)}`;
      });
      if (search) {
        if (url !== "/api/v1/ads/list?is_top=true?") url += "&"; // Add '&' if url already has parameters
        url += `search=${encodeURIComponent(search)}`;
      }

      if (adType) {
        if (url !== "/api/v1/ads/list?is_top=true?") url += "&"; // Add '&' if url already has parameters
        url += `ad_type=${encodeURIComponent(adType)}`;
      }

      if (district) {
        if (url !== "/api/v1/ads/list?is_top=true?") url += "&"; // Add '&' if url already has parameters
        url += `district=${encodeURIComponent(district)}`;
      }

      if (minRoom) {
        if (url !== "/api/v1/ads/list?is_top=true?") url += "&"; // Add '&' if url already has parameters
        url += `room_min=${encodeURIComponent(minRoom)}`;
      }

      if (maxRoom) {
        if (url !== "/api/v1/ads/list?is_top=true?") url += "&"; // Add '&' if url already has parameters
        url += `room_max=${encodeURIComponent(maxRoom)}`;
      }

      if (priceMin) {
        if (url !== "/api/v1/ads/list?is_top=true?") url += "&"; // Add '&' if url already has parameters
        url += `price_min=${encodeURIComponent(priceMin)}`;
      }

      if (priceMax) {
        if (url !== "/api/v1/ads/list?is_top=true?") url += "&"; // Add '&' if url already has parameters
        url += `price_max=${encodeURIComponent(priceMax)}`;
      }
      url += `&limit=${itemsPerPage}&offset=${
        (currentPage - 1) * itemsPerPage
      }`;

      const response = await api.get(url);
      const { next, count } = response.data;

      setNextPageUrl(next);
      setTotalPages(Math.ceil(count / itemsPerPage));
      // Make the API request
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
        views: ad.views,
        currencyNow: currencyNow,
      }));
      setCountTop(response.data.count);
      if (currentPage === prevPage) {
        setAds(transformedAds);
      } else {
        setAds((prevAds) => [...prevAds, ...transformedAds]);
      }
      setPrevPage(currentPage);
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
          className={`mt-[50px] bg-transparent rounded-md w-[210px] h-[30px] flex justify-center items-center border border-[#015EA8] text-[#015EA8] cursor-pointer ${
            !nextPageUrl && "hidden h-0"
          }`}
        >
          {t("buttonYana")}
        </button>
      </div>
    );
  };
  return (
    <div className="flex flex-col container">
      <div className="flex justify-between mt-[50px] md:mb-[30px] max-md:flex-col-reverse">
        <h2 className="text-2xl text-qora font-semibold max-md:text-lg max-md:mt-5 max-md:mb-2">
          {countTop + count == "undefined"
            ? ""
            : `${countTop + count} ${t("ta")} ${
                category.length == 1 ? t(category) : ""
              }  ${t("elonmavjud")}`}
        </h2>

        <div className="flex max-md:justify-between">
          <div className="flex items-center ">
            <p className="text-qora font-medium">{t("korish")}:</p>
            <Image
              src={view === "block" ? SeeBlockAct : SeeBlock}
              alt="SeeBlock"
              onClick={() => handleViewChange("block")}
              className="mx-5 cursor-pointer"
            />
            <Image
              src={view === "line" ? SeeLineAct : SeeLine}
              alt="SeeLine"
              onClick={() => handleViewChange("line")}
              className="cursor-pointer"
            />
          </div>
          <div className="flex items-center">
            <p className="text-qora font-medium md:ml-16">{t("valyuta")}:</p>
            <p
              className={`mx-5 cursor-pointer font-medium ${
                currencyNow === "UZS" ? "text-logoKok" : "text-kulrang"
              }`}
              onClick={() => handleCurrencyChange("UZS")}
            >
              UZS
            </p>
            <p
              className={`cursor-pointer font-medium ${
                currencyNow === "USD" ? "text-logoKok" : "text-kulrang"
              }`}
              onClick={() => handleCurrencyChange("USD")}
            >
              USD
            </p>
          </div>
        </div>
      </div>

      {category != "" && (
        <>
          {t(category) == "Kvartiralar" && (
            <div className="flex category_scroll gap-10 text-main italic cursor-pointer underline text-nowrap overflow-x-auto">
              <Link href="/subcategories/chilonzor-arenda-kvartira">
                Toshkentda ijaraga kvartira
              </Link>
              <Link href="/subcategories/ijaraga-uy">
                Toshkentda ijaraga uy topish
              </Link>
              <Link href="/subcategories/yangi-uylar">
                Toshkentda yangi uylar
              </Link>
            </div>
          )}
          {t(category) == "Квартиры" && (
            <div className="flex category_scroll gap-10 text-main italic cursor-pointer underline text-nowrap overflow-x-auto">
              <Link href="/subcategories/kvartira-arenda-tashkent">
                Квартиры в аренду
              </Link>
              <Link href="/subcategories/kuplyu-kvartiru-v-tashkente">
                Куплю квартиру
              </Link>
              <Link href="/subcategories/snyat-kvartiru-v-tashkente">
                Снять квартиру
              </Link>
              <Link href="/subcategories/sutochnie-kvartiri-v-tashkente">
                Суточные квартиры
              </Link>
            </div>
          )}
          {/* {t(category) == "Xovlilar" && (
            <div className="flex category_scroll gap-10 text-main italic cursor-pointer underline text-nowrap overflow-x-auto">
              <Link href="/subcategories/houseuz">Ijaraga dacha</Link>
            </div>
          )} */}
          {t(category) == "Дома" && (
            <div className="flex category_scroll gap-10 text-main italic cursor-pointer underline text-nowrap overflow-x-auto">
              {/* <Link href="/subcategories/houseru1">Аренда дача</Link> */}
              <Link href="/subcategories/evrodom-v-tashkente">
                Евро дом в Ташкенте
              </Link>
            </div>
          )}
          {t(category) == "Ofislar" && (
            <div className="flex category_scroll gap-10 text-main italic cursor-pointer underline text-nowrap overflow-x-auto">
              <Link href="/subcategories/arenda-ofis">
                Toshkentda ijaraga ofis
              </Link>
            </div>
          )}
          {t(category) == "Офисы" && (
            <div className="flex category_scroll gap-10 text-main italic cursor-pointer underline text-nowrap overflow-x-auto">
              <Link href="/subcategories/ofis-v-arendu-tashkent">
                Аренда офис
              </Link>
              <Link href="/subcategories/pomeshenie-v-arendu">
                Помещение в аренду
              </Link>
            </div>
          )}
          {t(category) == "Mehmonxona va dachalar" && (
            <div className="flex category_scroll gap-10 text-main italic cursor-pointer underline text-nowrap overflow-x-auto">
              <Link href="/subcategories/arzon-mehmonxona">
                Toshkentdagi arzon mehmonxonalar
              </Link>
              <Link href="/subcategories/dacha-arenda">Ijaraga dacha</Link>
            </div>
          )}
          {t(category) == "Гостиницы и дачи" && (
            <div className="flex category_scroll gap-10 text-main italic cursor-pointer underline text-nowrap overflow-x-auto">
              <Link href="/subcategories/gostinitsy-v-tashkente">Гостиницы в ташкенте</Link>
              <Link href="/subcategories/oteli-tashkenta">Oтели в ташкенте</Link>
              <Link href="/subcategories/arenda-dachi-v-tashkente">Аренда дача</Link>
            </div>
          )}
          {t(category) == "Do'konlar" && (
            <div className="flex category_scroll gap-10 text-main italic cursor-pointer underline text-nowrap overflow-x-auto">
              <Link href="/subcategories/arenda-magazin">Ijaraga magazin</Link>
            </div>
          )}
          {t(category) == "Магазины" && (
            <div className="flex category_scroll gap-10 text-main italic cursor-pointer underline text-nowrap overflow-x-auto">
              <Link href="/subcategories/magazin-arenda">Аренда магазина</Link>
            </div>
          )}
        </>
      )}

      <div className="flex flex-col">
        {ads.length > 0 && (
          <h2 className="text-main mb-[30px] max-md:mb-[10px] font-semibold text-2xl max-md:text-lg">
            {t("top")}
          </h2>
        )}
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
        </div>{" "}
        {renderPagination()}
      </div>
    </div>
  );
};

export default TopElon;
