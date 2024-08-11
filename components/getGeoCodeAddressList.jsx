import axios from "axios";

export const getGeoCodeAddressList = async (geocoder) => {
  try {
    const response = await axios.get("https://geocode-maps.yandex.ru/1.x/", {
      params: {
        format: "json",
        apikey: "dd3d8e42-b837-42e6-8f97-5dab7d542d03",
        geocode: geocoder,
        sco: "latlong",
        lang: "ru-RU",
        results: 5,
        ll: "69.241320,41.292906", // Default coordinates for Uzbekistan
        spn: "6.5,6.5",
        rspn: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching geocode data:", error);
    throw error;
  }
};
