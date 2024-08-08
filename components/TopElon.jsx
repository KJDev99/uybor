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

const TopElon = ({ count }) => {
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

  useEffect(() => {
    // Extract values from query parameters
    const adTypeParam = searchParams.get("ad_type") || ""; // Default to empty string if null
    const categoryParam = searchParams.get("category") || ""; // Default to empty string if null
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

  useEffect(() => {
    const fetchAds = async () => {
      try {
        let url = "/api/v1/ads/list?is_top=true";

        // Helper function to add parameters to the URL
        const addParam = (key, value) => {
          if (value) {
            if (url.includes("?")) {
              // If URL already has parameters, add `&`
              url += `&${key}=${encodeURIComponent(value)}`;
            } else {
              // If URL has no parameters yet, add `?`
              url += `?${key}=${encodeURIComponent(value)}`;
            }
          }
        };

        // Handle category as an array if needed
        const appendCategories = (categories) => {
          if (Array.isArray(categories)) {
            categories.forEach((category) => {
              addParam("category", category);
            });
          } else {
            addParam("category", categories);
          }
        };
        console.log(categories, 'category');

        // Call helper function for each parameter
        appendCategories(category); // 'category' could be a single value or an array
        addParam("search", search);
        addParam("ad_type", adType);
        addParam("district", district);
        addParam("min_room", minRoom);
        addParam("max_room", maxRoom);
        addParam("price_min", priceMin);
        addParam("price_max", priceMax);

        // Make the API request
        const response = await api.get(url);
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
          currencyNow: currencyNow,
        }));
        setCountTop(response.data.count);
        setAds(transformedAds);
        console.log(transformedAds, "top transformedAds");
        console.log(url, "top transformedAds");

        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        setError(err.message);
        setLoading(false); // Set loading to false on error
      }
    };

    fetchAds();
  }, [search, category, adType, minRoom, maxRoom, maxRoom, priceMin, priceMax]);

  return (
    <div className="flex flex-col container">
      <div className="flex justify-between mt-[50px] md:mb-[30px] max-md:flex-col-reverse">
        <h2 className="text-2xl text-qora font-semibold max-md:text-lg max-md:mt-5 max-md:mb-2">
          {countTop + count} ta e’lon mavjud
        </h2>
        <div className="flex max-md:justify-between">
          <div className="flex items-center ">
            <p className="text-qora font-medium">Ko'rinishi:</p>
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
            <p className="text-qora font-medium md:ml-16">Valyuta:</p>
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
      <div className="flex flex-col">
        {ads.length > 0 && (
          <h2 className="text-main mb-[30px] max-md:mb-[10px] font-semibold text-2xl max-md:text-lg">
            Top e’lonlar
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
        </div>
      </div>
    </div>
  );
};

export default TopElon;
